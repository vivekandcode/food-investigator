export default function SummaryCard({ summary, alternatives }) {
  return (
    <div className="space-y-3 mb-4">
      {summary && (
        <div>
          <p className="text-[10px] text-muted tracking-[2px] uppercase mb-2 pl-1">Verdict</p>
          <div className="bg-surface border border-border rounded-xl p-4 text-xs text-[#c0c0d8] leading-relaxed font-mono">
            {summary}
          </div>
        </div>
      )}

      {alternatives?.length > 0 && (
        <div>
          <p className="text-[10px] text-muted tracking-[2px] uppercase mb-2 pl-1">Healthier Alternatives</p>
          <div className="bg-surface border border-border rounded-xl p-4 flex flex-wrap gap-2">
            {alternatives.map((alt, i) => (
              <span
                key={i}
                className="text-[11px] px-3 py-1.5 bg-good/10 text-good border border-good/20 rounded-full font-mono"
              >
                ✦ {alt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
