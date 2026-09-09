// Cursos do simulador ENEM/SISU. Etapa 1: só SISU (UFSCar), que ingressa 100% pelo
// SISU sem vestibular próprio. Fuvest, Comvest, Vunesp e vestibulares de particulares
// ficam pra próximas etapas — são sistemas de cálculo diferentes.
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
  }
];
