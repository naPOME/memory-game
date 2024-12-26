/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: { fontFamily: {
      retro: ['"Press Start 2P"', 'sans-serif'],
      backgroundImage: {
        stars: "radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)",
      },
    },
  },

  },
  plugins: [require("daisyui")], 
  daisyui: {
    themes: ["light"], // Set the default theme
  },
};
