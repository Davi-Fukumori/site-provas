// Lista de provas cadastradas no site.
//
// Para adicionar uma prova nova:
// 1. Coloque o arquivo dentro de provas/arquivos/<materia>/<ano>/ (crie as pastas se precisar)
// 2. Copie um dos objetos abaixo e edite os campos
// 3. Aponte "arquivo" para o caminho do arquivo que você acabou de colocar
//
// Campos:
// - materia: só uma destas frentes — "Matemática", "Português", "História",
//   "Geografia", "Física", "Biologia", "Química", "Sociologia", "Filosofia" —
//   com uma exceção: "Filosofia e Sociologia" (prova única, dada em conjunto pelas
//   duas matérias — não crie duas entradas separadas pra isso, veja o exemplo lá
//   embaixo).
// - frente: "A", "B", ou não escreva o campo se a prova não tiver essa divisão.
//   Português: A = Matheus, B = Maria Teresa (inclusive Literatura).
// - professores: sempre uma lista, mesmo com um nome só: ["Nome"].
// - avaliacao: identificador da prova em si, tipo "AC1", "AC2", "AC3" ou um nome livre
//   como "Avaliação Dissertativa 1".
// - semestre: "1º semestre" ou "2º semestre".
// - ano: ano em que a prova foi aplicada.
// - arquivo: caminho do arquivo da prova.

const PROVAS = [
  {
    materia: "Biologia",
    professores: ["Kamila"],
    avaliacao: "AC1",
    semestre: "2º semestre",
    ano: "2025",
    arquivo: "arquivos/biologia/2025/prova-1-medio-2025.html"
  },
  {
    materia: "Matemática",
    professores: ["Ruben", "Juliana"],
    avaliacao: "AC1",
    semestre: "2º semestre",
    ano: "2025",
    arquivo: "arquivos/matematica/2025/prova-2-semestre-2025.html"
  },
  {
    materia: "Física",
    professores: ["Jefferson", "Fred"],
    avaliacao: "AC1",
    semestre: "2º semestre",
    ano: "2025",
    arquivo: "arquivos/fisica/2025/prova-2-semestre-2025.html"
  },
  {
    materia: "Química",
    professores: ["Paulo", "Eduardo"],
    avaliacao: "AC1",
    semestre: "2º semestre",
    ano: "2025",
    arquivo: "arquivos/quimica/2025/prova-2-semestre-2025.html"
  },
  {
    materia: "História",
    professores: ["Bruna"],
    avaliacao: "AC1",
    semestre: "2º semestre",
    ano: "2025",
    arquivo: "arquivos/historia/2025/prova-2-semestre-2025.html"
  },
  {
    materia: "Português",
    professores: ["Matheus", "Maria Teresa"],
    avaliacao: "AC1",
    semestre: "2º semestre",
    ano: "2025",
    arquivo: "arquivos/portugues/2025/prova-2-semestre-2025.html"
  },

  // --- Lote de agosto/2025 (24 provas enviadas de uma vez, 21 cadastradas — 3 eram duplicatas) ---

  {
    materia: "Geografia",
    professores: ["Leonardo"],
    avaliacao: "AC1",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/geografia/2025/ac1-1-semestre/prova.html"
  },
  {
    materia: "Geografia",
    frente: "A",
    professores: ["Leonardo"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/geografia/2025/ac3-geo-a-1-semestre/prova.html"
  },
  {
    materia: "Geografia",
    frente: "B",
    professores: ["Leonardo"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/geografia/2025/ac3-geo-b-1-semestre/prova.html"
  },
  {
    materia: "História",
    frente: "A",
    professores: ["Bruna"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/historia/2025/ac3-a-1-semestre/prova.html"
  },
  {
    materia: "História",
    frente: "B",
    professores: ["Bruna"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/historia/2025/ac3-b-1-semestre/prova.html"
  },
  {
    // Prova única de Filosofia e Sociologia (uma só aplicação, pelas duas matérias
    // juntas) — por isso é uma entrada só, não duas.
    materia: "Filosofia e Sociologia",
    professores: ["José Carlos", "Michele"],
    avaliacao: "AC1",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/filosofia/2025/ac1-1-semestre/prova.html"
  },
  {
    materia: "Química",
    professores: ["Paulo", "Eduardo"],
    avaliacao: "AC1",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/quimica/2025/ac1-1-semestre/prova.html"
  },
  {
    materia: "Química",
    frente: "A",
    professores: ["Paulo"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/quimica/2025/ac3-quimica-a-1-semestre/prova.html"
  },
  {
    materia: "Química",
    frente: "B",
    professores: ["Eduardo"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/quimica/2025/ac3-quimica-b-1-semestre/prova.html"
  },
  {
    materia: "Biologia",
    professores: ["Kamila"],
    avaliacao: "AC1",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/biologia/2025/ac1-1-semestre-vitaminas/prova.html"
  },
  {
    materia: "Biologia",
    frente: "A",
    professores: ["Kamila"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/biologia/2025/ac3-bio-a-1-semestre/prova.html"
  },
  {
    materia: "Biologia",
    frente: "B",
    professores: ["Kamila"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/biologia/2025/ac3-bio-b-1-semestre/prova.html"
  },
  {
    materia: "Física",
    frente: "A",
    professores: ["Jefferson"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/fisica/2025/ac3-a-1-semestre/prova.html"
  },
  {
    materia: "Física",
    frente: "B",
    professores: ["Fred"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/fisica/2025/ac3-b-1-semestre/prova.html"
  },
  {
    materia: "Português",
    professores: ["Matheus", "Maria Teresa"],
    avaliacao: "AC1",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/portugues/2025/ac1-1-semestre/prova.html"
  },
  {
    materia: "Português",
    frente: "A",
    professores: ["Matheus"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/portugues/2025/ac3-port-a-1-semestre/prova.html"
  },
  {
    materia: "Português",
    frente: "B",
    professores: ["Maria Teresa"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/portugues/2025/ac3-port-b-1-semestre/prova.html"
  },
  {
    materia: "Matemática",
    professores: ["Ruben", "Juliana"],
    avaliacao: "AC2",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/matematica/2025/ac2-1-semestre/prova.html"
  },
  {
    materia: "Matemática",
    frente: "A",
    professores: ["Ruben"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/matematica/2025/ac3-matematica-a-1-semestre/prova.html"
  },
  {
    materia: "Matemática",
    frente: "B",
    professores: ["Juliana"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2025",
    arquivo: "arquivos/matematica/2025/ac3-matematica-b-1-semestre/prova.html"
  },
  {
    // Literatura é dada pela Maria Teresa, então entra como Português · B (mesma regra
    // das provas de Português: Matheus = Conhecimentos Linguísticos, Maria Teresa = B).
    materia: "Português",
    frente: "B",
    professores: ["Maria Teresa"],
    avaliacao: "AC3",
    semestre: "1º semestre",
    ano: "2023",
    arquivo: "arquivos/literatura/2023/ac3-1-semestre/prova.html"
  },

  // --- 2026 ---

  {
    materia: "Filosofia e Sociologia",
    professores: ["José Carlos", "Michele"],
    avaliacao: "Avaliação Dissertativa 1",
    semestre: "2º semestre",
    ano: "2026",
    arquivo: "arquivos/filosofia/2026/avaliacao-dissertativa-1-2-semestre/prova.html"
  }
];
