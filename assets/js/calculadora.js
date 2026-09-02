// Depende de MATERIAS, GRUPOS, AREAS_LABEL, PESO_PORTUGUES_NORMAL e PESO_REDACAO,
// definidos em calculadora/materias.js, e de `auth`/`db`, definidos em
// assets/js/firebase-init.js (carregado antes deste arquivo).
document.addEventListener("DOMContentLoaded", function () {
  var container = document.getElementById("lista-materias");
  if (!container || typeof MATERIAS === "undefined") return;

  var elLogin = document.getElementById("bloco-login");
  var elBotaoLogin = document.getElementById("botao-login");
  var elErroLogin = document.getElementById("erro-login");
  var elCalculadora = document.getElementById("bloco-calculadora");
  var elPerfil = document.getElementById("perfil-usuario");
  var elBotaoLogout = document.getElementById("botao-logout");
  var elStatusSalvamento = document.getElementById("status-salvamento");

  var areaInputs = {
    exatas: document.getElementById("area-exatas"),
    linguas: document.getElementById("area-linguas"),
    humanas: document.getElementById("area-humanas"),
    biologicas: document.getElementById("area-biologicas")
  };
  var elBernoulli = document.getElementById("nota-bernoulli");
  var elSimuladoGeral = document.getElementById("simulado-geral");
  var elBonusGeral = document.getElementById("bonus-geral");
  var notaMinima = document.getElementById("nota-minima");

  var cartoes = [];

  function numero(input, padrao) {
    var base = padrao !== undefined ? padrao : 0;
    if (!input) return base;
    var valor = parseFloat(input.value);
    return isNaN(valor) ? base : valor;
  }

  function criarCampoNumero(id, rotulo, desabilitado) {
    var wrapper = document.createElement("div");
    wrapper.className = "campo";

    var label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = rotulo;

    var input = document.createElement("input");
    input.type = "number";
    input.id = id;
    input.min = "0";
    input.max = "10";
    input.step = "0.1";
    if (desabilitado) input.disabled = true;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    return { wrapper: wrapper, input: input };
  }

  function criarCartao(materia) {
    var slug = materia.slug;

    var cartao = document.createElement("div");
    cartao.className = "cartao-materia";

    var titulo = document.createElement("h3");
    titulo.textContent = materia.nome;
    cartao.appendChild(titulo);

    var subtitulo = document.createElement("div");
    subtitulo.className = "subtitulo-materia";
    subtitulo.textContent = "Área do Simulado Vital: " + AREAS_LABEL[materia.area];
    cartao.appendChild(subtitulo);

    var campos = document.createElement("div");
    campos.className = "campos-materia";

    // AC2 nunca é digitada: é compartilhada com as outras matérias da mesma área
    // (nota da área + Bônus). Mostrada desabilitada só pra referência.
    var ac2Campo = criarCampoNumero("mat-" + slug + "-ac2", "AC2 (compartilhada)", true);
    campos.appendChild(ac2Campo.wrapper);

    var entradas = { ac2: ac2Campo.input };

    if (materia.grupo === "A") {
      var ac1 = criarCampoNumero("mat-" + slug + "-ac1", "AC1");
      var ac3a = criarCampoNumero("mat-" + slug + "-ac3a", "AC3a");
      var ac3b = criarCampoNumero("mat-" + slug + "-ac3b", "AC3b");
      var c1a = criarCampoNumero("mat-" + slug + "-c1a", "C1a");
      var c1b = criarCampoNumero("mat-" + slug + "-c1b", "C1b");
      var c2a = criarCampoNumero("mat-" + slug + "-c2a", "C2a");
      var c2b = criarCampoNumero("mat-" + slug + "-c2b", "C2b");
      [ac1, ac3a, ac3b, c1a, c1b, c2a, c2b].forEach(function (campo) {
        campos.appendChild(campo.wrapper);
      });
      entradas.ac1 = ac1.input;
      entradas.ac3a = ac3a.input;
      entradas.ac3b = ac3b.input;
      entradas.c1a = c1a.input;
      entradas.c1b = c1b.input;
      entradas.c2a = c2a.input;
      entradas.c2b = c2b.input;

      if (materia.redacao) {
        var tituloRedacao = document.createElement("div");
        tituloRedacao.className = "subtitulo-materia";
        tituloRedacao.style.marginTop = "12px";
        tituloRedacao.textContent = "Redação (40% da média, notas à parte)";
        cartao.appendChild(campos);
        campos = document.createElement("div");
        campos.className = "campos-materia";
        cartao.appendChild(tituloRedacao);

        var ac1r = criarCampoNumero("mat-" + slug + "-ac1-redacao", "AC1 (redação)");
        var ac2r = criarCampoNumero("mat-" + slug + "-ac2-redacao", "AC2 (redação)");
        var ac3r = criarCampoNumero("mat-" + slug + "-ac3-redacao", "AC3 (redação)");
        [ac1r, ac2r, ac3r].forEach(function (campo) {
          campos.appendChild(campo.wrapper);
        });
        entradas.redacao = { ac1: ac1r.input, ac2: ac2r.input, ac3: ac3r.input };
      }
    } else {
      var c1Especial = criarCampoNumero("mat-" + slug + "-c1", "C1");
      var c2Especial = criarCampoNumero("mat-" + slug + "-c2", "C2");
      [c1Especial, c2Especial].forEach(function (campo) {
        campos.appendChild(campo.wrapper);
      });
      entradas.c1 = c1Especial.input;
      entradas.c2 = c2Especial.input;
    }

    cartao.appendChild(campos);

    var resultadoEl = document.createElement("div");
    resultadoEl.className = "resultado-materia";
    cartao.appendChild(resultadoEl);

    var necessarioEl = document.createElement("div");
    necessarioEl.className = "necessario-materia";
    cartao.appendChild(necessarioEl);

    container.appendChild(cartao);

    return { materia: materia, entradas: entradas, resultadoEl: resultadoEl, necessarioEl: necessarioEl };
  }

  MATERIAS.forEach(function (materia) {
    cartoes.push(criarCartao(materia));
  });

  // Monta a lista de "componentes" (notas que o aluno realmente digita) de uma
  // matéria, cada um já com o peso final dele na média (0 a 1). Usado tanto pra
  // calcular a média quanto pra calcular quanto falta nas notas em branco.
  function montarComponentes(cartao) {
    var materia = cartao.materia;
    var pesos = GRUPOS[materia.grupo].pesos;
    var componentes = [];

    if (materia.grupo === "A") {
      var fator = materia.redacao ? PESO_PORTUGUES_NORMAL : 1;
      componentes.push({ nome: "AC1", input: cartao.entradas.ac1, peso: pesos.ac1 * fator });
      componentes.push({ nome: "AC3a", input: cartao.entradas.ac3a, peso: (pesos.ac3 / 2) * fator });
      componentes.push({ nome: "AC3b", input: cartao.entradas.ac3b, peso: (pesos.ac3 / 2) * fator });
      componentes.push({ nome: "C1a", input: cartao.entradas.c1a, peso: (pesos.c1 / 2) * fator });
      componentes.push({ nome: "C1b", input: cartao.entradas.c1b, peso: (pesos.c1 / 2) * fator });
      componentes.push({ nome: "C2a", input: cartao.entradas.c2a, peso: (pesos.c2 / 2) * fator });
      componentes.push({ nome: "C2b", input: cartao.entradas.c2b, peso: (pesos.c2 / 2) * fator });

      if (materia.redacao) {
        var pesoRedacaoCada = PESO_REDACAO / 3;
        componentes.push({ nome: "AC1 (redação)", input: cartao.entradas.redacao.ac1, peso: pesoRedacaoCada });
        componentes.push({ nome: "AC2 (redação)", input: cartao.entradas.redacao.ac2, peso: pesoRedacaoCada });
        componentes.push({ nome: "AC3 (redação)", input: cartao.entradas.redacao.ac3, peso: pesoRedacaoCada });
      }
    } else {
      componentes.push({ nome: "C1", input: cartao.entradas.c1, peso: pesos.c1 });
      componentes.push({ nome: "C2", input: cartao.entradas.c2, peso: pesos.c2 });
    }

    return componentes;
  }

  // AC2 e o Simulado Vital vêm dos campos de área/Bernoulli (compartilhados), não
  // são "provas que faltam" — por isso entram como contribuição fixa, não como
  // componente que o aluno pode deixar em branco.
  function contribuicaoFixa(materia, ac2, simuladoGeral) {
    var pesos = GRUPOS[materia.grupo].pesos;
    if (materia.grupo === "A") {
      var fator = materia.redacao ? PESO_PORTUGUES_NORMAL : 1;
      return (ac2 * pesos.ac2 + simuladoGeral * pesos.simulado) * fator;
    }
    return ac2 * pesos.ac2;
  }

  function calcularNecessario(componentes, fixa, minima) {
    var soma = fixa;
    var pesoFaltando = 0;
    var nomesFaltando = [];

    componentes.forEach(function (c) {
      var bruto = c.input.value;
      if (bruto === "") {
        pesoFaltando += c.peso;
        nomesFaltando.push(c.nome);
        return;
      }
      var valor = parseFloat(bruto);
      if (isNaN(valor)) {
        pesoFaltando += c.peso;
        nomesFaltando.push(c.nome);
      } else {
        soma += valor * c.peso;
      }
    });

    if (nomesFaltando.length === 0) return null;
    return { necessario: (minima - soma) / pesoFaltando, nomes: nomesFaltando };
  }

  function recalcularTudo() {
    var areas = {
      exatas: numero(areaInputs.exatas),
      linguas: numero(areaInputs.linguas),
      humanas: numero(areaInputs.humanas),
      biologicas: numero(areaInputs.biologicas)
    };

    var simuladoGeral = (areas.exatas + areas.linguas + areas.humanas + areas.biologicas) / 4;
    var bonus = numero(elBernoulli) / 10;

    elSimuladoGeral.textContent = simuladoGeral.toFixed(2);
    elBonusGeral.textContent = "+" + bonus.toFixed(2);

    var minima = numero(notaMinima, 6);

    cartoes.forEach(function (cartao) {
      var materia = cartao.materia;
      var ac2 = Math.min(10, areas[materia.area] + bonus);

      // AC2 é compartilhada: só exibida (campo desabilitado), nunca digitada.
      cartao.entradas.ac2.value = ac2.toFixed(2);

      var componentes = montarComponentes(cartao);
      var fixa = contribuicaoFixa(materia, ac2, simuladoGeral);

      var media = fixa;
      componentes.forEach(function (c) {
        media += numero(c.input) * c.peso;
      });

      var aprovado = media >= minima;
      cartao.resultadoEl.className = "resultado-materia " + (aprovado ? "aprovado" : "reprovado");
      cartao.resultadoEl.textContent =
        "Média: " + media.toFixed(2) + " — " + (aprovado ? "Aprovado" : "Abaixo da mínima");

      var necessario = calcularNecessario(componentes, fixa, minima);
      if (!necessario) {
        cartao.necessarioEl.textContent = "";
      } else {
        var listaNomes = necessario.nomes.join(", ");
        var singular = necessario.nomes.length === 1;

        if (necessario.necessario <= 0) {
          cartao.necessarioEl.textContent =
            "Já garante a aprovação mesmo tirando 0 em " + listaNomes + ".";
        } else if (necessario.necessario > 10) {
          cartao.necessarioEl.textContent =
            "Não dá mais pra alcançar a média só com " + listaNomes + " (precisaria de mais de 10).";
        } else if (singular) {
          cartao.necessarioEl.textContent =
            "Precisa tirar pelo menos " + necessario.necessario.toFixed(2) + " em " + listaNomes +
            " pra bater a média.";
        } else {
          cartao.necessarioEl.textContent =
            "Precisa tirar pelo menos " + necessario.necessario.toFixed(2) + " em cada uma dessas notas " +
            "pra bater a média: " + listaNomes + ".";
        }
      }
    });
  }

  // --- Login e salvamento das notas na conta Google ---
  // Junta o valor de todo campo numérico habilitado (ou seja, digitado pelo aluno —
  // os campos de AC2 ficam desabilitados porque são calculados, não digitados) num
  // objeto simples { "id-do-campo": "valor" }. Isso não depende da lista de matérias
  // específica, então continua funcionando mesmo se `materias.js` mudar depois.
  function coletarValoresParaSalvar() {
    var valores = {};
    document.querySelectorAll("main input[type=number]:not(:disabled)").forEach(function (input) {
      if (input.id) valores[input.id] = input.value;
    });
    return valores;
  }

  function aplicarValoresSalvos(valores) {
    Object.keys(valores || {}).forEach(function (id) {
      var input = document.getElementById(id);
      if (input && !input.disabled) input.value = valores[id];
    });
  }

  var salvarTimeout = null;
  function agendarSalvar() {
    if (!auth.currentUser) return;
    elStatusSalvamento.textContent = "Salvando...";
    clearTimeout(salvarTimeout);
    salvarTimeout = setTimeout(function () {
      db.collection("usuarios").doc(auth.currentUser.uid).set({
        calculadora: coletarValoresParaSalvar()
      }, { merge: true }).then(function () {
        elStatusSalvamento.textContent = "Notas salvas.";
      }).catch(function (erro) {
        elStatusSalvamento.textContent = "Não deu pra salvar: " + erro.message;
      });
    }, 800);
  }

  elBotaoLogin.addEventListener("click", function () {
    elErroLogin.textContent = "";
    var provedor = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provedor).catch(function (erro) {
      elErroLogin.textContent = "Não deu pra entrar: " + erro.message;
    });
  });

  elBotaoLogout.addEventListener("click", function () {
    auth.signOut();
  });

  auth.onAuthStateChanged(function (usuario) {
    if (!usuario) {
      elLogin.hidden = false;
      elCalculadora.hidden = true;
      return;
    }
    elLogin.hidden = true;
    elCalculadora.hidden = false;
    elPerfil.textContent = "Logado como " + (usuario.displayName || usuario.email);
    elStatusSalvamento.textContent = "Carregando suas notas...";

    db.collection("usuarios").doc(usuario.uid).set({
      nome: usuario.displayName || "",
      foto: usuario.photoURL || "",
      email: usuario.email || "",
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).catch(function () {});

    db.collection("usuarios").doc(usuario.uid).get().then(function (snap) {
      var dados = snap.exists ? snap.data() : null;
      if (dados && dados.calculadora) {
        aplicarValoresSalvos(dados.calculadora);
      }
      elStatusSalvamento.textContent = dados && dados.calculadora ? "Notas carregadas." : "";
      recalcularTudo();
    }).catch(function (erro) {
      elStatusSalvamento.textContent = "Não deu pra carregar suas notas: " + erro.message;
      recalcularTudo();
    });
  });

  Object.keys(areaInputs).forEach(function (chave) {
    areaInputs[chave].addEventListener("input", function () {
      recalcularTudo();
      agendarSalvar();
    });
  });
  elBernoulli.addEventListener("input", function () {
    recalcularTudo();
    agendarSalvar();
  });
  notaMinima.addEventListener("input", function () {
    recalcularTudo();
    agendarSalvar();
  });
  container.addEventListener("input", function () {
    recalcularTudo();
    agendarSalvar();
  });

  recalcularTudo();
});
