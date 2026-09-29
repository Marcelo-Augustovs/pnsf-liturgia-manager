import { ItemConsumivel } from '@/types/sacristia';

export const mockConsumiveis: ItemConsumivel[] = [
  {
    id: 'con-001',
    nome: 'Hóstias / Partículas dos Fiéis',
    tipo: 'hostias',
    quantidadeAtual: 1400,
    unidadeMedida: 'unidades',
    capacidadeMaxima: 5000,
    taxaConsumoPorDia: 300,
    taxaConsumoPorCelebracao: 150,
    alertaMinimo: 1000,
    observacao: 'Consumo estimado de 300 partículas/dia em 2 missas diárias. Alerta para 4.6 dias restantes.',
  },
  {
    id: 'con-002',
    nome: 'Vinho Canônico Litúrgico Seco (750ml)',
    tipo: 'vinho',
    quantidadeAtual: 3,
    unidadeMedida: 'garrafas',
    capacidadeMaxima: 12,
    taxaConsumoPorCelebracao: 0.33, // 1 garrafa a cada 3 celebrações
    alertaMinimo: 4,
    observacao: 'Apenas 3 garrafas restantes em estoque! Suficiente para ~9 celebrações.',
  },
  {
    id: 'con-003',
    nome: 'Incenso de Resina Litúrgica Jerusalém',
    tipo: 'incenso',
    quantidadeAtual: 450,
    unidadeMedida: 'gramas',
    capacidadeMaxima: 1000,
    taxaConsumoPorCelebracao: 15, // 15g por celebração incensada
    alertaMinimo: 200,
    observacao: 'Estoque saudável para aprox. 30 celebrações solenes.',
  },
  {
    id: 'con-004',
    nome: 'Pastilhas de Carvão Auto-Acendível',
    tipo: 'carvao',
    quantidadeAtual: 60,
    unidadeMedida: 'unidades',
    capacidadeMaxima: 200,
    taxaConsumoPorCelebracao: 2, // 2 pastilhas por incensação
    alertaMinimo: 30,
    observacao: 'Suficiente para ~30 incensações litúrgicas.',
  },
];
