import { Link } from "react-router-dom";
import { Bell, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// A custom logo component that creates a modern, AI-themed SVG logo
const AILogo = () => {
  const gradientStyle = {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))'
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      className="h-10 w-10 rounded-full transition-transform hover:scale-105"
      style={gradientStyle}
    >
      <path 
        d="M30 35 L50 25 L70 35 L70 65 L50 75 L30 65 Z" 
        fill="none" 
        stroke="white" 
        strokeWidth="3"
      />
      <circle cx="50" cy="50" r="10" fill="white" opacity="0.7">
        <animate 
          attributeName="opacity"
          values="0.7;0.9;0.7"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <path 
        d="M38 30 L62 30" 
        stroke="white" 
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path 
        d="M38 70 L62 70" 
        stroke="white" 
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

// SearchBar component
const SearchBar = () => {
  const { themeClasses } = useTheme();
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        type="search"
        placeholder="Search proposals..."
        className={`
          pl-10 pr-4 py-2 border rounded-lg w-64
          ${themeClasses.input} hover:${themeClasses.cardHover}
          transition-colors duration-200 ease-in-out
          ${themeClasses.inputFocus} ${themeClasses.border}
        `}
      />
    </div>
  );
};

// NotificationBell component
const NotificationBell = () => {
  const { themeClasses } = useTheme();
  return (
    <button 
      className={`
        p-2 ${themeClasses.cardHover} rounded-full relative 
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
      aria-label="Notifications"
    >
      <Bell className={`h-5 w-5 ${themeClasses.text}`} />
      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
    </button>
  );
};

// Theme toggle button component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500
        relative group
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`
            h-5 w-5 absolute top-0 left-0
            transition-all duration-200
            ${theme === 'dark' 
              ? 'opacity-100 rotate-0 text-yellow-400' 
              : 'opacity-0 -rotate-90 text-gray-600'
            }
          `}
        />
        <Moon 
          className={`
            h-5 w-5 absolute top-0 left-0
            transition-all duration-200
            ${theme === 'light'
              ? 'opacity-100 rotate-0 text-gray-600'
              : 'opacity-0 rotate-90 text-gray-400'
            }
          `}
        />
      </div>
    </button>
  );
};

// Navbar component
const Navbar = () => {
  const { themeClasses } = useTheme();
  return (
    <nav className={`
      fixed top-0 left-0 right-0 h-16 z-30
      shadow-sm backdrop-blur-sm
      ${themeClasses.card} ${themeClasses.border} border-b
    `}>
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left section with logo and title */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className={`
              flex items-center gap-2 text-xl font-bold
              ${themeClasses.text} hover:text-blue-600
              transition-colors duration-200
            `}
          >
            <AILogo />
            <span className="hidden sm:inline">AI Proposal System</span>
          </Link>
        </div>

        {/* Right section with search, notifications, and theme toggle */}
        <div className="flex items-center space-x-6">
          <SearchBar />
          <NotificationBell />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;