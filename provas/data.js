// Lista de provas cadastradas no site.
//
// Para adicionar uma prova nova:
// 1. Coloque o arquivo dentro de provas/arquivos/<materia>/<ano>/ (crie as pastas se precisar)
// 2. Copie um dos objetos abaixo e edite os campos
// 3. Aponte "arquivo" para o caminho do arquivo que você acabou de colocar
//
// Todos os campos são texto (entre aspas), exceto "professores", que é uma lista —
// mesmo quando só tem um nome, use colchetes: ["Nome do Professor"]. Isso permite
// filtrar provas com mais de um professor (ex: aula conjunta) por qualquer um dos dois.
// "bimestre" pode ser um número ("1", "2", "3", "4") ou um texto livre, tipo
// "AC1 - 2º semestre", pra provas que não seguem o esquema de 4 bimestres.

const PROVAS = [
  {
    materia: "Biologia",
    professores: ["Kamila"],
    ano: "2025",
    bimestre: "AC1 - 2º semestre",
    titulo: "Prova AC1 - 2º semestre — 2025",
    arquivo: "arquivos/biologia/2025/prova-1-medio-2025.html"
  },
  {
    materia: "Matemática",
    professores: ["Ruben", "Juliana"],
    ano: "2025",
    bimestre: "AC1 - 2º semestre",
    titulo: "Prova AC1 - 2º semestre — 2025",
    arquivo: "arquivos/matematica/2025/prova-2-semestre-2025.html"
  },
  {
    materia: "Física",
    professores: ["Jefferson", "Fred"],
    ano: "2025",
    bimestre: "AC1 - 2º semestre",
    titulo: "Prova AC1 - 2º semestre — 2025",
    arquivo: "arquivos/fisica/2025/prova-2-semestre-2025.html"
  },
  {
    materia: "Química",
    professores: ["Paulo", "Eduardo"],
    ano: "2025",
    bimestre: "AC1 - 2º semestre",
    titulo: "Prova AC1 - 2º semestre — 2025",
    arquivo: "arquivos/quimica/2025/prova-2-semestre-2025.html"
  },
  {
    materia: "História",
    professores: ["Bruna"],
    ano: "2025",
    bimestre: "AC1 - 2º semestre",
    titulo: "Prova AC1 - 2º semestre — 2025",
    arquivo: "arquivos/historia/2025/prova-2-semestre-2025.html"
  },
  {
    materia: "Português",
    professores: ["Matheus", "Maria Teresa"],
    ano: "2025",
    bimestre: "AC1 - 2º semestre",
    titulo: "Prova AC1 - 2º semestre — 2025",
    arquivo: "arquivos/portugues/2025/prova-2-semestre-2025.html"
  },

  // --- Lote de agosto/2025 (24 provas enviadas de uma vez, 21 cadastradas — 3 eram duplicatas) ---

  {
    materia: "Geografia",
    professores: ["Leonardo"],
    ano: "2025",
    bimestre: "AC1 - 1º semestre",
    titulo: "Prova AC1 - 1º semestre — 2025",
    arquivo: "arquivos/geografia/2025/ac1-1-semestre/prova.html"
  },
  {
    materia: "Geografia",
    professores: ["Leonardo"],
    ano: "2025",
    bimestre: "AC3 GEO A - 1º semestre",
    titulo: "Prova AC3 GEO A - 1º semestre — 2025",
    arquivo: "arquivos/geografia/2025/ac3-geo-a-1-semestre/prova.html"
  },
  {
    materia: "Geografia",
    professores: ["Leonardo"],
    ano: "2025",
    bimestre: "AC3 GEO B - 1º semestre",
    titulo: "Prova AC3 GEO B - 1º semestre — 2025",
    arquivo: "arquivos/geografia/2025/ac3-geo-b-1-semestre/prova.html"
  },
  {
    materia: "História",
    professores: ["Bruna"],
    ano: "2025",
    bimestre: "AC3 A - 1º semestre",
    titulo: "Prova AC3 A - 1º semestre — 2025",
    arquivo: "arquivos/historia/2025/ac3-a-1-semestre/prova.html"
  },
  {
    materia: "História",
    professores: ["Bruna"],
    ano: "2025",
    bimestre: "AC3 B - 1º semestre",
    titulo: "Prova AC3 B - 1º semestre — 2025",
    arquivo: "arquivos/historia/2025/ac3-b-1-semestre/prova.html"
  },
  {
    materia: "Sociologia",
    professores: ["Michele"],
    ano: "2025",
    bimestre: "AC1 - 1º semestre",
    titulo: "Prova AC1 - 1º semestre — 2025",
    arquivo: "arquivos/sociologia/2025/ac1-1-semestre/prova.html"
  },
  {
    materia: "Filosofia",
    professores: ["José Carlos"],
    ano: "2025",
    bimestre: "AC1 - 1º semestre",
    titulo: "Prova AC1 - 1º semestre — 2025",
    arquivo: "arquivos/filosofia/2025/ac1-1-semestre/prova.html"
  },
  {
    materia: "Química",
    professores: ["Paulo", "Eduardo"],
    ano: "2025",
    bimestre: "AC1 - 1º semestre",
    titulo: "Prova AC1 - 1º semestre — 2025",
    arquivo: "arquivos/quimica/2025/ac1-1-semestre/prova.html"
  },
  {
    materia: "Química",
    professores: ["Paulo"],
    ano: "2025",
    bimestre: "AC3 Química A - 1º semestre",
    titulo: "Prova AC3 Química A - 1º semestre — 2025",
    arquivo: "arquivos/quimica/2025/ac3-quimica-a-1-semestre/prova.html"
  },
  {
    materia: "Química",
    professores: ["Eduardo"],
    ano: "2025",
    bimestre: "AC3 Química B - 1º semestre",
    titulo: "Prova AC3 Química B - 1º semestre — 2025",
    arquivo: "arquivos/quimica/2025/ac3-quimica-b-1-semestre/prova.html"
  },
  {
    materia: "Biologia",
    professores: ["Kamila"],
    ano: "2025",
    bimestre: "AC1 - 1º semestre (Vitaminas)",
    titulo: "Prova AC1 - 1º semestre — 2025 (Vitaminas)",
    arquivo: "arquivos/biologia/2025/ac1-1-semestre-vitaminas/prova.html"
  },
  {
    materia: "Biologia",
    professores: ["Kamila"],
    ano: "2025",
    bimestre: "AC3 Bio A - 1º semestre",
    titulo: "Prova AC3 Bio A - 1º semestre — 2025 (biomoléculas e genética)",
    arquivo: "arquivos/biologia/2025/ac3-bio-a-1-semestre/prova.html"
  },
  {
    materia: "Biologia",
    professores: ["Kamila"],
    ano: "2025",
    bimestre: "AC3 Bio B - 1º semestre",
    titulo: "Prova AC3 Bio B - 1º semestre — 2025 (ecologia)",
    arquivo: "arquivos/biologia/2025/ac3-bio-b-1-semestre/prova.html"
  },
  {
    materia: "Física",
    professores: ["Jefferson"],
    ano: "2025",
    bimestre: "AC3 A - 1º semestre",
    titulo: "Prova AC3 A - 1º semestre — 2025 (incompleta)",
    arquivo: "arquivos/fisica/2025/ac3-a-1-semestre/prova.html"
  },
  {
    materia: "Física",
    professores: ["Fred"],
    ano: "2025",
    bimestre: "AC3 B - 1º semestre",
    titulo: "Prova AC3 B - 1º semestre — 2025",
    arquivo: "arquivos/fisica/2025/ac3-b-1-semestre/prova.html"
  },
  {
    materia: "Português",
    professores: ["Matheus", "Maria Teresa"],
    ano: "2025",
    bimestre: "AC1 - 1º semestre",
    titulo: "Prova AC1 - 1º semestre — 2025",
    arquivo: "arquivos/portugues/2025/ac1-1-semestre/prova.html"
  },
  {
    materia: "Português",
    professores: ["Matheus"],
    ano: "2025",
    bimestre: "AC3 PORT A - 1º semestre",
    titulo: "Prova AC3 PORT A - 1º semestre — 2025",
    arquivo: "arquivos/portugues/2025/ac3-port-a-1-semestre/prova.html"
  },
  {
    materia: "Português",
    professores: ["Maria Teresa"],
    ano: "2025",
    bimestre: "AC3 PORT B - 1º semestre",
    titulo: "Prova AC3 PORT B - 1º semestre — 2025",
    arquivo: "arquivos/portugues/2025/ac3-port-b-1-semestre/prova.html"
  },
  {
    materia: "Matemática",
    professores: ["Ruben", "Juliana"],
    ano: "2025",
    bimestre: "AC2 - 1º semestre",
    titulo: "Prova AC2 - 1º semestre — 2025",
    arquivo: "arquivos/matematica/2025/ac2-1-semestre/prova.html"
  },
  {
    materia: "Matemática",
    professores: ["Ruben"],
    ano: "2025",
    bimestre: "AC3 Matemática A - 1º semestre",
    titulo: "Prova AC3 Matemática A - 1º semestre — 2025 (incompleta)",
    arquivo: "arquivos/matematica/2025/ac3-matematica-a-1-semestre/prova.html"
  },
  {
    materia: "Matemática",
    professores: ["Juliana"],
    ano: "2025",
    bimestre: "AC3 Matemática B - 1º semestre",
    titulo: "Prova AC3 Matemática B - 1º semestre — 2025",
    arquivo: "arquivos/matematica/2025/ac3-matematica-b-1-semestre/prova.html"
  }
];
