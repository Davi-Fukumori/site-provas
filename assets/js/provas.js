// Depende do array global PROVAS, definido em provas/data.js
document.addEventListener("DOMContentLoaded", function () {
  var elMateria = document.getElementById("filtro-materia");
  var elAno = document.getElementById("filtro-ano");
  var elProfessor = document.getElementById("filtro-professor");
  var elLista = document.getElementById("lista-provas");

  if (!elLista || typeof PROVAS === "undefined") return;

  popularFiltro(elMateria, valoresUnicos(PROVAS, "materia"), "Todas as matérias");
  popularFiltro(elAno, valoresUnicos(PROVAS, "ano").sort().reverse(), "Todos os anos");
  popularFiltro(elProfessor, valoresUnicos(PROVAS, "professores"), "Todos os professores");

  [elMateria, elAno, elProfessor].forEach(function (el) {
    el.addEventListener("change", renderizar);
  });

  renderizar();

  // Funciona tanto pra campos simples (ex: "materia") quanto pra campos que são
  // listas (ex: "professores": ["Fulano", "Ciclana"]) — nesse caso, cada nome da
  // lista vira uma opção separada no filtro.
  function valoresUnicos(lista, campo) {
    var vistos = {};
    var resultado = [];
    lista.forEach(function (item) {
      var valor = item[campo];
      var valoresDoItem = Array.isArray(valor) ? valor : [valor];
      valoresDoItem.forEach(function (v) {
        if (v && !vistos[v]) {
          vistos[v] = true;
          resultado.push(v);
        }
      });
    });
    return resultado.sort();
  }

  function popularFiltro(select, valores, rotuloTodos) {
    var opcaoTodos = document.createElement("option");
    opcaoTodos.value = "";
    opcaoTodos.textContent = rotuloTodos;
    select.appendChild(opcaoTodos);

    valores.forEach(function (valor) {
      var opcao = document.createElement("option");
      opcao.value = valor;
      opcao.textContent = valor;
      select.appendChild(opcao);
    });
  }

  // "materia" normalmente é uma string só, mas nos Simulados Vital (AC2 por área, tipo
  // "Ciências da Natureza") o mesmo caderno cobre várias matérias de uma vez — nesse
  // caso "materia" é uma lista (ex: ["Biologia", "Física", "Química"]).
  function materiasDaProva(prova) {
    return Array.isArray(prova.materia) ? prova.materia : [prova.materia];
  }

  // Linha de cima do cartão: "Matéria" sozinha, "Matéria · Frente" quando a prova tem
  // uma versão A/B, ou "Matéria1 · Matéria2 · ..." quando é um Simulado Vital multi-matéria.
  function tituloPrincipal(prova) {
    if (Array.isArray(prova.materia)) return prova.materia.join(" · ");
    return prova.frente ? prova.materia + " · " + prova.frente : prova.materia;
  }

  function renderizar() {
    var materia = elMateria.value;
    var ano = elAno.value;
    var professor = elProfessor.value;

    var filtradas = PROVAS.filter(function (prova) {
      if (materia && materiasDaProva(prova).indexOf(materia) === -1) return false;
      if (ano && prova.ano !== ano) return false;
      if (professor && prova.professores.indexOf(professor) === -1) return false;
      return true;
    });

    elLista.innerHTML = "";

    if (filtradas.length === 0) {
      var vazio = document.createElement("div");
      vazio.className = "mensagem-vazia";
      vazio.textContent = "Nenhuma prova encontrada com esses filtros.";
      elLista.appendChild(vazio);
      return;
    }

    filtradas.forEach(function (prova) {
      elLista.appendChild(criarItem(prova));
    });
  }

  function criarItem(prova) {
    var item = document.createElement("div");
    item.className = "item-prova";

    var info = document.createElement("div");
    info.className = "info";

    var titulo = document.createElement("h3");
    titulo.textContent = tituloPrincipal(prova);

    var meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = prova.professores.join(" e ") + " · " + prova.avaliacao + " · " +
      prova.semestre + " · " + prova.ano;

    info.appendChild(titulo);
    info.appendChild(meta);

    var link = document.createElement("a");
    link.className = "botao";
    link.href = prova.arquivo;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Abrir prova";

    item.appendChild(info);
    item.appendChild(link);

    return item;
  }
});
