import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export function getR2Client() {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('Missing Cloudflare R2 credentials in environment variables.')
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })
}

export async function createR2PresignedUrl(filename: string, mimeType: string) {
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME
  if (!bucket) throw new Error('Missing CLOUDFLARE_R2_BUCKET_NAME')

  // Create a unique key for the file to prevent overwriting
  const uniqueId = crypto.randomUUID()
  const key = `${uniqueId}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`

  const client = getR2Client()
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: mimeType,
  })

  // URL expires in 15 minutes
  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 900 })

  const publicDomain = process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN
  const publicUrl = publicDomain ? `${publicDomain}/${key}` : ''

  return { uploadUrl, key, publicUrl }
}

export async function deleteR2Object(key: string) {
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME
  if (!bucket) throw new Error('Missing CLOUDFLARE_R2_BUCKET_NAME')

  const client = getR2Client()
  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  await client.send(command)
  return true
}
