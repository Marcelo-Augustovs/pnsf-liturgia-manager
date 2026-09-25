'use client';

import React, { useState } from 'react';
import {
  SacristiaState,
  ItemToalha,
  ItemParamento,
  ItemVasoSagrado,
  ItemDecoracao,
} from '@/types/sacristia';
import {
  Layers,
  Sparkles,
  Shield,
  Image as ImageIcon,
  Search,
  Plus,
  X,
  CheckCircle2,
  Clock,
  Wrench,
  Droplets,
  Edit,
} from 'lucide-react';

interface InventoryCardProps {
  state: SacristiaState;
  activeCategoryFilter?: string;
  onUpdateToalha: (item: ItemToalha) => void;
  onUpdateParamento: (item: ItemParamento) => void;
  onUpdateVaso: (item: ItemVasoSagrado) => void;
  onUpdateDecoracao: (item: ItemDecoracao) => void;
  onAddItem: (category: 'toalhas' | 'paramentos' | 'vasos' | 'decoracao', item: any) => void;
}

type UnifiedInventoryItem = {
  id: string;
  codigo: string;
  nome: string;
  tipoItem: 'toalhas' | 'paramentos' | 'vasos' | 'decoracao';
  tipoSub: string;
  statusGeral: 'em_uso' | 'guardado' | 'lavagem' | 'manutencao';
  statusRotulo: string;
  localizacao: string;
  detalhesExtra?: string;
  observacao?: string;
  ultimaAtualizacao: string;
  originalData: any;
};

export const InventoryCard: React.FC<InventoryCardProps> = ({
  state,
  activeCategoryFilter = 'todos',
  onUpdateToalha,
  onUpdateParamento,
  onUpdateVaso,
  onUpdateDecoracao,
  onAddItem,
}) => {
  const [categoriaAba, setCategoriaAba] = useState<string>(
    ['toalhas', 'paramentos', 'vasos', 'decoracao'].includes(activeCategoryFilter)
      ? activeCategoryFilter
      : 'todos'
  );
  const [statusFiltro, setStatusFiltro] = useState<string>('todos');
  const [busca, setBusca] = useState<string>('');

  // Modal State for New Inventory Item
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [novoTipoCat, setNovoTipoCat] = useState<'toalhas' | 'paramentos' | 'vasos' | 'decoracao'>('vasos');
  const [novoNome, setNovoNome] = useState('');
  const [novoSubtipo, setNovoSubtipo] = useState('');
  const [novaLocalizacao, setNovaLocalizacao] = useState('');
  const [novaObs, setNovaObs] = useState('');
  const [detalheEspecial, setDetalheEspecial] = useState('');

  // Build unified inventory list
  const unifiedList: UnifiedInventoryItem[] = [
    // Toalhas
    ...state.toalhas.map((t) => ({
      id: t.id,
      codigo: t.codigo,
      nome: t.nome,
      tipoItem: 'toalhas' as const,
      tipoSub: t.tipo,
      statusGeral:
        t.status === 'em_uso'
          ? ('em_uso' as const)
          : t.status === 'guardada'
          ? ('guardado' as const)
          : t.status === 'em_manutencao'
          ? ('manutencao' as const)
          : ('lavagem' as const),
      statusRotulo:
        t.status === 'em_uso'
          ? 'Em Uso no Altar'
          : t.status === 'guardada'
          ? 'Guardada'
          : t.status === 'aguardando_lavagem'
          ? 'Aguardando Lavagem'
          : t.status === 'passar'
          ? 'Passar'
          : 'Em Manutenção',
      localizacao: t.localizacao,
      detalhesExtra: t.corLiturgica ? `Cor: ${t.corLiturgica}` : undefined,
      observacao: t.observacao,
      ultimaAtualizacao: t.ultimaAtualizacao,
      originalData: t,
    })),

    // Paramentos
    ...state.paramentos.map((p) => ({
      id: p.id,
      codigo: p.codigo,
      nome: p.nome,
      tipoItem: 'paramentos' as const,
      tipoSub: p.tipo,
      statusGeral:
        p.status === 'em_uso'
          ? ('em_uso' as const)
          : p.status === 'guardado'
          ? ('guardado' as const)
          : p.status === 'em_manutencao'
          ? ('manutencao' as const)
          : ('lavagem' as const),
      statusRotulo:
        p.status === 'em_uso'
          ? 'Em Uso'
          : p.status === 'guardado'
          ? 'Guardado'
          : p.status === 'lavanderia'
          ? 'Na Lavanderia'
          : 'Em Manutenção',
      localizacao: p.localizacao,
      detalhesExtra: `Cor Litúrgica: ${p.corLiturgica}`,
      observacao: p.observacao,
      ultimaAtualizacao: p.ultimaAtualizacao,
      originalData: p,
    })),

    // Vasos Sagrados
    ...state.vasos.map((v) => ({
      id: v.id,
      codigo: v.codigo,
      nome: v.nome,
      tipoItem: 'vasos' as const,
      tipoSub: v.tipo,
      statusGeral:
        v.status === 'em_uso'
          ? ('em_uso' as const)
          : v.status === 'guardado'
          ? ('guardado' as const)
          : v.status === 'em_manutencao'
          ? ('manutencao' as const)
          : ('lavagem' as const),
      statusRotulo:
        v.status === 'em_uso'
          ? 'Em Uso no Altar/Sacrário'
          : v.status === 'guardado'
          ? 'Guardado no Cofre'
          : v.status === 'higienizacao'
          ? 'Em Higienização'
          : 'Em Manutenção',
      localizacao: v.localizacao,
      detalhesExtra: `Material: ${v.material}`,
      observacao: v.observacao,
      ultimaAtualizacao: v.ultimaAtualizacao,
      originalData: v,
    })),

    // Decoração
    ...state.decoracoes.map((d) => ({
      id: d.id,
      codigo: d.codigo,
      nome: d.nome,
      tipoItem: 'decoracao' as const,
      tipoSub: d.tipo,
      statusGeral:
        d.status === 'em_uso'
          ? ('em_uso' as const)
          : d.status === 'guardado'
          ? ('guardado' as const)
          : ('manutencao' as const),
      statusRotulo:
        d.status === 'em_uso'
          ? 'Em Uso na Igreja'
          : d.status === 'guardado'
          ? 'Guardado no Depósito'
          : 'Em Manutenção',
      localizacao: d.localizacao,
      observacao: d.observacao,
      ultimaAtualizacao: d.ultimaAtualizacao,
      originalData: d,
    })),
  ];

  // Toggle item status
  const handleToggleStatus = (item: UnifiedInventoryItem) => {
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    if (item.tipoItem === 'toalhas') {
      const orig = item.originalData as ItemToalha;
      const nextStatus =
        orig.status === 'em_uso'
          ? 'guardada'
          : orig.status === 'guardada'
          ? 'aguardando_lavagem'
          : 'em_uso';
      onUpdateToalha({
        ...orig,
        status: nextStatus,
        ultimaAtualizacao: `Hoje, ${now}`,
      });
    } else if (item.tipoItem === 'paramentos') {
      const orig = item.originalData as ItemParamento;
      const nextStatus = orig.status === 'em_uso' ? 'guardado' : 'em_uso';
      onUpdateParamento({
        ...orig,
        status: nextStatus,
        ultimaAtualizacao: `Hoje, ${now}`,
      });
    } else if (item.tipoItem === 'vasos') {
      const orig = item.originalData as ItemVasoSagrado;
      const nextStatus = orig.status === 'em_uso' ? 'guardado' : 'em_uso';
      onUpdateVaso({
        ...orig,
        status: nextStatus,
        ultimaAtualizacao: `Hoje, ${now}`,
      });
    } else if (item.tipoItem === 'decoracao') {
      const orig = item.originalData as ItemDecoracao;
      const nextStatus = orig.status === 'em_uso' ? 'guardado' : 'em_uso';
      onUpdateDecoracao({
        ...orig,
        status: nextStatus,
        ultimaAtualizacao: `Hoje, ${now}`,
      });
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome.trim()) return;

    const count = unifiedList.filter((i) => i.tipoItem === novoTipoCat).length + 1;
    const prefix =
      novoTipoCat === 'toalhas'
        ? 'TOA'
        : novoTipoCat === 'paramentos'
        ? 'PAR'
        : novoTipoCat === 'vasos'
        ? 'VAS'
        : 'DEC';
    const codigo = `${prefix}-${String(count).padStart(3, '0')}`;
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    if (novoTipoCat === 'toalhas') {
      const newItem: ItemToalha = {
        id: `toa-${Date.now()}`,
        codigo,
        nome: novoNome.trim(),
        tipo: (novoSubtipo as any) || 'Toalhas do Altar',
        status: 'guardada',
        corLiturgica: detalheEspecial || 'Branco',
        localizacao: novaLocalizacao || 'Armário de Têxteis B1',
        observacao: novaObs || undefined,
        ultimaAtualizacao: `Hoje, ${now}`,
      };
      onAddItem('toalhas', newItem);
    } else if (novoTipoCat === 'paramentos') {
      const newItem: ItemParamento = {
        id: `par-${Date.now()}`,
        codigo,
        nome: novoNome.trim(),
        tipo: (novoSubtipo as any) || 'Casula',
        corLiturgica: (detalheEspecial as any) || 'Branco',
        status: 'guardado',
        localizacao: novaLocalizacao || 'Armário C1',
        observacao: novaObs || undefined,
        ultimaAtualizacao: `Hoje, ${now}`,
      };
      onAddItem('paramentos', newItem);
    } else if (novoTipoCat === 'vasos') {
      const newItem: ItemVasoSagrado = {
        id: `vas-${Date.now()}`,
        codigo,
        nome: novoNome.trim(),
        tipo: (novoSubtipo as any) || 'Cálice',
        material: detalheEspecial || 'Latão Dourado',
        status: 'guardado',
        localizacao: novaLocalizacao || 'Cofre da Sacristia',
        observacao: novaObs || undefined,
        ultimaAtualizacao: `Hoje, ${now}`,
      };
      onAddItem('vasos', newItem);
    } else {
      const newItem: ItemDecoracao = {
        id: `dec-${Date.now()}`,
        codigo,
        nome: novoNome.trim(),
        tipo: (novoSubtipo as any) || 'Castiçal',
        status: 'guardado',
        localizacao: novaLocalizacao || 'Depósito Principal',
        observacao: novaObs || undefined,
        ultimaAtualizacao: `Hoje, ${now}`,
      };
      onAddItem('decoracao', newItem);
    }

    setNovoNome('');
    setNovoSubtipo('');
    setNovaLocalizacao('');
    setNovaObs('');
    setDetalheEspecial('');
    setShowAddModal(false);
  };

  // Filtering
  const filteredList = unifiedList.filter((item) => {
    // Category filter
    if (categoriaAba !== 'todos' && item.tipoItem !== categoriaAba) return false;

    // Status filter
    if (statusFiltro !== 'todos' && item.statusGeral !== statusFiltro) return false;

    // Search query
    if (busca.trim()) {
      const q = busca.toLowerCase();
      const match =
        item.nome.toLowerCase().includes(q) ||
        item.codigo.toLowerCase().includes(q) ||
        item.tipoSub.toLowerCase().includes(q) ||
        item.localizacao.toLowerCase().includes(q) ||
        (item.detalhesExtra && item.detalhesExtra.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  return (
    <section className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-5 sm:p-6 shadow-[0_4px_18px_rgba(61,45,25,0.08)] space-y-6">
      {/* CABEÇALHO E AÇÃO ADICIONAR ITEM */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5D8BE]/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#17243A] text-[#DDBB70] flex items-center justify-center font-bold shadow-xs flex-shrink-0">
            <Layers className="w-5 h-5 text-[#DDBB70]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-serif text-[#17243A]">
                Estoque & Inventário Geral
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5EFE6] text-[#7A6843] border border-[#E5D8BE]">
                Toalhas, Paramentos, Vasos e Objetos
              </span>
            </div>
            <p className="text-xs text-[#5F6B7A] mt-0.5">
              Gestão de localização, estado de conservação e higienização das peças sagradas da Matriz.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#17243A] to-[#223451] text-[#DDBB70] shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Item no Inventário</span>
        </button>
      </div>

      {/* FILTROS POR CATEGORIA E STATUS */}
      <div className="space-y-3 bg-[#F8F4EC] p-3.5 rounded-2xl border border-[#E5D8BE]/70">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* BUSCA */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#7A6843] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome, código, local..."
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

          {/* FILTRO STATUS */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'todos', label: 'Todos os Status' },
              { id: 'em_uso', label: 'Em Uso' },
              { id: 'guardado', label: 'Guardados' },
              { id: 'lavagem', label: 'Lavagem/Higienização' },
              { id: 'manutencao', label: 'Manutenção' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStatusFiltro(st.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[36px] ${
                  statusFiltro === st.id
                    ? 'bg-[#17243A] text-[#DDBB70] shadow-2xs font-bold'
                    : 'bg-white text-[#5F6B7A] hover:bg-[#F5EFE6] border border-[#E5D8BE]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* CATEGORIAS ABAS */}
        <div className="flex items-center gap-2 border-t border-[#E5D8BE]/50 pt-2 overflow-x-auto">
          {[
            { id: 'todos', label: 'Todas as Peças', count: unifiedList.length },
            { id: 'toalhas', label: 'Toalhas & Têxteis', count: state.toalhas.length },
            { id: 'paramentos', label: 'Paramentos', count: state.paramentos.length },
            { id: 'vasos', label: 'Vasos Sagrados', count: state.vasos.length },
            { id: 'decoracao', label: 'Decoração & Objetos', count: state.decoracoes.length },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoriaAba(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                categoriaAba === cat.id
                  ? 'bg-[#DDBB70] text-[#17243A] shadow-2xs'
                  : 'bg-white/60 hover:bg-white text-[#7A6843] border border-transparent'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  categoriaAba === cat.id
                    ? 'bg-[#17243A] text-[#DDBB70]'
                    : 'bg-[#E5D8BE] text-[#7A6843]'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* TABELA / GRID DO INVENTÁRIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredList.length === 0 ? (
          <div className="col-span-2 text-center py-10 bg-[#F9F6F0] rounded-2xl border border-dashed border-[#E5D8BE] p-6 space-y-2">
            <Layers className="w-8 h-8 text-[#7A6843]/50 mx-auto" />
            <p className="text-sm font-serif font-bold text-[#17243A]">
              Nenhum item encontrado no inventário.
            </p>
            <p className="text-xs text-[#5F6B7A]">
              Tente redefinir os filtros de busca ou categoria.
            </p>
          </div>
        ) : (
          filteredList.map((item) => {
            // Status badge styling
            let statusBadge = (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E8F5E9] text-[#1E5D3B] border border-[#A7F3D0]">
                {item.statusRotulo}
              </span>
            );

            if (item.statusGeral === 'guardado') {
              statusBadge = (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                  {item.statusRotulo}
                </span>
              );
            } else if (item.statusGeral === 'lavagem') {
              statusBadge = (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F5EEFB] text-[#7C3AED] border border-[#E9D5FF]">
                  {item.statusRotulo}
                </span>
              );
            } else if (item.statusGeral === 'manutencao') {
              statusBadge = (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFF7ED] text-[#C2410C] border border-[#FFD8A8]">
                  {item.statusRotulo}
                </span>
              );
            }

            return (
              <article
                key={item.id}
                className="bg-white border border-[#E5D8BE] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#17243A] text-[#DDBB70] text-[10px] font-bold font-mono">
                          {item.codigo}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#F5EFE6] text-[#7A6843] text-[10px] font-semibold">
                          {item.tipoSub}
                        </span>
                      </div>
                      <h3 className="text-base font-bold font-serif text-[#17243A]">
                        {item.nome}
                      </h3>
                    </div>

                    {statusBadge}
                  </div>

                  {item.detalhesExtra && (
                    <p className="text-xs font-semibold text-[#9A6F20]">
                      {item.detalhesExtra}
                    </p>
                  )}

                  <div className="text-xs text-[#5F6B7A] space-y-1 bg-[#FAF7F0] p-2.5 rounded-xl border border-[#E5D8BE]/60">
                    <div>
                      <strong className="text-[#17243A]">Localização:</strong>{' '}
                      {item.localizacao}
                    </div>
                    {item.observacao && (
                      <div className="italic text-[#7A6843]">
                        "{item.observacao}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5D8BE]/50 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#7A6843]">
                    Atualizado: {item.ultimaAtualizacao}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleStatus(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5EFE6] hover:bg-[#EEDBB5] text-[#17243A] font-semibold border border-[#E5D8BE] transition-all cursor-pointer min-h-[36px]"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#9A6F20]" />
                    <span>Alternar Status</span>
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* MODAL CADASTRAR ITEM NO INVENTÁRIO */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[#E5D8BE] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#17243A] text-[#DDBB70] flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-serif text-[#17243A]">
                  Cadastrar Peça no Inventário
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

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#17243A] uppercase tracking-wider">
                  Categoria da Peça *
                </label>
                <select
                  value={novoTipoCat}
                  onChange={(e: any) => setNovoTipoCat(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                >
                  <option value="vasos">Vasos Sagrados (Cálices, Patenas, Ostensórios)</option>
                  <option value="toalhas">Toalhas e Têxteis do Altar</option>
                  <option value="paramentos">Véus e Casulas / Paramentos</option>
                  <option value="decoracao">Sacristia & Objetos de Decoração</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#17243A] uppercase tracking-wider">
                  Nome da Peça / Objeto *
                </label>
                <input
                  type="text"
                  required
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  placeholder="Ex: Cálice Prata Trabalhado Solene"
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#17243A] uppercase tracking-wider">
                    Subtipo
                  </label>
                  <input
                    type="text"
                    value={novoSubtipo}
                    onChange={(e) => setNovoSubtipo(e.target.value)}
                    placeholder="Ex: Cálice / Casula / Tapete"
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#17243A] uppercase tracking-wider">
                    Cor / Material / Detalhes
                  </label>
                  <input
                    type="text"
                    value={detalheEspecial}
                    onChange={(e) => setDetalheEspecial(e.target.value)}
                    placeholder="Ex: Ouro 24k / Roxo / Linho"
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#17243A] uppercase tracking-wider">
                  Localização na Sacristia / Igreja
                </label>
                <input
                  type="text"
                  value={novaLocalizacao}
                  onChange={(e) => setNovaLocalizacao(e.target.value)}
                  placeholder="Ex: Cofre Principal / Armário B2 / Presbitério"
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#17243A] uppercase tracking-wider">
                  Observações
                </label>
                <textarea
                  rows={2}
                  value={novaObs}
                  onChange={(e) => setNovaObs(e.target.value)}
                  placeholder="Ex: Usar apenas em Solenidades Grandes."
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
                  Salvar Peça
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
