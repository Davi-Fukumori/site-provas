// Configuração do Firebase — usada pela seção "Perguntas" (login, pergunta do dia, ranking).
//
// Cole aqui embaixo o objeto que aparece em:
// Console do Firebase > Configurações do projeto (ícone de engrenagem) > Geral >
// "Seus apps" > app Web (</>) > "Configuração do SDK".
//
// Essas chaves são PÚBLICAS por design no Firebase — não tem problema nenhum esse
// arquivo ficar público no GitHub. Quem realmente protege os dados são as regras em
// firestore.rules (coladas no Console > Firestore Database > Regras), não esse arquivo.
//
// Se o projeto Firebase mudar (ex: foi recriado por quem herdou o site), é só trocar
// os valores abaixo pelos novos — não precisa mexer em mais nada.
const firebaseConfig = {
  apiKey: "AIzaSyBJErFalVJuX6K-HzY0LaPbpi0QkuOwJQI",
  authDomain: "site-provas.firebaseapp.com",
  projectId: "site-provas",
  storageBucket: "site-provas.firebasestorage.app",
  messagingSenderId: "896669167478",
  appId: "1:896669167478:web:9206278a5a44cf707ad457"
};

firebase.initializeApp(firebaseConfig);

// Instâncias compartilhadas com as outras páginas (perguntas.js, ranking.js).
const auth = firebase.auth();
const db = firebase.firestore();

// Client ID do "Sign In with Google" usado pelo login (assets/js/perguntas.js e
// assets/js/ranking.js). Pego em Console do Firebase > Authentication > Sign-in method >
// Google > "Web SDK configuration" > Web client ID.
//
// Usamos o botão do próprio Google (biblioteca accounts.google.com/gsi/client) em vez do
// signInWithPopup/signInWithRedirect nativos do Firebase, porque esses últimos dependem
// de um iframe auxiliar no domínio acima (authDomain, um domínio diferente do site) pra
// guardar o estado do login — e o Safari bloqueia esse tipo de storage entre domínios com
// "Impedir Rastreamento Entre Sites", que vem ativado por padrão mesmo fora do modo
// privado. O botão do Google não depende desse iframe, então não esbarra nisso.
const GOOGLE_CLIENT_ID = "896669167478-2i4c2jmak8nadr0cd56fcctbiolucpsc.apps.googleusercontent.com";
