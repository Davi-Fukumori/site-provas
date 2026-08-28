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
    professores: ["Kamila Drequeceler"],
    ano: "2025",
    bimestre: "AC1 - 2º semestre",
    titulo: "Prova AC1 - 2º semestre — 2025",
    arquivo: "arquivos/biologia/2025/prova-1-medio-2025.html"
  },
  {
    materia: "Matemática",
    professores: ["Ruben Carneiro", "Juliana Jong"],
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
  }
];
