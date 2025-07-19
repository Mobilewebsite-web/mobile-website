const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      colors: {
        webGreen: "#066658",
        webGreenLight: "#e6f4f1",
        bgColor: "#B3D4F0",
        elementBg: "#96abeb",
        iconColor: "#5249a3",
        darkBg: "#2d3250",
        darkElementBg: "#424769",
        darkElements: "#676f9d"
      },
      spacing: {
        70: '17.5rem', // 70 * 0.25rem = 17.5rem (280px)
        85: '21.25rem', // 85 * 0.25rem = 21.25rem (340px)
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'], 
        poppins: ['Poppins', 'sans-serif'], 
      },
    },
      keyframes: {
        marquee: {
          from: { left: '100%' },
          to: { left: '-150%' },
        },
      },
      animation: {
        marquee: 'marquee 6s linear infinite',
      },
    screens: {
      'smm': '240px',
      // => @media (min-width: 640px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [require('flowbite/plugin'), flowbiteReact],
}