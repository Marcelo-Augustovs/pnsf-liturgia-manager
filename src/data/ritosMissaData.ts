import {
  Celebracao,
  FormaCelebracaoOption,
  TempoLiturgicoMetadata,
  GrauCelebracaoOption,
  GrupoRitoInfo
} from '@/types/ritosMissa';

export const FORMAS_CELEBRACAO_OPTIONS: FormaCelebracaoOption[] = [
  {
    id: 'ordinaria',
    nome: 'Forma Ordinária',
    descricao: 'Ritual pós-Concílio Vaticano II (Missal de São Paulo VI), celebrado no idioma vernáculo com o sacerdote voltado para o povo (Versus Populum).',
    badgeLabel: 'Pós-Vaticano II'
  },
  {
    id: 'ad_orientem',
    nome: 'Ad Orientem',
    descricao: 'Forma Ordinária do Missal Romano celebrada com o sacerdote e a assembleia voltados para o Oriente (Cruz/Tabernáculo).',
    badgeLabel: 'Volto ao Oriente'
  },
  {
    id: 'extraordinaria',
    nome: 'Extraordinária',
    descricao: 'Usus Antiquior / Missa Tridentina (Missal de São João XXIII - 1962), celebrada em Latim e Rito Tradicional de São Pio V.',
    badgeLabel: 'Rito Tridentino'
  }
];

export const TEMPOS_LITURGICOS_OPTIONS: Record<string, TempoLiturgicoMetadata> = {
  quaresma: {
    id: 'quaresma',
    nome: 'Quaresma',
    descricao: 'Tempo de 40 dias de conversão, oração, jejum e caridade em preparação para a Páscoa da Ressurreição. Ouve-se a palavra sem o cântico do Glória nem do Aleluia.',
    periodo: 'Quarta-feira de Cinzas até a Quinta-feira Santa (Tarde)',
    corLiturgica: {
      name: 'Roxo Litúrgico',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-900',
      badgeBorder: 'border-purple-300',
      accentColor: 'text-purple-700',
      dotBg: 'bg-purple-600',
      hex: '#7E22CE'
    }
  },
  pascal: {
    id: 'pascal',
    nome: 'Tempo Pascal',
    descricao: 'Cinquenta dias de júbilo e festa celebrando a Ressurreição do Senhor até o Domingo de Pentecostes. Ressoa o solene Aleluia pascal.',
    periodo: 'Domingo da Ressurreição até Pentecostes',
    corLiturgica: {
      name: 'Branco / Dourado',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-900',
      badgeBorder: 'border-amber-300',
      accentColor: 'text-amber-700',
      dotBg: 'bg-amber-500',
      hex: '#D97706'
    }
  },
  comum: {
    id: 'comum',
    nome: 'Tempo Comum',
    descricao: '33 ou 34 semanas onde a Igreja contempla o próprio Mistério de Cristo em sua plenitude e ensinamentos cotidianos.',
    periodo: 'Entre os Ciclos do Advento/Natal e Quaresma/Páscoa',
    corLiturgica: {
      name: 'Verde Litúrgico',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-900',
      badgeBorder: 'border-emerald-300',
      accentColor: 'text-emerald-700',
      dotBg: 'bg-emerald-600',
      hex: '#059669'
    }
  },
  advento: {
    id: 'advento',
    nome: 'Advento',
    descricao: 'Quatro semanas de piedosa e alegre expectativa para o Nascimento de Jesus no Natal e sua Segunda Vinda Gloriosa.',
    periodo: 'Início do Ano Litúrgico até a Véspera de Natal',
    corLiturgica: {
      name: 'Roxo / Violáceo',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-900',
      badgeBorder: 'border-purple-300',
      accentColor: 'text-purple-700',
      dotBg: 'bg-purple-600',
      hex: '#6B21A8'
    }
  }
};

export const GRAUS_CELEBRACAO_OPTIONS: GrauCelebracaoOption[] = [
  { id: 'todos', nome: 'Todos os Graus' },
  { id: 'solenidade', nome: 'Solenidade', descricao: 'Grau máximo de celebração. Possui 3 leituras, Glória e Profissão de Fé (Creio).' },
  { id: 'festa', nome: 'Festa', descricao: 'Celebração de grande importância. Possui Glória e 2 leituras.' },
  { id: 'memoria', nome: 'Memória Obrigatória', descricao: 'Recordação litúrgica dos Santos e Mártires.' },
  { id: 'datas_moveis', nome: 'Datas Móveis', descricao: 'Celebrações que variam a data a cada ano conforme o cômputo da Páscoa.' },
  { id: 'domingo', nome: 'Domingo', descricao: 'Dia do Senhor e Páscoa semanal da Igreja.' }
];

export const GRUPOS_RITO_INFO: Record<string, GrupoRitoInfo> = {
  iniciais: {
    id: 'iniciais',
    nome: 'Ritos Iniciais',
    descricao: 'Abertura da celebração, reunião da assembleia e preparação do coração.',
    iconName: 'Church'
  },
  palavra: {
    id: 'palavra',
    nome: 'Liturgia da Palavra',
    descricao: 'Deus fala ao seu povo através das Escrituras, Salmo, Homilia e Creio.',
    iconName: 'BookOpen'
  },
  eucaristica: {
    id: 'eucaristica',
    nome: 'Liturgia Eucarística',
    descricao: 'Ofertório, Oração Eucarística (Anáfora), Consagração e Comunhão.',
    iconName: 'Sparkles'
  },
  finais: {
    id: 'finais',
    nome: 'Ritos Finais',
    descricao: 'Avisos pastorais, Bênção Solene e envio dos fiéis em missão.',
    iconName: 'CheckCircle2'
  }
};

export const CELEBRACOES_DATA: Celebracao[] = [
  // 1. CELEBRAÇÃO: 1º DOMINGO DA QUARESMA
  {
    id: '1_domingo_quaresma',
    nome: '1º Domingo da Quaresma',
    descricaoBreve: 'Missa do Primeiro Domingo da Quaresma com ritos penitenciais próprios, omissão do Glória e Aclamação Quaresmal em vez do Aleluia.',
    forma: 'ordinaria',
    tempoLiturgico: 'quaresma',
    grauCelebracao: 'domingo',
    ritos: {
      iniciais: [
        {
          id: '1_dom_quar_procissao',
          numero: 1,
          titulo: 'Procissão de Entrada Penitencial',
          subTitulo: 'Entrada sóbria do Sacerdote e Ministros',
          descricao: 'O celebrante e os ministros sobem ao presbitério em silêncio reverente ou ao som de um cântico penitencial quaresmal.',
          rubrica: 'Na Quaresma, proíbe-se o uso de flores no altar e os instrumentos musicais devem apenas sustentar o canto. O altar é reverenciado com inclinação profunda e beijo.',
          textos: [
            'Cântico de Entrada: "Senhor, vós tendes compaixão de todos e não odiais nada do que fizestes..." (Sab 11,24)',
            'Sacerdote faz o Sinal da Cruz: Em nome do Pai e do Filho e do Espírito Santo. - Povo: Amém.'
          ],
          items: [
            'Cruz Processional velada ou sóbria sem ornamentos ruidosos',
            'Sacerdote trajando vestes roxas litúrgicas',
            'Veneração do Altar com beijo solene'
          ],
          media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1548625361-185966374a2b?q=80&w=1200&auto=format&fit=crop',
            caption: 'Entrada sobria e veneração do altar no tempo da Quaresma.'
          },
          iconName: 'Church'
        },
        {
          id: '1_dom_quar_ato_penitencial',
          numero: 2,
          titulo: 'Ato Penitencial Quaresmal',
          subTitulo: 'Invocações de Misericórdia (Kyrie Eleison)',
          descricao: 'Convocação da comunidade ao exame de consciência e ao pedido sincero de perdão.',
          rubrica: 'Usa-se a fórmula solene do Confesso a Deus Todo-Poderoso (Confiteor) seguida de breve silêncio interior.',
          textos: [
            'Sacerdote: Irmãos e irmãs, reconheçamos os nossos pecados, para celebrarmos dignamente os santos mistérios.',
            'Povo: Confesso a Deus Todo-Poderoso e a vós, irmãos e irmãs, que pequei muitas vezes por pensamentos e palavras, atos e omissões...'
          ],
          items: [
            'Breve exame de consciência em silêncio',
            'Sua culpa e batimento no peito durante a recitação',
            'Absolvição secundária: "Deus todo-poderoso tenha compaixão de nós..."'
          ],
          media: {
            type: 'video',
            url: 'https://www.youtube.com/embed/8-W1qM0u8_M',
            caption: 'Exemplo de Ato Penitencial e Súplica Kyrie Eleison.'
          },
          iconName: 'Clock'
        },
        {
          id: '1_dom_quar_omissao_gloria',
          numero: 3,
          titulo: 'Oração Coleta Quaresmal',
          subTitulo: 'Omissão do Glória e Oração Inicial',
          descricao: 'OMITE-SE O GLÓRIA durante todos os domingos da Quaresma. O sacerdote recita a Oração Coleta própria do 1º Domingo.',
          rubrica: 'ATENÇÃO LITÚRGICA: Não se canta o Glória. Após o Kyrie, o sacerdote diz imediatamente "Oremos..." para a Oração Coleta.',
          textos: [
            'Sacerdote: Oremos... Concedei-nos, ó Deus todo-poderoso, que, pela observância da Quaresma, progridamos no conhecimento do mistério de Cristo...',
            'Povo: Amém.'
          ],
          items: [
            'Hino do Glória OMITIDO',
            'Oração Coleta de mãos estendidas',
            'Assembleia senta-se para a Liturgia da Palavra'
          ],
          iconName: 'BookOpen'
        }
      ],
      palavra: [
        {
          id: '1_dom_quar_1leitura',
          numero: 4,
          titulo: 'Primeira Leitura (Gn 9,8-15)',
          subTitulo: 'A Aliança de Deus com Noé após o Flood',
          descricao: 'Deus estabelece sua aliança eterna com Noé, seus descendentes e toda criatura vivente.',
          rubrica: 'Proclamada do Ambão pelo leitor preparado.',
          textos: [
            'Leitor: Leitura do Livro do Gênesis. "Eis o sinal da aliança que coloco entre mim e vós..."',
            'Leitor: Palavra do Senhor. - Povo: Graças a Deus.'
          ],
          items: [
            'Proclamação no Ambão',
            'Assembleia atenta e sentada'
          ],
          media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
            caption: 'Proclamação da Palavra no Ambão Litúrgico.'
          },
          iconName: 'BookOpen'
        },
        {
          id: '1_dom_quar_salmo',
          numero: 5,
          titulo: 'Salmo Responsorial (Salmo 24)',
          subTitulo: 'Vossos caminhos são verdade e amor',
          descricao: 'Resposta orante da comunidade pedindo a direção divina no deserto da vida.',
          rubrica: 'O salmista canta no ambão intercalando com a assembleia.',
          textos: [
            'Refrão: Verdade e amor são os caminhos do Senhor para quem guarda sua aliança.',
            'Mostrai-me, ó Senhor, os vossos caminhos, e ensinai-me as vossas veredas...'
          ],
          items: [
            'Salmo cantado meditativamente',
            'Assembleia responde com o refrão'
          ],
          iconName: 'Sparkles'
        },
        {
          id: '1_dom_quar_aclamacao',
          numero: 6,
          titulo: 'Aclamação ao Evangelho (Verso Quaresmal)',
          subTitulo: 'Omissão do Aleluia',
          descricao: 'Saudação ao Senhor no Evangelho das Tentações no Deserto.',
          rubrica: 'OMITE-SE O ALELUIA. Substitui-se por aclamações quaresmais como "Louvor a vós, ó Cristo, Rei da eterna glória!".',
          textos: [
            'Povo: Louvor e glória a vós, Senhor, Cristo, Palavra de Deus!',
            'Verso: O homem não vive somente de pão, mas de toda palavra que sai da boca de Deus.'
          ],
          items: [
            'Aleluia OMITIDO estritamente',
            'Assembleia de pé em aclamação'
          ],
          iconName: 'Sparkles'
        },
        {
          id: '1_dom_quar_evangelho',
          numero: 7,
          titulo: 'Evangelho segundo São Marcos (Mc 1,12-15)',
          subTitulo: 'Jesus tentado no deserto',
          descricao: 'O Espírito impulsiona Jesus ao deserto durante 40 dias, onde é tentado por Satanás.',
          rubrica: 'Proclamado por Diácono ou Sacerdote. Pode ser incensado nas missas solenes.',
          textos: [
            'Sacerdote: O Senhor esteja convosco. - Povo: Ele está no meio de nós.',
            'Sacerdote: Proclamação do Evangelho de Jesus Cristo segundo Marcos. - Povo: Glória a vós, Senhor.',
            'Texto: "Naquele tempo, o Espírito levou Jesus para o deserto. Ele ficou no deserto durante quarenta dias..."'
          ],
          items: [
            'Evangeliário beijado no final pelo celebrante',
            'Homilia focada na conversão e nas tentações'
          ],
          iconName: 'BookOpen'
        }
      ],
      eucaristica: [
        {
          id: '1_dom_quar_ofertorio',
          numero: 8,
          titulo: 'Apresentação das Oferendas',
          subTitulo: 'Ofertório Penitencial',
          descricao: 'Preparação do altar com o pão e o vinho e coleta para os pobres e a Igreja.',
          rubrica: 'O sacerdote oferece o pão e o vinho. Lava as mãos no Lavabo invocando a purificação dos pecados.',
          textos: [
            'Sacerdote: Bendito sejais, Senhor, Deus do universo, pelo pão que recebemos de vossa bondade...',
            'Sacerdote: Orai, irmãos e irmãs, para que o meu e vosso sacrifício seja aceito por Deus Pai todo-poderoso.'
          ],
          items: [
            'Procissão do Pão e Vinho',
            'Gotas de água adicionadas ao cálice',
            'Lavabo (Purificação das mãos)'
          ],
          media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop',
            caption: 'Preparação do Altar e das Oferendas do Ofertório.'
          },
          iconName: 'Sparkles'
        },
        {
          id: '1_dom_quar_anáfora',
          numero: 9,
          titulo: 'Oração Eucarística (Prefácio da Quaresma I)',
          subTitulo: 'A Consagração do Corpo e Sangue de Cristo',
          descricao: 'Anáfora com o Santo, Epiclese, Narrativa da Instituição e Doxologia Final.',
          rubrica: 'Assembleia de joelhos durante a consagração. Toque discreto da sineta nas elevações.',
          textos: [
            'Prefácio: "Na verdade, é justo e necessário... Vós concedeis aos vossos fiéis restaurar anualmente o coração com alegria..."',
            'Consagração: TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO...',
            'Consagração: TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE...'
          ],
          items: [
            'Cântico do Santo (Sanctus)',
            'Genuflexão do Sacerdote',
            'Grande Amém final da Assembleia'
          ],
          iconName: 'Sparkles'
        },
        {
          id: '1_dom_quar_comunhao',
          numero: 10,
          titulo: 'Rito da Comunhão',
          subTitulo: 'Pai Nosso e Banquete Sagrado',
          descricao: 'Oração do Pai Nosso, Cordeiro de Deus e distribuição da Eucaristia.',
          rubrica: 'Todos rezam o Pai Nosso de pé. Silêncio sagrado após a distribuição da Sagrada Comunhão.',
          textos: [
            'Pai Nosso, que estais nos céus...',
            'Cordeiro de Deus, que tirais o pecado do mundo, tende piedade de nós.',
            'Sacerdote: Eis o Cordeiro de Deus que tira o pecado do mundo.'
          ],
          items: [
            'Fração da Hóstia',
            'Distribuição da Comunhão',
            'Purificação dos Vasos Sagrados'
          ],
          iconName: 'CheckCircle2'
        }
      ],
      finais: [
        {
          id: '1_dom_quar_bencao',
          numero: 11,
          titulo: 'Oração sobre o Povo e Bênção Solene',
          subTitulo: 'Envio Quaresmal',
          descricao: 'O sacerdote estende as mãos sobre a assembleia com a Oração sobre o Povo e despede a comunidade.',
          rubrica: 'Na Quaresma pode-se usar a Oração sobre o Povo antes da Bênção Trinitária.',
          textos: [
            'Sacerdote: Abençoe-vos Deus todo-poderoso, Pai e Filho e Espírito Santo. - Povo: Amém.',
            'Sacerdote: Ide em paz e o Senhor vos acompanhe. - Povo: Graças a Deus.'
          ],
          items: [
            'Oração de Intercessão sobre a Comunidade',
            'Bênção Trinitária',
            'Veneração final do Altar'
          ],
          iconName: 'Church'
        }
      ]
    }
  },

  // 2. CELEBRAÇÃO: CORPUS CHRISTI
  {
    id: 'corpus_christi',
    nome: 'Corpus Christi',
    descricaoBreve: 'Solenidade do Santíssimo Corpo e Sangue de Cristo com Cântico do Glória, Sequência "Lauda Sion", Credo e Procissão Eucarística.',
    forma: 'ordinaria',
    tempoLiturgico: 'comum',
    grauCelebracao: 'solenidade',
    ritos: {
      iniciais: [
        {
          id: 'corpus_procissao',
          numero: 1,
          titulo: 'Entrada Festiva e Incensação',
          subTitulo: 'Ritos Iniciais Solenes',
          descricao: 'Procissão de entrada solene com turíbulo, naveta, cruz processional, velas e paramentos brancos/dourados.',
          rubrica: 'Nas solenidades o altar e a cruz são incensados com 3 lances duplos de turíbulo após o beijo ao altar.',
          textos: [
            'Cântico de Entrada: "Cantemos a Jesus Sacramentado..."',
            'Sacerdote: A graça de nosso Senhor Jesus Cristo, o amor do Pai e a comunhão do Espírito Santo estejam convosco. - Povo: Bendito seja Deus...'
          ],
          items: [
            'Incensação solene do Altar',
            'Paramentos Brancos/Dourados',
            'Ato Penitencial com Kyrie cantado'
          ],
          media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1548625361-185966374a2b?q=80&w=1200&auto=format&fit=crop',
            caption: 'Procissão solene de Corpus Christi com incenso e tochas.'
          },
          iconName: 'Church'
        },
        {
          id: 'corpus_gloria',
          numero: 2,
          titulo: 'Hino do Glória a Deus nas Alturas',
          subTitulo: 'Louvor Jubiloso',
          descricao: 'Cântico solene do Glória por tratar-se de uma Solenidade do Senhor.',
          rubrica: 'Obrigatório nas Solenidades. Tocam-se todos os sinos e campainhas.',
          textos: [
            'Glória a Deus nas alturas, e paz na terra aos homens por Ele amados...',
            'Nós vos louvamos, nós vos bendizemos, nós vos adoramos, nós vos glorificamos...'
          ],
          items: [
            'Glória entoado com solenidade',
            'Acompanhamento musical de festa'
          ],
          iconName: 'Sparkles'
        }
      ],
      palavra: [
        {
          id: 'corpus_1leitura',
          numero: 3,
          titulo: 'Primeira Leitura e Salmo Responsorial',
          subTitulo: 'O Pão do Céu e o Cálice da Salvação',
          descricao: 'Proclamação sobre o pão do céu no deserto e o Salmo 115.',
          rubrica: 'Nas Solenidades há obrigatoriamente 3 leituras (1ª Leitura, Salmo, 2ª Leitura, Sequência e Evangelho).',
          textos: [
            '1ª Leitura (Dt 8,2-3.14b-16a): "Recorda-te de todo o caminho que o Senhor te fez percorrer..."',
            'Salmo 115: O cálice da salvação apresentarei, invocando o nome do Senhor.'
          ],
          items: [
            'Leitura do Antigo Testamento no Ambão',
            'Salmo Responsorial cantado'
          ],
          iconName: 'BookOpen'
        },
        {
          id: 'corpus_sequencia',
          numero: 4,
          titulo: 'Sequência "Lauda Sion" (Louva, ó Sião)',
          subTitulo: 'Poema Dogmático da Eucaristia',
          descricao: 'Cântico tradicional de São Tomás de Aquino proclamado antes da Aclamação ao Evangelho.',
          rubrica: 'A Sequência de Corpus Christi pode ser cantada por inteiro ou em forma reduzida antes do Aleluia.',
          textos: [
            'Louva, ó Sião, o teu Pastor, louva o teu Guia e Salvador com hinos e cânticos!',
            'Eis o pão dos anjos feito pão dos peregrinos, verdadeiro pão dos filhos...'
          ],
          items: [
            'Sequência Eucarística Solene',
            'Assembleia sentada ou de pé acompanhando'
          ],
          media: {
            type: 'video',
            url: 'https://www.youtube.com/embed/8-W1qM0u8_M',
            caption: 'Cântico solene da Sequência Lauda Sion de São Tomás de Aquino.'
          },
          iconName: 'Sparkles'
        },
        {
          id: 'corpus_evangelho_credo',
          numero: 5,
          titulo: 'Evangelho de São João e Profissão de Fé',
          subTitulo: 'O Pão Vivo que desceu do céu (Jo 6,51-58)',
          descricao: 'Jesus declara: "Eu sou o pão vivo descido do céu. Quem comer deste pão viverá eternamente".',
          rubrica: 'Proclamação com incensação do Evangeliário. Segue-se a Homilia e o Credo (Profissão de Fé).',
          textos: [
            'Sacerdote: Proclamação do Evangelho de Jesus Cristo segundo João. - Povo: Glória a vós, Senhor.',
            'Credo: Creio em um só Deus, Pai Todo-Poderoso, Criador do céu e da terra...'
          ],
          items: [
            'Incensação do Livro dos Evangelhos',
            'Profissão de Fé de pé',
            'Oração dos Fiéis Intercessória'
          ],
          iconName: 'BookOpen'
        }
      ],
      eucaristica: [
        {
          id: 'corpus_anáfora_i',
          numero: 6,
          titulo: 'Oração Eucarística I (Cânon Romano)',
          subTitulo: 'Cânon Solene da Eucaristia',
          descricao: 'Ação de graças solene e consagração com a invocação dos Santos e Mártires da Igreja.',
          rubrica: 'Recomenda-se o Cânon Romano em grandes Solenidades com incensação das oferendas e elevação da Hóstia.',
          textos: [
            'Sacerdote: Pai de misericórdia, a quem sobem os nossos louvores, nós vos pedimos por Jesus Cristo...',
            'Consagração: HOC EST ENIM CORPUS MEUM... HIC EST ENIM CALIX SANGUINIS MEI...'
          ],
          items: [
            'Incensação das Oferendas e da Hóstia Consagrada',
            'Toque solene da Sineta',
            'Grande Amém'
          ],
          media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop',
            caption: 'Elevação do Cálice na Consagração Eucarística.'
          },
          iconName: 'Sparkles'
        }
      ],
      finais: [
        {
          id: 'corpus_procissao_eucaristica',
          numero: 7,
          titulo: 'Procissão com o Santíssimo Sacramento',
          subTitulo: 'Exposição e Bênção no Ostensório',
          descricao: 'O Santíssimo Sacramento é colocado no Ostensório e levado em procissão pelas ruas sob o pálio.',
          rubrica: 'Ao final da Missa de Corpus Christi realiza-se a Procissão Eucarística com o Ostensório sob o pálio e bênção com o Santíssimo.',
          textos: [
            'Tantum ergo Sacramentum veneremur cernui (Tão Sublime Sacramento adoremos neste altar)...',
            'Sacerdote abençoa o povo com o Ostensório fazendo o sinal da cruz.'
          ],
          items: [
            'Exposição do Santíssimo no Ostensório',
            'Uso do Véu de Ombros (Humeral)',
            'Bênção Solene do Santíssimo Sacramento'
          ],
          iconName: 'Church'
        }
      ]
    }
  },

  // 3. CELEBRAÇÃO: ANUNCIAÇÃO DO SENHOR
  {
    id: 'anunciacao_do_senhor',
    nome: 'Anunciação do Senhor',
    descricaoBreve: 'Solenidade da Anunciação do Senhor celebrada mesmo no tempo da Quaresma com Cântico do Glória e Credo Niceno.',
    forma: 'ordinaria',
    tempoLiturgico: 'quaresma',
    grauCelebracao: 'solenidade',
    ritos: {
      iniciais: [
        {
          id: 'anunc_entrada',
          numero: 1,
          titulo: 'Entrada Solene na Quaresma',
          subTitulo: 'Exceção Festiva no Tempo Quaresmal',
          descricao: 'Mesmo ocorrendo na Quaresma, a Solenidade da Anunciação veste-se de branco/dourado e celebra a Encarnação.',
          rubrica: 'Exceção litúrgica: Por ser Solenidade do Senhor, USAM-SE PARAMENTOS BRANCOS e CANTA-SE O GLÓRIA mesmo caindo durante a Quaresma.',
          textos: [
            'Cântico de Entrada: "O Anjo do Senhor anunciou a Maria e ela concebeu do Espírito Santo..."',
            'Sacerdote: Em nome do Pai e do Filho e do Espírito Santo.'
          ],
          items: [
            'Paramentos Brancos em pleno tempo da Quaresma',
            'Saudação Trinitária Solene',
            'Ato Penitencial'
          ],
          media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1548625361-185966374a2b?q=80&w=1200&auto=format&fit=crop',
            caption: 'Entrada festiva para a Solenidade da Anunciação do Senhor.'
          },
          iconName: 'Church'
        },
        {
          id: 'anunc_gloria',
          numero: 2,
          titulo: 'Hino do Glória (Exceção Quaresmal)',
          subTitulo: 'Cântico do Glória em Solenidade',
          descricao: 'Canta-se o Glória por tratar-se de uma Solenidade do Senhor.',
          rubrica: 'ATENÇÃO: O Glória É CANTADO nesta celebração mesmo sendo Quaresma.',
          textos: [
            'Glória a Deus nas alturas e paz na terra aos homens por Ele amados...',
            'Senhor Jesus Cristo, Filho Unigênito de Deus...'
          ],
          items: [
            'Glória cantado excepcionalmente na Quaresma',
            'Oração Coleta própria da Anunciação'
          ],
          iconName: 'Sparkles'
        }
      ],
      palavra: [
        {
          id: 'anunc_evangelho',
          numero: 3,
          titulo: 'Evangelho da Anunciação (Lc 1,26-38)',
          subTitulo: 'Eis aqui a serva do Senhor',
          descricao: 'O Anjo Gabriel é enviado a Maria em Nazaré para anunciar a concepção virginal do Salvador.',
          rubrica: 'Aclamação ao Evangelho usa verso quaresmal sem Aleluia. No Credo, TODOS AJOELHAM-SE às palavras "e se encarnou pelo Espírito Santo...".',
          textos: [
            'Anjo Gabriel: "Ave, cheia de graça, o Senhor é contigo..."',
            'Maria: "Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra."',
            'Rubrica do Credo: Ajoelhar-se nas palavras "E SE ENCARNOU PELA VIRGEM MARIA".'
          ],
          items: [
            'Proclamação do texto de São Lucas',
            'Genuflexão / Ajoelhar-se no Credo na passagem da Encarnação',
            'Homilia Teológica da Concepção Virginal'
          ],
          media: {
            type: 'video',
            url: 'https://www.youtube.com/embed/8-W1qM0u8_M',
            caption: 'Proclamação e Meditação do Evangelho da Anunciação.'
          },
          iconName: 'BookOpen'
        }
      ],
      eucaristica: [
        {
          id: 'anunc_eucaristica',
          numero: 4,
          titulo: 'Liturgia Eucarística da Solenidade',
          subTitulo: 'Miséria e Encarnação no Altar',
          descricao: 'Ofertório, Prefácio da Anunciação e Oração Eucarística III com o Rito da Comunhão.',
          rubrica: 'Prefácio próprio da Anunciação celebrando o Sim de Maria e a Virgem Mãe.',
          textos: [
            'Prefácio: "Na verdade, é justo e necessário... Ele aceitou tornar-se homem no seio da Virgem Maria..."',
            'Consagração e Comunhão dos fiéis.'
          ],
          items: [
            'Prefácio próprio da Anunciação',
            'Comunhão Eucarística'
          ],
          iconName: 'Sparkles'
        }
      ],
      finais: [
        {
          id: 'anunc_finais',
          numero: 5,
          titulo: 'Bênção Solene e Despedida',
          subTitulo: 'Envio sob a Proteção da Mãe de Deus',
          descricao: 'Bênção especial da Santíssima Trindade invocando a intercessão da Virgem Maria.',
          rubrica: 'Despedida festiva da assembleia.',
          textos: [
            'Sacerdote: Abençoe-vos Deus todo-poderoso...',
            'Povo: Amém. Graças a Deus.'
          ],
          items: [
            'Bênção Solene Marianopole',
            'Cântico Final a Nossa Senhora'
          ],
          iconName: 'CheckCircle2'
        }
      ]
    }
  }
];
