'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  X,
  Layers,
  Shield,
  Sparkles,
  Image as ImageIcon,
  Package,
  MapPin,
  Clock,
  QrCode,
  Tag,
  Wrench,
  BookOpen,
  History,
  Cross,
  Info,
  CheckCircle2,
  Save,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';
import { ItemInventario } from '@/types/sacristia';

// ─── Tipos ────────────────────────────────────────────────────────────────────
type StatusGeral = 'em_uso' | 'guardado' | 'lavagem' | 'manutencao';
type Aba = 'descricao' | 'historia' | 'simbolismo' | 'informacoes';

interface DetalhesItemModalProps {
  item: ItemInventario | null;
  onClose: () => void;
  onSaveStatus: (item: ItemInventario, novoStatus: StatusGeral) => void;
}

// ─── Ícone por módulo ─────────────────────────────────────────────────────────
function ModuloIcon({ moduloId, className = 'w-10 h-10' }: { moduloId: string; className?: string }) {
  switch (moduloId) {
    case 'toalhas':    return <Layers className={className} />;
    case 'paramentos': return <Shield className={className} />;
    case 'vasos':      return <Sparkles className={className} />;
    case 'decoracao':  return <ImageIcon className={className} />;
    default:           return <Package className={className} />;
  }
}

// ─── Placeholder de imagem ────────────────────────────────────────────────────
function ImagemPlaceholder({ moduloId, categoriaNome }: { moduloId: string; categoriaNome: string }) {
  const colors: Record<string, string> = {
    toalhas:    'text-purple-400',
    paramentos: 'text-amber-500',
    vasos:      'text-yellow-600',
    decoracao:  'text-slate-400',
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F8F4EC] to-[#F0E9DC]">
      <ModuloIcon moduloId={moduloId} className={`w-14 h-14 opacity-30 ${colors[moduloId] ?? 'text-[#7A6843]'}`} />
      <p className="text-[10px] font-semibold text-[#7A6843]/50 uppercase tracking-widest text-center px-4 leading-tight">
        {categoriaNome}
        <br />
        <span className="font-normal normal-case tracking-normal text-[9px]">Sem foto cadastrada</span>
      </p>
    </div>
  );
}

// ─── Chip de status ───────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<StatusGeral, { label: string; icon: React.ReactNode; bg: string; ring: string; text: string }> = {
  em_uso:    { label: 'Em Uso',              icon: <CheckCircle2 className="w-3.5 h-3.5" />, bg: 'bg-[#DCFCE7]', ring: 'ring-[#166534]', text: 'text-[#166534]' },
  guardado:  { label: 'Guardado',            icon: <Package className="w-3.5 h-3.5" />,       bg: 'bg-[#EFF6FF]', ring: 'ring-[#1D4ED8]', text: 'text-[#1D4ED8]' },
  lavagem:   { label: 'Lavagem/Higienização',icon: <Wrench className="w-3.5 h-3.5" />,        bg: 'bg-[#F5EEFB]', ring: 'ring-[#7C3AED]', text: 'text-[#7C3AED]' },
  manutencao:{ label: 'Manutenção',          icon: <Wrench className="w-3.5 h-3.5" />,        bg: 'bg-[#FFF7ED]', ring: 'ring-[#C2410C]', text: 'text-[#C2410C]' },
};

// ─── Linha de metadado ────────────────────────────────────────────────────────
function MetaRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 py-2 border-b border-[#F0E9DC] last:border-0">
      <span className="text-[#9A6F20] flex-shrink-0 mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#7A6843]/70 leading-none mb-0.5">{label}</p>
        <p className="text-xs font-semibold text-[#17243A] leading-snug">{value}</p>
      </div>
    </div>
  );
}

// ─── Seção de conteúdo da aba ─────────────────────────────────────────────────
function AbaSecao({ icon, titulo, conteudo }: { icon: React.ReactNode; titulo: string; conteudo: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 pb-2 border-b border-[#E5D8BE]/60">
        <span className="text-[#9A6F20]">{icon}</span>
        <h3 className="text-sm font-bold font-serif text-[#17243A]">{titulo}</h3>
      </div>
      <p className="text-sm text-[#3D4654] leading-relaxed">{conteudo}</p>
    </div>
  );
}

// ─── Componente Principal ─────────────────────────────────────────────────────
export const DetalhesItemModal: React.FC<DetalhesItemModalProps> = ({ item, onClose, onSaveStatus }) => {
  const [abaAtiva, setAbaAtiva] = useState<Aba>('descricao');
  const [statusSelecionado, setStatusSelecionado] = useState<StatusGeral>('em_uso');
  const [salvando, setSalvando] = useState(false);
  const [salvoComSucesso, setSalvoComSucesso] = useState(false);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Animação de entrada
  useEffect(() => {
    if (item) {
      setStatusSelecionado(item.statusGeral);
      setAbaAtiva('descricao');
      setSalvoComSucesso(false);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [item]);

  // Fechar com ESC
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [handleEsc]);

  // Travar scroll do body
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [item]);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 220);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) handleClose();
  }

  async function handleSalvar() {
    if (!item || statusSelecionado === item.statusGeral) { handleClose(); return; }
    setSalvando(true);
    await new Promise(r => setTimeout(r, 400)); // simula latência
    onSaveStatus(item, statusSelecionado);
    setSalvando(false);
    setSalvoComSucesso(true);
    setTimeout(handleClose, 900);
  }

  if (!item) return null;

  // ── Abas disponíveis (apenas exibe aba se tiver conteúdo ou for "Informações") ──
  const abas: { id: Aba; label: string; icon: React.ReactNode; disponivel: boolean }[] = [
    { id: 'descricao',    label: 'Descrição',           icon: <BookOpen className="w-3.5 h-3.5" />, disponivel: true },
    { id: 'historia',     label: 'História',            icon: <History className="w-3.5 h-3.5" />,  disponivel: true },
    { id: 'simbolismo',   label: 'Simbolismo Litúrgico',icon: <Cross className="w-3.5 h-3.5" />,   disponivel: true },
    { id: 'informacoes',  label: 'Informações',         icon: <Info className="w-3.5 h-3.5" />,     disponivel: true },
  ];

  const statusAtual = STATUS_CONFIG[item.statusGeral];

  // ─── Render da aba ativa ─────────────────────────────────────────────────────
  function renderAba() {
    switch (abaAtiva) {
      case 'descricao':
        return item?.descricao ? (
          <AbaSecao
            icon={<BookOpen className="w-4 h-4" />}
            titulo="Descrição"
            conteudo={item.descricao}
          />
        ) : (
          <EmptyAba mensagem="Nenhuma descrição cadastrada para este item." />
        );

      case 'historia':
        return item?.historia ? (
          <AbaSecao
            icon={<History className="w-4 h-4" />}
            titulo="História e Origem"
            conteudo={item.historia}
          />
        ) : (
          <EmptyAba mensagem="Nenhuma informação histórica cadastrada para este item." />
        );

      case 'simbolismo':
        return item?.simbolismoLiturgico ? (
          <AbaSecao
            icon={<Cross className="w-4 h-4" />}
            titulo="Simbolismo Litúrgico"
            conteudo={item.simbolismoLiturgico}
          />
        ) : (
          <EmptyAba mensagem="Informações sobre simbolismo litúrgico não cadastradas." />
        );

      case 'informacoes': {
        const campos = [
          item?.codigo           && { label: 'Código', value: item.codigo },
          item?.codigoPatrimonial && { label: 'Código Patrimonial', value: item.codigoPatrimonial },
          item?.material         && { label: 'Material', value: item.material },
          item?.dataAquisicao    && { label: 'Data de Aquisição', value: item.dataAquisicao },
          item?.responsavel      && { label: 'Responsável', value: item.responsavel },
          item?.localizacao      && { label: 'Localização', value: item.localizacao },
          item?.observacao       && { label: 'Observações', value: item.observacao },
          item?.ultimaAtualizacao && { label: 'Última Atualização', value: item.ultimaAtualizacao },
        ].filter(Boolean) as { label: string; value: string }[];

        return campos.length > 0 ? (
          <div className="space-y-1">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E5D8BE]/60 mb-3">
              <Info className="w-4 h-4 text-[#9A6F20]" />
              <h3 className="text-sm font-bold font-serif text-[#17243A]">Informações Patrimoniais</h3>
            </div>
            <div className="grid grid-cols-1 gap-0 divide-y divide-[#F0E9DC]">
              {campos.map(({ label, value }) => (
                <div key={label} className="py-2.5 flex flex-col sm:flex-row sm:items-start sm:gap-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#7A6843]/70 sm:w-36 flex-shrink-0 leading-none mb-0.5 sm:mb-0 sm:mt-0.5">{label}</span>
                  <span className="text-xs font-semibold text-[#17243A] leading-snug">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyAba mensagem="Nenhuma informação adicional cadastrada." />
        );
      }
    }
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6
        bg-black/60 backdrop-blur-sm transition-opacity duration-200
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-modal="true"
      role="dialog"
      aria-label={`Detalhes: ${item.nome}`}
    >
      {/* ── MODAL ── */}
      <div
        className={`relative bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl shadow-2xl
          w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col
          transition-all duration-220
          ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
      >
        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5D8BE] flex-shrink-0 bg-[#FFFCF6]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#17243A] text-[#DDBB70] flex items-center justify-center flex-shrink-0">
              <ModuloIcon moduloId={item.moduloId} className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-base font-bold font-serif text-[#17243A]">Detalhes do Item</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar modal"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#7A6843] hover:bg-[#F5EFE6] hover:text-[#17243A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── BODY SCROLLÁVEL ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Layout: grid 2 colunas no desktop, 1 coluna no mobile */}
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-0 min-h-full">

            {/* ═══════════════════════════════════════════════════════════════
                COLUNA ESQUERDA — Imagem + Metadados + Status atual
            ═══════════════════════════════════════════════════════════════ */}
            <div className="md:border-r border-b md:border-b-0 border-[#E5D8BE] p-5 space-y-4 flex-shrink-0">

              {/* Imagem principal */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F8F4EC] border border-[#E5D8BE]/60 group">
                {item.imagem ? (
                  <>
                    <Image
                      src={item.imagem}
                      alt={item.nome}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 90vw, 320px"
                      unoptimized
                    />
                    {/* Zoom hint */}
                    <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-[#E5D8BE]/60 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3.5 h-3.5 text-[#7A6843]" />
                    </div>
                  </>
                ) : (
                  <ImagemPlaceholder moduloId={item.moduloId} categoriaNome={item.categoriaNome} />
                )}
              </div>

              {/* Thumbnails (para futura galeria — placeholder elegante) */}
              <div className="flex gap-2">
                <div className={`w-12 h-12 rounded-xl overflow-hidden border-2 cursor-pointer flex-shrink-0 ${item.imagem ? 'border-[#DDBB70]' : 'border-[#E5D8BE]'}`}>
                  {item.imagem ? (
                    <div className="relative w-full h-full">
                      <Image src={item.imagem} alt="" fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-[#F0E9DC] flex items-center justify-center">
                      <ModuloIcon moduloId={item.moduloId} className="w-5 h-5 text-[#7A6843]/30" />
                    </div>
                  )}
                </div>
                <div className="w-12 h-12 rounded-xl border border-dashed border-[#E5D8BE] bg-[#F8F4EC] flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-4 h-4 text-[#7A6843]/30" />
                </div>
              </div>

              {/* Nome e código */}
              <div>
                <p className="text-[9px] font-bold font-mono text-[#7A6843] uppercase tracking-widest mb-1">{item.codigo}</p>
                <h3 className="text-base font-bold font-serif text-[#17243A] leading-snug">{item.nome}</h3>
              </div>

              {/* Metadados */}
              <div className="space-y-0 bg-[#F8F4EC]/60 rounded-2xl px-3 py-1 border border-[#E5D8BE]/60">
                <MetaRow icon={<QrCode className="w-3.5 h-3.5" />} label="Código" value={item.codigo} />
                <MetaRow icon={<Tag className="w-3.5 h-3.5" />} label="Categoria" value={item.categoriaNome} />
                <MetaRow icon={<MapPin className="w-3.5 h-3.5" />} label="Localização" value={item.localizacao} />
                {item.material && (
                  <MetaRow icon={<Sparkles className="w-3.5 h-3.5" />} label="Material" value={item.material} />
                )}
                {item.detalhesExtra && !item.material && (
                  <MetaRow icon={<Sparkles className="w-3.5 h-3.5" />} label="Detalhe" value={item.detalhesExtra} />
                )}
              </div>

              {/* Status atual */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#7A6843] mb-2">Status atual</p>
                <div className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold
                  ${statusAtual.bg} ${statusAtual.text} border-current/20`}>
                  <span className="w-2 h-2 rounded-full bg-current opacity-80 flex-shrink-0" />
                  {item.statusRotulo}
                  <ChevronRight className="w-3.5 h-3.5 opacity-50 ml-1" />
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                COLUNA DIREITA — Abas + Conteúdo + Alterar Status
            ═══════════════════════════════════════════════════════════════ */}
            <div className="flex flex-col min-h-0">

              {/* Barra de abas */}
              <div className="flex items-center gap-0 border-b border-[#E5D8BE] px-4 pt-4 overflow-x-auto flex-shrink-0 pb-0">
                {abas.map(aba => (
                  <button
                    key={aba.id}
                    type="button"
                    onClick={() => setAbaAtiva(aba.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-t-xl
                      transition-all cursor-pointer whitespace-nowrap flex-shrink-0 border-b-2
                      ${abaAtiva === aba.id
                        ? 'border-[#DDBB70] text-[#17243A] bg-[#FFF9EE] font-bold'
                        : 'border-transparent text-[#7A6843] hover:text-[#17243A] hover:bg-[#F8F4EC]'
                      }`}
                  >
                    <span className={abaAtiva === aba.id ? 'text-[#9A6F20]' : 'opacity-60'}>{aba.icon}</span>
                    {aba.label}
                  </button>
                ))}
              </div>

              {/* Conteúdo da aba */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div
                  key={abaAtiva}
                  className="animate-in fade-in slide-in-from-bottom-2 duration-200"
                >
                  {renderAba()}
                </div>
              </div>

              {/* ── ALTERAR STATUS ── */}
              <div className="flex-shrink-0 border-t border-[#E5D8BE] bg-[#FFFCF6] p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6843]">Alterar Status</p>

                {/* Chips de status */}
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(STATUS_CONFIG) as StatusGeral[]).map(st => {
                    const cfg = STATUS_CONFIG[st];
                    const isSelected = statusSelecionado === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusSelecionado(st)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold
                          transition-all cursor-pointer border
                          ${isSelected
                            ? 'bg-[#17243A] text-[#DDBB70] border-[#17243A] shadow-md'
                            : `${cfg.bg} ${cfg.text} border-current/20 hover:border-current/40`
                          }`}
                      >
                        {cfg.icon}
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>

                {/* Rodapé: info + botão salvar */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-start gap-1.5 min-w-0">
                    <Info className="w-3.5 h-3.5 text-[#7A6843]/60 flex-shrink-0 mt-0.5" />
                    <div className="text-[9px] text-[#7A6843]/70 leading-snug">
                      <p>Última atualização: <strong className="text-[#5F6B7A]">{item.ultimaAtualizacao}</strong></p>
                      {item.responsavel && <p>por {item.responsavel}</p>}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSalvar}
                    disabled={salvando}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold
                      transition-all cursor-pointer flex-shrink-0 min-w-[130px] justify-center
                      ${salvoComSucesso
                        ? 'bg-green-700 text-white'
                        : 'bg-[#17243A] text-[#DDBB70] hover:bg-[#223451] shadow-md hover:shadow-lg'
                      } disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    {salvando ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-[#DDBB70]/30 border-t-[#DDBB70] rounded-full animate-spin" />
                        Salvando…
                      </>
                    ) : salvoComSucesso ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Salvo!
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        Salvar alterações
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Componente auxiliar: aba vazia ───────────────────────────────────────────
function EmptyAba({ mensagem }: { mensagem: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[#F8F4EC] border border-[#E5D8BE] flex items-center justify-center">
        <BookOpen className="w-5 h-5 text-[#7A6843]/40" />
      </div>
      <p className="text-xs text-[#7A6843]/70 max-w-[220px] leading-relaxed">{mensagem}</p>
      <p className="text-[9px] text-[#7A6843]/40 font-medium">Será preenchido na integração com o backend.</p>
    </div>
  );
}
