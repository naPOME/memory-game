import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';

interface Font {
  name: string;
  className: string;
}
type FontType = 'retro' | 'sans' | 'serif' | 'mono' | 'cursive';

const fonts: Font[] = [
  { name: 'Retro', className: 'retro' },
  { name: 'Roboto', className: 'sans' },
  { name: 'Merriweather', className: 'serif' },
  { name: 'Courier New', className: 'mono' },
  { name: 'Pacifico', className: 'cursive' },
];

export const FontSelector: React.FC = () => {
  const { font, setFont } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFontChange = (fontClassName: FontType): void => {
    setFont(fontClassName);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent | Event): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center px-2 mt-2 py-1 bg-primary text-xs rounded-xl border border-accent border-dashed shadow-md hover:bg-accent text-background transition"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Font
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-48 bg-background border shadow-lg rounded z-10">
          {fonts.map((f) => (
            <li key={f.className}>
            <button
                onClick={() => handleFontChange(f.className as FontType)}
                className={`w-full text-left px-4 py-2 text-secondary hover:bg-accent ${
                  font === f.className ? 'font-bold' : ''
                }`}
              >
                {f.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
