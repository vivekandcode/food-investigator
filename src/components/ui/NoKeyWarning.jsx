import { Key, ExternalLink } from 'lucide-react'
import { useSettings } from '../../context/SettingsContext'

export default function NoKeyWarning({ onSettingsClick }) {
  const { currentProvider } = useSettings()

  return (
    <div className="bg-warn/5 border border-warn/20 rounded-xl p-4 mb-4 flex items-start gap-3">
      <Key size={15} className="text-warn flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-xs text-warn font-mono mb-1">No API key for {currentProvider.name}</p>
        <p className="text-[11px] text-muted leading-relaxed">
          Get a free key at{' '}
          <a
            href={currentProvider.signupUrl}
            target="_blank"
            rel="noreferrer"
            className="text-accent3 hover:underline inline-flex items-center gap-0.5"
          >
            {currentProvider.signupUrl.replace('https://', '')}
            <ExternalLink size={10} />
          </a>
          {' '}then add it in{' '}
          <button onClick={onSettingsClick} className="text-accent hover:underline">
            Settings
          </button>
          .
        </p>
      </div>
    </div>
  )
}
