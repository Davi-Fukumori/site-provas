// Cursos que usam a nota do ENEM com peso por área — SISU e também o Enem-USP (forma
// de entrar na USP sem fazer a Fuvest, com ampla concorrência de verdade e o mesmo tipo
// de cálculo do SISU). Comvest (Unicamp) e Unesp-Enem existem mas são bem mais
// restritos (Unicamp: só quem cursou o ensino médio inteiro em escola pública; Unesp:
// pelo menos metade das vagas reservada pra escola pública) e usam pesos por área
// agrupada diferente (Biológicas/Exatas/Humanas, não as 5 áreas do ENEM) — ainda não
// entraram aqui. Fuvest (1ª fase) tem sua própria aba em universidades/index.html.
//
// Para adicionar um curso novo:
// 1. Pegue a nota de corte real e atualizada em sisu.mec.gov.br ou nos editais das
//    universidades (a nota de corte muda a cada edição do SISU).
// 2. Copie um dos objetos abaixo e edite os campos.
// 3. "pesos" são os pesos de cada área na nota final desse curso (some no edital do
//    curso, geralmente em sisu.mec.gov.br ou no site da universidade) — quanto maior
//    o peso de uma área, mais ela pesa na média do candidato pra esse curso específico.
//
// IMPORTANTE: os pesos abaixo marcados como "ilustrativo" seguem o padrão comum desse
// tipo de curso no SISU (ex: Medicina costuma pesar mais em Natureza/Redação), mas não
// foram confirmados linha a linha no edital oficial de cada curso — confira o edital
// antes de tratar o resultado como preciso. As notas de corte, essas sim, são reais.

const CURSOS_SISU = [
  {
    universidade: "UFSCar",
    campus: "São Carlos",
    curso: "Engenharia de Computação",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 807.48,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br / vestibulandoweb.com.br — dados do Inep pro SISU 2025"
  },
  {
    universidade: "UFSCar",
    campus: "São Carlos",
    curso: "Medicina",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 804.91,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br / vestibulandoweb.com.br — dados do Inep pro SISU 2025"
  },
  {
    universidade: "UFSCar",
    campus: "São Carlos",
    curso: "Engenharia Civil",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 758.12,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br / vestibulandoweb.com.br — dados do Inep pro SISU 2025"
  },
  {
    universidade: "UFSCar",
    campus: "Lagoa do Sino (Buri)",
    curso: "Engenharia de Alimentos",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 2, redacao: 1 }, // ilustrativo
    notaCorte: 225.97,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br / vestibulandoweb.com.br — menor nota de corte da UFSCar no SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte (Campus Saúde)",
    curso: "Medicina",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 812.48,
    edicao: "SISU 2025",
    fonte: "vemmed.com.br / querobolsa.com.br — maior nota de corte da UFMG no SISU 2025"
  },
  {
    universidade: "UFSC",
    campus: "Florianópolis",
    curso: "Ciência da Computação",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 811.61,
    edicao: "SISU 2025",
    fonte: "querobolsa.com.br — maior nota de corte de Ciência da Computação no SISU 2025"
  },
  {
    universidade: "UFPR",
    campus: "Curitiba",
    curso: "Pedagogia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 2, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 693.12,
    edicao: "SISU 2025",
    fonte: "studymaps.com.br — média entre turnos/campi divulgada pro SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Direito",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 772.23,
    edicao: "SISU 2025",
    fonte: "guia.ufrj.br / passoenem.com.br — turno integral, SISU 2025"
  },
  {
    universidade: "UFBA",
    campus: "Salvador",
    curso: "Direito",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 720.67,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — turno integral, SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Psicologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 2, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 495.63,
    edicao: "SISU 2025",
    fonte: "cursoenemgratuito.com.br — SISU 2025"
  },
  {
    universidade: "UFRGS",
    campus: "Porto Alegre",
    curso: "Psicologia",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 2, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 761.62,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — turno integral, SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Odontologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 747.96,
    edicao: "SISU 2025",
    fonte: "studymaps.com.br — média divulgada pro SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Arquitetura e Urbanismo",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 1, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 742.41,
    edicao: "SISU 2025",
    fonte: "guia.ufrj.br — SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Engenharia de Computação e Informação",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 807.5,
    edicao: "SISU 2025",
    fonte: "conexao.ufrj.br / blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "USP",
    campus: "São Paulo",
    curso: "Astronomia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 4, redacao: 1 }, // ilustrativo
    notaCorte: 876.56,
    edicao: "Enem-USP 2026",
    fonte: "vestibulares.estrategia.com — maior nota de corte do Enem-USP 2026 (1ª chamada)"
  },
  {
    universidade: "USP",
    campus: "São Carlos (EESC)",
    curso: "Engenharia Mecânica",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 844.86,
    edicao: "Enem-USP 2026",
    fonte: "vestibulares.estrategia.com — Enem-USP 2026 (1ª chamada)"
  },
  {
    universidade: "UFMS",
    campus: "Campo Grande",
    curso: "Enfermagem",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 782.16,
    edicao: "SISU 2025",
    fonte: "cursoenemgratuito.com.br / blogdoenem.com.br — maior nota de corte de Enfermagem no SISU 2025"
  },
  {
    universidade: "UFRGS",
    campus: "Porto Alegre",
    curso: "Economia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 1, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 738.42,
    edicao: "SISU 2025",
    fonte: "studymaps.com.br — média divulgada pro SISU 2025"
  },
  {
    universidade: "UFRGS",
    campus: "Porto Alegre",
    curso: "Ciências Contábeis",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 1, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 690.62,
    edicao: "SISU 2025",
    fonte: "studymaps.com.br — SISU 2025"
  },
  {
    universidade: "UFPR",
    campus: "Curitiba",
    curso: "Jornalismo",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 3, humanas: 2, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 770.94,
    edicao: "SISU 2025",
    fonte: "querobolsa.com.br — maior nota de corte de Jornalismo no SISU 2025"
  },
  {
    universidade: "UFRPE",
    campus: "Recife",
    curso: "Medicina Veterinária",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 690.97,
    edicao: "SISU 2025",
    fonte: "studymaps.com.br / fiibrasil.com — SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Nutrição",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 767.39,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "USP",
    campus: "Bauru (FOB)",
    curso: "Medicina",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 834.31,
    edicao: "Enem-USP 2026",
    fonte: "querobolsa.com.br — Enem-USP 2026"
  },
  {
    universidade: "USP",
    campus: "São Paulo (Faculdade de Direito)",
    curso: "Direito",
    turno: "Noturno",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 798.81,
    edicao: "Enem-USP 2026",
    fonte: "querobolsa.com.br — Enem-USP 2026"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Administração",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 824.22,
    edicao: "SISU 2025",
    fonte: "vestibulares.estrategia.com — SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Administração",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 813.10,
    edicao: "SISU 2025",
    fonte: "vestibulares.estrategia.com — SISU 2025"
  }
];
