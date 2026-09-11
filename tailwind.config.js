/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--bg-primary)',
          surface: 'var(--bg-surface)',
          card: 'var(--bg-card)',
          cardHover: 'var(--bg-card-hover)',
          subtle: 'var(--bg-subtle)',
          border: 'var(--border-color)',
          borderSubtle: 'var(--border-subtle)',
          textPrimary: 'var(--text-primary)',
          textSecondary: 'var(--text-secondary)',
          textMuted: 'var(--text-muted)',
          accent: 'var(--accent-amber)',
          accentGlow: 'var(--accent-amber-glow)',
          tagBg: 'var(--tag-bg)',
          tagBorder: 'var(--tag-border)',
        },
        bee: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        worker: {
          accent: '#FFB800',
          dark: '#0B0D11',
          card: '#12161F',
          border: '#1E2638',
          hover: '#182030',
        },
        obsidian: {
          950: '#07090E',
          900: '#0C0F17',
          850: '#111520',
          800: '#161C2B',
          700: '#212B40',
          600: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'glow-critical': '0 0 30px -5px rgba(239, 68, 68, 0.4)',
        'glow-operational': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-worker': '0 0 25px -2px rgba(255, 184, 0, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'buzz-strobe': 'buzzStrobe 0.8s ease-in-out infinite alternate',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'live-ticker': 'ticker 20s linear infinite',
      },
      keyframes: {
        buzzStrobe: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.03)', opacity: '0.85', filter: 'drop-shadow(0 0 15px rgba(239,68,68,0.8))' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
};
