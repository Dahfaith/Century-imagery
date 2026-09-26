import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { uploadBufferToR2 } from '@/lib/cloudflare/r2'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    await requireAuth(['super_admin', 'admin', 'editor'])
    const supabase = await createClient()

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const altText = (formData.get('altText') as string) || ''

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

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
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    revalidatePath('/', 'layout')
    revalidatePath('/admin/media')

    return NextResponse.json({ success: true, media: data })
  } catch (err: any) {
    console.error('API Upload error:', err)
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 })
  }
}
