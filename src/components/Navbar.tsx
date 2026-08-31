"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Heart, Cross } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "Atividades", href: "#atividades" },
  { label: "Páginas", href: "#paginas" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1A253A]/95 backdrop-blur-md border-b border-[#BF953F]/30 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand / Logo */}
          <Link
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#BF953F] rounded-md p-1"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#B38728] p-[1.5px] shadow-sm group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#1A253A] rounded-full flex items-center justify-center">
                <Cross className="w-4 h-4 text-[#FCF6BA]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest font-bold text-lg md:text-xl text-[#FDF8F0] group-hover:text-[#FCF6BA] transition-colors">
                PNS FÁTIMA
              </span>
              <span className="text-[10px] tracking-wider text-[#BF953F] font-medium -mt-1 uppercase hidden sm:block">
                Paróquia N. Sra. de Fátima
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Navegação Principal">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#FDF8F0]/90 hover:text-[#FCF6BA] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#BF953F] after:to-[#FCF6BA] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </Link>
            ))}

            {/* "Doe" Button - Desktop */}
            <Link
              href="#doe"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold tracking-wide rounded-full text-[#1A253A] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 border border-[#FCF6BA]/40"
            >
              <Heart className="w-4 h-4 fill-[#1A253A] stroke-none" />
              <span>Doe</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-[#FDF8F0] hover:text-[#FCF6BA] hover:bg-[#BF953F]/10 focus:outline-none focus:ring-2 focus:ring-[#BF953F] transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#FCF6BA]" />
              ) : (
                <Menu className="w-6 h-6 text-[#FDF8F0]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#1A253A] border-b border-[#BF953F]/30 animate-in slide-in-from-top duration-300"
        >
          <div className="px-4 pt-3 pb-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-md text-base font-medium text-[#FDF8F0] hover:text-[#FCF6BA] hover:bg-[#BF953F]/10 transition-colors border-l-2 border-transparent hover:border-[#BF953F]"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 px-2">
              <Link
                href="#doe"
                onClick={() => setIsMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-base font-bold text-[#1A253A] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-md hover:brightness-105 transition-all"
              >
                <Heart className="w-5 h-5 fill-[#1A253A] stroke-none" />
                <span>Faça uma Doação</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
