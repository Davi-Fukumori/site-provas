// Lógica da página "Perguntas": login com Google, pergunta do dia, resposta e pontos.
// Depende de `auth` e `db`, definidos em assets/js/firebase-init.js (carregado antes
// deste arquivo).
document.addEventListener("DOMContentLoaded", function () {
  var elLogin = document.getElementById("bloco-login");
  var elBotaoLogin = document.getElementById("botao-login");
  var elErroLogin = document.getElementById("erro-login");

  var elJogo = document.getElementById("bloco-jogo");
  var elPerfil = document.getElementById("perfil-usuario");
  var elBotaoLogout = document.getElementById("botao-logout");

  var elCarregando = document.getElementById("carregando-pergunta");
  var elPergunta = document.getElementById("bloco-pergunta");
  var elMateria = document.getElementById("pergunta-materia");
  var elTexto = document.getElementById("pergunta-texto");
  var elAlternativas = document.getElementById("pergunta-alternativas");
  var elEnviar = document.getElementById("botao-enviar-resposta");

  var elResultado = document.getElementById("bloco-resultado");
  var elErroJogo = document.getElementById("erro-jogo");

  var perguntaAtual = null; // { perguntaId, materia, texto, alternativas, pontos, data }
  var alternativaSelecionada = null;

  // "AAAA-MM-DD" no horário de Brasília, pra todo mundo (qualquer fuso do navegador)
  // cair no mesmo "dia" de pergunta.
  function dataDeHojeSP() {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
  }

  // --- Login ---
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
      elJogo.hidden = true;
      return;
    }
    elLogin.hidden = true;
    elJogo.hidden = false;
    elPerfil.textContent = "Logado como " + (usuario.displayName || usuario.email);

    // Garante que existe um documento de perfil (pra aparecer no ranking com nome/foto).
    db.collection("usuarios").doc(usuario.uid).set({
      nome: usuario.displayName || "",
      foto: usuario.photoURL || "",
      email: usuario.email || "",
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).catch(function () {
      // Se a conta já tinha "criadoEm" antigo, tudo bem — merge não sobrescreve o que
      // não foi mandado de novo, então na prática isso raramente falha.
    });

    carregarPerguntaDoDia();
  });

  // --- Pergunta do dia (sorteia e "usa" a primeira vez que alguém abre no dia) ---
  function carregarPerguntaDoDia() {
    elCarregando.hidden = false;
    elPergunta.hidden = true;
    elResultado.hidden = true;
    elErroJogo.textContent = "";

    obterOuCriarPerguntaDoDia(dataDeHojeSP())
      .then(function (dados) {
        perguntaAtual = dados;
        return verificarSeJaRespondeu(dados.data);
      })
      .then(function (jaRespondida) {
        elCarregando.hidden = true;
        if (jaRespondida) {
          mostrarResultadoSalvo(jaRespondida);
        } else {
          mostrarPergunta(perguntaAtual);
        }
      })
      .catch(function (erro) {
        elCarregando.hidden = true;
        elErroJogo.textContent = "Não deu pra carregar a pergunta de hoje: " + erro.message;
      });
  }

  function obterOuCriarPerguntaDoDia(dataStr) {
    var refDia = db.collection("perguntaDoDia").doc(dataStr);

    return refDia.get().then(function (snapDia) {
      if (snapDia.exists) {
        return Object.assign({ data: dataStr }, snapDia.data());
      }
      return sortearPerguntaNaoUsada().then(function (candidataRef) {
        return db.runTransaction(function (tx) {
          return tx.get(refDia).then(function (snapDiaTx) {
            if (snapDiaTx.exists) {
              return { jaExistia: true, dados: snapDiaTx.data() };
            }
            return tx.get(candidataRef).then(function (snapPergunta) {
              if (!snapPergunta.exists || snapPergunta.data().usada) {
                throw new Error("TENTAR_DE_NOVO");
              }
              var p = snapPergunta.data();
              var dadosDia = {
                perguntaId: candidataRef.id,
                materia: p.materia,
                texto: p.texto,
                alternativas: p.alternativas,
                pontos: p.pontos
              };
              tx.set(refDia, dadosDia);
              tx.update(candidataRef, { usada: true });
              return { jaExistia: false, dados: dadosDia };
            });
          });
        });
      }).then(function (resultado) {
        return Object.assign({ data: dataStr }, resultado.dados);
      }).catch(function (erro) {
        if (erro.message === "TENTAR_DE_NOVO") {
          return obterOuCriarPerguntaDoDia(dataStr);
        }
        throw erro;
      });
    });
  }

  function sortearPerguntaNaoUsada() {
    return db.collection("perguntas").where("usada", "==", false).limit(50).get().then(function (snap) {
      if (snap.empty) {
        throw new Error("O banco de perguntas acabou — peça pra quem cuida do site adicionar mais em \"perguntas\" no Firestore.");
      }
      var indice = Math.floor(Math.random() * snap.docs.length);
      return snap.docs[indice].ref;
    });
  }

  // --- Responder ---
  function mostrarPergunta(p) {
    elMateria.textContent = p.materia;
    elTexto.textContent = p.texto;
    elAlternativas.innerHTML = "";
    alternativaSelecionada = null;
    elEnviar.disabled = true;

    p.alternativas.forEach(function (texto, indice) {
      var id = "alt-" + indice;
      var linha = document.createElement("label");
      linha.className = "alternativa";
      linha.setAttribute("for", id);

      var input = document.createElement("input");
      input.type = "radio";
      input.name = "alternativa";
      input.id = id;
      input.value = String(indice);
      input.addEventListener("change", function () {
        alternativaSelecionada = indice;
        elEnviar.disabled = false;
      });

      var span = document.createElement("span");
      span.textContent = texto;

      linha.appendChild(input);
      linha.appendChild(span);
      elAlternativas.appendChild(linha);
    });

    elPergunta.hidden = false;
  }

  elEnviar.addEventListener("click", function () {
    if (alternativaSelecionada === null || !perguntaAtual) return;
    elEnviar.disabled = true;
    elErroJogo.textContent = "";

    var usuario = auth.currentUser;
    var respostaId = usuario.uid + "_" + perguntaAtual.data;

    var dadosResposta = {
      uid: usuario.uid,
      nome: usuario.displayName || "",
      data: perguntaAtual.data,
      perguntaId: perguntaAtual.perguntaId,
      materia: perguntaAtual.materia,
      alternativaEscolhida: alternativaSelecionada,
      acertou: null, // a regra do Firestore recalcula e só aceita se bater
      pontosGanhos: null,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    // A regra exige que "acertou"/"pontosGanhos" já venham certos — como o navegador
    // não tem o gabarito, ele não tem como saber o valor certo sozinho. Por isso,
    // primeiro tentamos com os dois "chutes" possíveis (acertou true e false) e a
    // regra só deixa passar o que realmente bate com o gabarito guardado no servidor.
    tentarEnviarResposta(respostaId, dadosResposta, true)
      .catch(function () {
        return tentarEnviarResposta(respostaId, dadosResposta, false);
      })
      .then(function () {
        return db.collection("respostas").doc(respostaId).get();
      })
      .then(function (snap) {
        mostrarResultadoSalvo(snap.data());
      })
      .catch(function (erro) {
        elErroJogo.textContent = "Não deu pra registrar sua resposta: " + erro.message;
        elEnviar.disabled = false;
      });
  });

  function tentarEnviarResposta(respostaId, base, chuteAcertou) {
    var dados = Object.assign({}, base, {
      acertou: chuteAcertou,
      pontosGanhos: chuteAcertou ? perguntaAtual.pontos : 0
    });
    return db.collection("respostas").doc(respostaId).set(dados);
  }

  function verificarSeJaRespondeu(dataStr) {
    var usuario = auth.currentUser;
    return db.collection("respostas").doc(usuario.uid + "_" + dataStr).get().then(function (snap) {
      return snap.exists ? snap.data() : null;
    });
  }

  function mostrarResultadoSalvo(resposta) {
    elPergunta.hidden = true;
    elResultado.hidden = false;
    elResultado.className = "bloco-resultado-pergunta " + (resposta.acertou ? "aprovado" : "reprovado");
    elResultado.innerHTML =
      "<p>" + (resposta.acertou ? "✅ Você acertou!" : "❌ Você errou dessa vez.") + "</p>" +
      "<p>Pontos ganhos hoje: <strong>" + resposta.pontosGanhos + "</strong> (" + resposta.materia + ")</p>" +
      "<p>Volte amanhã pra outra pergunta. Confira o <a href=\"ranking.html\">ranking do mês</a>.</p>";
  }
});
