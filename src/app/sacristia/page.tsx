'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SacristiaState, SacristiaCategoria } from '@/types/sacristia';
import { INITIAL_SACRISTIA_DATA } from '@/data/mockSacristiaData';
import { SacristiaHeader } from './components/SacristiaHeader';
import { SacristiaSummary } from './components/SacristiaSummary';
import { SacristiaAlerts } from './components/SacristiaAlerts';
import { CategoriesGrid } from './components/CategoriesGrid';
import { AlfaiasManager } from './components/AlfaiasManager';
import { ConsumablesCard } from './components/ConsumablesCard';
import { InventoryCard } from './components/InventoryCard';
import {
  Church,
  Sparkles,
  Info,
  Layers,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'pnsf_sacristia_state_v1';

export default function SacristiaDashboardPage() {
  const [sacristiaState, setSacristiaState] = useState<SacristiaState>(INITIAL_SACRISTIA_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SacristiaCategoria | 'todas'>('todas');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Load state from localStorage on client render
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setSacristiaState(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Falha ao carregar estado da sacristia do localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save state to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sacristiaState));
      } catch (e) {
        console.error('Falha ao salvar estado no localStorage', e);
      }
    }
  }, [sacristiaState, isLoaded]);

  // Show temporary toast feedback
  const triggerToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3500);
  };

  // State Updates Handlers
  const handleUpdateAlfaia = (updatedItem: any) => {
    setSacristiaState((prev) => ({
      ...prev,
      alfaias: prev.alfaias.map((a) => (a.id === updatedItem.id ? updatedItem : a)),
    }));
    triggerToast(`Alfaia "${updatedItem.nome}" atualizada para: ${updatedItem.etapaLavagem}`);
  };

  const handleAddAlfaia = (newItem: any) => {
    setSacristiaState((prev) => ({
      ...prev,
      alfaias: [newItem, ...prev.alfaias],
    }));
    triggerToast(`Nova alfaia "${newItem.nome}" cadastrada com sucesso!`);
  };

  const handleUpdateConsumivel = (updatedItem: any) => {
    setSacristiaState((prev) => ({
      ...prev,
      consumiveis: prev.consumiveis.map((c) => (c.id === updatedItem.id ? updatedItem : c)),
    }));
    triggerToast(`Estoque de "${updatedItem.nome}" reabastecido!`);
  };

  const handleSimularCelebracao = () => {
    setSacristiaState((prev) => {
      const novoseConsumiveis = prev.consumiveis.map((c) => {
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

      return {
        ...prev,
        consumiveis: novoseConsumiveis,
      };
    });
    triggerToast('⚡ Consumo de 1 Missa Solene registrado! (Hóstias, Vinho, Incenso e Carvão atualizados)');
  };

  const handleUpdateToalha = (updatedItem: any) => {
    setSacristiaState((prev) => ({
      ...prev,
      toalhas: prev.toalhas.map((t) => (t.id === updatedItem.id ? updatedItem : t)),
    }));
    triggerToast(`Item "${updatedItem.nome}" atualizado.`);
  };

  const handleUpdateParamento = (updatedItem: any) => {
    setSacristiaState((prev) => ({
      ...prev,
      paramentos: prev.paramentos.map((p) => (p.id === updatedItem.id ? updatedItem : p)),
    }));
    triggerToast(`Paramento "${updatedItem.nome}" atualizado.`);
  };

  const handleUpdateVaso = (updatedItem: any) => {
    setSacristiaState((prev) => ({
      ...prev,
      vasos: prev.vasos.map((v) => (v.id === updatedItem.id ? updatedItem : v)),
    }));
    triggerToast(`Vaso Sagrado "${updatedItem.nome}" atualizado.`);
  };

  const handleUpdateDecoracao = (updatedItem: any) => {
    setSacristiaState((prev) => ({
      ...prev,
      decoracoes: prev.decoracoes.map((d) => (d.id === updatedItem.id ? updatedItem : d)),
    }));
    triggerToast(`Objeto "${updatedItem.nome}" atualizado.`);
  };

  const handleAddInventoryItem = (category: string, newItem: any) => {
    setSacristiaState((prev: any) => ({
      ...prev,
      [category]: [newItem, ...prev[category]],
    }));
    triggerToast(`Novo item "${newItem.nome}" adicionado ao inventário!`);
  };

  const handleResetState = () => {
    if (confirm('Deseja restaurar os dados originais da Sacristia? Todas as alterações locais serão redefinidas.')) {
      setSacristiaState(INITIAL_SACRISTIA_DATA);
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

        {/* 1. COMPACT OPERATIONAL INDICATORS SUMMARY */}
        <SacristiaSummary
          state={sacristiaState}
          onFilterClick={(filterType) => {
            if (filterType === 'lavagem') setActiveCategory('alfaias');
            else if (filterType === 'alertas') setActiveCategory('consumiveis');
            else setActiveCategory('todas');
          }}
        />

        {/* 2. ALERTA "⚠ ATENÇÃO NA SACRISTIA" */}
        <SacristiaAlerts
          state={sacristiaState}
          onNavigateToCategory={(category) => setActiveCategory(category as any)}
        />

        {/* 3. GRID RESPONSIVO DAS CATEGORIAS DA SACRISTIA */}
        <CategoriesGrid
          state={sacristiaState}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        {/* 4. MÓDULOS DE GERENCIAMENTO INTERATIVOS */}
        <div className="space-y-8 pt-2">
          
          {/* MÓDULO EXCLUSIVO 1: ALFAIAS LITÚRGICAS (3 ÁGUAS) */}
          {(activeCategory === 'todas' || activeCategory === 'alfaias') && (
            <AlfaiasManager
              alfaias={sacristiaState.alfaias}
              onUpdateAlfaia={handleUpdateAlfaia}
              onAddAlfaia={handleAddAlfaia}
            />
          )}

          {/* MÓDULO EXCLUSIVO 2: MATERIAIS DE CONSUMO (CÁLCULO DINÂMICO) */}
          {(activeCategory === 'todas' || activeCategory === 'consumiveis') && (
            <ConsumablesCard
              consumiveis={sacristiaState.consumiveis}
              onUpdateConsumivel={handleUpdateConsumivel}
              onSimularCelebracao={handleSimularCelebracao}
            />
          )}

          {/* MÓDULO EXCLUSIVO 3: INVENTÁRIO GERAL (TOALHAS, PARAMENTOS, VASOS, DECORAÇÃO) */}
          {(activeCategory === 'todas' ||
            ['toalhas', 'paramentos', 'vasos', 'decoracao'].includes(activeCategory)) && (
            <InventoryCard
              state={sacristiaState}
              activeCategoryFilter={activeCategory}
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
