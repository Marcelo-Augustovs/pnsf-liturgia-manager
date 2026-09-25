'use client';

import React from 'react';
import { SacristiaState, SacristiaCategoria } from '@/types/sacristia';
import { Droplets, Layers, Shield, Sparkles, Package, Image as ImageIcon, ArrowRight } from 'lucide-react';

interface CategoriesGridProps {
  state: SacristiaState;
  activeCategory: SacristiaCategoria | 'todas';
  onSelectCategory: (cat: SacristiaCategoria | 'todas') => void;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  state,
  activeCategory,
  onSelectCategory,
}) => {
  const categories: Array<{
    id: SacristiaCategoria;
    nome: string;
    subtitulo: string;
    icon: React.ReactNode;
    count: number;
    detalhes: string;
    badgeRegra?: string;
  }> = [
    {
      id: 'alfaias',
      nome: '1. Alfaias Litúrgicas',
      subtitulo: 'Sanguíneo, Corporal, Pala e Manustérgio',
      icon: <Droplets className="w-5 h-5 text-[#2563EB]" />,
      count: state.alfaias.length,
      detalhes: `${state.alfaias.filter(a => ['agua1', 'agua2', 'agua3', 'passar'].includes(a.etapaLavagem)).length} em fluxo de purificação`,
      badgeRegra: '❖ Fluxo Rigoroso de 3 Águas',
    },
    {
      id: 'toalhas',
      nome: '2. Toalhas e Têxteis do Altar',
      subtitulo: 'Toalhas de Altar, Santíssimo, Comunhão e Conopéu',
      icon: <Layers className="w-5 h-5 text-[#7C3AED]" />,
      count: state.toalhas.length,
      detalhes: `${state.toalhas.filter(t => t.status === 'em_uso').length} em uso no altar`,
    },
    {
      id: 'paramentos',
      nome: '3. Véus e Casulas / Paramentos',
      subtitulo: 'Casulas, Véus de Cálice, Alvas, Estolas, Capas',
      icon: <Shield className="w-5 h-5 text-[#D97706]" />,
      count: state.paramentos.length,
      detalhes: `Cores Litúrgicas: Roxo, Branco, Verde, Rosa...`,
    },
    {
      id: 'vasos',
      nome: '4. Vasos Sagrados',
      subtitulo: 'Cálices, Patenas, Âmbulas, Galhetas, Custódia, Teca',
      icon: <Sparkles className="w-5 h-5 text-[#B58A2A]" />,
      count: state.vasos.length,
      detalhes: `${state.vasos.filter(v => v.status === 'em_uso').length} no altar/sacrário`,
    },
    {
      id: 'consumiveis',
      nome: '5. Materiais de Consumo',
      subtitulo: 'Hóstias, Vinho Canônico, Incenso e Carvão',
      icon: <Package className="w-5 h-5 text-[#059669]" />,
      count: state.consumiveis.length,
      detalhes: `Cálculo automático de autonomia e celebrações`,
    },
    {
      id: 'decoracao',
      nome: '6. Sacristia & Objetos',
      subtitulo: 'Tapetes, Suportes, Banquinhos, Quadros e Imagens',
      icon: <ImageIcon className="w-5 h-5 text-[#4B5563]" />,
      count: state.decoracoes.length,
      detalhes: `${state.decoracoes.filter(d => d.status === 'em_uso').length} dispostos na Igreja`,
    },
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest text-[#17243A]">
          Categorias Litúrgicas da Sacristia
        </h2>
        
        {activeCategory !== 'todas' && (
          <button
            type="button"
            onClick={() => onSelectCategory('todas')}
            className="text-xs font-semibold text-[#9A6F20] hover:underline cursor-pointer"
          >
            Exibir Todas as Categorias
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;

          return (
            <article
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-[#17243A] text-white border-[#DDBB70] shadow-md ring-2 ring-[#DDBB70]/30'
                  : 'bg-[#FFFCF6] text-[#17243A] border-[#E5D8BE] shadow-[0_4px_18px_rgba(61,45,25,0.08)] hover:shadow-[0_8px_24px_rgba(61,45,25,0.13)] hover:border-[#C69A3A]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-2.5 rounded-xl transition-colors ${
                    isSelected ? 'bg-[#223451] text-[#DDBB70]' : 'bg-[#F5EFE6] text-[#17243A] group-hover:bg-[#17243A] group-hover:text-[#DDBB70]'
                  }`}>
                    {cat.icon}
                  </div>

                  <div className="flex flex-col items-end">
                    <span className={`text-xl font-bold font-serif ${isSelected ? 'text-[#DDBB70]' : 'text-[#17243A]'}`}>
                      {cat.count}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${isSelected ? 'text-[#A0B0C6]' : 'text-[#7A6843]'}`}>
                      itens
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className={`text-base font-bold font-serif leading-snug ${isSelected ? 'text-[#DDBB70]' : 'text-[#17243A]'}`}>
                    {cat.nome}
                  </h3>
                  <p className={`text-xs mt-0.5 leading-relaxed ${isSelected ? 'text-[#C5D3E8]' : 'text-[#5F6B7A]'}`}>
                    {cat.subtitulo}
                  </p>
                </div>

                {cat.badgeRegra && (
                  <div className="pt-1">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? 'bg-[#DDBB70]/20 text-[#DDBB70] border border-[#DDBB70]/30'
                        : 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]'
                    }`}>
                      {cat.badgeRegra}
                    </span>
                  </div>
                )}
              </div>

              <div className={`mt-4 pt-3 border-t text-xs flex items-center justify-between ${
                isSelected ? 'border-[#253654] text-[#A0B0C6]' : 'border-[#E5D8BE]/50 text-[#7A6843]'
              }`}>
                <span className="truncate text-[11px] font-medium">{cat.detalhes}</span>
                <span className="inline-flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Gerenciar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
