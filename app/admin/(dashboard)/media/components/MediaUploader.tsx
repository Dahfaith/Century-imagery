'use client'

import { useState, useRef } from 'react'
import { getUploadUrl, verifyAndSaveVideo, getImageUploadUrl, saveImageMedia } from '../actions'
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

  const handleUpload = async () => {
    if (!file) return

    try {
      setStatus('requesting')
      setErrorMsg('')

      const isImage = file.type.startsWith('image/')

      if (isImage) {
        // --- IMAGE UPLOAD TO R2 ---
        const urlRes = await getImageUploadUrl(file.name, file.type)
        if (urlRes.error) throw new Error(urlRes.error)
        if (!urlRes.data) throw new Error('Failed to get R2 upload URL')

        const { uploadUrl, key, publicUrl } = urlRes.data
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
              reject(new Error(`Upload failed with status ${xhr.status}`))
            }
          })

          xhr.addEventListener('error', () => reject(new Error('Network error during upload')))
          xhr.addEventListener('abort', () => reject(new Error('Upload aborted')))

          xhr.open('PUT', uploadUrl) // R2 presigned URLs usually use PUT
          xhr.setRequestHeader('Content-Type', file.type)
          xhr.send(file)
        })

        setStatus('verifying')
        const saveRes = await saveImageMedia(key, publicUrl, file.name, file.size, file.type, altText)
        if (saveRes.error) throw new Error(saveRes.error)

      } else {
        // --- VIDEO UPLOAD TO CLOUDFLARE STREAM ---
        const urlRes = await getUploadUrl()
        if (urlRes.error) throw new Error(urlRes.error)
        if (!urlRes.data) throw new Error('Failed to get upload URL')

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
              reject(new Error(`Upload failed with status ${xhr.status}`))
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
      }

      setStatus('success')
      setTimeout(() => {
        setIsOpen(false)
        reset()
        if (onComplete) onComplete()
      }, 2000)

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
        className="bg-brand-cream text-brand-black px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 hover:bg-white transition-colors"
      >
        <Upload className="w-4 h-4" />
        <span>Upload Video</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-brand-surface border border-brand-border rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-brand-border">
          <h2 className="text-xl font-display font-medium text-brand-cream flex items-center space-x-2">
            <Upload className="w-5 h-5 text-brand-gold" />
            <span>Upload Media</span>
          </h2>
          <button 
            onClick={() => { setIsOpen(false); reset(); }}
            className="text-brand-muted hover:text-brand-cream transition-colors"
            disabled={status === 'uploading' || status === 'verifying'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {status === 'idle' || status === 'error' ? (
            <>
              {status === 'error' && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-sans">
                  {errorMsg}
                </div>
              )}
              
              <div 
                className="border-2 border-dashed border-brand-border rounded-xl p-8 text-center cursor-pointer hover:border-brand-gold/50 hover:bg-brand-surface-elevated transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept="video/*,image/*" 
                  className="hidden" 
                />
                <Upload className="w-10 h-10 text-brand-muted mx-auto mb-4" />
                <p className="text-brand-cream font-medium">Select a video or image file</p>
                <p className="text-brand-muted text-sm mt-1">Direct secure upload to Cloudflare</p>
                {file && (
                  <div className="mt-4 p-3 bg-brand-surface-card rounded border border-brand-border text-brand-gold text-sm truncate">
                    {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </div>
                )}
              </div>

              {file && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-brand-muted uppercase tracking-wider block">Alt Text (Optional)</label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Describe the video content"
                    className="w-full bg-brand-surface-elevated border border-brand-border text-brand-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 text-sm transition-colors"
                  />
                </div>
              )}

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleUpload}
                  disabled={!file}
                  className="bg-brand-cream text-brand-black px-6 py-2 rounded-lg font-medium text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Upload
                </button>
              </div>
            </>
          ) : status === 'success' ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-brand-cream">Upload Complete</h3>
              <p className="text-brand-muted text-sm">Media has been successfully processed and saved.</p>
            </div>
          ) : (
            <div className="py-8 space-y-6 text-center">
              <Loader2 className="w-12 h-12 text-brand-gold animate-spin mx-auto" />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-brand-cream">
                  {status === 'requesting' && 'Requesting secure URL...'}
                  {status === 'uploading' && `Uploading direct to Cloudflare (${progress}%)`}
                  {status === 'verifying' && 'Verifying and saving metadata...'}
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
