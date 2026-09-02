// Lógica da página de ranking: soma os pontos do mês atual (pra disputa) e os pontos
// acumulados por matéria de quem estiver logado (placar "pra sempre", tipo Duolingo).
// Depende de `auth` e `db`, definidos em assets/js/firebase-init.js.
document.addEventListener("DOMContentLoaded", function () {
  var elLogin = document.getElementById("bloco-login");
  var elBotaoLogin = document.getElementById("botao-login");
  var elConteudo = document.getElementById("conteudo-ranking");

  var elMesAtual = document.getElementById("nome-mes-atual");
  var elListaRanking = document.getElementById("lista-ranking-mes");
  var elErroRanking = document.getElementById("erro-ranking");

  var elListaMaterias = document.getElementById("lista-pontos-materia");

  elBotaoLogin.addEventListener("click", function () {
    var provedor = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provedor);
  });

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
