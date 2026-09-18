// Menu de navegação (usado em todas as páginas)
document.addEventListener("DOMContentLoaded", function () {
  var botao = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (!botao || !links) return;

  botao.addEventListener("click", function () {
    var aberto = links.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
  });
});
