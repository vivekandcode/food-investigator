const LEVEL_STYLES = {
  high:     { badge: 'bg-danger/10 text-danger border-danger/30',   label: 'High' },
  medium:   { badge: 'bg-warn/10 text-warn border-warn/30',         label: 'Medium' },
  low:      { badge: 'bg-good/10 text-good border-good/30',         label: 'Low' },
  positive: { badge: 'bg-accent/10 text-accent border-accent/30',   label: 'Good' },
}

const LEVEL_ORDER = { high: 0, medium: 1, low: 2, positive: 3 }

export default function IngredientFlags({ ingredients }) {
  if (!ingredients?.length) return null

  const sorted = [...ingredients].sort(
    (a, b) => (LEVEL_ORDER[a.level] ?? 4) - (LEVEL_ORDER[b.level] ?? 4)
  )

  return (
    <div className="mb-4">
      <p className="text-[10px] text-muted tracking-[2px] uppercase mb-3 pl-1">Ingredient Analysis</p>
      <div className="flex flex-col gap-2">
        {sorted.map((ing, i) => {
          const style = LEVEL_STYLES[ing.level] || LEVEL_STYLES.low
          return (
            <div
              key={i}
              className="bg-surface border border-border rounded-xl p-3.5 flex items-start gap-3 animate-fade-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className="text-xl flex-shrink-0 mt-0.5">{ing.emoji || '🔬'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-mono mb-0.5">{ing.name}</p>
                <p className="text-xs text-muted leading-relaxed">{ing.concern}</p>
              </div>
              <span className={`flex-shrink-0 text-[9px] px-2 py-1 rounded-full border font-mono font-bold uppercase tracking-wide ${style.badge}`}>
                {style.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
