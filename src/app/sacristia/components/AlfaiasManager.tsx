'use client';

import React, { useState } from 'react';
import { ItemAlfaia, AlfaiaEtapa } from '@/types/sacristia';
import {
  Droplets,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Plus,
  Info,
  RotateCcw,
  Sparkles,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';

interface AlfaiasManagerProps {
  alfaias: ItemAlfaia[];
  onUpdateAlfaia: (updatedItem: ItemAlfaia) => void;
  onAddAlfaia: (newItem: ItemAlfaia) => void;
}

const ETAPAS_INFO: Record<
  AlfaiaEtapa,
  { label: string; stepNumber: number; color: string; desc: string }
> = {
  uso: {
    label: 'Uso no Altar',
    stepNumber: 1,
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    desc: 'Item em uso na celebração ou preparado na credência',
  },
  agua1: {
    label: '1ª Água (Imersão)',
    stepNumber: 2,
    color: 'bg-blue-100 text-blue-900 border-blue-300',
    desc: '1ª lavagem ritual em água pura para absorver fragmentos da Eucaristia',
  },
  agua2: {
    label: '2ª Água (Purificação)',
    stepNumber: 3,
    color: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    desc: '2ª enxágue ritual em água sagrada',
  },
  agua3: {
    label: '3ª Água (Finalização)',
    stepNumber: 4,
    color: 'bg-sky-100 text-sky-900 border-sky-300',
    desc: '3ª e última imersão ritual. A água é descartada na terra ou piscinila.',
  },
  passar: {
    label: 'Passar & Dobrar',
    stepNumber: 5,
    color: 'bg-purple-100 text-purple-900 border-purple-300',
    desc: 'Secagem, engomagem e dobras rituais (Corporal em 9 quadrados)',
  },
  guardada: {
    label: 'Guardada / Pronta',
    stepNumber: 6,
    color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    desc: 'Armazenada limpa e pronta para o serviço do Altar',
  },
};

const ETAPAS_ORDER: AlfaiaEtapa[] = ['uso', 'agua1', 'agua2', 'agua3', 'passar', 'guardada'];

export const AlfaiasManager: React.FC<AlfaiasManagerProps> = ({
  alfaias,
  onUpdateAlfaia,
  onAddAlfaia,
}) => {
  const [filtroStatus, setFiltroStatus] = useState<string>('todas');
  const [busca, setBusca] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form State for new Alfaia
  const [novoNome, setNovoNome] = useState('');
  const [novoTipo, setNovoTipo] = useState<'Sanguíneo' | 'Corporal' | 'Pala' | 'Manustérgio'>('Sanguíneo');
  const [novaLocalizacao, setNovaLocalizacao] = useState('Gaveteiro A1 - Alfaias Prontas');
  const [novaObs, setNovaObs] = useState('');

  // Handle stage change
  const handleAvancarEtapa = (item: ItemAlfaia) => {
    const currentIndex = ETAPAS_ORDER.indexOf(item.etapaLavagem);
    if (currentIndex < ETAPAS_ORDER.length - 1) {
      const nextEtapa = ETAPAS_ORDER[currentIndex + 1];
      const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      onUpdateAlfaia({
        ...item,
        etapaLavagem: nextEtapa,
        ultimaAtualizacao: `Hoje, ${now}`,
      });
    }
  };

  const handleVoltarEtapa = (item: ItemAlfaia) => {
    const currentIndex = ETAPAS_ORDER.indexOf(item.etapaLavagem);
    if (currentIndex > 0) {
      const prevEtapa = ETAPAS_ORDER[currentIndex - 1];
      const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      onUpdateAlfaia({
        ...item,
        etapaLavagem: prevEtapa,
        ultimaAtualizacao: `Hoje, ${now}`,
      });
    }
  };

  const handleSetEtapa = (item: ItemAlfaia, etapa: AlfaiaEtapa) => {
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    onUpdateAlfaia({
      ...item,
      etapaLavagem: etapa,
      ultimaAtualizacao: `Hoje, ${now}`,
    });
  };

  const handleCriarItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome.trim()) return;

    const count = alfaias.length + 1;
    const codigo = `ALF-${String(count).padStart(3, '0')}`;
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const newItem: ItemAlfaia = {
      id: `alf-custom-${Date.now()}`,
      codigo,
      nome: novoNome.trim(),
      tipo: novoTipo,
      etapaLavagem: 'guardada',
      localizacao: novaLocalizacao,
      observacao: novaObs.trim() || undefined,
      ultimaAtualizacao: `Hoje, ${now}`,
    };

    onAddAlfaia(newItem);
    setNovoNome('');
    setNovaObs('');
    setShowAddModal(false);
  };

  // Filtered items
  const filteredItems = alfaias.filter((item) => {
    const matchBusca =
      item.nome.toLowerCase().includes(busca.toLowerCase()) ||
      item.codigo.toLowerCase().includes(busca.toLowerCase()) ||
      item.tipo.toLowerCase().includes(busca.toLowerCase());

    if (!matchBusca) return false;

    if (filtroStatus === 'uso') return item.etapaLavagem === 'uso';
    if (filtroStatus === 'lavagem')
      return ['agua1', 'agua2', 'agua3'].includes(item.etapaLavagem);
    if (filtroStatus === 'passar') return item.etapaLavagem === 'passar';
    if (filtroStatus === 'guardada') return item.etapaLavagem === 'guardada';

    return true;
  });

  return (
    <section className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-5 sm:p-6 shadow-[0_4px_18px_rgba(61,45,25,0.08)] space-y-6">
      
      {/* HEADER DO MÓDULO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5D8BE]/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#17243A] text-[#DDBB70] flex items-center justify-center font-bold shadow-xs flex-shrink-0">
            <Droplets className="w-5 h-5 text-[#DDBB70]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-serif text-[#17243A]">
                Gestão de Alfaias Litúrgicas
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                Fluxo Ritual das 3 Águas
              </span>
            </div>
            <p className="text-xs text-[#5F6B7A] mt-0.5">
              Sanguíneos, Corporais, Palas e Manustérgios. Purificação ritual obrigatória antes de ir para lavagem e passagem.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#17243A] to-[#223451] text-[#DDBB70] shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Nova Alfaia</span>
        </button>
      </div>

      {/* REGRA DE OURO - NOTA REVERENTE */}
      <div className="bg-[#FAF4E8] border-l-4 border-[#C69A3A] p-4 rounded-r-2xl text-xs space-y-1 text-[#5C4312]">
        <div className="font-bold text-[#9A6F20] uppercase tracking-wider flex items-center gap-1.5 font-serif text-[11px]">
          <Info className="w-4 h-4 text-[#9A6F20]" /> Regra Litúrgica Sacra — O Ritual das 3 Águas
        </div>
        <p className="leading-relaxed">
          As <strong>Alfaias Litúrgicas</strong> (especialmente Sanguíneos e Corporais) entram em contato direto com as espécies sagradas da Eucaristia. Por isso, <strong>antes de qualquer lavagem comum</strong>, devem ser imersas e enxaguadas em 3 águas puras sucessivas. Essa água contendo os fragmentos e gotas sagradas é despejada na terra (piscinila da Sacristia) e nunca no esgoto comum.
        </p>
      </div>

      {/* BARRA DE FILTROS & BUSCA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F8F4EC] p-3 rounded-2xl border border-[#E5D8BE]/70">
        {/* BUSCA */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#7A6843] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou código..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] placeholder-[#7A6843]/60 focus:outline-none focus:ring-2 focus:ring-[#C69A3A] font-medium"
          />
          {busca && (
            <button
              onClick={() => setBusca('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A6843]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* BADGES DE FILTRO */}
        <div className="flex items-center flex-wrap gap-1.5 w-full sm:w-auto justify-start sm:justify-end">
          {[
            { id: 'todas', label: 'Todas' },
            { id: 'uso', label: 'Em Uso' },
            { id: 'lavagem', label: 'Em 3 Águas' },
            { id: 'passar', label: 'Aguardando Passar' },
            { id: 'guardada', label: 'Prontas' },
          ].map((tab) => {
            const isSelected = filtroStatus === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFiltroStatus(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer min-h-[36px] ${
                  isSelected
                    ? 'bg-[#17243A] text-[#DDBB70] shadow-2xs font-bold'
                    : 'bg-white text-[#5F6B7A] hover:bg-[#F5EFE6] border border-[#E5D8BE]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* LISTA DE ALFAIAS COM WORKFLOW STEPPER */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-10 bg-[#F9F6F0] rounded-2xl border border-dashed border-[#E5D8BE] p-6 space-y-2">
            <Droplets className="w-8 h-8 text-[#7A6843]/50 mx-auto" />
            <p className="text-sm font-serif font-bold text-[#17243A]">
              Nenhuma alfaia encontrada para este filtro.
            </p>
            <p className="text-xs text-[#5F6B7A]">
              Tente redefinir a busca ou selecione "Todas".
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const etapaAtual = ETAPAS_INFO[item.etapaLavagem];
            const currentStepIdx = ETAPAS_ORDER.indexOf(item.etapaLavagem);

            return (
              <article
                key={item.id}
                className="bg-white border border-[#E5D8BE] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all space-y-4"
              >
                {/* TOPO DO CARD DA ALFAIA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#E5D8BE]/50 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#17243A] text-[#DDBB70] text-[10px] font-bold font-mono">
                        {item.codigo}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F5EFE6] text-[#7A6843] border border-[#E5D8BE] text-[11px] font-semibold">
                        {item.tipo}
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-serif text-[#17243A]">
                      {item.nome}
                    </h3>
                  </div>

                  {/* BADGE DA ETAPA ATUAL & AÇÕES DE ATALHO */}
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto justify-between sm:justify-end">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${etapaAtual.color}`}
                    >
                      Etapa {etapaAtual.stepNumber}/6: {etapaAtual.label}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleVoltarEtapa(item)}
                        disabled={currentStepIdx === 0}
                        title="Voltar Etapa"
                        className="p-2 rounded-xl border border-[#E5D8BE] text-[#17243A] hover:bg-[#F5EFE6] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAvancarEtapa(item)}
                        disabled={currentStepIdx === ETAPAS_ORDER.length - 1}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#17243A] to-[#223451] text-[#DDBB70] hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold cursor-pointer min-h-[40px]"
                      >
                        <span>Avançar Etapa</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* STEPPER VISUAL DO FLUXO RITUAL */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A6843] flex items-center justify-between">
                    <span>Progresso do Fluxo Ritual:</span>
                    <span className="text-[#17243A]">{etapaAtual.desc}</span>
                  </div>

                  {/* PROGRESS STEPPER BAR */}
                  <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                    {ETAPAS_ORDER.map((etapaKey, idx) => {
                      const stepInfo = ETAPAS_INFO[etapaKey];
                      const isCompleted = idx < currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <button
                          key={etapaKey}
                          type="button"
                          onClick={() => handleSetEtapa(item, etapaKey)}
                          title={`Mudar para: ${stepInfo.label}`}
                          className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                            isCurrent
                              ? 'bg-[#17243A] text-white border-[#DDBB70] ring-2 ring-[#DDBB70]/30 shadow-xs'
                              : isCompleted
                              ? 'bg-[#E8F5E9] text-[#1E5D3B] border-[#A7F3D0]'
                              : 'bg-[#F9F6F0] text-[#7A6843] border-[#E5D8BE] hover:bg-[#F5EFE6]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                                isCurrent
                                  ? 'bg-[#DDBB70] text-[#17243A]'
                                  : isCompleted
                                  ? 'bg-[#1E5D3B] text-white'
                                  : 'bg-[#E5D8BE] text-[#7A6843]'
                              }`}
                            >
                              {idx + 1}
                            </span>
                            {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5D3B]" />}
                          </div>

                          <span className="text-[10px] font-semibold truncate mt-1 block">
                            {stepInfo.label.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* INFORMAÇÕES DE LOCALIZAÇÃO E OBSERVAÇÕES */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#5F6B7A] bg-[#FAF7F0] p-3 rounded-xl border border-[#E5D8BE]/60 gap-2">
                  <div className="space-y-0.5">
                    <div>
                      <strong className="text-[#17243A]">Localização atual:</strong>{' '}
                      {item.localizacao}
                    </div>
                    {item.observacao && (
                      <div className="italic text-[#7A6843]">
                        "{item.observacao}"
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-medium text-[#7A6843]/80 whitespace-nowrap">
                    Atualizado: {item.ultimaAtualizacao}
                  </span>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* MODAL PARA CADASTRAR NOVA ALFAIA */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[#E5D8BE] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#17243A] text-[#DDBB70] flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-serif text-[#17243A]">
                  Cadastrar Nova Alfaia Litúrgica
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-[#7A6843] hover:bg-[#F5EFE6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCriarItem} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#17243A] uppercase tracking-wider">
                  Nome da Alfaia *
                </label>
                <input
                  type="text"
                  required
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  placeholder="Ex: Sanguíneo de Linho Festivo #05"
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#17243A] uppercase tracking-wider">
                    Tipo de Alfaia
                  </label>
                  <select
                    value={novoTipo}
                    onChange={(e: any) => setNovoTipo(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                  >
                    <option value="Sanguíneo">Sanguíneo</option>
                    <option value="Corporal">Corporal</option>
                    <option value="Pala">Pala</option>
                    <option value="Manustérgio">Manustérgio</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#17243A] uppercase tracking-wider">
                    Localização Inicial
                  </label>
                  <input
                    type="text"
                    value={novaLocalizacao}
                    onChange={(e) => setNovaLocalizacao(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#17243A] uppercase tracking-wider">
                  Observações / Detalhes Rituais
                </label>
                <textarea
                  rows={2}
                  value={novaObs}
                  onChange={(e) => setNovaObs(e.target.value)}
                  placeholder="Ex: Renda artesanal guipir, guardada na gaveta principal."
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5D8BE]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#7A6843] hover:bg-[#F5EFE6]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-bold bg-[#17243A] text-[#DDBB70] hover:bg-[#223451]"
                >
                  Salvar Alfaia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
