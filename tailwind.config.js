/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        webGreen: "#066658",
        webGreenLight: "#e6f4f1",
      },
      spacing: {
        70: '17.5rem', // 70 * 0.25rem = 17.5rem (280px)
        85: '21.25rem', // 85 * 0.25rem = 21.25rem (340px)
      },
    },
  },
  plugins: [],
}

