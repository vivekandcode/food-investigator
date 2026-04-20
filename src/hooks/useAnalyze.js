import { useState } from 'react'
import { analyzeIngredients, callGeminiVision } from '../utils/api'
import { useSettings } from '../context/SettingsContext'

export function useAnalyze() {
  const { settings, currentProvider, currentModel, currentApiKey } = useSettings()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = async (ingredientsText) => {
    if (!currentApiKey) {
      setError('No API key set. Please add your API key in Settings.')
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyzeIngredients({
        provider: settings.provider,
        model: currentModel,
        apiKey: currentApiKey,
        ingredientsText,
      })
      setResult(data)
    } catch (err) {
      setError(err.message || 'Analysis failed. Please check your API key and try again.')
    } finally {
      setLoading(false)
    }
  }

  const analyzeImage = async (imageBase64) => {
    if (!currentApiKey) {
      setError('No API key set. Please add your API key in Settings.')
      return
    }
    if (!currentProvider.supportsImages) {
      setError(`${currentProvider.name} does not support image analysis. Switch to Gemini or type the ingredients manually.`)
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const raw = await callGeminiVision(currentApiKey, currentModel, imageBase64)
      const clean = raw.replace(/```json|```/g, '').trim()
      setResult(JSON.parse(clean))
    } catch (err) {
      setError(err.message || 'Image analysis failed.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
  }

  return { result, loading, error, analyze, analyzeImage, reset }
}
