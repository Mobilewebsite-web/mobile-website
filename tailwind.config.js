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
        webGreenLight: "#29AB87",
        bgColor: "#09bd57",
        lightGreen: "#09bd57",
        darkGreen: "#018558",
        elementBg: "#dae2cb",
        icons: "#09bd57",
        darkBg: "#00171f"
      },
      spacing: {
        70: '17.5rem',
        85: '21.25rem',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          from: { left: '100%' },
          to: { left: '-150%' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 6s linear infinite',
        'scroll-left': 'scrollLeft 25s linear infinite',
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

