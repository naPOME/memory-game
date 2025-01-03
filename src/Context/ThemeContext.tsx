import  { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'theme1' | 'theme2' | 'theme3' | 'theme4' | 'theme5';
type Font = 'retro' | 'sans' | 'serif' | 'mono' | 'cursive';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  font: Font;
  setFont: (font: Font) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'theme1';
  });

  const [font, setFont] = useState<Font>(() => {
    return (localStorage.getItem('font') as Font) || 'retro';
  });

  useEffect(() => {
    // Apply the theme to the root element (html)
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Apply the font class to the body or html element
    const rootElement = document.documentElement;
    rootElement.classList.remove('retro', 'sans', 'serif', 'mono', 'cursive'); // Clear previous font
    rootElement.classList.add(font); // Apply new font
    localStorage.setItem('font', font);
  }, [font]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, font, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
