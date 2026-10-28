/* Palco — estações m2: movimento 2 (manual, livro, livro-ia, pergunta, prompt-alma).
   Gerado a partir de src12/m2.src.js. Tudo dentro de el; CSS prefixado .st-<id>; timers só entre enter/leave. */
(function () {
'use strict';
window.ORQ = window.ORQ || { stations: [], add: function (s) { this.stations.push(s); } };
function reduce() { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } }
function h(tag, cls, html, parent) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
function css(id, txt) { if (document.getElementById(id)) return; var s = document.createElement('style'); s.id = id; s.textContent = txt; document.head.appendChild(s); }
function $(el, sel) { return el.querySelector(sel); }
function $$(el, sel) { return Array.prototype.slice.call(el.querySelectorAll(sel)); }
function T(el) { return el.__T || (el.__T = { to: [], iv: [], raf: [] }); }
function later(el, fn, ms) { var t = T(el); var id = setTimeout(function () { var i = t.to.indexOf(id); if (i >= 0) t.to.splice(i, 1); fn(); }, ms); t.to.push(id); return id; }
function frame(el, fn) {
  var t = T(el), rec = { on: true, id: 0 }; t.raf.push(rec);
  function loop(ts) { if (!rec.on) return; if (fn(ts) === false) { rec.on = false; var i = t.raf.indexOf(rec); if (i >= 0) t.raf.splice(i, 1); return; } rec.id = requestAnimationFrame(loop); }
  rec.id = requestAnimationFrame(loop); return rec;
}
function stop(el) {
  var t = T(el);
  t.to.forEach(clearTimeout); t.iv.forEach(clearInterval);
  t.raf.forEach(function (r) { r.on = false; cancelAnimationFrame(r.id); });
  t.to = []; t.iv = []; t.raf = [];
}
function active(el) { var t = T(el); return t.to.length + t.iv.length + t.raf.length; }
function easeOut(k) { return 1 - Math.pow(1 - k, 3); }
function tween(el, from, to, dur, fn, done, ease) {
  var t0 = null;
  frame(el, function (ts) {
    if (t0 === null) t0 = ts; var k = Math.min(1, (ts - t0) / dur);
    fn(from + (to - from) * (ease || easeOut)(k));
    if (k >= 1) { if (done) done(); return false; }
  });
}
function snap(el, fn) { el.classList.add('nt'); fn(); void el.offsetWidth; el.classList.remove('nt'); }
function pos(n, root) { var x = 0, y = 0; while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return { x: x, y: y }; }
function typeText(el, node, text, ms, done) {
  var i = 0; node.textContent = '';
  (function nx() { if (i >= text.length) { if (done) done(); return; } i++; node.textContent = text.slice(0, i); later(el, nx, ms); })();
}
var ICON = {
  book: '<path d="M2 5c3-1 6-1 10 1 4-2 7-2 10-1v14c-3-1-6-1-10 1-4-2-7-2-10-1z"/><path d="M12 6v14"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.5A8 8 0 1 1 21 12z"/>',
  warn: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17.2v.1"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6z"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  play: '<path d="M7 4v16l13-8z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-4 3-6 7-6s7 2 7 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M18 14c3 .3 4 2.3 4 5"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>'
};
function svg(name, size, sw) { return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[name] + '</svg>'; }
var FOOT = '<p class="foot">BKO 360° · Programa P&amp;G • SPOT</p>';
var LOGO = '<img class="logo" src="img/spot-logo.png" alt="SPOT">';
var LOGO_D = '<img class="logo" src="img/spot-logo-sobre-escuro.png" alt="SPOT">';

var N = {"orquestra":"TEMPO: 2 min. Arthur abre a tarde.\nFALA (Arthur): \"Boa tarde! De manhã a gente viu como o nosso trabalho chega na loja. Agora a gente vai ver como fazer esse trabalho com uma orquestra trabalhando a nosso favor. A tarde tem cinco movimentos, como uma música: o que é a IA, como pedir, como planejar, como entregar e, no fim, como tocar juntos. E no último movimento quem toca são vocês.\"\nAPOIO: apontar os cinco movimentos na tela; eles voltam no topo de cada parte. Dizer que não precisa saber nada de tecnologia: tudo vai ser explicado com exemplos do dia a dia do BKO. Deixar abertas em abas, antes de começar, as quatro demos: livro, fazenda, Busca 360 e boneco de neve.\nTRANSIÇÃO: \"Primeiro movimento: o que é, de fato, essa tal de IA?\" (passa para como ela pensa)","ia-pensa":"TEMPO: 4 min.\nFALA (Arthur): \"Vamos tirar a mágica da frente. Uma IA como o ChatGPT ou o Claude é uma máquina que aprendeu a prever qual é a próxima palavra de um texto. Ela leu uma quantidade enorme de livros, sites e conversas, e aprendeu quais palavras costumam vir depois de quais.\"\nAPOIO: ler a frase do card e perguntar para a sala: \"como vocês completariam?\". Mostrar que ela faz a mesma coisa: escolhe a continuação mais provável (os números são só ilustração) e repete isso palavra por palavra até montar a resposta inteira. Por isso ela escreve tão bem. E por isso, quando não sabe, ela não fica quieta: monta uma resposta que parece certa, com a mesma confiança. É assim que nasce a famosa invenção.\nCOMO ELA NOS ENTENDE: ela não entende como a gente; ela transforma o que você escreve em pedacinhos de texto (o nome técnico é token, não precisa decorar) e calcula o que combina com eles. Quanto mais claro o seu texto, melhor a conta.\nTRANSIÇÃO: \"E isso não nasceu ontem. A ideia é bem mais velha do que parece.\" (passa para a história)","ia-historia":"TEMPO: 2 min.\nFALA (Arthur): \"A ideia de máquina que pensa tem mais de setenta anos. Em 1950, o matemático Alan Turing fez a pergunta: máquinas podem pensar? Em 1956 nasceu o nome inteligência artificial. Em 1997, um computador da IBM venceu o campeão mundial de xadrez. Em 2017, pesquisadores do Google criaram o Transformer, a base de todos esses modelos de hoje. E no fim de 2022 chegou o ChatGPT, que juntou 100 milhões de pessoas em cerca de dois meses. Aí começou o boom.\"\nAPOIO: o ponto é desmistificar: não é moda de um ano, é uma tecnologia antiga que ficou boa de repente. O número dos 100 milhões é uma estimativa de mercado (UBS, janeiro de 2023). De lá para cá, a cada poucos meses sai um modelo novo, então os nomes mudam rápido; a forma de usar bem não muda.\nFONTES: Turing, \"Computing Machinery and Intelligence\" (1950); Conferência de Dartmouth (1956); IBM Deep Blue (1997); Vaswani et al., \"Attention Is All You Need\" (2017); estimativa UBS (2023).\nTRANSIÇÃO: \"E com tanta ferramenta nova, fica a dúvida: quem é quem?\" (passa para quem é quem)","ia-quem":"TEMPO: 3 min. FALA (Arthur): \"ChatGPT, Claude, Gemini, Copilot, Grok: parece tudo a mesma coisa, mas tem uma diferença simples. O app é a sala de concerto: é onde você entra, escreve e lê. O modelo é o músico que toca lá dentro. A OpenAI faz o ChatGPT e a família GPT, hoje com modelos como Sol, Terra e Luna. A Anthropic faz o Claude e os modelos Opus, Sonnet e Haiku. O Google faz o Gemini. A Microsoft faz o Copilot, que usa músicos de parceiros. E a xAI, que hoje faz parte da SpaceX, faz o Grok.\" APOIO: a mesma sala pode trocar de músico (dá para escolher o modelo dentro do app) e o mesmo músico pode tocar em salas diferentes (o Copilot usa modelos de outras empresas). Os nomes dos modelos mudam a cada poucos meses; não precisa decorar. PERGUNTA PARA A SALA: \"Quem aqui já usou mais de um desses?\" TRANSIÇÃO: \"E por que a mesma empresa tem mais de um modelo? Porque cada um tem um tamanho.\" (passa para os tamanhos)","ia-tamanhos":"TEMPO: 3 min. FALA (Arthur): \"Pensem numa orquestra. O Opus é o regente: o modelo mais forte, que pensa mais, planeja e decide. É mais lento e mais caro. O Sonnet é o maestro de naipe: cuida de uma parte da orquestra, como as cordas ou os metais; é o equilíbrio, que dá conta do dia a dia com qualidade. O Haiku é o instrumento: rápido e barato, ótimo para tarefas pequenas e repetidas.\" APOIO: esses são os nomes da família do Claude, mas toda empresa tem a mesma escada (no Gemini, por exemplo, há o Pro e o Flash). Guardem a imagem do regente, do maestro e do instrumento: ela volta quando a gente falar de agentes e na dinâmica do fim da tarde. Na versão gratuita o app escolhe o modelo por você, em geral um menor ou intermediário; isso já resolve muita coisa. TRANSIÇÃO: \"Além do tamanho, muda o lugar onde ela trabalha.\" (passa para onde ela trabalha)","ia-onde":"TEMPO: 3 min. FALA (Arthur): \"A IA trabalha de três jeitos. O primeiro é conversar: é o chat que vocês já conhecem, você pergunta e ela responde. O segundo é trabalhar: você entrega uma tarefa inteira, ela abre seus arquivos e apps, faz em etapas e te devolve pronto. O terceiro é programar: ela escreve e roda programas de verdade, como o Codex, da OpenAI, e o Claude Code, da Anthropic.\" APOIO: o modo trabalhar é o que vem por aí para o dia a dia de escritório: no Claude ele fica no app do computador; no ChatGPT, no modo agente. O modo programar é o que usamos na Inteligência para construir ferramentas como o Rota86. Não é preciso usar os três: entender que existem já muda o que vocês podem pedir. TRANSIÇÃO: \"Agora que a gente sabe o que ela é, vamos ao segundo movimento: como pedir. E todo produto que se preza vem com manual.\" (passa para o manual)","manual":"TEMPO: 3 min. Tom leve: este slide é para rir.\nFALA (Arthur): \"Segundo movimento: como pedir. E todo produto vem com manual, né? Então aqui está o manual da IA. Modelo: especialista pronto. Voltagem: a sua pergunta. Garantia: nenhuma, confira tudo.\"\nAPOIO: ler os avisos com pausa, como quem lê manual de eletrodoméstico. Não lê mentes. Não estava na reunião de ontem. Não sabe qual é aquela planilha. Inventa com a mesma confiança com que acerta. Perguntar: \"quem aqui já pediu alguma coisa para alguém achando que a pessoa ia entender e não entendeu?\" Todo mundo já. Com a IA é igual, só que ela não fala que não entendeu: ela responde mesmo assim.\nTRANSIÇÃO: \"Para entender o que ela precisa de vocês, eu quero que vocês imaginem uma coisa.\" (passa para o livro em branco)","livro":"TEMPO: 5 min. Clique a cada item (10 cliques).\nFALA (Arthur): \"Imaginem que vocês são um livro em branco. Agora pensem: o que todo livro precisa ter?\" Deixar a sala responder antes de clicar.\nAPOIO: a cada clique aparece uma parte do livro, com um exemplo de livro sobre a nossa rotina: Sexta-feira no BKO. Título, autor, gênero, público, personagens, cenário, enredo, regras do mundo, final e capa. Se a sala falar uma parte antes, clique e diga \"isso!\". Para o efeito completo, abrir o livro 3D (link no slide), que abre, escreve página por página e no fim faz a virada sozinho; avance com espaço ou clique.\nIDEIA POR TRÁS: um escritor genial que recebe um livro em branco não sabe qual história contar. A IA é esse escritor. Ela sabe escrever qualquer livro; o seu livro, só você sabe contar.\nTRANSIÇÃO: \"E o que isso tem a ver com a IA? Tudo.\" (passa para a virada)","livro-ia":"TEMPO: 3 min.\nFALA (Arthur): \"Cada parte do livro é uma parte do pedido que vocês fazem para a IA. O título é o objetivo. O autor é o seu papel. O gênero é o tipo de entrega: planilha, e-mail, painel. O público é quem vai ler. Os personagens são os dados e as pessoas envolvidas. O cenário é o contexto. O enredo são as etapas. As regras do mundo são as regras e os limites. O final é como saber que deu certo. E a capa é o formato e o visual.\"\nAPOIO: quando falta uma parte, ela inventa uma. Pedido sem público vira texto para ninguém; pedido sem regra vira regra inventada. Guardem essas dez partes: elas viram o roteiro da dinâmica do fim da tarde, quando cada um de vocês vai escrever uma delas.\nTRANSIÇÃO: \"Ou seja: quando você pede alguma coisa, você está esperando uma resposta. Mas ela também está esperando uma coisa de você.\" (passa para a pergunta)","pergunta":"TEMPO: 2 min. Pausa dramática: deixe o slide falar.\nFALA (Arthur): \"Toda vez que vocês pedem alguma coisa para a IA, vocês esperam uma resposta. Só que ela também está esperando uma coisa: uma boa pergunta. Se a pergunta é boa, a resposta é boa. E tem mais: quem sabe perguntar sabe julgar a resposta. Porque, se você sabe exatamente o que pediu, você enxerga na hora quando ela errou.\"\nAPOIO: repetir a frase de baixo devagar. Dica de ouro: boas perguntas costumam começar com \"como\". Como eu saberia que deu certo? Como quero ver a resposta? Como ela pode errar?\nTRANSIÇÃO: \"E aí entra a palavra que todo mundo fala quando o assunto é IA.\" (passa para o prompt)","prompt-alma":"TEMPO: 3 min. Dois cliques: \"Com IA.\" e depois a faixa.\nFALA (Arthur): \"Prompt é só o nome do pedido que a gente escreve para a IA. É a palavra mais comentada desse mundo: tem milhares de cursos ensinando a montar o prompt perfeito. E sabe como eles fazem esses prompts perfeitos?\" (clique) \"Com IA.\" (deixar rir)\nAPOIO: o segredo não é decorar fórmula de prompt. A própria IA escreve um ótimo prompt se você souber o que quer. (clique) O prompt é a alma da coisa, mas alma sem corpo não materializa nada. O corpo é o plano: o que você quer, para quem, com quais dados e quais regras.\nTRANSIÇÃO: \"Então a pergunta certa não é como escrever um prompt. É: como montar esse plano?\" (passa para o terceiro movimento)"};

css('css-m2', [
'.st.nt,.st.nt *{transition:none!important;animation:none!important}',
'.st .foot{font-size:22px}',

/* ============ manual ============ */
'.st-manual .bg{position:absolute;left:0;top:0;width:1600px;height:900px;object-fit:cover;z-index:0}',
'.st-manual .logo,.st-manual .eyebrow,.st-manual .ttl,.st-manual .man,.st-manual .foot{position:relative;z-index:2}',
'.st-manual .logo{position:absolute}.st-manual .foot{position:absolute}',
'.st-manual .man{width:790px;margin-top:32px;background:#fff;border:2px solid var(--line);border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,.14);overflow:hidden;opacity:0;transform:translateY(40px) rotate(-1deg);transition:opacity .6s ease,transform .8s cubic-bezier(.2,.8,.2,1)}',
'.st-manual .man.in{opacity:1;transform:none}',
'.st-manual .mh{display:flex;align-items:center;justify-content:space-between;background:var(--ink);padding:14px 28px;color:#fff;font-size:22px}',
'.st-manual .mh b{font-weight:800;letter-spacing:3px}.st-manual .mh span{font-weight:600;color:var(--stage-muted)}',
'.st-manual .mb{padding:20px 28px 22px}',
'.st-manual .kv{display:flex;align-items:baseline;gap:12px;font-size:26px;height:40px;opacity:0;transform:translateX(-20px);transition:opacity .4s,transform .5s}',
'.st-manual .kv.in{opacity:1;transform:none}',
'.st-manual .kv b{font-weight:800;color:var(--ink);flex:none}',
'.st-manual .kv i{flex:1;border-bottom:3px dotted var(--line);transform:translateY(-6px)}',
'.st-manual .kv span{color:var(--text);font-weight:500;flex:none;min-width:40px}',
'.st-manual .seal{display:inline-flex;align-items:center;gap:12px;margin:14px 0 12px;padding:6px 20px 6px 14px;border-radius:10px;background:var(--red);color:#fff;font-size:26px;font-weight:800;letter-spacing:3px;opacity:0;transform:scale(.4) rotate(-12deg);transition:opacity .3s,transform .6s cubic-bezier(.34,1.8,.64,1)}',
'.st-manual .seal.in{opacity:1;transform:rotate(-2deg)}',
'.st-manual.go .seal.in{animation:mn-blink 1.2s steps(1,end) infinite}',
'@keyframes mn-blink{0%{opacity:1;box-shadow:0 0 0 0 rgba(227,0,27,.55)}55%{opacity:.28;box-shadow:0 0 0 14px rgba(227,0,27,0)}}',
'.st-manual .lb{display:flex;align-items:center;gap:14px;width:fit-content;max-width:100%;font-size:26px;font-weight:700;line-height:1.25;color:var(--ink);background:#fff;border:2px dashed var(--red);border-radius:8px;padding:7px 18px 7px 10px;margin-bottom:10px;opacity:0;transform:translateX(-70px) rotate(-8deg) scale(.9);transform-origin:0 50%;transition:opacity .35s ease,transform .6s cubic-bezier(.34,1.5,.64,1)}',
'.st-manual .lb::before{content:"!";flex:none;width:30px;height:30px;border-radius:50%;background:var(--red);color:#fff;font-size:22px;font-weight:900;display:flex;align-items:center;justify-content:center}',
'.st-manual .lb.in{opacity:1;transform:rotate(var(--r,0deg))}',

/* ============ livro ============ */
'.st-livro .stage{position:absolute;left:96px;top:262px;width:1010px;height:540px;z-index:1}',
'.st-livro .bk{position:relative;width:1010px;height:530px;transform:perspective(2200px) rotateX(13deg);transform-origin:50% 100%}',
'.st-livro.go .bk{animation:lv-in 1.1s cubic-bezier(.2,.8,.2,1) both}',
'@keyframes lv-in{from{opacity:0;transform:perspective(2200px) rotateX(58deg) translateY(70px) scale(.92)}to{opacity:1;transform:perspective(2200px) rotateX(13deg)}}',
'.st-livro .cv{position:absolute;left:0;top:0;width:1010px;height:530px;border-radius:20px;background:linear-gradient(160deg,#d8112b,#b40f26);box-shadow:0 22px 48px rgba(0,0,0,.22)}',
'.st-livro .pg{position:absolute;top:14px;width:490px;height:502px;padding:34px 38px;display:flex;flex-direction:column;justify-content:space-between;background:#fbf7ee}',
'.st-livro .pg.l{left:14px;border-radius:12px 0 0 12px;background:linear-gradient(90deg,#fbf7ee 84%,#e6dcc8 100%);box-shadow:-4px 5px 0 -1px #efe7d6,-8px 9px 0 -2px #e2d8c3}',
'.st-livro .pg.r{left:506px;border-radius:0 12px 12px 0;background:linear-gradient(90deg,#e6dcc8 0%,#fbf7ee 16%);box-shadow:4px 5px 0 -1px #efe7d6,8px 9px 0 -2px #e2d8c3}',
'.st-livro .sp{position:absolute;left:504px;top:14px;width:2px;height:502px;background:#cfc4ad}',
'.st-livro .pt{position:relative;height:82px;border-bottom:2px solid rgba(60,40,20,.07)}',
'.st-livro .lab{font-size:22px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--red);opacity:0;transform:translateY(6px);transition:opacity .4s,transform .4s}',
'.st-livro .pt.wr .lab{opacity:1;transform:none}',
'.st-livro .v{display:inline-block;white-space:nowrap;font-family:Caveat,cursive;font-size:38px;font-weight:700;line-height:1.1;color:var(--ink);padding:2px 14px 4px 3px;margin:-2px -14px -4px -3px;-webkit-mask-image:linear-gradient(90deg,#000 0,#000 50%,transparent 58%);mask-image:linear-gradient(90deg,#000 0,#000 50%,transparent 58%);-webkit-mask-size:260% 100%;mask-size:260% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:100% 0;mask-position:100% 0;transition:-webkit-mask-position .9s linear .15s,mask-position .9s linear .15s}',
'.st-livro .pt.wr .v{-webkit-mask-position:0 0;mask-position:0 0}',
'.st-livro .pt.cur::after{content:"";position:absolute;left:-14px;top:6px;width:5px;height:56px;border-radius:3px;background:var(--red);opacity:.85}',
'.st-livro .side{position:absolute;left:1146px;top:290px;width:358px;z-index:1;display:flex;flex-direction:column;gap:20px}',
'.st-livro .side h3{font-size:34px;font-weight:700;line-height:1.25;color:var(--ink)}',
'.st-livro .side p{font-size:26px;line-height:1.4;color:var(--text)}',
'.st-livro .dots{display:flex;gap:9px;flex-wrap:wrap}',
'.st-livro .dots i{width:26px;height:26px;border-radius:50%;border:3px solid var(--line);background:#fff;transition:background .3s,border-color .3s,transform .4s cubic-bezier(.34,1.56,.64,1)}',
'.st-livro .dots i.on{background:var(--red);border-color:var(--red);transform:scale(1.12)}',
'.st-livro .btn-demo{align-self:flex-start;margin-top:8px}',

/* ============ livro-ia ============ */
'.st-livro-ia .grid{position:relative;z-index:1;margin-top:30px;display:grid;grid-template-columns:1fr 1fr;gap:12px 20px}',
'.st-livro-ia .fl{height:74px;perspective:1100px}',
'.st-livro-ia .in2{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .8s cubic-bezier(.4,1.4,.5,1)}',
'.st-livro-ia .fl.in .in2{transform:rotateX(180deg)}',
'.st-livro-ia .fa,.st-livro-ia .fb{position:absolute;inset:0;border-radius:14px;display:flex;align-items:center;padding:0 24px;-webkit-backface-visibility:hidden;backface-visibility:hidden}',
'.st-livro-ia .fa{background:#fff;border:2px solid var(--line);box-shadow:var(--shadow);gap:14px;font-size:28px;font-weight:600;color:var(--muted)}',
'.st-livro-ia .fa svg{color:var(--muted)}',
'.st-livro-ia .fb{transform:rotateX(180deg);background:#fff4f4;border:2px solid var(--red);gap:16px}',
'.st-livro-ia .fb em{font-style:normal;font-size:24px;font-weight:600;color:var(--muted);flex:none}',
'.st-livro-ia .fb svg{color:var(--red);flex:none}',
'.st-livro-ia .fb b{font-size:30px;font-weight:800;color:var(--ink);white-space:nowrap}',
'.st-livro-ia .band{position:absolute;z-index:2;left:96px;width:1408px;top:712px;display:flex;align-items:center;gap:20px;background:var(--ink);border-radius:14px;padding:22px 32px;opacity:0;transform:translateY(40px);transition:opacity .6s,transform .7s cubic-bezier(.2,.8,.2,1)}',
'.st-livro-ia .band.in{opacity:1;transform:none}',
'.st-livro-ia .band .ic{width:56px;height:56px;flex:none;border-radius:50%;background:#fff;color:var(--red);display:flex;align-items:center;justify-content:center}',
'.st-livro-ia .band p{font-size:30px;font-weight:700;line-height:1.3;color:#fff}',

/* ============ pergunta ============ */
'.st-pergunta{display:flex;flex-direction:column;justify-content:center;gap:34px;padding-top:120px}',
'.st-pergunta .logo{display:none}',
'.st-pergunta .lg{position:absolute;left:96px;top:34px;z-index:3;background:#fff;border-radius:12px;padding:8px 16px;display:flex}',
'.st-pergunta .lg img{height:44px;display:block}',
'.st-pergunta .foot{color:rgba(255,255,255,.85)}',
'.st-pergunta .eyebrow{border-left-color:#fff;position:relative;z-index:2;width:fit-content}',
'.st-pergunta .q{position:absolute;right:40px;top:-120px;font-size:1000px;font-weight:900;line-height:1;color:#fff;opacity:.09;z-index:0;pointer-events:none;transform:rotate(8deg)}',
'.st-pergunta.go .q{animation:pg-drift 9s ease-in-out infinite alternate}',
'@keyframes pg-drift{from{transform:rotate(8deg) translateY(0)}to{transform:rotate(3deg) translateY(30px)}}',
'.st-pergunta h1{position:relative;z-index:2;font-size:88px;font-weight:900;line-height:1.06;color:#fff;letter-spacing:-1px}',
'.st-pergunta .ln{display:block}',
'.st-pergunta .wd{display:inline-block;opacity:0;transition:opacity .5s ease,transform .8s cubic-bezier(.2,.9,.2,1),filter .6s ease}',
'.st-pergunta .l1 .wd{transform:translateY(-70px);filter:blur(12px)}',
'.st-pergunta .l2 .wd{transform:translateY(70px);filter:blur(12px)}',
'.st-pergunta .wd.in{opacity:1;transform:none;filter:none}',
'.st-pergunta .em{position:relative;display:inline-block}',
'.st-pergunta .em::after{content:"";position:absolute;left:0;right:.2em;bottom:-4px;height:9px;border-radius:5px;background:#fff;transform:scaleX(0);transform-origin:left;transition:transform .7s cubic-bezier(.3,.8,.3,1) .2s}',
'.st-pergunta .em.pop::after{transform:none}',
'.st-pergunta .em.pop{animation:pg-pop .8s cubic-bezier(.34,1.56,.64,1)}',
'@keyframes pg-pop{0%{transform:scale(1)}40%{transform:scale(1.14)}100%{transform:scale(1)}}',
'.st-pergunta .rule{position:relative;z-index:2;width:96px;height:4px;border:0;background:#fff;margin:0;transform-origin:left;transform:scaleX(0);transition:transform .7s cubic-bezier(.3,.8,.3,1)}',
'.st-pergunta .rule.in{transform:none}',
'.st-pergunta .fin{position:relative;z-index:2;font-size:44px;font-weight:600;line-height:1.25;color:#fff;width:1300px}',
'.st-pergunta .ch{display:inline-block;opacity:0;transform:translateY(22px);transition:opacity .35s ease,transform .5s cubic-bezier(.2,.9,.2,1)}',
'.st-pergunta .ch.sp{width:.28em}',
'.st-pergunta .ch.in{opacity:1;transform:none}',

/* ============ prompt-alma ============ */
'.st-prompt-alma .deco{width:200px;height:230px}',
'.st-prompt-alma .body{position:relative;z-index:1;margin-top:34px;display:flex;flex-direction:column;gap:12px}',
'.st-prompt-alma .p1{font-size:40px;font-weight:700;line-height:1.25;color:var(--ink)}',
'.st-prompt-alma .p2{font-size:40px;font-weight:500;line-height:1.25;color:var(--text)}',
'.st-prompt-alma .cr{display:inline-block;width:5px;height:38px;background:var(--red);vertical-align:-6px;margin-left:8px}',
'.st-prompt-alma.go .cr{animation:pa-cr 1s steps(2,jump-none) infinite}',
'@keyframes pa-cr{0%{opacity:1}50%{opacity:0}100%{opacity:1}}',
'.st-prompt-alma.s1 .cr{display:none}',
'.st-prompt-alma .cia{position:relative;align-self:flex-start;margin-top:22px;font-size:72px;font-weight:900;line-height:1.1;color:#fff;background:var(--red);border-radius:999px;padding:10px 44px;opacity:0;transform:scale(.2) rotate(-10deg);transition:opacity .25s,transform .7s cubic-bezier(.34,1.8,.64,1)}',
'.st-prompt-alma.s1 .cia{opacity:1;transform:none}',
'.st-prompt-alma .ping{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:999px;border:4px solid var(--red);opacity:0;pointer-events:none}',
'.st-prompt-alma.s1 .ping{animation:pa-ping 1s ease-out .25s}',
'@keyframes pa-ping{0%{opacity:.8;transform:scale(1)}100%{opacity:0;transform:scale(1.5,1.9)}}',
'.st-prompt-alma .spk{position:absolute;left:50%;top:50%;width:14px;height:14px;margin:-7px;border-radius:50%;background:var(--red);opacity:0;pointer-events:none}',
'.st-prompt-alma.s1 .spk{animation:pa-spk .9s cubic-bezier(.1,.7,.3,1) .25s}',
'@keyframes pa-spk{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(.3)}}',
'.st-prompt-alma .band{position:absolute;z-index:2;left:96px;width:1408px;top:626px;display:flex;align-items:center;gap:24px;background:var(--ink);border-radius:14px;padding:26px 36px;opacity:0;transform:translateY(50px);transition:opacity .5s,transform .7s cubic-bezier(.2,.8,.2,1)}',
'.st-prompt-alma.s2 .band{opacity:1;transform:none}',
'.st-prompt-alma .band .ic{width:60px;height:60px;flex:none;border-radius:50%;background:var(--red);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 0 rgba(227,0,27,.6)}',
'.st-prompt-alma.go.s2 .band .ic{animation:pa-glow 2s ease-out infinite}',
'@keyframes pa-glow{0%{box-shadow:0 0 0 0 rgba(227,0,27,.7)}100%{box-shadow:0 0 0 24px rgba(227,0,27,0)}}',
'.st-prompt-alma .band p{font-size:34px;font-weight:700;line-height:1.3;color:#fff}',
'.st-prompt-alma .sg{display:inline;opacity:0;transition:opacity .5s ease}',
'.st-prompt-alma.s2 .sg{opacity:1}',
'.st-prompt-alma.s2 .sg:nth-child(2){transition-delay:.55s}.st-prompt-alma.s2 .sg:nth-child(3){transition-delay:1.1s}',
'.st-prompt-alma .sg3{display:block}',
'.st-prompt-alma .sg b{color:#ff7a8a;font-weight:800}'
].join('\n'));

/* ---------- MANUAL ---------- */
var MN_W = ['Não lê mentes.', 'Não estava na reunião de ontem.', 'Não sabe qual é “aquela planilha”.', 'Inventa com a mesma confiança com que acerta.'];
var MN_KV = [['Voltagem', 'a sua pergunta'], ['Garantia', 'nenhuma: confira tudo']];
function mnSet(el, on) {
  $(el, '.man').classList.toggle('in', on);
  $$(el, '.kv').forEach(function (k, i) { k.classList.toggle('in', on); $(k, 'span').textContent = on ? MN_KV[i][1] : ''; });
  $(el, '.seal').classList.toggle('in', on);
  $$(el, '.lb').forEach(function (l) { l.classList.toggle('in', on); });
}
ORQ.add({
  id: 'manual', mov: 2, order: 30, title: 'Leia antes de ligar a IA.', tone: 'light', steps: 0,
  render: function (el) {
    var kv = MN_KV.map(function (k) { return '<div class="kv"><b>' + k[0] + '</b><i></i><span></span></div>'; }).join('');
    var lb = MN_W.map(function (t, i) { return '<p class="lb" style="--r:' + [-1.4, 1, -0.7, 1.2][i] + 'deg">' + t + '</p>'; }).join('');
    el.innerHTML = '<img class="bg" src="img/claro-apontando.jpg" alt="">' + LOGO + '<p class="eyebrow">MOVIMENTO 2 · MANUAL BÁSICO DE USO</p>' +
      '<h2 class="ttl">Leia antes de <em>ligar a IA.</em></h2>' +
      '<div class="man"><div class="mh"><b>MANUAL DO USUÁRIO</b><span>Modelo: Especialista Pronto</span></div><div class="mb">' + kv +
      '<div class="seal">' + svg('warn', 30, 2.5) + 'ATENÇÃO</div>' + lb + '</div></div>' + FOOT;
    mnSet(el, true);
  },
  enter: function (el) {
    stop(el); el.classList.add('go');
    if (reduce()) { snap(el, function () { mnSet(el, true); }); return; }
    snap(el, function () { mnSet(el, false); });
    later(el, function () { $(el, '.man').classList.add('in'); }, 300);
    $$(el, '.kv').forEach(function (k, i) {
      later(el, function () { k.classList.add('in'); typeText(el, $(k, 'span'), MN_KV[i][1], 32); }, 900 + i * 700);
    });
    later(el, function () { $(el, '.seal').classList.add('in'); }, 2500);
    $$(el, '.lb').forEach(function (l, i) { later(el, function () { l.classList.add('in'); }, 3200 + i * 650); });
  },
  leave: function (el) { stop(el); el.classList.remove('go'); snap(el, function () { mnSet(el, true); }); },
  notes: N.manual
});

/* ---------- LIVRO ---------- */
var BK = [['Título', 'Sexta-feira no BKO'], ['Autor', 'Analista de backoffice'], ['Gênero', 'Manual prático'], ['Público', 'Coordenadores, com pressa'], ['Personagens', 'Promotores e pendências'],
  ['Cenário', 'Operação P&amp;G'], ['Enredo', 'Listar, cobrar, conferir'], ['Regras do mundo', 'Atrasada: prazo antes de hoje'], ['Final', 'Nenhuma pendência esquecida'], ['Capa', 'Vermelho, amarelo e verde']];
function lvApply(el, n) {
  $$(el, '.pt').forEach(function (p, i) { p.classList.toggle('wr', i < n); p.classList.toggle('cur', i === n - 1); });
  $$(el, '.dots i').forEach(function (d, i) { d.classList.toggle('on', i < n); });
  el.__step = n;
}
ORQ.add({
  id: 'livro', mov: 2, order: 31, title: 'Imagine que você é um livro em branco.', tone: 'light', steps: 10,
  render: function (el) {
    var pt = function (a) { return '<div class="pt"><div class="lab">' + a[0] + '</div><div class="v">' + a[1] + '</div></div>'; };
    var left = BK.slice(0, 5).map(pt).join(''), right = BK.slice(5).map(pt).join('');
    var dots = BK.map(function () { return '<i></i>'; }).join('');
    el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">MOVIMENTO 2 · O LIVRO EM BRANCO</p>' +
      '<h2 class="ttl">Imagine que você é <em>um livro em branco.</em></h2>' +
      '<div class="stage"><div class="bk"><div class="cv"></div><div class="pg l">' + left + '</div><div class="pg r">' + right + '</div><i class="sp"></i></div></div>' +
      '<div class="side"><h3>Pense nas coisas que todo livro tem.</h3><p>Cada clique escreve uma.</p><div class="dots">' + dots + '</div>' +
      '<button class="btn-demo" type="button">' + svg('book', 26) + 'Abrir o livro 3D</button></div>' + FOOT;
    $(el, '.btn-demo').addEventListener('click', function () { if (window.ORQ && ORQ.openDemo) ORQ.openDemo('demos/livro.html'); });
    el.__stepped = false; lvApply(el, 10);
  },
  enter: function (el) { stop(el); el.classList.add('go'); if (!el.__stepped) lvApply(el, 0); },
  leave: function (el) { stop(el); el.classList.remove('go'); el.__stepped = false; },
  step: function (el, n) { el.__stepped = true; lvApply(el, Math.max(0, Math.min(10, n | 0))); },
  notes: N.livro
});

/* ---------- LIVRO-IA ---------- */
var LI = [['Título', 'Objetivo'], ['Personagens', 'Dados e envolvidos'], ['Autor', 'Seu papel'], ['Cenário', 'Contexto'], ['Gênero', 'Tipo de entrega'], ['Enredo', 'Etapas'], ['Público', 'Quem vai ler'], ['Final', 'Como saber que deu certo'], ['Regras do mundo', 'Regras e limites'], ['Capa', 'Formato e visual']];
function liSet(el, on) { $$(el, '.fl').forEach(function (f) { f.classList.toggle('in', on); }); $(el, '.band').classList.toggle('in', on); }
ORQ.add({
  id: 'livro-ia', mov: 2, order: 32, title: 'Livro e pedido têm as mesmas partes.', tone: 'light', steps: 0,
  render: function (el) {
    var tiles = LI.map(function (a) {
      return '<div class="fl"><div class="in2"><div class="fa">' + svg('book', 28) + a[0] + '</div><div class="fb"><em>' + a[0] + '</em>' + svg('arrow', 24, 3) + '<b>' + a[1] + '</b></div></div></div>';
    }).join('');
    el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">MOVIMENTO 2 · A VIRADA</p>' +
      '<h2 class="ttl">Livro e pedido <em>têm as mesmas partes.</em></h2><div class="grid">' + tiles + '</div>' +
      '<div class="band"><div class="ic">' + svg('book', 32) + '</div><p>A IA sabe escrever qualquer livro. O seu, só você sabe contar.</p></div>' + FOOT;
    liSet(el, true);
  },
  enter: function (el) {
    stop(el); el.classList.add('go');
    if (reduce()) { snap(el, function () { liSet(el, true); }); return; }
    snap(el, function () { liSet(el, false); });
    $$(el, '.fl').forEach(function (f, i) { later(el, function () { f.classList.add('in'); }, 800 + i * 300); });
    later(el, function () { $(el, '.band').classList.add('in'); }, 800 + 10 * 300 + 500);
  },
  leave: function (el) { stop(el); el.classList.remove('go'); snap(el, function () { liSet(el, true); }); },
  notes: N['livro-ia']
});

/* ---------- PERGUNTA ---------- */
function pgWords(t) { return t.split(' ').map(function (w) { return '<span class="wd">' + w + '</span>'; }).join(' '); }
function pgChars(t) { return t.split('').map(function (c) { return c === ' ' ? '<span class="ch sp"> </span>' : '<span class="ch">' + c + '</span>'; }).join(''); }
function pgSet(el, on) {
  $$(el, '.wd,.ch,.rule').forEach(function (n) { n.classList.toggle('in', on); });
  $(el, '.em').classList.toggle('pop', on);
}
ORQ.add({
  id: 'pergunta', mov: 2, order: 33, title: 'Você espera uma resposta. Ela espera uma pergunta.', tone: 'red', steps: 0,
  render: function (el) {
    el.innerHTML = '<div class="q">?</div><div class="lg"><img src="img/spot-logo.png" alt="SPOT"></div>' + '<p class="eyebrow">MOVIMENTO 2 · A PERGUNTA</p>' +
      '<h1><span class="ln l1">' + pgWords('Você espera uma resposta.') + '</span><span class="ln l2">' + pgWords('Ela espera uma').replace(/$/, '') + ' <span class="em">' + '<span class="wd">pergunta.</span></span></span></h1>' +
      '<hr class="rule"><p class="fin">' + pgChars('Quem sabe perguntar sabe julgar a resposta.') + '</p>' + FOOT;
    pgSet(el, true);
  },
  enter: function (el) {
    stop(el); el.classList.add('go');
    if (reduce()) { snap(el, function () { pgSet(el, true); }); return; }
    snap(el, function () { pgSet(el, false); });
    var l1 = $$(el, '.l1 .wd'), l2 = $$(el, '.l2 .wd');
    l1.forEach(function (w, i) { later(el, function () { w.classList.add('in'); }, 400 + i * 170); });
    l2.forEach(function (w, i) { later(el, function () { w.classList.add('in'); }, 1500 + i * 170); });
    later(el, function () { $(el, '.em').classList.add('pop'); }, 2400);
    later(el, function () { $(el, '.rule').classList.add('in'); }, 3200);
    $$(el, '.ch').forEach(function (c, i) { later(el, function () { c.classList.add('in'); }, 3600 + i * 28); });
  },
  leave: function (el) { stop(el); el.classList.remove('go'); snap(el, function () { pgSet(el, true); }); },
  notes: N.pergunta
});

/* ---------- PROMPT-ALMA ---------- */
function paApply(el, n) { el.classList.toggle('s1', n >= 1); el.classList.toggle('s2', n >= 2); el.__step = n; }
ORQ.add({
  id: 'prompt-alma', mov: 2, order: 34, title: 'Prompt: a palavra mais comentada da IA.', tone: 'light', steps: 2,
  render: function (el) {
    var sp = ''; for (var i = 0; i < 10; i++) { var a = i / 10 * 6.2832; sp += '<i class="spk" style="--dx:' + Math.round(Math.cos(a) * 190) + 'px;--dy:' + Math.round(Math.sin(a) * 90) + 'px"></i>'; }
    el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">MOVIMENTO 2 · PROMPT</p>' +
      '<h2 class="ttl">Prompt: a palavra<br><em>mais comentada da IA.</em></h2>' +
      '<div class="body"><p class="p1">Milhares de cursos ensinam a montar o prompt perfeito.</p><p class="p2">Sabe como eles fazem?<i class="cr"></i></p>' +
      '<div class="cia">Com IA.<i class="ping"></i>' + sp + '</div></div>' +
      '<div class="band"><div class="ic">' + svg('bulb', 34) + '</div><p><span class="sg">O prompt é a <b>alma</b>.</span> <span class="sg">O plano é o <b>corpo</b>.</span> <span class="sg sg3">Alma sem corpo não materializa nada.</span></p></div>' + FOOT;
    el.__stepped = false; paApply(el, 2);
  },
  enter: function (el) { stop(el); el.classList.add('go'); if (!el.__stepped) paApply(el, 0); },
  leave: function (el) { stop(el); el.classList.remove('go'); el.__stepped = false; },
  step: function (el, n) { el.__stepped = true; paApply(el, Math.max(0, Math.min(2, n | 0))); },
  notes: N['prompt-alma']
});
})();
