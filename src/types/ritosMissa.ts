export type FormaMissaId = 'ordinaria' | 'ad_orientem' | 'extraordinaria';

export type TempoLiturgicoId = 'quaresma' | 'pascoa' | 'tempo_comum' | 'advento';

export type GrauCelebracaoId = 'solenidade' | 'festa' | 'memoria' | 'datas_moveis';

export type CategoriaRito = 'ritos_iniciais' | 'liturgia_palavra' | 'liturgia_eucaristica' | 'ritos_finais';

export interface MediaContent {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface LiturgicalColorInfo {
  name: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentColor: string;
  dotBg: string;
  hex: string;
}

export interface FormaMissa {
  id: FormaMissaId;
  nome: string;
  descricao: string;
  badgeLabel: string;
}

export interface TempoLiturgico {
  id: TempoLiturgicoId;
  nome: string;
  corLiturgica: LiturgicalColorInfo;
  descricao: string;
  periodo: string;
}

export interface GrauCelebracao {
  id: GrauCelebracaoId;
  nome: string;
  descricao: string;
  hierarquia: string;
}

export interface PassoMissa {
  id: string;
  numero: number;
  categoria: CategoriaRito;
  categoriaNome: string;
  titulo: string;
  subtitulo?: string;
  descricao?: string;
  rubrica?: string;
  textos?: string[];
  items?: string[];
  media?: MediaContent;
  iconName?: string;
  formasSuportadas?: FormaMissaId[];
  temposEspecificos?: TempoLiturgicoId[];
}

export interface CategoriaInfo {
  id: CategoriaRito;
  nome: string;
  descricao: string;
  iconName: string;
}
