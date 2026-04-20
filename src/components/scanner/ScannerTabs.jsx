import { Camera, Type, Upload } from 'lucide-react'

const TABS = [
  { id: 'camera', label: 'Camera', icon: Camera },
  { id: 'upload', label: 'Upload', icon: Upload },
  { id: 'text', label: 'Type', icon: Type },
]

export default function ScannerTabs({ active, onChange }) {
  return (
    <div className="flex gap-1.5 bg-surface border border-border rounded-2xl p-1.5 mb-4">
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-mono tracking-wide transition-all ${
            active === id
              ? 'bg-surface2 text-accent border border-border'
              : 'text-muted hover:text-white'
          }`}
        >
          <Icon size={13} />
          {label}
        </button>
      ))}
    </div>
  )
}
