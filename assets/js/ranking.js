// Lógica da página de ranking: soma os pontos do mês atual (pra disputa) e os pontos
// acumulados por matéria de quem estiver logado (placar "pra sempre", tipo Duolingo).
// Depende de `auth` e `db`, definidos em assets/js/firebase-init.js.
document.addEventListener("DOMContentLoaded", function () {
  var elLogin = document.getElementById("bloco-login");
  var elBotaoLogin = document.getElementById("botao-login");
  var elErroLogin = document.getElementById("erro-login");
  var elAvisoEmbutido = document.getElementById("aviso-navegador-embutido");
  var elConteudo = document.getElementById("conteudo-ranking");

  var elMesAtual = document.getElementById("nome-mes-atual");
  var elListaRanking = document.getElementById("lista-ranking-mes");
  var elErroRanking = document.getElementById("erro-ranking");

  var elListaMaterias = document.getElementById("lista-pontos-materia");

  // Navegadores embutidos de apps de mensagem (WhatsApp, Instagram, etc.) bloqueiam ou
  // atrapalham o login do Google — avisa antes de a pessoa nem tentar.
  function estaEmNavegadorEmbutido() {
    var ua = navigator.userAgent || navigator.vendor || window.opera || "";
    return /FBAN|FBAV|Instagram|Line\/|WhatsApp|MicroMessenger|TikTok|musical_ly/i.test(ua);
  }

  if (elAvisoEmbutido && estaEmNavegadorEmbutido()) {
    elAvisoEmbutido.hidden = false;
  }

  // Usamos o botão do próprio Google (biblioteca accounts.google.com/gsi/client) em vez
  // do signInWithPopup/signInWithRedirect do Firebase — ver o comentário em
  // assets/js/firebase-init.js sobre por que isso é necessário (Safari bloqueia o iframe
  // auxiliar que o Firebase usa, mesmo fora do modo privado).
  function aoReceberCredencialGoogle(resposta) {
    if (elErroLogin) elErroLogin.textContent = "";
    var credencial = firebase.auth.GoogleAuthProvider.credential(resposta.credential);
    auth.signInWithCredential(credencial).catch(function (erro) {
      if (elErroLogin) elErroLogin.textContent = "Não deu pra entrar: " + erro.message;
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

  auth.onAuthStateChanged(function (usuario) {
    if (!usuario) {
      elLogin.hidden = false;
      elConteudo.hidden = true;
      return;
    }
    elLogin.hidden = true;
    elConteudo.hidden = false;
    carregarRankingDoMes();
    carregarPontosPorMateria(usuario.uid);
  });

  function inicioDoMesAtual() {
    var agora = new Date();
    // Início do mês no fuso de Brasília, aproximado usando o mês/ano locais do
    // navegador — suficiente pro corte "qual mês é esse" de um ranking informal.
    return new Date(agora.getFullYear(), agora.getMonth(), 1);
  }

  function carregarRankingDoMes() {
    elErroRanking.textContent = "";
    elListaRanking.innerHTML = "<li class=\"mensagem-vazia\">Carregando...</li>";

    var nomesMeses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho",
      "agosto", "setembro", "outubro", "novembro", "dezembro"];
    var agora = new Date();
    elMesAtual.textContent = nomesMeses[agora.getMonth()] + "/" + agora.getFullYear();

    db.collection("respostas")
      .where("timestamp", ">=", inicioDoMesAtual())
      .get()
      .then(function (snap) {
        var porUsuario = {}; // uid -> { nome, total }
        snap.forEach(function (doc) {
          var r = doc.data();
          if (!porUsuario[r.uid]) {
            porUsuario[r.uid] = { nome: r.nome || "(sem nome)", total: 0 };
          }
          porUsuario[r.uid].total += r.pontosGanhos || 0;
        });

        var lista = Object.keys(porUsuario).map(function (uid) {
          return porUsuario[uid];
        });
        lista.sort(function (a, b) { return b.total - a.total; });

        elListaRanking.innerHTML = "";
        if (lista.length === 0) {
          elListaRanking.innerHTML = "<li class=\"mensagem-vazia\">Ninguém pontuou neste mês ainda.</li>";
          return;
        }
        lista.forEach(function (pessoa, indice) {
          var li = document.createElement("li");
          li.className = "item-ranking";
          li.innerHTML =
            "<span class=\"posicao-ranking\">" + (indice + 1) + "º</span>" +
            "<span class=\"nome-ranking\">" + pessoa.nome + "</span>" +
            "<span class=\"pontos-ranking\">" + pessoa.total + " pts</span>";
          elListaRanking.appendChild(li);
        });
      })
      .catch(function (erro) {
        elErroRanking.textContent = "Não deu pra carregar o ranking: " + erro.message;
        elListaRanking.innerHTML = "";
      });
  }

  function carregarPontosPorMateria(uid) {
    elListaMaterias.innerHTML = "<li class=\"mensagem-vazia\">Carregando...</li>";

    db.collection("respostas").where("uid", "==", uid).get().then(function (snap) {
      var porMateria = {};
      snap.forEach(function (doc) {
        var r = doc.data();
        porMateria[r.materia] = (porMateria[r.materia] || 0) + (r.pontosGanhos || 0);
      });

      var materias = Object.keys(porMateria).sort();
      elListaMaterias.innerHTML = "";
      if (materias.length === 0) {
        elListaMaterias.innerHTML = "<li class=\"mensagem-vazia\">Você ainda não respondeu nenhuma pergunta.</li>";
        return;
      }
      materias.forEach(function (materia) {
        var li = document.createElement("li");
        li.className = "item-ranking";
        li.innerHTML =
          "<span class=\"nome-ranking\">" + materia + "</span>" +
          "<span class=\"pontos-ranking\">" + porMateria[materia] + " pts</span>";
        elListaMaterias.appendChild(li);
      });
    });
  }
});
