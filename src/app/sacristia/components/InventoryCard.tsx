'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  SacristiaState,
  ItemToalha,
  ItemParamento,
  ItemVasoSagrado,
  ItemDecoracao,
  ItemInventario,
  ModuloSacristia,
} from '@/types/sacristia';
import { DetalhesItemModal } from './DetalhesItemModal';
import {
  Layers,
  Sparkles,
  Shield,
  Image as ImageIcon,
  Search,
  Plus,
  X,
  Eye,
  MapPin,
  Clock,
  Package,
  ChevronRight,
} from 'lucide-react';

type StatusGeral = 'em_uso' | 'guardado' | 'lavagem' | 'manutencao';

// ─── Definição canônica dos módulos (futura fonte: GET /modulos) ──────────────
const MODULOS: ModuloSacristia[] = [
  {
    id: 'toalhas',
    nome: '2. Toalhas & Têxteis do Altar',
    chipSubtitulo: 'Toalhas, Conopéus, Pálios',
    descricao: 'Têxteis litúrgicos do altar, sacrário e comunhão. Controle de lavagem e conservação.',
    subcategorias: ['Toalhas do Altar', 'Toalhas do Santíssimo', 'Toalhas da Comunhão', 'Pálio/Conopéu'],
  },
  {
    id: 'paramentos',
    nome: '3. Véus e Casulas / Paramentos',
    chipSubtitulo: 'Casulas, Alvas, Estolas, Véus',
    descricao: 'Paramentos litúrgicos e vestimentas sagradas. Organização por cor litúrgica e estado.',
    subcategorias: ['Casula', 'Véu de Cálice', 'Alva', 'Estola', 'Capa de Asperges'],
  },
  {
    id: 'vasos',
    nome: '4. Vasos Sagrados',
    chipSubtitulo: 'Cálices, Patenas, Âmbulas, Galhetas, Custódia, Teca',
    descricao: 'Vasos e utensílios sagrados do altar. Controle de uso, guarda e higienização.',
    subcategorias: ['Cálice', 'Patena', 'Âmbula (Cibório)', 'Galhetas', 'Custódia/Ostensório', 'Teca'],
  },
  {
    id: 'decoracao',
    nome: '6. Sacristia & Objetos',
    chipSubtitulo: 'Tapetes, Suportes, Bancaquinos, Quadros, Imagens',
    descricao: 'Itens utilizados na sacristia e no espaço litúrgico. Mantenha tudo organizado e em bom estado.',
    subcategorias: ['Tapete', 'Suporte', 'Banquinho', 'Quadro Sacro', 'Imagem Sacra', 'Castiçal'],
  },
];

// ─── Ícones e placeholders por categoria ─────────────────────────────────────
function getModuloIcon(moduloId: string): React.ReactNode {
  switch (moduloId) {
    case 'toalhas':    return <Layers className="w-5 h-5" />;
    case 'paramentos': return <Shield className="w-5 h-5" />;
    case 'vasos':      return <Sparkles className="w-5 h-5" />;
    case 'decoracao':  return <ImageIcon className="w-5 h-5" />;
    default:           return <Package className="w-5 h-5" />;
  }
}

function PlaceholderCard({ tipoItem, tipoSub }: { tipoItem: string; tipoSub: string }) {
  const icons: Record<string, React.ReactNode> = {
    toalhas:    <Layers className="w-8 h-8 text-[#7C3AED]/40" />,
    paramentos: <Shield className="w-8 h-8 text-[#D97706]/40" />,
    vasos:      <Sparkles className="w-8 h-8 text-[#B58A2A]/40" />,
    decoracao:  <ImageIcon className="w-8 h-8 text-[#4B5563]/40" />,
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-[#F8F4EC] rounded-xl">
      {icons[tipoItem] ?? <Package className="w-8 h-8 text-[#7A6843]/30" />}
      <span className="text-[9px] font-semibold text-[#7A6843]/50 uppercase tracking-wider text-center px-2 leading-tight">
        {tipoSub}
      </span>
    </div>
  );
}

// ─── Interfaces do componente ─────────────────────────────────────────────────
interface InventoryCardProps {
  state: SacristiaState;
  /** Categoria/módulo ativo vindo do CategoriesGrid (ex: 'vasos', 'decoracao', 'todos') */
  activeCategoryFilter?: string;
  onUpdateToalha: (item: ItemToalha) => void;
  onUpdateParamento: (item: ItemParamento) => void;
  onUpdateVaso: (item: ItemVasoSagrado) => void;
  onUpdateDecoracao: (item: ItemDecoracao) => void;
  onAddItem: (category: 'toalhas' | 'paramentos' | 'vasos' | 'decoracao', item: any) => void;
}

export const InventoryCard: React.FC<InventoryCardProps> = ({
  state,
  activeCategoryFilter = 'todos',
  onUpdateToalha,
  onUpdateParamento,
  onUpdateVaso,
  onUpdateDecoracao,
  onAddItem,
}) => {
  // ─── Estado centralizado ────────────────────────────────────────────────────
  const modulosIds: string[] = MODULOS.map(m => m.id as string);
  const [moduloSelecionado, setModuloSelecionado] = useState<string>(() => {
    return modulosIds.includes(activeCategoryFilter) ? activeCategoryFilter : 'todos';
  });
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState<string>('todos');
  const [statusSelecionado, setStatusSelecionado] = useState<string>('todos');
  const [termoBusca, setTermoBusca] = useState<string>('');
  // ─── Modal de detalhes ──────────────────────────────────────────────────────
  const [itemSelecionado, setItemSelecionado] = useState<ItemInventario | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form modal
  const [novoTipoCat, setNovoTipoCat] = useState<'toalhas' | 'paramentos' | 'vasos' | 'decoracao'>('vasos');
  const [novoNome, setNovoNome] = useState('');
  const [novoSubtipo, setNovoSubtipo] = useState('');
  const [novaLocalizacao, setNovaLocalizacao] = useState('');
  const [novaObs, setNovaObs] = useState('');
  const [detalheEspecial, setDetalheEspecial] = useState('');

  // ─── Sync módulo quando o prop externo muda ─────────────────────────────────
  useEffect(() => {
    const validos: string[] = MODULOS.map(m => m.id as string);
    const novoModulo = validos.includes(activeCategoryFilter) ? activeCategoryFilter : 'todos';
    if (novoModulo !== moduloSelecionado) {
      setModuloSelecionado(novoModulo);
      setSubcategoriaSelecionada('todos');
    }
  }, [activeCategoryFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  // Quando módulo muda internamente, reseta subcategoria
  const handleModuloChange = (id: string) => {
    setModuloSelecionado(id);
    setSubcategoriaSelecionada('todos');
    setStatusSelecionado('todos');
    setTermoBusca('');
  };

  // ─── Módulo ativo (ou null se 'todos') ─────────────────────────────────────
  const moduloAtivo = useMemo(
    () => MODULOS.find(m => m.id === moduloSelecionado) ?? null,
    [moduloSelecionado]
  );

  // ─── Lista unificada de itens do inventário ──────────────────────────────────
  const unifiedList: ItemInventario[] = useMemo(() => {
    const items: ItemInventario[] = [];

    // Toalhas
    state.toalhas.forEach(t => {
      const orig = t as any;
      items.push({
        id: t.id,
        codigo: t.codigo,
        nome: t.nome,
        moduloId: 'toalhas',
        categoriaNome: t.tipo,
        statusGeral:
          t.status === 'em_uso' ? 'em_uso'
          : t.status === 'guardada' ? 'guardado'
          : t.status === 'em_manutencao' ? 'manutencao'
          : 'lavagem',
        statusRotulo:
          t.status === 'em_uso' ? 'Em Uso no Altar'
          : t.status === 'guardada' ? 'Guardada'
          : t.status === 'aguardando_lavagem' ? 'Aguardando Lavagem'
          : t.status === 'passar' ? 'Passando'
          : 'Em Manutenção',
        localizacao: t.localizacao,
        imagem: t.imagem,
        detalhesExtra: t.corLiturgica ? `Cor: ${t.corLiturgica}` : undefined,
        observacao: t.observacao,
        ultimaAtualizacao: t.ultimaAtualizacao,
        originalData: t,
        descricao: orig.descricao,
        historia: orig.historia,
        simbolismoLiturgico: orig.simbolismoLiturgico,
        codigoPatrimonial: orig.codigoPatrimonial,
        dataAquisicao: orig.dataAquisicao,
        responsavel: orig.responsavel,
      });
    });

    // Paramentos
    state.paramentos.forEach(p => {
      const orig = p as any;
      items.push({
        id: p.id,
        codigo: p.codigo,
        nome: p.nome,
        moduloId: 'paramentos',
        categoriaNome: p.tipo,
        statusGeral:
          p.status === 'em_uso' ? 'em_uso'
          : p.status === 'guardado' ? 'guardado'
          : p.status === 'em_manutencao' ? 'manutencao'
          : 'lavagem',
        statusRotulo:
          p.status === 'em_uso' ? 'Em Uso'
          : p.status === 'guardado' ? 'Guardado'
          : p.status === 'lavanderia' ? 'Na Lavanderia'
          : 'Em Manutenção',
        localizacao: p.localizacao,
        imagem: p.imagem,
        detalhesExtra: `Cor Litúrgica: ${p.corLiturgica}`,
        observacao: p.observacao,
        ultimaAtualizacao: p.ultimaAtualizacao,
        originalData: p,
        descricao: orig.descricao,
        historia: orig.historia,
        simbolismoLiturgico: orig.simbolismoLiturgico,
        codigoPatrimonial: orig.codigoPatrimonial,
        dataAquisicao: orig.dataAquisicao,
        responsavel: orig.responsavel,
      });
    });

    // Vasos Sagrados
    state.vasos.forEach(v => {
      const orig = v as any;
      items.push({
        id: v.id,
        codigo: v.codigo,
        nome: v.nome,
        moduloId: 'vasos',
        categoriaNome: v.tipo,
        statusGeral:
          v.status === 'em_uso' ? 'em_uso'
          : v.status === 'guardado' ? 'guardado'
          : v.status === 'em_manutencao' ? 'manutencao'
          : 'lavagem',
        statusRotulo:
          v.status === 'em_uso' ? 'Em Uso no Altar/Sacrário'
          : v.status === 'guardado' ? 'Guardado no Cofre'
          : v.status === 'higienizacao' ? 'Em Higienização'
          : 'Em Manutenção',
        localizacao: v.localizacao,
        imagem: v.imagem,
        detalhesExtra: `Material: ${v.material}`,
        material: v.material,
        observacao: v.observacao,
        ultimaAtualizacao: v.ultimaAtualizacao,
        originalData: v,
        // campos opcionais ricos
        descricao: orig.descricao,
        historia: orig.historia,
        simbolismoLiturgico: orig.simbolismoLiturgico,
        codigoPatrimonial: orig.codigoPatrimonial,
        dataAquisicao: orig.dataAquisicao,
        responsavel: orig.responsavel,
      });
    });

    // Decoração & Objetos
    state.decoracoes.forEach(d => {
      const orig = d as any;
      items.push({
        id: d.id,
        codigo: d.codigo,
        nome: d.nome,
        moduloId: 'decoracao',
        categoriaNome: d.tipo,
        statusGeral:
          d.status === 'em_uso' ? 'em_uso'
          : d.status === 'guardado' ? 'guardado'
          : 'manutencao',
        statusRotulo:
          d.status === 'em_uso' ? 'Em Uso na Igreja'
          : d.status === 'guardado' ? 'Guardado'
          : 'Em Manutenção',
        localizacao: d.localizacao,
        imagem: d.imagem,
        observacao: d.observacao,
        ultimaAtualizacao: d.ultimaAtualizacao,
        originalData: d,
        descricao: orig.descricao,
        historia: orig.historia,
        simbolismoLiturgico: orig.simbolismoLiturgico,
        codigoPatrimonial: orig.codigoPatrimonial,
        dataAquisicao: orig.dataAquisicao,
        responsavel: orig.responsavel,
      });
    });

    return items;
  }, [state]);

  // ─── Filtragem em cadeia: Módulo → Subcategoria → Status → Busca ────────────
  const filteredList = useMemo(() => {
    return unifiedList.filter(item => {
      // 1. Filtro de módulo
      if (moduloSelecionado !== 'todos' && item.moduloId !== moduloSelecionado) return false;

      // 2. Filtro de subcategoria (dentro do módulo)
      if (subcategoriaSelecionada !== 'todos' && item.categoriaNome !== subcategoriaSelecionada) return false;

      // 3. Filtro de status
      if (statusSelecionado !== 'todos' && item.statusGeral !== statusSelecionado) return false;

      // 4. Busca textual
      if (termoBusca.trim()) {
        const q = termoBusca.toLowerCase();
        const match =
          item.nome.toLowerCase().includes(q) ||
          item.codigo.toLowerCase().includes(q) ||
          item.categoriaNome.toLowerCase().includes(q) ||
          item.localizacao.toLowerCase().includes(q) ||
          (item.detalhesExtra?.toLowerCase().includes(q) ?? false);
        if (!match) return false;
      }

      return true;
    });
  }, [unifiedList, moduloSelecionado, subcategoriaSelecionada, statusSelecionado, termoBusca]);

  // ─── Contadores dinâmicos ────────────────────────────────────────────────────
  const countPorModulo = useMemo(() => {
    const base = moduloSelecionado === 'todos' ? unifiedList : unifiedList.filter(i => i.moduloId === moduloSelecionado);
    return {
      total:     base.length,
      em_uso:    base.filter(i => i.statusGeral === 'em_uso').length,
      guardado:  base.filter(i => i.statusGeral === 'guardado').length,
      lavagem:   base.filter(i => i.statusGeral === 'lavagem').length,
      manutencao: base.filter(i => i.statusGeral === 'manutencao').length,
    };
  }, [unifiedList, moduloSelecionado]);

  // Chips de subcategoria: derivadas do módulo ativo (não hardcoded)
  const subcategoriaChips = useMemo(() => {
    if (!moduloAtivo) {
      // Para 'todos', mostrar todos os módulos como chips
      return MODULOS.map(m => ({ id: m.id, label: m.nome.replace(/^\d+\. /, ''), count: unifiedList.filter(i => i.moduloId === m.id).length }));
    }
    return moduloAtivo.subcategorias.map(sub => ({
      id: sub,
      label: sub,
      count: unifiedList.filter(i => i.moduloId === moduloSelecionado && i.categoriaNome === sub).length,
    }));
  }, [moduloAtivo, unifiedList, moduloSelecionado]);

  // ─── Status helpers ──────────────────────────────────────────────────────────
  function renderStatusBadge(item: ItemInventario) {
    const map: Record<string, string> = {
      em_uso:    'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]',
      guardado:  'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
      lavagem:   'bg-[#F5EEFB] text-[#7C3AED] border-[#E9D5FF]',
      manutencao: 'bg-[#FFF7ED] text-[#C2410C] border-[#FFD8A8]',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap ${map[item.statusGeral] ?? ''}`}>
        {item.statusRotulo}
      </span>
    );
  }

  // ─── Alternar status (toggle rápido — mantido para compatibilidade) ──────────
  function handleToggleStatus(item: ItemInventario) {
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    if (item.moduloId === 'toalhas') {
      const orig = item.originalData as ItemToalha;
      const nextStatus = orig.status === 'em_uso' ? 'guardada' : orig.status === 'guardada' ? 'aguardando_lavagem' : 'em_uso';
      onUpdateToalha({ ...orig, status: nextStatus, ultimaAtualizacao: `Hoje, ${now}` });
    } else if (item.moduloId === 'paramentos') {
      const orig = item.originalData as ItemParamento;
      onUpdateParamento({ ...orig, status: orig.status === 'em_uso' ? 'guardado' : 'em_uso', ultimaAtualizacao: `Hoje, ${now}` });
    } else if (item.moduloId === 'vasos') {
      const orig = item.originalData as ItemVasoSagrado;
      onUpdateVaso({ ...orig, status: orig.status === 'em_uso' ? 'guardado' : 'em_uso', ultimaAtualizacao: `Hoje, ${now}` });
    } else if (item.moduloId === 'decoracao') {
      const orig = item.originalData as ItemDecoracao;
      onUpdateDecoracao({ ...orig, status: orig.status === 'em_uso' ? 'guardado' : 'em_uso', ultimaAtualizacao: `Hoje, ${now}` });
    }
  }

  // ─── Salvar novo status vindo do modal ───────────────────────────────────────
  function handleSaveStatus(item: ItemInventario, novoStatus: StatusGeral) {
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const atualizado = `Hoje, ${now}`;

    if (item.moduloId === 'toalhas') {
      const orig = item.originalData as ItemToalha;
      const statusMap: Record<StatusGeral, ItemToalha['status']> = {
        em_uso: 'em_uso', guardado: 'guardada', lavagem: 'aguardando_lavagem', manutencao: 'em_manutencao',
      };
      onUpdateToalha({ ...orig, status: statusMap[novoStatus], ultimaAtualizacao: atualizado });
    } else if (item.moduloId === 'paramentos') {
      const orig = item.originalData as ItemParamento;
      const statusMap: Record<StatusGeral, ItemParamento['status']> = {
        em_uso: 'em_uso', guardado: 'guardado', lavagem: 'lavanderia', manutencao: 'em_manutencao',
      };
      onUpdateParamento({ ...orig, status: statusMap[novoStatus], ultimaAtualizacao: atualizado });
    } else if (item.moduloId === 'vasos') {
      const orig = item.originalData as ItemVasoSagrado;
      const statusMap: Record<StatusGeral, ItemVasoSagrado['status']> = {
        em_uso: 'em_uso', guardado: 'guardado', lavagem: 'higienizacao', manutencao: 'em_manutencao',
      };
      onUpdateVaso({ ...orig, status: statusMap[novoStatus], ultimaAtualizacao: atualizado });
    } else if (item.moduloId === 'decoracao') {
      const orig = item.originalData as ItemDecoracao;
      const statusMap: Record<StatusGeral, ItemDecoracao['status']> = {
        em_uso: 'em_uso', guardado: 'guardado', lavagem: 'guardado', manutencao: 'em_manutencao',
      };
      onUpdateDecoracao({ ...orig, status: statusMap[novoStatus], ultimaAtualizacao: atualizado });
    }
  }

  // ─── Adicionar novo item ─────────────────────────────────────────────────────
  function handleCreateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!novoNome.trim()) return;

    const count = unifiedList.filter(i => i.moduloId === novoTipoCat).length + 1;
    const prefix = { toalhas: 'TOA', paramentos: 'PAR', vasos: 'VAS', decoracao: 'DEC' }[novoTipoCat];
    const codigo = `${prefix}-${String(count).padStart(3, '0')}`;
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    if (novoTipoCat === 'toalhas') {
      onAddItem('toalhas', {
        id: `toa-${Date.now()}`, codigo, nome: novoNome.trim(),
        tipo: (novoSubtipo as any) || 'Toalhas do Altar', status: 'guardada',
        corLiturgica: detalheEspecial || 'Branco', localizacao: novaLocalizacao || 'Armário de Têxteis B1',
        observacao: novaObs || undefined, ultimaAtualizacao: `Hoje, ${now}`,
      } as ItemToalha);
    } else if (novoTipoCat === 'paramentos') {
      onAddItem('paramentos', {
        id: `par-${Date.now()}`, codigo, nome: novoNome.trim(),
        tipo: (novoSubtipo as any) || 'Casula', corLiturgica: (detalheEspecial as any) || 'Branco',
        status: 'guardado', localizacao: novaLocalizacao || 'Armário C1',
        observacao: novaObs || undefined, ultimaAtualizacao: `Hoje, ${now}`,
      } as ItemParamento);
    } else if (novoTipoCat === 'vasos') {
      onAddItem('vasos', {
        id: `vas-${Date.now()}`, codigo, nome: novoNome.trim(),
        tipo: (novoSubtipo as any) || 'Cálice', material: detalheEspecial || 'Latão Dourado',
        status: 'guardado', localizacao: novaLocalizacao || 'Cofre da Sacristia',
        observacao: novaObs || undefined, ultimaAtualizacao: `Hoje, ${now}`,
      } as ItemVasoSagrado);
    } else {
      onAddItem('decoracao', {
        id: `dec-${Date.now()}`, codigo, nome: novoNome.trim(),
        tipo: (novoSubtipo as any) || 'Castiçal', status: 'guardado',
        localizacao: novaLocalizacao || 'Depósito Principal',
        observacao: novaObs || undefined, ultimaAtualizacao: `Hoje, ${now}`,
      } as ItemDecoracao);
    }

    setNovoNome(''); setNovoSubtipo(''); setNovaLocalizacao('');
    setNovaObs(''); setDetalheEspecial(''); setShowAddModal(false);
  }

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <section className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-5 sm:p-6 shadow-[0_4px_18px_rgba(61,45,25,0.08)] space-y-5">

      {/* ── CABEÇALHO DO MÓDULO ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5D8BE]/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#17243A] text-[#DDBB70] flex items-center justify-center shadow-xs flex-shrink-0">
            {moduloAtivo ? getModuloIcon(moduloAtivo.id) : <Layers className="w-5 h-5 text-[#DDBB70]" />}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold font-serif text-[#17243A]">
                {moduloAtivo ? moduloAtivo.nome.replace(/^\d+\. /, '') : 'Estoque & Inventário Geral'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5EFE6] text-[#7A6843] border border-[#E5D8BE] whitespace-nowrap">
                {moduloAtivo ? moduloAtivo.chipSubtitulo : 'Toalhas, Paramentos, Vasos e Objetos'}
              </span>
            </div>
            <p className="text-xs text-[#5F6B7A] mt-0.5 leading-relaxed max-w-xl">
              {moduloAtivo ? moduloAtivo.descricao : 'Gestão de localização, estado de conservação e higienização das peças sagradas da Matriz.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#17243A] to-[#223451] text-[#DDBB70] shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[44px] flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Item no Inventário</span>
        </button>
      </div>

      {/* ── BARRA DE FILTROS ── */}
      <div className="space-y-3 bg-[#F8F4EC] p-3.5 rounded-2xl border border-[#E5D8BE]/70">

        {/* Linha 1: busca + status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#7A6843] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={termoBusca}
              onChange={e => setTermoBusca(e.target.value)}
              placeholder="Buscar por nome, código, local..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] placeholder-[#7A6843]/60 focus:outline-none focus:ring-2 focus:ring-[#C69A3A] font-medium"
            />
            {termoBusca && (
              <button onClick={() => setTermoBusca('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A6843] cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 flex-shrink-0">
            {[
              { id: 'todos', label: 'Todos os Status', count: countPorModulo.total },
              { id: 'em_uso', label: 'Em Uso', count: countPorModulo.em_uso },
              { id: 'guardado', label: 'Guardados', count: countPorModulo.guardado },
              { id: 'lavagem', label: 'Lavagem/Higienização', count: countPorModulo.lavagem },
              { id: 'manutencao', label: 'Manutenção', count: countPorModulo.manutencao },
            ].map(st => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStatusSelecionado(st.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[36px] flex items-center gap-1 ${
                  statusSelecionado === st.id
                    ? 'bg-[#17243A] text-[#DDBB70] font-bold shadow-sm'
                    : 'bg-white text-[#5F6B7A] hover:bg-[#F5EFE6] border border-[#E5D8BE]'
                }`}
              >
                {st.label}
                {statusSelecionado === st.id && st.count > 0 && (
                  <span className="bg-[#DDBB70]/20 text-[#DDBB70] text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {st.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Linha 2: chips de subcategoria/módulo */}
        <div className="flex items-center gap-2 border-t border-[#E5D8BE]/50 pt-2.5 overflow-x-auto">
          {/* Chip "Todos os Itens" */}
          <button
            type="button"
            onClick={() => setSubcategoriaSelecionada('todos')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              subcategoriaSelecionada === 'todos'
                ? 'bg-[#DDBB70] text-[#17243A] shadow-sm'
                : 'bg-white/70 hover:bg-white text-[#7A6843] border border-[#E5D8BE]/70'
            }`}
          >
            <span>Todos os Itens</span>
            <span className={`px-1.5 rounded-full text-[10px] font-bold ${subcategoriaSelecionada === 'todos' ? 'bg-[#17243A] text-[#DDBB70]' : 'bg-[#E5D8BE] text-[#7A6843]'}`}>
              {filteredList.filter(i => moduloSelecionado === 'todos' || i.moduloId === moduloSelecionado).length}
            </span>
          </button>

          {/* Chips das subcategorias do módulo ativo */}
          {subcategoriaChips.map(chip => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setSubcategoriaSelecionada(chip.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
                subcategoriaSelecionada === chip.id
                  ? 'bg-[#DDBB70] text-[#17243A] shadow-sm'
                  : 'bg-white/70 hover:bg-white text-[#7A6843] border border-[#E5D8BE]/70'
              }`}
            >
              <span>{chip.label}</span>
              <span className={`px-1.5 rounded-full text-[10px] font-bold ${subcategoriaSelecionada === chip.id ? 'bg-[#17243A] text-[#DDBB70]' : 'bg-[#E5D8BE] text-[#7A6843]'}`}>
                {chip.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID DE CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredList.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-[#F9F6F0] rounded-2xl border border-dashed border-[#E5D8BE] p-6 space-y-2">
            <Layers className="w-8 h-8 text-[#7A6843]/40 mx-auto" />
            <p className="text-sm font-serif font-bold text-[#17243A]">Nenhum item encontrado.</p>
            <p className="text-xs text-[#5F6B7A]">Tente redefinir os filtros de busca ou categoria.</p>
          </div>
        ) : (
          filteredList.map(item => (
            <article
              key={item.id}
              className="bg-white border border-[#E5D8BE] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(61,45,25,0.07)] hover:shadow-[0_6px_20px_rgba(61,45,25,0.13)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
            >
              {/* Imagem do item ou placeholder elegante */}
              <div className="relative w-full h-36 bg-[#F8F4EC] flex-shrink-0 overflow-hidden">
                {item.imagem ? (
                  <Image
                    src={item.imagem}
                    alt={item.nome}
                    fill
                    className="object-contain p-3 transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                  />
                ) : (
                  <PlaceholderCard tipoItem={item.moduloId} tipoSub={item.categoriaNome} />
                )}

                {/* Badge de categoria (topo esquerdo) */}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-bold text-[#17243A] border border-[#E5D8BE]/80 shadow-xs">
                    {item.categoriaNome}
                  </span>
                </div>

                {/* Badge de status (topo direito) */}
                <div className="absolute top-2 right-2">
                  {renderStatusBadge(item)}
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="p-3.5 flex flex-col flex-1 space-y-2.5">
                {/* Código e nome */}
                <div>
                  <span className="text-[9px] font-bold font-mono text-[#7A6843]">{item.codigo}</span>
                  <h3 className="text-sm font-bold font-serif text-[#17243A] leading-snug mt-0.5 line-clamp-2">
                    {item.nome}
                  </h3>
                </div>

                {/* Detalhe extra (material / cor) */}
                {item.detalhesExtra && (
                  <p className="text-[10px] font-semibold text-[#9A6F20] leading-tight">
                    {item.detalhesExtra}
                  </p>
                )}

                {/* Localização */}
                <div className="flex items-start gap-1.5 text-[10px] text-[#5F6B7A]">
                  <MapPin className="w-3 h-3 text-[#9A6F20] flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">{item.localizacao}</span>
                </div>

                {/* Footer do card */}
                <div className="pt-2 border-t border-[#F0E9DC] flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1 text-[9px] text-[#7A6843]">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{item.ultimaAtualizacao}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setItemSelecionado(item)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#F5EFE6] hover:bg-[#EEDBB5] text-[#17243A] text-[10px] font-semibold border border-[#E5D8BE] transition-all cursor-pointer"
                      title="Ver detalhes deste item"
                    >
                      <Eye className="w-3 h-3 text-[#9A6F20]" />
                      <span>Ver detalhes</span>
                      <ChevronRight className="w-2.5 h-2.5 text-[#9A6F20]" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* ── CONTADORES RODAPÉ ── */}
      {filteredList.length > 0 && (
        <div className="flex items-center justify-between pt-2 border-t border-[#E5D8BE]/50 text-xs text-[#7A6843]">
          <span>
            Exibindo <strong className="text-[#17243A]">{filteredList.length}</strong> {filteredList.length === 1 ? 'item' : 'itens'}
            {moduloAtivo && <span className="ml-1 text-[#9A6F20]">· {moduloAtivo.nome.replace(/^\d+\. /, '')}</span>}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#166534]" />
              {countPorModulo.em_uso} em uso
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
              {countPorModulo.guardado} guardados
            </span>
          </div>
        </div>
      )}

      {/* ── MODAL DE DETALHES DO ITEM ── */}
      <DetalhesItemModal
        item={itemSelecionado}
        onClose={() => setItemSelecionado(null)}
        onSaveStatus={handleSaveStatus}
      />

      {/* ── MODAL CADASTRAR ITEM ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E5D8BE] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#17243A] text-[#DDBB70] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-serif text-[#17243A]">Cadastrar Peça no Inventário</h3>
              </div>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1 rounded-full text-[#7A6843] hover:bg-[#F5EFE6] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#17243A] uppercase tracking-wider">Categoria da Peça *</label>
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
                <label className="font-bold text-[#17243A] uppercase tracking-wider">Nome da Peça / Objeto *</label>
                <input
                  type="text" required value={novoNome}
                  onChange={e => setNovoNome(e.target.value)}
                  placeholder="Ex: Cálice Prata Trabalhado Solene"
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#17243A] uppercase tracking-wider">Subtipo</label>
                  <input
                    type="text" value={novoSubtipo}
                    onChange={e => setNovoSubtipo(e.target.value)}
                    placeholder="Ex: Cálice / Casula / Tapete"
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#17243A] uppercase tracking-wider">Cor / Material</label>
                  <input
                    type="text" value={detalheEspecial}
                    onChange={e => setDetalheEspecial(e.target.value)}
                    placeholder="Ex: Ouro 24k / Roxo / Linho"
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#17243A] uppercase tracking-wider">Localização</label>
                <input
                  type="text" value={novaLocalizacao}
                  onChange={e => setNovaLocalizacao(e.target.value)}
                  placeholder="Ex: Cofre Principal / Armário B2 / Presbitério"
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#17243A] uppercase tracking-wider">URL da Imagem (opcional)</label>
                <input
                  type="url"
                  value={''}
                  readOnly
                  placeholder="Campo reservado — virá do backend (ex: /uploads/item-001.jpg)"
                  className="w-full p-2.5 rounded-xl bg-[#F8F4EC] border border-[#E5D8BE]/60 text-[#7A6843] focus:outline-none italic"
                />
                <p className="text-[9px] text-[#7A6843]/70">Imagens serão vinculadas via API REST no backend.</p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#17243A] uppercase tracking-wider">Observações</label>
                <textarea
                  rows={2} value={novaObs}
                  onChange={e => setNovaObs(e.target.value)}
                  placeholder="Ex: Usar apenas em Solenidades Grandes."
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5D8BE]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#7A6843] hover:bg-[#F5EFE6] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-bold bg-[#17243A] text-[#DDBB70] hover:bg-[#223451] cursor-pointer"
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
