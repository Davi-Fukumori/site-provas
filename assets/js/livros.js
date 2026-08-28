// Depende do array global LIVROS, definido em literatura/data.js
document.addEventListener("DOMContentLoaded", function () {
  var container = document.getElementById("lista-livros");
  if (!container || typeof LIVROS === "undefined") return;

  if (LIVROS.length === 0) {
    var vazio = document.createElement("div");
    vazio.className = "mensagem-vazia";
    vazio.textContent = "Nenhum livro cadastrado ainda.";
    container.appendChild(vazio);
    return;
  }

  var porAno = agrupar(LIVROS, "ano");
  var anos = Object.keys(porAno).sort().reverse();

  anos.forEach(function (ano) {
    var secaoAno = document.createElement("section");
    secaoAno.className = "grupo-ano";

    var tituloAno = document.createElement("h2");
    tituloAno.textContent = ano;
    secaoAno.appendChild(tituloAno);

    var porBimestre = agrupar(porAno[ano], "bimestre");
    var bimestres = Object.keys(porBimestre).sort();

    bimestres.forEach(function (bimestre) {
      var secaoBimestre = document.createElement("div");
      secaoBimestre.className = "grupo-bimestre";

      var tituloBimestre = document.createElement("h3");
      tituloBimestre.textContent = bimestre + "º bimestre";
      secaoBimestre.appendChild(tituloBimestre);

      var lista = document.createElement("ul");
      lista.className = "lista-livros";

      porBimestre[bimestre].forEach(function (livro) {
        lista.appendChild(criarItem(livro));
      });

      secaoBimestre.appendChild(lista);
      secaoAno.appendChild(secaoBimestre);
    });

    container.appendChild(secaoAno);
  });

  function agrupar(lista, campo) {
    var grupos = {};
    lista.forEach(function (item) {
      var chave = item[campo] || "Sem informação";
      if (!grupos[chave]) grupos[chave] = [];
      grupos[chave].push(item);
    });
    return grupos;
  }

  function criarItem(livro) {
    var item = document.createElement("li");
    item.className = "item-livro";

    var linha = document.createElement("div");
    var titulo = document.createElement("span");
    titulo.className = "titulo-livro";
    titulo.textContent = livro.titulo;

    var autor = document.createElement("span");
    autor.className = "autor-livro";
    autor.textContent = " — " + livro.autor;

    linha.appendChild(titulo);
    linha.appendChild(autor);
    item.appendChild(linha);

    if (livro.observacoes) {
      var obs = document.createElement("div");
      obs.className = "obs-livro";
      obs.textContent = livro.observacoes;
      item.appendChild(obs);
    }

    return item;
  }
});
