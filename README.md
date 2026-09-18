# Estuda Aí

🔗 **Site no ar:** https://davi-fukumori.github.io/site-provas/
📦 **Repositório:** https://github.com/Davi-Fukumori/site-provas

Site estático (sem servidor, sem banco de dados) com:
- **Literatura**: lista dos livros cobrados por ano/bimestre
- **Calculadora de média** ponderada
- **Perguntas**: pergunta diária com login, pontos e ranking (usa Firebase — veja a seção própria mais abaixo)
- **Simulador**: compara sua nota do ENEM com notas de corte do SISU
- **Simulados**: gera um simulado de 20 questões variadas pra treinar sozinho, sem login e sem Firebase (veja a seção própria mais abaixo)

A ideia é que esse site seja passado de aluno pra aluno até a formatura. Este README
existe pra quem herdar o site conseguir mantê-lo mesmo sem muita experiência técnica.

## Como testar localmente

Basta dar duplo-clique no `index.html` — ele abre no navegador e tudo funciona
(filtros, calculadora, etc.), sem precisar instalar nada ou rodar servidor.

## Como adicionar um livro de Literatura

Mesma lógica, só que em `literatura/data.js`. A página é uma lista só (com busca por
título/autor), sem separar por ano ou bimestre:

```js
{
  titulo: "Título do livro",
  autor: "Nome do autor",
  observacoes: "Opcional — deixe '' se não tiver nada a dizer"
}
```

## Como funciona a calculadora de média

A calculadora tem uma fórmula própria por matéria, configurada em
`calculadora/materias.js`. Se a escola mudar os pesos, edite só esse arquivo —
não precisa mexer no HTML nem no `calculadora.js`.

**Login obrigatório:** desde que a seção "Perguntas" foi adicionada (veja mais abaixo),
a calculadora também pede login com Google — assim as notas digitadas ficam salvas na
conta do aluno (documento `usuarios/{uid}`, campo `calculadora`) e aparecem iguais em
qualquer aparelho, em vez de sumir ao recarregar a página. O salvamento é automático
(alguns segundos depois de parar de digitar), não tem botão de "Salvar".

O login em si acontece já na **página inicial** (`index.html`) — quem loga lá não
precisa logar de novo na Calculadora nem em Perguntas, porque é a mesma sessão do
Firebase valendo pro site inteiro (mesmo domínio). Literatura continua
abrindo sem pedir login, já que é só consulta.

**Pra ver quem já logou no site:** não tem uma página dedicada pra isso — é só abrir o
Console do Firebase → Firestore Database → coleção `usuarios` e ver a lista de
documentos (cada um é um aluno que já logou, com nome, e-mail e a data do primeiro
login em `criadoEm`).

**Simulados (AC2) por área:** o topo da página pede 4 notas (Exatas, Linguagens,
Humanas, Biológicas). A média das 4 é o "Simulado" — funciona como uma 3ª
nota contínua (C3) e vale 20% da média de *todas* as matérias.

**Bônus (nota extra):** um campo separado, "Nota extra" — uma nota única (não
por área). Bônus = Nota extra ÷ 10, somado à AC2 de toda matéria (sem passar
de 10). É importante não confundir os dois: os Simulados (AC2) entram como nota
(C3) na fórmula; a nota extra só entra indiretamente, via Bônus na AC2.

**AC2** de cada matéria não é digitada: é a nota de Simulados (AC2) da área dela
+ o Bônus. Matemática usa a de Exatas; Português usa a de Linguagens; História e
Geografia usam a de Humanas; Biologia, Física e Química usam a de Biológicas.

**Matérias "normais"** (Matemática, Química, Física, Biologia, História,
Geografia): AC1 20% + AC2 20% + AC3 20% + C1 10% + C2 10% + Simulado 20%.
AC3 é a média entre os campos AC3a e AC3b.

**Português** usa essa mesma fórmula normal, mas ela vale só 60% da média final.
Os outros 40% vêm da **Redação**, que é a média simples entre 3 notas digitadas
à parte (AC1, AC2 e AC3 de redação) — essas notas não têm relação com o
Bônus/simulado, são só as notas de redação mesmo.

**Educação Física e Artes** (Grupo B): AC2 50% + média(C1, C2) 50% — sem AC1, sem AC3 e
sem os Simulados (AC2) como termo separado (eles já entram indiretamente porque compõem
a AC2). Usam a AC2 de Linguagens.

**Filosofia e Sociologia** (Grupo C): média(AC1, AC2, AC3) × 50% + média(C1, C2, C3) ×
50% — como cada média é de 3 notas, isso equivale a AC1, AC2, AC3, C1, C2 e C3 pesando
1/6 (≈16,67%) cada um, sem os Simulados (AC2) como termo separado (idem acima, já entram
via AC2). Diferente do Grupo A, aqui AC3 é um campo único (não dividido em AC3a/AC3b),
e C1/C2/C3 também são campos únicos, cada um contando ponto por ponto. Usam a AC2 de
Humanas.

**Quanto falta pra passar:** cada cartão de matéria também mostra quanto você
precisa tirar (em média) nas notas que ainda estão em branco pra alcançar a nota
mínima — é só deixar os campos que você ainda não tem vazios (não digite `0`,
porque `0` conta como nota mesmo). Esse cálculo assume que a AC2 e o Simulado
já são valores fechados (vindos dos campos de área/nota extra no topo da
página) — ele não tenta adivinhar valores que ainda não saíram.

## Como funciona a seção "Universidades" (simuladores)

Na navegação, os dois simuladores ficam agrupados atrás de um item só, **"Universidades"**
(`universidades/index.html`) — uma página só, com **abas** ("ENEM/SISU" e "Fuvest") que
trocam de conteúdo sem recarregar a página (`assets/js/universidades.js` cuida da troca).
Os dados e a lógica de cálculo de cada aba continuam em arquivos separados dentro de
`simulador/` (`data.js`/`data-fuvest.js`) e `assets/js/` (`simulador.js`/
`simulador-fuvest.js`) — a página de Universidades só carrega os dois conjuntos de
scripts e alterna qual bloco de HTML fica visível. Se adicionar um simulador novo no
futuro (Mackenzie, PUC-SP etc.), o jeito mais simples é criar mais uma aba seguindo o
mesmo padrão (um botão em `.abas-nav` + um `<div class="aba-conteudo" hidden>` novo).

### Aba ENEM/SISU/Enem-USP

Sem login e sem Firebase — funciona igual a Literatura (`simulador/data.js`,
um `const CURSOS_SISU = [...]` que o `simulador.js` lê e calcula na hora).

**Etapa 1:** cobre o **SISU** (nota do ENEM), o sistema mais padronizado, e também o
**Enem-USP** (forma de entrar na USP com a nota do ENEM sem fazer a Fuvest — usa o
mesmo tipo de cálculo do SISU, por peso de área, e tem ampla concorrência de verdade,
por isso entrou no mesmo arquivo/aba). **Etapa 2:** aba **Fuvest**, cobre a
**1ª fase da Fuvest** — veja a seção própria logo abaixo.

**Por que Comvest (Unicamp) e Unesp-Enem não entraram:** as duas também aceitam nota
do ENEM, mas são bem mais restritas — o Enem-Unicamp é só pra quem cursou o ensino
médio inteiro em escola pública (nem tem ampla concorrência), e o Unesp-Enem reserva
pelo menos metade das vagas pra escola pública. As duas também agrupam as notas em só
3 blocos (Biológicas/Exatas/Humanas) em vez das 5 áreas do ENEM, o que exigiria uma
conta diferente da já usada aqui. Os vestibulares de Mackenzie/PUC-SP/FGV também ainda
não entraram.

**Como adicionar um curso novo (SISU ou Enem-USP):**
1. Pegue a nota de corte **atualizada** direto em [sisu.mec.gov.br](https://sisu.mec.gov.br),
   [fuvest.br/enem-usp](https://www.fuvest.br/enem-usp/) ou no edital da universidade —
   ela muda a cada edição, então não reaproveite um valor antigo sem conferir.
2. Veja no mesmo edital o **peso de cada área** (Linguagens, Humanas, Natureza,
   Matemática, Redação) pra aquele curso específico.
3. Copie um dos blocos de `simulador/data.js` e edite os campos, incluindo a fonte e a
   edição (ex: "SISU 2026" ou "Enem-USP 2026") nos comentários.

Os cursos já cadastrados (em várias universidades federais que participam do SISU) usam
notas de corte reais do SISU 2025 — veja a lista completa em `simulador/data.js`, cada
bloco tem a fonte nos comentários. Os **pesos por área foram estimados** com base no
padrão comum desse tipo de curso (ex: Medicina pesa mais em Ciências da Natureza) — não
foram conferidos um a um no edital oficial. Se for usar pra decisão de verdade, confira
o peso exato do curso que te interessa antes.

Os filtros de "Universidade" e "Curso" na página só ficam realmente úteis à medida que
mais universidades forem cadastradas pro mesmo curso (ex: já dá pra comparar Medicina na
UFSCar vs. na UFMG) — vale ir adicionando mais opções do SISU aos poucos.

### Aba Fuvest (1ª fase)

Mesmo padrão estático da outra aba, sem login. **Só simula a 1ª fase**, não o
resultado final da Fuvest: a nota final depende da
2ª fase inteira, calculada comparando sua prova com a de todo mundo naquele ano (uma
normalização que só existe depois da prova acontecer) — não tem como um aluno prever
isso com antecedência. Já a 1ª fase é só número de acertos em 90 questões, igual pra
todo mundo, e a Fuvest divulga o corte de acertos por curso — isso sim dá pra simular.

Por esse mesmo motivo, **Comvest (Unicamp) e Vunesp (Unesp) não entraram**: a fórmula
delas usa nota padronizada pela média/desvio-padrão de todos os candidatos daquele ano
em vez de nota de corte fixa em pontos — não existe "nota bruta" do aluno pra comparar
com um corte publicado antes da prova.

**Como adicionar um curso novo:** pegue a nota de corte da 1ª fase (em número de
acertos, ex: "79 de 90") direto em [fuvest.br](https://fuvest.br) quando for divulgada,
e copie um bloco de `simulador/data-fuvest.js`.

## Como funciona a seção "Perguntas" (login, pontos, ranking)

Diferente do resto do site, essa seção precisa de login de verdade (Google) e de um
banco de dados compartilhado entre alunos — porque o ranking só faz sentido se todo
mundo estiver escrevendo no mesmo lugar. Isso é feito com **Firebase** (Authentication +
Firestore), que é grátis e não precisa de servidor próprio — o navegador de cada aluno
fala direto com o Firebase.

**Arquivos envolvidos:**
- `assets/js/firebase-init.js` — tem a "chave de conexão" do projeto Firebase
  (`firebaseConfig`) e o `GOOGLE_CLIENT_ID` usado pro login (veja "Como funciona o login"
  abaixo). Essas chaves são públicas por design, não tem problema ficarem no GitHub.
- `firestore.rules` — as regras de segurança (quem pode ler/escrever o quê). Não é lido
  pelo site — precisa ser colado manualmente no Console do Firebase (veja abaixo).
  **Sempre que esse arquivo mudar** (como mudou nesta versão, pra suportar as 5 perguntas
  por dia), é preciso colar o conteúdo novo no Console de novo — o site não atualiza a
  regra publicada sozinho.
- `perguntas/index.html` + `assets/js/perguntas.js` — tela de login e da pergunta do dia.
- `perguntas/ranking.html` + `assets/js/ranking.js` — ranking do mês e pontos por matéria.

### Configurando o projeto Firebase (só precisa fazer 1 vez)

1. Crie um projeto grátis em https://console.firebase.google.com (não precisa de
   cartão de crédito).
2. **Authentication → Sign-in method → ative "Google"**.
3. **Firestore Database → Criar banco de dados** (modo produção).
4. **Firestore Database → Regras** → cole todo o conteúdo de `firestore.rules` → Publicar.
5. **Configurações do projeto (⚙) → Geral → Seus apps → Adicionar app → Web (`</>`)** —
   copie o objeto `firebaseConfig` gerado e cole em `assets/js/firebase-init.js`,
   substituindo os valores `"COLE_AQUI..."`.
6. **Authentication → Sign-in method → Google → "Web SDK configuration"** → copie o
   **"Web client ID"** e cole no `GOOGLE_CLIENT_ID` de `assets/js/firebase-init.js`.

### Como funciona o login (por que não é o padrão do Firebase)

O site usa o botão "Sign in with Google" do próprio Google (biblioteca
`accounts.google.com/gsi/client`), **não** o `signInWithPopup`/`signInWithRedirect`
nativos do Firebase. O motivo: esses dois últimos dependem de um iframe auxiliar
hospedado no `authDomain` (um domínio diferente do site, tipo
`site-provas.firebaseapp.com`) pra guardar o estado do login — e o Safari bloqueia esse
tipo de storage entre domínios com "Impedir Rastreamento Entre Sites", que vem
**ativado por padrão em todo Safari, mesmo fora do modo privado**. Isso quebrava o login
pra vários alunos com esse erro:

```
Unable to process request due to missing initial state. This may happen if browser
sessionStorage is inaccessible or accidentally cleared.
```

Com o botão do próprio Google, o navegador troca as credenciais direto com o Google (sem
esse iframe intermediário) e só depois entrega o resultado pro Firebase
(`signInWithCredential`) — não esbarra nessa proteção do Safari.

Se o projeto Firebase mudar de dono/for recriado, o `GOOGLE_CLIENT_ID` também precisa ser
atualizado (é específico de cada projeto), do mesmo jeito que o `firebaseConfig`.

### Como funcionam as 5 perguntas do dia e o streak

Cada aluno responde **5 perguntas por dia**: uma de cada frente — **Exatas, Linguagens,
Humanas, Biológicas** — mais um **Desafio** extra (mais difícil, vale mais pontos, pode
ser de qualquer matéria). O nível é de olimpíada, não de prova comum.

O **streak** (dias seguidos jogando) só conta se o aluno responder as 5 — responder só
3 ou 4 num dia quebra o streak. Não existe opção de pular pergunta. O streak não fica
guardado em nenhum campo do banco — é recalculado toda vez que a página carrega, contando
dia a dia pra trás quantas respostas existem pra cada uma das 5 frentes (ver
`calcularStreak` em `assets/js/perguntas.js`). Isso evita ter que proteger mais um campo
contra fraude: como é só leitura de dados que já são protegidos, não tem como forjar.

### Como adicionar uma pergunta nova

Direto pela tabela do Firestore (Console do Firebase → Firestore Database → Dados), sem
precisar editar código. Pra cada pergunta, cria **dois documentos com o mesmo ID**
(pode deixar o Firestore gerar um ID automático e copiar pro segundo):

Coleção `perguntas`, documento novo:
```json
{
  "materia": "Matemática",
  "frente": "Exatas",
  "texto": "Quanto é 7 × 8?",
  "alternativas": ["54", "56", "58", "64"],
  "pontos": 20,
  "usada": false
}
```
- `frente`: uma destas cinco — **"Exatas"**, **"Linguagens"**, **"Humanas"**,
  **"Biológicas"** ou **"Desafio"**. É por esse campo que o site decide qual das 5
  perguntas do dia essa vai preencher — não use nenhum outro valor.
- `materia`: a matéria de verdade da pergunta (Matemática, Português, História,
  Geografia, Filosofia, Sociologia, Biologia, Física ou Química). Numa pergunta de
  "Desafio" pode ser qualquer uma dessas — não precisa ter relação com as frentes
  "normais" já sorteadas naquele dia.
- `pontos`: sugestão de 20 pra frentes normais e 50 pro Desafio, mas pode ajustar
  conforme a dificuldade real de cada pergunta.

Coleção `gabaritos`, documento **com o mesmo ID** do documento acima:
```json
{ "correta": 1 }
```
(`correta` é o índice da alternativa certa na lista `alternativas`, começando em 0 — no
exemplo acima, `1` é `"56"`.)

Uma pergunta só é sorteada como "pergunta do dia" (da sua frente) enquanto `usada` for
`false` — depois de usada, o próprio site marca como `true` automaticamente, não precisa
mexer nisso na mão. Se quiser reaproveitar uma pergunta antiga, é só voltar o campo
`usada` pra `false`. **Importante:** sempre confira se tem pelo menos uma pergunta não
usada de cada uma das 5 frentes — se uma frente ficar sem nenhuma, ninguém consegue
completar o dia (e perde o streak) até você cadastrar mais.

### Testando essa seção localmente

O login com Google não funciona abrindo o `index.html` direto por duplo-clique
(`file://`) — precisa rodar por um servidor local simples. Dentro da pasta do site:

```
python -m http.server 8000
```
(ou `npx serve`, se tiver Node instalado) e depois abra `http://localhost:8000/perguntas/`
no navegador. O resto do site continua funcionando normalmente por duplo-clique.

Se o botão de login não aparecer (ou der erro de "origin não autorizada") testando em
`localhost`, adicione `http://localhost:8000` em **Google Cloud Console → APIs e
Serviços → Credenciais → (o OAuth Client ID do Firebase) → "Authorized JavaScript
origins"** — o domínio publicado (`https://SEUUSUARIO.github.io`) já deve estar
autorizado por padrão, então isso só afeta teste local.

### Se o projeto Firebase mudar de dono (junto com o handoff do site)

O projeto Firebase é separado da conta GitHub — ao repassar o site, veja também:
**Configurações do projeto (⚙) → Usuários e permissões**, no Console do Firebase, e
adicione a próxima pessoa como "Proprietário". Se preferir recriar do zero num projeto
novo, basta repetir os passos de configuração acima e colar a nova `firebaseConfig`.

## Como funciona a seção "Simulados"

Diferente de "Perguntas", essa seção não tem login, pontos, ranking nem Firebase — é só
um banco de questões estático (`simulados/data.js`) e um botão que sorteia 20 delas na
hora, direto no navegador. Não salva nada: se a pessoa recarregar a página no meio de um
simulado, perde o progresso (é aceitável, já que não tem streak nem stakes).

**Por que não tem opção de escolher a matéria antes de gerar:** o objetivo é treino
variado — deixar a pessoa escolher só uma matéria anularia a garantia de variedade a
cada sorteio.

**Como o sorteio garante variedade:** as questões são divididas em 5 "buckets" —
Exatas, Linguagens, Humanas, Biológicas e Interdisciplinar — e cada simulado sorteia uma
cota fixa de cada um (5+4+4+4+3 = 20), garantindo que nunca saia, por exemplo, 20
questões de Matemática seguidas, e que sempre apareça pelo menos 1 questão
interdisciplinar. Dentro de cada bucket, o sorteio ainda alterna entre as matérias
daquele bucket (ex: dentro de Exatas, alterna Matemática/Física/Química) pra não puxar
tudo da matéria que tiver mais questões cadastradas. Se o banco ainda for pequeno e uma
cota não fechar, o sorteio completa puxando sobra de outro bucket — nunca trava nem dá
erro, só sai com menos variedade se o banco estiver muito curto.

### Como adicionar uma questão de simulado

Edite `simulados/data.js`, copie um dos objetos do array `QUESTOES_SIMULADO` e ajuste os
campos:

```js
{
  id: "exa-016",
  materia: "Física",
  frente: "Exatas",
  texto: "Enunciado da questão...",
  alternativas: ["opção 1", "opção 2", "opção 3", "opção 4"],
  correta: 2,
  explicacao: "Por que a resposta certa é essa, passo a passo."
}
```

- `id`: único e estável — nunca reaproveite depois de apagar uma questão.
- `frente`: uma destas cinco — **"Exatas"**, **"Linguagens"**, **"Humanas"**,
  **"Biológicas"** ou **"Interdisciplinar"**. É por esse campo que o sorteio garante
  variedade.
- `materia`: a matéria de verdade (string única), ou uma LISTA de 2+ matérias quando a
  questão for genuinamente interdisciplinar (nesse caso `frente` tem que ser
  `"Interdisciplinar"`).
- `correta`: índice da alternativa certa, começando em 0. Fica visível no próprio
  arquivo — sem problema, porque aqui não tem ranking nem trapaça a evitar (diferente da
  seção Perguntas, que esconde o gabarito no Firestore).
- `explicacao`: sempre escreva uma — é o que aparece na revisão final e faz o simulado
  realmente servir pra estudar.

**Padrão de conteúdo pra Exatas (Matemática/Física/Química) e Biológicas:** as questões
precisam ser longas e em cadeia — várias etapas, cada uma alimentando a próxima, não uma
continha de uma linha só. Exemplo: descobrir o diâmetro de um círculo a partir do
perímetro → usar esse diâmetro num triângulo retângulo inscrito (Tales) → achar os
outros ângulos a partir de um seno dado → usar esses ângulos pra achar um lado → usar
esse lado numa segunda figura (ex: um hexágono regular) pra calcular uma área. Cada
etapa precisa ficar 100% determinada pela anterior — se uma etapa fica "solta" (ex:
pedir a área de um hexágono NÃO-regular sabendo só um lado, o que não é suficiente pra
determinar a área), a questão não tem resposta única e não deve ser publicada assim.
Esse padrão não é exigido pra Linguagens/Humanas — lá pode (e deve) ser direto.

**Teste de interdisciplinaridade:** antes de marcar `frente: "Interdisciplinar"`,
pergunte: dá pra responder essa questão ignorando uma das matérias citadas em `materia`?
Se der, ela não é interdisciplinar de verdade — reescreva até que as duas (ou mais)
sejam realmente necessárias pra eliminar todas as alternativas erradas.

**Importante:** mantenha cada um dos 5 buckets com um número razoável de questões — se
um ficar muito mais curto que os outros, o sorteio começa a repetir as mesmas questões
com mais frequência nesse bucket. O lote inicial (60 questões: Exatas 15, Linguagens 12,
Humanas 12, Biológicas 12, Interdisciplinar 9) não precisa virar 200 de uma vez — cresça
aos poucos, em lotes de 10-20, priorizando Biológicas e Interdisciplinar (são os buckets
mais raros e mais lentos de crescer).

## Como publicar as mudanças no ar

Este site fica hospedado de graça no **GitHub Pages**. Sempre que você editar
algo e quiser que apareça no site publicado:

```
git add .
git commit -m "Adiciona livro novo em Literatura"
git push
```

O GitHub Pages atualiza sozinho alguns segundos/minutos depois do push.

Se o repositório ainda não existir no GitHub:
1. Crie um repositório novo em github.com (pode ser público).
2. Rode dentro desta pasta:
   ```
   git init
   git add .
   git commit -m "Primeira versão do site"
   git branch -M main
   git remote add origin <URL do repositório>
   git push -u origin main
   ```
3. No GitHub, vá em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
4. Depois de alguns minutos o site fica disponível no endereço que o GitHub mostrar.

## Como passar o site pra próxima pessoa

Quando chegar a hora de repassar (ex: você está indo pro 3º ano ou se formando):

1. Peça o usuário do GitHub da pessoa que vai assumir.
2. No repositório, vá em **Settings → Collaborators**, clique em "Add people" e
   adicione essa pessoa como colaboradora.
3. Depois, ainda em **Settings**, role até **"Transfer ownership"** (ou "Danger Zone")
   e transfira o repositório pra conta dela. Isso também transfere o GitHub Pages junto.
4. Mande essa seção do README pra pessoa ler — é tudo que ela precisa pra manter o site.

Se preferir não transferir a conta, também dá pra só manter a pessoa como
colaboradora por um tempo, mas o ideal é que o "dono" do site sempre seja
quem está mais perto de continuar cuidando dele.

## Personalizações pendentes

- A nota mínima de aprovação na calculadora vem com `6` por padrão — dá pra
  mudar direto na página (fica salva junto com o resto das notas, se estiver logado).

## Possíveis melhorias futuras (fora do escopo por agora)

- Estatísticas sobre os livros de Literatura mais recorrentes
- **Perguntas — Etapa 2:** medalhas de 1º/2º/3º lugar permanentes no perfil (fechamento
  manual do ranking do mês por uma conta-admin) e comentários embaixo da pergunta do dia.
- **Perguntas — Etapa 3:** mural/fórum livre onde qualquer aluno cria post — precisa de
  um desenho próprio de moderação (denúncia, exclusão) antes de existir, já que é
  conteúdo aberto entre menores de idade.
- **Simulador — próximas etapas:** Mackenzie, PUC-SP e FGV, cada um com sistema de
  cálculo próprio (precisa de pesquisa e lógica separadas). Comvest e Vunesp não estão
  planejados — o cálculo delas (nota padronizada pela média/desvio-padrão de todos os
  candidatos daquele ano) não dá pra simular com antecedência, como explicado na seção
  do Simulador Fuvest.
