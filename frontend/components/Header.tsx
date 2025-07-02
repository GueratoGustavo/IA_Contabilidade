import React, { useState } from "react";
import Button from "./Button";
import { MenuIcon } from "../icons/MenuIcon";
import { XIcon } from "../icons/XIcon";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-klyro-dark/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white z-10">
          <a href="#" onClick={closeMenu}>
            Klyro<span className="text-klyro-primary">.</span>
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Funcionalidades
          </a>
          <a
            href="#pricing"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Planos
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Contato
          </a>
        </nav>

        {/* Botão Testar grátis no desktop */}
        <div className="hidden md:block">
          <Button variant="primary">Testar grátis</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-10 flex items-center space-x-4">
          {/* Botão menu mobile */}
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
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

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 left-0 w-full h-screen bg-gray-900 md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ paddingTop: "80px" }}
      >
        <nav className="flex flex-col items-center text-center space-y-6 px-6 pt-8">
          <a
            href="#features"
            onClick={closeMenu}
            className="text-xl text-gray-300 hover:text-white transition-colors py-2"
          >
            Funcionalidades
          </a>
          <a
            href="#pricing"
            onClick={closeMenu}
            className="text-xl text-gray-300 hover:text-white transition-colors py-2"
          >
            Planos
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="text-xl text-gray-300 hover:text-white transition-colors py-2"
          >
            Contato
          </a>
          <Button variant="primary" className="w-full mt-6" onClick={closeMenu}>
            Testar grátis
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
