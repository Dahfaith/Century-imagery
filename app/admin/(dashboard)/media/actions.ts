'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { createDirectUploadUrl, getVideoInfo, deleteVideo } from '@/lib/cloudflare/stream'
import { createR2PresignedUrl, deleteR2Object } from '@/lib/cloudflare/r2'
import { revalidatePath } from 'next/cache'

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

export async function getImageUploadUrl(filename: string, mimeType: string) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  
  if (!process.env.CLOUDFLARE_R2_ACCOUNT_ID || !process.env.CLOUDFLARE_R2_ACCESS_KEY_ID) {
    return { error: 'Cloudflare R2 credentials are not configured in environment variables.' }
  }

  try {
    const data = await createR2PresignedUrl(filename, mimeType)
    return { data }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function saveImageMedia(key: string, publicUrl: string, filename: string, fileSize: number, mimeType: string, altText: string) {
  await requireAuth(['super_admin', 'admin', 'editor'])
  const supabase = await createClient()

  try {
    const mediaData = {
      filename: filename,
      original_filename: filename,
      media_type: 'image',
      mime_type: mimeType,
      file_size: fileSize,
      provider: 'cloudflare_r2',
      provider_asset_id: key,
      thumbnail_url: publicUrl,
      playback_url: publicUrl, // images use the same url for playback/display
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

