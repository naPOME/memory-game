const { createThemes } = require('tw-colors');

module.exports = {
  content: [
    './src/***/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  safelist: [
    {
      pattern: /^font-/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        retro: ['"Press Start 2P"', 'sans-serif'],
        sans: ['"Roboto"', 'sans-serif'],
        serif: ['"Merriweather"', 'serif'],
        mono: ['"Courier New"', 'monospace'],
        cursive: ['"Pacifico"', 'cursive'],
      },
    },
  },
  plugins: [
    createThemes({
      theme1: { // Iceberg Light
        primary: '#2D539E', // Main Color (Blue)
    secondary: '#262A3F', // Caret Color (Dark Blue)
    accent: '#ADB1C4', // Sub Color (Light Gray)
    background: '#E8E9EC', // Background Color (Light Gray)
    text: '#33374C', // Text Color (Dark Gray)
      },
      theme2: { // Graen
        primary: '#A59682', // Main Color (Beige)
        secondary: '#A59682', // Caret Color (Dark Red)
        accent: '#181D1A', // Sub Color (Dark Gray)
        background: '#303C36', // Background Color (Dark Green)
        text: '#A59682', // Text Color (Beige)
      },
      theme3: { // Gruvbox Dark
        primary: '#689D6A', // Main Color (Green)
    secondary: '#689D6A', // Caret Color (Green)
    accent: '#A89984', // Sub Color (Gray)
    background: '#FBF1C7', // Background Color (Light Beige)
    text: '#3C3836', // Text Color (Dark Brown)
      },
      theme4: { // Hedge
        primary: '#6A994E', // Main Color (Green)
    secondary: '#F2EFBB', // Caret Color (Light Yellow)
    accent: '#EDE5B4', // Sub Color (Beige)
    background: '#415E31', // Background Color (Dark Green)
    text: '#F7F1D6', // Text Color (Light Beige)
    
      },
      theme5: { // Honey
        primary: '#FFF546', // Main Color (Bright Yellow)
        secondary: '#795200', // Caret Color (Dark Brown)
        accent: '#A66B00', // Sub Color (Brown)
        background: '#F2AA00', // Background Color (Golden Yellow)
        text: '#F3EECB', // Text Color (Light Beige)
      },
      
    }),
  ],
};
