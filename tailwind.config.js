/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        bg: '#0a0a0f',
        surface: '#12121a',
        surface2: '#1a1a26',
        border: '#2a2a3d',
        accent: '#00ffa3',
        accent2: '#ff6b35',
        accent3: '#7b61ff',
        muted: '#6b6b8a',
        danger: '#ff4d6d',
        warn: '#ffd166',
        good: '#06d6a0',
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease infinite',
        'fade-up': 'fadeUp 0.5s ease both',
        'fade-down': 'fadeDown 0.6s ease both',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
