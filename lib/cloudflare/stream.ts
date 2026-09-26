/**
 * Cloudflare Stream Server Utility
 * 
 * IMPORTANT: This module is for SERVER-SIDE use only.
 * It uses the Cloudflare API token which must never be exposed to the client.
 */

const getAccountId = () => {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  if (!accountId) throw new Error('Missing CLOUDFLARE_ACCOUNT_ID environment variable')
  return accountId
}

const getApiToken = () => {
  const apiToken = process.env.CLOUDFLARE_STREAM_API_TOKEN
  if (!apiToken) throw new Error('Missing CLOUDFLARE_STREAM_API_TOKEN environment variable')
  return apiToken
}

const getBaseUrl = () => `https://api.cloudflare.com/client/v4/accounts/${getAccountId()}/stream`

const getHeaders = () => ({
  'Authorization': `Bearer ${getApiToken()}`,
  'Content-Type': 'application/json',
})

export interface DirectUploadResponse {
  uploadURL: string
  uid: string
}

/**
 * Creates a one-time direct upload URL for the client to upload a video securely.
 */
export async function createDirectUploadUrl(maxDurationSeconds = 3600): Promise<DirectUploadResponse> {
  const response = await fetch(`${getBaseUrl()}/direct_upload`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      maxDurationSeconds,
      requireSignedURLs: false,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to create direct upload URL: ${errorText}`)
  }

  const data = await response.json()
  return {
    uploadURL: data.result.uploadURL,
    uid: data.result.uid,
  }
}

/**
 * Retrieves full video information including processing status and playback details.
 */
export async function getVideoInfo(videoId: string) {
  const response = await fetch(`${getBaseUrl()}/${videoId}`, {
    method: 'GET',
    headers: getHeaders(),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to retrieve video info: ${errorText}`)
  }

  const data = await response.json()
  return data.result
}

/**
 * Checks if a video is ready (processing completed).
 */
export async function checkVideoStatus(videoId: string): Promise<{ ready: boolean, status: string }> {
  const info = await getVideoInfo(videoId)
  return {
    ready: info.readyToStream,
    status: info.status?.state || 'unknown',
  }
}

/**
 * Deletes a video from Cloudflare Stream.
 */
export async function deleteVideo(videoId: string): Promise<boolean> {
  const response = await fetch(`${getBaseUrl()}/${videoId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to delete video: ${errorText}`)
  }

  return true
}

/**
 * Retrieves simplified playback information for a video.
 */
export async function getPlaybackInfo(videoId: string) {
  const info = await getVideoInfo(videoId)
  
  return {
    uid: info.uid,
    thumbnail: info.thumbnail,
    preview: info.preview,
    hls: info.playback?.hls,
    dash: info.playback?.dash,
    duration: info.duration,
    readyToStream: info.readyToStream,
  }
}
