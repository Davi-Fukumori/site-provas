// Login na página inicial. Depois de logar aqui, o mesmo login já vale pro resto
// do site (mesma origem) — não precisa logar de novo na Calculadora nem em Perguntas.
// Depende de `auth`/`db`, definidos em assets/js/firebase-init.js.
document.addEventListener("DOMContentLoaded", function () {
  var elLogin = document.getElementById("bloco-login");
  if (!elLogin || typeof auth === "undefined") return;

  var elBotaoLogin = document.getElementById("botao-login");
  var elErroLogin = document.getElementById("erro-login");
  var elHome = document.getElementById("bloco-home");
  var elPerfil = document.getElementById("perfil-usuario");
  var elBotaoLogout = document.getElementById("botao-logout");

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

  // Cria o perfil na primeira vez que essa conta loga (criadoEm só é gravado uma
  // vez); nas próximas vezes só atualiza nome/foto/e-mail, caso mudem no Google.
  function garantirPerfil(usuario) {
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
  }

  auth.onAuthStateChanged(function (usuario) {
    if (!usuario) {
      elLogin.hidden = false;
      elHome.hidden = true;
      return;
    }
    elLogin.hidden = true;
    elHome.hidden = false;
    elPerfil.textContent = "Logado como " + (usuario.displayName || usuario.email);
    garantirPerfil(usuario);
  });
});
