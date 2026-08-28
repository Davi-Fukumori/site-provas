// Depende do array global PROVAS, definido em provas/data.js
document.addEventListener("DOMContentLoaded", function () {
  var elBusca = document.getElementById("busca");
  var elMateria = document.getElementById("filtro-materia");
  var elAno = document.getElementById("filtro-ano");
  var elProfessor = document.getElementById("filtro-professor");
  var elLista = document.getElementById("lista-provas");

  if (!elLista || typeof PROVAS === "undefined") return;

  popularFiltro(elMateria, valoresUnicos(PROVAS, "materia"), "Todas as matérias");
  popularFiltro(elAno, valoresUnicos(PROVAS, "ano").sort().reverse(), "Todos os anos");
  popularFiltro(elProfessor, valoresUnicos(PROVAS, "professores"), "Todos os professores");

  [elBusca, elMateria, elAno, elProfessor].forEach(function (el) {
    el.addEventListener("input", renderizar);
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

  function renderizar() {
    var termo = elBusca.value.trim().toLowerCase();
    var materia = elMateria.value;
    var ano = elAno.value;
    var professor = elProfessor.value;

    var filtradas = PROVAS.filter(function (prova) {
      if (materia && prova.materia !== materia) return false;
      if (ano && prova.ano !== ano) return false;
      if (professor && prova.professores.indexOf(professor) === -1) return false;
      if (termo) {
        var alvo = (prova.titulo + " " + prova.materia + " " + prova.professores.join(" ")).toLowerCase();
        if (alvo.indexOf(termo) === -1) return false;
      }
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
    titulo.textContent = prova.titulo;

    var meta = document.createElement("div");
    meta.className = "meta";
    // "bimestre" pode ser um número simples ("1") ou um texto livre ("AC1 - 2º semestre").
    var etapa = /^\d+$/.test(prova.bimestre) ? prova.bimestre + "º bimestre" : prova.bimestre;
    meta.textContent = prova.materia + " · " + prova.professores.join(" e ") + " · " + prova.ano + " · " + etapa;

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
