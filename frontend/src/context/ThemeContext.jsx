import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Ensure this is correctly imported

// Create theme context with default values
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  themeClasses: {
    background: 'bg-gray-50',
    text: 'text-gray-900',
    card: 'bg-white',
    cardHover: 'hover:bg-gray-50',
    border: 'border-gray-200',
    input: 'bg-white',
    inputFocus: 'focus:ring-blue-500 focus:border-blue-500',
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    secondary: 'bg-gray-200',
    secondaryHover: 'hover:bg-gray-300'
  }
});

// Theme values and their corresponding Tailwind classes
const themes = {
  light: {
    background: 'bg-gray-50',
    text: 'text-gray-900',
    card: 'bg-white',
    cardHover: 'hover:bg-gray-50',
    border: 'border-gray-200',
    input: 'bg-white',
    inputFocus: 'focus:ring-blue-500 focus:border-blue-500',
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    secondary: 'bg-gray-200',
    secondaryHover: 'hover:bg-gray-300'
  },
  dark: {
    background: 'bg-black', // Set background to black
    text: 'text-white', // Set text to white
    card: 'bg-gray-800',
    cardHover: 'hover:bg-gray-700',
    border: 'border-gray-700',
    input: 'bg-gray-800',
    inputFocus: 'focus:ring-blue-400 focus:border-blue-400',
    primary: 'bg-blue-500',
    primaryHover: 'hover:bg-blue-600',
    secondary: 'bg-gray-700',
    secondaryHover: 'hover:bg-gray-600'
  }
};

export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Default theme
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Update theme class on document and save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Ensure themeClasses is always defined
  const themeClasses = themes[theme] || themes.light;

  const value = {
    theme,
    toggleTheme,
    themeClasses
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Define PropTypes for ThemeProvider
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node
};

// Custom Hook to use Theme safely
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};