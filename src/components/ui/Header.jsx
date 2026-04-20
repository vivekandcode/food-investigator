import { Settings } from 'lucide-react'
import { useSettings } from '../../context/SettingsContext'
import { PROVIDERS } from '../../constants/providers'

export default function Header({ onSettingsClick }) {
  const { currentProvider, currentModel } = useSettings()
  const modelName = PROVIDERS[currentProvider.id]?.models.find(m => m.id === currentModel)?.name || currentModel

  return (
    <div className="text-center mb-8 animate-fade-up relative z-10">
      <h1 className="font-display text-3xl font-black tracking-tight">
        <span className="text-accent">Ingredient</span>
        <span className="text-white">IQ</span>
      </h1>
      <p className="text-xs text-muted tracking-[3px] uppercase mt-1 mb-3">
        <span className="inline-block w-2 h-2 rounded-full bg-accent mr-2 animate-pulse-dot" />
        AI Food Health Scanner
      </p>
      {/* Active model pill */}
      <button
        onClick={onSettingsClick}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs text-muted hover:border-accent hover:text-accent transition-all"
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: currentProvider.color }}
        />
        {currentProvider.name} · {modelName}
        <Settings size={11} />
      </button>
    </div>
  )
}
