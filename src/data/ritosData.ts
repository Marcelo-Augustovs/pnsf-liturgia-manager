import { SideMenuItem } from '@/types/ritos';

export const MENU_LIST: SideMenuItem[] = [
  {
    navButton: 'Sacramento do Batismo',
    refContent: 'batismo',
    iconName: 'Droplet',
    navContent: [
      {
        menuTitle: 'Preparação e Acolhida',
        leftSubTitle: 'Documentação & Disposições Pastorais',
        rightSubTitle: 'Rito de Acolhida dos Catecúmenos',
        leftContent: [
          {
            title: 'Requisitos dos Pais e Padrinhos',
            iconName: 'UserCheck',
            texts: [
              'A preparação para o Batismo exige que pais e padrinhos compreendam o compromisso sagrado de educar a criança na fé católica e nos ensinamentos do Evangelho.'
            ],
            items: [
              'Padrinhos devem ter no mínimo 16 anos completos.',
              'Devem ser católicos crismados que tenham recebido a Primeira Eucaristia.',
              'Levar em conta a idoneidade moral e vivência comunitária ativa.',
              'Comprovante do Encontro de Preparação para o Batismo atualizado.'
            ]
          },
          {
            title: 'Elementos & Símbolos Litúrgicos',
            iconName: 'Sparkles',
            texts: [
              'Certifique-se de que os seguintes objetos estejam devidamente preparados no presbitério e sacristia antes do início da celebração:'
            ],
            items: [
              'Vela batismal decorada (Círio da Família).',
              'Veste branca para o batizando (simbolizando a dignidade e a veste da pureza divina).',
              'Óleo dos Catecúmenos e Santo Crisma.',
              'Jarra e bacia ornamentadas para a água batismal.'
            ],
            media: {
              type: 'image',
              url: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=1000&q=80',
              caption: 'Pia batismal e elementos sagrados preparados para a celebração'
            }
          }
        ],
        rightContent: [
          {
            variationTitle: 'Rito Comum (Infantes)',
            sections: [
              {
                title: 'Diálogo Inicial com os Pais',
                subTitle: 'Acolhida à porta da Igreja',
                iconName: 'MessageSquare',
                texts: [
                  'O celebrante saúda os presentes, recordando a alegria com que os pais receberam a criança e a fé da Igreja.',
                  'Celebrante: "Que nome escolhestes para esta criança?" — Pais: "[Nome da Criança]"',
                  'Celebrante: "Que pedis à Igreja de Deus para [Nome]?" — Pais: "O Batismo!"'
                ]
              },
              {
                title: 'Sinal da Cruz na Testinha',
                subTitle: 'Sinal de posse de Cristo',
                iconName: 'CheckCircle2',
                texts: [
                  'O celebrante traça o sinal da cruz na testa da criança e convida os pais e padrinhos a fazerem o mesmo em silêncio de oração.'
                ]
              }
            ]
          },
          {
            variationTitle: 'Rito de Emergência (Em Perigo de Vida)',
            sections: [
              {
                title: 'Fórmula Breve Essencial',
                subTitle: 'Para situações de extremo risco em hospitais ou UTI',
                iconName: 'ShieldCheck',
                texts: [
                  'Na ausência de sacerdote e em caso de iminente perigo de vida, qualquer fiel com a intenção devida pode batizar derramando água pura na cabeça do batizando enquanto pronuncia:',
                  '"[NOME DO BATIZANDO], EU TE BATIZO EM NOME DO PAI, E DO FILHO E DO ESPÍRITO SANTO."'
                ],
                items: [
                  'Utilizar água potável e limpa.',
                  'Derramar a água 3 vezes (uma para cada Pessoa da Santíssima Trindade).',
                  'Notificar a Secretaria Paroquial posteriormente para o devido registro no Livro de Batismos.'
                ]
              }
            ]
          }
        ]
      },
      {
        menuTitle: 'Liturgia da Palavra e Batismo',
        leftSubTitle: 'Exorcismo e Unção Precatória',
        rightSubTitle: 'Profissão de Fé e Rito de Infusão',
        leftContent: [
          {
            title: 'Oração de Exorcismo e Imposição de Mãos',
            iconName: 'BookOpen',
            texts: [
              'A oração exorcística pede a libertação do pecado original e concede a força de Cristo para vencer as seduções do mal.'
            ],
            items: [
              'Unção com o Óleo dos Catecúmenos no peito da criança.',
              'Imposição silenciosa das mãos sobre o batizando.'
            ]
          }
        ],
        rightContent: [
          {
            variationTitle: 'Rito de Batismo por Infusão',
            sections: [
              {
                title: 'Renúncia e Profissão de Fé',
                subTitle: 'Compromisso de pais e padrinhos',
                iconName: 'FileText',
                texts: [
                  'Os pais e padrinhos renunciam publicamente a Satanás, a todas as suas obras e seduções, professando a fé na Santíssima Trindade.'
                ]
              },
              {
                title: 'Rito Essencial de Batismo',
                subTitle: 'Banho de Regeneração',
                iconName: 'Droplet',
                texts: [
                  'O celebrante derrama a água sagrada três vezes sobre a cabeça da criança dizendo: "[Nome], eu te batizo em nome do Pai, e do Filho, e do Espírito Santo."'
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    navButton: 'Sacramento do Matrimônio',
    refContent: 'matrimonio',
    iconName: 'Heart',
    navContent: [
      {
        menuTitle: 'Preparação Canônica & Entrada',
        leftSubTitle: 'Processo Matrimonial',
        rightSubTitle: 'Rito de Entrada e Acolhida',
        leftContent: [
          {
            title: 'Documentação do Processo Matrimonial',
            iconName: 'FileText',
            texts: [
              'O processo de habilitação matrimonial deve ser iniciado com 3 a 6 meses de antecedência na Paróquia de residência dos noivos.'
            ],
            items: [
              'Certidão de Batismo atualizada (com fins matrimoniais, emitida nos últimos 6 meses).',
              'Cópia legível de RG, CPF e Comprovante de Residência.',
              'Certificado de participação no Encontro de Preparação para a Vida Matrimonial.',
              'Atestado de Casamento Civil ou Certidão de Habilitação do Cartório.'
            ]
          },
          {
            title: 'Guia de Orientação Litúrgica',
            iconName: 'Video',
            texts: [
              'Assista ao vídeo explicativo sobre o rito de entrada dos noivos, disposições na nave da igreja e postura litúrgica durante o consentimento.'
            ],
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              caption: 'Instrução em vídeo para celebração solene do matrimônio'
            }
          }
        ],
        rightContent: [
          {
            variationTitle: 'Celebração com Missa Nuptial',
            sections: [
              {
                title: 'Cortejo de Entrada',
                subTitle: 'Entrada solene dos padrinhos e noivos',
                iconName: 'Layers',
                texts: [
                  'Cortejo litúrgico recomendado: Padrinhos em pares, Noivo acompanhado por sua Mãe, Mãe do Noivo com Pai da Noiva, seguido pela Noiva acompanhada por seu Pai ao som da Marcha Nupcial.'
                ]
              },
              {
                title: 'Saudação Litúrgica e Acolhida',
                subTitle: 'Abertura da Celebração',
                iconName: 'MessageSquare',
                texts: [
                  'O sacerdote saúda os noivos, suas famílias e o povo presente, destacando a união indissolúvel santificada por Cristo no Sacramento.'
                ]
              }
            ]
          },
          {
            variationTitle: 'Celebração sem Missa (Liturgia da Palavra)',
            sections: [
              {
                title: 'Rito Litúrgico Simplificado',
                subTitle: 'Foco no Consentimento e Bênção das Alianças',
                iconName: 'Calendar',
                texts: [
                  'Indicado quando a celebração é conduzida por Diácono ou quando há disparidade de culto. Segue com Acolhida, Leitura da Palavra, Homilia, Consentimento e Bênção Nupcial.'
                ]
              }
            ]
          }
        ]
      },
      {
        menuTitle: 'Consentimento e Alianças',
        leftSubTitle: 'Interrogações e Votação',
        rightSubTitle: 'Bênção e Entrega das Alianças',
        leftContent: [
          {
            title: 'Perguntas do Celebrante aos Noivos',
            iconName: 'HelpCircle',
            texts: [
              'O celebrante interroga publicamente os noivos sobre a liberdade de escolha, fidelidade e acolhida dos filhos:'
            ],
            items: [
              'Viestes aqui para contrair Matrimônio livre e de espontânea vontade?',
              'Estais dispostos a amar-vos e respeitar-vos um ao outro durante toda a vossa vida?',
              'Estais dispostos a receber com amor os filhos que Deus vos enviar e a educá-los na lei de Cristo e da Igreja?'
            ]
          }
        ],
        rightContent: [
          {
            variationTitle: 'Fórmula de Consentimento Tradicional',
            sections: [
              {
                title: 'Troca Solene de Votos',
                subTitle: 'Aliança Perfeita e Indissolúvel',
                iconName: 'Heart',
                texts: [
                  'Noivo: "Eu, [Nome], te recebo a ti, [Nome], por minha esposa e te prometo ser fiel, na alegria e na tristeza, na saúde e na doença, amando-te e respeitando-te todos os dias da minha vida."',
                  'Noiva: "Eu, [Nome], te recebo a ti, [Nome], por meu esposo e te prometo ser fiel, na alegria e na tristeza, na saúde e na doença, amando-te e respeitando-te todos os dias da minha vida."'
                ]
              },
              {
                title: 'Bênção e Entrega das Alianças',
                subTitle: 'Sinal Visível da Fidelidade',
                iconName: 'Sparkles',
                texts: [
                  'Celebrante: "Abençoai ✠, Senhor, estes anéis que hoje abençoamos... Santos e puros permaneçam estes vossos servos em vossa paz."',
                  'Ao colocar a aliança no anelar do cônjuge: "[Nome], recebe esta aliança em sinal do meu amor e da minha fidelidade. Em nome do Pai e do Filho e do Espírito Santo."'
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
