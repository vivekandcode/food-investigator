import { useEffect, useState } from 'react'

const GRADE_COLORS = {
  'A+': '#00ffa3',
  'A':  '#06d6a0',
  'B':  '#7bde6c',
  'C':  '#ffd166',
  'D':  '#ff9f43',
  'F':  '#ff4d6d',
}

export default function ScoreCircle({ score, grade, verdict }) {
  const [animScore, setAnimScore] = useState(0)
  const color = GRADE_COLORS[grade] || '#7b61ff'
  const circumference = 314
  const offset = circumference - (animScore / 100) * circumference

  useEffect(() => {
    let cur = 0
    const target = Math.max(0, Math.min(100, score || 0))
    const timer = setInterval(() => {
      cur = Math.min(cur + 2, target)
      setAnimScore(cur)
      if (cur >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [score])

  return (
    <div className="bg-surface border border-border rounded-2xl p-7 text-center mb-4 animate-fade-up">
      <p className="text-[10px] text-muted tracking-[3px] uppercase mb-4">Health Score</p>

      {/* Circle */}
      <div className="relative w-32 h-32 mx-auto mb-5">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#1a1a26" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="50"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-black text-4xl leading-none" style={{ color }}>
            {animScore}
          </span>
          <span className="text-xs text-muted font-mono">/100</span>
        </div>
      </div>

      <p className="font-display font-bold text-2xl mb-1" style={{ color }}>{grade}</p>
      <p className="text-xs text-muted leading-relaxed max-w-xs mx-auto">{verdict}</p>
    </div>
  )
}
