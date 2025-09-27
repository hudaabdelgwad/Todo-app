/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        dark: "hsl(235, 21%, 11%)",
        light: "hsl(0, 0%, 98%)",
        DarkList: "hsl(235, 24%, 19%)",
        lightList:"hsl(0, 0%, 98%)"
      },
      backgroundImage: {
        desktopLight: "url('/src/images/bg-desktop-light.jpg')",
        desktopDark: "url('/src/images/bg-desktop-dark.jpg')",
        mobileLight:"url('/src/images/bg-mobile-light.jpg')",
        mobileDark:"url('/src/images/bg-mobile-dark.jpg')"
      },
      fontFamily: {
        JosefinSans: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        darkFont: "hsl(236, 9%, 61%)",
        secondColorGred: "hsl(280, 87%, 65%)",
        firstColorGred: "hsl(192, 100%, 67%)",
        dividerDark: "hsl(233, 14%, 35%)",
        textHover: "hsl(220, 98%, 61%)",
        inputColor:"hsl(235, 16%, 43%)",
        lightColor:"hsl(0, 0%, 98%)"
      },
      boxShadow: {
        'custom-light': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 4px 12px rgba(0, 0, 0, 0.5)',
        'glow-blue': '0 0 10px rgba(59, 130, 246, 0.8)', // glowing effect
      }
    },
  },
  plugins: [],
};
