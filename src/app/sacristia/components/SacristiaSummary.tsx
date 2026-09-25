'use client';

import React from 'react';
import { SacristiaState } from '@/types/sacristia';
import { Layers, CheckCircle2, Droplets, AlertTriangle, Wrench } from 'lucide-react';

interface SacristiaSummaryProps {
  state: SacristiaState;
  onFilterClick?: (filterType: string) => void;
}

export const SacristiaSummary: React.FC<SacristiaSummaryProps> = ({ state, onFilterClick }) => {
  // Calculations
  const totalAlfaias = state.alfaias.length;
  const totalToalhas = state.toalhas.length;
  const totalParamentos = state.paramentos.length;
  const totalVasos = state.vasos.length;
  const totalConsumiveis = state.consumiveis.length;
  const totalDecoracao = state.decoracoes.length;

  const totalGeral = totalAlfaias + totalToalhas + totalParamentos + totalVasos + totalConsumiveis + totalDecoracao;

  // Em uso
  const alfaiasEmUso = state.alfaias.filter(a => a.etapaLavagem === 'uso').length;
  const toalhasEmUso = state.toalhas.filter(t => t.status === 'em_uso').length;
  const paramentosEmUso = state.paramentos.filter(p => p.status === 'em_uso').length;
  const vasosEmUso = state.vasos.filter(v => v.status === 'em_uso').length;
  const decoracaoEmUso = state.decoracoes.filter(d => d.status === 'em_uso').length;
  const emUsoTotal = alfaiasEmUso + toalhasEmUso + paramentosEmUso + vasosEmUso + decoracaoEmUso;

  // Em lavagem / 3 Águas
  const alfaiasEmLavagem = state.alfaias.filter(a => ['agua1', 'agua2', 'agua3', 'passar'].includes(a.etapaLavagem)).length;
  const toalhasEmLavagem = state.toalhas.filter(t => ['aguardando_lavagem', 'passar'].includes(t.status)).length;
  const paramentosEmLavagem = state.paramentos.filter(p => p.status === 'lavanderia').length;
  const vasosEmHigienizacao = state.vasos.filter(v => v.status === 'higienizacao').length;
  const emLavagemTotal = alfaiasEmLavagem + toalhasEmLavagem + paramentosEmLavagem + vasosEmHigienizacao;

  // Em Manutenção
  const toalhasManutencao = state.toalhas.filter(t => t.status === 'em_manutencao').length;
  const paramentosManutencao = state.paramentos.filter(p => p.status === 'em_manutencao').length;
  const vasosManutencao = state.vasos.filter(v => v.status === 'em_manutencao').length;
  const decoracaoManutencao = state.decoracoes.filter(d => d.status === 'em_manutencao').length;
  const emManutencaoTotal = toalhasManutencao + paramentosManutencao + vasosManutencao + decoracaoManutencao;

  // Alertas (Consumíveis abaixo do nível mínimo ou Alfaias aguardando 3ª água)
  const consumiveisAlerta = state.consumiveis.filter(c => c.quantidadeAtual <= c.alertaMinimo).length;
  const alfaiasUrgentes3Agua = state.alfaias.filter(a => a.etapaLavagem === 'agua3').length;
  const alertasTotal = consumiveisAlerta + alfaiasUrgentes3Agua;

  return (
    <section className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4">
      {/* 1. TOTAL DE ITENS */}
      <div 
        onClick={() => onFilterClick?.('todos')}
        className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-2xl p-4 shadow-[0_4px_18px_rgba(61,45,25,0.08)] hover:shadow-[0_8px_24px_rgba(61,45,25,0.13)] transition-all cursor-pointer flex flex-col justify-between group"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6843]">
            Total de Itens
          </span>
          <div className="w-8 h-8 rounded-xl bg-[#F5EFE6] text-[#17243A] flex items-center justify-center group-hover:bg-[#17243A] group-hover:text-[#DDBB70] transition-colors">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-bold font-serif text-[#17243A]">
            {totalGeral}
          </span>
          <span className="text-[10px] font-medium text-[#7A6843] bg-[#F5EFE6] px-2 py-0.5 rounded-full">
            6 Categorias
          </span>
        </div>
      </div>

      {/* 2. EM USO NO ALTAR */}
      <div 
        onClick={() => onFilterClick?.('em_uso')}
        className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-2xl p-4 shadow-[0_4px_18px_rgba(61,45,25,0.08)] hover:shadow-[0_8px_24px_rgba(61,45,25,0.13)] transition-all cursor-pointer flex flex-col justify-between group"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E5D3B]">
            Em Uso Ativo
          </span>
          <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] text-[#1E5D3B] flex items-center justify-center group-hover:bg-[#1E5D3B] group-hover:text-white transition-colors">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-bold font-serif text-[#1E5D3B]">
            {emUsoTotal}
          </span>
          <span className="text-[10px] font-medium text-[#1E5D3B] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
            No Presbitério
          </span>
        </div>
      </div>

      {/* 3. EM LAVAGEM / 3 ÁGUAS */}
      <div 
        onClick={() => onFilterClick?.('lavagem')}
        className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-2xl p-4 shadow-[0_4px_18px_rgba(61,45,25,0.08)] hover:shadow-[0_8px_24px_rgba(61,45,25,0.13)] transition-all cursor-pointer flex flex-col justify-between group"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8]">
            Em Lavagem / 3 Águas
          </span>
          <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center group-hover:bg-[#1D4ED8] group-hover:text-white transition-colors">
            <Droplets className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-bold font-serif text-[#1D4ED8]">
            {emLavagemTotal}
          </span>
          <span className="text-[10px] font-semibold text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5 rounded-full">
            {alfaiasEmLavagem} Alfaias
          </span>
        </div>
      </div>

      {/* 4. EM MANUTENÇÃO */}
      <div 
        onClick={() => onFilterClick?.('manutencao')}
        className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-2xl p-4 shadow-[0_4px_18px_rgba(61,45,25,0.08)] hover:shadow-[0_8px_24px_rgba(61,45,25,0.13)] transition-all cursor-pointer flex flex-col justify-between group"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C2D12]">
            Em Manutenção
          </span>
          <div className="w-8 h-8 rounded-xl bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center group-hover:bg-[#C2410C] group-hover:text-white transition-colors">
            <Wrench className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-bold font-serif text-[#C2410C]">
            {emManutencaoTotal}
          </span>
          <span className="text-[10px] font-medium text-[#C2410C] bg-[#FFF7ED] px-2 py-0.5 rounded-full">
            Reparos
          </span>
        </div>
      </div>

      {/* 5. ALERTAS E ATENÇÃO */}
      <div 
        onClick={() => onFilterClick?.('alertas')}
        className={`bg-[#FFFCF6] border rounded-2xl p-4 shadow-[0_4px_18px_rgba(61,45,25,0.08)] hover:shadow-[0_8px_24px_rgba(61,45,25,0.13)] transition-all cursor-pointer flex flex-col justify-between group col-span-2 md:col-span-1 ${
          alertasTotal > 0 ? 'border-[#F59E0B] ring-2 ring-[#F59E0B]/20' : 'border-[#E5D8BE]'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
            Alertas Ativos
          </span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
            alertasTotal > 0 ? 'bg-[#FEF3C7] text-[#D97706] group-hover:bg-[#D97706] group-hover:text-white' : 'bg-[#F5EFE6] text-[#7A6843]'
          }`}>
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className={`text-2xl sm:text-3xl font-bold font-serif ${alertasTotal > 0 ? 'text-[#D97706]' : 'text-[#17243A]'}`}>
            {alertasTotal}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            alertasTotal > 0 ? 'bg-[#FEF3C7] text-[#B45309]' : 'bg-[#F5EFE6] text-[#7A6843]'
          }`}>
            {alertasTotal > 0 ? 'Requer Ação' : 'Tudo Ok'}
          </span>
        </div>
      </div>
    </section>
  );
};
