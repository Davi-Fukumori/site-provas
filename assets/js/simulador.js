// Depende de CURSOS_SISU, definido em simulador/data.js
document.addEventListener("DOMContentLoaded", function () {
  var container = document.getElementById("lista-resultados");
  if (!container || typeof CURSOS_SISU === "undefined") return;

  var campos = {
    linguagens: document.getElementById("nota-linguagens"),
    humanas: document.getElementById("nota-humanas"),
    natureza: document.getElementById("nota-natureza"),
    matematica: document.getElementById("nota-matematica"),
    redacao: document.getElementById("nota-redacao")
  };

  function numero(input) {
    var valor = parseFloat(input.value);
    return isNaN(valor) ? null : valor;
  }

  function calcularNotaFinal(notas, pesos) {
    var somaPesos = pesos.linguagens + pesos.humanas + pesos.natureza + pesos.matematica + pesos.redacao;
    var somaPonderada =
      notas.linguagens * pesos.linguagens +
      notas.humanas * pesos.humanas +
      notas.natureza * pesos.natureza +
      notas.matematica * pesos.matematica +
      notas.redacao * pesos.redacao;
    return somaPonderada / somaPesos;
  }

  function renderizar() {
    var notas = {
      linguagens: numero(campos.linguagens),
      humanas: numero(campos.humanas),
      natureza: numero(campos.natureza),
      matematica: numero(campos.matematica),
      redacao: numero(campos.redacao)
    };

    var algumCampoPreenchido = Object.keys(notas).some(function (chave) {
      return notas[chave] !== null;
    });

    container.innerHTML = "";

    if (!algumCampoPreenchido) {
      container.innerHTML = "<p class=\"mensagem-vazia\">Preencha suas notas do ENEM acima pra ver o resultado.</p>";
      return;
    }

    // Campo vazio conta como 0 no cálculo (deixa claro que falta preencher, em vez de
    // simplesmente não calcular nada).
    var notasCompletas = {
      linguagens: notas.linguagens || 0,
      humanas: notas.humanas || 0,
      natureza: notas.natureza || 0,
      matematica: notas.matematica || 0,
      redacao: notas.redacao || 0
    };

    CURSOS_SISU.forEach(function (curso) {
      var notaFinal = calcularNotaFinal(notasCompletas, curso.pesos);
      var diferenca = notaFinal - curso.notaCorte;

      var status, classe;
      if (diferenca >= 20) {
        status = "✅ Passaria com folga";
        classe = "aprovado";
      } else if (diferenca >= 0) {
        status = "⚠️ Passaria, mas por pouco";
        classe = "aprovado";
      } else if (diferenca >= -20) {
        status = "⚠️ Ficou perto, mas não passaria";
        classe = "reprovado";
      } else {
        status = "❌ Não passaria";
        classe = "reprovado";
      }

      var item = document.createElement("div");
      item.className = "item-prova";
      item.innerHTML =
        "<div class=\"info\">" +
        "<h3>" + curso.curso + " — " + curso.universidade + " (" + curso.campus + ")</h3>" +
        "<div class=\"meta\">" + curso.turno + " · " + curso.modalidade + " · " + curso.edicao + "</div>" +
        "</div>" +
        "<div class=\"resultado-materia " + classe + "\" style=\"margin:0\">" +
        status + "<br>Sua nota: " + notaFinal.toFixed(2) + " — Corte: " + curso.notaCorte.toFixed(2) +
        "</div>";
      container.appendChild(item);
    });
  }

  Object.keys(campos).forEach(function (chave) {
    campos[chave].addEventListener("input", renderizar);
  });

  renderizar();
});
