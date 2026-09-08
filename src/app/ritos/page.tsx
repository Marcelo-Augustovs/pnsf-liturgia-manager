'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FORMAS_MISSA,
  TEMPOS_LITURGICOS,
  GRAUS_CELEBRACAO,
  CATEGORIAS_RITO,
  PASSOS_MISSA
} from '@/data/ritosMissaData';
import {
  FormaMissaId,
  TempoLiturgicoId,
  GrauCelebracaoId,
  CategoriaRito,
  PassoMissa
} from '@/types/ritosMissa';
import { MediaRenderer } from '@/components/MediaRenderer';
import { DynamicIcon } from '@/components/DynamicIcon';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  Church,
  CheckCircle2,
  Filter,
  Info,
  Layers,
  ListOrdered
} from 'lucide-react';

export default function RitosMissaPage() {
  const [selectedFormaId, setSelectedFormaId] = useState<FormaMissaId>('ordinaria');
  const [selectedTempoId, setSelectedTempoId] = useState<TempoLiturgicoId>('quaresma');
  const [selectedGrauId, setSelectedGrauId] = useState<GrauCelebracaoId>('solenidade');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<CategoriaRito | 'todas'>('todas');
  const [expandedPassoId, setExpandedPassoId] = useState<string | null>(null);

  const activeForma = useMemo(() => {
    return FORMAS_MISSA.find((f) => f.id === selectedFormaId) || FORMAS_MISSA[0];
  }, [selectedFormaId]);

  const activeTempo = useMemo(() => {
    return TEMPOS_LITURGICOS.find((t) => t.id === selectedTempoId) || TEMPOS_LITURGICOS[0];
  }, [selectedTempoId]);

  const activeGrau = useMemo(() => {
    return GRAUS_CELEBRACAO.find((g) => g.id === selectedGrauId) || GRAUS_CELEBRACAO[0];
  }, [selectedGrauId]);

  // Filter steps based on category filter
  const filteredPassos = useMemo(() => {
    if (activeCategoryFilter === 'todas') {
      return PASSOS_MISSA;
    }
    return PASSOS_MISSA.filter((passo) => passo.categoria === activeCategoryFilter);
  }, [activeCategoryFilter]);

  const toggleExpandPasso = (id: string) => {
    setExpandedPassoId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner flex-shrink-0">
              <Church className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-serif tracking-wide text-amber-400">
                Liturgia da Santa Missa
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Ordem do Rito • Guia Interativo da Celebração Eucarística
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Início</span>
            </Link>
            <Link
              href="/ritos-complementares"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-amber-400 hover:bg-slate-700 border border-amber-500/30 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ritos Complementares</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col space-y-6">
        
        {/* Header do Rito (Top Card with Liturgical Color Badge) */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {/* Liturgical Color Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${activeTempo.corLiturgica.badgeBg} ${activeTempo.corLiturgica.badgeText} ${activeTempo.corLiturgica.badgeBorder}`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${activeTempo.corLiturgica.dotBg} animate-pulse`}
                />
                Cor Litúrgica: {activeTempo.corLiturgica.name} ({activeTempo.nome})
              </span>

              {/* Form Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <Sparkles className="w-3 h-3 text-amber-600" />
                {activeForma.nome}
              </span>

              {/* Degree Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <Calendar className="w-3 h-3 text-slate-500" />
                {activeGrau.nome}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Ordem da Celebração Eucarística
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
              {activeTempo.descricao}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 max-w-xs w-full space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-600" /> Orientação Litúrgica
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              <strong className="text-slate-800">{activeForma.badgeLabel}:</strong> {activeForma.descricao}
            </p>
          </div>
        </section>

        {/* Seletor de Forma da Missa (Segmented Control - Topo) */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-600" /> Forma de Celebração da Missa
            </h3>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Selecione o modelo do ritual
            </span>
          </div>

          <div className="bg-slate-100 p-1.5 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            {FORMAS_MISSA.map((forma) => {
              const isActive = selectedFormaId === forma.id;
              return (
                <button
                  key={forma.id}
                  onClick={() => setSelectedFormaId(forma.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 font-medium'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-amber-400' : 'bg-slate-400'
                    }`}
                  />
                  <span>{forma.nome}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Carrossel de Tempos Litúrgicos e Graus da Celebração */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
          {/* Tempos Litúrgicos Pills */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" /> Tempo Litúrgico
            </div>
            <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
              {TEMPOS_LITURGICOS.map((tempo) => {
                const isActive = selectedTempoId === tempo.id;
                return (
                  <button
                    key={tempo.id}
                    onClick={() => setSelectedTempoId(tempo.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                      isActive
                        ? `${tempo.corLiturgica.badgeBg} ${tempo.corLiturgica.badgeText} ${tempo.corLiturgica.badgeBorder} shadow-xs font-bold`
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${tempo.corLiturgica.dotBg}`}
                    />
                    <span>{tempo.nome}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Graus da Celebração Pills */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" /> Grau da Celebração
            </div>
            <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
              {GRAUS_CELEBRACAO.map((grau) => {
                const isActive = selectedGrauId === grau.id;
                return (
                  <button
                    key={grau.id}
                    onClick={() => setSelectedGrauId(grau.id)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 text-amber-400 font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                    }`}
                  >
                    <span>{grau.nome}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Filter Bar for Categoria Rito (Mobile Friendly) */}
        <section className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
          <button
            onClick={() => setActiveCategoryFilter('todas')}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeCategoryFilter === 'todas'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Todos os Ritos ({PASSOS_MISSA.length})</span>
          </button>

          {CATEGORIAS_RITO.map((cat) => {
            const isActive = activeCategoryFilter === cat.id;
            const count = PASSOS_MISSA.filter((p) => p.categoria === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
                }`}
              >
                <DynamicIcon name={cat.iconName} className="w-3.5 h-3.5 text-amber-500" />
                <span>{cat.nome} ({count})</span>
              </button>
            );
          })}
        </section>

        {/* Main 2-Column Responsive Layout */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* Main Column: Timeline Vertical (Passo a Passo) */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Timeline Wrapper */}
            <div className="relative border-l-2 border-slate-300 pl-4 sm:pl-8 ml-3 sm:ml-4 space-y-8">
              {filteredPassos.map((passo, index) => {
                const isExpanded = expandedPassoId === passo.id;
                
                // Determine category header trigger
                const isFirstOfCategory =
                  index === 0 ||
                  filteredPassos[index - 1].categoria !== passo.categoria;

                const categoryObj = CATEGORIAS_RITO.find(
                  (c) => c.id === passo.categoria
                );

                return (
                  <div key={passo.id} className="relative group">
                    {/* Category Divider Header (if new category section) */}
                    {isFirstOfCategory && categoryObj && (
                      <div className="mb-6 -ml-8 sm:-ml-12 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 border border-slate-700 flex items-center justify-center font-bold shadow-md">
                          <DynamicIcon name={categoryObj.iconName} className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold font-serif text-slate-900 tracking-wide">
                            {categoryObj.nome}
                          </h3>
                          <p className="text-xs text-slate-500">
                            {categoryObj.descricao}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[25px] sm:-left-[41px] top-6 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border-4 border-slate-800 text-slate-900 shadow-sm flex items-center justify-center font-bold text-[10px]" />

                    {/* Step Card Content */}
                    <article className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                      
                      {/* Step Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-bold">
                              Passo #{passo.numero}
                            </span>
                            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                              • {passo.categoriaNome}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold font-serif text-slate-900">
                            {passo.titulo}
                          </h4>
                          {passo.subtitulo && (
                            <p className="text-xs font-semibold text-amber-700">
                              {passo.subtitulo}
                            </p>
                          )}
                        </div>

                        {/* Expand / Collapse Button */}
                        <button
                          onClick={() => toggleExpandPasso(passo.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer flex-shrink-0"
                        >
                          <span>{isExpanded ? 'Recolher' : 'Detalhes'}</span>
                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-transform ${
                              isExpanded ? 'rotate-90 text-amber-600' : 'text-slate-400'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Main Step Description */}
                      {passo.descricao && (
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {passo.descricao}
                        </p>
                      )}

                      {/* Rubrics Highlight Box */}
                      {passo.rubrica && (
                        <div className="bg-amber-50/70 border-l-4 border-amber-500 text-amber-950 p-4 rounded-r-xl text-xs sm:text-sm font-serif italic space-y-1">
                          <div className="font-sans font-bold not-italic text-amber-800 text-xs uppercase tracking-wider flex items-center gap-1">
                            <span>❖ Rubrica Litúrgica</span>
                          </div>
                          <p>{passo.rubrica}</p>
                        </div>
                      )}

                      {/* Quaresma Specific Note (if Quaresma active) */}
                      {selectedTempoId === 'quaresma' && passo.id === 'gloria' && (
                        <div className="bg-purple-50 border border-purple-200 text-purple-900 p-3.5 rounded-xl text-xs font-medium space-y-1">
                          <div className="font-bold flex items-center gap-1 text-purple-800">
                            <span>✝ Nota da Quaresma</span>
                          </div>
                          <p>
                            O Glória é OMITIDO durante toda a Quaresma (exceto em Solenidades ocorrentes).
                          </p>
                        </div>
                      )}

                      {selectedTempoId === 'quaresma' && passo.id === 'aclamacao_evangelho' && (
                        <div className="bg-purple-50 border border-purple-200 text-purple-900 p-3.5 rounded-xl text-xs font-medium space-y-1">
                          <div className="font-bold flex items-center gap-1 text-purple-800">
                            <span>✝ Nota da Quaresma</span>
                          </div>
                          <p>
                            O Aleluia é OMITIDO. Proclama-se a aclamação quaresmal: "Louvor a vós, ó Cristo, Rei da eterna glória!".
                          </p>
                        </div>
                      )}

                      {/* Expandable Section: Texts & Bullet Checklists */}
                      {(isExpanded || passo.items || passo.textos || passo.media) && (
                        <div className="space-y-4 pt-2 border-t border-slate-100">
                          
                          {/* Text Dialogues */}
                          {passo.textos && passo.textos.length > 0 && (
                            <div className="space-y-2 bg-slate-50 border border-slate-200 rounded-xl p-4">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Diálogo / Orações do Rito
                              </h5>
                              <div className="space-y-1.5">
                                {passo.textos.map((txt, tIdx) => (
                                  <p key={tIdx} className="text-slate-700 text-xs sm:text-sm font-serif leading-relaxed">
                                    {txt}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Bullet Items Checklist */}
                          {passo.items && passo.items.length > 0 && (
                            <div className="space-y-2">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Elementos e Gestos Principais
                              </h5>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {passo.items.map((item, iIdx) => (
                                  <li key={iIdx} className="flex items-start gap-2 text-slate-700 text-xs sm:text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Embedded Media Support (Image & Video) */}
                          {passo.media && (
                            <div className="pt-2">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Mídia Demonstrativa
                              </h5>
                              <MediaRenderer media={passo.media} />
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Right Sidebar Column (md: flex-shrink-0) */}
          <aside className="w-full md:w-80 flex-shrink-0 space-y-6 md:sticky md:top-20">
            
            {/* Quick Index Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <ListOrdered className="w-4 h-4 text-amber-600" /> Índice Sequencial dos Ritos
              </h3>
              <nav className="space-y-1.5">
                {CATEGORIAS_RITO.map((cat) => {
                  const isActive = activeCategoryFilter === cat.id;
                  const count = PASSOS_MISSA.filter((p) => p.categoria === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategoryFilter(cat.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl font-medium text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs font-bold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <DynamicIcon
                          name={cat.iconName}
                          className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`}
                        />
                        <span>{cat.nome}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {count} passos
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Config Active Overview Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-700">
                <Sparkles className="w-4 h-4 text-amber-600" /> Configuração Litúrgica
              </div>

              <div className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Forma:</span>
                  <strong className="text-slate-900">{activeForma.nome}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Tempo:</span>
                  <strong className="text-slate-900">{activeTempo.nome}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Grau:</span>
                  <strong className="text-slate-900">{activeGrau.nome}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Cor Litúrgica:</span>
                  <span className={`font-bold px-2 py-0.5 rounded-md text-[11px] ${activeTempo.corLiturgica.badgeBg} ${activeTempo.corLiturgica.badgeText}`}>
                    {activeTempo.corLiturgica.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Link Navigation Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md border border-slate-800 space-y-3">
              <div className="font-semibold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Church className="w-4 h-4 text-amber-400" /> Diretório Litúrgico
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Navegue também pelos Ritos Complementares e Sacramentais do Ritual Romano.
              </p>
              
              <div className="space-y-2 pt-2">
                <Link
                  href="/ritos-complementares"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-sm cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Ritos Complementares</span>
                </Link>

                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar para a Página Inicial</span>
                </Link>
              </div>
            </div>

          </aside>
        </div>

      </main>
    </div>
  );
}
