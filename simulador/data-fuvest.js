// Cursos do simulador Fuvest — só a 1ª fase (veja o aviso em fuvest.html sobre por quê).
// A 1ª fase da Fuvest é corrigida por acertos brutos em 90 questões, iguais pra todo
// mundo — por isso não tem "pesos" aqui como no simulador do SISU.
//
// Para adicionar um curso novo: pegue a nota de corte da 1ª fase (em número de
// acertos, não em pontos) direto em fuvest.br quando ela for divulgada, e copie um dos
// blocos abaixo.

const MINIMO_GERAL_FUVEST = 27; // 30% de 90 questões — precisa disso pra qualquer curso

const CURSOS_FUVEST = [
  {
    curso: "Medicina",
    corteAcertos: 79,
    edicao: "Fuvest 2025",
    fonte: "Jornal da USP / aprovatotal.com.br — mesma nota valeu pra todos os campi nessa edição"
  },
  {
    curso: "Engenharia Aeronáutica",
    corteAcertos: 73,
    edicao: "Fuvest 2025",
    fonte: "Jornal da USP / aprovatotal.com.br"
  },
  {
    curso: "Relações Internacionais",
    corteAcertos: 66,
    edicao: "Fuvest 2025",
    fonte: "Jornal da USP / aprovatotal.com.br — campus São Paulo"
  },
  {
    curso: "Psicologia",
    corteAcertos: 66,
    edicao: "Fuvest 2025",
    fonte: "Jornal da USP / aprovatotal.com.br — campus São Paulo"
  }
];
