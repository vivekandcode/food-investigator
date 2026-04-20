export default function NutritionStrip({ nutrition, color }) {
  if (!nutrition) return null
  const items = [
    { label: 'Energy', value: nutrition.energy },
    { label: 'Protein', value: nutrition.protein },
    { label: 'Carbs', value: nutrition.carbs },
  ].filter(i => i.value)

  if (!items.length) return null

  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {items.map(({ label, value }) => (
        <div key={label} className="bg-surface border border-border rounded-xl p-3 text-center">
          <p className="font-display font-bold text-lg leading-tight" style={{ color }}>{value}</p>
          <p className="text-[9px] text-muted uppercase tracking-widest mt-1">{label}</p>
        </div>
      ))}
    </div>
  )
}
