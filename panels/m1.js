/* Palco — estações m1: abertura + movimento 1 (orquestra, ia-pensa, ia-historia, ia-quem, ia-tamanhos, ia-onde).
   Gerado a partir de src12/m1.src.js. Tudo dentro de el; CSS prefixado .st-<id>; timers só entre enter/leave. */
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

css('css-m1', [
'.st.nt,.st.nt *{transition:none!important;animation:none!important}',
'.st .foot{font-size:22px}',
'.st .rv{opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.8,.2,1)}',
'.st .rv.in{opacity:1;transform:none}',

/* ============ orquestra ============ */
'.st-orquestra .bg{position:absolute;left:0;top:0;width:1600px;height:900px;object-fit:cover;z-index:0}',
'.st-orquestra.go .bg{animation:orq-kb 26s ease-in-out infinite alternate}',
'@keyframes orq-kb{from{transform:scale(1)}to{transform:scale(1.06) translateX(-8px)}}',
'.st-orquestra .shade{position:absolute;left:0;top:0;width:1600px;height:900px;z-index:1;background:linear-gradient(90deg,rgba(21,22,26,.9) 0%,rgba(21,22,26,.5) 36%,rgba(21,22,26,0) 52%)}',
'.st-orquestra .logo{z-index:3}',
'.st-orquestra .col{position:relative;z-index:2;height:100%;width:640px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:18px}',
'.st-orquestra .big{font-size:88px;font-weight:900;line-height:.98;color:#fff;letter-spacing:-1px}',
'.st-orquestra .big em{font-style:normal;color:var(--red)}',
'.st-orquestra .rule{width:96px;height:4px;border:0;margin:2px 0;background:var(--red);transform-origin:left;transform:scaleX(0);transition:transform .7s cubic-bezier(.3,.8,.3,1)}',
'.st-orquestra .rule.in{transform:none}',
'.st-orquestra .sub{font-size:32px;font-weight:500;color:var(--stage-muted)}',
'.st-orquestra .staff{position:relative;width:600px;margin-top:16px}',
'.st-orquestra .staff .br{position:absolute;left:-24px;top:0;width:5px;height:100%;background:var(--red);border-radius:3px;transform:scaleY(0);transform-origin:top;transition:transform .9s cubic-bezier(.3,.8,.3,1)}',
'.st-orquestra .staff.in .br{transform:none}',
'.st-orquestra .row{position:relative;height:58px;display:flex;align-items:flex-end;padding:0 0 9px 70px;font-size:28px;font-weight:600;color:#fff}',
'.st-orquestra .row::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:rgba(255,255,255,.34);transform-origin:left;transform:scaleX(0);transition:transform .9s cubic-bezier(.3,.8,.3,1)}',
'.st-orquestra .staff.in .row::after{transform:none}',
'.st-orquestra .row:nth-child(3)::after{transition-delay:.08s}.st-orquestra .row:nth-child(4)::after{transition-delay:.16s}.st-orquestra .row:nth-child(5)::after{transition-delay:.24s}.st-orquestra .row:nth-child(6)::after{transition-delay:.32s}',
'.st-orquestra .note{position:absolute;left:8px;bottom:5px;width:40px;height:40px;border-radius:50%;background:var(--red);color:#fff;font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center;opacity:0;transform:translateX(-60px) scale(.3);transition:opacity .4s ease,transform .7s cubic-bezier(.34,1.56,.64,1);z-index:2}',
'.st-orquestra .note::before{content:"";position:absolute;left:37px;bottom:20px;width:3px;height:34px;background:#fff;border-radius:2px;opacity:.9}',
'.st-orquestra .row.in .note{opacity:1;transform:none;animation:orq-ring 1.1s ease-out}',
'@keyframes orq-ring{0%{box-shadow:0 0 0 0 rgba(227,0,27,.8)}100%{box-shadow:0 0 0 26px rgba(227,0,27,0)}}',
'.st-orquestra .foot{color:#c4c4ca;z-index:5}',
'.st-orquestra .lb{opacity:0;transform:translateX(-16px);transition:opacity .5s ease .12s,transform .6s cubic-bezier(.2,.8,.2,1) .12s}',
'.st-orquestra .row.in .lb{opacity:1;transform:none}',

/* ============ ia-pensa ============ */
'.st-ia-pensa .wrap{position:relative;z-index:1;display:flex;gap:32px;margin-top:28px;align-items:stretch}',
'.st-ia-pensa .card{position:relative;width:920px;flex:none;padding:30px 36px 26px;overflow:visible}',
'.st-ia-pensa .sent{font-size:32px;font-weight:700;line-height:1.32;color:var(--ink);min-height:90px}',
'.st-ia-pensa .wd{color:var(--red)}',
'.st-ia-pensa .deco{width:170px;height:190px}',
'.st-ia-pensa .wd.hid{visibility:hidden}',
'.st-ia-pensa .bars{display:flex;flex-direction:column;gap:12px;margin-top:14px}',
'.st-ia-pensa .br{display:flex;align-items:center;gap:16px;height:44px}',
'.st-ia-pensa .lab{width:330px;flex:none;font-size:26px;font-weight:500;color:var(--text);white-space:nowrap;transition:color .3s,opacity .3s}',
'.st-ia-pensa .trk{flex:1;height:28px;display:flex;align-items:center;gap:14px}',
'.st-ia-pensa .fill{height:28px;width:0;background:#c9c7c8;border-radius:6px;transition:width .9s cubic-bezier(.2,.7,.2,1),background .35s}',
'.st-ia-pensa .pc{font-size:26px;font-weight:800;color:var(--ink);flex:none;white-space:nowrap}',
'.st-ia-pensa .br.win .fill{background:var(--red)}',
'.st-ia-pensa .br.win .lab{font-weight:800;color:var(--ink)}',
'.st-ia-pensa .br.fade .lab{opacity:0}',
'.st-ia-pensa .note{font-size:22px;line-height:1.35;color:var(--muted);margin-top:16px}',
'.st-ia-pensa .fly{position:absolute;z-index:5;white-space:nowrap;font-size:32px;font-weight:700;color:var(--red);margin:0;pointer-events:none;transition:transform .85s cubic-bezier(.5,0,.2,1),opacity .2s}',
'.st-ia-pensa .side{flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:18px}',
'.st-ia-pensa .it{display:flex;align-items:flex-start;gap:20px}',
'.st-ia-pensa .ic{width:64px;height:64px;flex:none;border-radius:50%;background:#fff;border:2px solid var(--red);display:flex;align-items:center;justify-content:center;color:var(--red)}',
'.st-ia-pensa .it p{font-size:28px;font-weight:600;line-height:1.3;color:var(--ink)}',

/* ============ ia-historia ============ */
'.st-ia-historia .tl{position:relative;z-index:1;margin-top:44px;display:grid;grid-template-columns:236px 236px 236px 236px 1fr;column-gap:12px}',
'.st-ia-historia .line{position:absolute;left:0;right:0;top:0;height:6px;background:var(--line);border-radius:3px}',
'.st-ia-historia .fill{position:absolute;left:0;top:0;height:6px;width:0;background:var(--red);border-radius:3px;transition:width .9s cubic-bezier(.4,0,.2,1)}',
'.st-ia-historia .nd{position:relative;padding:34px 6px 0 0}',
'.st-ia-historia .dot{position:absolute;left:0;top:-8px;width:22px;height:22px;border-radius:50%;background:#fff;border:4px solid var(--line);transition:transform .5s cubic-bezier(.34,1.56,.64,1),background .3s,border-color .3s}',
'.st-ia-historia .nd.in .dot{background:var(--red);border-color:var(--red);transform:scale(1.25)}',
'.st-ia-historia .yr{font-size:56px;font-weight:900;line-height:1;color:var(--ink);opacity:0;transform:translateY(10px);transition:opacity .4s,transform .5s}',
'.st-ia-historia .nd.in .yr{opacity:1;transform:none}',
'.st-ia-historia .tx{font-size:26px;font-weight:500;line-height:1.35;color:var(--text);margin-top:14px;opacity:0;transform:translateY(12px);transition:opacity .6s ease .35s,transform .6s ease .35s}',
'.st-ia-historia .nd.in .tx{opacity:1;transform:none}',
'.st-ia-historia .last{margin-left:6px;padding:34px 18px 22px 26px;border-radius:18px;background:rgba(227,0,27,0);transition:background .6s}',
'.st-ia-historia .last.in{background:rgba(227,0,27,.07)}',
'.st-ia-historia .last .dot{left:26px}',
'.st-ia-historia .last .yr{font-size:72px;color:var(--red)}',
'.st-ia-historia .last .tx{font-weight:700;color:var(--ink);margin-top:10px}',
'.st-ia-historia .cnt{display:flex;align-items:baseline;gap:12px;margin-top:4px;opacity:0;transition:opacity .4s ease .2s}',
'.st-ia-historia .last.in .cnt{opacity:1}',
'.st-ia-historia .cnt b{font-size:80px;font-weight:900;line-height:1;color:var(--red);font-variant-numeric:tabular-nums}',
'.st-ia-historia .cnt span{font-size:30px;font-weight:800;color:var(--ink)}',
'.st-ia-historia .ring{position:absolute;left:37px;top:3px;width:20px;height:20px;margin:-10px 0 0 -10px;border-radius:50%;border:5px solid var(--red);opacity:0;pointer-events:none}',
'.st-ia-historia .last.boom .ring{animation:hs-ring 1.3s ease-out forwards}',
'.st-ia-historia .last.boom .r2{animation-delay:.18s}.st-ia-historia .last.boom .r3{animation-delay:.36s}',
'@keyframes hs-ring{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(26)}}',
'.st-ia-historia .pt{position:absolute;left:37px;top:3px;width:12px;height:12px;border-radius:3px;background:var(--red);opacity:0;pointer-events:none}',
'.st-ia-historia .last.boom .pt{animation:hs-pt 1.2s cubic-bezier(.1,.7,.3,1) forwards}',
'@keyframes hs-pt{0%{opacity:1;transform:translate(0,0) rotate(0) scale(1)}100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(var(--rot)) scale(.4)}}',
'.st-ia-historia .deco{width:150px;height:170px}',
'.st-ia-historia .band{position:absolute;z-index:2;left:96px;width:1408px;top:712px;display:flex;align-items:center;gap:20px;background:var(--ink);border-radius:14px;padding:22px 32px}',
'.st-ia-historia .band .ic{width:56px;height:56px;flex:none;border-radius:50%;background:#fff;color:var(--red);display:flex;align-items:center;justify-content:center}',
'.st-ia-historia .band p{font-size:28px;font-weight:700;line-height:1.3;color:#fff}',
'.st-ia-historia .band.rv{transform:translateY(40px)}',
'.st-ia-historia .band.rv.in{transform:none}',

/* ============ ia-quem ============ */
'.st-ia-quem .tbl{position:relative;z-index:1;margin-top:30px;display:flex;flex-direction:column;gap:10px}',
'.st-ia-quem .hd,.st-ia-quem .rw{display:grid;grid-template-columns:22% 28% 1fr;align-items:center}',
'.st-ia-quem .hd{background:var(--ink);border-radius:14px;height:52px;color:#fff;font-size:22px;font-weight:700}',
'.st-ia-quem .hd div{padding:0 24px}',
'.st-ia-quem .rw{height:76px;background:#fff;border:2px solid var(--line);border-radius:14px;box-shadow:var(--shadow);opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .6s cubic-bezier(.2,.8,.2,1),border-color .5s}',
'.st-ia-quem .rw.in{opacity:1;transform:none}',
'.st-ia-quem .rw.open{border-color:rgba(227,0,27,.45)}',
'.st-ia-quem .co{padding:0 24px;font-size:28px;font-weight:600;color:var(--text)}',
'.st-ia-quem .ap{padding:0 12px 0 24px}',
'.st-ia-quem .room{position:relative;display:inline-block;overflow:hidden;font-size:30px;font-weight:800;color:var(--ink);padding:7px 22px;border-radius:10px;border:2px solid var(--red);background:#fff4f4}',
'.st-ia-quem .cur{position:absolute;top:0;bottom:0;width:51%;background:repeating-linear-gradient(90deg,#e3001b 0 10px,#c41029 10px 20px);transition:transform .8s cubic-bezier(.6,0,.2,1);z-index:2}',
'.st-ia-quem .cur.l{left:0}.st-ia-quem .cur.r{right:0}',
'.st-ia-quem .rw.open .cur.l{transform:translateX(-101%)}.st-ia-quem .rw.open .cur.r{transform:translateX(101%)}',
'.st-ia-quem .mu{display:flex;flex-wrap:nowrap;gap:12px;padding:0 20px 0 12px;align-items:center}',
'.st-ia-quem .m{font-size:26px;font-weight:700;color:var(--ink);background:var(--soft);border:2px solid var(--line);border-radius:999px;padding:5px 20px;white-space:nowrap;opacity:0;transform:translateX(140px) scale(.9);transition:opacity .4s ease,transform .7s cubic-bezier(.34,1.4,.64,1)}',
'.st-ia-quem .m.in{opacity:1;transform:none}',
'.st-ia-quem .m.long{font-size:24px;font-weight:600}',

/* ============ ia-tamanhos ============ */
'.st-ia-tamanhos .row3{position:relative;z-index:1;display:flex;gap:24px;margin-top:26px;align-items:stretch}',
'.st-ia-tamanhos .cd{flex:1;padding:18px 28px 24px;opacity:0;transform:translateY(40px);transition:opacity .6s ease,transform .7s cubic-bezier(.2,.8,.2,1)}',
'.st-ia-tamanhos .cd.in{opacity:1;transform:none}',
'.st-ia-tamanhos .cd.s2.in{transform:translateY(16px)}.st-ia-tamanhos .cd.s3.in{transform:translateY(32px)}',
'.st-ia-tamanhos .ob{position:relative;height:190px}',
'.st-ia-tamanhos .s{position:absolute;left:50%;top:50%;width:0;height:0;transform:scale(0);transition:transform .8s cubic-bezier(.34,1.56,.64,1) .25s}',
'.st-ia-tamanhos .cd.in .s{transform:scale(1)}',
'.st-ia-tamanhos .o{position:absolute;border-radius:50%;z-index:2}',
'.st-ia-tamanhos .w{position:absolute;border-radius:50%;border:2px solid #e08a69;opacity:0;z-index:1}',
'.st-ia-tamanhos .d{position:absolute;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:#d97757;box-shadow:0 0 10px rgba(217,119,87,.55)}',
'.st-ia-tamanhos.go .o{animation:tm-b var(--bt) ease-in-out infinite}',
'.st-ia-tamanhos.go .w{animation:tm-w var(--wt) ease-out infinite}',
'.st-ia-tamanhos.go .w.k{animation-delay:calc(var(--wt) / 2)}',
'@keyframes tm-b{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}',
'@keyframes tm-w{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.45);opacity:0}}',
'.st-ia-tamanhos h3{font-size:44px;font-weight:800;color:var(--ink);margin-top:4px}',
'.st-ia-tamanhos .role{font-size:22px;font-weight:800;letter-spacing:3px;color:var(--red);margin-top:6px}',
'.st-ia-tamanhos .ds{font-size:26px;line-height:1.38;color:var(--text);margin-top:10px}',
'.st-ia-tamanhos .foot{bottom:22px}',
'.st-ia-tamanhos .band{position:absolute;z-index:2;left:96px;width:1408px;top:734px;display:flex;align-items:center;gap:20px;background:var(--ink);border-radius:14px;padding:16px 32px}',
'.st-ia-tamanhos .band .ic{width:52px;height:52px;flex:none;border-radius:50%;background:#fff;color:var(--red);display:flex;align-items:center;justify-content:center}',
'.st-ia-tamanhos .band p{font-size:30px;font-weight:700;line-height:1.3;color:#fff}',
'.st-ia-tamanhos .band.rv{transform:translateY(40px)}',
'.st-ia-tamanhos .band.rv.in{transform:none}',

/* ============ ia-onde ============ */
'.st-ia-onde .row3{position:relative;z-index:1;display:flex;gap:24px;margin-top:26px}',
'.st-ia-onde .cd{flex:1;display:flex;flex-direction:column;padding:20px 26px 22px;opacity:0;transform:translateY(40px);transition:opacity .6s ease,transform .7s cubic-bezier(.2,.8,.2,1)}',
'.st-ia-onde .cd.in{opacity:1;transform:none}',
'.st-ia-onde .win{position:relative;height:178px;border-radius:12px;overflow:hidden;padding:12px 14px}',
'.st-ia-onde .win.chat{background:#f1efef;display:flex;flex-direction:column;gap:10px;justify-content:center}',
'.st-ia-onde .bub{font-size:22px;font-weight:600;line-height:1.25;padding:9px 16px;border-radius:16px;max-width:84%;opacity:0;transform:translateY(12px) scale(.9);transition:opacity .35s,transform .45s cubic-bezier(.34,1.56,.64,1)}',
'.st-ia-onde .bub.in{opacity:1;transform:none}',
'.st-ia-onde .bub.u{align-self:flex-end;background:var(--ink);color:#fff;border-bottom-right-radius:4px;transform-origin:100% 100%}',
'.st-ia-onde .bub.a{align-self:flex-start;background:#fff;color:var(--ink);border:2px solid var(--line);border-bottom-left-radius:4px;transform-origin:0 100%;min-width:76px;min-height:42px}',
'.st-ia-onde .dots{display:inline-flex;gap:6px;align-items:center;height:22px}',
'.st-ia-onde .dots u{width:9px;height:9px;border-radius:50%;background:var(--red);display:block;opacity:.4}',
'.st-ia-onde.go .dots u{animation:on-dot 1s ease-in-out infinite}.st-ia-onde .dots u:nth-child(2){animation-delay:.15s!important}.st-ia-onde .dots u:nth-child(3){animation-delay:.3s!important}',
'@keyframes on-dot{0%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-6px);opacity:1}}',
'.st-ia-onde .win.work{background:#fff;border:2px solid var(--line);display:flex;flex-direction:column;justify-content:space-between}',
'.st-ia-onde .stp{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:600;color:var(--muted);height:34px;transition:color .3s}',
'.st-ia-onde .stp .ind{width:26px;height:26px;border-radius:50%;border:3px solid var(--line);flex:none;display:flex;align-items:center;justify-content:center;color:#fff;transition:background .3s,border-color .3s}',
'.st-ia-onde .stp .ind svg{opacity:0;transform:scale(.4);transition:opacity .2s,transform .4s cubic-bezier(.34,1.56,.64,1)}',
'.st-ia-onde .stp.run{color:var(--ink)}',
'.st-ia-onde .stp.run .ind{border-color:var(--line);border-top-color:var(--red)}',
'.st-ia-onde.go .stp.run .ind{animation:on-spin .8s linear infinite}',
'@keyframes on-spin{to{transform:rotate(360deg)}}',
'.st-ia-onde .stp.ok{color:var(--ink)}',
'.st-ia-onde .stp.ok .ind{background:var(--red);border-color:var(--red)}',
'.st-ia-onde .stp.ok .ind svg{opacity:1;transform:none}',
'.st-ia-onde .pg{height:8px;border-radius:4px;background:var(--gray);overflow:hidden}',
'.st-ia-onde .pg i{display:block;height:100%;width:0;background:var(--red);border-radius:4px;transition:width .8s cubic-bezier(.3,.7,.3,1)}',
'.st-ia-onde .win.code{background:var(--stage);padding:0}',
'.st-ia-onde .tb{height:28px;background:#25272e;display:flex;align-items:center;gap:7px;padding:0 12px}',
'.st-ia-onde .tb i{width:11px;height:11px;border-radius:50%;background:#555861;display:block}',
'.st-ia-onde .tb i:first-child{background:var(--red)}',
'.st-ia-onde .cdx{margin:0;padding:10px 14px;font:500 22px/1.42 var(--mono);color:#e8e8ea;white-space:pre}',
'.st-ia-onde .cdx .k{color:#eebfa6}.st-ia-onde .cdx .o{color:#7ee0a3;font-weight:700}.st-ia-onde .cdx .r{color:var(--stage-muted)}',
'.st-ia-onde .cdx .cr{display:inline-block;width:11px;height:22px;background:#fff;vertical-align:-4px;margin-left:2px}',
'.st-ia-onde.go .cdx .cr{animation:on-cr 1s steps(2,jump-none) infinite}',
'@keyframes on-cr{0%{opacity:1}50%{opacity:0}100%{opacity:1}}',
'.st-ia-onde .th{display:flex;align-items:center;gap:14px;margin-top:16px}',
'.st-ia-onde .th .ic{width:46px;height:46px;flex:none;border-radius:50%;background:#fff;border:2px solid var(--red);display:flex;align-items:center;justify-content:center;color:var(--red)}',
'.st-ia-onde h3{font-size:38px;font-weight:800;color:var(--ink)}',
'.st-ia-onde .ds{font-size:24px;line-height:1.36;color:var(--text);margin-top:8px}',
'.st-ia-onde .ap{font-size:24px;font-weight:700;line-height:1.3;color:var(--red);margin-top:auto;padding-top:10px}',
'.st-ia-onde .band{position:absolute;z-index:2;left:96px;width:1408px;top:742px;display:flex;align-items:center;gap:20px;background:var(--ink);border-radius:14px;padding:16px 32px}',
'.st-ia-onde .band .ic{width:52px;height:52px;flex:none;border-radius:50%;background:#fff;color:var(--red);display:flex;align-items:center;justify-content:center}',
'.st-ia-onde .band p{font-size:30px;font-weight:700;line-height:1.3;color:#fff}',
'.st-ia-onde .band.rv{transform:translateY(40px)}',
'.st-ia-onde .band.rv.in{transform:none}'
].join('\n'));

/* ---------- ORQUESTRA ---------- */
var ORQ_ITEMS = ['O que é a IA', 'Como pedir', 'Como planejar', 'Como entregar', 'Como tocar juntos'];
function orqSet(el, on) {
  $$(el, '.tag,.big,.rule,.sub,.staff').forEach(function (n) { n.classList.toggle('in', on); });
  $$(el, '.row').forEach(function (n) { n.classList.toggle('in', on); });
}
ORQ.add({
  id: 'orquestra', mov: 0, order: 10, title: 'A orquestra da IA', tone: 'dark', steps: 0,
  render: function (el) {
    var rows = ORQ_ITEMS.map(function (t, i) { return '<div class="row"><i class="note">' + (i + 1) + '</i><span class="lb">' + t + '</span></div>'; }).join('');
    el.innerHTML = '<img class="bg" src="img/ciclo-conversa.jpg" alt=""><div class="shade"></div>' + LOGO_D +
      '<div class="col"><p class="pill-red tag rv">TARDE · INTELIGÊNCIA ARTIFICIAL</p>' +
      '<h1 class="big rv">A orquestra<br>da <em>IA</em></h1><hr class="rule"><p class="sub rv">Como cada agente toca a música</p>' +
      '<div class="staff"><i class="br"></i>' + rows + '</div></div>' + FOOT;
    orqSet(el, true);
  },
  enter: function (el) {
    stop(el); el.classList.add('go');
    if (reduce()) { snap(el, function () { orqSet(el, true); }); return; }
    snap(el, function () { orqSet(el, false); });
    var q = function (sel) { return $(el, sel); };
    later(el, function () { q('.tag').classList.add('in'); }, 250);
    later(el, function () { q('.big').classList.add('in'); }, 550);
    later(el, function () { q('.rule').classList.add('in'); }, 1000);
    later(el, function () { q('.sub').classList.add('in'); }, 1200);
    later(el, function () { q('.staff').classList.add('in'); }, 1700);
    $$(el, '.row').forEach(function (r, i) { later(el, function () { r.classList.add('in'); }, 2200 + i * 650); });
  },
  leave: function (el) { stop(el); el.classList.remove('go'); snap(el, function () { orqSet(el, true); }); },
  notes: N.orquestra
});

/* ---------- IA-PENSA ---------- */
var PN_ROUNDS = [
  [['repôs a gôndola', 52], ['conferiu os preços', 21], ['tirou a foto', 14], ['foi embora', 2]],
  [['e conferiu os preços', 44], ['e tirou a foto', 27], ['com cuidado', 11], ['e foi embora', 4]],
  [['antes de sair', 38], ['e anotou o estoque', 26], ['sem pressa', 12], ['e sumiu', 3]]
];
var PN_K = 6.2; /* px por ponto percentual */
function pnLabels(el, r) {
  $$(el, '.br').forEach(function (b, i) {
    var d = PN_ROUNDS[r][i]; $(b, '.lab').textContent = d[0]; b.dataset.p = d[1]; b.classList.toggle('win', i === 0); b.classList.remove('fade');
  });
}
function pnBars(el, show) {
  $$(el, '.br').forEach(function (b) { var p = +b.dataset.p; $(b, '.fill').style.width = show ? (p * PN_K) + 'px' : '0px'; $(b, '.pc').textContent = show ? p + '%' : '0%'; });
}
function pnFinal(el) {
  snap(el, function () {
    $$(el, '.fly').forEach(function (n) { n.remove(); });
    $(el, '.app').innerHTML = ''; pnLabels(el, 0); pnBars(el, true);
    $$(el, '.it').forEach(function (n) { n.classList.add('in'); });
  });
}
function pnRound(el, r) {
  var card = $(el, '.card'), app = $(el, '.app');
  snap(el, function () { pnLabels(el, r); pnBars(el, false); $$(el, '.br').forEach(function (b) { b.classList.remove('win'); }); });
  var rows = $$(el, '.br');
  later(el, function () {
    rows.forEach(function (b, i) {
      later(el, function () {
        var p = +b.dataset.p; $(b, '.fill').style.width = (p * PN_K) + 'px';
        tween(el, 0, p, 850, function (v) { $(b, '.pc').textContent = Math.round(v) + '%'; });
      }, i * 160);
    });
  }, 250);
  later(el, function () { rows[0].classList.add('win'); }, 2000);
  later(el, function () {
    var lab = $(rows[0], '.lab'), p0 = pos(lab, card);
    app.appendChild(document.createTextNode(' ')); var w = h('span', 'wd hid', PN_ROUNDS[r][0][0]); app.appendChild(w);
    var rc = w.getClientRects()[0], cr = card.getBoundingClientRect(), k = cr.width / card.offsetWidth, p1 = { x: (rc.left - cr.left) / k, y: (rc.top - cr.top) / k };
    var fly = h('p', 'fly', PN_ROUNDS[r][0][0], card);
    fly.style.left = p0.x + 'px'; fly.style.top = (p0.y - 4) + 'px';
    void fly.offsetWidth;
    fly.style.transform = 'translate(' + (p1.x - p0.x) + 'px,' + (p1.y - p0.y + 2) + 'px)';
    later(el, function () { w.classList.remove('hid'); fly.style.opacity = '0'; }, 880);
    later(el, function () { if (fly.parentNode) fly.parentNode.removeChild(fly); }, 1100);
    if (r === 1) later(el, function () { $$(el, '.it')[1].classList.add('in'); }, 900);
    if (r === 2) later(el, function () { $$(el, '.it')[2].classList.add('in'); }, 900);
    if (r < 2) later(el, function () { rows.forEach(function (b) { b.classList.add('fade'); }); }, 1050);
    if (r < 2) later(el, function () { pnRound(el, r + 1); }, 1500);
  }, 2800);
}
ORQ.add({
  id: 'ia-pensa', mov: 1, order: 20, title: 'A IA é uma máquina de prever a próxima palavra.', tone: 'light', steps: 0,
  render: function (el) {
    var bars = [0, 1, 2, 3].map(function () { return '<div class="br"><p class="lab"></p><div class="trk"><div class="fill"></div><p class="pc"></p></div></div>'; }).join('');
    var items = [['book', 'Aprendeu lendo uma quantidade enorme de texto.'], ['chat', 'Não busca a resposta pronta: monta, palavra por palavra.'], ['warn', 'Por isso escreve tão bem, e às vezes inventa com a mesma confiança.']]
      .map(function (a) { return '<div class="it rv"><div class="ic">' + svg(a[0], 32) + '</div><p>' + a[1] + '</p></div>'; }).join('');
    el.innerHTML = '<div class="deco"></div>' + LOGO +
      '<p class="eyebrow">MOVIMENTO 1 · O QUE É A IA</p>' +
      '<h2 class="ttl">A IA é uma máquina de<br><em>prever a próxima palavra.</em></h2>' +
      '<div class="wrap"><div class="card"><p class="sent">“<span class="base">O promotor chegou na loja e</span><span class="app"></span><span class="ell">…</span>”</p>' +
      '<div class="bars">' + bars + '</div>' +
      '<p class="note">Exemplo ilustrativo. Ela escolhe uma palavra provável, depois a próxima, e assim por diante.</p></div>' +
      '<div class="side">' + items + '</div></div>' + FOOT;
    pnFinal(el);
  },
  enter: function (el) {
    stop(el); el.classList.add('go');
    if (reduce()) { pnFinal(el); return; }
    snap(el, function () { $$(el, '.fly').forEach(function (n) { n.remove(); }); $(el, '.app').innerHTML = ''; pnLabels(el, 0); pnBars(el, false); $$(el, '.it').forEach(function (n) { n.classList.remove('in'); }); });
    later(el, function () { $$(el, '.it')[0].classList.add('in'); }, 400);
    pnRound(el, 0);
  },
  leave: function (el) { stop(el); el.classList.remove('go'); pnFinal(el); },
  notes: N['ia-pensa']
});

/* ---------- IA-HISTORIA ---------- */
var HS = [[1950, 'Alan Turing pergunta: máquinas podem pensar?'], [1956, 'Nasce o nome inteligência artificial'], [1997, 'Um computador vence o campeão mundial de xadrez'], [2017, 'O Google cria o Transformer, a base dos modelos de hoje']];
function hsFinal(el) {
  snap(el, function () {
    $$(el, '.nd').forEach(function (n) { n.classList.add('in'); n.classList.remove('boom'); $(n, '.yr').textContent = n.dataset.y; });
    $(el, '.fill').style.width = '100%'; $(el, '.cnt b').textContent = '100'; $(el, '.band').classList.add('in');
  });
}
ORQ.add({
  id: 'ia-historia', mov: 1, order: 21, title: 'A ideia é dos anos 1950. O boom veio em 2022.', tone: 'light', steps: 0,
  render: function (el) {
    var nds = HS.map(function (a) { return '<div class="nd" data-y="' + a[0] + '"><i class="dot"></i><div class="yr">' + a[0] + '</div><p class="tx">' + a[1] + '</p></div>'; }).join('');
    var rings = '<i class="ring r1"></i><i class="ring r2"></i><i class="ring r3"></i>';
    var pts = ''; for (var i = 0; i < 16; i++) { var a = i / 16 * 6.2832, d = 130 + (i % 3) * 55; pts += '<i class="pt" style="--dx:' + Math.round(Math.cos(a) * d) + 'px;--dy:' + Math.round(Math.sin(a) * d * 0.8) + 'px;--rot:' + (i * 47) + 'deg;' + (i % 2 ? 'background:#333;' : '') + '"></i>'; }
    var last = '<div class="nd last" data-y="2022"><i class="dot"></i>' + rings + pts + '<div class="yr">2022</div><p class="tx">Chega o ChatGPT:</p><div class="cnt"><b>100</b><span>milhões</span></div><p class="tx" style="margin-top:6px">de usuários em cerca de 2 meses</p></div>';
    el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">MOVIMENTO 1 · UM POUCO DE HISTÓRIA</p>' +
      '<h2 class="ttl">A ideia é dos anos 1950.<br><em>O boom veio em 2022.</em></h2>' +
      '<div class="tl"><div class="line"></div><div class="fill"></div>' + nds + last + '</div>' +
      '<div class="band rv"><div class="ic">' + svg('bolt', 32) + '</div><p>De 2022 para cá: Claude, Gemini, Copilot, Grok, e uma corrida que muda todo mês.</p></div>' +
      '<p class="foot">Fontes: Turing (1950), Dartmouth (1956), IBM (1997), Vaswani et al. (2017), estimativa UBS (2023).</p>';
    hsFinal(el);
  },
  enter: function (el) {
    stop(el); el.classList.add('go');
    if (reduce()) { hsFinal(el); return; }
    snap(el, function () {
      $$(el, '.nd').forEach(function (n) { n.classList.remove('in', 'boom'); });
      $(el, '.fill').style.width = '0px'; $(el, '.cnt b').textContent = '0'; $(el, '.band').classList.remove('in');
    });
    var nds = $$(el, '.nd'), fill = $(el, '.fill'), ts = [300, 1400, 2500, 3600, 4700];
    nds.forEach(function (nd, i) {
      later(el, function () { fill.style.width = (nd.offsetLeft + 11) + 'px'; }, ts[i]);
      later(el, function () {
        nd.classList.add('in'); var yr = +nd.dataset.y, yn = $(nd, '.yr');
        tween(el, yr - (i === 4 ? 32 : 60), yr, 850, function (v) { yn.textContent = Math.round(v); });
      }, ts[i] + 600);
    });
    later(el, function () {
      var last = $(el, '.last'); last.classList.add('boom'); fill.style.width = '100%';
      tween(el, 0, 100, 2000, function (v) { $(last, '.cnt b').textContent = Math.round(v); });
    }, 5500);
    later(el, function () { $(el, '.band').classList.add('in'); }, 7800);
  },
  leave: function (el) { stop(el); el.classList.remove('go'); hsFinal(el); },
  notes: N['ia-historia']
});

/* ---------- IA-QUEM ---------- */
var QM = [['OpenAI', 'ChatGPT', ['Astra', 'Sol', 'Terra', 'Luna']], ['Anthropic', 'Claude', ['Opus', 'Sonnet', 'Haiku']], ['Google', 'Gemini', ['Família Gemini (Pro e Flash)']], ['Microsoft', 'Copilot', ['Modelos de parceiros, como OpenAI e Anthropic']], ['SpacexAI', 'Grok', ['Família Grok']]];
function qmSet(el, on) {
  $$(el, '.rw').forEach(function (r) { r.classList.toggle('in', on); r.classList.toggle('open', on); });
  $$(el, '.m').forEach(function (m) { m.classList.toggle('in', on); });
}
ORQ.add({
  id: 'ia-quem', mov: 1, order: 22, title: 'O app é a sala de concerto. O modelo é o músico.', tone: 'light', steps: 0,
  render: function (el) {
    var rows = QM.map(function (q) {
      var ms = q[2].map(function (m) { return '<span class="m' + (m.length > 30 ? ' long' : '') + '">' + m + '</span>'; }).join('');
      return '<div class="rw"><div class="co">' + q[0] + '</div><div class="ap"><span class="room"><i class="cur l"></i><i class="cur r"></i>' + q[1] + '</span></div><div class="mu">' + ms + '</div></div>';
    }).join('');
    el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">MOVIMENTO 1 · QUEM É QUEM</p>' +
      '<h2 class="ttl">O app é a sala de concerto.<br><em>O modelo é o músico.</em></h2>' +
      '<div class="tbl"><div class="hd"><div>Empresa</div><div>O app que você abre</div><div>O modelo por trás (o músico)</div></div>' + rows + '</div>' + FOOT;
    qmSet(el, true);
  },
  enter: function (el) {
    stop(el); el.classList.add('go');
    if (reduce()) { snap(el, function () { qmSet(el, true); }); return; }
    snap(el, function () { qmSet(el, false); });
    $$(el, '.rw').forEach(function (rw, i) {
      var t = 350 + i * 1050;
      later(el, function () { rw.classList.add('in'); }, t);
      later(el, function () { rw.classList.add('open'); }, t + 400);
      $$(rw, '.m').forEach(function (m, j) { later(el, function () { m.classList.add('in'); }, t + 900 + j * 140); });
    });
  },
  leave: function (el) { stop(el); el.classList.remove('go'); snap(el, function () { qmSet(el, true); }); },
  notes: N['ia-quem']
});

/* ---------- IA-TAMANHOS ---------- */
var ORBS = [
  { n: 'Opus', role: 'REGENTE', ds: 'O mais forte. Pensa mais, planeja e decide. Mais lento e mais caro.', d: 150, sats: 3, P: 5200, R: 116, Y: 34, bt: 1.6, wt: 3.2, g: 'radial-gradient(circle at 33% 28%,#fff8f2 0%,#e08a69 24%,#c15f3c 64%,#a94e2f 100%)', ring: '#a94e2f', glow: 'rgba(217,119,87,.55)', wv: '#e08a69' },
  { n: 'Sonnet', role: 'MAESTRO DE NAIPE', ds: 'O equilíbrio. Dá conta do dia a dia com qualidade e rapidez.', d: 112, sats: 2, P: 3600, R: 88, Y: 27, bt: 1.3, wt: 2.6, g: 'radial-gradient(circle at 33% 28%,#fff8f2 0%,#eba486 24%,#d97757 64%,#c15f3c 100%)', ring: '#c15f3c', glow: 'rgba(217,119,87,.45)', wv: '#eba486' },
  { n: 'Haiku', role: 'INSTRUMENTO', ds: 'O mais rápido e barato. Tarefas pequenas e repetidas.', d: 80, sats: 1, P: 1500, R: 64, Y: 20, bt: .8, wt: 1.6, g: 'radial-gradient(circle at 33% 28%,#fff8f2 0%,#f6dccd 24%,#eebfa6 64%,#d97757 100%)', ring: '#d97757', glow: 'rgba(217,119,87,.35)', wv: '#f6dccd' }
];
function tmLayout(el, ts, still) {
  $$(el, '.s').forEach(function (s) {
    var n = +s.dataset.n, P = +s.dataset.p, R = +s.dataset.r, Y = +s.dataset.y, ds = s.querySelectorAll('.d');
    for (var i = 0; i < n; i++) {
      var a = (still ? 0.6 : ts / P) * 6.2832 + i * 6.2832 / n, z = Math.sin(a), d = ds[i];
      d.style.transform = 'translate(' + (R * Math.cos(a)).toFixed(1) + 'px,' + (Y * z).toFixed(1) + 'px) scale(' + (0.75 + 0.35 * (z + 1) / 2).toFixed(2) + ')';
      d.style.zIndex = z > 0 ? 3 : 0; d.style.opacity = (0.55 + 0.45 * (z + 1) / 2).toFixed(2);
    }
  });
}
ORQ.add({
  id: 'ia-tamanhos', mov: 1, order: 23, title: 'Três tamanhos, três papéis.', tone: 'light', steps: 0,
  render: function (el) {
    var cards = ORBS.map(function (o, i) {
      var r = o.d / 2;
      return '<div class="card cd s' + (i + 1) + '"><div class="ob"><div class="s" data-n="' + o.sats + '" data-p="' + o.P + '" data-r="' + o.R + '" data-y="' + o.Y + '" style="--bt:' + o.bt + 's;--wt:' + o.wt + 's">' +
        '<div class="w" style="left:-' + r + 'px;top:-' + r + 'px;width:' + o.d + 'px;height:' + o.d + 'px;border-color:' + o.wv + '"></div>' +
        '<div class="w k" style="left:-' + r + 'px;top:-' + r + 'px;width:' + o.d + 'px;height:' + o.d + 'px;border-color:' + o.wv + '"></div>' +
        '<div class="o" style="left:-' + r + 'px;top:-' + r + 'px;width:' + o.d + 'px;height:' + o.d + 'px;background:' + o.g + ';box-shadow:0 0 0 2px ' + o.ring + ',0 0 29px ' + o.glow + '"></div>' +
        new Array(o.sats + 1).join('<i class="d"></i>') + '</div></div>' +
        '<h3>' + o.n + '</h3><p class="role">' + o.role + '</p><p class="ds">' + o.ds + '</p></div>';
    }).join('');
    el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">MOVIMENTO 1 · OS MODELOS</p>' +
      '<h2 class="ttl">Três tamanhos, <em>três papéis.</em></h2><div class="row3">' + cards + '</div>' +
      '<div class="band rv"><div class="ic">' + svg('users', 32) + '</div><p>Toda empresa tem essa escada: maior para pensar, menor para executar.</p></div>' + FOOT;
    $$(el, '.cd').forEach(function (c) { c.classList.add('in'); }); $(el, '.band').classList.add('in');
    tmLayout(el, 0, true);
  },
  enter: function (el) {
    stop(el); el.classList.add('go');
    if (reduce()) { snap(el, function () { $$(el, '.cd').forEach(function (c) { c.classList.add('in'); }); $(el, '.band').classList.add('in'); }); tmLayout(el, 0, true); return; }
    snap(el, function () { $$(el, '.cd').forEach(function (c) { c.classList.remove('in'); }); $(el, '.band').classList.remove('in'); });
    $$(el, '.cd').forEach(function (c, i) { later(el, function () { c.classList.add('in'); }, 300 + i * 800); });
    later(el, function () { $(el, '.band').classList.add('in'); }, 3200);
    frame(el, function (ts) { tmLayout(el, ts, false); });
  },
  leave: function (el) { stop(el); el.classList.remove('go'); snap(el, function () { $$(el, '.cd').forEach(function (c) { c.classList.add('in'); }); $(el, '.band').classList.add('in'); }); tmLayout(el, 0, true); },
  notes: N['ia-tamanhos']
});

/* ---------- IA-ONDE ---------- */
var ON_STEPS = ['Abrir a planilha', 'Conferir os números', 'Montar o relatório'];
var ON_Q = 'O que é sell-out?', ON_A = 'O que o consumidor levou da loja.';
function onStatic(el) {
  snap(el, function () {
    $$(el, '.cd').forEach(function (c) { c.classList.add('in'); }); $(el, '.band').classList.add('in');
    $$(el, '.bub').forEach(function (b) { b.classList.add('in'); }); $(el, '.bub.a .dots').style.display = 'none'; $(el, '.bub.a .tx').textContent = ON_A;
    $$(el, '.stp').forEach(function (s) { s.classList.remove('run'); s.classList.add('ok'); }); $(el, '.pg i').style.width = '100%';
    $(el, '.l1').textContent = 'vendas = [120, 80, 95]'; $(el, '.l2').textContent = 'print(sum(vendas))'; $(el, '.l3').innerHTML = '<span class="o">295</span>';
    $(el, '.cr').style.display = 'none';
  });
}
function onChat(el) {
  var u = $(el, '.bub.u'), a = $(el, '.bub.a'), dots = $(a, '.dots'), tx = $(a, '.tx');
  snap(el, function () { u.classList.remove('in'); a.classList.remove('in'); dots.style.display = ''; tx.textContent = ''; });
  later(el, function () { u.classList.add('in'); }, 400);
  later(el, function () { a.classList.add('in'); }, 1300);
  later(el, function () { dots.style.display = 'none'; typeText(el, tx, ON_A, 38); }, 2400);
  later(el, function () { onChat(el); }, 7600);
}
function onWork(el) {
  var rows = $$(el, '.stp'), bar = $(el, '.pg i');
  snap(el, function () { rows.forEach(function (r) { r.classList.remove('run', 'ok'); }); bar.style.width = '0%'; });
  var t = [400, 1500, 2600], dn = [1450, 2550, 3700];
  rows.forEach(function (r, i) {
    later(el, function () { r.classList.add('run'); }, t[i]);
    later(el, function () { r.classList.remove('run'); r.classList.add('ok'); bar.style.width = Math.round((i + 1) / 3 * 100) + '%'; }, dn[i]);
  });
  later(el, function () { onWork(el); }, 7600);
}
function onCode(el) {
  var l1 = $(el, '.l1'), l2 = $(el, '.l2'), l3 = $(el, '.l3'), cr = $(el, '.cr');
  snap(el, function () { l1.textContent = ''; l2.textContent = ''; l3.textContent = ''; cr.style.display = ''; });
  later(el, function () { typeText(el, l1, 'vendas = [120, 80, 95]', 46); }, 500);
  later(el, function () { typeText(el, l2, 'print(sum(vendas))', 46); }, 1750);
  later(el, function () { l3.innerHTML = '<span class="r">rodando…</span>'; cr.style.display = 'none'; }, 2900);
  later(el, function () { l3.innerHTML = '<span class="o">295</span>'; }, 3800);
  later(el, function () { onCode(el); }, 7600);
}
ORQ.add({
  id: 'ia-onde', mov: 1, order: 24, title: 'Conversar, trabalhar ou programar.', tone: 'light', steps: 0,
  render: function (el) {
    var steps = ON_STEPS.map(function (s) { return '<div class="stp"><i class="ind">' + svg('check', 16, 4) + '</i><span>' + s + '</span></div>'; }).join('');
    var card = function (win, ic, t, d, a) { return '<div class="card cd">' + win + '<div class="th"><div class="ic">' + svg(ic, 24) + '</div><h3>' + t + '</h3></div><p class="ds">' + d + '</p><p class="ap">' + a + '</p></div>'; };
    var chat = '<div class="win chat"><div class="bub u">' + ON_Q + '</div><div class="bub a"><span class="dots"><u></u><u></u><u></u></span><span class="tx"></span></div></div>';
    var work = '<div class="win work"><div>' + steps + '</div><div class="pg"><i></i></div></div>';
    var code = '<div class="win code"><div class="tb"><i></i><i></i><i></i></div><pre class="cdx"><span class="k l1"></span>\n<span class="k l2"></span>\n<span class="l3"></span><i class="cr"></i></pre></div>';
    el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">MOVIMENTO 1 · ONDE ELA TRABALHA</p>' +
      '<h2 class="ttl">Conversar, trabalhar <em>ou programar.</em></h2><div class="row3">' +
      card(chat, 'chat', 'Chat', 'Você pergunta, ela responde. Uma conversa de cada vez.', 'ChatGPT, Claude, Gemini, Copilot') +
      card(work, 'tool', 'Work', 'Você entrega a tarefa. Ela usa seus arquivos e apps, faz em etapas e devolve pronto.', 'App do Claude, modo agente do ChatGPT') +
      card(code, 'code', 'Code/Codex', 'Ela escreve e roda programas de verdade, como um desenvolvedor.', 'Codex, Claude Code') + '</div>' +
      '<div class="band rv"><div class="ic">' + svg('play', 30) + '</div><p>A maioria usa hoje o primeiro. A tarde mostra até onde ele vai.</p></div>' + FOOT;
    onStatic(el);
  },
  enter: function (el) {
    stop(el); el.classList.add('go');
    if (reduce()) { onStatic(el); return; }
    snap(el, function () { $$(el, '.cd').forEach(function (c) { c.classList.remove('in'); }); $(el, '.band').classList.remove('in'); });
    $$(el, '.cd').forEach(function (c, i) { later(el, function () { c.classList.add('in'); }, 300 + i * 600); });
    later(el, function () { onChat(el); }, 700);
    later(el, function () { onWork(el); }, 1300);
    later(el, function () { onCode(el); }, 1900);
    later(el, function () { $(el, '.band').classList.add('in'); }, 3000);
  },
  leave: function (el) { stop(el); el.classList.remove('go'); onStatic(el); },
  notes: N['ia-onde']
});
})();
