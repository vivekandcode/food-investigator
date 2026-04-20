import { useRef, useState } from 'react'
import { Upload, Image } from 'lucide-react'
import { useSettings } from '../../context/SettingsContext'

export default function UploadScanner({ onCapture, loading }) {
  const fileRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const { currentProvider } = useSettings()

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target.result
      setPreview(dataUrl)
      onCapture(dataUrl.split(',')[1])
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const dataUrl = ev.target.result
        setPreview(dataUrl)
        onCapture(dataUrl.split(',')[1])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="p-5">
        {/* Drop zone */}
        <div
          onClick={() => fileRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="relative border-2 border-dashed border-border rounded-xl aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:border-accent/50 transition-all group overflow-hidden"
        >
          {preview ? (
            <img src={preview} className="w-full h-full object-cover rounded-xl" alt="Preview" />
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 border-2 border-border rounded-2xl flex items-center justify-center group-hover:border-accent transition-all">
                <Image size={24} className="text-muted group-hover:text-accent transition-colors" />
              </div>
              <p className="text-xs text-muted text-center tracking-wide">
                Click or drag & drop<br />
                <span className="text-muted/50 text-[10px]">JPG, PNG supported</span>
              </p>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 bg-bg/85 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
              <div className="w-11 h-11 border-2 border-border border-t-accent rounded-full animate-spin" />
              <p className="text-xs text-accent tracking-[2px] uppercase">Analyzing</p>
            </div>
          )}
        </div>

        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

        {preview && !loading && (
          <button
            onClick={() => { setPreview(null); fileRef.current.value = '' }}
            className="mt-3 w-full py-2.5 border border-border rounded-xl text-xs font-mono text-muted hover:text-danger hover:border-danger/30 transition-all"
          >
            ↺ Clear & Upload Another
          </button>
        )}

        {!currentProvider.supportsImages && (
          <p className="text-[10px] text-warn/70 text-center mt-3">
            ⚠️ {currentProvider.name} doesn't support image analysis. Switch to Gemini in Settings, or use the Type tab.
          </p>
        )}
      </div>
    </div>
  )
}
