import { useState } from 'react'
import { Sparkles } from 'lucide-react'

const EXAMPLE = `Potato (60%), Edible Vegetable Oil (Palmolein Oil), Sugar, Maltodextrin, Spices and Condiments (Onion Powder, Garlic Powder, Chilli Powder (0.9%)), Dextrose, Edible Common Salt, Edible Vegetable Oil (Sunflower Oil), Flavour Enhancer (INS 627, INS 631), Natural & Nature Identical Flavouring Substances (Chilli & Ginger Flavours) and Anticaking Agent (INS 551).`

export default function TextScanner({ onAnalyze, loading }) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (text.trim()) onAnalyze(text.trim())
  }

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="p-5">
        <label className="text-[10px] text-muted uppercase tracking-[2px] block mb-2">
          Paste Ingredients List
        </label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={`e.g. ${EXAMPLE}`}
          rows={7}
          className="w-full bg-surface2 border border-border rounded-xl px-4 py-3 text-xs text-white font-mono leading-relaxed outline-none focus:border-accent transition-colors resize-none placeholder:text-muted/40"
        />

        <button
          onClick={() => setText(EXAMPLE)}
          className="mt-2 text-[10px] text-muted/60 hover:text-accent3 transition-colors tracking-wide"
        >
          ✦ Load example ingredients
        </button>

        <button
          onClick={handleSubmit}
          disabled={!text.trim() || loading}
          className="mt-3 w-full py-3.5 bg-accent text-black font-display font-bold text-sm tracking-widest rounded-xl hover:bg-accent/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed uppercase flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={15} />
              Analyze Ingredients
            </>
          )}
        </button>
      </div>
    </div>
  )
}
