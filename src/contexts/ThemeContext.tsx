import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    return localStorage.getItem('shopsphere-theme') === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.body.dataset.theme = mode;
    localStorage.setItem('shopsphere-theme', mode);
  }, [mode]);

  const value = useMemo(
    () => ({ mode, toggleMode: () => setMode((current) => (current === 'light' ? 'dark' : 'light')) }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}
