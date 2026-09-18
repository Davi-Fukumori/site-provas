// Depende do array global QUESTOES_SIMULADO, definido em simulados/data.js.
// Sem login, sem Firebase — tudo roda e é corrigido no navegador.
document.addEventListener("DOMContentLoaded", function () {
  if (typeof QUESTOES_SIMULADO === "undefined") return;

  var FRENTES_SIMULADO = ["Exatas", "Linguagens", "Humanas", "Biológicas", "Interdisciplinar"];
  var COTAS = { Exatas: 5, Linguagens: 4, Humanas: 4, Biológicas: 4, Interdisciplinar: 3 };
  var ORDEM_REPOSICAO = ["Exatas", "Humanas", "Linguagens", "Biológicas", "Interdisciplinar"];

  var elConfig = document.getElementById("bloco-config");
  var elPergunta = document.getElementById("bloco-pergunta");
  var elResultado = document.getElementById("bloco-resultado");
  var elProgresso = document.getElementById("simulado-progresso");
  var elMateria = document.getElementById("simulado-materia");
  var elTexto = document.getElementById("simulado-texto");
  var elAlternativas = document.getElementById("simulado-alternativas");
  var elBotaoResponder = document.getElementById("botao-responder-simulado");
  var elBotaoGerar = document.getElementById("botao-gerar-simulado");

  var questoesDoSimulado = [];
  var indiceAtual = 0;
  var alternativaSelecionada = null;
  var respostas = []; // { questao, escolhida, acertou }

  elBotaoGerar.addEventListener("click", function () {
    questoesDoSimulado = gerarSimulado(QUESTOES_SIMULADO, 20);
    respostas = [];
    indiceAtual = 0;
    elConfig.hidden = true;
    mostrarPergunta(0);
  });

  function embaralhar(lista) {
    var a = lista.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function materiaPrincipal(q) {
    return Array.isArray(q.materia) ? q.materia[0] : q.materia;
  }

  function materiaParaExibir(q) {
    return Array.isArray(q.materia) ? q.materia.join(" + ") : q.materia;
  }

  // Escolhe até `cota` questões de um bucket, alternando entre as matérias desse
  // bucket (round-robin) pra não puxar tudo da mesma matéria só porque ela tem
  // mais questões cadastradas que as outras.
  function escolherDoBucket(questoesDoBucket, cota) {
    var porMateria = {};
    embaralhar(questoesDoBucket).forEach(function (q) {
      var m = materiaPrincipal(q);
      (porMateria[m] = porMateria[m] || []).push(q);
    });
    var materias = embaralhar(Object.keys(porMateria));
    var escolhidas = [];
    var i = 0;
    var tentativasSemEscolha = 0;
    while (escolhidas.length < cota && materias.length > 0 && tentativasSemEscolha < materias.length) {
      var m = materias[i % materias.length];
      if (porMateria[m].length > 0) {
        escolhidas.push(porMateria[m].pop());
        tentativasSemEscolha = 0;
      } else {
        tentativasSemEscolha++;
      }
      i++;
    }
    return escolhidas;
  }

  // Monta um simulado com até `tamanhoAlvo` questões (20 por padrão). Se o banco
  // ainda for pequeno, devolve menos que isso em vez de travar — nunca lança erro
  // por falta de questões.
  function gerarSimulado(banco, tamanhoAlvo) {
    tamanhoAlvo = tamanhoAlvo || 20;
    var buckets = {};
    FRENTES_SIMULADO.forEach(function (f) { buckets[f] = []; });
    banco.forEach(function (q) {
      if (!buckets[q.frente]) buckets[q.frente] = [];
      buckets[q.frente].push(q);
    });

    var escolhidas = [];
    var faltando = 0;
    FRENTES_SIMULADO.forEach(function (f) {
      var picks = escolherDoBucket(buckets[f] || [], COTAS[f] || 0);
      faltando += (COTAS[f] || 0) - picks.length;
      escolhidas = escolhidas.concat(picks);
    });

    var idsEscolhidos = {};
    escolhidas.forEach(function (q) { idsEscolhidos[q.id] = true; });

    var ordemReposicao = ORDEM_REPOSICAO.slice();
    var i2 = 0;
    while (faltando > 0 && ordemReposicao.length > 0) {
      var f2 = ordemReposicao[i2 % ordemReposicao.length];
      var sobra = (buckets[f2] || []).filter(function (q) { return !idsEscolhidos[q.id]; });
      if (sobra.length === 0) {
        ordemReposicao.splice(i2 % ordemReposicao.length, 1);
        continue;
      }
      var extra = sobra[Math.floor(Math.random() * sobra.length)];
      idsEscolhidos[extra.id] = true;
      escolhidas.push(extra);
      faltando--;
      i2++;
    }

    escolhidas = embaralhar(escolhidas);

    // Conserto best-effort: evita duas questões seguidas da mesma matéria.
    for (var k = 0; k < escolhidas.length - 1; k++) {
      if (materiaPrincipal(escolhidas[k]) === materiaPrincipal(escolhidas[k + 1])) {
        for (var j = k + 2; j < escolhidas.length; j++) {
          if (materiaPrincipal(escolhidas[j]) !== materiaPrincipal(escolhidas[k])) {
            var tmp = escolhidas[k + 1]; escolhidas[k + 1] = escolhidas[j]; escolhidas[j] = tmp;
            break;
          }
        }
      }
    }

    return escolhidas.slice(0, Math.min(tamanhoAlvo, escolhidas.length));
  }

  function mostrarPergunta(indice) {
    indiceAtual = indice;
    alternativaSelecionada = null;

    var questao = questoesDoSimulado[indice];
    elProgresso.textContent = "Questão " + (indice + 1) + " de " + questoesDoSimulado.length;
    elMateria.textContent = questao.frente + " · " + materiaParaExibir(questao);
    elTexto.textContent = questao.texto;

    elAlternativas.innerHTML = "";
    questao.alternativas.forEach(function (texto, i) {
      var label = document.createElement("label");
      label.className = "alternativa";

      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "alternativa-simulado";
      radio.value = i;
      radio.addEventListener("change", function () {
        alternativaSelecionada = i;
        elBotaoResponder.disabled = false;
      });

      var span = document.createElement("span");
      span.textContent = texto;

      label.appendChild(radio);
      label.appendChild(span);
      elAlternativas.appendChild(label);
    });

    elBotaoResponder.disabled = true;
    elResultado.hidden = true;
    elPergunta.hidden = false;
  }

  elBotaoResponder.addEventListener("click", function () {
    if (alternativaSelecionada === null) return;
    var questao = questoesDoSimulado[indiceAtual];
    var acertou = alternativaSelecionada === questao.correta;
    respostas.push({ questao: questao, escolhida: alternativaSelecionada, acertou: acertou });
    mostrarResultadoDaQuestao(questao, acertou);
  });

  function mostrarResultadoDaQuestao(questao, acertou) {
    elPergunta.hidden = true;
    elResultado.hidden = false;
    elResultado.className = "bloco-resultado-pergunta " + (acertou ? "aprovado" : "reprovado");

    var textoResultado = acertou ? "✅ Você acertou!" : "❌ Você errou.";
    if (!acertou) {
      textoResultado += " A resposta certa era: \"" + questao.alternativas[questao.correta] + "\".";
    }

    var ehUltima = indiceAtual === questoesDoSimulado.length - 1;
    var textoBotao = ehUltima ? "Ver resultado final" : "Próxima questão";

    elResultado.innerHTML =
      "<p>" + textoResultado + "</p>" +
      (questao.explicacao ? "<p>" + questao.explicacao + "</p>" : "") +
      '<button id="botao-continuar-simulado" class="botao">' + textoBotao + "</button>";

    document.getElementById("botao-continuar-simulado").addEventListener("click", function () {
      if (ehUltima) {
        mostrarResumoFinal();
      } else {
        mostrarPergunta(indiceAtual + 1);
      }
    });
  }

  function mostrarResumoFinal() {
    elPergunta.hidden = true;
    elResultado.hidden = false;

    var acertos = respostas.filter(function (r) { return r.acertou; }).length;
    var erros = respostas.filter(function (r) { return !r.acertou; });

    elResultado.className = "bloco-resultado-pergunta aprovado";

    var tallyPorFrente = {};
    respostas.forEach(function (r) {
      var f = r.questao.frente;
      tallyPorFrente[f] = tallyPorFrente[f] || { acertos: 0, total: 0 };
      tallyPorFrente[f].total++;
      if (r.acertou) tallyPorFrente[f].acertos++;
    });
    var tallyTexto = FRENTES_SIMULADO
      .filter(function (f) { return tallyPorFrente[f]; })
      .map(function (f) { return f + ": " + tallyPorFrente[f].acertos + "/" + tallyPorFrente[f].total; })
      .join(" · ");

    var html = "<h2>Você acertou " + acertos + " de " + respostas.length + "</h2>";
    html += "<p>" + tallyTexto + "</p>";

    if (erros.length === 0) {
      html += "<p>Você acertou todas! 🎉</p>";
    } else {
      html += '<div class="lista-revisao">';
      erros.forEach(function (r) {
        html += '<div class="bloco-resultado-pergunta reprovado">';
        html += "<p><strong>" + r.questao.texto.replace(/\n/g, "<br>") + "</strong></p>";
        html += "<p>Sua resposta: " + r.questao.alternativas[r.escolhida] + "</p>";
        html += "<p>Resposta certa: " + r.questao.alternativas[r.questao.correta] + "</p>";
        if (r.questao.explicacao) html += "<p>" + r.questao.explicacao + "</p>";
        html += "</div>";
      });
      html += "</div>";
    }

    html += '<button id="botao-novo-simulado" class="botao">Gerar novo simulado</button> ';
    html += '<button id="botao-voltar-inicio" class="botao botao-secundario">Voltar pro início</button>';

    elResultado.innerHTML = html;

    document.getElementById("botao-novo-simulado").addEventListener("click", function () {
      questoesDoSimulado = gerarSimulado(QUESTOES_SIMULADO, 20);
      respostas = [];
      mostrarPergunta(0);
    });
    document.getElementById("botao-voltar-inicio").addEventListener("click", function () {
      elResultado.hidden = true;
      elConfig.hidden = false;
    });
  }
});
