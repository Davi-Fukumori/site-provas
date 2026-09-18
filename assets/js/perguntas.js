// Lógica da página "Perguntas": login com Google, 5 perguntas do dia (uma por frente
// + 1 desafio), pontos e streak.
// Depende de `auth` e `db`, definidos em assets/js/firebase-init.js (carregado antes
// deste arquivo).
document.addEventListener("DOMContentLoaded", function () {
  var FRENTES = ["Exatas", "Linguagens", "Humanas", "Biológicas", "Desafio"];

  var elLogin = document.getElementById("bloco-login");
  var elBotaoLogin = document.getElementById("botao-login");
  var elErroLogin = document.getElementById("erro-login");
  var elAvisoEmbutido = document.getElementById("aviso-navegador-embutido");

  var elJogo = document.getElementById("bloco-jogo");
  var elPerfil = document.getElementById("perfil-usuario");
  var elBotaoLogout = document.getElementById("botao-logout");

  var elCarregando = document.getElementById("carregando-pergunta");
  var elPergunta = document.getElementById("bloco-pergunta");
  var elProgresso = document.getElementById("pergunta-progresso");
  var elMateria = document.getElementById("pergunta-materia");
  var elTexto = document.getElementById("pergunta-texto");
  var elAlternativas = document.getElementById("pergunta-alternativas");
  var elEnviar = document.getElementById("botao-enviar-resposta");

  var elResultado = document.getElementById("bloco-resultado");
  var elErroJogo = document.getElementById("erro-jogo");

  // Array de 5 itens (um por frente, na ordem de FRENTES), cada um:
  // { frente, data, pergunta: {perguntaId, materia, texto, alternativas, pontos},
  //   resposta: null | {acertou, pontosGanhos, materia, ...} }
  var perguntasDoDia = [];
  var indiceAtual = -1;
  var alternativaSelecionada = null;

  // "AAAA-MM-DD" no horário de Brasília, pra todo mundo (qualquer fuso do navegador)
  // cair no mesmo "dia" de pergunta.
  function dataDeHojeSP() {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
  }

  // Calendário puro (sem fuso horário) só pra andar um dia pra trás numa string
  // "AAAA-MM-DD", usado no cálculo do streak.
  function diaAnterior(dataStr) {
    var partes = dataStr.split("-").map(Number);
    var d = new Date(Date.UTC(partes[0], partes[1] - 1, partes[2]));
    d.setUTCDate(d.getUTCDate() - 1);
    var ano = d.getUTCFullYear();
    var mes = String(d.getUTCMonth() + 1).padStart(2, "0");
    var dia = String(d.getUTCDate()).padStart(2, "0");
    return ano + "-" + mes + "-" + dia;
  }

  // Navegadores embutidos de apps de mensagem (WhatsApp, Instagram, etc.) bloqueiam ou
  // atrapalham o login do Google — o storage temporário que o Firebase usa pra
  // completar o login some no meio do caminho. Avisa antes de a pessoa nem tentar.
  function estaEmNavegadorEmbutido() {
    var ua = navigator.userAgent || navigator.vendor || window.opera || "";
    return /FBAN|FBAV|Instagram|Line\/|WhatsApp|MicroMessenger|TikTok|musical_ly/i.test(ua);
  }

  if (elAvisoEmbutido && estaEmNavegadorEmbutido()) {
    elAvisoEmbutido.hidden = false;
  }

  // --- Login ---
  // Usamos o botão do próprio Google (biblioteca accounts.google.com/gsi/client) em vez
  // do signInWithPopup/signInWithRedirect do Firebase — ver o comentário em
  // assets/js/firebase-init.js sobre por que isso é necessário (Safari bloqueia o iframe
  // auxiliar que o Firebase usa, mesmo fora do modo privado).
  function aoReceberCredencialGoogle(resposta) {
    elErroLogin.textContent = "";
    var credencial = firebase.auth.GoogleAuthProvider.credential(resposta.credential);
    auth.signInWithCredential(credencial).catch(function (erro) {
      elErroLogin.textContent = "Não deu pra entrar: " + erro.message;
    });
  }

  // A biblioteca do Google carrega de forma assíncrona (script com "defer"), então espera
  // ela existir antes de inicializar o botão.
  function iniciarLoginGoogle() {
    if (typeof google === "undefined" || !google.accounts || !google.accounts.id) {
      setTimeout(iniciarLoginGoogle, 200);
      return;
    }
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: aoReceberCredencialGoogle
    });
    google.accounts.id.renderButton(elBotaoLogin, {
      theme: "outline",
      size: "large",
      text: "signin_with",
      locale: "pt-BR"
    });
  }
  iniciarLoginGoogle();

  elBotaoLogout.addEventListener("click", function () {
    if (typeof google !== "undefined" && google.accounts && google.accounts.id) {
      google.accounts.id.disableAutoSelect();
    }
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
    // "criadoEm" só é gravado na primeira vez, pra continuar valendo como "data do
    // primeiro login" mesmo depois de logar de novo em outras páginas do site.
    (function () {
      var ref = db.collection("usuarios").doc(usuario.uid);
      ref.get().then(function (snap) {
        var dados = {
          nome: usuario.displayName || "",
          foto: usuario.photoURL || "",
          email: usuario.email || ""
        };
        if (!snap.exists) {
          dados.criadoEm = firebase.firestore.FieldValue.serverTimestamp();
        }
        ref.set(dados, { merge: true });
      });
    })();

    carregarPerguntasDoDia();
  });

  // --- Perguntas do dia (uma por frente, sorteada e "usada" na primeira vez que
  // alguém abre a página naquele dia) ---
  function carregarPerguntasDoDia() {
    elCarregando.hidden = false;
    elPergunta.hidden = true;
    elResultado.hidden = true;
    elErroJogo.textContent = "";

    var dataHoje = dataDeHojeSP();
    var uid = auth.currentUser.uid;

    Promise.all(FRENTES.map(function (frente) {
      return obterOuCriarPerguntaDoDia(dataHoje, frente).then(function (dadosPergunta) {
        return db.collection("respostas").doc(uid + "_" + dataHoje + "_" + frente).get()
          .then(function (snapResposta) {
            return {
              frente: frente,
              data: dataHoje,
              pergunta: dadosPergunta,
              resposta: snapResposta.exists ? snapResposta.data() : null
            };
          });
      });
    })).then(function (itens) {
      perguntasDoDia = itens;
      elCarregando.hidden = true;
      mostrarProximaPendenteOuResumo();
    }).catch(function (erro) {
      elCarregando.hidden = true;
      elErroJogo.textContent = "Não deu pra carregar as perguntas de hoje: " + erro.message;
    });
  }

  function obterOuCriarPerguntaDoDia(dataStr, frente) {
    var refFrente = db.collection("perguntaDoDia").doc(dataStr).collection("frentes").doc(frente);

    return refFrente.get().then(function (snap) {
      if (snap.exists) {
        return snap.data();
      }
      return sortearPerguntaNaoUsada(frente).then(function (candidataRef) {
        return db.runTransaction(function (tx) {
          return tx.get(refFrente).then(function (snapTx) {
            if (snapTx.exists) {
              return { dados: snapTx.data() };
            }
            return tx.get(candidataRef).then(function (snapPergunta) {
              if (!snapPergunta.exists || snapPergunta.data().usada) {
                throw new Error("TENTAR_DE_NOVO");
              }
              var p = snapPergunta.data();
              var dadosFrente = {
                perguntaId: candidataRef.id,
                materia: p.materia,
                texto: p.texto,
                alternativas: p.alternativas,
                pontos: p.pontos
              };
              tx.set(refFrente, dadosFrente);
              tx.update(candidataRef, { usada: true });
              return { dados: dadosFrente };
            });
          });
        }).then(function (resultado) {
          return resultado.dados;
        }).catch(function (erro) {
          if (erro.message === "TENTAR_DE_NOVO") {
            return obterOuCriarPerguntaDoDia(dataStr, frente);
          }
          throw erro;
        });
      });
    });
  }

  // Busca até 200 perguntas ainda não usadas (de qualquer frente) e filtra a frente
  // desejada no navegador — evita precisar de um índice composto no Firestore só pra
  // combinar "usada == false" com "frente == X".
  function sortearPerguntaNaoUsada(frente) {
    return db.collection("perguntas").where("usada", "==", false).limit(200).get().then(function (snap) {
      var candidatas = snap.docs.filter(function (d) { return d.data().frente === frente; });
      if (candidatas.length === 0) {
        throw new Error("Acabaram as perguntas de " + frente + " — peça pra quem cuida do site adicionar mais em \"perguntas\" no Firestore.");
      }
      var indice = Math.floor(Math.random() * candidatas.length);
      return candidatas[indice].ref;
    });
  }

  // --- Exibição / fluxo das 5 perguntas ---
  function mostrarProximaPendenteOuResumo() {
    var indice = -1;
    for (var i = 0; i < perguntasDoDia.length; i++) {
      if (!perguntasDoDia[i].resposta) { indice = i; break; }
    }
    if (indice === -1) {
      mostrarResumoDoDia();
    } else {
      mostrarPergunta(indice);
    }
  }

  function mostrarPergunta(indice) {
    indiceAtual = indice;
    var item = perguntasDoDia[indice];
    var p = item.pergunta;

    elProgresso.textContent = "Pergunta " + (indice + 1) + " de " + FRENTES.length;
    elMateria.textContent = item.frente + (item.frente === "Desafio" ? " 🏆" : "") + " · " + p.materia;
    elTexto.textContent = p.texto;
    elAlternativas.innerHTML = "";
    alternativaSelecionada = null;
    elEnviar.disabled = true;

    p.alternativas.forEach(function (texto, i) {
      var id = "alt-" + i;
      var linha = document.createElement("label");
      linha.className = "alternativa";
      linha.setAttribute("for", id);

      var input = document.createElement("input");
      input.type = "radio";
      input.name = "alternativa";
      input.id = id;
      input.value = String(i);
      input.addEventListener("change", function () {
        alternativaSelecionada = i;
        elEnviar.disabled = false;
      });

      var span = document.createElement("span");
      span.textContent = texto;

      linha.appendChild(input);
      linha.appendChild(span);
      elAlternativas.appendChild(linha);
    });

    elResultado.hidden = true;
    elPergunta.hidden = false;
  }

  elEnviar.addEventListener("click", function () {
    if (alternativaSelecionada === null || indiceAtual === -1) return;
    elEnviar.disabled = true;
    elErroJogo.textContent = "";

    var item = perguntasDoDia[indiceAtual];
    var usuario = auth.currentUser;
    var respostaId = usuario.uid + "_" + item.data + "_" + item.frente;

    var dadosResposta = {
      uid: usuario.uid,
      nome: usuario.displayName || "",
      data: item.data,
      frente: item.frente,
      perguntaId: item.pergunta.perguntaId,
      materia: item.pergunta.materia,
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
        item.resposta = snap.data();
        mostrarResultadoDaPergunta(item);
      })
      .catch(function (erro) {
        elErroJogo.textContent = "Não deu pra registrar sua resposta: " + erro.message;
        elEnviar.disabled = false;
      });
  });

  function tentarEnviarResposta(respostaId, base, chuteAcertou) {
    var item = perguntasDoDia[indiceAtual];
    var dados = Object.assign({}, base, {
      acertou: chuteAcertou,
      pontosGanhos: chuteAcertou ? item.pergunta.pontos : 0
    });
    return db.collection("respostas").doc(respostaId).set(dados);
  }

  function mostrarResultadoDaPergunta(item) {
    elPergunta.hidden = true;
    elResultado.hidden = false;

    var resposta = item.resposta;
    var ehUltima = indiceAtual === FRENTES.length - 1;

    elResultado.className = "bloco-resultado-pergunta " + (resposta.acertou ? "aprovado" : "reprovado");
    elResultado.innerHTML =
      "<p>" + (resposta.acertou ? "✅ Você acertou!" : "❌ Você errou dessa vez.") + "</p>" +
      "<p>Pontos ganhos: <strong>" + resposta.pontosGanhos + "</strong> (" + item.frente + " · " + resposta.materia + ")</p>" +
      "<button id=\"botao-proxima\" class=\"botao\">" + (ehUltima ? "Ver resumo do dia" : "Próxima pergunta") + "</button>";

    document.getElementById("botao-proxima").addEventListener("click", function () {
      mostrarProximaPendenteOuResumo();
    });
  }

  function mostrarResumoDoDia() {
    elPergunta.hidden = true;
    elResultado.hidden = false;

    var totalPontosHoje = 0;
    var acertosHoje = 0;
    perguntasDoDia.forEach(function (item) {
      totalPontosHoje += item.resposta.pontosGanhos || 0;
      if (item.resposta.acertou) acertosHoje++;
    });

    elResultado.className = "bloco-resultado-pergunta aprovado";
    elResultado.innerHTML =
      "<p>🎉 Você respondeu as " + FRENTES.length + " perguntas de hoje!</p>" +
      "<p>Acertos hoje: <strong>" + acertosHoje + " de " + FRENTES.length + "</strong> — " +
      "Pontos ganhos hoje: <strong>" + totalPontosHoje + "</strong></p>" +
      "<p id=\"streak-calculando\">Calculando seu streak...</p>" +
      "<p>Volte amanhã pra manter o streak (precisa responder as " + FRENTES.length +
      " de novo). Confira o <a href=\"ranking.html\">ranking do mês</a>.</p>";

    calcularStreak(auth.currentUser.uid, dataDeHojeSP(), function (streak) {
      var el = document.getElementById("streak-calculando");
      if (!el) return; // usuário já saiu dessa tela
      el.innerHTML = "🔥 Streak atual: <strong>" + streak + (streak === 1 ? " dia" : " dias") +
        "</strong> seguido" + (streak === 1 ? "" : "s") + " respondendo as " + FRENTES.length + " perguntas.";
    });
  }

  // O streak nunca fica guardado num campo (nada pra ninguém tentar fraudar escrevendo
  // direto) — é recalculado aqui, contando dia a dia pra trás a partir de "dataMaisRecente"
  // enquanto houver uma resposta pra cada uma das 5 frentes naquele dia.
  function calcularStreak(uid, dataMaisRecente, callback) {
    var LIMITE_DIAS = 400; // trava de segurança pra não ficar num loop enorme
    var streak = 0;
    var dataAtual = dataMaisRecente;

    function diaEstaCompleto(dataStr) {
      return Promise.all(FRENTES.map(function (frente) {
        return db.collection("respostas").doc(uid + "_" + dataStr + "_" + frente).get();
      })).then(function (snaps) {
        return snaps.every(function (s) { return s.exists; });
      });
    }

    function passo() {
      if (streak >= LIMITE_DIAS) { callback(streak); return; }
      diaEstaCompleto(dataAtual).then(function (completo) {
        if (!completo) { callback(streak); return; }
        streak++;
        dataAtual = diaAnterior(dataAtual);
        passo();
      }).catch(function () {
        callback(streak); // se der erro no meio do caminho, mostra o que já contou
      });
    }

    passo();
  }
});
