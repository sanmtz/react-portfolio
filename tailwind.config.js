/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#f4f5f9',
        'surface-alt': '#ebedf5',
        'surface-card': '#ffffff',
        'surface-dark': '#0a0a14',
        accent: '#8c1d2b',
        'accent-light': '#b8354a',
        'accent-glow': 'rgba(140, 29, 43, 0.15)',
        'text-primary': '#0f0f1a',
        'text-secondary': '#5c5c73',
        'text-muted': '#9393a8',
        border: 'rgba(0, 0, 0, 0.06)',
        'glow-blue': 'rgba(99, 102, 241, 0.08)',
        'glow-violet': 'rgba(139, 92, 246, 0.06)',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
