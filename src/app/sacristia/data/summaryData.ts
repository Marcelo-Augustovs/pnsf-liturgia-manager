import { SacristiaCategoria } from '@/types/sacristia';

export interface SacristiaSummaryMetrics {
  totalAlfaias: number;
  totalToalhas: number;
  totalParamentos: number;
  totalVasos: number;
  totalConsumiveis: number;
  totalDecoracao: number;
  totalGeral: number;
  emUsoTotal: number;
  emLavagemTotal: number;
  emManutencaoTotal: number;
  alertasTotal: number;
  alfaiasEmLavagemCount: number;
  toalhasEmUsoCount: number;
  vasosEmUsoCount: number;
  decoracaoEmUsoCount: number;
}

export interface SacristiaAlertItem {
  id: string;
  title: string;
  description: string;
  severity: 'warning' | 'info' | 'critical';
  category: SacristiaCategoria;
}

export const SUMMARY_DATA: SacristiaSummaryMetrics = {
  totalAlfaias: 8,
  totalToalhas: 5,
  totalParamentos: 7,
  totalVasos: 6,
  totalConsumiveis: 4,
  totalDecoracao: 5,
  totalGeral: 35,
  emUsoTotal: 14,
  emLavagemTotal: 6,
  emManutencaoTotal: 0,
  alertasTotal: 4,
  alfaiasEmLavagemCount: 4,
  toalhasEmUsoCount: 2,
  vasosEmUsoCount: 4,
  decoracaoEmUsoCount: 4,
};

export const INITIAL_ALERTS: SacristiaAlertItem[] = [
  {
    id: 'alert-con-001',
    title: 'Estoque de Hóstias / Partículas em atenção',
    description: 'Restam 1.400 unidades (estimativa para ~4.7 dias). Providencie novo lote com o fornecedor.',
    severity: 'critical',
    category: 'consumiveis',
  },
  {
    id: 'alert-con-002',
    title: 'Vinho Canônico Litúrgico abaixo do estoque recomendado',
    description: 'Restam apenas 3 garrafas (suficiente para ~9 celebrações). Reabasteça para o próximo fim de semana.',
    severity: 'warning',
    category: 'consumiveis',
  },
  {
    id: 'alert-alf-alf-001',
    title: 'Purificação Ritual: Sanguíneo Solene Bordado N. Sra. Fátima',
    description: 'Aguardando a 3ª imersão de purificação ritual em água limpa antes de ir para a lavagem/passagem.',
    severity: 'info',
    category: 'alfaias',
  },
  {
    id: 'alert-toa-toa-002',
    title: 'Lavagem Pendente: Toalha do Santíssimo Sacramento (Bordado Dourado)',
    description: 'Item aguardando higienização para retornar ao presbitério.',
    severity: 'info',
    category: 'toalhas',
  },
];
