'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CELEBRACOES_DATA,
  FORMAS_CELEBRACAO_OPTIONS,
  TEMPOS_LITURGICOS_OPTIONS,
  GRAUS_CELEBRACAO_OPTIONS,
  GRUPOS_RITO_INFO
} from '@/data/ritosMissaData';
import {
  GrauCelebracao,
  GrupoRito,
  Celebracao,
  FiltrosMissa,
} from '@/types/ritosMissa';
import { MediaRenderer } from '@/components/MediaRenderer';
import { DynamicIcon } from '@/components/DynamicIcon';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  ChevronDown,
  Church,
  CheckCircle2,
  Filter,
  Info,
  Layers,
  ListOrdered,
  Search,
  RotateCcw,
  SlidersHorizontal,
  FileText,
  AlertCircle,
  Home
} from 'lucide-react';

export default function RitosMissaPage() {
  // 1. ESTADO DOS FILTROS SELECIONADOS NA UI (O que o usuário clica)
  const [filtrosSelecionados, setFiltrosSelecionados] = useState<FiltrosMissa>({
    forma: 'ordinaria',
    tempo: 'quaresma',
    grau: 'todos'
  });

  // 2. ESTADO DOS RESULTADOS DA BUSCA (O que é efetivamente filtrado na tela)
  const [resultadosBusca, setResultadosBusca] = useState<Celebracao[]>(() => {
    return CELEBRACOES_DATA.filter(
      (c) => c.forma === 'ordinaria' && c.tempoLiturgico === 'quaresma'
    );
  });

  // Estado que guarda os últimos filtros pesquisados para saber se a UI mudou
  const [filtrosPesquisados, setFiltrosPesquisados] = useState<FiltrosMissa>({
    forma: 'ordinaria',
    tempo: 'quaresma',
    grau: 'todos'
  });

  // 3. ESTADO DE ACCORDIONS INDIVIDUAIS (openGroupIds e openStepIds)
  // Define quais grupos de rito estão abertos (chave: `${celebracaoId}-${grupoKey}`)
  const [openGroupIds, setOpenGroupIds] = useState<Set<string>>(new Set());

  // Define quais passos individuais estão expandidos (chave: `${celebracaoId}-${passoId}`)
  const [openStepIds, setOpenStepIds] = useState<Set<string>>(new Set());

  // Estado dos Accordions das Celebrações principais
  const [openCelebracaoIds, setOpenCelebracaoIds] = useState<Set<string>>(new Set());

  // Verifica se o usuário alterou os seletores mas ainda não clicou em Pesquisar
  const temFiltrosPendentes = useMemo(() => {
    return (
      filtrosSelecionados.forma !== filtrosPesquisados.forma ||
      filtrosSelecionados.tempo !== filtrosPesquisados.tempo ||
      filtrosSelecionados.grau !== filtrosPesquisados.grau
    );
  }, [filtrosSelecionados, filtrosPesquisados]);

  // Função disparada exclusivamente ao clicar no Botão "[ Pesquisar / Buscar ]"
  const handlePesquisar = () => {
    const filtrados = CELEBRACOES_DATA.filter((cel) => {
      // Filtro de Forma da Celebração
      if (cel.forma !== filtrosSelecionados.forma) return false;
      // Filtro de Tempo Litúrgico
      if (cel.tempoLiturgico !== filtrosSelecionados.tempo) return false;
      // Filtro de Grau da Celebração (opcional)
      if (filtrosSelecionados.grau && filtrosSelecionados.grau !== 'todos') {
        if (cel.grauCelebracao !== filtrosSelecionados.grau) return false;
      }
      return true;
    });

    setResultadosBusca(filtrados);
    setFiltrosPesquisados({ ...filtrosSelecionados });
  };

  const toggleCelebracao = (celebracaoId: string) => {
    setOpenCelebracaoIds((prev) => {
      const next = new Set(prev);

      if (next.has(celebracaoId)) {
        next.delete(celebracaoId);
      } else {
        next.add(celebracaoId);
      }

      return next;
    });
  };

  // Redefinir filtros para o padrão inicial
  const handleResetFiltros = () => {
    const padrao: FiltrosMissa = { forma: 'ordinaria', tempo: 'quaresma', grau: 'todos' };
    setFiltrosSelecionados(padrao);
    setFiltrosPesquisados(padrao);
    setResultadosBusca(
      CELEBRACOES_DATA.filter((c) => c.forma === 'ordinaria' && c.tempoLiturgico === 'quaresma')
    );
  };

  // Alternar expansão/recolhimento de um GRUPO DE RITO
  const toggleGroup = (celebracaoId: string, grupoKey: string) => {
    const key = `${celebracaoId}-${grupoKey}`;
    setOpenGroupIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Alternar expansão/recolhimento de um PASSO INDIVIDUAL
  const toggleStep = (celebracaoId: string, passoId: string) => {
    const key = `${celebracaoId}-${passoId}`;
    setOpenStepIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Metadados do Tempo Litúrgico selecionado para o painel superior
  const tempoAtivoMetadata = TEMPOS_LITURGICOS_OPTIONS[filtrosSelecionados.tempo] || TEMPOS_LITURGICOS_OPTIONS.quaresma;
  const formaAtivaOption = FORMAS_CELEBRACAO_OPTIONS.find((f) => f.id === filtrosSelecionados.forma) || FORMAS_CELEBRACAO_OPTIONS[0];

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#17243A] flex flex-col font-sans relative overflow-x-hidden">

      {/* HEADER SUPREMO INSTITUCIONAL (AZUL-MARINHO COM GRADIENTE) */}
      <header className="bg-gradient-to-b from-[#17243A] to-[#121D2F] text-white sticky top-0 z-30 shadow-md border-b border-[#253654]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* LOGOTIPO CIRCULAR COM ÍCONE EM DOURADO */}
            <div className="w-10 h-10 rounded-full border border-[#DDBB70]/50 bg-[#17243A] flex items-center justify-center text-[#DDBB70] shadow-sm flex-shrink-0">
              <Church className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif tracking-wide text-white leading-tight">
                Liturgia da Santa Missa
              </h1>
              <p className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#DDBB70]/90 uppercase mt-0.5">
                ORDEM DO RITO • GUIA INTERATIVO POR CELEBRAÇÕES LITÚRGICAS
              </p>
            </div>
          </div>

          {/* BOTÕES DE NAVEGAÇÃO SUPERIOR */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#F5E6CA] hover:bg-[#EED5AA] text-[#17243A] transition-all cursor-pointer shadow-xs"
            >
              <Home className="w-3.5 h-3.5 text-[#17243A]" />
              <span>Início</span>
            </Link>
            <Link
              href="/ritos-complementares"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-transparent hover:bg-white/5 text-[#F5E6CA] border border-[#D3C4A5]/60 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#F5E6CA]" />
              <span>Ritos Complementares</span>
            </Link>
          </div>
        </div>
      </header>

      {/* CONTAINER PRINCIPAL */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col space-y-6 z-10 relative">

        {/* 2 & 3. CARD SUPERIOR: ORDEM DAS CELEBRAÇÕES LITÚRGICAS (COM RESPONSIVIDADE MOBILE AJUSTADA) */}
        <section className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
          <div className="space-y-2.5 flex-1 w-full">
            {/* Badges superiores em flex-wrap */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${tempoAtivoMetadata.corLiturgica.badgeBg} ${tempoAtivoMetadata.corLiturgica.badgeText} ${tempoAtivoMetadata.corLiturgica.badgeBorder}`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${tempoAtivoMetadata.corLiturgica.dotBg} animate-pulse`}
                />
                Cor Litúrgica: {tempoAtivoMetadata.corLiturgica.name} ({tempoAtivoMetadata.nome})
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5EFE6] text-[#7A6843] border border-[#E5D8BE]">
                <Sparkles className="w-3 h-3 text-[#9A6F20]" />
                {formaAtivaOption.nome}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#17243A]">
              Ordem das Celebrações Litúrgicas
            </h2>
            <p className="text-[#5F6B7A] text-xs sm:text-sm leading-relaxed max-w-3xl">
              {tempoAtivoMetadata.descricao}
            </p>
          </div>

          {/* Card Lado Direito: Orientação do Período */}
          <div className="bg-[#F5EFE6]/60 border border-[#E5D8BE] rounded-xl p-4 text-xs text-[#5F6B7A] w-full md:max-w-xs space-y-1.5 flex-shrink-0">
            <div className="font-bold text-[#17243A] flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <Info className="w-4 h-4 text-[#9A6F20]" /> Orientação do Período
            </div>
            <p className="text-[#5F6B7A] leading-relaxed text-xs">
              <strong className="text-[#17243A] font-semibold">{tempoAtivoMetadata.nome}:</strong> {tempoAtivoMetadata.periodo}
            </p>
          </div>
        </section>

        {/* PAINEL DE FILTROS DE BUSCA POR CELEBRAÇÃO */}
        <section className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">

          {/* CABEÇALHO DO PAINEL DE FILTROS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#17243A] text-[#DDBB70] flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
                <SlidersHorizontal className="w-4 h-4 text-[#DDBB70]" />
              </div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#17243A] font-serif">
                  FILTROS DE BUSCA POR CELEBRAÇÃO
                </h2>
                <p className="text-xs text-[#827869] mt-0.5">
                  Selecione os parâmetros e clique em Pesquisar para filtrar os ritos.
                </p>
              </div>
            </div>

            {temFiltrosPendentes && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#F5E6CA] text-[#7A5A18] border border-[#D8C29A] animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" /> Clique em Pesquisar para aplicar os filtros
              </span>
            )}
          </div>

          {/* DIVISOR ORNAMENTAL SUTIL */}
          <div className="flex items-center justify-center my-1 opacity-40">
            <div className="h-[1px] bg-[#E5D8BE] flex-1" />
            <span className="px-3 text-[#9A6F20] text-xs font-serif">❖</span>
            <div className="h-[1px] bg-[#E5D8BE] flex-1" />
          </div>

          {/* GRID COM OS 3 BLOCOS DE FILTROS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* BLOCO 1: FORMA DA CELEBRAÇÃO */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#17243A] flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#9A6F20]" /> FORMA DA CELEBRAÇÃO
              </label>
              <div className="bg-[#F3EEE3] p-2 rounded-2xl space-y-1.5 border border-[#EBE4D5]">
                {FORMAS_CELEBRACAO_OPTIONS.map((forma) => {
                  const isSelected = filtrosSelecionados.forma === forma.id;
                  return (
                    <button
                      key={forma.id}
                      type="button"
                      onClick={() =>
                        setFiltrosSelecionados((prev) => ({ ...prev, forma: forma.id }))
                      }
                      className={`w-full px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${isSelected
                        ? 'bg-[#17243A] text-white shadow-xs font-bold'
                        : 'bg-white/60 hover:bg-white text-[#4A5568] border border-transparent font-medium'
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-[#DDBB70] ring-2 ring-[#DDBB70]/30' : 'border border-slate-300 bg-transparent'
                            }`}
                        />
                        <span>{forma.nome}</span>
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${isSelected
                          ? 'bg-[#273852] text-[#DDBB70]'
                          : 'bg-[#EBE4D5]/80 text-[#7A6843]'
                          }`}
                      >
                        {forma.badgeLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BLOCO 2: TEMPO LITÚRGICO */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#17243A] flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#9A6F20]" /> TEMPO LITÚRGICO
              </label>
              <div className="bg-[#F3EEE3] p-2 rounded-2xl grid grid-cols-2 gap-1.5 border border-[#EBE4D5]">
                {Object.values(TEMPOS_LITURGICOS_OPTIONS).map((tempo) => {
                  const isSelected = filtrosSelecionados.tempo === tempo.id;
                  return (
                    <button
                      key={tempo.id}
                      type="button"
                      onClick={() =>
                        setFiltrosSelecionados((prev) => ({ ...prev, tempo: tempo.id }))
                      }
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${isSelected
                        ? 'bg-[#EEDBB5] text-[#17243A] border border-[#D8C29A] shadow-xs font-bold'
                        : 'bg-white/70 hover:bg-white text-[#4A5568] border border-transparent font-medium'
                        }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${tempo.corLiturgica.dotBg}`} />
                      <span className="truncate">{tempo.nome}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BLOCO 3: GRAU DA CELEBRAÇÃO*/}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#17243A] flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#9A6F20]" /> TIPO DE CELEBRAÇÃO
              </label>
              <div className="bg-[#F3EEE3] p-2 rounded-2xl grid grid-cols-3 gap-1.5 border border-[#EBE4D5]">
                {GRAUS_CELEBRACAO_OPTIONS.map((grau) => {
                  const isSelected = (filtrosSelecionados.grau || 'todos') === grau.id;
                  return (
                    <button
                      key={grau.id}
                      type="button"
                      onClick={() =>
                        setFiltrosSelecionados((prev) => ({
                          ...prev,
                          grau: grau.id as GrauCelebracao | 'todos'
                        }))
                      }
                      className={`px-2 py-2.5 rounded-xl text-xs transition-all text-center truncate cursor-pointer ${isSelected
                        ? 'bg-[#17243A] text-white font-bold shadow-xs'
                        : 'bg-white/70 hover:bg-white text-[#4A5568] border border-transparent font-medium'
                        }`}
                    >
                      {grau.nome}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RODAPÉ DO PAINEL DE FILTROS: REDEFINIR E BOTÃO DE PESQUISA */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E5D8BE]/60">
            <button
              type="button"
              onClick={handleResetFiltros}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-[#7A6843] hover:text-[#17243A] transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#7A6843]" />
              <span>Redefinir Filtros</span>
            </button>

            {/* 4. BOTÃO PESQUISAR / BUSCAR CELEBRAÇÕES COM GRADIENTE */}
            <button
              type="button"
              onClick={handlePesquisar}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider bg-gradient-to-r from-[#17243A] to-[#223451] hover:from-[#1E2E4A] hover:to-[#2A4165] text-[#DDBB70] shadow-md hover:shadow-lg transition-all cursor-pointer border border-[#DDBB70]/30"
            >
              <Search className="w-4 h-4 text-[#DDBB70]" />
              <span>PESQUISAR / BUSCAR CELEBRAÇÕES</span>
            </button>
          </div>
        </section>

        {/* LAYOUT EM 2 COLUNAS: LISTA DE CARDS (ESQUERDA) + PAINEL LATERAL (DIREITA) */}
        <div className="flex flex-col md:flex-row gap-6 items-start">

          {/* COLUNA PRINCIPAL: LISTA DE CELEBRAÇÕES */}
          <div className="flex-1 w-full space-y-6">

            {resultadosBusca.length === 0 ? (
              /* Nenhuma celebração encontrada */
              <div className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#F3EEE3] text-[#9A6F20] flex items-center justify-center mx-auto border border-[#E5D8BE]">
                  <Filter className="w-8 h-8" />
                </div>
                <div className="space-y-1.5 max-w-md mx-auto">
                  <h3 className="text-xl font-bold font-serif text-[#17243A]">
                    Nenhuma celebração encontrada para estes filtros
                  </h3>
                  <p className="text-xs text-[#5F6B7A] leading-relaxed">
                    Tente selecionar um grau diferente (ex: "Todos os Graus") ou alterar o Tempo Litúrgico para visualizar as celebrações cadastradas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFiltros}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#17243A] text-[#DDBB70] hover:bg-[#1E2E4A] transition-all cursor-pointer border border-[#DDBB70]/30"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Filtros Padrão</span>
                </button>
              </div>
            ) : (
              /* CARDS DAS CELEBRAÇÕES */
              resultadosBusca.map((celebracao) => {
                const tempoInfo = TEMPOS_LITURGICOS_OPTIONS[celebracao.tempoLiturgico] || TEMPOS_LITURGICOS_OPTIONS.quaresma;
                const formaInfo = FORMAS_CELEBRACAO_OPTIONS.find((f) => f.id === celebracao.forma) || FORMAS_CELEBRACAO_OPTIONS[0];
                const isCelebracaoOpen = openCelebracaoIds.has(celebracao.id);

                const totalPassosCelebracao =
                  (celebracao.ritos?.iniciais?.length || 0) +
                  (celebracao.ritos?.palavra?.length || 0) +
                  (celebracao.ritos?.eucaristica?.length || 0) +
                  (celebracao.ritos?.finais?.length || 0);

                const displayImage = celebracao.imageUrl || celebracao.imagem || '/images/quaresma.jpg';

                return (
                  <article
                    key={celebracao.id}
                    className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-5 shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden"
                  >
                    {/* PARTE VISÍVEL DO CARD */}
                    <div className="flex flex-col sm:flex-row gap-5 items-start">

                      {/* THUMBNAIL DA CELEBRAÇÃO (ESQUERDA) */}
                      <div className="relative w-full sm:w-36 h-36 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F3EEE3] border border-[#E5D8BE]/70 shadow-xs">
                        <Image
                          src={displayImage}
                          alt={celebracao.nome}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, 144px"
                        />
                      </div>

                      {/* INFORMACÕES CENTRAIS */}
                      <div className="flex-1 space-y-2 w-full">

                        {/* BADGES SUPERIORES */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#F5EEFB] text-[#6B21A8] border border-[#E9D5FF]">
                            <span className="w-2 h-2 rounded-full bg-[#7B1FA2]" />
                            Tempo: {tempoInfo.nome} ({tempoInfo.corLiturgica.name})
                          </span>

                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F5EFE6] text-[#7A6843] border border-[#E5D8BE]">
                            <Calendar className="w-3 h-3 text-[#7A6843]" />
                            Grau: {celebracao.grauCelebracao.toUpperCase()}
                          </span>

                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F5EFE6] text-[#7A6843] border border-[#E5D8BE]">
                            <Sparkles className="w-3 h-3 text-[#7A6843]" />
                            {formaInfo.nome}
                          </span>
                        </div>

                        {/* TÍTULO DA CELEBRAÇÃO */}
                        <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#9A6F20] tracking-tight pt-1">
                          {celebracao.nome}
                        </h3>

                        {/* DESCRIÇÃO */}
                        {celebracao.descricaoBreve && (
                          <p className="text-[#5F6B7A] text-xs sm:text-sm leading-relaxed">
                            {celebracao.descricaoBreve}
                          </p>
                        )}
                      </div>

                      {/* LADO DIREITO DO CARD */}
                      <div className="flex flex-row sm:flex-col items-end justify-between sm:justify-between w-full sm:w-auto h-full gap-3 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5D8BE]/40">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F5EFE6] text-[#7A6843] border border-[#E5D8BE]">
                          <ListOrdered className="w-3.5 h-3.5 text-[#7A6843]" />
                          <span>{totalPassosCelebracao} passos litúrgicos</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleCelebracao(celebracao.id)}
                          className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#F5EFE6] hover:bg-[#EEDBB5] text-[#5F6B7A] hover:text-[#17243A] border border-[#E5D8BE] transition-all cursor-pointer shadow-2xs"
                          aria-expanded={isCelebracaoOpen}
                        >
                          <span>{isCelebracaoOpen ? 'Recolher Ritos' : 'Ver Ritos Litúrgicos'}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-[#7A6843] transition-transform duration-300 ${isCelebracaoOpen ? 'rotate-180' : '-rotate-90'
                              }`}
                          />
                        </button>
                      </div>

                    </div>

                    {/* WRAPPER ACCORDION DOS RITOS DETALHADOS */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${isCelebracaoOpen
                        ? 'grid-rows-[1fr] opacity-100 pt-4 border-t border-[#E5D8BE]/60'
                        : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4">
                          {(['estruturaCelebracao', 'iniciais', 'palavra', 'eucaristica', 'finais', 'ritosDevocionais'] as GrupoRito[]).map(
                            (grupoKey) => {
                              const passosDoGrupo = celebracao.ritos[grupoKey];
                              const grupoInfo = GRUPOS_RITO_INFO[grupoKey];
                              const groupKeyId = `${celebracao.id}-${grupoKey}`;
                              const isGroupOpen = openGroupIds.has(groupKeyId);

                              if (!passosDoGrupo || passosDoGrupo.length === 0) return null;

                              return (
                                <section
                                  key={grupoKey}
                                  className="border border-[#E5D8BE] rounded-2xl overflow-hidden bg-[#FAF7F0] space-y-0"
                                >
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleGroup(celebracao.id, grupoKey);
                                    }}
                                    className="w-full bg-[#F5EFE6] hover:bg-[#EEDBB5]/70 text-[#17243A] p-4 font-bold flex items-center justify-between transition-all cursor-pointer text-left border-b border-[#E5D8BE]"
                                    aria-expanded={isGroupOpen}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-xl bg-[#17243A] text-[#DDBB70] flex items-center justify-center font-bold shadow-xs">
                                        <DynamicIcon name={grupoInfo.iconName} className="w-4 h-4" />
                                      </div>
                                      <div>
                                        <h4 className="text-base font-serif font-bold text-[#17243A]">
                                          {grupoInfo.nome}
                                        </h4>
                                        <p className="text-xs text-[#7A6843] font-sans font-normal">
                                          {grupoInfo.descricao}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <span className="px-2.5 py-1 rounded-full bg-white border border-[#E5D8BE] text-[#7A6843] text-xs font-semibold">
                                        {passosDoGrupo.length} passos
                                      </span>
                                      <ChevronDown
                                        className={`w-5 h-5 text-[#9A6F20] transition-transform duration-300 ${isGroupOpen ? 'rotate-180' : 'rotate-0'
                                          }`}
                                      />
                                    </div>
                                  </button>

                                  <div
                                    className={`grid transition-all duration-300 ease-in-out ${isGroupOpen
                                      ? 'grid-rows-[1fr] opacity-100'
                                      : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                                      }`}
                                  >
                                    <div className="overflow-hidden">
                                      <div className="p-4 sm:p-5 space-y-4">
                                        {passosDoGrupo.map((passo) => {
                                          const stepKeyId = `${celebracao.id}-${passo.id}`;
                                          const isStepOpen = openStepIds.has(stepKeyId);

                                          return (
                                            <article
                                              key={passo.id}
                                              className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-xl p-4 sm:p-5 shadow-2xs space-y-3"
                                            >
                                              <div className="flex items-start justify-between gap-3">
                                                <div className="space-y-1">
                                                  <div className="flex items-center gap-2">
                                                    <span className="px-2.5 py-0.5 rounded-full bg-[#F5E6CA] text-[#7A5A18] border border-[#D8C29A] text-[11px] font-bold">
                                                      Passo #{passo.numero}
                                                    </span>
                                                  </div>
                                                  <h5 className="text-base font-bold font-serif text-[#17243A]">
                                                    {passo.titulo}
                                                  </h5>
                                                  {passo.subTitulo && (
                                                    <p className="text-xs font-semibold text-[#9A6F20]">
                                                      {passo.subTitulo}
                                                    </p>
                                                  )}
                                                </div>

                                                <button
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleStep(celebracao.id, passo.id);
                                                  }}
                                                  className="px-3 py-1.5 rounded-full bg-[#F5EFE6] hover:bg-[#EEDBB5] text-[#5F6B7A] hover:text-[#17243A] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 border border-[#E5D8BE]"
                                                  aria-expanded={isStepOpen}
                                                >
                                                  <span>{isStepOpen ? 'Recolher' : 'Detalhes'}</span>
                                                  <ChevronDown
                                                    className={`w-3.5 h-3.5 text-[#7A6843] transition-transform duration-300 ${isStepOpen ? 'rotate-180' : 'rotate-0'
                                                      }`}
                                                  />
                                                </button>
                                              </div>

                                              {passo.descricao && (
                                                <p className="text-[#5F6B7A] text-xs sm:text-sm leading-relaxed">
                                                  {passo.descricao}
                                                </p>
                                              )}

                                              <div
                                                className={`grid transition-all duration-300 ease-in-out ${isStepOpen
                                                  ? 'grid-rows-[1fr] opacity-100'
                                                  : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                                                  }`}
                                              >
                                                <div className="overflow-hidden">
                                                  <div className="space-y-4 pt-3 border-t border-[#E5D8BE]/50">

                                                    {passo.rubrica && (
                                                      <div className="bg-[#FAF4E8] border-l-4 border-[#9A6F20] text-[#5C4312] p-3.5 rounded-r-xl text-xs sm:text-sm font-serif italic space-y-1">
                                                        <div className="font-sans font-bold not-italic text-[#9A6F20] text-xs uppercase tracking-wider flex items-center gap-1">
                                                          <span>❖ Rubrica Litúrgica</span>
                                                        </div>
                                                        <p>{passo.rubrica}</p>
                                                      </div>
                                                    )}

                                                    {passo.textos && passo.textos.length > 0 && (
                                                      <div className="space-y-2 bg-[#F5EFE6]/50 border border-[#E5D8BE] rounded-xl p-3.5">
                                                        <h6 className="text-xs font-bold uppercase tracking-wider text-[#7A6843] flex items-center gap-1">
                                                          <FileText className="w-3.5 h-3.5 text-[#9A6F20]" /> Diálogo / Textos Litúrgicos
                                                        </h6>
                                                        <div className="space-y-1.5">
                                                          {passo.textos.map((txt, tIdx) => (
                                                            <p
                                                              key={tIdx}
                                                              className="text-[#26364D] text-xs sm:text-sm font-serif leading-relaxed"
                                                            >
                                                              {txt}
                                                            </p>
                                                          ))}
                                                        </div>
                                                      </div>
                                                    )}

                                                    {passo.items && passo.items.length > 0 && (
                                                      <div className="space-y-2">
                                                        <h6 className="text-xs font-bold uppercase tracking-wider text-[#7A6843] flex items-center gap-1">
                                                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9A6F20]" /> Elementos e Gestos Principais
                                                        </h6>
                                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                          {passo.items.map((item, iIdx) => (
                                                            <li
                                                              key={iIdx}
                                                              className="flex items-start gap-2 text-[#4A5568] text-xs sm:text-sm"
                                                            >
                                                              <CheckCircle2 className="w-4 h-4 text-[#9A6F20] flex-shrink-0 mt-0.5" />
                                                              <span>{item}</span>
                                                            </li>
                                                          ))}
                                                        </ul>
                                                      </div>
                                                    )}

                                                    {passo.media && (
                                                      <div className="pt-2">
                                                        <h6 className="text-xs font-bold uppercase tracking-wider text-[#7A6843] mb-2 flex items-center gap-1">
                                                          <Sparkles className="w-3.5 h-3.5 text-[#9A6F20]" /> Mídia Demonstrativa
                                                        </h6>
                                                        <MediaRenderer media={passo.media} />
                                                      </div>
                                                    )}

                                                  </div>
                                                </div>
                                              </div>
                                            </article>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}

          </div>

          {/* SIDEBAR / PAINEL LATERAL (DIREITA) */}
          <aside className="w-full md:w-80 flex-shrink-0 space-y-5 md:sticky md:top-20">

            {/* CARD 1: CONFIGURAÇÃO LITÚRGICA ATIVA */}
            <div className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-5 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 font-serif font-bold text-xs uppercase tracking-wider text-[#17243A]">
                <span className="text-[#9A6F20] text-sm">❖</span>
                <span>CONFIGURAÇÃO LITÚRGICA ATIVA</span>
              </div>

              <div className="space-y-2.5 text-xs text-[#5F6B7A] border-t border-[#E5D8BE]/50 pt-3">
                <div className="flex justify-between items-center">
                  <span>Forma:</span>
                  <strong className="text-[#17243A] font-semibold">{formaAtivaOption.nome}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tempo:</span>
                  <strong className="text-[#17243A] font-semibold">{tempoAtivoMetadata.nome}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Grau:</span>
                  <strong className="text-[#17243A] font-semibold uppercase">
                    {filtrosPesquisados.grau || 'TODOS'}
                  </strong>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span>Celebrações:</span>
                  <span className="font-bold px-3 py-1 rounded-full text-[11px] bg-[#B89B5E] text-white shadow-2xs">
                    {resultadosBusca.length} encontrada(s)
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 2: DIRETÓRIO LITÚRGICO (AZUL-MARINHO COM GRADIENTE) */}
            <div className="bg-gradient-to-b from-[#17243A] to-[#121D2F] text-white rounded-3xl p-5 shadow-md border border-[#233550] space-y-4 relative overflow-hidden">
              <div className="font-serif font-bold text-xs uppercase tracking-wider text-[#DDBB70] flex items-center gap-2">
                <Church className="w-4 h-4 text-[#DDBB70]" />
                <span>DIRETÓRIO LITÚRGICO</span>
              </div>
              <p className="text-xs text-[#A0B0C6] leading-relaxed">
                Navegue pelos Ritos Complementares e Sacramentais do Ritual Romano.
              </p>

              <div className="space-y-2.5 pt-1">
                {/* 4. BOTÃO RITOS COMPLEMENTARES COM GRADIENTE DOURADO REFINADO */}
                <Link
                  href="/ritos-complementares"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-[#DDBB70] via-[#C69A3A] to-[#DDBB70] text-[#17243A] shadow-sm hover:opacity-95 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#17243A]" />
                  <span>Ritos Complementares</span>
                </Link>

                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-[#8BA1C1] hover:text-white bg-[#111B2C] hover:bg-[#0C1422] border border-[#233550] transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
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
