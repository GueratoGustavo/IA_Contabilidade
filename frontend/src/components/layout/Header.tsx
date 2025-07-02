import React from "react";
import type { Theme } from "../../types";
import { SunIcon, MoonIcon } from "../../icons/ThemeIcons";
import { MenuIcon, XIcon } from "../../icons/MenuIcons";

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({
  theme,
  toggleTheme,
  isMenuOpen,
  toggleMenu,
}) => {
  const navLinks = [
    { href: "#features", label: "Recursos" },
    { href: "#demo", label: "Demonstração" },
    { href: "#pricing", label: "Preços" },
    { href: "#contact", label: "Contato" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-klyro-dark-bg/80 backdrop-blur-lg border-b border-slate-200 dark:border-klyro-dark-border transition-colors duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#hero"
          className="text-2xl font-bold text-slate-800 dark:text-white"
        >
          Klyro<span className="text-klyro-blue">.</span>
        </a>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-klyro-blue dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <a
            href="#pricing"
            className="hidden sm:inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Testar Grátis
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-klyro-dark-card transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5" />
            )}
          </button>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-klyro-dark-card transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-klyro-dark-bg/95 backdrop-blur-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen
            ? "max-h-screen border-t border-slate-200 dark:border-klyro-dark-border"
            : "max-h-0"
        }`}
      >
        <nav className="flex flex-col items-center space-y-4 p-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-klyro-blue dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={toggleMenu}
            className="w-full text-center bg-blue-600 text-white font-semibold mt-4 px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Testar Grátis por 7 dias
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
