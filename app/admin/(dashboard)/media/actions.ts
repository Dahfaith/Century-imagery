'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { createDirectUploadUrl, getVideoInfo, deleteVideo } from '@/lib/cloudflare/stream'
import { createR2PresignedUrl, deleteR2Object, uploadBufferToR2 } from '@/lib/cloudflare/r2'
import { revalidatePath } from 'next/cache'

export async function uploadDirectFile(formData: FormData) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  try {
    const file = formData.get('file') as File | null
    const altText = (formData.get('altText') as string) || ''

    if (!file) return { error: 'No file provided' }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const mimeType = file.type || 'application/octet-stream'
    const isVideo = mimeType.startsWith('video/') || /\.(mp4|webm|mov|m4v|mkv)$/i.test(file.name)

    const { key, publicUrl } = await uploadBufferToR2(buffer, file.name, mimeType)

    const mediaData = {
      filename: file.name,
      original_filename: file.name,
      media_type: isVideo ? 'video' : 'image',
      mime_type: mimeType,
      file_size: file.size,
      provider: 'cloudflare_r2',
      provider_asset_id: key,
      provider_url: publicUrl,
      thumbnail_url: publicUrl,
      playback_url: publicUrl,
      status: 'ready',
      alt_text: altText,
    }

    const { data, error } = await (supabase.from('media') as any).insert(mediaData).select().single()
    if (error) throw new Error(error.message)

    revalidatePath('/', 'layout')
    revalidatePath('/admin/media')
    return { success: true, data }
  } catch (error: any) {
    return { error: error.message || 'Direct upload failed' }
  }
}

export async function getUploadUrl() {
  await requireAuth(['super_admin', 'admin', 'editor'])
  
  if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_STREAM_API_TOKEN) {
    return { error: 'Cloudflare Stream credentials are not configured in environment variables.' }
  }

  try {
    const data = await createDirectUploadUrl()
    return { data }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function verifyAndSaveVideo(uid: string, filename: string, fileSize: number, altText: string) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  try {
    const info = await getVideoInfo(uid)
    
    const mediaData = {
      filename: filename,
      original_filename: filename,
      media_type: 'video',
      file_size: fileSize,
      provider: 'cloudflare_stream',
      provider_asset_id: uid,
      thumbnail_url: info.thumbnail,
      playback_url: info.playback?.hls,
      duration_seconds: info.duration,
      width: info.input?.width,
      height: info.input?.height,
      status: info.readyToStream ? 'ready' : (info.status?.state === 'error' ? 'failed' : 'processing'),
      alt_text: altText,
    }

    const { error } = await (supabase.from('media') as any).insert(mediaData)
    if (error) throw new Error(error.message)

    revalidatePath('/', 'layout')
  revalidatePath('/admin/media')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function removeMedia(id: string, uid: string, provider: string) {
  await requireAuth(['super_admin', 'admin'])
  const supabase = await createClient()

  // First check if it's used as a cover or hero in any project to prevent breaking changes
  const { data: usage } = await (supabase.from('projects') as any)
    .select('id, title')
    .or(`cover_media_id.eq.${id},hero_media_id.eq.${id}`)
    .limit(1)
  
  if (usage && usage.length > 0) {
    return { error: `Cannot delete. This media is currently in use by project: ${usage[0].title}` }
  }

  if (provider === 'cloudflare_stream' && uid) {
    try {
      await deleteVideo(uid)
    } catch (error) {
      console.error('Failed to delete from Cloudflare Stream', error)
    }
  } else if (provider === 'cloudflare_r2' && uid) {
    try {
      await deleteR2Object(uid) // uid is the R2 object key
    } catch (error) {
      console.error('Failed to delete from Cloudflare R2', error)
    }
  }

  const { error } = await (supabase.from('media') as any).delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/media')
  return { success: true }
}

export async function syncVideoStatus(id: string, uid: string) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()
  
  try {
    const info = await getVideoInfo(uid)
    
    const mediaData = {
      thumbnail_url: info.thumbnail,
      playback_url: info.playback?.hls,
      duration_seconds: info.duration,
      width: info.input?.width,
      height: info.input?.height,
      status: info.readyToStream ? 'ready' : (info.status?.state === 'error' ? 'failed' : 'processing'),
    }

    await (supabase.from('media') as any).update(mediaData).eq('id', id)
    
    revalidatePath('/', 'layout')
  revalidatePath('/admin/media')
    return { status: mediaData.status }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getR2UploadUrl(filename: string, mimeType: string) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  
  if (!process.env.CLOUDFLARE_R2_ACCOUNT_ID || !process.env.CLOUDFLARE_R2_ACCESS_KEY_ID) {
    return { error: 'Cloudflare R2 credentials are not configured in environment variables.' }
  }

  try {
    const data = await createR2PresignedUrl(filename, mimeType || 'application/octet-stream')
    return { data }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getImageUploadUrl(filename: string, mimeType: string) {
  return getR2UploadUrl(filename, mimeType)
}

export async function saveR2Media(key: string, publicUrl: string, filename: string, fileSize: number, mimeType: string, altText: string) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  try {
    const isVideo = mimeType?.startsWith('video/') || /\.(mp4|webm|mov|m4v|mkv)$/i.test(filename)
    const mediaData = {
      filename: filename,
      original_filename: filename,
      media_type: isVideo ? 'video' : 'image',
      mime_type: mimeType || (isVideo ? 'video/mp4' : 'image/jpeg'),
      file_size: fileSize,
      provider: 'cloudflare_r2',
      provider_asset_id: key,
      thumbnail_url: publicUrl,
      playback_url: publicUrl,
      status: 'ready',
      alt_text: altText,
    }

    const { error } = await (supabase.from('media') as any).insert(mediaData)
    if (error) throw new Error(error.message)

    revalidatePath('/', 'layout')
    revalidatePath('/admin/media')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function saveImageMedia(key: string, publicUrl: string, filename: string, fileSize: number, mimeType: string, altText: string) {
  return saveR2Media(key, publicUrl, filename, fileSize, mimeType, altText)
}

export async function saveExternalMedia(url: string, filename: string, altText: string) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  try {
    const isVideo = url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com') || /\.(mp4|webm|mov|m4v|mkv)$/i.test(url)
    const mediaData = {
      filename: filename || 'External Link',
      original_filename: filename || 'External Link',
      media_type: isVideo ? 'video' : 'image',
      provider: 'external',
      provider_url: url,
      playback_url: url,
      status: 'ready',
      alt_text: altText,
    }

    const { error } = await (supabase.from('media') as any).insert(mediaData)
    if (error) throw new Error(error.message)

    revalidatePath('/', 'layout')
    revalidatePath('/admin/media')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

