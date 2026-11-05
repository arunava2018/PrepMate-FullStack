import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
} from 'react';

const ThemeContext = createContext({ theme: 'light', setTheme: () => {} });

const THEME_KEY = 'prepmate-theme';

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {}
  // Fallback to system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const transitionTimer = useRef(null);

  const changeTheme = useCallback((nextTheme) => {
    const resolvedTheme = typeof nextTheme === 'function' ? nextTheme(theme) : nextTheme;
    if (resolvedTheme === theme) return;

    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.clearTimeout(transitionTimer.current);
    transitionTimer.current = window.setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 450);

    setTheme(resolvedTheme);
  }, [theme]);

  // Apply class to <html> before paint to avoid flash
  useLayoutEffect(() => {
    const root = document.documentElement;
    // Remove both, then add the current one
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Helps native UI (scrollbars, form controls) match theme
    root.style.colorScheme = theme;

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme: changeTheme }), [theme, changeTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
