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
      backgroundImage: {
        'green-gradient': 'linear-gradient(355deg, rgba(1,133,88,1) 0%, rgba(157,237,83,1) 100%)',
      },
      colors: {
        webGreen: "#066658",
        webGreenLight: "#e6f4f1",
        bgColor: "#09bd57",
        lightGreen: "#09bd57",
        darkGreen: "#018558",
        elementBg: "#dae2cb",
        icons: "09bd57"
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
      animation: {
        'scroll-left': 'scrollLeft 25s linear infinite',
      },
      keyframes: {
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
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
  plugins: [
    require('flowbite/plugin'),
    flowbiteReact,
    require("tailwind-scrollbar-hide")
  ],
}

