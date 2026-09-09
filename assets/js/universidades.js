// Troca de abas na página de Universidades (ENEM/SISU x Fuvest).
document.addEventListener("DOMContentLoaded", function () {
  var botoes = document.querySelectorAll(".aba-botao");
  if (!botoes.length) return;

  var paineis = {
    sisu: document.getElementById("aba-sisu"),
    fuvest: document.getElementById("aba-fuvest")
  };

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      botoes.forEach(function (b) { b.classList.remove("ativa"); });
      botao.classList.add("ativa");

      Object.keys(paineis).forEach(function (chave) {
        paineis[chave].hidden = chave !== botao.dataset.aba;
      });
    });
  });
});
