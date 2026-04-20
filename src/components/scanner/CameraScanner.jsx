import { useCamera } from '../../hooks/useCamera'
import { useSettings } from '../../context/SettingsContext'

export default function CameraScanner({ onCapture, loading }) {
  const { videoRef, canvasRef, cameraActive, cameraError, startCamera, capturePhoto } = useCamera()
  const { currentProvider } = useSettings()

  const handleSnap = () => {
    const b64 = capturePhoto()
    if (b64) onCapture(b64)
  }

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      {/* Viewport */}
      <div className="relative w-full aspect-[4/3] bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Placeholder */}
        {!cameraActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface2">
            <div className="w-14 h-14 border-2 border-border rounded-2xl flex items-center justify-center text-3xl">
              📷
            </div>
            <p className="text-xs text-muted tracking-wide">
              {cameraError ? '⚠️ ' + cameraError : 'Tap Open Camera to start'}
            </p>
          </div>
        )}

        {/* Corner brackets */}
        {cameraActive && (
          <>
            <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-accent opacity-70" />
            <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-accent opacity-70" />
            <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-accent opacity-70" />
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-accent opacity-70" />
            {/* Scan line */}
            <div className="animate-scan bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
          </>
        )}

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-bg/85 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
            <div className="w-11 h-11 border-2 border-border border-t-accent rounded-full animate-spin" />
            <p className="text-xs text-accent tracking-[2px] uppercase">Analyzing</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 flex gap-2.5">
        {!cameraActive ? (
          <button
            onClick={startCamera}
            disabled={loading}
            className="flex-1 py-3 bg-surface2 border border-border rounded-xl text-xs font-mono tracking-wide text-white hover:border-accent hover:text-accent transition-all disabled:opacity-40"
          >
            📷 Open Camera
          </button>
        ) : (
          <button
            onClick={handleSnap}
            disabled={loading}
            className="flex-1 py-3 bg-accent text-black font-mono font-bold text-xs tracking-widest rounded-xl hover:bg-accent/90 transition-all disabled:opacity-40 uppercase"
          >
            ⚡ Snap & Analyze
          </button>
        )}
      </div>

      {!currentProvider.supportsImages && (
        <p className="text-[10px] text-warn/70 text-center pb-3 px-4">
          ⚠️ {currentProvider.name} doesn't support image analysis. Switch to Gemini in Settings, or use the Type tab.
        </p>
      )}
    </div>
  )
}
