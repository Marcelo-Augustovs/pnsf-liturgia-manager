'use client';

import React from 'react';
import { SacristiaState } from '@/types/sacristia';
import { AlertCircle, ArrowRight, Droplets, Package, RefreshCw } from 'lucide-react';

interface SacristiaAlertsProps {
  state: SacristiaState;
  onNavigateToCategory?: (category: string) => void;
}

export const SacristiaAlerts: React.FC<SacristiaAlertsProps> = ({ state, onNavigateToCategory }) => {
  // Collect active alerts
  const alerts: Array<{
    id: string;
    title: string;
    description: string;
    severity: 'warning' | 'info' | 'critical';
    category: string;
    icon: React.ReactNode;
  }> = [];

  // Check consumables below minimum alert threshold
  state.consumiveis.forEach((c) => {
    if (c.quantidadeAtual <= c.alertaMinimo) {
      if (c.tipo === 'hostias') {
        const diasRestantes = c.taxaConsumoPorDia
          ? (c.quantidadeAtual / c.taxaConsumoPorDia).toFixed(1)
          : 'poucos';
        alerts.push({
          id: `alert-${c.id}`,
          title: `Estoque de Hóstias / Partículas em atenção`,
          description: `Restam ${c.quantidadeAtual.toLocaleString()} unidades (estimativa para ~${diasRestantes} dias). Providencie novo lote com o fornecedor.`,
          severity: 'critical',
          category: 'consumiveis',
          icon: <Package className="w-4 h-4 text-[#D97706]" />,
        });
      } else if (c.tipo === 'vinho') {
        const celebs = Math.floor(c.quantidadeAtual / c.taxaConsumoPorCelebracao);
        alerts.push({
          id: `alert-${c.id}`,
          title: `Vinho Canônico Litúrgico abaixo do estoque recomendado`,
          description: `Restam apenas ${c.quantidadeAtual} garrafas (suficiente para ~${celebs} celebrações). Reabasteça para o próximo fim de semana.`,
          severity: 'warning',
          category: 'consumiveis',
          icon: <Package className="w-4 h-4 text-[#D97706]" />,
        });
      } else {
        alerts.push({
          id: `alert-${c.id}`,
          title: `Aviso de Estoque: ${c.nome}`,
          description: `Restam ${c.quantidadeAtual} ${c.unidadeMedida} (mínimo recomendado: ${c.alertaMinimo}).`,
          severity: 'info',
          category: 'consumiveis',
          icon: <Package className="w-4 h-4 text-[#3B82F6]" />,
        });
      }
    }
  });

  // Check Alfaias waiting for 3rd water or ironing
  const alfaias3Agua = state.alfaias.filter((a) => a.etapaLavagem === 'agua3');
  alfaias3Agua.forEach((a) => {
    alerts.push({
      id: `alert-alf-${a.id}`,
      title: `Purificação Ritual: ${a.nome}`,
      description: `Aguardando a 3ª imersão de purificação ritual em água limpa antes de ir para a lavagem/passagem.`,
      severity: 'info',
      category: 'alfaias',
      icon: <Droplets className="w-4 h-4 text-[#2563EB]" />,
    });
  });

  // Check Toalhas waiting for washing
  const toalhasLavagem = state.toalhas.filter((t) => t.status === 'aguardando_lavagem');
  toalhasLavagem.forEach((t) => {
    alerts.push({
      id: `alert-toa-${t.id}`,
      title: `Lavagem Pendente: ${t.nome}`,
      description: `Item aguardando higienização para retornar ao presbitério.`,
      severity: 'info',
      category: 'toalhas',
      icon: <RefreshCw className="w-4 h-4 text-[#7C3AED]" />,
    });
  });

  if (alerts.length === 0) {
    return (
      <div className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-2xl p-4 sm:p-5 shadow-[0_4px_18px_rgba(61,45,25,0.08)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#E8F5E9] text-[#1E5D3B] flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-serif text-[#17243A]">
              Sacristia Organizada e Sem Alertas Pendentes
            </h3>
            <p className="text-xs text-[#5F6B7A]">
              Todos os consumíveis estão abastecidos e as alfaias e vasos sagrados estão em estado regular.
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#1E5D3B] border border-[#A7F3D0] hidden sm:inline-block">
          Tudo Reverente & Pronto
        </span>
      </div>
    );
  }

  return (
    <section className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-2xl p-5 shadow-[0_4px_18px_rgba(61,45,25,0.08)] space-y-4">
      <div className="flex items-center justify-between border-b border-[#E5D8BE]/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-serif text-[#17243A] uppercase tracking-wider">
              ⚠ Atenção na Sacristia ({alerts.length} avisos)
            </h3>
            <p className="text-xs text-[#7A6843]">
              Recomendações de manutenção, purificação e reposição para manter a celebração impecável.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
              alert.severity === 'critical'
                ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
                : alert.severity === 'warning'
                ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
                : 'bg-[#F0F9FF] border-[#BAE6FD] text-[#0C4A6E]'
            }`}
          >
            <div className="p-2 rounded-lg bg-white shadow-2xs flex-shrink-0 mt-0.5">
              {alert.icon}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold font-serif leading-tight">
                  {alert.title}
                </h4>
                <button
                  type="button"
                  onClick={() => onNavigateToCategory?.(alert.category)}
                  className="text-[11px] font-semibold text-[#17243A] hover:underline inline-flex items-center gap-0.5 cursor-pointer ml-2 flex-shrink-0"
                >
                  <span>Ver</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                {alert.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
