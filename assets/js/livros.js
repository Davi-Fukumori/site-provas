// Depende do array global LIVROS, definido em literatura/data.js
document.addEventListener("DOMContentLoaded", function () {
  var elBusca = document.getElementById("busca");
  var container = document.getElementById("lista-livros");
  if (!container || typeof LIVROS === "undefined") return;

  if (elBusca) {
    elBusca.addEventListener("input", renderizar);
  }

  renderizar();

  function renderizar() {
    var termo = elBusca ? elBusca.value.trim().toLowerCase() : "";

    var filtrados = LIVROS.filter(function (livro) {
      if (!termo) return true;
      var alvo = (livro.titulo + " " + livro.autor).toLowerCase();
      return alvo.indexOf(termo) !== -1;
    });

    container.innerHTML = "";

    if (filtrados.length === 0) {
      var vazio = document.createElement("li");
      vazio.className = "mensagem-vazia";
      vazio.textContent = LIVROS.length === 0
        ? "Nenhum livro cadastrado ainda."
        : "Nenhum livro encontrado com essa busca.";
      container.appendChild(vazio);
      return;
    }

    filtrados.forEach(function (livro) {
      container.appendChild(criarItem(livro));
    });
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

    if (livro.arquivo) {
      var link = document.createElement("a");
      link.className = "botao botao-secundario";
      link.href = livro.arquivo;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Ver material de apoio";
      link.style.marginTop = "8px";
      link.style.display = "inline-block";
      item.appendChild(link);
    }

    return item;
  }
});
