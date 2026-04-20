import { RotateCcw } from 'lucide-react'
import ScoreCircle from './ScoreCircle'
import NutritionStrip from './NutritionStrip'
import IngredientFlags from './IngredientFlags'
import SummaryCard from './SummaryCard'
import { PROVIDERS } from '../../constants/providers'
import { useSettings } from '../../context/SettingsContext'

const GRADE_COLORS = {
  'A+': '#00ffa3', 'A': '#06d6a0', 'B': '#7bde6c',
  'C': '#ffd166', 'D': '#ff9f43', 'F': '#ff4d6d',
}

export default function ResultsPanel({ result, onReset }) {
  const { settings } = useSettings()
  const provider = PROVIDERS[settings.provider]
  const color = GRADE_COLORS[result.grade] || '#7b61ff'

  return (
    <div className="animate-fade-up">
      {/* Product name + provider badge */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <p className="text-[10px] text-muted tracking-[2px] uppercase">Product</p>
          <p className="font-display font-bold text-white text-lg leading-tight">{result.productName}</p>
        </div>
        <div
          className="text-[9px] px-2 py-1 rounded-full border font-mono tracking-wide"
          style={{ color: provider.color, borderColor: provider.color + '40', backgroundColor: provider.color + '10' }}
        >
          {provider.name}
        </div>
      </div>

      <ScoreCircle score={result.score} grade={result.grade} verdict={result.verdict} />
      <NutritionStrip nutrition={result.nutrition} color={color} />
      <IngredientFlags ingredients={result.ingredients} />
      <SummaryCard summary={result.summary} alternatives={result.alternatives} />

      <button
        onClick={onReset}
        className="w-full py-4 border border-border rounded-xl text-xs font-mono text-muted hover:text-accent hover:border-accent tracking-[2px] uppercase transition-all"
      >
        ↺ Scan Another Product
      </button>
    </div>
  )
}
