// Banco de questões dos Simulados de estudo (sem login, sem pontuação — só treino).
//
// Campos de cada questão:
// - id: identificador único e estável (nunca reaproveite um id depois de apagar a questão).
// - materia: uma matéria (string) ou uma lista de 2+ matérias para questões
//   genuinamente interdisciplinares (mesma convenção de provas/data.js).
// - frente: "Exatas", "Linguagens", "Humanas", "Biológicas" ou "Interdisciplinar".
//   É por esse campo que o sorteio garante variedade — sempre "Interdisciplinar"
//   quando "materia" for uma lista.
// - texto: o enunciado. Pode ter várias linhas (use \n\n entre parágrafos).
// - alternativas: 4 ou 5 opções.
// - correta: índice (começando em 0) da alternativa certa em "alternativas".
// - explicacao: mostrada depois de responder e de novo na revisão final. Sempre
//   escreva uma — é o que faz o simulado servir pra estudar, não só pra testar.
//
// Padrão de conteúdo (não mude sem motivo):
// - Exatas (Matemática/Física/Química) e Biológicas: questões LONGAS e EM CADEIA —
//   várias etapas, cada uma alimentando a próxima (ex: acha um lado por trigonometria,
//   usa esse lado numa segunda figura pra achar uma área). Cada etapa precisa ficar
//   100% determinada pela anterior; se sobrar uma pergunta "solta" que não tem resposta
//   única, reescreva.
// - Interdisciplinar: só marque como tal se a questão for IMPOSSÍVEL de responder
//   sabendo só uma das matérias citadas. Se der pra ignorar uma delas, não é
//   interdisciplinar de verdade.
// - Linguagens/Humanas: podem ser diretas, não precisam da cadeia de raciocínio.
//
// Lote inicial: 60 questões (Exatas 15, Linguagens 12, Humanas 12, Biológicas 12,
// Interdisciplinar 9) — dá pra crescer aos poucos, sem precisar chegar a 200 de uma vez.
// Priorize crescer Biológicas e Interdisciplinar primeiro (são os buckets mais raros).

const QUESTOES_SIMULADO = [

  // ==================== EXATAS (15) ====================

  {
    id: "exa-001",
    materia: "Matemática",
    frente: "Exatas",
    texto: "Uma circunferência tem 18π cm de perímetro. Nela é inscrito um triângulo cujo maior lado coincide com o diâmetro da circunferência. Um dos ângulos desse triângulo (diferente do ângulo reto) tem seno igual a 1/2.\n\nUsando o lado do triângulo oposto a esse ângulo de seno 1/2 como lado de um hexágono regular, qual é a área desse hexágono?",
    alternativas: ["81√3 cm²", "121,5√3 cm²", "60,75√3 cm²", "243√3 cm²", "121,5 cm²"],
    correta: 1,
    explicacao: "Perímetro 18π ⟹ diâmetro = 18 cm. Como o maior lado do triângulo é o diâmetro, pelo Teorema de Tales o ângulo oposto a ele é reto. O ângulo de seno 1/2 mede 30°, e o terceiro mede 60°. O lado oposto ao ângulo de 30° mede diâmetro × sen(30°) = 18 × 1/2 = 9 cm — esse é o lado do hexágono regular. Área do hexágono regular = (3√3/2)·lado² = (3√3/2)·81 = 121,5√3 cm²."
  },
  {
    id: "exa-002",
    materia: "Física",
    frente: "Exatas",
    texto: "Uma rampa sem atrito tem 10 m de comprimento e forma um ângulo de 30° com a horizontal. Um bloco de 3 kg parte do repouso no topo (use g = 10 m/s² e sen 30° = 0,5).\n\nDescubra a altura da rampa, depois use conservação de energia pra achar a velocidade do bloco na base. Na base, o bloco passa a percorrer uma superfície horizontal com atrito cinético μ = 0,5. Qual a distância que ele percorre até parar?",
    alternativas: ["10 m", "5 m", "8 m", "15 m", "20 m"],
    correta: 0,
    explicacao: "Altura: h = 10 × sen(30°) = 5 m. Conservação de energia (sem atrito na rampa): mgh = ½mv² ⟹ v = √(2gh) = √(2×10×5) = √100 = 10 m/s. Na superfície com atrito: ½mv² = μmg·d ⟹ d = v²/(2μg) = 100/(2×0,5×10) = 100/10 = 10 m."
  },
  {
    id: "exa-003",
    materia: "Química",
    frente: "Exatas",
    texto: "Queima-se completamente 22 g de propano (C₃H₈, massa molar 44 g/mol) segundo a equação C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. Todo o CO₂ produzido é borbulhado em 2 L de solução de NaOH, reagindo completamente segundo CO₂ + 2NaOH → Na₂CO₃ + H₂O.\n\nQual a concentração molar de Na₂CO₃ formada nessa solução?",
    alternativas: ["0,375 mol/L", "0,75 mol/L", "1,5 mol/L", "3 mol/L", "4,5 mol/L"],
    correta: 1,
    explicacao: "Mols de propano = 22/44 = 0,5 mol. Pela estequiometria (1 propano : 3 CO₂), mols de CO₂ = 3 × 0,5 = 1,5 mol. Pela segunda reação (1 CO₂ : 1 Na₂CO₃), mols de Na₂CO₃ = 1,5 mol. Concentração = 1,5 mol / 2 L = 0,75 mol/L."
  },
  {
    id: "exa-004",
    materia: "Matemática",
    frente: "Exatas",
    texto: "Um cone tem volume 100π cm³ e o raio da base mede 5 cm.\n\nDescubra a altura do cone (V = ⅓πr²h). Use essa altura para achar a geratriz do cone (g² = r² + h²). Depois calcule a área lateral do cone (A = πrg).",
    alternativas: ["25π cm²", "50π cm²", "130π cm²", "65π cm²", "169π cm²"],
    correta: 3,
    explicacao: "100π = ⅓π(5²)h ⟹ 100 = 25h/3 ⟹ h = 12 cm. Geratriz: g = √(r²+h²) = √(25+144) = √169 = 13 cm. Área lateral: A = πrg = π×5×13 = 65π cm²."
  },
  {
    id: "exa-005",
    materia: "Matemática",
    frente: "Exatas",
    texto: "Numa progressão aritmética, o primeiro termo é 3 e a soma dos 10 primeiros termos é 120.\n\nDescubra a razão dessa PA e o seu 6º termo. Em seguida, use esse 6º termo como primeiro termo de uma PG de razão 2. Qual é o 4º termo dessa PG?",
    alternativas: ["104", "52", "78", "130", "208"],
    correta: 0,
    explicacao: "Soma dos 10 termos: S₁₀ = (10/2)(2a₁+9r) = 120 ⟹ 5(6+9r) = 120 ⟹ 6+9r = 24 ⟹ r = 2. Sexto termo: a₆ = a₁+5r = 3+10 = 13. Quarto termo da PG (primeiro termo 13, razão 2): 13×2³ = 13×8 = 104."
  },
  {
    id: "exa-006",
    materia: "Física",
    frente: "Exatas",
    texto: "Um resistor de 10 Ω é ligado em série com um resistor de 20 Ω, e essa associação é ligada a uma bateria de 30 V (resistência interna desprezível).\n\nCalcule a corrente do circuito, a potência dissipada no resistor de 20 Ω e, se esse resistor ficar ligado por 2 horas, a energia consumida por ele em Wh.",
    alternativas: ["10 Wh", "20 Wh", "40 Wh", "60 Wh", "80 Wh"],
    correta: 2,
    explicacao: "Resistência equivalente (série) = 30 Ω. Corrente: I = V/R = 30/30 = 1 A. Potência no resistor de 20 Ω: P = I²R = 1²×20 = 20 W. Energia em 2 h: E = P×t = 20×2 = 40 Wh."
  },
  {
    id: "exa-007",
    materia: "Química",
    frente: "Exatas",
    texto: "Uma solução aquosa é preparada dissolvendo 0,1 mol de HCl (ácido forte, ioniza 100%) em água suficiente para completar 1 L de solução.\n\nQual a concentração de H⁺ e o pH dessa solução (log 1 = 0)? Se essa solução for diluída 10 vezes (mesma quantidade de HCl, volume 10x maior), qual o novo pH?",
    alternativas: ["pH final = 0", "pH final = 1", "pH final = 2", "pH final = 3", "pH final = 11"],
    correta: 2,
    explicacao: "[H⁺] = 0,1 mol/L = 10⁻¹ mol/L ⟹ pH = -log(10⁻¹) = 1. Diluindo 10 vezes, a concentração cai pra 0,01 mol/L = 10⁻² ⟹ pH = 2."
  },
  {
    id: "exa-008",
    materia: "Matemática",
    frente: "Exatas",
    texto: "Considere os pontos A(1,2) e B(7,10). Encontre o ponto médio M do segmento AB. Em seguida, encontre a reta perpendicular a AB que passa por M e determine onde ela corta o eixo y.\n\nPor fim, calcule a distância entre M e esse ponto de interseção com o eixo y.",
    alternativas: ["3", "4", "6", "5", "8"],
    correta: 3,
    explicacao: "M = ((1+7)/2, (2+10)/2) = (4,6). Coeficiente angular de AB = (10-2)/(7-1) = 8/6 = 4/3, então o da perpendicular é -3/4. Reta: y-6 = -3/4(x-4). Em x=0: y = 6+3 = 9, ponto (0,9). Distância de M(4,6) a (0,9): √(4²+3²) = √25 = 5."
  },
  {
    id: "exa-009",
    materia: "Física",
    frente: "Exatas",
    texto: "Uma corda de 1,5 m vibra no seu 3º harmônico (nesse modo, cabem 3 meios-comprimentos de onda na corda: L = 3λ/2) com frequência de 300 Hz.\n\nDescubra o comprimento de onda λ e a velocidade de propagação da onda na corda. Se a tensão for ajustada de forma que essa velocidade dobre, mantendo o mesmo λ, qual será a nova frequência de vibração?",
    alternativas: ["300 Hz", "450 Hz", "600 Hz", "900 Hz", "1200 Hz"],
    correta: 2,
    explicacao: "λ = 2L/3 = 2×1,5/3 = 1 m. Velocidade: v = λf = 1×300 = 300 m/s. Dobrando v para 600 m/s com o mesmo λ = 1 m: f = v/λ = 600/1 = 600 Hz."
  },
  {
    id: "exa-010",
    materia: "Matemática",
    frente: "Exatas",
    texto: "Um triângulo ABC tem AB = 5 cm, AC = 8 cm e o ângulo entre esses dois lados (Â) mede 60°.\n\nCalcule o terceiro lado BC (lei dos cossenos) e a área do triângulo (½·AB·AC·sen Â). Esse triângulo é a base de um prisma reto de altura 10 cm — calcule a área total do prisma (2× área da base + perímetro da base × altura).",
    alternativas: ["200 + 20√3 cm²", "100 + 20√3 cm²", "200 + 10√3 cm²", "400 + 20√3 cm²", "20√3 cm²"],
    correta: 0,
    explicacao: "BC² = 5²+8²-2×5×8×cos60° = 89-40 = 49 ⟹ BC = 7 cm. Área da base = ½×5×8×sen60° = 20×(√3/2) = 10√3 cm². Perímetro = 5+8+7 = 20 cm. Área lateral = 20×10 = 200 cm². Área total = 2×10√3 + 200 = 200 + 20√3 cm²."
  },
  {
    id: "exa-011",
    materia: "Química",
    frente: "Exatas",
    texto: "Um gás ideal ocupa 4 L a 300 K e 2 atm.\n\nSe esse gás for aquecido até 600 K mantendo o volume constante, qual será a nova pressão (lei de Gay-Lussac)? Em seguida, a essa nova temperatura, o gás se expande isotermicamente até a pressão cair pra 1 atm — qual o novo volume (lei de Boyle)?",
    alternativas: ["4 L", "8 L", "12 L", "16 L", "32 L"],
    correta: 3,
    explicacao: "Gay-Lussac (V constante): P₁/T₁ = P₂/T₂ ⟹ 2/300 = P₂/600 ⟹ P₂ = 4 atm. Boyle (T constante, de 4 atm/4 L pra 1 atm): P₂V₂ = P₃V₃ ⟹ 4×4 = 1×V₃ ⟹ V₃ = 16 L."
  },
  {
    id: "exa-012",
    materia: "Matemática",
    frente: "Exatas",
    texto: "Uma urna tem 5 bolas vermelhas e 3 azuis. Duas bolas são retiradas sem reposição.\n\nCalcule a probabilidade de as duas serem vermelhas e a probabilidade de as duas serem azuis. Some as duas pra achar a probabilidade de as duas bolas retiradas serem da MESMA cor.",
    alternativas: ["5/14", "3/28", "15/28", "1/2", "13/28"],
    correta: 4,
    explicacao: "P(duas vermelhas) = (5/8)×(4/7) = 20/56 = 5/14. P(duas azuis) = (3/8)×(2/7) = 6/56 = 3/28. Convertendo pro mesmo denominador: 5/14 = 10/28. P(mesma cor) = 10/28 + 3/28 = 13/28."
  },
  {
    id: "exa-013",
    materia: "Física",
    frente: "Exatas",
    texto: "Um objeto de 4 cm de altura é colocado a 30 cm de um espelho côncavo de distância focal 10 cm.\n\nUsando a equação de Gauss (1/f = 1/p + 1/p'), descubra a distância da imagem p'. Calcule o aumento linear (A = -p'/p) e, com ele, a altura da imagem formada.",
    alternativas: ["-1 cm", "-2 cm", "-4 cm", "-8 cm", "2 cm"],
    correta: 1,
    explicacao: "1/10 = 1/30 + 1/p' ⟹ 1/p' = 1/10 - 1/30 = 2/30 = 1/15 ⟹ p' = 15 cm. Aumento: A = -p'/p = -15/30 = -0,5. Altura da imagem = A × altura do objeto = -0,5×4 = -2 cm (invertida)."
  },
  {
    id: "exa-014",
    materia: "Química",
    frente: "Exatas",
    texto: "Uma amostra radioativa tem meia-vida de 4 anos e massa inicial de 80 g.\n\nQual a massa restante depois de 12 anos (3 meias-vidas)? E depois de mais 4 anos (16 anos no total, ou seja, mais uma meia-vida a partir do valor anterior)?",
    alternativas: ["2,5 g", "5 g", "10 g", "20 g", "40 g"],
    correta: 1,
    explicacao: "Depois de 12 anos (3 meias-vidas): massa = 80/2³ = 80/8 = 10 g. Depois de mais uma meia-vida (16 anos no total, 4 meias-vidas): massa = 10/2 = 5 g (ou direto: 80/2⁴ = 80/16 = 5 g)."
  },
  {
    id: "exa-015",
    materia: "Química",
    frente: "Exatas",
    texto: "200 mL de uma solução de HCl 0,5 mol/L são misturados com 300 mL de uma solução de HCl 1,0 mol/L.\n\nCalcule o total de mols de HCl na mistura e a concentração da mistura (volume total = soma dos volumes). Se essa mistura for diluída até 1 L, qual será a concentração final?",
    alternativas: ["0,2 mol/L", "0,4 mol/L", "0,8 mol/L", "1,0 mol/L", "1,2 mol/L"],
    correta: 1,
    explicacao: "Mols: 0,2×0,5 + 0,3×1,0 = 0,1+0,3 = 0,4 mol. Concentração da mistura (500 mL): 0,4/0,5 = 0,8 mol/L. Diluindo até 1 L: 0,4 mol/1 L = 0,4 mol/L (a quantidade de mols não muda, só o volume)."
  },

  // ==================== BIOLÓGICAS (12) ====================

  {
    id: "bio-001",
    materia: "Biologia",
    frente: "Biológicas",
    texto: "Numa população em equilíbrio de Hardy-Weinberg, a frequência do alelo recessivo a é 0,2.\n\nCalcule a frequência do alelo dominante A e a frequência de indivíduos homozigotos recessivos (aa). Numa população de 10.000 indivíduos, quantos são esperados ser heterozigotos (Aa)?",
    alternativas: ["3200", "400", "1600", "4000", "6400"],
    correta: 0,
    explicacao: "p+q=1 ⟹ p = 1-0,2 = 0,8. Frequência de aa = q² = 0,04. Frequência de Aa = 2pq = 2×0,8×0,2 = 0,32. Em 10.000 indivíduos: 0,32×10.000 = 3.200 heterozigotos."
  },
  {
    id: "bio-002",
    materia: "Biologia",
    frente: "Biológicas",
    texto: "Cruzando duas plantas heterozigotas para duas características independentes (AaBb × AaBb), sendo A dominante sobre a e B dominante sobre b, a proporção fenotípica esperada é a clássica 9:3:3:1.\n\nNuma progênie de 320 descendentes, quantos são esperados ter o fenótipo duplo-dominante (A_B_)? E quantos NÃO teriam esse fenótipo (ou seja, apresentam pelo menos uma característica recessiva)?",
    alternativas: ["60", "100", "140", "180", "260"],
    correta: 2,
    explicacao: "Fenótipo A_B_ corresponde a 9/16 da progênie: 9/16 × 320 = 180. Os que não têm esse fenótipo são o restante: 320 - 180 = 140."
  },
  {
    id: "bio-003",
    materia: "Biologia",
    frente: "Biológicas",
    texto: "Na respiração celular aeróbica completa de 1 mol de glicose, a glicólise rende 2 ATP e o ciclo de Krebs rende 2 ATP diretamente. Além disso, são produzidos 10 NADH (3 ATP cada, na cadeia respiratória) e 2 FADH₂ (2 ATP cada).\n\nQuantos ATP vêm da cadeia respiratória (NADH + FADH₂)? Somando tudo, qual o rendimento total teórico de ATP por mol de glicose?",
    alternativas: ["30", "34", "36", "38", "40"],
    correta: 3,
    explicacao: "Cadeia respiratória: 10 NADH × 3 = 30 ATP, mais 2 FADH₂ × 2 = 4 ATP, total 34 ATP. Somando com glicólise (2) e Krebs (2): 34+2+2 = 38 ATP."
  },
  {
    id: "bio-004",
    materia: "Biologia",
    frente: "Biológicas",
    texto: "Numa cadeia alimentar, os produtores fixam 100.000 kcal de energia solar, e a eficiência de transferência entre níveis tróficos é de 10%.\n\nQuanta energia chega aos consumidores primários (herbívoros)? E aos consumidores secundários (carnívoros)? E aos consumidores terciários (carnívoros de topo)?",
    alternativas: ["10 kcal", "100 kcal", "50 kcal", "500 kcal", "1000 kcal"],
    correta: 1,
    explicacao: "Herbívoros (1º nível): 100.000×10% = 10.000 kcal. Carnívoros (2º nível): 10.000×10% = 1.000 kcal. Carnívoros de topo (3º nível): 1.000×10% = 100 kcal."
  },
  {
    id: "bio-005",
    materia: "Biologia",
    frente: "Biológicas",
    texto: "Uma pessoa tem frequência cardíaca de 75 bpm e volume sistólico (ejetado por batimento) de 70 mL.\n\nCalcule o débito cardíaco em mL/min e depois em L/min. Se o volume sanguíneo total dessa pessoa é 5 L, quantas vezes o sangue circula pelo corpo em 1 minuto?",
    alternativas: ["0,75", "1,05", "1,5", "2,1", "5,25"],
    correta: 1,
    explicacao: "Débito cardíaco = FC × volume sistólico = 75×70 = 5.250 mL/min = 5,25 L/min. Número de circulações por minuto = débito cardíaco / volume sanguíneo total = 5,25/5 = 1,05 vezes."
  },
  {
    id: "bio-006",
    materia: "Biologia",
    frente: "Biológicas",
    texto: "No sistema sanguíneo ABO, os alelos IA e IB são codominantes e i é recessivo. Num casal em que o pai é tipo AB (IAIB) e a mãe é tipo O (ii), cada filho tem 50% de chance de ser tipo A e 50% de chance de ser tipo B (nunca AB ou O).\n\nSe esse casal tiver 4 filhos, qual a probabilidade de exatamente 2 deles serem do tipo A (eventos independentes, distribuição binomial)?",
    alternativas: ["3/8", "1/16", "1/4", "1/2", "5/8"],
    correta: 0,
    explicacao: "Cada filho tem P(tipo A) = 1/2. Para exatamente 2 em 4 filhos: C(4,2)×(1/2)²×(1/2)² = 6×(1/16) = 6/16 = 3/8."
  },
  {
    id: "bio-007",
    materia: "Biologia",
    frente: "Biológicas",
    texto: "A fotossíntese segue a equação 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Uma planta produz 3 mols de glicose num dia.\n\nQuantos mols de O₂ são liberados? Qual o volume desse O₂ nas CNTP (22,4 L/mol)?",
    alternativas: ["67,2 L", "201,6 L", "268,8 L", "403,2 L", "806,4 L"],
    correta: 3,
    explicacao: "Pela estequiometria (1 glicose : 6 O₂), mols de O₂ = 6×3 = 18 mol. Volume nas CNTP = 18×22,4 = 403,2 L."
  },
  {
    id: "bio-008",
    materia: "Biologia",
    frente: "Biológicas",
    texto: "Uma célula animal com concentração interna de soluto 0,3 mol/L é colocada num meio externo com concentração 0,5 mol/L (meio hipertônico em relação à célula).\n\nA célula vai perder ou ganhar água? Se ela perder 20% do seu volume por osmose, e seu volume inicial era 500 pL, qual o volume final?",
    alternativas: ["100 pL", "300 pL", "400 pL", "480 pL", "600 pL"],
    correta: 2,
    explicacao: "Como o meio externo é hipertônico (mais concentrado) em relação à célula, a água sai da célula por osmose — ela perde água (murcha). Perdendo 20% de 500 pL = 100 pL, o volume final é 500-100 = 400 pL."
  },
  {
    id: "bio-009",
    materia: "Biologia",
    frente: "Biológicas",
    texto: "Uma pessoa respira com volume corrente de 500 mL por respiração e frequência respiratória de 15 respirações por minuto.\n\nCalcule a ventilação pulmonar (volume-minuto), em mL/min. Sabendo que o corpo absorve 4% do ar inspirado como O₂, qual o volume de O₂ absorvido por minuto?",
    alternativas: ["30 mL/min", "75 mL/min", "150 mL/min", "300 mL/min", "750 mL/min"],
    correta: 3,
    explicacao: "Ventilação pulmonar = volume corrente × frequência = 500×15 = 7.500 mL/min. O₂ absorvido = 4% de 7.500 = 300 mL/min."
  },
  {
    id: "bio-010",
    materia: "Biologia",
    frente: "Biológicas",
    texto: "O daltonismo é uma condição recessiva ligada ao X. Uma mulher heterozigota portadora (XᴰXᵈ) tem filhos com um homem de visão normal (XᴰY). Os quatro tipos de descendentes (menina normal XᴰXᴰ, menina portadora XᴰXᵈ, menino normal XᴰY, menino daltônico XᵈY) são igualmente prováveis (1/4 cada) — ou seja, a chance de um filho qualquer ser um \"menino daltônico\" é 1/4.\n\nConsiderando 2 filhos (eventos independentes), qual a probabilidade de o casal ter PELO MENOS um menino daltônico?",
    alternativas: ["1/4", "7/16", "3/8", "1/2", "9/16"],
    correta: 1,
    explicacao: "P(um filho não ser menino daltônico) = 1-1/4 = 3/4. P(nenhum dos 2 ser menino daltônico) = (3/4)² = 9/16. P(pelo menos um) = 1-9/16 = 7/16."
  },
  {
    id: "bio-011",
    materia: "Biologia",
    frente: "Biológicas",
    texto: "Um indivíduo triplo-heterozigoto (AaBbCc) é cruzado com outro também AaBbCc, sendo os três genes independentes com dominância completa.\n\nPara cada gene isolado (ex: Aa×Aa), a chance de ser homozigoto dominante é 1/4 e de ter o fenótipo dominante é 3/4. Qual a probabilidade de um descendente ter o fenótipo dominante nos TRÊS genes ao mesmo tempo (A_B_C_)?",
    alternativas: ["1/64", "9/64", "3/64", "27/64", "1/4"],
    correta: 3,
    explicacao: "Como os genes são independentes, multiplicam-se as probabilidades: P(A_) × P(B_) × P(C_) = 3/4 × 3/4 × 3/4 = 27/64."
  },
  {
    id: "bio-012",
    materia: "Biologia",
    frente: "Biológicas",
    texto: "Uma população de bactérias dobra a cada 20 minutos, partindo de 500 bactérias.\n\nQuantas bactérias existirão depois de 1 hora (3 duplicações)? E depois de mais 1 hora (2 horas no total, 6 duplicações)?",
    alternativas: ["4000", "8000", "16000", "64000", "32000"],
    correta: 4,
    explicacao: "Depois de 1h (3 duplicações): 500×2³ = 500×8 = 4.000. Depois de 2h (6 duplicações no total): 500×2⁶ = 500×64 = 32.000."
  },

  // ==================== LINGUAGENS (12) ====================

  {
    id: "ling-001",
    materia: "Português",
    frente: "Linguagens",
    texto: "Em \"Meus olhos são um mar de lágrimas\", a figura de linguagem empregada é:",
    alternativas: ["Comparação", "Metáfora", "Metonímia", "Hipérbole"],
    correta: 1,
    explicacao: "É metáfora, não comparação, porque não há conectivo (\"como\") ligando os termos — os olhos são diretamente identificados com o mar, numa fusão de sentido."
  },
  {
    id: "ling-002",
    materia: "Português",
    frente: "Linguagens",
    texto: "Uma bula de remédio, que informa dosagem e efeitos colaterais de forma objetiva, tem como função da linguagem predominante:",
    alternativas: ["Função poética", "Função referencial", "Função emotiva", "Função fática"],
    correta: 1,
    explicacao: "A função referencial (ou denotativa) predomina em textos que priorizam informar objetivamente sobre a realidade, como bulas, manuais e notícias factuais."
  },
  {
    id: "ling-003",
    materia: "Português",
    frente: "Linguagens",
    texto: "Assinale a alternativa em que o uso do acento indicativo de crase está CORRETO:",
    alternativas: ["Entreguei o presente à ela.", "Refiro-me à você.", "Vou à escola todos os dias.", "Dei o livro à ele."],
    correta: 2,
    explicacao: "Crase é a fusão da preposição \"a\" com o artigo feminino \"a\". \"Escola\" é substantivo feminino que admite artigo (\"a escola\"), por isso \"à escola\" está correto. Pronomes pessoais como \"ela\", \"você\" e \"ele\" não admitem artigo, então não recebem crase."
  },
  {
    id: "ling-004",
    materia: "Português",
    frente: "Linguagens",
    texto: "O conectivo \"todavia\", entre duas orações, estabelece uma relação de:",
    alternativas: ["Adição", "Causa", "Oposição/contraste", "Conclusão"],
    correta: 2,
    explicacao: "\"Todavia\" é uma conjunção adversativa, equivalente a \"porém\" e \"contudo\" — indica contraste entre duas ideias."
  },
  {
    id: "ling-005",
    materia: "Português",
    frente: "Linguagens",
    texto: "A frase \"Nós vai lá amanhã\", usada em contexto informal e oral, exemplifica um fenômeno que a sociolinguística chama de:",
    alternativas: ["Erro de português sem explicação linguística", "Variação linguística (uso não-padrão, mas sistemático e válido dentro de sua norma)", "Estrangeirismo", "Neologismo"],
    correta: 1,
    explicacao: "A sociolinguística não trata usos não-padrão como \"erros\" aleatórios, mas como variações linguísticas sistemáticas, próprias de certos grupos sociais ou regiões, tão regradas quanto a norma padrão."
  },
  {
    id: "ling-006",
    materia: "Português",
    frente: "Linguagens",
    texto: "O movimento literário brasileiro marcado pela valorização do índio como herói nacional, dentro do Romantismo, é conhecido como:",
    alternativas: ["Regionalismo", "Naturalismo", "Parnasianismo", "Indianismo"],
    correta: 3,
    explicacao: "O Indianismo é a vertente do Romantismo brasileiro (com José de Alencar e Gonçalves Dias) que idealiza o indígena como símbolo da identidade nacional."
  },
  {
    id: "ling-007",
    materia: "Artes",
    frente: "Linguagens",
    texto: "O Cubismo, movimento iniciado por Picasso e Braque, é caracterizado principalmente por:",
    alternativas: ["Fragmentação e representação simultânea de múltiplos ângulos de um objeto numa mesma imagem", "Uso exclusivo de cores primárias sem nenhuma forma geométrica", "Representação hiper-realista e fotográfica", "Ausência total de figuras humanas nas obras"],
    correta: 0,
    explicacao: "O Cubismo rompe com a perspectiva tradicional ao decompor objetos e figuras em planos geométricos, mostrando vários ângulos ao mesmo tempo numa única composição."
  },
  {
    id: "ling-008",
    materia: "Artes",
    frente: "Linguagens",
    texto: "Na Semana de Arte Moderna de 1922, em São Paulo, artistas como Tarsila do Amaral e Anita Malfatti buscavam:",
    alternativas: ["Retomar fielmente as técnicas do Renascimento italiano", "Romper com os padrões acadêmicos europeus e valorizar uma identidade artística brasileira", "Copiar exatamente o estilo do Impressionismo francês", "Proibir qualquer influência estrangeira na arte nacional"],
    correta: 1,
    explicacao: "O Modernismo brasileiro de 1922 buscava romper com o academicismo vigente e construir uma linguagem artística própria, que dialogasse com as vanguardas europeias sem copiá-las, valorizando temas e identidade nacionais."
  },
  {
    id: "ling-009",
    materia: "Educação Física",
    frente: "Linguagens",
    texto: "O treinamento intervalado de alta intensidade (HIIT), que alterna períodos curtos de exercício muito intenso com períodos de recuperação, é reconhecido principalmente por:",
    alternativas: ["Ser recomendado exclusivamente para iniciantes sedentários sem nenhuma restrição", "Não ter nenhum efeito sobre o sistema cardiovascular", "Melhorar o condicionamento cardiorrespiratório e queimar calorias em menos tempo total de treino", "Substituir completamente a necessidade de alongamento e aquecimento"],
    correta: 2,
    explicacao: "O HIIT é valorizado justamente por gerar ganhos cardiorrespiratórios e gasto calórico elevado em sessões mais curtas que o treino aeróbico contínuo tradicional — mas não substitui aquecimento nem é indicado sem adaptação prévia para sedentários."
  },
  {
    id: "ling-010",
    materia: "Educação Física",
    frente: "Linguagens",
    texto: "Sobre os benefícios do alongamento antes e depois da atividade física, é correto afirmar que:",
    alternativas: ["O alongamento estático intenso antes de uma prova de velocidade sempre melhora o desempenho máximo de força explosiva", "Alongar não tem nenhum efeito sobre o corpo", "Alongamento substitui completamente o aquecimento cardiovascular", "O alongamento ajuda a manter a flexibilidade muscular e pode contribuir para reduzir o risco de lesões, sendo mais indicado após o aquecimento"],
    correta: 3,
    explicacao: "O alongamento contribui para flexibilidade e prevenção de lesões, sendo mais recomendado após o aquecimento (não antes de esforços explosivos, já que alongamento estático intenso pré-esforço pode até reduzir a força explosiva momentaneamente)."
  },
  {
    id: "ling-011",
    materia: "Inglês",
    frente: "Linguagens",
    texto: "Choose the correct alternative to complete the sentence: \"If I ___ more time, I would travel around the world.\"",
    alternativas: ["have", "had", "will have", "would have"],
    correta: 1,
    explicacao: "This is a second conditional sentence (hypothetical present/future), which follows the structure \"If + past simple, ... would + infinitive\" — so \"had\" is correct."
  },
  {
    id: "ling-012",
    materia: "Inglês",
    frente: "Linguagens",
    texto: "Read the sentence: \"She has been studying English for five years.\" This verb tense is called:",
    alternativas: ["Present Perfect Continuous", "Simple Past", "Future Perfect", "Past Continuous"],
    correta: 0,
    explicacao: "The structure \"has/have been + verb-ing\" is the Present Perfect Continuous, used for an action that started in the past and continues into the present."
  },

  // ==================== HUMANAS (12) ====================

  {
    id: "hum-001",
    materia: "História",
    frente: "Humanas",
    texto: "A Revolução Industrial, iniciada na Inglaterra no século XVIII, teve como uma de suas principais causas:",
    alternativas: ["A abolição da escravidão nos Estados Unidos", "A disponibilidade de carvão mineral, capital acumulado pelo comércio colonial e mão de obra livre disponível nas cidades", "A descoberta do Brasil por Portugal", "O fim do Império Romano"],
    correta: 1,
    explicacao: "A Inglaterra reunia condições favoráveis: reservas de carvão, capital acumulado do comércio (inclusive colonial) e um grande contingente de trabalhadores livres migrando do campo para as cidades — combinação que impulsionou a industrialização."
  },
  {
    id: "hum-002",
    materia: "História",
    frente: "Humanas",
    texto: "O período conhecido como \"Era Vargas\" no Brasil (1930-1945) é caracterizado por:",
    alternativas: ["Restauração da monarquia brasileira", "Independência do Brasil em relação a Portugal", "Centralização política, industrialização incentivada pelo Estado e criação de leis trabalhistas (CLT)", "Proclamação da Primeira República liberal"],
    correta: 2,
    explicacao: "Getúlio Vargas governou de forma centralizadora, promoveu a industrialização nacional com forte intervenção estatal e criou a Consolidação das Leis do Trabalho (CLT), entre outras medidas trabalhistas."
  },
  {
    id: "hum-003",
    materia: "História",
    frente: "Humanas",
    texto: "A Guerra Fria (1947-1991) foi marcada pela disputa ideológica e geopolítica entre:",
    alternativas: ["Inglaterra e França pela colonização da África", "Brasil e Argentina pela liderança na América do Sul", "Alemanha e Itália na Segunda Guerra Mundial", "Estados Unidos (capitalismo) e União Soviética (socialismo)"],
    correta: 3,
    explicacao: "A Guerra Fria foi a disputa geopolítica, ideológica e militar (sem confronto direto) entre o bloco capitalista liderado pelos EUA e o bloco socialista liderado pela URSS, entre o fim da Segunda Guerra e o colapso soviético."
  },
  {
    id: "hum-004",
    materia: "História",
    frente: "Humanas",
    texto: "O processo de independência do Brasil em 1822 teve entre seus fatores:",
    alternativas: ["A pressão de setores da elite brasileira que já tinham autonomia econômica desde a vinda da corte portuguesa em 1808, somada à recusa de D. Pedro em retornar a Portugal", "Uma revolta popular armada que derrubou toda a estrutura colonial de uma só vez", "A intervenção militar direta dos Estados Unidos", "O fim da escravidão no Brasil"],
    correta: 0,
    explicacao: "A vinda da corte portuguesa em 1808 já havia dado autonomia econômica e administrativa ao Brasil; quando as Cortes portuguesas tentaram recolonizar o país, a elite brasileira (com apoio de D. Pedro, que ficou no Brasil desfiando o \"Fico\") impulsionou a ruptura política."
  },
  {
    id: "hum-005",
    materia: "História",
    frente: "Humanas",
    texto: "A Revolução Russa de 1917 resultou na ascensão de qual sistema político-econômico?",
    alternativas: ["Democracia liberal parlamentarista", "Socialismo/comunismo, sob liderança bolchevique", "Monarquia constitucional", "Fascismo"],
    correta: 1,
    explicacao: "Os bolcheviques, liderados por Lênin, tomaram o poder em outubro de 1917, derrubando o governo provisório e instaurando um Estado socialista, que mais tarde se consolidaria como a União Soviética."
  },
  {
    id: "hum-006",
    materia: "Geografia",
    frente: "Humanas",
    texto: "As placas tectônicas causam fenômenos como terremotos e vulcões, mais intensos em regiões de encontro entre placas, como o \"Círculo de Fogo do Pacífico\". O Brasil apresenta baixa atividade sísmica principalmente porque:",
    alternativas: ["Não possui nenhuma placa tectônica sob seu território", "Fica exatamente sobre o Círculo de Fogo do Pacífico", "Está localizado no interior da placa Sul-Americana, longe das bordas de colisão entre placas tectônicas", "Tem clima que impede terremotos"],
    correta: 2,
    explicacao: "O território brasileiro está numa posição estável, no interior da placa Sul-Americana, distante das zonas de borda/colisão de placas onde a atividade sísmica e vulcânica é mais intensa."
  },
  {
    id: "hum-007",
    materia: "Geografia",
    frente: "Humanas",
    texto: "O fenômeno do El Niño está relacionado a:",
    alternativas: ["Resfriamento permanente da Antártida", "Aumento da camada de ozônio", "Um tipo de vulcão submarino específico", "Aquecimento anômalo das águas do Oceano Pacífico, que altera padrões climáticos globais"],
    correta: 3,
    explicacao: "O El Niño é um fenômeno climático caracterizado pelo aquecimento anômalo das águas superficiais do Oceano Pacífico equatorial, que altera padrões de chuva e temperatura em diversas regiões do planeta."
  },
  {
    id: "hum-008",
    materia: "Geografia",
    frente: "Humanas",
    texto: "Sobre a urbanização brasileira, é correto afirmar que:",
    alternativas: ["Ocorreu de forma acelerada e desigual a partir do século XX, gerando problemas como favelização e déficit de infraestrutura em muitas cidades", "Foi um processo lento e uniforme desde o período colonial", "Reduziu a população das grandes metrópoles como São Paulo e Rio de Janeiro", "Não gerou nenhum tipo de desigualdade social"],
    correta: 0,
    explicacao: "A urbanização brasileira se intensificou rapidamente a partir da industrialização do século XX, com êxodo rural acelerado que superou a capacidade de planejamento urbano, gerando favelização e desigualdades socioespaciais nas grandes cidades."
  },
  {
    id: "hum-009",
    materia: "Geografia",
    frente: "Humanas",
    texto: "As Zonas Econômicas Exclusivas (ZEE) marítimas de um país se estendem, pelo direito internacional, até quantas milhas náuticas a partir da costa?",
    alternativas: ["12 milhas", "50 milhas", "200 milhas", "500 milhas"],
    correta: 2,
    explicacao: "Segundo a Convenção das Nações Unidas sobre o Direito do Mar (1982), a Zona Econômica Exclusiva se estende até 200 milhas náuticas a partir da costa, dentro das quais o país tem direitos exclusivos sobre recursos naturais."
  },
  {
    id: "hum-010",
    materia: "Filosofia e Sociologia",
    frente: "Humanas",
    texto: "Para Sócrates, o método de investigação filosófica baseado em perguntas sucessivas que levam o interlocutor a reconhecer sua própria ignorância e buscar o conhecimento é chamado de:",
    alternativas: ["Dialética hegeliana", "Maiêutica", "Empirismo", "Existencialismo"],
    correta: 1,
    explicacao: "A maiêutica socrática (\"arte de partejar ideias\") consiste em, por meio do diálogo e de perguntas sucessivas, levar o interlocutor a \"dar à luz\" o conhecimento que já trazia em si, partindo do reconhecimento da própria ignorância."
  },
  {
    id: "hum-011",
    materia: "Filosofia e Sociologia",
    frente: "Humanas",
    texto: "O sociólogo Émile Durkheim é considerado um dos fundadores da sociologia moderna por defender que:",
    alternativas: ["A sociedade não existe, apenas indivíduos isolados", "A economia é a única força que molda a sociedade", "Os fatos sociais devem ser estudados como \"coisas\", de forma objetiva, exteriores e coercitivas sobre o indivíduo", "O comportamento humano é determinado exclusivamente pela biologia"],
    correta: 2,
    explicacao: "Durkheim defendia que os fatos sociais (normas, instituições, valores) existem fora do indivíduo e exercem coerção sobre ele, devendo ser estudados objetivamente, \"como coisas\" — base do método sociológico que ele propôs."
  },
  {
    id: "hum-012",
    materia: "Filosofia e Sociologia",
    frente: "Humanas",
    texto: "Karl Marx analisou a sociedade capitalista a partir do conceito de luta de classes, opondo principalmente:",
    alternativas: ["Nobreza e clero na Idade Média", "Colonizadores e povos indígenas", "Norte e Sul global apenas em termos geográficos", "Burguesia (detentora dos meios de produção) e proletariado (força de trabalho assalariada)"],
    correta: 3,
    explicacao: "Para Marx, o capitalismo se organiza em torno do conflito entre a burguesia, dona dos meios de produção, e o proletariado, que vende sua força de trabalho — motor da luta de classes na sociedade capitalista."
  },

  // ==================== INTERDISCIPLINAR (9) ====================

  {
    id: "inter-001",
    materia: ["Química", "Geografia"],
    frente: "Interdisciplinar",
    texto: "A queima de combustíveis fósseis em larga escala, a partir da Revolução Industrial, aumentou a concentração de CO₂ na atmosfera. Sobre esse processo, é correto afirmar que:",
    alternativas: [
      "A combustão completa do carvão (majoritariamente carbono) produz CO₂ e libera energia térmica; esse aumento de CO₂ intensifica o efeito estufa, elevando a temperatura média global.",
      "A combustão do carvão produz apenas O₂, sem qualquer relação com o clima.",
      "O aumento de CO₂ reduz o efeito estufa, pois o CO₂ reflete a radiação solar antes que ela chegue à superfície.",
      "A Revolução Industrial não alterou a composição da atmosfera, já que o carvão é uma fonte de energia renovável."
    ],
    correta: 0,
    explicacao: "Precisa da Química pra saber que a combustão completa do carbono gera CO₂ (C + O₂ → CO₂) e da Geografia pra ligar esse gás ao efeito estufa e às mudanças climáticas — quem souber só uma das duas matérias não consegue eliminar todas as alternativas erradas."
  },
  {
    id: "inter-002",
    materia: ["Física", "Biologia"],
    frente: "Interdisciplinar",
    texto: "O ouvido humano capta com mais sensibilidade frequências entre 2.000 Hz e 5.000 Hz (faixa em que a cóclea tem maior densidade de células ciliadas sensíveis). Uma ambulância emite uma sirene de 1.700 Hz que, ao se aproximar do observador, sofre um aumento de 15% na frequência percebida por efeito Doppler.\n\nSobre essa situação, é correto afirmar que:",
    alternativas: [
      "A frequência percebida sobe pra 1955 Hz, dentro da faixa de maior sensibilidade do ouvido, tornando o som mais perceptível.",
      "A frequência percebida sobe pra 1955 Hz, ainda abaixo da faixa de maior sensibilidade do ouvido humano (2.000-5.000 Hz), então a ambulância pode parecer \"mais distante\" do que realmente está.",
      "O efeito Doppler diminui a frequência quando a fonte se aproxima, então a frequência cai pra 1445 Hz.",
      "A faixa de maior sensibilidade do ouvido (2.000-5.000 Hz) não tem relação com a frequência captada, só com o volume do som."
    ],
    correta: 1,
    explicacao: "Física: quando a fonte se aproxima, o efeito Doppler AUMENTA a frequência percebida (nunca diminui) — 1700×1,15 = 1955 Hz. Biologia: 1955 Hz ainda fica abaixo da faixa de maior sensibilidade da cóclea (2.000-5.000 Hz), então o som pode ser percebido como mais fraco/distante do que a proximidade real da ambulância sugeriria — só combinando as duas matérias dá pra concluir isso."
  },
  {
    id: "inter-003",
    materia: ["Matemática", "História"],
    frente: "Interdisciplinar",
    texto: "Segundo dados históricos, a população mundial era de aproximadamente 1 bilhão em 1800 e cresceu de forma aproximadamente exponencial, dobrando a cada 60 anos nesse período inicial.\n\nSegundo esse modelo simplificado, em que ano a população mundial atingiria 4 bilhões? Como isso se compara ao fato histórico de que a população mundial real só atingiu 4 bilhões em 1974?",
    alternativas: [
      "O modelo prevê 1974, exatamente batendo com o fato histórico.",
      "O modelo prevê 2040, muito depois do que realmente aconteceu.",
      "O modelo prevê 1920, quase 54 anos antes do que realmente aconteceu — mostrando que, nesse período, o crescimento populacional real foi mais lento do que o previsto pelo modelo exponencial simples.",
      "Não é possível calcular isso sem saber a população em 1900."
    ],
    correta: 2,
    explicacao: "Matemática: ir de 1 bilhão a 4 bilhões exige 2 duplicações (1→2→4), ou seja, 2×60 = 120 anos após 1800, chegando a 1920. História: o fato real é que a população só chegou a 4 bilhões em 1974 — comparar os dois exige tanto a conta exponencial quanto o dado histórico real."
  },
  {
    id: "inter-004",
    materia: ["Geografia", "Biologia"],
    frente: "Interdisciplinar",
    texto: "O Cerrado tem clima tropical sazonal, com estação seca bem definida. Muitas plantas desse bioma desenvolveram cascas grossas, raízes profundas (que podem passar de 10 metros) e caules tortuosos.\n\nSobre a relação entre o clima do Cerrado e essas adaptações, é correto afirmar que:",
    alternativas: [
      "Essas adaptações não têm relação com o clima, sendo apenas características genéticas aleatórias sem função ecológica.",
      "As raízes profundas servem para fotossíntese subterrânea, aproveitando a luz que penetra o solo.",
      "A casca grossa serve para reter água da chuva na estação chuvosa, sem relação com incêndios.",
      "As raízes profundas permitem captar água do lençol freático durante a estação seca, e a casca grossa protege contra o fogo, comum nessa estação — ambas adaptações diretamente relacionadas ao regime climático sazonal do bioma."
    ],
    correta: 3,
    explicacao: "Geografia explica o regime climático sazonal do Cerrado (seca bem marcada, propensa a queimadas); Biologia explica a função adaptativa das raízes profundas (buscar água no lençol freático) e da casca grossa (proteção contra o fogo) — as duas informações juntas é que explicam o \"porquê\" das adaptações."
  },
  {
    id: "inter-005",
    materia: ["Português", "Matemática"],
    frente: "Interdisciplinar",
    texto: "Leia o trecho: \"A cidade cresceu de 50 mil para 200 mil habitantes em 10 anos — um aumento de 150%.\"\n\nDo ponto de vista matemático, essa afirmação está correta? E do ponto de vista da interpretação textual, que efeito de sentido essa cifra produz no leitor, mesmo se estiver errada?",
    alternativas: [
      "A conta está errada (o aumento real é de 300%, não 150%), mas o uso do número, mesmo estando errado, ainda produz no leitor a impressão de um crescimento vertiginoso, reforçando o argumento do texto.",
      "A conta está certa, porque 150 mil é a diferença absoluta entre os dois valores.",
      "A conta está errada porque a população deveria ter triplicado para ser 150%, ou seja, deveria ir a 500%.",
      "Não há erro nem efeito de sentido — cifras não influenciam a interpretação de textos."
    ],
    correta: 0,
    explicacao: "Matemática: aumento percentual = (200-50)/50 × 100 = 300%, não 150% — a afirmação está matematicamente errada. Português: mesmo errado, o número citado ainda cumpre uma função retórica de impressionar o leitor com a ideia de crescimento acelerado — avaliar isso exige tanto o cálculo quanto a leitura do efeito de sentido do texto."
  },
  {
    id: "inter-006",
    materia: ["História", "Filosofia e Sociologia"],
    frente: "Interdisciplinar",
    texto: "O Iluminismo, movimento filosófico do século XVIII que valorizava a razão e criticava o absolutismo, teve forte influência sobre a Revolução Francesa (1789). Relacionando as ideias de Rousseau (contrato social, soberania popular) com o contexto histórico da queda da monarquia absolutista francesa, é correto afirmar que:",
    alternativas: [
      "Rousseau defendia o direito divino dos reis, o que reforçou o poder de Luís XVI durante a Revolução.",
      "A ideia de soberania popular de Rousseau contribuiu para deslegitimar o poder absoluto do rei, servindo de base ideológica pra Revolução Francesa e a posterior Declaração dos Direitos do Homem e do Cidadão (1789).",
      "A Revolução Francesa ocorreu sem nenhuma influência filosófica, sendo puramente um movimento econômico.",
      "O contrato social de Rousseau só foi aplicado depois do fim da Revolução, na Restauração monárquica."
    ],
    correta: 1,
    explicacao: "Filosofia: Rousseau defendia que a soberania emana do povo, não do rei (contrato social). História: essa ideia minou a legitimidade do absolutismo francês e alimentou o processo revolucionário de 1789 — a resposta exige conectar o conteúdo filosófico ao evento histórico."
  },
  {
    id: "inter-007",
    materia: ["Artes", "História"],
    frente: "Interdisciplinar",
    texto: "O Barroco, movimento artístico dos séculos XVI-XVII, é marcado por dramaticidade, contraste de luz e sombra (claro-escuro) e forte apelo emocional, sendo amplamente usado pela Igreja Católica. Relacionando essas características estéticas com o contexto histórico da Contrarreforma católica, é correto afirmar que:",
    alternativas: [
      "O Barroco surgiu como reação ao catolicismo, sendo uma arte tipicamente protestante.",
      "O claro-escuro barroco não tem relação com o contexto religioso, sendo apenas uma técnica de iluminação sem intenção simbólica.",
      "O dramatismo e o apelo emocional do Barroco serviam como instrumento de propaganda religiosa da Igreja Católica durante a Contrarreforma, buscando reconquistar fiéis diante do avanço do Protestantismo.",
      "A Contrarreforma proibiu qualquer uso de arte, o que impediu o desenvolvimento do Barroco."
    ],
    correta: 2,
    explicacao: "Artes: o Barroco usa dramaticidade e contraste de luz pra emocionar o observador. História: a Igreja Católica, durante a Contrarreforma, usou justamente essa arte emocional como propaganda religiosa para reconquistar fiéis perdidos para o Protestantismo — a resposta certa exige as duas matérias combinadas."
  },
  {
    id: "inter-008",
    materia: ["Educação Física", "Biologia"],
    frente: "Interdisciplinar",
    texto: "Durante um exercício físico intenso e prolongado, o corpo passa a depender cada vez mais do metabolismo anaeróbico, produzindo ácido lático nos músculos. Relacionando o tipo de treinamento físico (aeróbico x anaeróbico) com o sistema energético predominante, é correto afirmar que:",
    alternativas: [
      "Todo exercício físico usa exclusivamente o metabolismo aeróbico, independente da intensidade.",
      "O ácido lático é produzido apenas durante o repouso, nunca durante o exercício.",
      "Exercícios de alta intensidade usam só metabolismo aeróbico, por isso não causam fadiga muscular.",
      "Exercícios de longa duração e intensidade moderada (como corrida de fundo) utilizam predominantemente o metabolismo aeróbico, enquanto exercícios de curta duração e alta intensidade (como um sprint de 100m) dependem principalmente do metabolismo anaeróbico, gerando acúmulo de ácido lático."
    ],
    correta: 3,
    explicacao: "Educação Física classifica os tipos de treino (aeróbico de longa duração x anaeróbico de alta intensidade); Biologia explica o metabolismo energético por trás de cada um (uso de oxigênio x produção de ácido lático) — a resposta certa depende de entender as duas coisas juntas."
  },
  {
    id: "inter-009",
    materia: ["Geografia", "Matemática"],
    frente: "Interdisciplinar",
    texto: "O estado do Amazonas tem área de aproximadamente 1.559.000 km² e população de aproximadamente 4.144.000 habitantes. Já o Rio de Janeiro tem área de aproximadamente 43.780 km² e população de aproximadamente 17.463.000 habitantes.\n\nCalcule a densidade demográfica (hab/km²) de cada estado e, com base nesses números e no conhecimento geográfico sobre a ocupação do território brasileiro, avalie a alternativa correta:",
    alternativas: [
      "O Amazonas tem densidade muito baixa (≈2,7 hab/km²) e o Rio de Janeiro, muito alta (≈399 hab/km²), refletindo a concentração histórica da ocupação urbana e industrial no Sudeste, em contraste com a floresta amazônica pouco povoada e de difícil acesso.",
      "As densidades são praticamente iguais, cerca de 100 hab/km² cada.",
      "O Amazonas tem densidade maior que o Rio de Janeiro, porque tem mais habitantes em número absoluto.",
      "A densidade demográfica não pode ser calculada sem saber o PIB de cada estado."
    ],
    correta: 0,
    explicacao: "Matemática: densidade = população/área. Amazonas: 4.144.000/1.559.000 ≈ 2,7 hab/km². Rio de Janeiro: 17.463.000/43.780 ≈ 399 hab/km². Geografia: essa enorme diferença reflete a concentração histórica da ocupação urbano-industrial no Sudeste, em contraste com a baixa ocupação da Amazônia — sem fazer a conta, dá pra cair na pegadinha da opção que compara só o número absoluto de habitantes."
  }
];
