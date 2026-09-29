'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SacristiaState, SacristiaCategoria } from '@/types/sacristia';
import { SacristiaHeader } from './components/SacristiaHeader';
import { SacristiaSummary } from './components/SacristiaSummary';
import { SacristiaAlerts } from './components/SacristiaAlerts';
import { CategoriesGrid } from './components/CategoriesGrid';
import { ModuleSkeleton } from './components/ModuleSkeleton';
import {
  Church,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'pnsf_sacristia_state_v1';

// LAZY LOADING REAL DE COMPONENTES DE CATEGORIA COM NEXT/DYNAMIC
const AlfaiasManager = dynamic(
  () => import('./components/AlfaiasManager').then((mod) => mod.AlfaiasManager),
  { loading: () => <ModuleSkeleton /> }
);

const ConsumablesCard = dynamic(
  () => import('./components/ConsumablesCard').then((mod) => mod.ConsumablesCard),
  { loading: () => <ModuleSkeleton /> }
);

const InventoryCard = dynamic(
  () => import('./components/InventoryCard').then((mod) => mod.InventoryCard),
  { loading: () => <ModuleSkeleton /> }
);

// MAPEO DE CARREGADORES ASSÍNCRONOS DE DADOS POR CATEGORIA (DATA SPLITTING)
const categoryLoaders: Record<SacristiaCategoria, () => Promise<any>> = {
  alfaias: () => import('./data/categories/alfaias'),
  toalhas: () => import('./data/categories/toalhas'),
  paramentos: () => import('./data/categories/paramentos'),
  vasos: () => import('./data/categories/vasos'),
  consumiveis: () => import('./data/categories/consumiveis'),
  decoracao: () => import('./data/categories/decoracao'),
};

export default function SacristiaDashboardPage() {
  // activeCategory inicia como null na Tela Inicial (Dashboard)
  const [activeCategory, setActiveCategory] = useState<SacristiaCategoria | 'todas' | null>(null);
  
  // loadedCategoriesData armazena em memória apenas os dados das categorias baixadas
  const [loadedCategoriesData, setLoadedCategoriesData] = useState<Partial<SacristiaState>>({});
  
  // loadingCategory indica qual categoria está sendo baixada sob demanda
  const [loadingCategory, setLoadingCategory] = useState<SacristiaCategoria | 'todas' | null>(null);
  
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const moduleRef = useRef<HTMLDivElement>(null);

  // Scroll suave até o módulo recém-carregado
  const scrollToModule = () => {
    setTimeout(() => {
      if (moduleRef.current) {
        moduleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Toast feedback
  const triggerToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3500);
  };

  // Auxiliar para salvar atualização no localStorage sem parsed total antecipado
  const saveCategoryToLocalStorage = (updatedPartial: Partial<SacristiaState>) => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      const existingObj = saved ? JSON.parse(saved) : {};
      const newObj = { ...existingObj, ...updatedPartial };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newObj));
    } catch (e) {
      console.error('Falha ao salvar categoria no localStorage', e);
    }
  };

  // FUNÇÃO PRINCIPAL DE SELEÇÃO E CARREGAMENTO SOB DEMANDA DE CATEGORIA (CACHE + ASYNC IMPORT)
  const loadCategoryData = async (category: SacristiaCategoria | 'todas') => {
    const categoriesToLoad: SacristiaCategoria[] =
      category === 'todas'
        ? ['alfaias', 'toalhas', 'paramentos', 'vasos', 'consumiveis', 'decoracao']
        : [category];

    // Ler localStorage silenciosamente se houver dados salvos para as categorias solicitadas
    let savedLocalData: Partial<SacristiaState> = {};
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        savedLocalData = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Erro ao ler localStorage', e);
    }

    const keyMap: Record<SacristiaCategoria, keyof SacristiaState> = {
      alfaias: 'alfaias',
      toalhas: 'toalhas',
      paramentos: 'paramentos',
      vasos: 'vasos',
      consumiveis: 'consumiveis',
      decoracao: 'decoracoes',
    };

    // Verificar quais categorias faltam na memória
    const missingFromMemory = categoriesToLoad.filter(
      (cat) => !loadedCategoriesData[keyMap[cat]]
    );

    if (missingFromMemory.length === 0) {
      // Reutilização instantânea de Cache em memória!
      setActiveCategory(category);
      scrollToModule();
      return;
    }

    const updates: Partial<SacristiaState> = {};
    const missingFromBoth: SacristiaCategoria[] = [];

    // Verificar se a categoria solicitada existe no localStorage
    for (const cat of missingFromMemory) {
      const stateKey = keyMap[cat];
      if (savedLocalData[stateKey] && Array.isArray(savedLocalData[stateKey])) {
        updates[stateKey] = savedLocalData[stateKey] as any;
      } else {
        missingFromBoth.push(cat);
      }
    }

    // Se houver categorias sem dados em memória nem no localStorage, faz o import() assíncrono
    if (missingFromBoth.length > 0) {
      setLoadingCategory(category);
      try {
        for (const cat of missingFromBoth) {
          const mod = await categoryLoaders[cat]();
          if (cat === 'alfaias') updates.alfaias = mod.mockAlfaias;
          if (cat === 'toalhas') updates.toalhas = mod.mockToalhas;
          if (cat === 'paramentos') updates.paramentos = mod.mockParamentos;
          if (cat === 'vasos') updates.vasos = mod.mockVasos;
          if (cat === 'consumiveis') updates.consumiveis = mod.mockConsumiveis;
          if (cat === 'decoracao') updates.decoracoes = mod.mockDecoracoes;
        }
      } catch (error) {
        console.error('Erro ao carregar módulo de dados da categoria:', error);
      } finally {
        setLoadingCategory(null);
      }
    }

    // Atualiza o cache em memória e o activeCategory
    setLoadedCategoriesData((prev) => {
      const nextState = { ...prev, ...updates };
      saveCategoryToLocalStorage(nextState);
      return nextState;
    });

    setActiveCategory(category);
    scrollToModule();
  };

  // State Updates Handlers
  const handleUpdateAlfaia = (updatedItem: any) => {
    setLoadedCategoriesData((prev) => {
      const newAlfaias = (prev.alfaias || []).map((a) =>
        a.id === updatedItem.id ? updatedItem : a
      );
      const nextState = { ...prev, alfaias: newAlfaias };
      saveCategoryToLocalStorage({ alfaias: newAlfaias });
      return nextState;
    });
    triggerToast(`Alfaia "${updatedItem.nome}" atualizada para: ${updatedItem.etapaLavagem}`);
  };

  const handleAddAlfaia = (newItem: any) => {
    setLoadedCategoriesData((prev) => {
      const newAlfaias = [newItem, ...(prev.alfaias || [])];
      const nextState = { ...prev, alfaias: newAlfaias };
      saveCategoryToLocalStorage({ alfaias: newAlfaias });
      return nextState;
    });
    triggerToast(`Nova alfaia "${newItem.nome}" cadastrada com sucesso!`);
  };

  const handleUpdateConsumivel = (updatedItem: any) => {
    setLoadedCategoriesData((prev) => {
      const newConsumiveis = (prev.consumiveis || []).map((c) =>
        c.id === updatedItem.id ? updatedItem : c
      );
      saveCategoryToLocalStorage({ consumiveis: newConsumiveis });
      return { ...prev, consumiveis: newConsumiveis };
    });
    triggerToast(`Estoque de "${updatedItem.nome}" reabastecido!`);
  };

  const handleSimularCelebracao = async () => {
    // Se consumíveis não estiver na memória, carrega primeiro
    if (!loadedCategoriesData.consumiveis) {
      await loadCategoryData('consumiveis');
    }

    setLoadedCategoriesData((prev) => {
      const novoseConsumiveis = (prev.consumiveis || []).map((c) => {
        if (c.tipo === 'hostias') {
          return {
            ...c,
            quantidadeAtual: Math.max(0, c.quantidadeAtual - c.taxaConsumoPorCelebracao),
          };
        }
        if (c.tipo === 'vinho') {
          return {
            ...c,
            quantidadeAtual: Math.max(
              0,
              Number((c.quantidadeAtual - c.taxaConsumoPorCelebracao).toFixed(2))
            ),
          };
        }
        if (c.tipo === 'incenso') {
          return {
            ...c,
            quantidadeAtual: Math.max(0, c.quantidadeAtual - c.taxaConsumoPorCelebracao),
          };
        }
        if (c.tipo === 'carvao') {
          return {
            ...c,
            quantidadeAtual: Math.max(0, c.quantidadeAtual - c.taxaConsumoPorCelebracao),
          };
        }
        return c;
      });

      saveCategoryToLocalStorage({ consumiveis: novoseConsumiveis });
      return { ...prev, consumiveis: novoseConsumiveis };
    });
    triggerToast('⚡ Consumo de 1 Missa Solene registrado! (Hóstias, Vinho, Incenso e Carvão atualizados)');
  };

  const handleUpdateToalha = (updatedItem: any) => {
    setLoadedCategoriesData((prev) => {
      const newToalhas = (prev.toalhas || []).map((t) =>
        t.id === updatedItem.id ? updatedItem : t
      );
      saveCategoryToLocalStorage({ toalhas: newToalhas });
      return { ...prev, toalhas: newToalhas };
    });
    triggerToast(`Item "${updatedItem.nome}" atualizado.`);
  };

  const handleUpdateParamento = (updatedItem: any) => {
    setLoadedCategoriesData((prev) => {
      const newParamentos = (prev.paramentos || []).map((p) =>
        p.id === updatedItem.id ? updatedItem : p
      );
      saveCategoryToLocalStorage({ paramentos: newParamentos });
      return { ...prev, paramentos: newParamentos };
    });
    triggerToast(`Paramento "${updatedItem.nome}" atualizado.`);
  };

  const handleUpdateVaso = (updatedItem: any) => {
    setLoadedCategoriesData((prev) => {
      const newVasos = (prev.vasos || []).map((v) =>
        v.id === updatedItem.id ? updatedItem : v
      );
      saveCategoryToLocalStorage({ vasos: newVasos });
      return { ...prev, vasos: newVasos };
    });
    triggerToast(`Vaso Sagrado "${updatedItem.nome}" atualizado.`);
  };

  const handleUpdateDecoracao = (updatedItem: any) => {
    setLoadedCategoriesData((prev) => {
      const newDecoracoes = (prev.decoracoes || []).map((d) =>
        d.id === updatedItem.id ? updatedItem : d
      );
      saveCategoryToLocalStorage({ decoracoes: newDecoracoes });
      return { ...prev, decoracoes: newDecoracoes };
    });
    triggerToast(`Objeto "${updatedItem.nome}" atualizado.`);
  };

  const handleAddInventoryItem = (category: string, newItem: any) => {
    setLoadedCategoriesData((prev: any) => {
      const currentList = prev[category] || [];
      const newList = [newItem, ...currentList];
      saveCategoryToLocalStorage({ [category]: newList });
      return { ...prev, [category]: newList };
    });
    triggerToast(`Novo item "${newItem.nome}" adicionado ao inventário!`);
  };

  const handleResetState = () => {
    if (
      confirm(
        'Deseja restaurar os dados originais da Sacristia? Todas as alterações locais serão redefinidas.'
      )
    ) {
      setLoadedCategoriesData({});
      setActiveCategory(null);
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch (e) {}
      triggerToast('Dados restaurados para o padrão original da Sacristia.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#17243A] flex flex-col font-sans relative overflow-x-hidden selection:bg-[#DDBB70] selection:text-[#17243A]">
      
      {/* TOAST FEEDBACK NOTIFICATION */}
      {feedbackMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#17243A] text-[#DDBB70] border border-[#DDBB70] px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-300 text-xs font-semibold max-w-sm">
          <CheckCircle2 className="w-4 h-4 text-[#DDBB70] flex-shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* HEADER INSTITUCIONAL DA SACRISTIA */}
      <SacristiaHeader onResetData={handleResetState} />

      {/* CONTEÚDO PRINCIPAL (MOBILE FIRST) */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col space-y-6 z-10 relative">
        
        {/* BANNER REVERENTE DE BOAS-VINDAS / PAINEL SACRA */}
        <section className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-5 sm:p-7 shadow-[0_4px_18px_rgba(61,45,25,0.08)] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#17243A] text-[#DDBB70] border border-[#DDBB70]/40">
                <Church className="w-3.5 h-3.5 text-[#DDBB70]" />
                Sacristia Paroquial
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5EFE6] text-[#7A6843] border border-[#E5D8BE]">
                <Sparkles className="w-3.5 h-3.5 text-[#9A6F20]" />
                Tempo Litúrgico: Quaresma (Paramentos Roxos)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#17243A] tracking-tight">
              Central de Gestão Litúrgica da Sacristia
            </h2>

            <p className="text-[#5F6B7A] text-xs sm:text-sm leading-relaxed">
              "Tudo o que se refere ao culto divino seja guardado com summa reverência e esmero." Acompanhe o estado de conservação, purificação das alfaias rituais (3 águas), nível de consumíveis e ornamentos para a dignidade das celebrações.
            </p>
          </div>

          {/* CARD LATERAL COM MENSAGEM ESPIRITUAL DA SACRISTIA */}
          <div className="bg-[#F5EFE6]/70 border border-[#E5D8BE] rounded-2xl p-4 text-xs text-[#5F6B7A] w-full md:max-w-xs space-y-2 flex-shrink-0">
            <div className="font-bold text-[#17243A] font-serif flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <HeartHandshake className="w-4 h-4 text-[#9A6F20]" /> Zeladoria Sacra
            </div>
            <p className="italic leading-relaxed text-[11px] text-[#7A6843]">
              "Dignus est Agnus: O zelo pela casa de Deus manifesta-se nos detalhes de cada toalha passada, alfaia purificada e vaso polido."
            </p>
          </div>
        </section>

        {/* 1. COMPACT OPERATIONAL INDICATORS SUMMARY (TELA INICIAL) */}
        <SacristiaSummary
          state={loadedCategoriesData}
          onFilterClick={(filterType) => {
            if (filterType === 'lavagem') loadCategoryData('alfaias');
            else if (filterType === 'alertas') loadCategoryData('consumiveis');
            else loadCategoryData('todas');
          }}
        />

        {/* 2. ALERTA "⚠ ATENÇÃO NA SACRISTIA" (TELA INICIAL) */}
        <SacristiaAlerts
          state={loadedCategoriesData}
          onNavigateToCategory={(category) => loadCategoryData(category as SacristiaCategoria)}
        />

        {/* 3. GRID RESPONSIVO DAS CATEGORIAS DA SACRISTIA (TELA INICIAL) */}
        <CategoriesGrid
          state={loadedCategoriesData}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => loadCategoryData(cat)}
        />

        {/* 4. MÓDULOS DE GERENCIAMENTO INTERATIVOS (CARREGADOS SOMENTE SOB DEMANDA) */}
        <div ref={moduleRef} className="space-y-8 pt-2 scroll-mt-6">
          
          {/* SKELETON LOADER DURANTE O DOWNLOAD ASSÍNCRONO */}
          {loadingCategory && <ModuleSkeleton />}

          {/* PAINEL DE NAVEGAÇÃO E BOTÃO "VOLTAR PARA CATEGORIAS" QUANDO UMA CATEGORIA ESTÁ ATIVA */}
          {activeCategory && !loadingCategory && (
            <div className="flex items-center justify-between bg-[#FFFCF6] border border-[#E5D8BE] px-4 sm:px-5 py-3 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DDBB70] animate-ping" />
                <span className="text-xs font-bold font-serif text-[#17243A] uppercase tracking-wider">
                  Módulo Ativo: {activeCategory === 'todas' ? 'Todas as Categorias' : activeCategory}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#17243A] text-[#DDBB70] hover:bg-[#223451] transition-all cursor-pointer shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#DDBB70]" />
                <span>Voltar para Categorias</span>
              </button>
            </div>
          )}

          {/* MÓDULO EXCLUSIVO 1: ALFAIAS LITÚRGICAS (3 ÁGUAS) */}
          {!loadingCategory && (activeCategory === 'todas' || activeCategory === 'alfaias') && (
            <AlfaiasManager
              alfaias={loadedCategoriesData.alfaias || []}
              onUpdateAlfaia={handleUpdateAlfaia}
              onAddAlfaia={handleAddAlfaia}
            />
          )}

          {/* MÓDULO EXCLUSIVO 2: MATERIAIS DE CONSUMO (CÁLCULO DINÂMICO) */}
          {!loadingCategory && (activeCategory === 'todas' || activeCategory === 'consumiveis') && (
            <ConsumablesCard
              consumiveis={loadedCategoriesData.consumiveis || []}
              onUpdateConsumivel={handleUpdateConsumivel}
              onSimularCelebracao={handleSimularCelebracao}
            />
          )}

          {/* MÓDULO EXCLUSIVO 3: INVENTÁRIO GERAL (TOALHAS, PARAMENTOS, VASOS, DECORAÇÃO) */}
          {!loadingCategory &&
            (activeCategory === 'todas' ||
              (activeCategory && ['toalhas', 'paramentos', 'vasos', 'decoracao'].includes(activeCategory))) && (
              <InventoryCard
                state={{
                  alfaias: loadedCategoriesData.alfaias || [],
                  toalhas: loadedCategoriesData.toalhas || [],
                  paramentos: loadedCategoriesData.paramentos || [],
                  vasos: loadedCategoriesData.vasos || [],
                  consumiveis: loadedCategoriesData.consumiveis || [],
                  decoracoes: loadedCategoriesData.decoracoes || [],
                }}
                activeCategoryFilter={activeCategory === 'todas' ? 'todos' : activeCategory}
                onUpdateToalha={handleUpdateToalha}
                onUpdateParamento={handleUpdateParamento}
                onUpdateVaso={handleUpdateVaso}
                onUpdateDecoracao={handleUpdateDecoracao}
                onAddItem={handleAddInventoryItem}
              />
            )}

        </div>

      </main>

      {/* FOOTER INSTITUCIONAL */}
      <footer className="bg-[#17243A] text-white border-t border-[#253654] mt-12 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs space-y-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#DDBB70]/20 text-[#DDBB70] flex items-center justify-center font-serif font-bold text-xs border border-[#DDBB70]/40">
              ❖
            </div>
            <span className="font-serif font-bold tracking-widest text-[#DDBB70]">
              PARÓQUIA NOSSA SENHORA DE FÁTIMA
            </span>
          </div>

          <p className="text-[#A0B0C6] text-[11px]">
            Central de Gestão e Zeladoria da Sacristia Litúrgica • Paróquia N. Sra. de Fátima
          </p>

          <div className="flex items-center gap-3 text-[#DDBB70]">
            <Link href="/" className="hover:underline">Início</Link>
            <span>•</span>
            <Link href="/ritos" className="hover:underline">Liturgia da Missa</Link>
            <span>•</span>
            <Link href="/ritos-complementares" className="hover:underline">Ritos Complementares</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
