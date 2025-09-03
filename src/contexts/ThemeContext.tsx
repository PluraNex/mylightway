import React, { createContext, useContext, useEffect } from 'react';
import { usePreferences, useAppStore } from '@/stores/useAppStore';

type Theme = 'light' | 'dark' | 'system';
type FontSize = 'small' | 'medium' | 'large';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  actualTheme: 'light' | 'dark'; // resolved theme (system -> light/dark)
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const preferences = usePreferences();
  const { setTheme, setFontSize } = useAppStore();

  const [actualTheme, setActualTheme] = React.useState<'light' | 'dark'>(
    'light'
  );

  // Resolve system theme
  useEffect(() => {
    const updateSystemTheme = () => {
      if (preferences.theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
        setActualTheme(systemTheme);
      } else {
        setActualTheme(preferences.theme as 'light' | 'dark');
      }
    };

    updateSystemTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateSystemTheme);

    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, [preferences.theme]);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous theme classes
    root.classList.remove('light', 'dark');

    // Add current theme class
    root.classList.add(actualTheme);

    // Update meta theme-color for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      const themeColor = actualTheme === 'dark' ? '#0f0f0f' : '#ffffff';
      themeColorMeta.setAttribute('content', themeColor);
    }
  }, [actualTheme]);

  // Apply font size to document
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous font size classes
    root.classList.remove('text-sm', 'text-base', 'text-lg');

    // Add current font size class
    const fontSizeClasses = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    };

    root.classList.add(fontSizeClasses[preferences.fontSize]);

    // Update CSS custom property for more granular control
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };

    root.style.setProperty('--font-size-base', fontSizes[preferences.fontSize]);
  }, [preferences.fontSize]);

  // Accessibility: respect user's motion preferences
  useEffect(() => {
    const root = window.document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, []);

  const value: ThemeContextType = {
    theme: preferences.theme,
    setTheme,
    fontSize: preferences.fontSize,
    setFontSize,
    actualTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Higher-order component for theme-aware components
export function withTheme<P extends object>(Component: React.ComponentType<P>) {
  const ThemedComponent = (props: P) => (
    <ThemeProvider>
      <Component {...props} />
    </ThemeProvider>
  );

  ThemedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;

  return ThemedComponent;
}

// Hook for theme-aware styling
export const useThemeAwareStyles = () => {
  const { actualTheme, fontSize } = useTheme();

  const getThemeValue = <T,>(lightValue: T, darkValue: T): T => {
    return actualTheme === 'dark' ? darkValue : lightValue;
  };

  const getFontSizeValue = <T,>(small: T, medium: T, large: T): T => {
    switch (fontSize) {
      case 'small':
        return small;
      case 'large':
        return large;
      default:
        return medium;
    }
  };

  return {
    actualTheme,
    fontSize,
    getThemeValue,
    getFontSizeValue,
    isDark: actualTheme === 'dark',
    isLarge: fontSize === 'large',
  };
};
