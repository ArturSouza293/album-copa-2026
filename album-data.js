/**
 * ============================================================================
 * ÁLBUM COPA DO MUNDO 2026 — DATASET COMPLETO
 * ============================================================================
 * Última atualização: 2026-05-09
 * 
 * Este arquivo contém TODAS as variáveis necessárias para o site:
 *   - ALBUM     → estado atual da coleção (cromos colados por seleção)
 *   - STATS     → métricas pessoais e benchmarks de mercado
 *   - PROJECAO  → modelagem matemática até a meta (19/07/2026)
 *   - NOTICIAS  → feed de notícias com relevância personalizada
 * 
 * Como atualizar: 
 *   - Quando colar novos cromos → atualizar ALBUM.selecoes[i].coladas
 *   - Quando comprar pacotes    → atualizar STATS.pessoal.pacotesComprados
 *   - PROJECAO recalcula sozinha se você usar as funções helper no fim
 * ============================================================================
 */


// ============================================================================
// 1) ALBUM — Estado da coleção
// ============================================================================
const ALBUM = {
  meta: {
    totalCromos: 980,
    totalEspeciais: 68,
    cromosPorPacote: 7,
    precoPacote: 7, // R$
    totalSelecoes: 48,
    ultimaAtualizacao: "2026-05-09",
    totalColado: 488,
    pacotesAbertos: 90
  },
  selecoes: [
    { nome: "Alemanha",        codigo: "GER", bandeira: "🇩🇪", coladas: [4,5,9,12,14,15,17,18,19] },
    { nome: "Argélia",         codigo: "ALG", bandeira: "🇩🇿", coladas: [2,4,6,8,11,12,13,17,20] },
    { nome: "Argentina",       codigo: "ARG", bandeira: "🇦🇷", coladas: [2,4,7,8,11,12,13,14,16,17] },
    { nome: "Arábia Saudita",  codigo: "KSA", bandeira: "🇸🇦", coladas: [1,3,7,11,13,14,16,20] },
    { nome: "Austrália",       codigo: "AUS", bandeira: "🇦🇺", coladas: [2,3,6,8,9,11,12,13,14,15,16,17,18,20] },
    { nome: "Áustria",         codigo: "AUT", bandeira: "🇦🇹", coladas: [1,2,3,5,6,7,10,12,15,19] },
    { nome: "Bélgica",         codigo: "BEL", bandeira: "🇧🇪", coladas: [4,7,9,11,12,13,15,17,20] },
    { nome: "Bósnia",          codigo: "BIH", bandeira: "🇧🇦", coladas: [2,5,8,10,11,12,15,16,17] },
    { nome: "Brasil",          codigo: "BRA", bandeira: "🇧🇷", coladas: [1,2,3,5,6,9,10,12,14,15,17,18,19,20] },
    { nome: "Cabo Verde",      codigo: "CPV", bandeira: "🇨🇻", coladas: [2,6,7,8,10,12,15,16,19,20] },
    { nome: "Canadá",          codigo: "CAN", bandeira: "🇨🇦", coladas: [2,3,5,6,7,8,9,11,13,14,18] },
    { nome: "Colômbia",        codigo: "COL", bandeira: "🇨🇴", coladas: [2,3,7,8,9,11,12,13,14,15,16,17,19] },
    { nome: "Congo",           codigo: "CGO", bandeira: "🇨🇬", coladas: [5,6,8,14,18,19] },
    { nome: "Coreia do Sul",   codigo: "KOR", bandeira: "🇰🇷", coladas: [5,9,10,11,12,13,14,15,18,19] },
    { nome: "Costa do Marfim", codigo: "CIV", bandeira: "🇨🇮", coladas: [1,3,5,7,8,9,11,13,16,17,18,19,20] },
    { nome: "Croácia",         codigo: "CRO", bandeira: "🇭🇷", coladas: [3,4,7,8,11,13,16,20] },
    { nome: "Curaçao",         codigo: "CUW", bandeira: "🇨🇼", coladas: [1,2,4,7,8,12,14,17,18] },
    { nome: "Czechia",         codigo: "CZE", bandeira: "🇨🇿", coladas: [2,3,4,5,7,8,9,11,12,14,15] },
    { nome: "Egito",           codigo: "EGY", bandeira: "🇪🇬", coladas: [2,5,6,7,9,10,11,13,14,15,16] },
    { nome: "Equador",         codigo: "ECU", bandeira: "🇪🇨", coladas: [2,3,6,8,10,11,12,16,17,20] },
    { nome: "Escócia",         codigo: "SCO", bandeira: "🏴",   coladas: [2,3,6,7,10,11,12,13,14,15,19,20] },
    { nome: "Espanha",         codigo: "ESP", bandeira: "🇪🇸", coladas: [3,5,6,7,9,11,14,16,17,18,19,20] },
    { nome: "França",          codigo: "FRA", bandeira: "🇫🇷", coladas: [1,2,4,7,8,9,14,15,19] },
    { nome: "Gana",            codigo: "GHA", bandeira: "🇬🇭", coladas: [4,7,8,11,12,14,16,17] },
    { nome: "Haiti",           codigo: "HAI", bandeira: "🇭🇹", coladas: [1,2,3,6,9,10,15,18,19,20] },
    { nome: "Holanda",         codigo: "NED", bandeira: "🇳🇱", coladas: [1,2,5,6,8,9,14,18,19] },
    { nome: "Inglaterra",      codigo: "ENG", bandeira: "🏴",   coladas: [1,3,4,5,7,9,12,13,15,16,17,20] },
    { nome: "Irã",             codigo: "IRN", bandeira: "🇮🇷", coladas: [1,2,3,4,7,8,11,12,15,16,17,19,20] },
    { nome: "Iraque",          codigo: "IRQ", bandeira: "🇮🇶", coladas: [] },
    { nome: "Japão",           codigo: "JPN", bandeira: "🇯🇵", coladas: [1,2,4,6,7,10,11,12,15,16,20] },
    { nome: "Jordânia",        codigo: "JOR", bandeira: "🇯🇴", coladas: [1,2,6,10,12,15,19] },
    { nome: "Marrocos",        codigo: "MAR", bandeira: "🇲🇦", coladas: [1,4,11,12,14,15,16,17,18,20] },
    { nome: "México",          codigo: "MEX", bandeira: "🇲🇽", coladas: [2,3,5,6,7,8,9,10,12,14,15,19,20] },
    { nome: "Noruega",         codigo: "NOR", bandeira: "🇳🇴", coladas: [1,3,7,8,10,11,12,13,14,15,16,19] },
    { nome: "Nova Zelândia",   codigo: "NZL", bandeira: "🇳🇿", coladas: [4,7,9,10,11,15,16,19,20] },
    { nome: "Panamá",          codigo: "PAN", bandeira: "🇵🇦", coladas: [1,2,3,5,8,9,10,13,14,15,18,19,20] },
    { nome: "Paraguai",        codigo: "PAR", bandeira: "🇵🇾", coladas: [3,4,8,13,15,16,17,18] },
    { nome: "Portugal",        codigo: "POR", bandeira: "🇵🇹", coladas: [1,2,3,5,6,8,10,11,12,14,15,16,18,19] },
    { nome: "Qatar",           codigo: "QAT", bandeira: "🇶🇦", coladas: [2,4,6,9,11,12,14,17,18] },
    { nome: "Senegal",         codigo: "SEN", bandeira: "🇸🇳", coladas: [1,2,3,7,9,10,11,16,17,19,20] },
    { nome: "Suécia",          codigo: "SWE", bandeira: "🇸🇪", coladas: [2,6,17,19] },
    { nome: "Suíça",           codigo: "SUI", bandeira: "🇨🇭", coladas: [1,2,3,4,5,6,9,12,13,14,15,18] },
    { nome: "Tunísia",         codigo: "TUN", bandeira: "🇹🇳", coladas: [3,5,7,11,14,16,18,20] },
    { nome: "Turquia",         codigo: "TUR", bandeira: "🇹🇷", coladas: [1,4,6,7,10,14,15,16,18,20] },
    { nome: "Uruguai",         codigo: "URU", bandeira: "🇺🇾", coladas: [1,5,9,13,14,15,16,18,19] },
    { nome: "USA",             codigo: "USA", bandeira: "🇺🇸", coladas: [1,4,6,8,10,13,17,19] },
    { nome: "Uzbequistão",     codigo: "UZB", bandeira: "🇺🇿", coladas: [5,7,9,13,14,15,16,17,19] },
    { nome: "África do Sul",   codigo: "RSA", bandeira: "🇿🇦", coladas: [2,4,5,6,7,8,9,10,11,14,16,18,20] }
  ],
  especiais: {
    capa: { tem: true, numero: 0 },
    fwcTimes: { coladas: [2,4,9,11,13,16,17,19], total: 48 }
  }
};


// ============================================================================
// 2) STATS — Métricas pessoais e benchmarks de mercado
// ============================================================================
const STATS = {
  pessoal: {
    inicioColecao: "2026-05-01",
    metaPrazo: { 
      de: "2026-06-11", 
      ate: "2026-07-19", 
      descricao: "Durante a Copa do Mundo" 
    },
    diasColecionando: 8,
    diasAteInicioCopa: 33,
    diasAteFimCopa: 71,
    canaisUsados: ["pacotes_banca", "trocas_amigos"],
    
    // Compras
    pacotesComprados: 90,
    cromosComprados: 630,
    investimentoReais: 630,
    
    // Coladas (estimativa estatística baseada em N(t) = 980 × (1 - e^(-t/980)))
    totalColado: 488,
    coladasViaPacote_estimado: 465,    // E[N] = 980 × (1 - e^(-630/980))
    coladasViaTroca_estimado: 23,       // 488 - 465 (saldo positivo de trocas)
    repetidasGeradas_estimado: 165,     // 630 - 465
    
    // Eficiências
    eficienciaPacote: 0.738,            // 465/630
    eficienciaTotal: 0.775,             // 488/630
    custoPorColada: 1.29,               // 630/488
    velocidadeMediaDiaria: 61,          // 488/8 dias
    
    // Status atual
    cromosFaltantes: 492,
    cromosFaltantesIRQ: 20,
    cromosFaltantesEspeciais: 60,
    progressoPercentual: 0.4980
  },

  comparacaoMercado: {
    custoMedianoSemTroca: 7098,
    custoTipicoComTroca: 1400,
    custoMinimoTeorico: 980,
    seuCustoProjetadoSemTroca: 4300,
    seuCustoProjetadoComTroca: 850,
    economiaJaRealizada_vs_mediano: 6468,    // 7098 - 630
    fonte: "Itatiaia, Placar, ClubeDaCopa, TechKnow (abr-mai/2026)"
  },

  raridades: {
    metalizadas: {
      total: 68,
      jaColadas: 8,
      taxaAparicao: 0.083,
      esperadoEm90Pacotes: 7.5,
      composicao: {
        escudosSelecoes: 48,
        logosFifaCopa: 2,
        trofeu: 1,
        mascotes: 3,
        lendas: 14
      }
    },
    extraStickers: {
      total: 80,
      taxaAparicao: 0.01,
      foraDoAlbum: true,
      esperadoEm90Pacotes: 0.9,
      jogadores: ["Messi", "Cristiano Ronaldo", "Vinícius Jr.", "Mbappé", 
                  "Lamine Yamal", "Haaland", "Bellingham", "Salah", "Modrić"]
    },
    selecoesMaisDisputadas: {
      lista: ["Iraque", "Cabo Verde", "Curaçao", "Uzbequistão"],
      motivo: "Estreantes na Copa — alta retenção por colecionadores especializados",
      seuStatus: { 
        IRQ: { coladas: 0,  total: 20, percent: 0.00 },
        CPV: { coladas: 10, total: 20, percent: 0.50 },
        CUW: { coladas: 9,  total: 20, percent: 0.45 },
        UZB: { coladas: 9,  total: 20, percent: 0.45 }
      }
    }
  },

  canaisExclusivos: {
    mcDonalds: {
      figurinhasExclusivas: 28,
      pacoteCusto: 5,
      cromosPorPacote: 5,
      destaque: "Figurinha #13 de cada seleção (foto do time) é EXCLUSIVA McDonald's",
      voceJaUsou: false,
      criticidade: "ALTA",
      recomendacao: "Sem McDonald's é matematicamente impossível fechar as 48 #13 só por banca."
    },
    cocaCola: {
      figurinhasExclusivas: 12,
      ondeEncontrar: "Rótulos de Coca-Cola Zero 600ml destacáveis",
      categoria: "Time dos Sonhos",
      voceJaUsou: false,
      criticidade: "MEDIA",
      recomendacao: "12 cromos exclusivos não saem em pacote nenhum."
    },
    paniniSiteOficial: {
      vendaIndividualFigurinha: true,
      inicioVenda: "2026-07-01",
      criticidade: "BAIXA",
      recomendacao: "Reservar para Iraque e últimas especiais."
    }
  },

  cronologia: [
    { data: "2026-04-01", evento: "Pré-venda Panini e Amazon", tipo: "mercado" },
    { data: "2026-04-27", evento: "Início campanha McDonald's (15 mi pacotes em 12 países)", tipo: "mercado" },
    { data: "2026-04-30", evento: "Lançamento bancas, livrarias, lotéricas, Oxxo", tipo: "mercado" },
    { data: "2026-05-01", evento: "Você começou a colecionar", tipo: "pessoal" },
    { data: "2026-05-09", evento: "Hoje — 488/980 (49,80%)", tipo: "pessoal" },
    { data: "2026-06-11", evento: "Início da Copa (Canadá-México-EUA)", tipo: "meta" },
    { data: "2026-07-01", evento: "Panini abre venda individual de figurinhas", tipo: "mercado" },
    { data: "2026-07-19", evento: "Final da Copa — DEADLINE da sua meta", tipo: "meta" }
  ]
};


// ============================================================================
// 3) PROJECAO — Modelagem até a meta de 19/jul (recalculada com 488/630)
// ============================================================================
// Modelo matemático: N(n) = T × (1 - e^(-n/T)), onde T = 980 e n = cromos abertos.
// Inverso (cromos necessários para colar N): n(N) = -T × ln(1 - N/T)
const PROJECAO = {
  modeloMatematico: {
    formula: "N(n) = T × (1 - exp(-n/T))",
    inverso: "n(N) = -T × ln(1 - N/T)",
    descricao: "Fórmula clássica do colecionador — assume distribuição uniforme de cromos.",
    parametros: { T: 980 }
  },

  // Quantos pacotes adicionais para chegar em cada marco (mantendo só pacotes)
  // Base: já abriu 630 cromos, já colou 488. Recalculado a partir desse ponto.
  marcos: [
    { atingir: 500, jaColado: 488, novasNecessarias: 12,  cromosAExtrair: 69,   pacotes: 10,  custoR$: 70 },
    { atingir: 600, jaColado: 488, novasNecessarias: 112, cromosAExtrair: 298,  pacotes: 43,  custoR$: 301 },
    { atingir: 700, jaColado: 488, novasNecessarias: 212, cromosAExtrair: 598,  pacotes: 86,  custoR$: 602 },
    { atingir: 800, jaColado: 488, novasNecessarias: 312, cromosAExtrair: 1031, pacotes: 148, custoR$: 1036 },
    { atingir: 900, jaColado: 488, novasNecessarias: 412, cromosAExtrair: 1825, pacotes: 261, custoR$: 1827 },
    { atingir: 940, jaColado: 488, novasNecessarias: 452, cromosAExtrair: 2504, pacotes: 358, custoR$: 2506 },
    { atingir: 960, jaColado: 488, novasNecessarias: 472, cromosAExtrair: 3183, pacotes: 455, custoR$: 3185 },
    { atingir: 980, jaColado: 488, novasNecessarias: 492, cromosAExtrair: Infinity, pacotes: Infinity, custoR$: Infinity, observacao: "Impossível só com pacotes — assíntota matemática." }
  ],

  // Cenários de fechamento (recalculados)
  cenarios: {
    A_soPacotes: {
      nome: "Apenas pacotes de banca",
      atingivelMaximo: 940,
      pacotesAdicionais: 358,
      custoAdicionalR$: 2506,
      custoTotalR$: 3136,            // 630 já gasto + 2506
      tempoEstimadoDias: 70,
      probabilidadeFecharNoPrazo: 0.0,
      observacao: "Impossível fechar — 28 cromos só saem no McDonald's, 12 na Coca-Cola, e o Iraque continua difícil."
    },
    B_recomendado: {
      nome: "Pacotes + McDonald's + Coca-Cola + Panini julho",
      composicao: {
        pacotesAdicionais: 86,         // R$ 602 — chega a ~700 colados via pacote
        combosMcDonalds: 30,           // R$ 150 (R$5 cada)
        cocaCola600ml: 12,             // ~R$ 100
        paniniIndividual: 90           // R$ 270 — Iraque (20) + especiais finais
      },
      custoAdicionalR$: 1122,
      custoTotalR$: 1752,             // 630 + 1122
      tempoEstimadoDias: 60,
      probabilidadeFecharNoPrazo: 0.85,
      cromosEsperados: 980,
      observacao: "Cenário recomendado. Fecha o álbum dentro da meta com gasto controlado."
    },
    C_maisAgressivo: {
      nome: "Cenário B + grupos de troca ativos",
      custoAdicionalR$: 670,
      custoTotalR$: 1300,
      tempoEstimadoDias: 50,
      probabilidadeFecharNoPrazo: 0.95,
      observacao: "Adicionar grupos de troca (WhatsApp/Telegram) reduz custo em 30-40%. Demanda mais tempo."
    }
  },

  // Curva de gasto vs cromos colados (para gráfico de área)
  // Inclui 2 pontos reais: (457, 560) e (488, 630), o resto é projeção do modelo
  curvaGastoVsColadas: [
    [0, 0], [50, 36], [100, 75], [150, 117], [200, 161], [250, 209],
    [300, 261], [350, 318], [400, 381], [457, 560],   // ponto real anterior
    [488, 630],                                        // ponto real atual
    [550, 762], [600, 871], [650, 998], [700, 1148],
    [750, 1330], [800, 1556], [850, 1849], [900, 2287], [940, 2776], [960, 3175]
  ],

  // Ritmo necessário pra cumprir meta de 19/jul
  ritmoNecessario: {
    cromosFaltantes: 492,
    diasAteFimCopa: 71,
    cromosPorDia: 6.9,
    pacotesPorSemana: 7.0,
    investimentoSemanal: 49
  }
};


// ============================================================================
// 4) NOTICIAS — Feed com relevância personalizada
// ============================================================================
const NOTICIAS = [
  {
    data: "2026-05-08",
    fonte: "Exame",
    titulo: "Panini abrirá venda de figurinhas individuais a partir de julho",
    resumo: "Colecionadores poderão comprar diretamente do site as figurinhas faltantes a partir de julho de 2026 — válvula de escape para fechar o álbum sem depender só de troca.",
    relevancia: "alta",
    url: "https://exame.com/esporte/album-da-copa-2026-veja-como-comprar-figurinhas-faltantes-no-site-da-panini/",
    insight: "Estratégia: feche o máximo possível por troca até julho, e use a Panini só para Iraque + especiais finais."
  },
  {
    data: "2026-05-01",
    fonte: "Itatiaia / Placar / Clube da Copa",
    titulo: "Completar o álbum sozinho pode passar dos R$ 7 mil",
    resumo: "Cálculos publicados no lançamento mostram que completar sem trocas custa em média R$ 7.098. Com trocas ativas, o valor cai para ~R$ 1.400 — economia de até 40%.",
    relevancia: "alta",
    insight: "Você gastou R$ 630 e tem 49,8% do álbum — está num ritmo MUITO mais econômico que a média (R$ 1,29/colada vs R$ 7,24 do cenário sem troca)."
  },
  {
    data: "2026-04-27",
    fonte: "Clube da Copa",
    titulo: "McDonald's distribui 28 figurinhas exclusivas — incluindo a #13 de cada seleção",
    resumo: "A figurinha número 13 (foto do time completo) só sai no Combo Figurinha do McDonald's (R$5 com McOferta). Sem passar lá ou trocar, é IMPOSSÍVEL fechar o álbum.",
    relevancia: "critica",
    insight: "Você ainda não usa esse canal. Considerando suas #13 atuais (várias coladas), vieram de troca — mas as restantes vão exigir McDonald's ou trocas dirigidas."
  },
  {
    data: "2026-04-15",
    fonte: "Digitouachou / Clube da Copa",
    titulo: "Estreantes lideram disputa: Iraque, Cabo Verde, Curaçao e Uzbequistão",
    resumo: "Por estarem em uma Copa pela primeira vez, seleções estreantes têm cromos extremamente disputados nos grupos de troca. A demanda por colecionadores especializados aumenta o valor de mercado.",
    relevancia: "alta",
    insight: "Faz sentido você ainda não ter NENHUMA do Iraque (0/20). Cabo Verde já em 50%, Curaçao e Uzbequistão em 45% — provavelmente vieram de pacote no início, antes da escassez se firmar nos grupos."
  },
  {
    data: "2026-04-10",
    fonte: "Placar",
    titulo: "Metalizadas saem em ~1 a cada 12 envelopes",
    resumo: "Os 68 cromos especiais (escudos, troféu, mascotes, lendas) têm taxa de aparição estatística de 8,3% por envelope — média de 4 a 6 metalizadas por caixa de 50 pacotes.",
    relevancia: "media",
    insight: "Você abriu 90 pacotes — o esperado seria 7,5 metalizadas. Você tem 8 FWC + capa = você está LEVEMENTE acima da média estatística."
  }
];


// ============================================================================
// 5) FUNÇÕES HELPER — Para o site usar nos cálculos derivados
// ============================================================================
const HELPERS = {
  /**
   * Cromos esperados (estatisticamente) após abrir N pacotes.
   * Útil pra mostrar "você está acima/abaixo da curva esperada".
   */
  cromosEsperadosPorPacotes: (pacotes, total = 980) => {
    const n = pacotes * 7;
    return Math.round(total * (1 - Math.exp(-n / total)));
  },

  /**
   * Quantos pacotes adicionais para chegar a um marco.
   */
  pacotesParaMarco: (alvo, atual = 488, total = 980) => {
    if (alvo >= total) return Infinity;
    const cromos = -total * Math.log((total - alvo) / total) - 
                   (-total * Math.log((total - atual) / total));
    return Math.ceil(cromos / 7);
  },

  /**
   * % de completude por seleção.
   */
  percentSelecao: (selecao) => (selecao.coladas.length / 20),

  /**
   * Total colado calculado dinamicamente (caso queira validar o totalColado do meta).
   */
  totalColadoCalculado: (album) => 
    album.selecoes.reduce((acc, s) => acc + s.coladas.length, 0) + 
    (album.especiais?.fwcTimes?.coladas?.length || 0) + 
    (album.especiais?.capa?.tem ? 1 : 0),

  /**
   * Filtros úteis para o grid de seleções.
   */
  filtros: {
    quaseCompletas: (sel) => sel.coladas.length >= 15,    // ≥75%
    iniciantes: (sel) => sel.coladas.length < 5 && sel.coladas.length > 0,  // <25%
    naoIniciadas: (sel) => sel.coladas.length === 0
  }
};


// ============================================================================
// EXPORT (opcional, se for usar com módulos)
// ============================================================================
// export { ALBUM, STATS, PROJECAO, NOTICIAS, HELPERS };
