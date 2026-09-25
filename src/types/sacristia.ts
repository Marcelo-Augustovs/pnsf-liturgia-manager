export type SacristiaCategoria =
  | 'alfaias'
  | 'toalhas'
  | 'paramentos'
  | 'vasos'
  | 'consumiveis'
  | 'decoracao';

export type AlfaiaEtapa =
  | 'uso'
  | 'agua1'
  | 'agua2'
  | 'agua3'
  | 'passar'
  | 'guardada';

export interface ItemAlfaia {
  id: string;
  codigo: string;
  nome: string;
  tipo: 'Sanguíneo' | 'Corporal' | 'Pala' | 'Manustérgio';
  etapaLavagem: AlfaiaEtapa;
  localizacao: string;
  observacao?: string;
  ultimaAtualizacao: string;
}

export interface ItemToalha {
  id: string;
  codigo: string;
  nome: string;
  tipo: 'Toalhas do Altar' | 'Toalhas do Santíssimo' | 'Toalhas da Comunhão' | 'Pálio/Conopéu';
  status: 'em_uso' | 'aguardando_lavagem' | 'passar' | 'guardada' | 'em_manutencao';
  corLiturgica?: string;
  localizacao: string;
  observacao?: string;
  ultimaAtualizacao: string;
}

export interface ItemParamento {
  id: string;
  codigo: string;
  nome: string;
  tipo: 'Véu de Cálice' | 'Casula' | 'Alva' | 'Estola' | 'Capa de Asperges';
  corLiturgica: 'Verde' | 'Roxo' | 'Branco' | 'Vermelho' | 'Rosa' | 'Dourado';
  status: 'em_uso' | 'guardado' | 'em_manutencao' | 'lavanderia';
  localizacao: string;
  observacao?: string;
  ultimaAtualizacao: string;
}

export interface ItemVasoSagrado {
  id: string;
  codigo: string;
  nome: string;
  tipo: 'Cálice' | 'Patena' | 'Âmbula (Cibório)' | 'Galhetas' | 'Custódia/Ostensório' | 'Teca';
  material: string;
  status: 'em_uso' | 'guardado' | 'em_manutencao' | 'higienizacao';
  localizacao: string;
  observacao?: string;
  ultimaAtualizacao: string;
}

export interface ItemConsumivel {
  id: string;
  nome: string;
  tipo: 'hostias' | 'vinho' | 'incenso' | 'carvao';
  quantidadeAtual: number;
  unidadeMedida: 'unidades' | 'garrafas' | 'gramas';
  capacidadeMaxima: number;
  taxaConsumoPorDia?: number;
  taxaConsumoPorCelebracao: number;
  alertaMinimo: number;
  observacao?: string;
}

export interface ItemDecoracao {
  id: string;
  codigo: string;
  nome: string;
  tipo: 'Tapete' | 'Suporte' | 'Banquinho' | 'Quadro Sacro' | 'Imagem Sacra' | 'Castiçal';
  status: 'em_uso' | 'guardado' | 'em_manutencao';
  localizacao: string;
  observacao?: string;
  ultimaAtualizacao: string;
}

export interface SacristiaState {
  alfaias: ItemAlfaia[];
  toalhas: ItemToalha[];
  paramentos: ItemParamento[];
  vasos: ItemVasoSagrado[];
  consumiveis: ItemConsumivel[];
  decoracoes: ItemDecoracao[];
}
