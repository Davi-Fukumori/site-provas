// Depende de CURSOS_FUVEST e MINIMO_GERAL_FUVEST, definidos em simulador/data-fuvest.js
document.addEventListener("DOMContentLoaded", function () {
  var container = document.getElementById("lista-resultados-fuvest");
  if (!container || typeof CURSOS_FUVEST === "undefined") return;

  var campoAcertos = document.getElementById("acertos-fuvest");

  function renderizar() {
    var acertos = parseInt(campoAcertos.value, 10);
    container.innerHTML = "";

    if (isNaN(acertos)) {
      container.innerHTML = "<p class=\"mensagem-vazia\">Digite quantas questões você acertou (de 90) pra ver o resultado.</p>";
      return;
    }

    if (acertos < MINIMO_GERAL_FUVEST) {
      var avisoMinimo = document.createElement("div");
      avisoMinimo.className = "aviso";
      avisoMinimo.innerHTML =
        "<strong>Com " + acertos + " acertos, você fica abaixo do mínimo geral (" +
        MINIMO_GERAL_FUVEST + " acertos, 30%)</strong> — esse mínimo vale pra qualquer" +
        " curso, então não avançaria de fase em nenhum deles.";
      container.appendChild(avisoMinimo);
      return;
    }

    CURSOS_FUVEST.forEach(function (curso) {
      var passaria = acertos >= curso.corteAcertos;
      var classe = passaria ? "aprovado" : "reprovado";
      var status = passaria ? "✅ Avançaria pra 2ª fase" : "❌ Não avançaria pra 2ª fase";

      var item = document.createElement("div");
      item.className = "item-prova";
      item.innerHTML =
        "<div class=\"info\">" +
        "<h3>" + curso.curso + " — USP (Fuvest)</h3>" +
        "<div class=\"meta\">" + curso.edicao + "</div>" +
        "</div>" +
        "<div class=\"resultado-materia " + classe + "\" style=\"margin:0\">" +
        status + "<br>Seus acertos: " + acertos + " — Corte: " + curso.corteAcertos + "/90" +
        "</div>";
      container.appendChild(item);
    });
  }

  campoAcertos.addEventListener("input", renderizar);
  renderizar();
});
