# Site legado de provas — Colégio Vital Brasil

🔗 **Site no ar:** https://davi-fukumori.github.io/site-provas/
📦 **Repositório:** https://github.com/Davi-Fukumori/site-provas

Site estático (sem servidor, sem banco de dados) com:
- **Provas** antigas organizadas por matéria/professor/ano
- **Literatura**: lista dos livros cobrados por ano/bimestre
- **Calculadora de média** ponderada

A ideia é que esse site seja passado de aluno pra aluno até a formatura. Este README
existe pra quem herdar o site conseguir mantê-lo mesmo sem muita experiência técnica.

## Como testar localmente

Basta dar duplo-clique no `index.html` — ele abre no navegador e tudo funciona
(filtros, calculadora, etc.), sem precisar instalar nada ou rodar servidor.

## Como adicionar uma prova nova

1. Coloque o arquivo da prova (PDF, foto, etc.) dentro de
   `provas/arquivos/<materia>/<ano>/` — crie as pastas se ainda não existirem.
2. Abra `provas/data.js` num editor de texto qualquer.
3. Copie um dos blocos `{ ... }` de dentro do array `PROVAS` e cole logo abaixo,
   editando os campos:
   ```js
   {
     materia: "Matemática",
     professores: ["Nome do Professor"],
     ano: "2024",
     bimestre: "3",
     titulo: "Prova Bimestral 3",
     arquivo: "arquivos/matematica/2024/prova-bim3.pdf"
   }
   ```
   Se a prova tiver mais de um professor (ex: aula conjunta), coloque os dois nomes
   na lista: `professores: ["Fulano", "Ciclana"]` — assim dá pra filtrar por
   qualquer um dos dois na página de provas.
4. Não esqueça da vírgula entre os blocos.
5. Salve e recarregue a página `provas/index.html` no navegador pra conferir.

Cada prova também pode ter uma seção de **análise** por questão — veja "Análise das
questões" logo abaixo.

## Análise das questões

Cada questão pode ter uma análise (explicação, dica, o que a banca esperava de
resposta) escondida atrás de um "Ver análise" clicável, logo abaixo da questão —
assim quem for estudar consegue tentar responder antes de ver a explicação, sem
precisar rolar a página até o final pra achar o comentário certo. O HTML de cada
questão já vem com esse bloco pronto (só falta preencher o texto):

```html
<details class="analise">
  <summary>Ver análise</summary>
  <div class="conteudo">Escreva aqui a explicação da questão.</div>
</details>
```

Isso é só HTML puro (a tag `<details>`), não precisa de JavaScript nem depende do
resto do site — funciona em qualquer página nova que você criar do mesmo jeito.

## Como adicionar um livro de Literatura

Mesma lógica, só que em `literatura/data.js`:

```js
{
  titulo: "Título do livro",
  autor: "Nome do autor",
  ano: "2024",
  bimestre: "2",
  observacoes: "Opcional — deixe '' se não tiver nada a dizer"
}
```

## Como funciona a calculadora de média

A calculadora tem uma fórmula própria por matéria, configurada em
`calculadora/materias.js`. Se a escola mudar os pesos, edite só esse arquivo —
não precisa mexer no HTML nem no `calculadora.js`.

**Simulado Vital por área:** o topo da página pede 4 notas (Exatas, Linguagens,
Humanas, Biológicas). A média das 4 é o "Simulado Vital" — funciona como uma 3ª
nota contínua (C3) e vale 20% da média de *todas* as matérias.

**Bônus (Bernoulli):** um campo separado, "Nota Bernoulli" — uma nota única (não
por área). Bônus = Nota Bernoulli ÷ 10, somado à AC2 de toda matéria (sem passar
de 10). É importante não confundir os dois: o Simulado Vital entra como nota (C3)
na fórmula; o Bernoulli só entra indiretamente, via Bônus na AC2.

**AC2** de cada matéria não é digitada: é o Simulado Vital da área dela + o Bônus.
Matemática usa a AC2 de Exatas; Português usa a de Linguagens; História e
Geografia usam a de Humanas; Biologia, Física e Química usam a de Biológicas.

**Matérias "normais"** (Matemática, Química, Física, Biologia, História,
Geografia): AC1 20% + AC2 20% + AC3 20% + C1 10% + C2 10% + Simulado 20%.
AC3 é a média entre os campos AC3a e AC3b.

**Português** usa essa mesma fórmula normal, mas ela vale só 60% da média final.
Os outros 40% vêm da **Redação**, que é a média simples entre 3 notas digitadas
à parte (AC1, AC2 e AC3 de redação) — essas notas não têm relação com o
Bônus/simulado, são só as notas de redação mesmo.

**Matérias "especiais"** (Filosofia, Sociologia, Educação Física, Artes): AC2 50%
+ média(C1, C2) 50% — sem AC1, sem AC3 e sem o Simulado Vital como termo separado
(ele já entra indiretamente porque compõe a AC2). Filosofia e Sociologia usam a
AC2 de Humanas; Educação Física e Artes usam a de Linguagens.

**Quanto falta pra passar:** cada cartão de matéria também mostra quanto você
precisa tirar (em média) nas notas que ainda estão em branco pra alcançar a nota
mínima — é só deixar os campos que você ainda não tem vazios (não digite `0`,
porque `0` conta como nota mesmo). Esse cálculo assume que a AC2 e o Simulado
Vital já são valores fechados (vindos dos campos de área/Bernoulli no topo da
página) — ele não tenta adivinhar Bernoulli/Simulado que ainda não saíram.

## Como funciona a seção "Perguntas" (login, pontos, ranking)

Diferente do resto do site, essa seção precisa de login de verdade (Google) e de um
banco de dados compartilhado entre alunos — porque o ranking só faz sentido se todo
mundo estiver escrevendo no mesmo lugar. Isso é feito com **Firebase** (Authentication +
Firestore), que é grátis e não precisa de servidor próprio — o navegador de cada aluno
fala direto com o Firebase.

**Arquivos envolvidos:**
- `assets/js/firebase-init.js` — tem a "chave de conexão" do projeto Firebase
  (`firebaseConfig`). Essas chaves são públicas por design, não tem problema ficarem no
  GitHub.
- `firestore.rules` — as regras de segurança (quem pode ler/escrever o quê). Não é lido
  pelo site — precisa ser colado manualmente no Console do Firebase (veja abaixo).
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

### Como adicionar uma pergunta nova

Direto pela tabela do Firestore (Console do Firebase → Firestore Database → Dados), sem
precisar editar código. Pra cada pergunta, cria **dois documentos com o mesmo ID**
(pode deixar o Firestore gerar um ID automático e copiar pro segundo):

Coleção `perguntas`, documento novo:
```json
{
  "materia": "Matemática",
  "texto": "Quanto é 7 × 8?",
  "alternativas": ["54", "56", "58", "64"],
  "pontos": 10,
  "usada": false
}
```

Coleção `gabaritos`, documento **com o mesmo ID** do documento acima:
```json
{ "correta": 1 }
```
(`correta` é o índice da alternativa certa na lista `alternativas`, começando em 0 — no
exemplo acima, `1` é `"56"`.)

Uma pergunta só é sorteada como "pergunta do dia" enquanto `usada` for `false` — depois de
usada, o próprio site marca como `true` automaticamente, não precisa mexer nisso na mão.
Se quiser reaproveitar uma pergunta antiga, é só voltar o campo `usada` pra `false`.

### Testando essa seção localmente

O login com Google não funciona abrindo o `index.html` direto por duplo-clique
(`file://`) — precisa rodar por um servidor local simples. Dentro da pasta do site:

```
python -m http.server 8000
```
(ou `npx serve`, se tiver Node instalado) e depois abra `http://localhost:8000/perguntas/`
no navegador. O resto do site continua funcionando normalmente por duplo-clique.

### Se o projeto Firebase mudar de dono (junto com o handoff do site)

O projeto Firebase é separado da conta GitHub — ao repassar o site, veja também:
**Configurações do projeto (⚙) → Usuários e permissões**, no Console do Firebase, e
adicione a próxima pessoa como "Proprietário". Se preferir recriar do zero num projeto
novo, basta repetir os passos de configuração acima e colar a nova `firebaseConfig`.

## Como publicar as mudanças no ar

Este site fica hospedado de graça no **GitHub Pages**. Sempre que você editar
algo e quiser que apareça no site publicado:

```
git add .
git commit -m "Adiciona prova de Matemática 2024"
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
  mudar direto na página, o valor não fica salvo entre visitas.

## Possíveis melhorias futuras (fora do escopo por agora)

- Estatísticas sobre os livros de Literatura mais recorrentes
- Estatísticas de frequência de assuntos entre várias provas da mesma matéria
- **Perguntas — Etapa 2:** medalhas de 1º/2º/3º lugar permanentes no perfil (fechamento
  manual do ranking do mês por uma conta-admin) e comentários embaixo da pergunta do dia.
- **Perguntas — Etapa 3:** mural/fórum livre onde qualquer aluno cria post — precisa de
  um desenho próprio de moderação (denúncia, exclusão) antes de existir, já que é
  conteúdo aberto entre menores de idade.
