/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"IBM Plex Mono"', '"JetBrains Mono"', '"Fira Code"', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#8B5CF6', // Purple-500
        'secondary': '#6366f1',
        'highlight': '#C4B5FD', // Purple-200
        'dark': {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '900': '#0f172a',
          '950': '#020617',
        },
      },
    },
  },
  plugins: [],
}