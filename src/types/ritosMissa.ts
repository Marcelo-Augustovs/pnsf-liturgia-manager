export type FormaCelebracao = 'ordinaria' | 'ad_orientem' | 'extraordinaria';

export type TempoLiturgico = 'quaresma' | 'pascal' | 'comum' | 'advento';

export type GrauCelebracao = 'solenidade' | 'festa' | 'memoria' | 'datas_moveis' | 'domingo';

export type GrupoRito = 'iniciais' | 'palavra' | 'eucaristica' | 'finais';

export interface MediaContent {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface PassoRito {
  id: string;
  numero: number;
  titulo: string;
  subTitulo?: string;
  descricao?: string;
  rubrica?: string;
  textos?: string[];
  items?: string[];
  media?: MediaContent;
  iconName?: string;
}

export interface RitosGrupos {
  iniciais: PassoRito[];
  palavra: PassoRito[];
  eucaristica: PassoRito[];
  finais: PassoRito[];
}

export interface Celebracao {
  id: string;
  nome: string; // Ex: "1º Domingo da Quaresma", "Corpus Christi"
  descricaoBreve?: string;
  forma: FormaCelebracao;
  tempoLiturgico: TempoLiturgico;
  grauCelebracao: GrauCelebracao;
  ritos: RitosGrupos;
}

export interface FiltrosMissa {
  forma: FormaCelebracao;
  tempo: TempoLiturgico;
  grau?: GrauCelebracao | 'todos';
}

export interface TempoLiturgicoMetadata {
  id: TempoLiturgico;
  nome: string;
  descricao: string;
  periodo: string;
  corLiturgica: {
    name: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    accentColor: string;
    dotBg: string;
    hex: string;
  };
}

export interface FormaCelebracaoOption {
  id: FormaCelebracao;
  nome: string;
  descricao: string;
  badgeLabel: string;
}

export interface GrauCelebracaoOption {
  id: GrauCelebracao | 'todos';
  nome: string;
  descricao?: string;
}

export interface GrupoRitoInfo {
  id: GrupoRito;
  nome: string;
  descricao: string;
  iconName: string;
}
