import { AlertTriangle, X } from 'lucide-react'

export default function ErrorBanner({ message, onDismiss }) {
  if (!message) return null
  return (
    <div className="bg-danger/8 border border-danger/25 rounded-xl p-4 mb-4 flex items-start gap-3 animate-fade-up">
      <AlertTriangle size={15} className="text-danger flex-shrink-0 mt-0.5" />
      <p className="text-xs text-red-300 leading-relaxed flex-1">{message}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="text-muted hover:text-white flex-shrink-0">
          <X size={13} />
        </button>
      )}
    </div>
  )
}
