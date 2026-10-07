'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MENU_LIST } from '@/data/ritosData';
import { MediaContent, RightContent } from '@/types/ritos';
import { DynamicIcon } from '@/components/DynamicIcon';
import { MediaRenderer } from '@/components/MediaRenderer';
import {
  ArrowLeft,
  BookOpen,
  Church,
  ChevronDown,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Home,
  FileText,
  Layers,
  RotateCcw,
  AlertCircle
} from 'lucide-react';

// Estrutura unificada de cada seção de Accordion
interface AccordionSectionData {
  id: string;
  title: string;
  subtitle?: string;
  iconName?: string;
  texts?: string[];
  items?: string[];
  media?: MediaContent;
  variations?: RightContent[];
}

export default function RitosComplementaresPage() {
  // 1. ESTADOS DE NAVEGAÇÃO
  const [selectedSacramIndex, setSelectedSacramIndex] = useState<number>(0);
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState<number>(0);
  const [activeVariationMap, setActiveVariationMap] = useState<Record<string, number>>({});

  // 2. ESTADOS DE LAZY LOADING E ACCORDIONS
  // Seções abertas no momento
  const [openSections, setOpenSections] = useState<Set<string>>(() => new Set(['batismo-0-left-0']));
  // Seções atualmente em carregamento assíncrono (Lazy Loading)
  const [loadingSections, setLoadingSections] = useState<Set<string>>(new Set());
  // Seções cujos dados já foram carregados e estão no cache em memória
  const [loadedSections, setLoadedSections] = useState<Set<string>>(() => new Set(['batismo-0-left-0']));
  // Seções com falha no carregamento
  const [errorSections, setErrorSections] = useState<Set<string>>(new Set());

  // Dados do Sacramento e Etapa Ativos
  const currentSacramento = MENU_LIST[selectedSacramIndex] || MENU_LIST[0];
  const currentSubMenu = currentSacramento?.navContent?.[activeSubMenuIndex] || currentSacramento?.navContent?.[0];

  // Troca de Sacramento na Sidebar/Menu Mobile
  const handleSelectSacramento = (index: number) => {
    setSelectedSacramIndex(index);
    setActiveSubMenuIndex(0);

    const sac = MENU_LIST[index] || MENU_LIST[0];
    const defaultSectionId = `${sac.refContent}-0-left-0`;
    setOpenSections(new Set([defaultSectionId]));
    setLoadedSections((prev) => new Set(prev).add(defaultSectionId));
  };

  // Troca de Etapa / Sub-Menu (Pills)
  const handleSelectSubMenu = (index: number) => {
    setActiveSubMenuIndex(index);

    const defaultSectionId = `${currentSacramento.refContent}-${index}-left-0`;
    setOpenSections(new Set([defaultSectionId]));
    setLoadedSections((prev) => new Set(prev).add(defaultSectionId));
  };

  // 3. TRANSFORMAÇÃO DOS DADOS DA ETAPA ATIVA EM LISTA DE ACCORDIONS
  const accordionList = useMemo<AccordionSectionData[]>(() => {
    if (!currentSubMenu) return [];

    const list: AccordionSectionData[] = [];
    const sacRef = currentSacramento.refContent;
    const subIdx = activeSubMenuIndex;

    // A. Adiciona os Tópicos da Esquerda (Documentação, Requisitos, Símbolos)
    if (currentSubMenu.leftContent) {
      currentSubMenu.leftContent.forEach((topic, tIdx) => {
        list.push({
          id: `${sacRef}-${subIdx}-left-${tIdx}`,
          title: topic.title,
          subtitle: currentSubMenu.leftSubTitle || 'Diretrizes & Disposições Pastorais',
          iconName: topic.iconName || 'UserCheck',
          texts: topic.texts,
          items: topic.items,
          media: topic.media
        });
      });
    }

    // B. Adiciona os Cerimoniais & Variações da Direita
    if (currentSubMenu.rightContent && currentSubMenu.rightContent.length > 0) {
      // Se houver múltiplas variações (ex: Rito Comum vs Rito de Emergência), adicionamos um Accordion com Abas de Variação
      list.push({
        id: `${sacRef}-${subIdx}-right-variations`,
        title: currentSubMenu.rightSubTitle || 'Rito e Formulários Litúrgicos',
        subtitle: 'Cerimonial, Orações e Variações do Rito',
        iconName: 'BookOpen',
        variations: currentSubMenu.rightContent
      });
    }

    return list;
  }, [currentSacramento, currentSubMenu, activeSubMenuIndex]);

  // 4. FUNÇÃO DE TOGGLE DO ACCORDION COM LAZY LOADING REAL SOB DEMANDA
  const handleToggleAccordion = (sectionId: string) => {
    // Se o accordion já está aberto, apenas o fecha
    if (openSections.has(sectionId)) {
      setOpenSections((prev) => {
        const next = new Set(prev);
        next.delete(sectionId);
        return next;
      });
      return;
    }

    // Abre o accordion
    setOpenSections((prev) => new Set(prev).add(sectionId));

    // Se a seção já foi carregada e está em cache, abre instantaneamente
    if (loadedSections.has(sectionId)) {
      return;
    }

    // Caso contrário, dispara o Carregamento Sob Demanda (Lazy Loading) com Skeleton
    setLoadingSections((prev) => new Set(prev).add(sectionId));
    setErrorSections((prev) => {
      const next = new Set(prev);
      next.delete(sectionId);
      return next;
    });

    // Simula requisição assíncrona / carregamento dinamico de dados (350ms)
    setTimeout(() => {
      setLoadingSections((prev) => {
        const next = new Set(prev);
        next.delete(sectionId);
        return next;
      });
      setLoadedSections((prev) => new Set(prev).add(sectionId));
    }, 380);
  };

  // Função para Tentar Novamente em caso de erro
  const handleRetryLoading = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorSections((prev) => {
      const next = new Set(prev);
      next.delete(sectionId);
      return next;
    });
    setLoadingSections((prev) => new Set(prev).add(sectionId));

    setTimeout(() => {
      setLoadingSections((prev) => {
        const next = new Set(prev);
        next.delete(sectionId);
        return next;
      });
      setLoadedSections((prev) => new Set(prev).add(sectionId));
    }, 380);
  };

  // Seletor da variação ativa no card de variações
  const handleSetVariation = (sectionId: string, varIdx: number) => {
    setActiveVariationMap((prev) => ({ ...prev, [sectionId]: varIdx }));
  };

  // Imagem de destaque do Hero Banner
  const heroBgImage = currentSacramento.refContent === 'matrimonio'
    ? 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    : 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#17243A] flex flex-col font-sans relative overflow-x-hidden">
      
      {/* 1. HEADER INSTITUCIONAL LITÚRGICO (AZUL-MARINHO COM DETALHES EM DOURADO) */}
      <header className="bg-gradient-to-b from-[#17243A] via-[#1A2840] to-[#121D2F] text-white sticky top-0 z-30 shadow-md border-b border-[#253654]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* BRAND & LOGO */}
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="w-10 h-10 rounded-full border border-[#DDBB70]/60 bg-[#17243A] flex items-center justify-center text-[#DDBB70] shadow-sm flex-shrink-0 ring-2 ring-[#DDBB70]/20">
              <Church className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-serif tracking-wide text-white leading-tight">
                  Ritos Complementares
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DDBB70]/20 text-[#DDBB70] border border-[#DDBB70]/40 uppercase tracking-widest hidden sm:inline-block">
                  Sacramentais
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#DDBB70]/90 uppercase mt-0.5">
                PORTAL LITÚRGICO • GUIA ORIENTATIVO DOS RITOS E CERIMONIAIS
              </p>
            </div>
          </div>

          {/* BOTÕES DE NAVEGAÇÃO SUPERIOR */}
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

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#DDBB70] text-[#17243A] shadow-sm min-h-[44px] sm:min-h-0">
              <BookOpen className="w-3.5 h-3.5 text-[#17243A]" />
              <span>Ritos Complementares</span>
            </div>

            <Link
              href="/sacristia"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#DDBB70] hover:bg-[#DDBB70]/10 border border-[#DDBB70]/30 transition-all cursor-pointer min-h-[44px] sm:min-h-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sacristia</span>
            </Link>
          </div>
        </div>
      </header>

      {/* CONTAINER PRINCIPAL */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col space-y-6">

        {/* NAVEGAÇÃO MOBILE EM CARROSSEL/PILLS (EXIBIDA APENAS EM TELAS MENORES) */}
        <div className="md:hidden space-y-2">
          <div className="text-[11px] font-bold text-[#7A6843] uppercase tracking-wider flex items-center gap-1.5 px-1 font-serif">
            <Layers className="w-3.5 h-3.5 text-[#9A6F20]" /> Selecione o Sacramento:
          </div>
          <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
            {MENU_LIST.map((item, idx) => {
              const isActive = selectedSacramIndex === idx;
              return (
                <button
                  key={item.refContent}
                  onClick={() => handleSelectSacramento(idx)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#17243A] text-white border-[#DDBB70] shadow-xs'
                      : 'bg-white text-[#4A5568] border-[#E5D8BE] hover:bg-[#F5EFE6]'
                  }`}
                >
                  {item.iconName && (
                    <DynamicIcon
                      name={item.iconName}
                      className={`w-4 h-4 ${isActive ? 'text-[#DDBB70]' : 'text-[#7A6843]'}`}
                    />
                  )}
                  <span>{item.navButton}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LAYOUT PRINCIPAL DE 2 COLUNAS (SIDEBAR FIXA NA ESQUERDA + PAINEL PRINCIPAL À DIREITA) */}
        <div className="flex flex-col md:flex-row gap-6 items-start flex-1 w-full">

          {/* SIDEBAR FIXA NA ESQUERDA (DESKTOP) */}
          <aside className="hidden md:flex md:w-72 flex-shrink-0 bg-[#17243A] text-white p-5 rounded-2xl shadow-md border border-[#233550] flex-col gap-6 sticky top-20">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#DDBB70] mb-3 px-2 flex items-center gap-2 font-serif">
                <span>❖</span> SACRAMENTOS & RITOS
              </h2>
              <nav className="space-y-1.5">
                {MENU_LIST.map((item, idx) => {
                  const isActive = selectedSacramIndex === idx;
                  return (
                    <button
                      key={item.refContent}
                      onClick={() => handleSelectSacramento(idx)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-xs flex items-center justify-between transition-all cursor-pointer border-l-4 ${
                        isActive
                          ? 'bg-[#1E2E4A] text-white border-[#DDBB70] shadow-xs'
                          : 'text-[#C5D3E8] hover:bg-[#1E2E4A]/60 hover:text-white border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.iconName && (
                          <DynamicIcon
                            name={item.iconName}
                            className={`w-4 h-4 ${isActive ? 'text-[#DDBB70]' : 'text-[#8BA1C1]'}`}
                          />
                        )}
                        <span>{item.navButton}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#DDBB70]' : 'text-[#8BA1C1]/50'}`} />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* BANNER INFORMATIVO PAROQUIAL */}
            <div className="mt-auto bg-[#111B2C] border border-[#233550] rounded-xl p-4 text-xs text-[#A0B0C6] space-y-2">
              <div className="font-semibold text-[#DDBB70] flex items-center gap-1.5 font-serif">
                <Church className="w-4 h-4 text-[#DDBB70]" /> Paróquia N. S. de Fátima
              </div>
              <p className="leading-relaxed text-[11px]">
                Diretrizes pastorais e orientações gerais baseadas no Ritual Romano.
              </p>
            </div>

            {/* BOTÕES DE AÇÃO DA SIDEBAR */}
            <div className="space-y-2 pt-2 border-t border-[#233550]">
              <Link
                href="/ritos"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#DDBB70] text-[#17243A] hover:bg-[#C69A3A] transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ir para Ritos da Missa</span>
              </Link>
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#A0B0C6] hover:text-white bg-[#111B2C] hover:bg-[#0C1422] border border-[#233550] transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar para o Início</span>
              </Link>
            </div>
          </aside>

          {/* PAINEL CONTEÚDO PRINCIPAL (DIREITA) */}
          <div className="flex-1 w-full space-y-6">

            {/* 2. HERO BANNER DO RITO SELECIONADO (COM OVERLAY EM AZUL-MARINHO E FOTO DE FUNDO) */}
            <section className="relative rounded-2xl overflow-hidden border border-[#E5D8BE] shadow-sm bg-[#17243A] text-white p-6 sm:p-8 min-h-[160px] flex flex-col justify-end">
              {/* IMAGEM DE FUNDO COM OVERLAY GRADIENTE */}
              <Image
                src={heroBgImage}
                alt={currentSacramento.navButton}
                fill
                className="object-cover object-center opacity-25 mix-blend-luminosity"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#17243A] via-[#17243A]/90 to-[#17243A]/60" />

              {/* CONTEÚDO DO BANNER */}
              <div className="relative z-10 space-y-2 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#DDBB70] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#DDBB70]">
                    {currentSacramento.navButton}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white">
                  {currentSubMenu?.menuTitle || currentSacramento.navButton}
                </h2>
                <p className="text-xs sm:text-sm text-[#E5D8BE] leading-relaxed max-w-2xl font-sans">
                  A Igreja acolhe e instrui os fiéis nos mistérios da fé através da ação litúrgica e dos sacramentais do Ritual Romano.
                </p>
              </div>
            </section>

            {/* 3. ABAS / PILLS DE ETAPAS DO SUB-MENU */}
            {currentSacramento.navContent && currentSacramento.navContent.length > 0 && (
              <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
                {currentSacramento.navContent.map((sub, idx) => {
                  const isActive = activeSubMenuIndex === idx;
                  return (
                    <button
                      key={sub.menuTitle}
                      onClick={() => handleSelectSubMenu(idx)}
                      className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#17243A] text-white border-[#DDBB70] shadow-xs'
                          : 'bg-[#FFFCF6] text-[#5F6B7A] border-[#E5D8BE] hover:bg-[#F5EFE6] hover:text-[#17243A]'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#DDBB70]' : 'bg-[#9A6F20]/50'}`} />
                      <span>{sub.menuTitle}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 4. ACCORDIONS DAS SEÇÕES (COM LAZY LOADING E PALETA CLARA LITÚRGICA) */}
            <div className="space-y-4">
              {accordionList.map((sec) => {
                const isOpen = openSections.has(sec.id);
                const isLoading = loadingSections.has(sec.id);
                const isLoaded = loadedSections.has(sec.id);
                const hasError = errorSections.has(sec.id);

                const activeVarIdx = activeVariationMap[sec.id] || 0;
                const currentVariation = sec.variations?.[activeVarIdx] || sec.variations?.[0];

                return (
                  <article
                    key={sec.id}
                    className={`bg-[#FFFFFF] border rounded-2xl overflow-hidden transition-all duration-300 shadow-2xs ${
                      isOpen
                        ? 'border-l-4 border-l-[#DDBB70] border-t-[#E5D8BE] border-r-[#E5D8BE] border-b-[#E5D8BE] shadow-xs'
                        : 'border-[#E5D8BE] hover:border-[#D8C29A]'
                    }`}
                  >
                    {/* CABEÇALHO DO ACCORDION (BOTÃO DE EXPANSÃO / RECOLHIMENTO) */}
                    <button
                      type="button"
                      onClick={() => handleToggleAccordion(sec.id)}
                      className={`w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-all cursor-pointer ${
                        isOpen ? 'bg-[#FAF7F0] border-b border-[#E5D8BE]' : 'bg-white hover:bg-[#FAF7F0]/60'
                      }`}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3.5">
                        {/* ÍCONE EM DOURADO / AZUL MARINHO */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isOpen ? 'bg-[#17243A] text-[#DDBB70]' : 'bg-[#F5EFE6] text-[#9A6F20] border border-[#E5D8BE]'
                        }`}>
                          <DynamicIcon name={sec.iconName || 'FileText'} className="w-5 h-5" />
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg font-serif font-bold text-[#17243A] leading-tight">
                            {sec.title}
                          </h3>
                          {sec.subtitle && (
                            <p className="text-xs text-[#7A6843] font-sans mt-0.5">
                              {sec.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* ÍCONE CHEVRON DE EXPANSÃO */}
                      <div className="flex items-center gap-2">
                        {isLoading && (
                          <span className="text-[11px] font-semibold text-[#9A6F20] animate-pulse hidden sm:inline-block">
                            Carregando...
                          </span>
                        )}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-[#F5EFE6] text-[#17243A]' : 'bg-[#F5EFE6]/50 text-[#7A6843]'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </button>

                    {/* CORPO EXPANSÍVEL DO ACCORDION */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                      }`}
                    >
                      <div className="overflow-hidden">
                        
                        {/* ESTADO 1: SKELETON SCREEN DURANTE O LAZY LOADING SOB DEMANDA */}
                        {isLoading && (
                          <div className="p-5 sm:p-6 bg-[#FAF7F0] border-t border-[#E5D8BE] space-y-4 animate-pulse">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#E5D8BE]/50" />
                              <div className="h-4 w-48 bg-[#E5D8BE]/60 rounded-md" />
                            </div>
                            <div className="space-y-2">
                              <div className="h-3 w-full bg-[#E5D8BE]/40 rounded" />
                              <div className="h-3 w-5/6 bg-[#E5D8BE]/40 rounded" />
                              <div className="h-3 w-4/6 bg-[#E5D8BE]/40 rounded" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                              <div className="h-12 bg-[#E5D8BE]/40 rounded-xl" />
                              <div className="h-12 bg-[#E5D8BE]/40 rounded-xl" />
                            </div>
                            <div className="flex items-center justify-center gap-2 pt-2 text-xs font-semibold text-[#9A6F20]">
                              <div className="w-4 h-4 border-2 border-[#9A6F20] border-t-transparent rounded-full animate-spin" />
                              <span>Carregando diretrizes litúrgicas sob demanda...</span>
                            </div>
                          </div>
                        )}

                        {/* ESTADO 2: TRATAMENTO DE ERRO DE REDE/CARREGAMENTO */}
                        {hasError && !isLoading && (
                          <div className="p-6 bg-[#FFF5F5] border-t border-red-200 text-center space-y-3">
                            <div className="flex items-center justify-center gap-2 text-red-700 font-bold text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>Não foi possível carregar os dados desta seção</span>
                            </div>
                            <p className="text-xs text-red-600">
                              Ocorreu uma falha no carregamento dos dados litúrgicos. Por favor, tente novamente.
                            </p>
                            <button
                              type="button"
                              onClick={(e) => handleRetryLoading(sec.id, e)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#17243A] text-[#DDBB70] hover:bg-[#1E2E4A] transition-all cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Tentar Novamente</span>
                            </button>
                          </div>
                        )}

                        {/* ESTADO 3: CONTEÚDO COMPLETO CARREGADO E CACHEADO */}
                        {isLoaded && !isLoading && !hasError && (
                          <div className="p-5 sm:p-6 bg-[#FFFFFF] space-y-5 border-t border-[#E5D8BE]/60">

                            {/* SEÇÃO COM VARIAÇÕES LITÚRGICAS (EX: RITO COMUM VS RITO DE EMERGÊNCIA) */}
                            {sec.variations && sec.variations.length > 0 ? (
                              <div className="space-y-5">
                                {/* ABAS DE VARIAÇÃO SE HOUVER MAIS DE UMA */}
                                {sec.variations.length > 1 && (
                                  <div className="bg-[#F3EEE3] p-1.5 rounded-xl border border-[#EBE4D5] flex gap-1.5 overflow-x-auto">
                                    {sec.variations.map((vItem, vIdx) => {
                                      const isVarActive = activeVarIdx === vIdx;
                                      return (
                                        <button
                                          key={vIdx}
                                          type="button"
                                          onClick={() => handleSetVariation(sec.id, vIdx)}
                                          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                            isVarActive
                                              ? 'bg-[#17243A] text-white shadow-xs font-bold'
                                              : 'bg-white/60 hover:bg-white text-[#4A5568]'
                                          }`}
                                        >
                                          {vItem.variationTitle}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}

                                {/* CONTEÚDO DAS SEÇÕES DA VARIAÇÃO ATIVA */}
                                {currentVariation?.sections?.map((varSec, vsIdx) => (
                                  <div
                                    key={vsIdx}
                                    className="bg-[#FAF7F0] border border-[#E5D8BE] rounded-xl p-4 sm:p-5 space-y-3"
                                  >
                                    <div className="flex items-center gap-3">
                                      {varSec.iconName && (
                                        <div className="w-8 h-8 rounded-lg bg-[#F5EFE6] text-[#17243A] border border-[#E5D8BE] flex items-center justify-center flex-shrink-0">
                                          <DynamicIcon name={varSec.iconName} className="w-4 h-4 text-[#17243A]" />
                                        </div>
                                      )}
                                      <div>
                                        {varSec.title && (
                                          <h4 className="text-base font-bold font-serif text-[#17243A]">
                                            {varSec.title}
                                          </h4>
                                        )}
                                        {varSec.subTitle && (
                                          <p className="text-xs font-semibold text-[#9A6F20]">
                                            {varSec.subTitle}
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    {/* DIÁLOGOS / TEXTOS LITÚRGICOS */}
                                    {varSec.texts && varSec.texts.length > 0 && (
                                      <div className="space-y-2 bg-[#F5EFE6]/60 border border-[#E5D8BE] rounded-xl p-3.5">
                                        <h5 className="text-xs font-bold uppercase tracking-wider text-[#7A6843] flex items-center gap-1 font-serif">
                                          <FileText className="w-3.5 h-3.5 text-[#9A6F20]" /> Diálogo / Formulação Litúrgica
                                        </h5>
                                        <div className="space-y-1.5">
                                          {varSec.texts.map((t, tIdx) => (
                                            <p key={tIdx} className="text-[#26364D] text-xs sm:text-sm font-serif leading-relaxed">
                                              {t}
                                            </p>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* LISTA DE ITENS / CHECKLIST */}
                                    {varSec.items && varSec.items.length > 0 && (
                                      <ul className="space-y-2 pt-1 border-t border-[#E5D8BE]/50">
                                        {varSec.items.map((it, iIdx) => (
                                          <li key={iIdx} className="flex items-start gap-2.5 text-[#4A5568] text-xs sm:text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-[#9A6F20] flex-shrink-0 mt-0.5" />
                                            <span>{it}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}

                                    {/* RECURSO MULTIMÍDIA */}
                                    {varSec.media && (
                                      <MediaRenderer media={varSec.media} />
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              /* SEÇÃO PADRÃO (ESQUERDA: TEXTOS, CHECKLIST E MÍDIA) */
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                                
                                {/* COLUNA DA ESQUERDA: PARÁGRAFO EXPLICATIVO */}
                                {sec.texts && sec.texts.length > 0 && (
                                  <div className="bg-[#FAF7F0] border border-[#E5D8BE] rounded-xl p-4 sm:p-5 space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-[#17243A] uppercase tracking-wider font-serif mb-1">
                                      <FileText className="w-4 h-4 text-[#9A6F20]" /> Orientação Geral
                                    </div>
                                    {sec.texts.map((txt, txtIdx) => (
                                      <p key={txtIdx} className="text-[#5F6B7A] text-xs sm:text-sm leading-relaxed">
                                        {txt}
                                      </p>
                                    ))}
                                  </div>
                                )}

                                {/* COLUNA DA DIREITA: CHECKLIST DE REQUISITOS / ELEMENTOS */}
                                {sec.items && sec.items.length > 0 && (
                                  <div className="space-y-2 bg-[#FAF7F0]/60 border border-[#E5D8BE] rounded-xl p-4 sm:p-5">
                                    <div className="text-xs font-bold text-[#17243A] uppercase tracking-wider font-serif flex items-center gap-1.5 mb-2">
                                      <CheckCircle2 className="w-4 h-4 text-[#9A6F20]" /> Requisitos e Disposições
                                    </div>
                                    <ul className="space-y-2.5">
                                      {sec.items.map((item, iIdx) => (
                                        <li key={iIdx} className="flex items-start gap-2.5 text-[#4A5568] text-xs sm:text-sm">
                                          <CheckCircle2 className="w-4 h-4 text-[#9A6F20] flex-shrink-0 mt-0.5" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* MÍDIA EMBUTIDA (SE HOUVER) */}
                                {sec.media && (
                                  <div className="md:col-span-2">
                                    <MediaRenderer media={sec.media} />
                                  </div>
                                )}

                              </div>
                            )}

                          </div>
                        )}

                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
