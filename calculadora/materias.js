// Configuração das matérias e das fórmulas de média da escola.
//
// Se a escola mudar os pesos algum dia, é só editar os números aqui —
// o resto da calculadora se ajusta sozinho.
//
// GRUPOS: cada matéria pertence a um grupo, que define os pesos usados.
//   Grupo A (matérias "normais"): AC1 20% + AC2 20% + AC3 20% + C1 10% + C2 10% + Simulado 20%
//   Grupo B (Filo/Socio, Ed. Física, Artes): AC2 50% + média(C1, C2) 50%
//
// Em ambos os grupos, AC3 (quando existe) é a média entre AC3a e AC3b.
// A média(C1, C2) do Grupo B é implementada como c1×0.25 + c2×0.25 (equivalente
// a tirar a média dos dois e multiplicar por 50%).
//
// No Grupo A (matérias normais), C1 e C2 também são divididos em dois campos cada:
// C1a/C1b e C2a/C2b. C1 usado na fórmula = média(C1a, C1b); C2 = média(C2a, C2b).
// No Grupo B, C1 e C2 continuam sendo um campo único cada.
//
// AC2 nunca é digitada: ela vem do Simulado Vital da área da matéria (Exatas,
// Línguas, Humanas ou Biológicas) somado a um Bônus, sem passar de 10.
// O "Simulado" que vale 20% da fórmula é a média dos 4 Simulados Vital por área —
// funciona como uma 3ª nota contínua (C3), só que com esse nome.
// O Bônus é outra coisa: nota do Bernoulli ÷ 10, uma nota única (não por área).
// Tanto o Simulado Vital quanto o Bônus são os mesmos para todas as matérias.
//
// Português é especial dentro do Grupo A: sua média final não é só a fórmula do
// Grupo A. Ela é 60% da fórmula do Grupo A (normal) + 40% da Redação, e a Redação
// é a média simples entre 3 notas digitadas à parte (AC1, AC2 e AC3 de redação,
// sem relação com o Bônus/simulado). Isso é controlado pela flag "redacao: true".

const GRUPOS = {
  A: {
    pesos: { ac1: 0.20, ac2: 0.20, ac3: 0.20, c1: 0.10, c2: 0.10, simulado: 0.20 }
  },
  B: {
    pesos: { ac2: 0.50, c1: 0.25, c2: 0.25 }
  }
};

const PESO_PORTUGUES_NORMAL = 0.6;
const PESO_REDACAO = 0.4;

const AREAS_LABEL = {
  exatas: "Exatas",
  linguas: "Linguagens",
  humanas: "Humanas",
  biologicas: "Biológicas"
};

// "slug" é usado só pra gerar ids de campo únicos no HTML — use letras sem acento e sem espaço.
const MATERIAS = [
  { nome: "Português", slug: "portugues", grupo: "A", area: "linguas", redacao: true },
  { nome: "Matemática", slug: "matematica", grupo: "A", area: "exatas" },
  { nome: "Química", slug: "quimica", grupo: "A", area: "biologicas" },
  { nome: "Física", slug: "fisica", grupo: "A", area: "biologicas" },
  { nome: "Biologia", slug: "biologia", grupo: "A", area: "biologicas" },
  { nome: "História", slug: "historia", grupo: "A", area: "humanas" },
  { nome: "Geografia", slug: "geografia", grupo: "A", area: "humanas" },
  { nome: "Filosofia", slug: "filosofia", grupo: "B", area: "humanas" },
  { nome: "Sociologia", slug: "sociologia", grupo: "B", area: "humanas" },
  { nome: "Educação Física", slug: "educacao-fisica", grupo: "B", area: "linguas" },
  { nome: "Artes", slug: "artes", grupo: "B", area: "linguas" }
];
