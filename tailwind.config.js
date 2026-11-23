/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050B18',
        panel: '#0B1730',
        primary: '#2F8FD8',
        cyan: '#35D0FF',
        text: '#E6EDF7',
        muted: '#8FA3BF',
        alert: '#E5484D',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        'panel': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-primary': '0 0 20px -3px rgba(47, 143, 216, 0.35)',
        'glow-cyan': '0 0 20px -3px rgba(53, 208, 255, 0.35)',
      },
    },
  },
  plugins: [],
}
