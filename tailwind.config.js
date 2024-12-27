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
      theme1: {
        primary: '#4CAF50',
        secondary: '#8BC34A',
        accent: '#FFC107',
        background: '#E8F5E9',  
        text: '#1B5E20',         
      },
      theme2: {
        primary: '#3F51B5',
        secondary: '#03A9F4',
        accent: '#E91E63',
        background: '#E3F2FD',  
        text: '#1A237E',         
      },
      theme3: {
        primary: '#FF5722',
        secondary: '#FFC107',
        accent: '#4CAF50',
        background: '#FFF3E0',  
        text: '#D32F2F',         
      },
      theme4: {
        primary: '#9C27B0',
        secondary: '#673AB7',
        accent: '#03A9F4',
        background: '#F3E5F5',  
        text: '#6A1B9A',        
      },
      theme5: {
        primary: '#F44336',
        secondary: '#E91E63',
        accent: '#9C27B0',
        background: '#FFEBEE', 
        text: '#B71C1C',        
      },
    }),
  ],
};
