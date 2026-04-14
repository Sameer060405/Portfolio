/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          neon: '#00e5ff',
        },
        purple: {
          neon: '#a855f7',
        },
        dark: {
          900: '#070712',
          800: '#0d0d1f',
          700: '#111126',
          600: '#161630',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 12px rgba(0, 229, 255, 0.4)',
        'neon-purple': '0 0 12px rgba(168, 85, 247, 0.4)',
        'neon-blue': '0 0 12px rgba(59, 130, 246, 0.4)',
        'card-hover': '0 0 24px rgba(0, 229, 255, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
