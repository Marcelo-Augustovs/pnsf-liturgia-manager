'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
  AlertCircle
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

  const [openCelebracaoIds, setOpenCelebracaoIds] =
    useState<Set<string>>(new Set());

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
                Ordem do Rito • Guia Interativo por Celebrações Litúrgicas
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

        {/* Banner do Tempo Litúrgico */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {/* Liturgical Color Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${tempoAtivoMetadata.corLiturgica.badgeBg} ${tempoAtivoMetadata.corLiturgica.badgeText} ${tempoAtivoMetadata.corLiturgica.badgeBorder}`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${tempoAtivoMetadata.corLiturgica.dotBg} animate-pulse`}
                />
                Cor Litúrgica: {tempoAtivoMetadata.corLiturgica.name} ({tempoAtivoMetadata.nome})
              </span>

              {/* Form Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <Sparkles className="w-3 h-3 text-amber-600" />
                {formaAtivaOption.nome}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Ordem das Celebrações Litúrgicas
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
              {tempoAtivoMetadata.descricao}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 max-w-xs w-full space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-600" /> Orientação do Período
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              <strong className="text-slate-800">{tempoAtivoMetadata.nome}:</strong> {tempoAtivoMetadata.periodo}
            </p>
          </div>
        </section>

        {/* PAINEL DE FILTROS E BOTÃO DE PESQUISA */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Filtros de Busca por Celebração
                </h3>
                <p className="text-xs text-slate-500">
                  Selecione os parâmetros e clique em Pesquisar para filtrar os ritos.
                </p>
              </div>
            </div>

            {temFiltrosPendentes && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" /> Clique em Pesquisar para aplicar
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* 1. Forma da Celebração */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-600" /> Forma da Celebração
              </label>
              <div className="grid grid-cols-1 gap-1.5 bg-slate-100 p-1.5 rounded-xl">
                {FORMAS_CELEBRACAO_OPTIONS.map((forma) => {
                  const isSelected = filtrosSelecionados.forma === forma.id;
                  return (
                    <button
                      key={forma.id}
                      type="button"
                      onClick={() =>
                        setFiltrosSelecionados((prev) => ({ ...prev, forma: forma.id }))
                      }
                      className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${isSelected
                        ? 'bg-slate-900 text-white shadow-xs font-bold'
                        : 'text-slate-700 hover:bg-slate-200/70 font-medium'
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-slate-400'
                            }`}
                        />
                        {forma.nome}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-slate-800 text-amber-300' : 'bg-slate-200 text-slate-600'
                          }`}
                      >
                        {forma.badgeLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Tempo Litúrgico */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" /> Tempo Litúrgico
              </label>
              <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1.5 rounded-xl">
                {Object.values(TEMPOS_LITURGICOS_OPTIONS).map((tempo) => {
                  const isSelected = filtrosSelecionados.tempo === tempo.id;
                  return (
                    <button
                      key={tempo.id}
                      type="button"
                      onClick={() =>
                        setFiltrosSelecionados((prev) => ({ ...prev, tempo: tempo.id }))
                      }
                      className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${isSelected
                        ? `${tempo.corLiturgica.badgeBg} ${tempo.corLiturgica.badgeText} ${tempo.corLiturgica.badgeBorder} shadow-xs font-bold`
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${tempo.corLiturgica.dotBg}`} />
                      <span className="truncate">{tempo.nome}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Grau da Celebração (Opcional / Todos) */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> Grau da Celebração (Opcional)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-xl">
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
                      className={`px-2.5 py-2 rounded-lg text-xs font-medium transition-all text-center truncate cursor-pointer ${isSelected
                        ? 'bg-slate-900 text-amber-400 font-bold shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                      {grau.nome}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Botão de Pesquisa Explicito */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetFiltros}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir Filtros</span>
            </button>

            <button
              type="button"
              onClick={handlePesquisar}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-amber-400 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>[ Pesquisar / Buscar Celebrações ]</span>
            </button>
          </div>
        </section>

        {/* LAYOUT PRINCIPAL EM 2 COLUNAS */}
        <div className="flex flex-col md:flex-row gap-6 items-start">

          {/* COLUNA PRINCIPAL: LISTA DE CELEBRAÇÕES ENCONTRADAS */}
          <div className="flex-1 w-full space-y-8">

            {/* Estado Amigável de "Nenhuma celebração encontrada" */}
            {resultadosBusca.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
                  <Filter className="w-8 h-8" />
                </div>
                <div className="space-y-1.5 max-w-md mx-auto">
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    Nenhuma celebração encontrada para estes filtros
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tente selecionar um grau diferente (ex: "Todos os Graus") ou alterar o Tempo Litúrgico para visualizar as celebrações cadastradas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFiltros}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-amber-400 hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Filtros Padrão</span>
                </button>
              </div>
            ) : (
              /* CARD CONTAINER PRINCIPAL DA CELEBRAÇÃO */
              resultadosBusca.map((celebracao) => {
                const tempoInfo = TEMPOS_LITURGICOS_OPTIONS[celebracao.tempoLiturgico] || TEMPOS_LITURGICOS_OPTIONS.quaresma;
                const formaInfo = FORMAS_CELEBRACAO_OPTIONS.find((f) => f.id === celebracao.forma) || FORMAS_CELEBRACAO_OPTIONS[0];
                const isCelebracaoOpen = openCelebracaoIds.has(celebracao.id);

                // Cálculo dos metadados estatísticos da celebração
                const totalPassosCelebracao =
                  (celebracao.ritos?.iniciais?.length || 0) +
                  (celebracao.ritos?.palavra?.length || 0) +
                  (celebracao.ritos?.eucaristica?.length || 0) +
                  (celebracao.ritos?.finais?.length || 0);

                return (
                  <article
                    key={celebracao.id}
                    className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Cabeçalho do Card Principal da Celebração (Accordion Pai) */}
                    <button
                      type="button"
                      onClick={() => toggleCelebracao(celebracao.id)}
                      className="w-full bg-slate-900 hover:bg-slate-850 text-white p-5 sm:p-6 transition-colors space-y-4 text-left border-b border-slate-800 cursor-pointer group"
                      aria-expanded={isCelebracaoOpen}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Liturgical Color Badge */}
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${tempoInfo.corLiturgica.badgeBg} ${tempoInfo.corLiturgica.badgeText} ${tempoInfo.corLiturgica.badgeBorder}`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${tempoInfo.corLiturgica.dotBg}`}
                            />
                            Tempo: {tempoInfo.nome} ({tempoInfo.corLiturgica.name})
                          </span>

                          {/* Grau Badge */}
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-amber-300 border border-slate-700">
                            <Calendar className="w-3 h-3 text-amber-400" />
                            Grau: {celebracao.grauCelebracao.toUpperCase()}
                          </span>

                          {/* Forma Badge */}
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            {formaInfo.nome}
                          </span>
                        </div>

                        {/* Badge de Contagem Total de Passos */}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-amber-400 border border-amber-500/30">
                          <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
                          <span>{totalPassosCelebracao} passos litúrgicos</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-400 tracking-wide group-hover:text-amber-300 transition-colors">
                            {celebracao.nome}
                          </h2>

                          {celebracao.descricaoBreve && (
                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                              {celebracao.descricaoBreve}
                            </p>
                          )}
                        </div>

                        {/* Indicador Visual do Accordion Pai */}
                        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 group-hover:border-amber-500/40 group-hover:text-white transition-all flex-shrink-0">
                          <span className="hidden sm:inline">
                            {isCelebracaoOpen ? 'Recolher Ritos' : 'Ver Ritos Litúrgicos'}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-amber-400 transition-transform duration-300 ease-in-out ${isCelebracaoOpen ? 'rotate-180' : 'rotate-0'
                              }`}
                          />
                        </div>
                      </div>
                    </button>

                    {/* WRAPPER COM ANIMAÇÃO SUAVE DE EXPANSÃO/RECOLHIMENTO DO ACCORDION PAI */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${isCelebracaoOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                        }`}
                    >
                      <div className="overflow-hidden">
                        {/* CONTEÚDO DOS 4 GRANDES GRUPOS DE RITOS */}
                        <div className="p-5 sm:p-6 space-y-6">
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
                                  className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 space-y-0 shadow-2xs"
                                >
                                  {/* ACCORDION DO GRUPO DE RITO (FILHO 1) */}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleGroup(celebracao.id, grupoKey);
                                    }}
                                    className="w-full bg-slate-100 hover:bg-slate-200/80 text-slate-900 p-4 font-bold flex items-center justify-between transition-all cursor-pointer text-left border-b border-slate-200"
                                    aria-expanded={isGroupOpen}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shadow-xs">
                                        <DynamicIcon name={grupoInfo.iconName} className="w-4 h-4" />
                                      </div>
                                      <div>
                                        <h3 className="text-base font-serif font-bold text-slate-900">
                                          {grupoInfo.nome}
                                        </h3>
                                        <p className="text-xs text-slate-500 font-sans font-normal">
                                          {grupoInfo.descricao}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <span className="px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-700 text-xs font-semibold">
                                        {passosDoGrupo.length} passos
                                      </span>
                                      <ChevronDown
                                        className={`w-5 h-5 text-amber-600 transition-transform duration-300 ${isGroupOpen ? 'rotate-180 text-amber-600' : 'rotate-0 text-slate-400'
                                          }`}
                                      />
                                    </div>
                                  </button>

                                  {/* LISTA DOS PASSOS DO GRUPO COM TRANSIÇÃO SUAVE */}
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
                                              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-3"
                                            >
                                              {/* Cabeçalho do Passo com Botão Recolher/Detalhes */}
                                              <div className="flex items-start justify-between gap-3">
                                                <div className="space-y-1">
                                                  <div className="flex items-center gap-2">
                                                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-900 border border-amber-500/20 text-xs font-bold">
                                                      Passo #{passo.numero}
                                                    </span>
                                                  </div>
                                                  <h4 className="text-base font-bold font-serif text-slate-900">
                                                    {passo.titulo}
                                                  </h4>
                                                  {passo.subTitulo && (
                                                    <p className="text-xs font-semibold text-amber-700">
                                                      {passo.subTitulo}
                                                    </p>
                                                  )}
                                                </div>

                                                {/* BOTÃO EXPANDIR / RECOLHER PASSO INDIVIDUAL (FILHO 2) */}
                                                <button
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleStep(celebracao.id, passo.id);
                                                  }}
                                                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0"
                                                  aria-expanded={isStepOpen}
                                                >
                                                  <span>{isStepOpen ? 'Recolher' : 'Detalhes'}</span>
                                                  <ChevronDown
                                                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isStepOpen ? 'rotate-180 text-amber-600' : 'rotate-0 text-slate-400'
                                                      }`}
                                                  />
                                                </button>
                                              </div>

                                              {/* Descrição Curta do Passo */}
                                              {passo.descricao && (
                                                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                                                  {passo.descricao}
                                                </p>
                                              )}

                                              {/* CONTEÚDO DETALHADO DO PASSO COM TRANSIÇÃO SUAVE */}
                                              <div
                                                className={`grid transition-all duration-300 ease-in-out ${isStepOpen
                                                  ? 'grid-rows-[1fr] opacity-100'
                                                  : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                                                  }`}
                                              >
                                                <div className="overflow-hidden">
                                                  <div className="space-y-4 pt-3 border-t border-slate-100">

                                                    {/* Rubrica Litúrgica Destaque */}
                                                    {passo.rubrica && (
                                                      <div className="bg-amber-50/70 border-l-4 border-amber-500 text-amber-950 p-3.5 rounded-r-xl text-xs sm:text-sm font-serif italic space-y-1">
                                                        <div className="font-sans font-bold not-italic text-amber-800 text-xs uppercase tracking-wider flex items-center gap-1">
                                                          <span>❖ Rubrica Litúrgica</span>
                                                        </div>
                                                        <p>{passo.rubrica}</p>
                                                      </div>
                                                    )}

                                                    {/* Diálogos / Textos da Celebração */}
                                                    {passo.textos && passo.textos.length > 0 && (
                                                      <div className="space-y-2 bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                                                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                                          <FileText className="w-3.5 h-3.5 text-amber-600" /> Diálogo / Textos Litúrgicos
                                                        </h5>
                                                        <div className="space-y-1.5">
                                                          {passo.textos.map((txt, tIdx) => (
                                                            <p
                                                              key={tIdx}
                                                              className="text-slate-700 text-xs sm:text-sm font-serif leading-relaxed"
                                                            >
                                                              {txt}
                                                            </p>
                                                          ))}
                                                        </div>
                                                      </div>
                                                    )}

                                                    {/* Elementos e Gestos Principais */}
                                                    {passo.items && passo.items.length > 0 && (
                                                      <div className="space-y-2">
                                                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Elementos e Gestos Principais
                                                        </h5>
                                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                          {passo.items.map((item, iIdx) => (
                                                            <li
                                                              key={iIdx}
                                                              className="flex items-start gap-2 text-slate-700 text-xs sm:text-sm"
                                                            >
                                                              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                                              <span>{item}</span>
                                                            </li>
                                                          ))}
                                                        </ul>
                                                      </div>
                                                    )}

                                                    {/* Mídia Demonstrativa (Imagem / Vídeo) */}
                                                    {passo.media && (
                                                      <div className="pt-2">
                                                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                                                          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Mídia Demonstrativa
                                                        </h5>
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

          {/* COLUNA LATERAL DIREITA: ÍNDICE SEQUENCIAL E DIRETÓRIO (Desktop md:) */}
          <aside className="w-full md:w-80 flex-shrink-0 space-y-6 md:sticky md:top-20">


            {/* Cartão de Estado da Busca Atual */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-700">
                <Sparkles className="w-4 h-4 text-amber-600" /> Configuração Litúrgica Ativa
              </div>

              <div className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Forma:</span>
                  <strong className="text-slate-900 font-semibold">{formaAtivaOption.nome}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Tempo:</span>
                  <strong className="text-slate-900 font-semibold">{tempoAtivoMetadata.nome}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Grau:</span>
                  <strong className="text-slate-900 font-semibold uppercase">
                    {filtrosPesquisados.grau || 'todos'}
                  </strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Celebrações:</span>
                  <span className="font-bold px-2 py-0.5 rounded-md text-[11px] bg-slate-900 text-amber-400">
                    {resultadosBusca.length} encontrada(s)
                  </span>
                </div>
              </div>
            </div>

            {/* Cartão de Navegação para Ritos Complementares */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md border border-slate-800 space-y-3">
              <div className="font-semibold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Church className="w-4 h-4 text-amber-400" /> Diretório Litúrgico
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Navegue pelos Ritos Complementares e Sacramentais do Ritual Romano.
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
