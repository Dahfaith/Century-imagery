'use client'

import { useState, useRef } from 'react'
import { getUploadUrl, verifyAndSaveVideo, getR2UploadUrl, saveR2Media } from '../actions'
import { Upload, X, Film, ImageIcon, Loader2 } from 'lucide-react'

export function MediaUploader({ onComplete }: { onComplete?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [altText, setAltText] = useState('')
  const [status, setStatus] = useState<'idle' | 'requesting' | 'uploading' | 'verifying' | 'success' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setFile(null)
    setAltText('')
    setStatus('idle')
    setProgress(0)
    setErrorMsg('')
  }

  const uploadViaPresignedPut = (uploadUrl: string, fileToUpload: File, contentType: string) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100
          setProgress(Math.round(percentComplete))
        }
      })
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve()
        } else {
          reject(new Error(`Storage upload failed with status ${xhr.status}`))
        }
      })
      xhr.addEventListener('error', () => reject(new Error('Network error during storage upload')))
      xhr.addEventListener('abort', () => reject(new Error('Upload aborted')))
      xhr.open('PUT', uploadUrl)
      xhr.setRequestHeader('Content-Type', contentType)
      xhr.send(fileToUpload)
    })
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setStatus('requesting')
      setErrorMsg('')

      const isImage = file.type.startsWith('image/')

      if (isImage) {
        // --- IMAGE UPLOAD TO R2 ---
        const mime = file.type || 'image/jpeg'
        const urlRes = await getR2UploadUrl(file.name, mime)
        if (urlRes.error) throw new Error(urlRes.error)
        if (!urlRes.data) throw new Error('Failed to get R2 upload URL')

        const { uploadUrl, key, publicUrl } = urlRes.data
        setStatus('uploading')

        await uploadViaPresignedPut(uploadUrl, file, mime)

        setStatus('verifying')
        const saveRes = await saveR2Media(key, publicUrl, file.name, file.size, mime, altText)
        if (saveRes.error) throw new Error(saveRes.error)

      } else {
        // --- VIDEO UPLOAD ---
        let streamSuccess = false

        // Attempt Cloudflare Stream first if configured
        try {
          const urlRes = await getUploadUrl()
          if (!urlRes.error && urlRes.data?.uploadURL) {
            const { uploadURL, uid } = urlRes.data
            setStatus('uploading')

            await new Promise<void>((resolve, reject) => {
              const xhr = new XMLHttpRequest()
              xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                  const percentComplete = (event.loaded / event.total) * 100
                  setProgress(Math.round(percentComplete))
                }
              })
              xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  resolve()
                } else {
                  reject(new Error(`Stream upload failed with status ${xhr.status}`))
                }
              })
              xhr.addEventListener('error', () => reject(new Error('Network error during upload')))
              xhr.addEventListener('abort', () => reject(new Error('Upload aborted')))
              xhr.open('POST', uploadURL)
              const formData = new FormData()
              formData.append('file', file)
              xhr.send(formData)
            })

            setStatus('verifying')
            const saveRes = await verifyAndSaveVideo(uid, file.name, file.size, altText)
            if (saveRes.error) throw new Error(saveRes.error)
            streamSuccess = true
          }
        } catch (streamErr: any) {
          console.warn('Cloudflare Stream unavailable, falling back to Cloudflare R2 storage:', streamErr?.message)
          streamSuccess = false
        }

        // If Cloudflare Stream was not enabled or failed, upload video to Cloudflare R2!
        if (!streamSuccess) {
          const mime = file.type || 'video/mp4'
          const r2Res = await getR2UploadUrl(file.name, mime)
          if (r2Res.error) throw new Error(r2Res.error)
          if (!r2Res.data) throw new Error('Failed to get storage upload URL')

          const { uploadUrl, key, publicUrl } = r2Res.data
          setStatus('uploading')

          await uploadViaPresignedPut(uploadUrl, file, mime)

          setStatus('verifying')
          const saveRes = await saveR2Media(key, publicUrl, file.name, file.size, mime, altText)
          if (saveRes.error) throw new Error(saveRes.error)
        }
      }

      setStatus('success')
      setTimeout(() => {
        setIsOpen(false)
        reset()
        if (onComplete) onComplete()
      }, 1500)

    } catch (err: any) {
      console.error(err)
      setStatus('error')
      setErrorMsg(err.message || 'An unexpected error occurred during upload.')
    }
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-brand-cream text-brand-black px-4 py-2 rounded-lg font-medium text-xs sm:text-sm flex items-center space-x-2 hover:bg-white transition-colors"
      >
        <Upload className="w-4 h-4" />
        <span>Upload Media</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-brand-surface border border-brand-border rounded-xl w-full max-w-md overflow-hidden shadow-2xl my-auto">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-brand-border">
          <h2 className="text-lg sm:text-xl font-display font-medium text-brand-cream flex items-center space-x-2">
            <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold" />
            <span>Upload Media</span>
          </h2>
          <button 
            onClick={() => { setIsOpen(false); reset(); }}
            className="text-brand-muted hover:text-brand-cream p-1 transition-colors"
            disabled={status === 'uploading' || status === 'verifying'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5">
          {status === 'idle' || status === 'error' ? (
            <>
              {status === 'error' && (
                <div className="p-3 sm:p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm font-sans break-words">
                  {errorMsg}
                </div>
              )}
              
              <div 
                className="border-2 border-dashed border-brand-border rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-brand-gold/50 hover:bg-brand-surface-elevated transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept="video/*,image/*" 
                  className="hidden" 
                />
                <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-brand-muted mx-auto mb-3" />
                <p className="text-brand-cream font-medium text-sm sm:text-base">Select a video or image file</p>
                <p className="text-brand-muted text-xs sm:text-sm mt-1">Direct upload to high-speed Cloudflare storage</p>
                {file && (
                  <div className="mt-3 p-2.5 bg-brand-surface-card rounded border border-brand-border text-brand-gold text-xs sm:text-sm truncate">
                    {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </div>
                )}
              </div>

              {file && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Alt Text (Optional)</label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Describe the media content"
                    className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-3 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-xs sm:text-sm transition-colors"
                  />
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleUpload}
                  disabled={!file}
                  className="w-full sm:w-auto bg-brand-gold text-brand-black px-6 py-2.5 rounded-lg font-semibold text-xs sm:text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  Start Upload
                </button>
              </div>
            </>
          ) : status === 'success' ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-brand-cream">Upload Complete</h3>
              <p className="text-brand-muted text-xs sm:text-sm">Media has been successfully saved to your library.</p>
            </div>
          ) : (
            <div className="py-6 space-y-5 text-center">
              <Loader2 className="w-10 h-10 text-brand-gold animate-spin mx-auto" />
              
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-medium text-brand-cream">
                  {status === 'requesting' && 'Requesting secure upload authorization...'}
                  {status === 'uploading' && `Uploading to Cloudflare (${progress}%)`}
                  {status === 'verifying' && 'Saving to Media Library...'}
                </h3>
                
                {status === 'uploading' && (
                  <div className="w-full bg-brand-surface-elevated rounded-full h-2 overflow-hidden border border-brand-border">
                    <div 
                      className="bg-brand-gold h-full transition-all duration-300 ease-out" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

