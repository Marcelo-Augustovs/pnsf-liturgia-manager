import {
  FormaMissa,
  TempoLiturgico,
  GrauCelebracao,
  PassoMissa,
  CategoriaInfo
} from '@/types/ritosMissa';

export const FORMAS_MISSA: FormaMissa[] = [
  {
    id: 'ordinaria',
    nome: 'Forma Ordinária',
    descricao: 'Ritual pós-Concílio Vaticano II (Missal de São Paulo VI), celebrado no idioma vernáculo com o sacerdote voltado para o povo (Versus Populum).',
    badgeLabel: 'Pós-Vaticano II'
  },
  {
    id: 'ad_orientem',
    nome: 'Ad Orientem',
    descricao: 'Forma Ordinária do Missal Romano celebrada com o sacerdote e a assembleia voltados para o Oriente (Tabernáculo/Cruz), simbolizando a expectativa da vinda de Cristo.',
    badgeLabel: 'Volto ao Oriente'
  },
  {
    id: 'extraordinaria',
    nome: 'Extraordinária',
    descricao: 'Usus Antiquior / Missa Tridentina (Missal de São João XXIII - 1962), celebrada em Latim e Rito Tradicional de São Pio V.',
    badgeLabel: 'Rito Tridentino'
  }
];

export const TEMPOS_LITURGICOS: TempoLiturgico[] = [
  {
    id: 'quaresma',
    nome: 'Quaresma',
    corLiturgica: {
      name: 'Roxo Litúrgico',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-800',
      badgeBorder: 'border-purple-300',
      accentColor: 'text-purple-700',
      dotBg: 'bg-purple-600',
      hex: '#7E22CE'
    },
    descricao: 'Tempo de 40 dias de conversão, oração, jejum e caridade em preparação para a Páscoa da Ressurreição. Ouve-se a palavra sem o cântico do Glória nem do Aleluia.',
    periodo: 'Quarta-feira de Cinzas até a Quinta-feira Santa (Tarde)'
  },
  {
    id: 'pascoa',
    nome: 'Tempo Pascal',
    corLiturgica: {
      name: 'Branco / Dourado',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
      badgeBorder: 'border-amber-300',
      accentColor: 'text-amber-700',
      dotBg: 'bg-amber-500',
      hex: '#D97706'
    },
    descricao: 'Cinquenta dias de júbilo e festa celebrando a Ressurreição do Senhor até o Domingo de Pentecostes. Ressoa o solene Aleluia pascal.',
    periodo: 'Domingo da Ressurreição até Pentecostes'
  },
  {
    id: 'tempo_comum',
    nome: 'Tempo Comum',
    corLiturgica: {
      name: 'Verde Litúrgico',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      badgeBorder: 'border-emerald-300',
      accentColor: 'text-emerald-700',
      dotBg: 'bg-emerald-600',
      hex: '#059669'
    },
    descricao: '33 ou 34 semanas onde a Igreja contempla o próprio Mistério de Cristo em sua plenitude e ensinamentos cotidianos.',
    periodo: 'Entre os Ciclos do Advento/Natal e Quaresma/Páscoa'
  },
  {
    id: 'advento',
    nome: 'Advento',
    corLiturgica: {
      name: 'Roxo / Violáceo',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-800',
      badgeBorder: 'border-purple-300',
      accentColor: 'text-purple-700',
      dotBg: 'bg-purple-600',
      hex: '#6B21A8'
    },
    descricao: 'Quatro semanas de piedosa e alegre expectativa para o Nascimento de Jesus no Natal e sua Segunda Vinda Gloriosa.',
    periodo: 'Início do Ano Litúrgico até a Véspera de Natal'
  }
];

export const GRAUS_CELEBRACAO: GrauCelebracao[] = [
  {
    id: 'solenidade',
    nome: 'Solenidade',
    descricao: 'Grau máximo de celebração. Possui 3 leituras, Glória e Profissão de Fé (Creio).',
    hierarquia: 'Grau 1'
  },
  {
    id: 'festa',
    nome: 'Festa',
    descricao: 'Celebração de grande importância (Apóstolos, Evangelistas, eventos do Senhor). Possui Glória e 2 leituras.',
    hierarquia: 'Grau 2'
  },
  {
    id: 'memoria',
    nome: 'Memória Obrigatória',
    descricao: 'Recordação litúrgica dos Santos e Mártires integrada no ritmo do dia.',
    hierarquia: 'Grau 3'
  },
  {
    id: 'datas_moveis',
    nome: 'Datas Móveis',
    descricao: 'Celebrações que variam a data a cada ano conforme o cômputo da Páscoa (ex: Cinzas, Ramos, Corpus Christi).',
    hierarquia: 'Variável'
  }
];

export const CATEGORIAS_RITO: CategoriaInfo[] = [
  {
    id: 'ritos_iniciais',
    nome: 'Ritos Iniciais',
    descricao: 'Abertura da celebração, reunião da assembleia e preparação dos corações.',
    iconName: 'Church'
  },
  {
    id: 'liturgia_palavra',
    nome: 'Liturgia da Palavra',
    descricao: 'Deus fala ao seu povo através das Escrituras e da Homilia.',
    iconName: 'BookOpen'
  },
  {
    id: 'liturgia_eucaristica',
    nome: 'Liturgia Eucarística',
    descricao: 'Abertura da Ceia do Senhor: Ofertório, Oração Eucarística e Comunhão.',
    iconName: 'Sparkles'
  },
  {
    id: 'ritos_finais',
    nome: 'Ritos Finais',
    descricao: 'Bênção apostólica e envio dos fiéis em missão no mundo.',
    iconName: 'CheckCircle2'
  }
];

export const PASSOS_MISSA: PassoMissa[] = [
  // 1. RITOS INICIAIS
  {
    id: 'procissao_entrada',
    numero: 1,
    categoria: 'ritos_iniciais',
    categoriaNome: 'Ritos Iniciais',
    titulo: 'Procissão de Entrada e Cântico',
    subtitulo: 'Reunião do Povo de Deus',
    descricao: 'O sacerdote celebrante e os ministros sobem ao presbitério enquanto a assembleia entoa o Cântico de Entrada.',
    rubrica: 'Na Quaresma, os cantos devem ser mais sóbrios e sem o acompanhamento de instrumentos ruidosos. O altar é venerado com a inclinação e o beijo do sacerdote.',
    textos: [
      'Entrando o sacerdote com os ministros, entoa-se o canto de entrada.',
      'Chegando ao presbitério, o sacerdote e os ministros fazem a profunda inclinação ao altar e o sacerdote beija o altar em sinal de reverência a Cristo.'
    ],
    items: [
      'Cruz Processional à frente acompanhada pelas velas',
      'Leitor ou Diácono trazendo o Evangeliário (se houver)',
      'Sacerdote Celebrante e Concelebrantes',
      'Veneração do Altar (Inclinação e Beijo)'
    ],
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1548625361-185966374a2b?q=80&w=1200&auto=format&fit=crop',
      caption: 'Procissão solene de entrada com veneração do Altar Litúrgico.'
    },
    iconName: 'Church'
  },
  {
    id: 'saudacao_inicial',
    numero: 2,
    categoria: 'ritos_iniciais',
    categoriaNome: 'Ritos Iniciais',
    titulo: 'Sinal da Cruz e Saudação Litúrgica',
    subtitulo: 'Em Nome do Pai, do Filho e do Espírito Santo',
    descricao: 'O celebrante e a assembleia traçam sobre si o Sinal da Cruz, invocando a Santíssima Trindade.',
    rubrica: 'O sacerdote de mãos estendidas saúda o povo com uma das fórmulas paulinas (ex: "A graça de nosso Senhor Jesus Cristo...").',
    textos: [
      'Sacerdote: Em nome do Pai, e do Filho e do Espírito Santo.',
      'Povo: Amém.',
      'Sacerdote: A graça de nosso Senhor Jesus Cristo, o amor do Pai e a comunhão do Espírito Santo estejam convosco.',
      'Povo: Bendito seja Deus que nos reuniu no amor de Cristo.'
    ],
    items: [
      'Invocação Trinitária',
      'Saudação do Bispo ou Presbítero',
      'Acolhida da Comunidade'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'ato_penitencial',
    numero: 3,
    categoria: 'ritos_iniciais',
    categoriaNome: 'Ritos Iniciais',
    titulo: 'Ato Penitencial',
    subtitulo: 'Reconhecimento de nossas falhas',
    descricao: 'O sacerdote convida os fiéis a reconhecerem seus pecados para celebrarem dignamente os sagrados mistérios.',
    rubrica: 'Na Quaresma, este momento ganha especial profundidade meditativa. Pode-se usar o Confesso a Deus Todo-Poderoso (Confiteor) ou a aspersão da água abençoada.',
    textos: [
      'Confesso a Deus Todo-Poderoso e a vós, irmãos e irmãs, que pequei muitas vezes por pensamentos e palavras, atos e omissões...',
      'Por minha culpa, minha tão grande culpa. E peço à Virgem Maria, aos Anjos e Santos, e a vós, irmãos e irmãs, que rogueis por mim a Deus, nosso Senhor.'
    ],
    items: [
      'Momento de silêncio interior',
      'Fórmula Confiteor ou Invocações Tropadas',
      'Absolvição Secundária ("Deus todo-poderoso tenha compaixão de nós...")'
    ],
    media: {
      type: 'video',
      url: 'https://www.youtube.com/embed/8-W1qM0u8_M',
      caption: 'Exemplo meditativo do Ato Penitencial e Kyrie Eleison.'
    },
    iconName: 'Clock'
  },
  {
    id: 'kyrie_eleison',
    numero: 4,
    categoria: 'ritos_iniciais',
    categoriaNome: 'Ritos Iniciais',
    titulo: 'Senhor, Tende Piedade (Kyrie Eleison)',
    subtitulo: 'Súplica da Misericórdia',
    descricao: 'Aclamação a Cristo Nosso Senhor implorando a sua misericórdia.',
    rubrica: 'Se as invocações do Kyrie não foram incluídas no Ato Penitencial, recitam-se ou cantam-se as aclamações.',
    textos: [
      'V. Senhor, tende piedade de nós. - R. Senhor, tende piedade de nós.',
      'V. Cristo, tende piedade de nós. - R. Cristo, tende piedade de nós.',
      'V. Senhor, tende piedade de nós. - R. Senhor, tende piedade de nós.'
    ],
    items: [
      'Cântico em vernáculo ou grego original (Kyrie Eleison)',
      'Impostação coral ou diálogo com a assembleia'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'gloria',
    numero: 5,
    categoria: 'ritos_iniciais',
    categoriaNome: 'Ritos Iniciais',
    titulo: 'Hino do Glória (Gloria in Excelsis)',
    subtitulo: 'Louvor a Deus Pai e ao Cordeiro',
    descricao: 'Venerável e antigo hino com que a Igreja glorifica a Deus Pai e ao Cordeiro.',
    rubrica: 'ATENÇÃO LITÚRGICA: O Glória NÃO é cantado nem recitado durante a Quaresma e o Advento (exceto em Solenidades e Festas ocorrentes nesses tempos). No Tempo Comum e Pascal é obrigatório aos domingos.',
    textos: [
      'Glória a Deus nas alturas, e paz na terra aos homens por Ele amados.',
      'Senhor Deus, Rei dos céus, Deus Pai todo-poderoso: nós vos louvamos, vos bendizemos, vos adoramos, vos glorificamos...'
    ],
    items: [
      'Omite-se na Quaresma e Advento',
      'Cantado nos Domingos fora do Advento/Quaresma e nas Solenidades/Festas'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'oracao_coleta',
    numero: 6,
    categoria: 'ritos_iniciais',
    categoriaNome: 'Ritos Iniciais',
    titulo: 'Oração Coleta',
    subtitulo: 'Oração Inicial da Missa',
    descricao: 'O sacerdote convida o povo a orar, faz uma pausa de silêncio e recita a oração própria do dia que recolhe as intenções de todos.',
    rubrica: 'O sacerdote orante de mãos estendidas (posição de orante). Conclui-se com a doxologia Trinitária longa.',
    textos: [
      'Sacerdote: Oremos... (pausa em silêncio).',
      'Oração própria do Missal Romano conforme o Domingo / Feira.',
      'Povo responde no fim: Amém.'
    ],
    items: [
      'Silêncio meditativo após o "Oremos"',
      'Doxologia Trinitária final',
      'Assembleia senta-se após o Amém'
    ],
    iconName: 'BookOpen'
  },

  // 2. LITURGIA DA PALAVRA
  {
    id: 'primeira_leitura',
    numero: 7,
    categoria: 'liturgia_palavra',
    categoriaNome: 'Liturgia da Palavra',
    titulo: 'Primeira Leitura',
    subtitulo: 'Leitura do Antigo Testamento (ou Atos na Páscoa)',
    descricao: 'Proclamação do texto sagrado no Ambão pelo Leitor instituído ou fiel preparado.',
    rubrica: 'Todos escutam sentados. Na Quaresma, os textos enfatizam a Aliança, os Profetas e o itinerário de conversão.',
    textos: [
      'Leitor: Leitura do Livro do Profeta Isaías...',
      'No final: Palavra do Senhor.',
      'Povo: Graças a Deus.'
    ],
    items: [
      'Proclamado a partir do Ambão (Mesa da Palavra)',
      'Assembleia atenta e sentada'
    ],
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
      caption: 'Proclamação da Sagrada Escritura no Ambão.'
    },
    iconName: 'BookOpen'
  },
  {
    id: 'salmo_responsorial',
    numero: 8,
    categoria: 'liturgia_palavra',
    categoriaNome: 'Liturgia da Palavra',
    titulo: 'Salmo Responsorial',
    subtitulo: 'Resposta orante da Assembleia',
    descricao: 'Cântico meditado que responde à Primeira Leitura, guiado pelo Salmista.',
    rubrica: 'O Salmista canta os versículos do salmo no ambão e a assembleia intercala com o refrão proposto.',
    textos: [
      'Refrão do Salmo repetido pela assembleia.',
      'Estrofes cantadas com calma e clareza pelo Salmista.'
    ],
    items: [
      'Resposta direta à Primeira Leitura',
      'Preferencialmente cantado'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'segunda_leitura',
    numero: 9,
    categoria: 'liturgia_palavra',
    categoriaNome: 'Liturgia da Palavra',
    titulo: 'Segunda Leitura',
    subtitulo: 'Escritos Apostólicos (Epístolas / Apocalipse)',
    descricao: 'Proclamação das cartas dos Apóstolos (São Paulo, São Pedro, São João, etc.) aos domingos e solenidades.',
    rubrica: 'Nas memórias e dias da semana, omite-se a Segunda Leitura, passando do Salmo diretamente para o Evangelho.',
    textos: [
      'Leitor: Leitura da Primeira Carta de São Paulo aos Coríntios...',
      'No final: Palavra do Senhor.',
      'Povo: Graças a Deus.'
    ],
    items: [
      'Presente nos Domingos e Solenidades',
      'Proclamado por leitor no Ambão'
    ],
    iconName: 'BookOpen'
  },
  {
    id: 'aclamacao_evangelho',
    numero: 10,
    categoria: 'liturgia_palavra',
    categoriaNome: 'Liturgia da Palavra',
    titulo: 'Aclamação ao Evangelho',
    subtitulo: 'Aleluia / Versículo Quaresmal',
    descricao: 'A assembleia se põe de pé para saudar o Senhor que vai falar no Santo Evangelho.',
    rubrica: 'RUBRICA QUARESMAL CRÍTICA: Durante a Quaresma NÃO se canta o Aleluia. Em seu lugar canta-se um verso como: "Louvor e glória a vós, Senhor, Cristo Palavra de Deus!". No Tempo Comum e Pascal canta-se o Aleluia.',
    textos: [
      'Tempo Comum/Pascal: Aleluia, Aleluia, Aleluia!',
      'Quaresma: Louvor a vós, Ó Cristo, Rei da eterna glória!',
      'Versículo próprio do dia proclama a mensagem central do Evangelho.'
    ],
    items: [
      'Assembleia de pé',
      'Procissão com o Evangeliário, velas e incenso (nas missas solenes)'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'proclamacao_evangelho',
    numero: 11,
    categoria: 'liturgia_palavra',
    categoriaNome: 'Liturgia da Palavra',
    titulo: 'Proclamação do Santo Evangelho',
    subtitulo: 'Cume da Liturgia da Palavra',
    descricao: 'O Diácono ou Sacerdote proclama os ensinamentos e atos de Jesus Cristo.',
    rubrica: 'O ministro traça a cruz sobre o livro e sobre a testa, lábios e peito. Se houver incensação, incensa o livro com 3 lances duplos.',
    textos: [
      'Sacerdote: O Senhor esteja convosco. - Povo: Ele está no meio de nós.',
      'Sacerdote: Proclamação do Evangelho de Jesus Cristo segundo Mateus.',
      'Povo: Glória a vós, Senhor.',
      'No fim: Palavra da Salvação. - Povo: Glória a vós, Senhor.'
    ],
    items: [
      'Reservado ao Diácono ou Presbítero',
      'Veneração e Beijo do Evangeliário no final',
      'Missa Tridentina/Ad Orientem: Proclamado voltado ao Norte/Leste'
    ],
    iconName: 'BookOpen'
  },
  {
    id: 'homilia',
    numero: 12,
    categoria: 'liturgia_palavra',
    categoriaNome: 'Liturgia da Palavra',
    titulo: 'Homilia',
    subtitulo: 'Explanação da Palavra de Deus',
    descricao: 'O Bispo, Presbítero ou Diácono explica as leituras sagradas aplicando-as à vida dos fiéis.',
    rubrica: 'Obrigatória nos domingos e festas. Segue-se breve tempo de silêncio meditativo.',
    textos: [
      'A homilia deve ser uma explicação viva do mistério celebrado e das necessidades da comunidade.'
    ],
    items: [
      'Proferida pelo Bispo, Padre ou Diácono',
      'Assembleia sentada'
    ],
    iconName: 'Calendar'
  },
  {
    id: 'profissao_fe',
    numero: 13,
    categoria: 'liturgia_palavra',
    categoriaNome: 'Liturgia da Palavra',
    titulo: 'Profissão de Fé (Creio / Credo)',
    subtitulo: 'Símbolo Niceno-Constantinopolitano ou dos Apóstolos',
    descricao: 'A comunidade de pé professa as verdades da fé católica.',
    rubrica: 'Recitado nos Domingos e Solenidades. Todos fazem profunda inclinação às palavras "e se encarnou pelo Espírito Santo... e se fez homem".',
    textos: [
      'Creio em um só Deus, Pai Todo-Poderoso, Criador do céu e da terra...',
      'E em Jesus Cristo, seu único Filho, nosso Senhor...'
    ],
    items: [
      'Símbolo Niceno-Constantinopolitano ou Apostólico',
      'Inclinação na Encarnação'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'oracao_fiei',
    numero: 14,
    categoria: 'liturgia_palavra',
    categoriaNome: 'Liturgia da Palavra',
    titulo: 'Oração dos Fiéis (Oração Universal)',
    subtitulo: 'Intercessão da Igreja pelo mundo',
    descricao: 'O povo responde exercendo seu sacerdócio batismal, rezando pelas necessidades da Igreja e da humanidade.',
    rubrica: 'O sacerdote introduz e conclui com a oração. O leitor propõe as intenções a partir do ambão.',
    textos: [
      'Leitor: Pela Santa Igreja, pelo Papa N. e nossos Bispos... rezemos ao Senhor.',
      'Povo: Senhor, escutai a nossa oração.'
    ],
    items: [
      'Intenções pela Igreja, governantes, doentes e comunidade',
      'Sacerdote conclui com a oração de fecho'
    ],
    iconName: 'Clock'
  },

  // 3. LITURGIA EUCARÍSTICA
  {
    id: 'preparacao_oferendas',
    numero: 15,
    categoria: 'liturgia_eucaristica',
    categoriaNome: 'Liturgia Eucarística',
    titulo: 'Preparação do Altar e das Oferendas',
    subtitulo: 'Ofertório: Pão e Vinho',
    descricao: 'Apresentação do pão e vinho no altar acompanhada do cântico de ofertório e da coleta de dons.',
    rubrica: 'O sacerdote apresenta a patena com o pão e o cálice com o vinho misturado com gotas de água. Lava as mãos (Lavabo) rezando em silêncio.',
    textos: [
      'Bendito sejais, Senhor, Deus do universo, pelo pão que recebemos de vossa bondade...',
      'Bendito sejais, Senhor, Deus do universo, pelo vinho que recebemos de vossa bondade...',
      'Sacerdote: Orai, irmãos e irmãs, para que o meu e vosso sacrifício seja aceito por Deus Pai todo-poderoso.'
    ],
    items: [
      'Procissão dos Dons (Pão e Vinho)',
      'Mistura de água no vinho (Mistério da Encarnação)',
      'Lavabo (Purificação das mãos do sacerdote)'
    ],
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop',
      caption: 'Apresentação das oferendas de Pão e Vinho no Altar.'
    },
    iconName: 'Sparkles'
  },
  {
    id: 'oracao_eucaristica',
    numero: 16,
    categoria: 'liturgia_eucaristica',
    categoriaNome: 'Liturgia Eucarística',
    titulo: 'Oração Eucarística (Anáfora)',
    subtitulo: 'Coração e Cume de toda a Celebração',
    descricao: 'Oração de ação de graças e consagração. O pão e vinho transubstanciam-se no Corpo e Sangue de Cristo.',
    rubrica: 'Inicia-se com o Prefácio e o Cântico do Santo (Sanctus). Durante a Consagração, a assembleia ajoelha-se. Toca-se a sineta nas elevações da Hóstia e do Cálice.',
    textos: [
      'Prefácio -> Santo, Santo, Santo é o Senhor...',
      'Epiclese: Invocação do Espírito Santo sobre as oferendas.',
      'Consagração: "TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO..." / "TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE..."',
      'Anamnese e Doxologia Final: "Por Cristo, com Cristo, em Cristo..."'
    ],
    items: [
      'Prefácio próprio do Tempo Litúrgico',
      'Santo (Sanctus)',
      'Consagração da Hóstia e do Cálice',
      'Genuflexão do Sacerdote e toque de sineta',
      'Grande Amém da Assembleia'
    ],
    media: {
      type: 'video',
      url: 'https://www.youtube.com/embed/8-W1qM0u8_M',
      caption: 'Momento Solene da Oração Eucarística e Consagração.'
    },
    iconName: 'Sparkles'
  },
  {
    id: 'rito_comunhao',
    numero: 17,
    categoria: 'liturgia_eucaristica',
    categoriaNome: 'Liturgia Eucarística',
    titulo: 'Rito da Comunhão & Pai Nosso',
    subtitulo: 'Banquete Sagrado',
    descricao: 'Preparação imediata para receber a Sagrada Comunhão com a oração que Jesus nos ensinou.',
    rubrica: 'Todos rezam ou cantam o Pai Nosso de pé. Segue-se a Oração pela Paz e a Fração do Pão ao som do Cordeiro de Deus (Agnus Dei).',
    textos: [
      'Pai Nosso, que estais nos céus, santificado seja o vosso nome...',
      'Cordeiro de Deus, que tirais o pecado do mundo, tende piedade de nós...',
      'Sacerdote: Eis o Cordeiro de Deus, que tira o pecado do mundo.',
      'Povo: Senhor, eu não sou digno(a) de que entreis em minha morada, mas dizei uma palavra e serei salvo(a).'
    ],
    items: [
      'Oração do Pai Nosso',
      'Saudação da Paz (conforme as orientações pastorais)',
      'Fração da Hóstia e comixtão',
      'Distribuição da Comunhão aos fiéis'
    ],
    iconName: 'CheckCircle2'
  },

  // 4. RITOS FINAIS
  {
    id: 'avisos_paroquiais',
    numero: 18,
    categoria: 'ritos_finais',
    categoriaNome: 'Ritos Finais',
    titulo: 'Avisos Comunidários',
    subtitulo: 'Informações da Vida Paroquial',
    descricao: 'Breves comunicações à comunidade sobre as atividades pastorais e horários de missas.',
    rubrica: 'Devem ser breves para não comprometer o clima litúrgico.',
    textos: [
      'Leito ou Sacerdote comunica os avisos principais da semana.'
    ],
    items: [
      'Horários de Confissões e Atividades',
      'Eventos da Paróquia'
    ],
    iconName: 'Calendar'
  },
  {
    id: 'bencao_final',
    numero: 19,
    categoria: 'ritos_finais',
    categoriaNome: 'Ritos Finais',
    titulo: 'Bênção Final e Despedida',
    subtitulo: 'Envio em Missão (Ite, Missa Est)',
    descricao: 'O sacerdote abençoa o povo e o envia a testemunhar o Evangelho no cotidiano.',
    rubrica: 'Em Solenidades e no Tempo Pascal/Quaresmal, pode-se utilizar a Bênção Solene sobre o Povo ou a Oração sobre a Comunidade.',
    textos: [
      'Sacerdote: O Senhor esteja convosco. - Povo: Ele está no meio de nós.',
      'Sacerdote: Abençoe-vos Deus todo-poderoso, Pai e Filho e Espírito Santo. - Povo: Amém.',
      'Sacerdote/Diácono: Ide em paz e o Senhor vos acompanhe. - Povo: Graças a Deus.'
    ],
    items: [
      'Bênção Trinitária com o Sinal da Cruz',
      'Despedida Litúrgica',
      'Beijo final do Altar pelo Sacerdote'
    ],
    iconName: 'Church'
  }
];
