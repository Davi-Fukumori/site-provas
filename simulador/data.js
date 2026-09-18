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
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 4, redacao: 1 }, // ilustrativo
    notaCorte: 841.78,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada (Instituto de Astronomia, Geofísica e Ciências Atmosféricas)"
  },
  {
    universidade: "USP",
    campus: "São Carlos (EESC)",
    curso: "Engenharia Mecânica",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 837.50,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada (Escola de Engenharia de São Carlos)"
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
    campus: "Bauru",
    curso: "Medicina",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 839.55,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada (Faculdade de Medicina de Bauru)"
  },
  {
    universidade: "USP",
    campus: "São Paulo",
    curso: "Direito",
    turno: "Matutino",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 811.11,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada (Faculdade de Direito)"
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
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Farmácia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 701,
    edicao: "SISU 2025",
    fonte: "querobolsa.com.br — SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Educação Física",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 2, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 642,
    edicao: "SISU 2025",
    fonte: "querobolsa.com.br — SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Fonoaudiologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 1, natureza: 3, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 693,
    edicao: "SISU 2025",
    fonte: "querobolsa.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Ciência da Computação",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 806.88,
    edicao: "SISU 2025",
    fonte: "vestibulandoweb.com.br — maior nota de corte da UFPE no SISU 2025"
  },
  {
    universidade: "UFABC",
    campus: "Santo André/São Bernardo",
    curso: "Bacharelado em Ciência e Tecnologia (BC&T)",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 734.15,
    edicao: "SISU 2025",
    fonte: "vestibulandoweb.com.br — maior nota de corte da UFABC no SISU 2025"
  },
  {
    universidade: "UNIFESP",
    campus: "São Paulo",
    curso: "Biomedicina",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 793.37,
    edicao: "SISU 2025",
    fonte: "fiibrasil.com — maior nota de corte da UNIFESP no SISU 2025"
  },
  {
    // Obs: removi um valor de "Medicina UNIFESP" que tinha nas versões anteriores —
    // as fontes davam números bem diferentes entre si (722 vs "acima de 760") e não
    // consegui confirmar qual estava certo, preferi tirar a não deixar um errado.
    universidade: "UNIFESP",
    campus: "São Paulo",
    curso: "Fonoaudiologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 1, natureza: 3, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 722.92,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025 (campus São Paulo)"
  },
  {
    universidade: "UNIFESP",
    campus: "São Paulo",
    curso: "Enfermagem",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 749.72,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025 (campus São Paulo)"
  },
  {
    universidade: "UNIFESP",
    campus: "Osasco",
    curso: "Direito",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 780.28,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025 (campus Osasco)"
  },
  {
    universidade: "UNIFESP",
    campus: "Osasco",
    curso: "Administração",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 756.33,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025 (campus Osasco)"
  },
  {
    universidade: "UNIFESP",
    campus: "Osasco",
    curso: "Ciências Econômicas",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 1, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 772.60,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025 (campus Osasco)"
  },
  {
    universidade: "UNIFESP",
    campus: "Osasco",
    curso: "Relações Internacionais",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 772.42,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025 (campus Osasco)"
  },
  {
    universidade: "UNIFESP",
    campus: "Santos",
    curso: "Psicologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 2, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 755.05,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025 (campus Santos)"
  },
  {
    universidade: "UNIFESP",
    campus: "Santos",
    curso: "Fisioterapia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 725.48,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025 (campus Santos)"
  },
  {
    universidade: "UNIFESP",
    campus: "Santos",
    curso: "Nutrição",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 736.02,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025 (campus Santos)"
  },
  {
    universidade: "UNIFESP",
    campus: "Santos",
    curso: "Terapia Ocupacional",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 3, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 707.64,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025 (campus Santos)"
  },
  {
    universidade: "UNIFESP",
    campus: "Diadema",
    curso: "Engenharia Química",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 759.84,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025 (campus Diadema)"
  },
  {
    universidade: "UNIFESP",
    campus: "Diadema",
    curso: "Farmácia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 739.46,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025 (campus Diadema)"
  },
  {
    universidade: "USP",
    campus: "São Paulo (IME)",
    curso: "Ciência da Computação",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 843.01,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada (Instituto de Matemática e Estatística)"
  },
  {
    universidade: "USP",
    campus: "São Paulo (IME)",
    curso: "Estatística",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 1, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 855.92,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada — maior nota de corte geral do Enem-USP 2026"
  },
  {
    universidade: "USP",
    campus: "São Paulo",
    curso: "Odontologia",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 844.85,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada (Faculdade de Odontologia)"
  },
  {
    universidade: "USP",
    campus: "São Paulo (Instituto de Psicologia)",
    curso: "Psicologia",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 2, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 816.58,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada"
  },
  {
    universidade: "USP",
    campus: "São Carlos (EESC)",
    curso: "Engenharia Civil",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 833.92,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada (Escola de Engenharia de São Carlos)"
  },
  {
    universidade: "USP",
    campus: "São Paulo (FAU)",
    curso: "Arquitetura e Urbanismo",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 1, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 814.70,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada (Faculdade de Arquitetura e Urbanismo)"
  },
  {
    universidade: "USP",
    campus: "São Paulo (Escola Politécnica)",
    curso: "Engenharia Elétrica",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 819.03,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada"
  },
  {
    universidade: "USP",
    campus: "São Paulo (Butantã)",
    curso: "Farmácia",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 811.82,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada (Faculdade de Ciências Farmacêuticas)"
  },
  {
    universidade: "USP",
    campus: "São Paulo",
    curso: "Medicina Veterinária",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 820.55,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada (Faculdade de Medicina Veterinária e Zootecnia)"
  },
  {
    universidade: "USP",
    campus: "São Paulo (ECA)",
    curso: "Jornalismo",
    turno: "Matutino",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 3, humanas: 2, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 811.28,
    edicao: "Enem-USP 2026",
    fonte: "PDF oficial Fuvest — Enem-USP 2026, 1ª chamada (Escola de Comunicações e Artes)"
  },

  // --- UFMG (mais cursos) ---
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Medicina",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 812.8,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — maior nota de corte da UFMG no SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Engenharia Aeroespacial",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 790.52,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Ciência da Computação",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 789.08,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Direito",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 769.48,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Psicologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 2, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 758.38,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Engenharia Mecânica",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 761.86,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Odontologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 755.5,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Engenharia Elétrica",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 757.08,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Arquitetura e Urbanismo",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 1, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 759.14,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Enfermagem",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 732.98,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFMG",
    campus: "Belo Horizonte",
    curso: "Medicina Veterinária",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 746.72,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },

  // --- UFRJ (mais cursos) ---
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Medicina",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 823.79,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — maior nota de corte da UFRJ no SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Ciências Econômicas",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 1, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 796.28,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Odontologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 793.28,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Engenharia de Produção",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 781.69,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Engenharia Química",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 779.29,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Psicologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 2, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 770.43,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Matemática",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 1 }, // ilustrativo
    notaCorte: 770.18,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Engenharia Mecânica",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 768.03,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Astronomia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 4, redacao: 1 }, // ilustrativo
    notaCorte: 761.55,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Jornalismo",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 3, humanas: 2, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 760.71,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Física",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 4, redacao: 1 }, // ilustrativo
    notaCorte: 755.46,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRJ",
    campus: "Rio de Janeiro",
    curso: "Engenharia Elétrica",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 753.99,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },

  // --- UFBA (mais cursos) ---
  {
    universidade: "UFBA",
    campus: "Salvador",
    curso: "Medicina",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 785.83,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — maior nota de corte da UFBA no SISU 2025"
  },
  {
    universidade: "UFBA",
    campus: "Salvador",
    curso: "Psicologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 2, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 736.39,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFBA",
    campus: "Salvador",
    curso: "Engenharia da Computação",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 766.36,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFBA",
    campus: "Salvador",
    curso: "Engenharia Elétrica",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 736.61,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFBA",
    campus: "Salvador",
    curso: "Engenharia Mecânica",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 734.51,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFBA",
    campus: "Salvador",
    curso: "Engenharia Civil",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 709.45,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFBA",
    campus: "Salvador",
    curso: "Administração",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 683.65,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFBA",
    campus: "Salvador",
    curso: "Arquitetura e Urbanismo",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 1, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 726.84,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFBA",
    campus: "Salvador",
    curso: "Enfermagem",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 705.89,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },

  // --- UFPE (mais cursos, campus Recife) ---
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Medicina",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 797.14,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Direito",
    turno: "Matutino",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 767.26,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Engenharia da Computação",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 800.46,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Sistemas de Informação",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 806.86,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Psicologia",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 2, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 733.73,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Engenharia Naval",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 732.78,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Biomedicina",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 731.17,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Arquitetura e Urbanismo",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 1, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 704.78,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Farmácia",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 714.01,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Fisioterapia",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 724.61,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Enfermagem",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 725.85,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Nutrição",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 713.94,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "Física",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 4, redacao: 1 }, // ilustrativo
    notaCorte: 741.54,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFPE",
    campus: "Recife",
    curso: "História",
    turno: "Vespertino",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 4, natureza: 1, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 748.27,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },

  // --- UFRGS (mais cursos) ---
  {
    universidade: "UFRGS",
    campus: "Porto Alegre",
    curso: "Medicina",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 786.33,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — maior nota de corte da UFRGS no SISU 2025"
  },
  {
    universidade: "UFRGS",
    campus: "Porto Alegre",
    curso: "Ciência da Computação",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 769.19,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRGS",
    campus: "Porto Alegre",
    curso: "Engenharia da Computação",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 761.13,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRGS",
    campus: "Porto Alegre",
    curso: "Relações Internacionais",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 758.30,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRGS",
    campus: "Porto Alegre",
    curso: "Administração",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 736.88,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFRGS",
    campus: "Porto Alegre",
    curso: "Engenharia Mecânica",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 728.29,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },

  // --- UnB (nova) ---
  {
    universidade: "UnB",
    campus: "Brasília",
    curso: "Medicina",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 819.54,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — maior nota de corte da UnB no SISU 2025"
  },
  {
    universidade: "UnB",
    campus: "Brasília",
    curso: "Direito",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 754.00,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UnB",
    campus: "Brasília",
    curso: "Engenharia Mecânica",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 770.28,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UnB",
    campus: "Brasília",
    curso: "Engenharia Civil",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 764.95,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UnB",
    campus: "Brasília",
    curso: "Engenharia de Computação",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 765.98,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UnB",
    campus: "Brasília",
    curso: "Psicologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 2, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 749.74,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UnB",
    campus: "Brasília",
    curso: "Odontologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 761.75,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UnB",
    campus: "Brasília",
    curso: "Enfermagem",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 730.06,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UnB",
    campus: "Brasília",
    curso: "Relações Internacionais",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 745.83,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UnB",
    campus: "Brasília",
    curso: "Administração",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 708.00,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },

  // --- UFC (nova) ---
  {
    universidade: "UFC",
    campus: "Fortaleza",
    curso: "Medicina",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 804.76,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — maior nota de corte da UFC no SISU 2025"
  },
  {
    universidade: "UFC",
    campus: "Sobral",
    curso: "Medicina",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 801.32,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFC",
    campus: "Fortaleza",
    curso: "Direito",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 775.14,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFC",
    campus: "Fortaleza",
    curso: "Ciência da Computação",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 767.44,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFC",
    campus: "Fortaleza",
    curso: "Engenharia de Computação",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 759.4,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFC",
    campus: "Fortaleza",
    curso: "Odontologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 758.64,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFC",
    campus: "Fortaleza",
    curso: "Psicologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 2, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 745.64,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFC",
    campus: "Fortaleza",
    curso: "Arquitetura e Urbanismo",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 1, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 720.64,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFC",
    campus: "Fortaleza",
    curso: "Enfermagem",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 731.82,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFC",
    campus: "Fortaleza",
    curso: "Farmácia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 722.78,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFC",
    campus: "Fortaleza",
    curso: "Administração",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 690.12,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },

  // --- UFG (nova) ---
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Inteligência Artificial",
    turno: "Integral",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 1, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 811.01,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — maior nota de corte da UFG no SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Medicina",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 798.15,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Engenharia de Software",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 1, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 799.89,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Ciência da Computação",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 781.00,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Direito",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 773.99,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Engenharia de Computação",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 741.17,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Psicologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 2, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 751.42,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Odontologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 745.82,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Arquitetura e Urbanismo",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 1, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 746.40,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Engenharia Mecânica",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 730.03,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Enfermagem",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 707.67,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Engenharia Química",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 711.58,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Farmácia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 698.53,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Administração",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 697.37,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },
  {
    universidade: "UFG",
    campus: "Goiânia",
    curso: "Medicina Veterinária",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 717.59,
    edicao: "SISU 2025",
    fonte: "blogdoenem.com.br — SISU 2025"
  },

  // --- UFES (nova; dados de SISU 2023, mais antigos que o resto — sinalizado aqui e
  // no README, use com mais cautela até eu achar dado mais recente) ---
  {
    universidade: "UFES",
    campus: "Vitória",
    curso: "Medicina",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 2, redacao: 3 }, // ilustrativo
    notaCorte: 804.69,
    edicao: "SISU 2023",
    fonte: "blogdoenem.com.br — dado de 2023, mais antigo que o resto da base"
  },
  {
    universidade: "UFES",
    campus: "Vitória",
    curso: "Engenharia de Computação",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 800.12,
    edicao: "SISU 2023",
    fonte: "blogdoenem.com.br — dado de 2023, mais antigo que o resto da base"
  },
  {
    universidade: "UFES",
    campus: "Vitória",
    curso: "Ciência da Computação",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 793.88,
    edicao: "SISU 2023",
    fonte: "blogdoenem.com.br — dado de 2023, mais antigo que o resto da base"
  },
  {
    universidade: "UFES",
    campus: "Vitória",
    curso: "Engenharia Civil",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 3, redacao: 2 }, // ilustrativo
    notaCorte: 761.87,
    edicao: "SISU 2023",
    fonte: "blogdoenem.com.br — dado de 2023, mais antigo que o resto da base"
  },
  {
    universidade: "UFES",
    campus: "Vitória",
    curso: "Odontologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 759.27,
    edicao: "SISU 2023",
    fonte: "blogdoenem.com.br — dado de 2023, mais antigo que o resto da base"
  },
  {
    universidade: "UFES",
    campus: "Vitória",
    curso: "Engenharia Mecânica",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 2, matematica: 4, redacao: 2 }, // ilustrativo
    notaCorte: 758.63,
    edicao: "SISU 2023",
    fonte: "blogdoenem.com.br — dado de 2023, mais antigo que o resto da base"
  },
  {
    universidade: "UFES",
    campus: "Vitória",
    curso: "Direito",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 1, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 746.73,
    edicao: "SISU 2023",
    fonte: "blogdoenem.com.br — dado de 2023, mais antigo que o resto da base"
  },
  {
    universidade: "UFES",
    campus: "Vitória",
    curso: "Psicologia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 3, natureza: 2, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 745.42,
    edicao: "SISU 2023",
    fonte: "blogdoenem.com.br — dado de 2023, mais antigo que o resto da base"
  },
  {
    universidade: "UFES",
    campus: "Vitória",
    curso: "Arquitetura e Urbanismo",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 2, humanas: 1, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 745.89,
    edicao: "SISU 2023",
    fonte: "blogdoenem.com.br — dado de 2023, mais antigo que o resto da base"
  },
  {
    universidade: "UFES",
    campus: "Vitória",
    curso: "Enfermagem e Obstetrícia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 3, matematica: 1, redacao: 3 }, // ilustrativo
    notaCorte: 732.66,
    edicao: "SISU 2023",
    fonte: "blogdoenem.com.br — dado de 2023, mais antigo que o resto da base"
  },
  {
    universidade: "UFES",
    campus: "Vitória",
    curso: "Farmácia",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 1, natureza: 4, matematica: 1, redacao: 2 }, // ilustrativo
    notaCorte: 723.19,
    edicao: "SISU 2023",
    fonte: "blogdoenem.com.br — dado de 2023, mais antigo que o resto da base"
  },
  {
    universidade: "UFES",
    campus: "Vitória",
    curso: "Administração",
    turno: "Não informado",
    modalidade: "Ampla concorrência",
    pesos: { linguagens: 1, humanas: 2, natureza: 1, matematica: 2, redacao: 2 }, // ilustrativo
    notaCorte: 700.07,
    edicao: "SISU 2023",
    fonte: "blogdoenem.com.br — dado de 2023, mais antigo que o resto da base"
  }
];
