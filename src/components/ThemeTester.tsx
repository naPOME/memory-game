import React from 'react';
import { ThemeProvider } from '../Context/ThemeContext';// Adjust path as necessary

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'theme1' | 'theme2' | 'theme3' | 'theme4' | 'theme5');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Current Theme: {theme}
      </h2>
      <div className="mb-4">
        <p>
          This is some text styled according to the current theme. The background and text color should change with the theme.
        </p>

        <button
          className={`px-4 py-2 mt-2 border rounded-md text-white bg-theme-${themeMapping[theme]}-primary hover:bg-theme-${themeMapping[theme]}-hover`}
          onClick={() => handleThemeChange('theme1')}
        >
          Switch to Theme 1
        </button>

        <button
          className={`px-4 py-2 mt-2 ml-4 border rounded-md text-white bg-theme-${themeMapping[theme]}-primary hover:bg-theme-${themeMapping[theme]}-hover`}
          onClick={() => handleThemeChange('theme2')}
        >
          Switch to Theme 2
        </button>
      </div>

      <div>
        <p className={`text-theme-${themeMapping[theme]}-secondary`}>
          This paragraph uses a secondary color that is theme-dependent.
        </p>
      </div>
    </div>
  );
};

export default TimeCh
