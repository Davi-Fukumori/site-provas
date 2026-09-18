// Login na página inicial. Depois de logar aqui, o mesmo login já vale pro resto
// do site (mesma origem) — não precisa logar de novo na Calculadora nem em Perguntas.
// Depende de `auth`/`db`, definidos em assets/js/firebase-init.js.
document.addEventListener("DOMContentLoaded", function () {
  var elLogin = document.getElementById("bloco-login");
  if (!elLogin || typeof auth === "undefined") return;

  var elBotaoLogin = document.getElementById("botao-login");
  var elErroLogin = document.getElementById("erro-login");
  var elAvisoEmbutido = document.getElementById("aviso-navegador-embutido");
  var elHome = document.getElementById("bloco-home");
  var elPerfil = document.getElementById("perfil-usuario");
  var elBotaoLogout = document.getElementById("botao-logout");

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
