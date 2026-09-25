'use client';

import React, { useState } from 'react';
import { ItemConsumivel } from '@/types/sacristia';
import {
  Package,
  Plus,
  Zap,
  Flame,
  Wine,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  X,
  TrendingDown,
} from 'lucide-react';

interface ConsumablesCardProps {
  consumiveis: ItemConsumivel[];
  onUpdateConsumivel: (updatedItem: ItemConsumivel) => void;
  onSimularCelebracao: () => void;
}

export const ConsumablesCard: React.FC<ConsumablesCardProps> = ({
  consumiveis,
  onUpdateConsumivel,
  onSimularCelebracao,
}) => {
  const [selectedItemForRefill, setSelectedItemForRefill] = useState<ItemConsumivel | null>(null);
  const [qtdAdicionar, setQtdAdicionar] = useState<number>(100);

  const handleRefillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForRefill) return;

    const novaQtd = Math.min(
      selectedItemForRefill.capacidadeMaxima,
      selectedItemForRefill.quantidadeAtual + Number(qtdAdicionar)
    );

    onUpdateConsumivel({
      ...selectedItemForRefill,
      quantidadeAtual: novaQtd,
    });

    setSelectedItemForRefill(null);
  };

  return (
    <section className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-5 sm:p-6 shadow-[0_4px_18px_rgba(61,45,25,0.08)] space-y-6">
      
      {/* CABEÇALHO E AÇÃO PRINCIPAL DE SIMULAÇÃO DE CELEBRAÇÃO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5D8BE]/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#17243A] text-[#DDBB70] flex items-center justify-center font-bold shadow-xs flex-shrink-0">
            <Package className="w-5 h-5 text-[#DDBB70]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-serif text-[#17243A]">
                Materiais de Consumo Litúrgico
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5E9] text-[#1E5D3B] border border-[#A7F3D0]">
                Cálculo Dinâmico em Tempo Real
              </span>
            </div>
            <p className="text-xs text-[#5F6B7A] mt-0.5">
              Hóstias, Vinho Canônico, Incenso e Carvão. Estimativa de autonomia por celebrações e dias restantes.
            </p>
          </div>
        </div>

        {/* BOTÃO SIMULAR CELEBRAÇÃO */}
        <button
          type="button"
          onClick={onSimularCelebracao}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#DDBB70] via-[#C69A3A] to-[#DDBB70] text-[#17243A] shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer min-h-[44px]"
        >
          <Zap className="w-4 h-4 text-[#17243A] fill-[#17243A]" />
          <span>Simular Consumo de 1 Missa Solene</span>
        </button>
      </div>

      {/* CARDS DE CONSUMÍVEIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {consumiveis.map((item) => {
          const percentual = Math.min(
            100,
            Math.max(0, Math.round((item.quantidadeAtual / item.capacidadeMaxima) * 100))
          );

          const isEmAlerta = item.quantidadeAtual <= item.alertaMinimo;

          // Autonomia calculations
          let autonomiaTexto = '';
          let detalheConsumo = '';

          if (item.tipo === 'hostias') {
            const dias = item.taxaConsumoPorDia
              ? (item.quantidadeAtual / item.taxaConsumoPorDia).toFixed(1)
              : 'N/A';
            const celebs = Math.floor(item.quantidadeAtual / item.taxaConsumoPorCelebracao);
            autonomiaTexto = `~${dias} dias restantes (${celebs} missas)`;
            detalheConsumo = `Taxa: ~${item.taxaConsumoPorDia} un/dia | ~${item.taxaConsumoPorCelebracao} un/missa`;
          } else if (item.tipo === 'vinho') {
            const celebs = Math.floor(item.quantidadeAtual / item.taxaConsumoPorCelebracao);
            autonomiaTexto = `~${celebs} celebrações restantes`;
            detalheConsumo = `Consumo: 1 garrafa a cada 3 celebrações (0.33/missa)`;
          } else if (item.tipo === 'incenso') {
            const celebs = Math.floor(item.quantidadeAtual / item.taxaConsumoPorCelebracao);
            autonomiaTexto = `~${celebs} celebrações incensadas`;
            detalheConsumo = `Consumo: ${item.taxaConsumoPorCelebracao}g por celebração solene`;
          } else if (item.tipo === 'carvao') {
            const celebs = Math.floor(item.quantidadeAtual / item.taxaConsumoPorCelebracao);
            autonomiaTexto = `~${celebs} incensações restantes`;
            detalheConsumo = `Consumo: ${item.taxaConsumoPorCelebracao} pastilhas por incensação`;
          }

          // Icon per type
          let icon = <Package className="w-5 h-5 text-[#9A6F20]" />;
          if (item.tipo === 'vinho') icon = <Wine className="w-5 h-5 text-[#991B1B]" />;
          if (item.tipo === 'incenso') icon = <Sparkles className="w-5 h-5 text-[#D97706]" />;
          if (item.tipo === 'carvao') icon = <Flame className="w-5 h-5 text-[#374151]" />;

          return (
            <article
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
                isEmAlerta
                  ? 'bg-[#FFFBEB] border-[#FDE68A] shadow-xs'
                  : 'bg-white border-[#E5D8BE] shadow-2xs hover:shadow-xs'
              }`}
            >
              <div className="space-y-3">
                {/* TOPO DO CARD */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#F5EFE6] flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-serif text-[#17243A]">
                        {item.nome}
                      </h3>
                      <p className="text-xs text-[#7A6843] font-medium">
                        {detalheConsumo}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      isEmAlerta
                        ? 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] animate-pulse'
                        : 'bg-[#E8F5E9] text-[#1E5D3B] border border-[#A7F3D0]'
                    }`}
                  >
                    {isEmAlerta ? '⚠ Nível Baixo' : 'Em Estoque'}
                  </span>
                </div>

                {/* BARRA DE PROGRESSO VISUAL */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#5F6B7A]">Nível de Estoque:</span>
                    <span className="text-[#17243A] font-bold">
                      {item.quantidadeAtual.toLocaleString()} / {item.capacidadeMaxima.toLocaleString()} {item.unidadeMedida} ({percentual}%)
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-[#E5D8BE]/40 overflow-hidden p-0.5 border border-[#E5D8BE]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        percentual < 25
                          ? 'bg-gradient-to-r from-[#EF4444] to-[#DC2626]'
                          : percentual < 50
                          ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706]'
                          : 'bg-gradient-to-r from-[#10B981] to-[#059669]'
                      }`}
                      style={{ width: `${percentual}%` }}
                    />
                  </div>
                </div>

                {/* AUTONOMIA ESTIMADA */}
                <div className="flex items-center gap-2 text-xs bg-[#F8F4EC] p-3 rounded-xl border border-[#E5D8BE]/70 text-[#17243A]">
                  <TrendingDown className="w-4 h-4 text-[#9A6F20] flex-shrink-0" />
                  <div>
                    <span className="font-bold">Estimativa de Autonomia: </span>
                    <span className="font-semibold text-[#9A6F20]">{autonomiaTexto}</span>
                  </div>
                </div>
              </div>

              {/* RODAPÉ DO CARD / BOTÃO DE REABASTECER */}
              <div className="pt-2 border-t border-[#E5D8BE]/50 flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#7A6843]">
                  Alerta configurado em: {item.alertaMinimo} {item.unidadeMedida}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedItemForRefill(item);
                    setQtdAdicionar(
                      item.tipo === 'vinho' ? 6 : item.tipo === 'hostias' ? 1000 : 200
                    );
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#17243A] hover:bg-[#223451] text-[#DDBB70] transition-all cursor-pointer min-h-[40px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Reabastecer</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* MODAL REABASTECER ITEM */}
      {selectedItemForRefill && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFCF6] border border-[#E5D8BE] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[#E5D8BE] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#17243A] text-[#DDBB70] flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold font-serif text-[#17243A]">
                  Reabastecer Estoque: {selectedItemForRefill.nome}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItemForRefill(null)}
                className="p-1 rounded-full text-[#7A6843] hover:bg-[#F5EFE6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRefillSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#17243A] uppercase tracking-wider">
                  Quantidade a Adicionar ({selectedItemForRefill.unidadeMedida})
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={selectedItemForRefill.capacidadeMaxima}
                  value={qtdAdicionar}
                  onChange={(e) => setQtdAdicionar(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E5D8BE] text-[#17243A] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#C69A3A]"
                />
                <p className="text-[11px] text-[#7A6843] mt-1">
                  Estoque Atual: {selectedItemForRefill.quantidadeAtual} / Cap. Máxima: {selectedItemForRefill.capacidadeMaxima}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5D8BE]">
                <button
                  type="button"
                  onClick={() => setSelectedItemForRefill(null)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#7A6843] hover:bg-[#F5EFE6]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-bold bg-[#17243A] text-[#DDBB70] hover:bg-[#223451]"
                >
                  Confirmar Reposição
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
