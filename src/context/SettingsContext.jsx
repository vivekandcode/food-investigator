import { createContext, useContext, useState, useEffect } from 'react'
import { PROVIDERS, DEFAULT_PROVIDER } from '../constants/providers'

const SettingsContext = createContext(null)

const STORAGE_KEY = 'ingredientiq_settings'

function getDefaultSettings() {
  // Load API keys from env as defaults
  const keys = {}
  Object.values(PROVIDERS).forEach(p => {
    keys[p.id] = import.meta.env[p.envKey] || ''
  })

  return {
    provider: DEFAULT_PROVIDER,
    models: Object.fromEntries(
      Object.values(PROVIDERS).map(p => [p.id, p.models.find(m => m.recommended)?.id || p.models[0].id])
    ),
    apiKeys: keys,
  }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Merge with defaults to handle new providers
        const defaults = getDefaultSettings()
        return {
          ...defaults,
          ...parsed,
          apiKeys: { ...defaults.apiKeys, ...parsed.apiKeys },
          models: { ...defaults.models, ...parsed.models },
        }
      }
    } catch {}
    return getDefaultSettings()
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const updateProvider = (provider) => setSettings(s => ({ ...s, provider }))

  const updateModel = (provider, model) =>
    setSettings(s => ({ ...s, models: { ...s.models, [provider]: model } }))

  const updateApiKey = (provider, key) =>
    setSettings(s => ({ ...s, apiKeys: { ...s.apiKeys, [provider]: key } }))

  const currentProvider = PROVIDERS[settings.provider]
  const currentModel = settings.models[settings.provider]
  const currentApiKey = settings.apiKeys[settings.provider]

  return (
    <SettingsContext.Provider value={{
      settings,
      currentProvider,
      currentModel,
      currentApiKey,
      updateProvider,
      updateModel,
      updateApiKey,
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
