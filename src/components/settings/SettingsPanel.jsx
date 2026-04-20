import { useState } from 'react'
import { X, Eye, EyeOff, ExternalLink, Check } from 'lucide-react'
import { PROVIDERS } from '../../constants/providers'
import { useSettings } from '../../context/SettingsContext'

export default function SettingsPanel({ onClose }) {
  const { settings, currentProvider, updateProvider, updateModel, updateApiKey } = useSettings()
  const [showKeys, setShowKeys] = useState({})
  const [saved, setSaved] = useState({})

  const toggleShow = (id) => setShowKeys(s => ({ ...s, [id]: !s[id] }))

  const handleKeyChange = (providerId, val) => {
    updateApiKey(providerId, val)
    setSaved(s => ({ ...s, [providerId]: false }))
  }

  const handleKeySave = (providerId) => {
    setSaved(s => ({ ...s, [providerId]: true }))
    setTimeout(() => setSaved(s => ({ ...s, [providerId]: false })), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-hide animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-surface z-10">
          <div>
            <h2 className="font-display font-bold text-lg text-white">Settings</h2>
            <p className="text-xs text-muted mt-0.5">Configure AI providers & API keys</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface2 text-muted hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Provider Selection */}
          <div>
            <p className="text-xs text-muted tracking-[2px] uppercase mb-3">Active Provider</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(PROVIDERS).map(p => (
                <button
                  key={p.id}
                  onClick={() => updateProvider(p.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    settings.provider === p.id
                      ? 'border-accent bg-accent/5 text-white'
                      : 'border-border bg-surface2 text-muted hover:border-border/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-sm">{p.name}</span>
                    {settings.provider === p.id && <Check size={14} className="text-accent" />}
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-mono ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Per-provider config */}
          {Object.values(PROVIDERS).map(p => (
            <div key={p.id} className={`rounded-xl border p-4 transition-all ${
              settings.provider === p.id ? 'border-accent/40 bg-accent/3' : 'border-border bg-surface2'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="font-display font-bold text-sm text-white">{p.name}</span>
                </div>
                <a
                  href={p.signupUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[10px] text-muted hover:text-accent transition-colors"
                >
                  Get free key <ExternalLink size={10} />
                </a>
              </div>

              {/* Model selector */}
              <div className="mb-3">
                <label className="text-[10px] text-muted uppercase tracking-widest block mb-1.5">Model</label>
                <select
                  value={settings.models[p.id]}
                  onChange={e => updateModel(p.id, e.target.value)}
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-xs text-white font-mono outline-none focus:border-accent transition-colors"
                >
                  {p.models.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name}{m.recommended ? ' ⭐' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* API Key */}
              <div>
                <label className="text-[10px] text-muted uppercase tracking-widest block mb-1.5">
                  API Key
                  <span className="ml-2 normal-case text-muted/60">· {p.freeLimit} free</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showKeys[p.id] ? 'text' : 'password'}
                      value={settings.apiKeys[p.id] || ''}
                      onChange={e => handleKeyChange(p.id, e.target.value)}
                      placeholder={`Paste ${p.name} key...`}
                      className="w-full bg-bg border border-border rounded-lg px-3 py-2 pr-8 text-xs text-white font-mono outline-none focus:border-accent transition-colors placeholder:text-muted/40"
                    />
                    <button
                      onClick={() => toggleShow(p.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-white"
                    >
                      {showKeys[p.id] ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                  <button
                    onClick={() => handleKeySave(p.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                      saved[p.id]
                        ? 'bg-good/20 text-good border border-good/30'
                        : 'bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20'
                    }`}
                  >
                    {saved[p.id] ? <Check size={13} /> : 'Save'}
                  </button>
                </div>
                {p.supportsImages && (
                  <p className="text-[10px] text-accent3/70 mt-1.5">✦ Supports image scanning</p>
                )}
              </div>
            </div>
          ))}

          <p className="text-[10px] text-muted/60 text-center pb-2">
            API keys are stored only in your browser's localStorage
          </p>
        </div>
      </div>
    </div>
  )
}
