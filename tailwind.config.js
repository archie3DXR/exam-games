// tailwind.config.js Cheat Sheet for Custom Setup

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}' // include all source files
  ],
  darkMode: 'media', // or 'class'

  theme: {
    extend: {
      // 💡 CUSTOM COLORS
      colors: {

            neonBlue: '#00C6FF',
            neonPurple: '#8E2DE2',
            neonPink: '#FF6EC7',
            neonGreen: '#39FF14',
            neonOrange: '#FFB347',
            neonYellow: '#FFFF33',
            neonCyan: '#00FFFF',
            neonRed: '#FF073A',
            darkBg: '#0A0A0A',         // deep background
            softGlow: '#1E1E2F',       // muted surface card
            grayGlass: 'rgba(255,255,255,0.05)', // glassmorphism card bg
            overlayDark: 'rgba(0,0,0,0.6)',
      },

      // 🔤 CUSTOM FONT FAMILY
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },

      // 🌈 CUSTOM BOX SHADOW
      boxShadow: {
        glow: '0 0 20px rgba(142, 45, 226, 0.6)',
      },

      // 🎞️ CUSTOM ANIMATIONS
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 12px #8E2DE2)' },
          '50%': { filter: 'drop-shadow(0 0 18px #00C6FF)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },

      // 📏 SPACING EXTRAS
      spacing: {
        72: '18rem',
        80: '20rem',
        96: '24rem',
      },

      // 📐 BORDER RADIUS
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },

  plugins: [],
}
