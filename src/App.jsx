import { useState } from 'react'
import Header from './components/ui/Header'
import ErrorBanner from './components/ui/ErrorBanner'
import NoKeyWarning from './components/ui/NoKeyWarning'
import ScannerTabs from './components/scanner/ScannerTabs'
import CameraScanner from './components/scanner/CameraScanner'
import UploadScanner from './components/scanner/UploadScanner'
import TextScanner from './components/scanner/TextScanner'
import ResultsPanel from './components/results/ResultsPanel'
import SettingsPanel from './components/settings/SettingsPanel'
import { useAnalyze } from './hooks/useAnalyze'
import { useSettings } from './context/SettingsContext'

export default function App() {
  const [tab, setTab] = useState('text')
  const [showSettings, setShowSettings] = useState(false)
  const { result, loading, error, analyze, analyzeImage, reset } = useAnalyze()
  const { currentApiKey, currentProvider } = useSettings()

  const handleReset = () => reset()

  const handleTabChange = (newTab) => {
    setTab(newTab)
    reset()
  }

  const handleImageCapture = (base64) => {
    if (!currentProvider.supportsImages) return
    analyzeImage(base64)
  }

  return (
    <div className="relative z-10 max-w-md mx-auto px-4 py-6 pb-20 min-h-screen">
      <Header onSettingsClick={() => setShowSettings(true)} />

      {!currentApiKey && (
        <NoKeyWarning onSettingsClick={() => setShowSettings(true)} />
      )}

      <ErrorBanner message={error} onDismiss={reset} />

      {result ? (
        <ResultsPanel result={result} onReset={handleReset} />
      ) : (
        <>
          <ScannerTabs active={tab} onChange={handleTabChange} />
          {tab === 'camera' && <CameraScanner onCapture={handleImageCapture} loading={loading} />}
          {tab === 'upload' && <UploadScanner onCapture={handleImageCapture} loading={loading} />}
          {tab === 'text'   && <TextScanner onAnalyze={analyze} loading={loading} />}
        </>
      )}

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  )
}
