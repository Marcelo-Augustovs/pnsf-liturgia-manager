'use client';

import React from 'react';
import Link from 'next/link';
import { Church, Home, BookOpen, Layers, Sparkles, RefreshCw } from 'lucide-react';

interface SacristiaHeaderProps {
  onResetData?: () => void;
}

export const SacristiaHeader: React.FC<SacristiaHeaderProps> = ({ onResetData }) => {
  return (
    <header className="bg-gradient-to-b from-[#17243A] via-[#1A2840] to-[#121D2F] text-white sticky top-0 z-30 shadow-md border-b border-[#253654]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* BRAND & TITLE */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-10 h-10 rounded-full border border-[#DDBB70]/60 bg-[#17243A] flex items-center justify-center text-[#DDBB70] shadow-sm flex-shrink-0 ring-2 ring-[#DDBB70]/20">
            <Church className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-serif tracking-wide text-white leading-tight">
                Sacristia Paroquial
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDBB70]/20 text-[#DDBB70] border border-[#DDBB70]/40 uppercase tracking-widest hidden sm:inline-block">
                Gestão Litúrgica
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#DDBB70]/90 uppercase mt-0.5">
              CENTRAL DE ALFAIAS, VASOS SAGRADOS, PARAMENTOS E CONSUMÍVEIS
            </p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#DDBB70] hover:bg-[#DDBB70]/10 border border-[#DDBB70]/30 transition-all cursor-pointer min-h-[44px] sm:min-h-0"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Início</span>
          </Link>

          <Link
            href="/ritos"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#DDBB70] hover:bg-[#DDBB70]/10 border border-[#DDBB70]/30 transition-all cursor-pointer min-h-[44px] sm:min-h-0"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Guia de Ritos</span>
          </Link>

          <Link
            href="/ritos-complementares"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#DDBB70] hover:bg-[#DDBB70]/10 border border-[#DDBB70]/30 transition-all cursor-pointer min-h-[44px] sm:min-h-0"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ritos Complementares</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#DDBB70] text-[#17243A] shadow-sm min-h-[44px] sm:min-h-0">
            <Sparkles className="w-3.5 h-3.5 text-[#17243A]" />
            <span>Sacristia</span>
          </div>

          {onResetData && (
            <button
              type="button"
              onClick={onResetData}
              title="Restaurar dados padrão da Sacristia"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/15 text-[#DDBB70]/80 hover:text-[#DDBB70] border border-white/10 transition-all cursor-pointer min-h-[44px] sm:min-h-0 ml-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden lg:inline">Restaurar Dados</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
