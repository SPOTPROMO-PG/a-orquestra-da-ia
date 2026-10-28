/* Movimento 3 · Como planejar — 8 estações (vazio … limites). Dono: maestro do naipe M3. */
(function () {
'use strict';
window.ORQ = window.ORQ || { stations: [], add: function (s) { this.stations.push(s); } };
var NOTES = {
 "vazio": "TEMPO: 3 min.\nFALA (Arthur): \"Terceiro movimento: como planejar. Olhem esse pedido: faz um controle das pendências. Parece claro, né? Olhem o que volta: uma tabela genérica, com item, responsável, prazo e status. Serve para qualquer empresa do mundo, e por isso não serve para nenhuma.\"\nAPOIO: perguntar para a sala o que faltou no pedido, usando as partes do livro: quem vai ler? quais pendências (documento, ponto, uniforme)? o que é atrasada? como quero ver? Mostrar que a IA não errou: ela fez exatamente o que foi pedido. Pedido vazio, resposta vazia.\nTRANSIÇÃO: \"Só que tem um problema: às vezes nem a gente sabe direito o que quer. E aí? Aí quem ajuda é a própria IA.\" (passa para quem ajuda a montar o plano)",
 "ia-ajuda": "TEMPO: 4 min.\nFALA (Arthur): \"Para fazer um bom plano você precisa saber o que quer. E quem te ajuda a descobrir? A própria IA. Funciona assim: você joga as ideias, bagunçadas mesmo; pede para ela te entrevistar antes de começar; e no fim pede o prompt pronto.\"\nAPOIO: ler a conversa do lado direito. A pessoa fala do jeito que fala no corredor; a IA devolve perguntas, não resposta. Essas perguntas são exatamente as partes do livro que estavam faltando. A frase mágica é: \"me entreviste antes de começar, uma pergunta por vez\".\nDICA: abram o microfone do celular e falem. A gente pensa melhor falando do que escrevendo, e a IA entende áudio transcrito muito bem. Mostrar o ícone do microfone no app, se der.\nTRANSIÇÃO: \"Mas aí vem a reclamação clássica: conversei duas horas com ela e ela começou a esquecer tudo.\" (passa para memória)",
 "esquece": "TEMPO: 3 min.\nFALA (Arthur): \"Quem aqui já passou por isso: conversou um tempão com a IA e ela começou a esquecer o que vocês tinham combinado? Não é defeito, é como ela funciona. A IA tem uma mesa de trabalho de tamanho fixo. A cada resposta, ela relê a conversa inteira em cima dessa mesa. Quando a mesa enche, as primeiras mensagens saem da vista, ou viram um resumo.\"\nAPOIO: a animação mostra a conversa andando: cada mensagem nova entra pela direita, em vermelho, e empurra as outras; as mais antigas saem da mesa e somem. Ela só enxerga o que está dentro da linha tracejada. Por isso conversa muito longa fica mais lenta, gasta mais do limite e começa a esquecer. Não é o tempo, é o tamanho: quanto mais texto (inclusive arquivos colados), mais a mesa enche. O nome técnico é janela de contexto, mas mesa de trabalho explica melhor. Se perguntarem: a \"memória\" que alguns apps têm entre conversas é outro recurso; aqui falamos só da conversa atual.\nTRANSIÇÃO: \"Então como resolve? Escrevendo. O que está escrito não se perde.\" (passa para o contexto)",
 "contexto": "TEMPO: 3 min. FALA (Arthur): \"Esse aqui é o segredo de quem usa IA bem: documentar. Documentar os seus passos, as suas ideias e as suas regras é o que define a qualidade e a confiança do resultado. E o jeito mais simples de documentar é um arquivo de contexto.\" APOIO: mostrar o arquivo da esquerda. É texto puro. O .md (lê-se markdown) é só um jeito de escrever texto com marcações simples: o jogo da velha vira título, o tracinho vira lista. Qualquer IA lê muito bem. Ele tem as mesmas partes do livro: objetivo, quem lê, regras e as decisões já tomadas. Quando a conversa ficar longa, peçam: \"resuma tudo o que combinamos num contexto.md\". Abram uma conversa nova, colem o arquivo, e ela continua de onde parou, sem a mesa cheia. TRANSIÇÃO: \"O contexto é o primeiro caderno. Existem mais três.\" (passa para os cadernos)",
 "cadernos": "TEMPO: 4 min.\nFALA (Arthur): \"Quem usa IA no trabalho de verdade trabalha com quatro cadernos. O primeiro vocês já viram: o contexto, o resumo do projeto. O segundo são as instruções, o manual da casa: regras que a IA lê antes de qualquer tarefa. Nas ferramentas de programação ele tem nome de arquivo: CLAUDE.md no Claude Code e AGENTS.md no Codex e em ferramentas parecidas; no app do ChatGPT e do Claude ele aparece como instruções do projeto. O terceiro são os guardrails, as cercas: o que ela nunca pode fazer, como usar dado real ou mandar um e-mail sem a sua aprovação. O quarto são as skills, as receitas salvas: você ensina uma tarefa repetida uma vez e ela refaz igual sempre.\"\nAPOIO: exemplo de skill do BKO: \"resumo de sexta\", que pega a base de pendências e devolve sempre o mesmo resumo no mesmo formato. A ideia central: você documenta uma vez; a IA lê toda vez. É isso que faz o resultado ser confiável e parecido de uma semana para outra.\nTRANSIÇÃO: \"E o guardrail número um, que vale para hoje e para sempre, é este.\" (passa para a regra de dados)",
 "dados": "TEMPO: 2 min.\nFALA (Arthur): \"Repararam que em todos os exemplos de hoje eu só usei dados inventados? Não foi por acaso. Esse é o guardrail número um, e ele vale para vocês também: as contas que vocês usam hoje são pessoais, não são ferramentas da empresa. Então existe uma regra que vale para hoje e para sempre: dado real não entra na IA.\"\nAPOIO: ler os cinco cards. Nome de promotor ou de colega, CPF e documentos, salário e valores pagos, senha e login, planilha exportada do sistema. A IA não precisa do dado real para ajudar: ela precisa entender a situação. Troque por \"Promotor A\", \"Loja X\", \"R$ 100\". Na dúvida, não cole.\nPERGUNTA PARA A SALA: \"Alguém já colou alguma coisa que estava nessa lista?\" (sem julgamento; o objetivo é criar o hábito daqui para frente)\nTRANSIÇÃO: \"Com os cadernos e as cercas no lugar, dá para colocar mais de uma IA para trabalhar junto. É aí que entram os agentes.\" (passa para agentes)",
 "agentes": "TEMPO: 5 min. Abrir a demo da fazenda.\nFALA (Arthur): \"Agora juntem o regente, os maestros e os instrumentos. Isso é um time de agentes. Você faz um pedido grande. O Opus, o regente, lê, planeja e divide em partes. Para cada parte ele cria um maestro de naipe, um Sonnet, que faz o plano daquela parte. E cada maestro coloca instrumentos para tocar: agentes Haiku, rápidos, cada um com uma tarefa pequena. No fim, o regente confere tudo e devolve o que estiver errado.\"\nDEMO: abrir a fazenda dos agentes (link no slide). A tela começa como um chat com o pedido já escrito: \"monte uma fazendinha\". Apertar Enter e narrar: o regente lendo, os três maestros nascendo (construção, plantação, animais), os sete agentes construindo, e a inspeção que acha um vão na cerca e manda corrigir. P pausa, R reinicia.\nATENÇÃO: é um desenho de como isso pode ser organizado; na prática, a ferramenta decide quantos agentes usar e com quais modelos.\nMENSAGEM: o segredo não é ter mais agentes, é ter um plano claro e alguém que confere. Exatamente o que a gente vem falando.\nTRANSIÇÃO: \"Tudo isso tem um custo: os limites. Vamos ver como gastar bem.\" (passa para limites)",
 "limites": "TEMPO: 3 min.\nFALA (Arthur): \"Todo plano de IA tem limite de uso, até o pago. E lembrem: ela relê a conversa inteira a cada resposta. Então quatro hábitos fazem o limite render. Um assunto por conversa. Se ela se perdeu, peça um resumo em contexto.md e recomece numa conversa nova. Se você pede a mesma coisa toda semana, transforme em skill. E se a tarefa é grande, divida em agentes.\"\nAPOIO: o curioso é que a própria IA faz isso por conta própria nas ferramentas mais novas: cria arquivos de anotação, resume o que já fez e divide o trabalho em agentes para não estourar a mesa. Ou seja, ela usa os mesmos cadernos que a gente acabou de ver.\nTRANSIÇÃO: \"Quarto movimento: como entregar. Vamos juntar tudo.\" (passa para juntar tudo)"
};
var STILL = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
var IDS = ['vazio', 'ia-ajuda', 'esquece', 'contexto', 'cadernos', 'dados', 'agentes', 'limites'];

/* ---------- utilidades ---------- */
function $(el, s) { return el.querySelector(s); }
function $$(el, s) { return Array.prototype.slice.call(el.querySelectorAll(s)); }
function TM(el) { return el.__m3 || (el.__m3 = { t: [], a: [] }); }
function later(el, fn, ms) {
  var m = TM(el), r = {};
  r.id = setTimeout(function () { var i = m.t.indexOf(r); if (i >= 0) m.t.splice(i, 1); fn(); }, ms);
  m.t.push(r); return r;
}
function anim(el, node, kf, opt) {
  var m = TM(el), a = node.animate(kf, opt);
  m.a.push(a);
  a.addEventListener('finish', function () { var i = m.a.indexOf(a); if (i >= 0) m.a.splice(i, 1); });
  return a;
}
function stop(el) {
  var m = TM(el);
  m.t.forEach(function (r) { clearTimeout(r.id); }); m.t = [];
  m.a.forEach(function (a) { try { a.cancel(); } catch (e) {} }); m.a = [];
}
function pos(n, root) { var x = 0, y = 0; while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return { x: x, y: y }; }
function typeText(el, node, text, ms, done) {
  var i = 0;
  (function tick() {
    node.textContent = text.slice(0, i);
    if (i >= text.length) { if (done) done(); return; }
    i++; later(el, tick, ms);
  })();
}
function tween(el, from, to, ms, set, done) {
  var n = Math.max(1, Math.round(ms / 70)), i = 0;
  (function tick() {
    i++; set(Math.round(from + (to - from) * (i / n)));
    if (i >= n) { if (done) done(); return; }
    later(el, tick, ms / n);
  })();
}

var P = {
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M20 17v4H6.5A2.5 2.5 0 0 1 4 18.5"/>',
  warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.5 0 4.5 1.8 4.5 5"/>',
  id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5M15 10h4M15 14h3"/>',
  db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  sheet: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M10 3v18"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  tick: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  cog: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  send: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  play: '<path d="M7 4l13 8-13 8z"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>'
};
function ic(n, s, c, sw) {
  return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="' + (c || 'currentColor') + '" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[n] + '</svg>';
}
function shell(el, eyebrow, ttl, deco) {
  el.innerHTML = '<img class="logo" src="img/spot-logo.png" alt="SPOT">' + (deco ? '<div class="deco"></div>' : '') +
    '<div class="hd"><p class="eyebrow">' + eyebrow + '</p><h2 class="ttl">' + ttl + '</h2></div><div class="bd"></div>' +
    '<p class="foot">BKO 360° · Programa P&amp;G • SPOT</p>';
  return $(el, '.bd');
}
function addCls(el, list) { list.forEach(function (c) { el.classList.add(c); }); }
function rmCls(el, list) { list.forEach(function (c) { el.classList.remove(c); }); }
function fx(icon, text, extra) {
  return '<div class="fx ' + (extra || '') + '"><span class="ico">' + ic(icon, 30, '#fff') + '</span><p>' + text + '</p></div>';
}

/* ---------- CSS ---------- */
function G(sel) { return IDS.map(function (i) { return '.st.st-' + i + (sel ? ' ' + sel : ''); }).join(','); }
var CSS = [
G('') + '{display:flex;flex-direction:column;gap:20px;padding-top:98px}',
G('.hd') + '{flex:none}',
G('.bd') + '{flex:1;min-height:0;position:relative;z-index:1}',
G('.deco') + '{width:220px;height:250px;z-index:0}',
G('.fx') + '{display:flex;align-items:center;gap:20px;background:#fff;border:2px solid var(--line);border-left:8px solid var(--red);border-radius:14px;padding:14px 28px;box-shadow:var(--shadow)}',
G('.fx .ico') + '{width:52px;height:52px;border-radius:50%;background:var(--red);color:#fff;display:flex;align-items:center;justify-content:center;flex:none}',
G('.fx p') + '{font-size:30px;font-weight:700;color:var(--ink);line-height:1.2}',
G('.lab') + '{font-size:22px;font-weight:800;letter-spacing:3px;color:var(--muted)}',
G('.ring') + '{box-shadow:0 0 0 0 rgba(227,0,27,0)}',
'@keyframes m3pop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.08);opacity:1}100%{transform:scale(1);opacity:1}}',
'@keyframes m3shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(3px)}}',
'@keyframes m3dot{0%,80%,100%{transform:translateY(0);opacity:.35}40%{transform:translateY(-8px);opacity:1}}',
'@keyframes m3blink{50%{opacity:0}}'
].join('\n');
var CSS_PARTS = [];
function css(s) { CSS_PARTS.push(s); }

/* =====================================================================
   40 · vazio
   ===================================================================== */
css([
'.st-vazio .bd{display:flex;flex-direction:column;gap:22px}',
'.st-vazio .v-row{flex:1;min-height:0;display:flex;align-items:stretch;gap:18px}',
'.st-vazio .v-ask{width:500px;flex:none;display:flex;flex-direction:column;gap:14px}',
'.st-vazio .v-thread{flex:1;display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-end}',
'.st-vazio .v-bub{max-width:100%;font-size:32px;font-weight:700;line-height:1.3;color:var(--ink);background:var(--gray);border-radius:26px 26px 4px 26px;padding:20px 26px;opacity:0;transform:translateY(14px) scale(.96);transform-origin:right bottom}',
'.st-vazio.s-send .v-bub{opacity:1;transform:none;transition:opacity .4s,transform .45s cubic-bezier(.2,1.3,.4,1)}',
'.st-vazio .v-input{display:flex;align-items:flex-end;gap:10px;border:2px solid var(--line);border-radius:22px;padding:14px 14px 14px 22px;min-height:104px;background:#fff}',
'.st-vazio .v-tw{flex:1;font-size:28px;font-weight:600;color:var(--ink);line-height:1.3;min-height:36px}',
'.st-vazio .v-cur{display:inline-block;width:3px;height:30px;background:var(--red);vertical-align:-6px;margin-left:2px;animation:m3blink .9s steps(1) infinite}',
'.st-vazio.s-send .v-cur,.st-vazio.s-idle .v-cur{display:none}',
'.st-vazio .v-send{flex:none;width:52px;height:52px;border-radius:50%;background:var(--red);display:flex;align-items:center;justify-content:center;opacity:.35;transition:opacity .2s,transform .2s}',
'.st-vazio.s-ready .v-send{opacity:1;transform:scale(1.12)}',
'.st-vazio .v-arr{flex:none;width:44px;align-self:center}',
'.st-vazio .v-ans{flex:1;min-width:0;display:flex;flex-direction:column;gap:12px;position:relative}',
'.st-vazio.s-hit .v-ans{animation:m3shake .4s}',
'.st-vazio .v-wait{position:absolute;left:28px;top:80px;display:none;align-items:center;gap:10px}',
'.st-vazio.s-wait .v-wait{display:flex}',
'.st-vazio .v-wait b{width:48px;height:48px;border-radius:50%;background:var(--red);color:#fff;font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center;margin-right:6px}',
'.st-vazio .v-wait .d{width:14px;height:14px;border-radius:50%;background:var(--muted);animation:m3dot 1s infinite}',
'.st-vazio .v-wait .d:nth-of-type(2){animation-delay:.15s}.st-vazio .v-wait .d:nth-of-type(3){animation-delay:.3s}',
'.st-vazio .v-tb{width:100%;border-collapse:collapse;font-size:26px}',
'.st-vazio .v-tb{visibility:hidden}.st-vazio.s-tb .v-tb{visibility:visible}',
'.st-vazio .v-tb th{text-align:left;font-weight:800;color:var(--ink);padding:8px 10px;border-bottom:3px solid var(--ink)}',
'.st-vazio .v-tb td{padding:9px 10px;color:var(--muted);border-bottom:2px solid var(--gray);font-weight:500}',
'.st-vazio .v-tb tr{opacity:0;transform:translateY(10px);transition:opacity .4s,transform .4s}',
'.st-vazio.s-tb .v-tb tr{opacity:1;transform:none}',
'.st-vazio.s-tb .v-tb tr:nth-child(2){transition-delay:.3s}.st-vazio.s-tb .v-tb tr:nth-child(3){transition-delay:.6s}.st-vazio.s-tb .v-tb tr:nth-child(4){transition-delay:.9s}',
'.st-vazio .lac{color:#e3001b;font-weight:800;background:#fbe5e8;outline:2px dashed #e3001b;outline-offset:2px;border-radius:4px;padding:0 6px}',
'@keyframes m3lacp{50%{opacity:.78}}',
'.st-vazio.s-blink .lac{animation:m3lacp 1.4s ease-in-out infinite}',
'.st-vazio .v-stamp{align-self:center;margin-top:auto;transform:rotate(-4deg) scale(2.4);opacity:0;border:5px solid var(--red);border-radius:12px;color:var(--red);font-size:32px;font-weight:800;line-height:1.2;text-align:center;padding:10px 28px;background:rgba(227,0,27,.06)}',
'.st-vazio.s-stamp .v-stamp{opacity:1;transform:rotate(-4deg) scale(1);transition:opacity .15s,transform .35s cubic-bezier(.2,1.5,.4,1)}',
'.st-vazio .v-ban{flex:none;width:1190px;opacity:0;transform:translateY(26px)}',
'.st-vazio.s-ban .v-ban{opacity:1;transform:none;transition:opacity .6s,transform .6s cubic-bezier(.2,1,.3,1)}'
].join('\n'));

var VAZIO_TXT = 'Faz um controle das pendências.';
var VZ_CLS = ['s-ready', 's-send', 's-wait', 's-tb', 's-blink', 's-hit', 's-stamp', 's-ban', 's-idle'];
function vzFinal(el) {
  rmCls(el, VZ_CLS); addCls(el, ['s-send', 's-tb', 's-blink', 's-stamp', 's-ban', 's-idle']);
  $(el, '.v-bub').textContent = VAZIO_TXT; $(el, '.v-typed').textContent = '';
}
function vzReset(el) { rmCls(el, VZ_CLS); $(el, '.v-bub').textContent = ''; $(el, '.v-typed').textContent = ''; }

ORQ.add({
  id: 'vazio', mov: 3, order: 40, title: 'Pedido vazio, resposta vazia.', tone: 'light', steps: 0,
  render: function (el) {
    var bd = shell(el, 'MOVIMENTO 3 · COMO PLANEJAR', 'Pedido vazio, <em>resposta vazia.</em>', true);
    var arrow = '<svg viewBox="0 0 44 40" width="44" height="40"><path d="M2 14h22V4l18 16-18 16V26H2z" fill="#e3001b"/></svg>';
    var rows = [['Pendência 1'], ['Pendência 2'], ['Pendência 3']].map(function (r) {
      return '<tr><td>' + r[0] + '</td><td><span class="lac">[Nome]</span></td><td><span class="lac">[Data]</span></td><td>Em aberto</td></tr>';
    }).join('');
    bd.innerHTML =
      '<div class="v-row">' +
        '<div class="card v-ask"><p class="lab">O PEDIDO</p><div class="v-thread"><div class="v-bub"></div></div>' +
          '<div class="v-input"><span class="v-tw"><span class="v-typed"></span><i class="v-cur"></i></span><b class="v-send">' + ic('send', 28, '#fff', 3) + '</b></div></div>' +
        '<div class="v-arr">' + arrow + '</div>' +
        '<div class="card v-ans"><p class="lab">A RESPOSTA</p>' +
          '<div class="v-wait"><b>IA</b><span class="d"></span><span class="d"></span><span class="d"></span></div>' +
          '<table class="v-tb"><tr><th style="width:27%">Item</th><th style="width:26%">Responsável</th><th style="width:20%">Prazo</th><th>Status</th></tr>' + rows + '</table>' +
          '<div class="v-stamp">Serve para qualquer empresa.<br>E para nenhuma.</div></div>' +
      '</div>' +
      fx('bulb', 'Para fazer um bom plano, primeiro você precisa saber o que quer.', 'v-ban');
    if (STILL) vzFinal(el);
  },
  enter: function (el) {
    stop(el); vzReset(el);
    if (STILL) { vzFinal(el); return; }
    var typed = $(el, '.v-typed');
    later(el, function () {
      typeText(el, typed, VAZIO_TXT, 55, function () {
        el.classList.add('s-ready');
        later(el, function () {
          el.classList.add('s-send'); typed.textContent = ''; $(el, '.v-bub').textContent = VAZIO_TXT; el.classList.remove('s-ready');
          later(el, function () { el.classList.add('s-wait'); }, 400);
          later(el, function () { el.classList.remove('s-wait'); el.classList.add('s-tb'); }, 1300);
          later(el, function () { el.classList.add('s-blink'); }, 2700);
          later(el, function () { el.classList.add('s-stamp'); }, 3500);
          later(el, function () { el.classList.add('s-hit'); }, 3850);
          later(el, function () { el.classList.add('s-ban'); }, 4800);
        }, 650);
      });
    }, 500);
  },
  leave: function (el) { stop(el); vzReset(el); },
  notes: NOTES['vazio']
});

/* =====================================================================
   41 · ia-ajuda
   ===================================================================== */
css([
'.st-ia-ajuda .bd{display:flex;gap:28px;align-items:stretch}',
'.st-ia-ajuda .a-l{width:560px;flex:none;display:flex;flex-direction:column;gap:16px}',
'.st-ia-ajuda .a-steps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px;flex:1}',
'.st-ia-ajuda .a-steps li{display:flex;align-items:center;gap:18px;background:#fff;border:2px solid var(--line);border-radius:16px;padding:14px 22px;flex:1;transition:border-color .4s,box-shadow .4s}',
'.st-ia-ajuda .a-steps b{flex:none;width:58px;height:58px;border-radius:50%;border:3px solid var(--line);color:var(--muted);font-size:26px;font-weight:800;display:flex;align-items:center;justify-content:center;transition:all .4s}',
'.st-ia-ajuda .a-steps span{font-size:30px;font-weight:600;line-height:1.25;color:var(--muted);transition:color .4s}',
'.st-ia-ajuda.p-st1 li:nth-child(1),.st-ia-ajuda.p-st2 li:nth-child(2),.st-ia-ajuda.p-st3 li:nth-child(3){border-color:var(--red);box-shadow:var(--shadow)}',
'.st-ia-ajuda.p-st1 li:nth-child(1) b,.st-ia-ajuda.p-st2 li:nth-child(2) b,.st-ia-ajuda.p-st3 li:nth-child(3) b{background:var(--red);border-color:var(--red);color:#fff}',
'.st-ia-ajuda.p-st1 li:nth-child(1) span,.st-ia-ajuda.p-st2 li:nth-child(2) span,.st-ia-ajuda.p-st3 li:nth-child(3) span{color:var(--ink)}',
'.st-ia-ajuda .a-tip{display:flex;align-items:center;gap:18px;padding:18px 22px;background:var(--ink);border-color:var(--ink);color:#fff}',
'.st-ia-ajuda .a-tip .mb{flex:none;width:64px;height:64px;border-radius:50%;background:var(--red);display:flex;align-items:center;justify-content:center;position:relative}',
'.st-ia-ajuda .a-tip p{font-size:26px;font-weight:600;line-height:1.3;color:#fff}',
'.st-ia-ajuda.p-speak .a-tip .mb::after,.st-ia-ajuda.p-speak .a-micb::after{content:"";position:absolute;inset:-4px;border-radius:50%;border:3px solid var(--red);animation:aRing 1.3s ease-out infinite}',
'@keyframes aRing{from{transform:scale(1);opacity:.9}to{transform:scale(1.7);opacity:0}}',
'.st-ia-ajuda .a-chat{flex:1;min-width:0;display:flex;flex-direction:column;gap:14px}',
'.st-ia-ajuda .a-mic{display:flex;align-items:center;gap:20px}',
'.st-ia-ajuda .a-micb{position:relative;flex:none;width:60px;height:60px;border-radius:50%;background:var(--red);display:flex;align-items:center;justify-content:center}',
'.st-ia-ajuda .a-mic .col{flex:1;display:flex;flex-direction:column;gap:6px}',
'.st-ia-ajuda .a-wave{display:flex;align-items:center;gap:5px;height:44px}',
'.st-ia-ajuda .a-wave i{display:block;width:7px;height:100%;background:var(--red);border-radius:4px;transform:scaleY(.16);opacity:.5;transition:transform .4s,opacity .4s}',
'.st-ia-ajuda.p-speak .a-wave i{opacity:1;animation:aWave var(--du) ease-in-out infinite alternate;animation-delay:var(--dl)}',
'@keyframes aWave{from{transform:scaleY(.12)}to{transform:scaleY(var(--h))}}',
'.st-ia-ajuda .a-tr{font-size:30px;font-weight:500;font-style:italic;line-height:1.4;color:var(--ink);background:var(--gray);border-radius:20px 20px 20px 4px;padding:20px 26px;min-height:170px}',
'.st-ia-ajuda .a-tr .w{opacity:0;transition:opacity .25s}.st-ia-ajuda .a-tr .w.on{opacity:1}',
'.st-ia-ajuda .a-ia{display:flex;align-items:stretch;gap:16px;flex:1}.st-ia-ajuda .a-av{align-self:flex-start}',
'.st-ia-ajuda .a-av{flex:none;width:52px;height:52px;border-radius:50%;background:var(--red);color:#fff;font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center;margin-top:4px}',
'.st-ia-ajuda .a-ib{flex:1;border:2px solid var(--line);border-radius:4px 20px 20px 20px;padding:16px 24px;background:#fff;display:flex;flex-direction:column;gap:10px;flex:1}',
'.st-ia-ajuda .a-ib .t0{font-size:30px;font-weight:800;color:var(--ink);opacity:0;transition:opacity .4s}',
'.st-ia-ajuda.p-t0 .a-ib .t0{opacity:1}',
'.st-ia-ajuda .a-q{display:flex;align-items:center;gap:14px;font-size:30px;font-weight:600;color:var(--ink);opacity:0;transform:translateX(-16px);transition:opacity .45s,transform .45s}',
'.st-ia-ajuda .a-q i{flex:none;width:38px;height:38px;border-radius:50%;background:var(--red);color:#fff;font-style:normal;font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center}',
'.st-ia-ajuda.p-q1 .q1,.st-ia-ajuda.p-q2 .q2,.st-ia-ajuda.p-q3 .q3{opacity:1;transform:none}',
'.st-ia-ajuda .a-dots{position:absolute;display:none;gap:9px;left:24px;top:28px}',
'.st-ia-ajuda .a-ib{position:relative}',
'.st-ia-ajuda.p-typing .a-dots{display:flex}',
'.st-ia-ajuda .a-dots span{width:14px;height:14px;border-radius:50%;background:var(--muted);animation:m3dot 1s infinite}',
'.st-ia-ajuda .a-dots span:nth-child(2){animation-delay:.15s}.st-ia-ajuda .a-dots span:nth-child(3){animation-delay:.3s}'
].join('\n'));

var AJ_CLS = ['p-st1', 'p-st2', 'p-st3', 'p-speak', 'p-typing', 'p-t0', 'p-q1', 'p-q2', 'p-q3'];
function ajReset(el) { rmCls(el, AJ_CLS); $$(el, '.a-tr .w').forEach(function (w) { w.classList.remove('on'); }); }
function ajFinal(el) { ajReset(el); addCls(el, ['p-st1', 'p-st2', 'p-st3', 'p-t0', 'p-q1', 'p-q2', 'p-q3']); $$(el, '.a-tr .w').forEach(function (w) { w.classList.add('on'); }); }
function ajPlay(el) {
  ajReset(el);
  var W = $$(el, '.a-tr .w');
  later(el, function () { addCls(el, ['p-st1', 'p-speak']); }, 300);
  W.forEach(function (w, i) { later(el, function () { w.classList.add('on'); }, 900 + i * 150); });
  var tEnd = 900 + W.length * 150 + 300;
  later(el, function () { el.classList.remove('p-speak'); }, tEnd);
  later(el, function () { addCls(el, ['p-st2', 'p-typing']); }, tEnd + 400);
  later(el, function () { rmCls(el, ['p-typing']); addCls(el, ['p-t0', 'p-q1']); }, tEnd + 1500);
  later(el, function () { el.classList.add('p-q2'); }, tEnd + 2600);
  later(el, function () { el.classList.add('p-q3'); }, tEnd + 3700);
  later(el, function () { el.classList.add('p-st3'); }, tEnd + 5000);
  later(el, function () { ajPlay(el); }, tEnd + 11000);
}

ORQ.add({
  id: 'ia-ajuda', mov: 3, order: 41, title: 'Quem ajuda no plano? A própria IA.', tone: 'light', steps: 0,
  render: function (el) {
    var bd = shell(el, 'MOVIMENTO 3 · COMO PLANEJAR', 'Quem ajuda no plano? <em>A própria IA.</em>', true);
    var words = 'toda sexta eu cobro as pendências dos coordenadores e controlo tudo de cabeça… queria ver o que tá atrasado'.split(' ');
    var wv = words.map(function (w, i) { return '<span class="w">' + (i === 0 ? '“' : '') + w + (i === words.length - 1 ? '”' : '') + ' </span>'; }).join('');
    var bars = '';
    for (var i = 0; i < 34; i++) {
      var h = (0.35 + 0.65 * Math.abs(Math.sin(i * 1.7 + 0.6) * Math.cos(i * 0.45))).toFixed(2);
      bars += '<i style="--h:' + h + ';--du:' + (0.35 + (i * 37 % 40) / 100).toFixed(2) + 's;--dl:-' + ((i * 53 % 70) / 100).toFixed(2) + 's"></i>';
    }
    bd.innerHTML =
      '<div class="a-l"><ol class="a-steps">' +
        '<li><b>1</b><span>Jogue as ideias, bagunçadas mesmo.</span></li>' +
        '<li><b>2</b><span>Peça: “me entreviste antes de começar”.</span></li>' +
        '<li><b>3</b><span>No fim, peça o prompt inicial pronto.</span></li></ol>' +
        '<div class="card a-tip"><span class="mb">' + ic('mic', 32, '#fff') + '</span><p>Dica: abra o microfone e fale. Você pensa melhor falando.</p></div></div>' +
      '<div class="card a-chat">' +
        '<div class="a-mic"><span class="a-micb">' + ic('mic', 30, '#fff') + '</span><div class="col"><p class="lab">VOCÊ, NO MICROFONE</p><div class="a-wave">' + bars + '</div></div></div>' +
        '<p class="a-tr">' + wv + '</p>' +
        '<div class="a-ia"><b class="a-av">IA</b><div class="a-ib"><div class="a-dots"><span></span><span></span><span></span></div>' +
          '<p class="t0">Antes de montar:</p>' +
          '<p class="a-q q1"><i>1</i>Quem vai ler?</p><p class="a-q q2"><i>2</i>De onde vêm as pendências?</p><p class="a-q q3"><i>3</i>O que conta como atrasada?</p></div></div>' +
      '</div>';
    if (STILL) ajFinal(el);
  },
  enter: function (el) { stop(el); if (STILL) { ajFinal(el); return; } ajPlay(el); },
  leave: function (el) { stop(el); ajReset(el); },
  notes: NOTES['ia-ajuda']
});

/* =====================================================================
   42 · esquece  (a mesa de trabalho)
   ===================================================================== */
var MSGS = ['Preciso de um painel.', 'Quem lê é o coordenador.', 'Os dados vêm da planilha.', 'Atrasada: prazo vencido.', 'Cores: vermelho e verde.', 'Resolvida sai da conta.',
  'Ordena por área.', 'Troca verde por azul.', 'Inclui coluna de notas.', 'Mostra só as atrasadas.', 'Agora faz o resumo.', 'Deixa mais curto.',
  'Muda o título.', 'Põe o total no topo.', 'Agora separa por loja.', 'Tira a coluna C.', 'Refaz com a regra inicial.', 'Lembra das cores?',
  'Qual era a regra de atraso?', 'Ué, isso mudou?', 'Volta ao primeiro formato.', 'Estava certo antes.', 'Pode ajudar em outra coisa?', 'Valeu!'];
var ES_S = 186, ES_W = 172, ES_X0 = 1226; /* slot 0 = mais novo (direita) */
function esX(s) { return ES_X0 - s * ES_S; }
css([
'.st-esquece .bd{display:flex;flex-direction:column;gap:14px}',
'.st-esquece .e-mesa{position:relative;flex:none;height:262px}',
'.st-esquece .e-lab{position:absolute;top:0;font-size:24px;font-weight:700;color:var(--muted);white-space:nowrap}',
'.st-esquece .e-lab b{color:var(--red);font-weight:800}',
'.st-esquece .e-win{position:absolute;left:286px;top:42px;width:1122px;height:210px;border:3px dashed var(--red);border-radius:16px;background:rgba(227,0,27,.04);overflow:hidden}',
'.st-esquece .e-sweep{position:absolute;top:0;bottom:0;left:0;width:140px;background:linear-gradient(90deg,rgba(227,0,27,0),rgba(227,0,27,.28),rgba(227,0,27,0));opacity:0;pointer-events:none}',
'.st-esquece .e-n{position:absolute;right:0;top:-4px;font-size:30px;font-weight:800;color:var(--ink)}',
'.st-esquece .e-z{position:absolute;left:0;top:0;width:1408px;height:262px;pointer-events:none}',
'.st-esquece .m{position:absolute;top:60px;width:' + ES_W + 'px;height:176px;border-radius:14px;padding:12px 12px;background:#fff;border:2px solid var(--line);box-shadow:var(--shadow);color:var(--ink);transition:left .7s cubic-bezier(.4,0,.2,1),opacity .7s,background .4s,color .4s,border-color .4s}',
'.st-esquece .m h4{margin:0 0 4px;font-size:22px;font-weight:800;color:var(--red)}',
'.st-esquece .m p{font-size:22px;font-weight:500;line-height:1.25}',
'.st-esquece .m.new{background:var(--red);border-color:var(--red);color:#fff}',
'.st-esquece .m.new h4{color:#fff}',
'.st-esquece .m.out{background:var(--gray);border-color:var(--gray);color:var(--muted);box-shadow:none}',
'.st-esquece .m.out h4{color:var(--muted)}',
'.st-esquece .e-cards{flex:none;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:6px}',
'.st-esquece .e-cards .card{display:flex;align-items:center;gap:16px;padding:16px 22px;min-height:124px;transition:border-color .4s,box-shadow .4s}',
'.st-esquece .e-cards .card.hi{border-color:var(--red);box-shadow:0 8px 28px rgba(227,0,27,.18)}',
'.st-esquece .e-cards .ic{flex:none;width:56px;height:56px;border-radius:50%;border:2px solid var(--red);color:var(--red);background:#fff;display:flex;align-items:center;justify-content:center}',
'.st-esquece .e-cards p{font-size:26px;font-weight:600;line-height:1.3;color:var(--ink)}',
'.st-esquece .e-ban{width:1190px;margin-top:auto;flex:none}'
].join('\n'));

function esCards(el) { var hi = Math.floor(((el.__n || 1) - 1) / 3) % 3; $$(el, '.e-cards .card').forEach(function (c, i) { c.classList.toggle('hi', i === hi); }); }
function esStep(el, quick) {
  var z = $(el, '.e-z'), B = el.__B, n = ++el.__n;
  if (n > 24) { for (var k in B) B[k].remove(); el.__B = B = {}; el.__n = n = 1; }
  $(el, '.e-n').textContent = 'Mensagem ' + n;
  var e = document.createElement('div'); e.className = 'm new';
  e.innerHTML = '<h4>Msg ' + n + '</h4><p>' + MSGS[n - 1] + '</p>';
  e.style.left = '1440px'; e.style.opacity = 0; z.appendChild(e); B[n] = e; void e.offsetWidth;
  var gone = 0;
  Object.keys(B).forEach(function (k) {
    var s = n - k, c = B[k];
    if (s > 7) { c.style.left = '-260px'; c.style.opacity = 0; (function (c, k) { var r = later(el, function () { c.remove(); delete B[k]; }, 750); })(c, k); gone++; return; }
    if (s > 5) gone++;
    c.style.left = esX(s) + 'px'; c.style.opacity = s === 7 ? .3 : s === 6 ? .55 : 1;
    c.className = 'm' + (s === 0 ? ' new' : s > 5 ? ' out' : '');
  });
  $(el, '.e-gone').textContent = Math.max(0, n - 6);
  if (!quick) {
    var sw = $(el, '.e-sweep'); anim(el, sw, [{ transform: 'translateX(-140px)', opacity: 0 }, { opacity: 1, offset: .2 }, { opacity: 1, offset: .8 }, { transform: 'translateX(1122px)', opacity: 0 }], { duration: 950, easing: 'ease-in-out' });
  }
  esCards(el);
}
function esClear(el) { var z = $(el, '.e-z'); if (z) z.innerHTML = ''; el.__B = {}; el.__n = 0; }

ORQ.add({
  id: 'esquece', mov: 3, order: 42, title: 'Numa conversa muito longa, ela começa a esquecer.', tone: 'light', steps: 0,
  render: function (el) {
    var bd = shell(el, 'MOVIMENTO 3 · MEMÓRIA', 'Numa conversa muito longa, <em>ela começa a esquecer.</em>', true);
    bd.innerHTML =
      '<div class="e-mesa">' +
        '<div class="e-lab" style="left:0">Saiu da vista · <b class="e-gone">0</b></div>' +
        '<div class="e-lab" style="left:292px">O que ela enxerga agora: a mesa de trabalho</div>' +
        '<div class="e-n">Mensagem 0</div>' +
        '<div class="e-win"><div class="e-sweep"></div></div><div class="e-z"></div>' +
      '</div>' +
      '<div class="e-cards">' +
        '<div class="card"><span class="ic">' + ic('book', 30) + '</span><p>A cada resposta, ela relê a conversa inteira.</p></div>' +
        '<div class="card"><span class="ic">' + ic('warn', 30) + '</span><p>Quando a mesa enche, o começo sai da vista.</p></div>' +
        '<div class="card"><span class="ic">' + ic('clock', 30) + '</span><p>Conversa longa fica lenta, cara e esquecida.</p></div>' +
      '</div>' +
      fx('book', 'A solução é documentar: o que está escrito não se perde.', 'e-ban');
    esClear(el);
    if (STILL) { for (var i = 0; i < 12; i++) esStep(el, true); }
  },
  enter: function (el) {
    stop(el); esClear(el);
    if (STILL) { for (var i = 0; i < 12; i++) esStep(el, true); return; }
    for (var i = 0; i < 9; i++) esStep(el, true);
    (function loop() { later(el, function () { esStep(el); loop(); }, 1400); })();
  },
  leave: function (el) { stop(el); esClear(el); },
  notes: NOTES['esquece']
});

/* =====================================================================
   43 · contexto
   ===================================================================== */
var CT_LINES = [
  ['# ', 'Painel de pendências do BKO', 'h', -1], ['## ', 'Objetivo', 'h', 0], ['', 'Ver de relance o que está atrasado.', 't', 0],
  ['## ', 'Quem lê', 'h', 1], ['', 'Coordenadores, toda sexta.', 't', 1], ['## ', 'Regras', 'h', 2],
  ['- ', 'Atrasada: prazo antes de hoje', 't', 2], ['- ', 'Resolvida sai da conta', 't', 2], ['## ', 'Decisões', 'h', 3], ['- ', 'Cores: vermelho, amarelo e verde', 't', 3]];
var CT_SEC = ['Objetivo', 'Quem lê', 'Regras', 'Decisões'];
css([
'.st-contexto .bd{display:flex;gap:36px;align-items:stretch}',
'.st-contexto .c-doc{width:690px;flex:none;background:var(--stage);border-radius:18px;padding:26px 32px;display:flex;flex-direction:column;gap:6px;justify-content:center;box-shadow:0 14px 40px rgba(0,0,0,.18)}',
'.st-contexto .c-tag{align-self:flex-start;background:var(--red);color:#fff;font-size:24px;font-weight:700;border-radius:8px;padding:4px 16px;margin-bottom:8px}',
'.st-contexto .c-l{font-family:var(--mono);font-size:26px;line-height:1.5;color:#d6d6da;opacity:.28;margin:0 -14px;padding:0 14px;border-left:4px solid transparent;border-radius:6px;white-space:nowrap;transition:opacity .35s,background .35s,border-color .35s}',
'.st-contexto .c-l.h{color:#fff;font-weight:700}',
'.st-contexto .c-l .m{color:#ff6a7c;font-weight:700}',
'.st-contexto .c-l.on{opacity:1}',
'.st-contexto .c-l.cur{background:rgba(227,0,27,.28);border-left-color:var(--red)}',
'.st-contexto .c-r{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:space-between;gap:10px}',
'.st-contexto .c-it{display:flex;flex-direction:column;gap:8px}',
'.st-contexto .c-h{display:flex;align-items:center;gap:18px}',
'.st-contexto .c-h .ic{flex:none;width:58px;height:58px;border-radius:50%;border:2px solid var(--red);color:var(--red);background:#fff;display:flex;align-items:center;justify-content:center}',
'.st-contexto .c-h p{font-size:26px;font-weight:600;line-height:1.28;color:var(--ink)}',
'.st-contexto .c-strip{margin-left:76px;height:108px;position:relative;display:flex;align-items:center;gap:14px}',
'.st-contexto .c-chips{display:grid;grid-template-columns:auto auto;gap:8px;align-content:center;justify-content:start}',
'.st-contexto .c-chips span{font-size:22px;font-weight:700;color:var(--muted);background:var(--gray);border-radius:10px;padding:4px 14px;text-align:center;transition:all .35s}',
'.st-contexto .c-chips span.on{background:var(--red);color:#fff}',
'.st-contexto .c-ring{position:relative;width:104px;height:104px;flex:none;margin-left:auto}',
'.st-contexto .c-ring svg{position:absolute;inset:0;transform:rotate(-90deg)}',
'.st-contexto .c-ring b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800;color:var(--ink)}',
'.st-contexto .c-fly{position:absolute;left:0;top:0;z-index:5;font-size:24px;font-weight:700;color:#fff;background:var(--red);border-radius:999px;padding:4px 16px;white-space:nowrap;opacity:0;box-shadow:0 6px 18px rgba(227,0,27,.4)}',
'.st-contexto .c-raw{width:256px;height:108px;flex:none;background:var(--stage);border-radius:12px;padding:10px 14px;font-family:var(--mono);font-size:24px;line-height:1.38;color:#d6d6da;white-space:pre}',
'.st-contexto .c-raw i{font-style:normal;color:#ff6a7c;font-weight:700}',
'.st-contexto .c-cur{display:inline-block;width:11px;height:24px;background:var(--red);vertical-align:-4px;animation:m3blink .8s steps(1) infinite}',
'.st-contexto .c-arr{flex:none;width:36px}',
'.st-contexto .c-out{flex:1;height:108px;background:#fff;border:2px solid var(--line);border-radius:12px;padding:8px 16px;display:flex;flex-direction:column;justify-content:center;gap:2px}',
'.st-contexto .c-out .oh{font-size:30px;font-weight:800;color:var(--red);line-height:1.15}',
'.st-contexto .c-out .ol{font-size:24px;font-weight:600;color:var(--ink);line-height:1.2}',
'.st-contexto .c-out .ol::before{content:"";display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--red);margin-right:10px;vertical-align:2px}',
'.st-contexto .c-out>*{opacity:0;transform:translateY(6px);transition:all .4s}.st-contexto .c-out>.on{opacity:1;transform:none}',
'.st-contexto .c-chat{flex:1;height:108px;border:2px solid var(--line);border-radius:14px;background:#fff;position:relative;overflow:hidden}',
'.st-contexto .c-chat .bar{height:30px;background:var(--gray);display:flex;align-items:center;padding:0 14px;font-size:22px;font-weight:700;color:var(--muted)}',
'.st-contexto .c-chat .ph{position:absolute;left:0;right:0;top:30px;bottom:0;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:600;color:var(--muted);transition:opacity .22s .22s}',
'.st-contexto .c-strip{transition:opacity .4s}.st-contexto .c-strip.fo{opacity:0}.st-contexto .c-doc.fo .c-l{opacity:0!important}',
'.st-contexto .c-chat .ok{position:absolute;left:0;right:0;top:30px;bottom:0;display:flex;align-items:center;justify-content:center;gap:10px;font-size:24px;font-weight:700;color:var(--ink);opacity:0;transition:opacity .22s}',
'.st-contexto .c-chat.done .ph{opacity:0;transition:opacity .22s}.st-contexto .c-chat.done .ok{opacity:1;transition:opacity .25s .22s}',
'.st-contexto .c-chat .md{position:absolute;left:14px;top:-40px;z-index:2;background:var(--stage);color:#fff;font-size:22px;font-weight:700;border-left:5px solid var(--red);border-radius:8px;padding:4px 12px;opacity:0}'
].join('\n'));

function ctReset(el) {
  $$(el, '.c-l').forEach(function (l) { l.classList.remove('on', 'cur'); });
  $$(el, '.c-chips span').forEach(function (c) { c.classList.remove('on'); });
  ctRing(el, 0); var f = $(el, '.c-fly'); if (f) f.style.opacity = 0;
  $(el, '.c-raw').innerHTML = ''; $$(el, '.c-out>*').forEach(function (o) { o.classList.remove('on'); });
  $$(el, '.c-strip').forEach(function (x) { x.classList.remove('fo'); }); $(el, '.c-doc').classList.remove('fo');
  var ch = $(el, '.c-chat'); ch.classList.remove('done'); var md = $(el, '.c-chat .md'); md.style.opacity = 0; md.style.top = '-40px';
}
function ctRing(el, k) { $(el, '.c-arc').style.strokeDashoffset = (264 * (1 - k / 4)).toFixed(1); $(el, '.c-pc').textContent = (k * 25) + '%'; }
function ctFinal(el) {
  $$(el, '.c-l').forEach(function (l) { l.classList.add('on'); }); $$(el, '.c-chips span').forEach(function (c) { c.classList.add('on'); }); ctRing(el, 4);
  $(el, '.c-raw').innerHTML = ctRaw(['# Pendências', '- Atrasada', '- No prazo'], false); $$(el, '.c-out>*').forEach(function (o) { o.classList.add('on'); });
  $(el, '.c-chat').classList.add('done');
}
function ctRaw(lines, cur) { return lines.map(function (t) { return t.replace(/^(#|-)/, function (m) { return '<i>' + m + '</i>'; }); }).join('\n') + (cur ? '<span class="c-cur"></span>' : ''); }
function ctReset1(el) {
  $$(el, '.c-l').forEach(function (l) { l.classList.remove('on', 'cur'); });
  $$(el, '.c-chips span').forEach(function (c) { c.classList.remove('on'); });
  var arc = $(el, '.c-arc'); arc.style.transition = 'none'; ctRing(el, 0); void arc.getBoundingClientRect(); arc.style.transition = '';
  var f = $(el, '.c-fly'); if (f) f.style.opacity = 0;
}
function ctFade(el, k, on) { var s = $$(el, '.c-strip')[k]; if (s) s.classList.toggle('fo', on); if (k === 0) $(el, '.c-doc').classList.toggle('fo', on); }
function ctMaster(el) {
  ctReset1(el); ctFade(el, 0, false);
  var L = $$(el, '.c-l'), t = 500;
  later(el, function () { L[0].classList.add('on'); }, t);
  t += 700;
  CT_SEC.forEach(function (name, k) {
    var idx = []; CT_LINES.forEach(function (l, i) { if (l[3] === k) idx.push(i); });
    idx.forEach(function (i, j) {
      later(el, function () { if (j === 0 || true) $$(el, '.c-l.cur').forEach(function (c) { c.classList.remove('cur'); }); L[i].classList.add('on', 'cur'); }, t + j * 420);
    });
    t += idx.length * 420 + 150;
    var tt = t;
    later(el, function () {
      var bd = $(el, '.bd'), f = $(el, '.c-fly'), line = L[idx[0]], ring = $(el, '.c-ring');
      f.textContent = name; f.style.opacity = 1;
      var a = pos(line, bd), r = pos(ring, bd);
      var x0 = 690 - f.offsetWidth - 20, y0 = a.y + 2, x1 = r.x + 52 - f.offsetWidth / 2, y1 = r.y + 52 - f.offsetHeight / 2;
      anim(el, f, [{ transform: 'translate(' + x0 + 'px,' + y0 + 'px) scale(1)', opacity: 1 }, { transform: 'translate(' + (x0 + x1) / 2 + 'px,' + (Math.min(y0, y1) - 30) + 'px) scale(1.1)', opacity: 1, offset: .55 }, { transform: 'translate(' + x1 + 'px,' + y1 + 'px) scale(.5)', opacity: 0 }], { duration: 950, easing: 'ease-in-out', fill: 'forwards' });
      later(el, function () { ctRing(el, k + 1); $$(el, '.c-chips span')[k].classList.add('on'); }, 900);
    }, tt);
    t += 700;
  });
  later(el, function () { $$(el, '.c-l.cur').forEach(function (c) { c.classList.remove('cur'); }); }, t + 300);
  later(el, function () { ctFade(el, 0, true); }, t + 3600);
  later(el, function () { ctReset1(el); }, t + 4100);
  later(el, function () { ctMaster(el); }, t + 4200);
}
function ctMd(el) {
  var L = ['# Pendências', '- Atrasada', '- No prazo'], raw = $(el, '.c-raw'), O = $$(el, '.c-out>*');
  raw.innerHTML = ctRaw([], true); O.forEach(function (o) { o.classList.remove('on'); });
  void raw.offsetWidth; ctFade(el, 1, false);
  var li = 0;
  (function line() {
    if (li >= L.length) { later(el, function () { ctFade(el, 1, true); }, 2600); later(el, function () { ctMd(el); }, 3200); return; }
    var txt = L[li], i = 0, done = L.slice(0, li);
    (function ch() {
      i++; raw.innerHTML = ctRaw(done.concat([txt.slice(0, i)]), true);
      if (i < txt.length) { later(el, ch, 105); return; }
      var k = li; later(el, function () { O[k].classList.add('on'); }, 220); li++; later(el, line, 650);
    })();
  })();
}
function ctChat(el) {
  var ch = $(el, '.c-chat'), md = $(el, '.c-chat .md');
  ch.classList.remove('done'); md.style.opacity = 0; md.style.top = '-40px'; void ch.offsetWidth; ctFade(el, 2, false);
  later(el, function () { md.style.transition = 'none'; md.style.opacity = 1; void md.offsetWidth; anim(el, md, [{ top: '-40px', opacity: 1 }, { top: '48px', opacity: 1, offset: .8 }, { top: '56px', opacity: 0 }], { duration: 1100, easing: 'ease-in', fill: 'forwards' }); }, 800);
  later(el, function () { ch.classList.add('done'); }, 2000);
  later(el, function () { ctFade(el, 2, true); }, 5900);
  later(el, function () { ctChat(el); }, 6500);
}

ORQ.add({
  id: 'contexto', mov: 3, order: 43, title: 'O que está escrito não se perde.', tone: 'light', steps: 0,
  render: function (el) {
    var bd = shell(el, 'MOVIMENTO 3 · CONTEXTO', 'O que está escrito <em>não se perde.</em>', false);
    var lines = CT_LINES.map(function (l) { return '<p class="c-l ' + l[2] + '">' + (l[0] ? '<span class="m">' + l[0] + '</span>' : '') + l[1] + '</p>'; }).join('');
    var arrow = '<svg class="c-arr" viewBox="0 0 36 22" width="36" height="22"><path d="M0 7h22V0l14 11-14 11V15H0z" fill="#e3001b"/></svg>';
    bd.innerHTML =
      '<div class="c-doc"><span class="c-tag">contexto.md</span>' + lines + '</div>' +
      '<div class="c-r">' +
        '<div class="c-it"><div class="c-h"><span class="ic">' + ic('book', 30) + '</span><p>Contexto é tudo o que a IA precisa saber para não começar do zero.</p></div>' +
          '<div class="c-strip"><div class="c-chips"><span>Objetivo</span><span>Quem lê</span><span>Regras</span><span>Decisões</span></div>' +
          '<div class="c-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#fff" stroke="#ebeaeb" stroke-width="10"/><circle class="c-arc" cx="50" cy="50" r="42" fill="none" stroke="#e3001b" stroke-width="10" stroke-linecap="round" stroke-dasharray="264" stroke-dashoffset="264" style="transition:stroke-dashoffset .6s ease"/></svg><b class="c-pc">0%</b></div></div></div>' +
        '<div class="c-it"><div class="c-h"><span class="ic">' + ic('doc', 30) + '</span><p>.md é texto simples: # vira título e - vira lista. Toda IA lê bem.</p></div>' +
          '<div class="c-strip"><div class="c-raw"></div>' + arrow + '<div class="c-out"><div class="oh">Pendências</div><div class="ol">Atrasada</div><div class="ol">No prazo</div></div></div></div>' +
        '<div class="c-it"><div class="c-h"><span class="ic">' + ic('play', 28) + '</span><p>Conversa nova? Cole o contexto no começo e siga de onde parou.</p></div>' +
          '<div class="c-strip"><div class="c-chat"><div class="bar">Conversa nova</div><div class="ph">mesa vazia</div><div class="ok">' + ic('check', 28, '#e3001b') + 'Segue de onde parou</div><span class="md">contexto.md</span></div></div></div>' +
      '</div><span class="c-fly"></span>';
    ctReset(el); if (STILL) ctFinal(el);
  },
  enter: function (el) { stop(el); if (STILL) { ctReset(el); ctFinal(el); return; } ctMaster(el); ctMd(el); ctChat(el); },
  leave: function (el) { stop(el); ctReset(el); },
  notes: NOTES['contexto']
});

/* =====================================================================
   44 · cadernos
   ===================================================================== */
css([
'.st-cadernos .bd{display:flex;flex-direction:column;gap:26px}',
'.st-cadernos .k-grid{flex:none;height:440px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}',
'.st-cadernos .nb{position:relative;perspective:1400px}',
'.st-cadernos .pg{position:absolute;inset:0;background:#fff;border:2px solid var(--line);border-radius:6px 16px 16px 6px;box-shadow:var(--shadow);padding:16px 16px 14px 40px;display:flex;flex-direction:column;gap:8px;overflow:hidden;',
  'background-image:radial-gradient(circle at 18px 18px,#c9c7c8 6px,transparent 7px);background-size:36px 40px;background-repeat:repeat-y;background-position:0 6px}',
'.st-cadernos .pg>*{position:relative}',
'.st-cadernos .pg-h{opacity:0;transition:opacity .4s .4s;display:flex;align-items:center;gap:10px;font-size:28px;font-weight:800;color:var(--ink)}',
'.st-cadernos .pg-h .ic{flex:none;width:40px;height:40px;border-radius:50%;background:var(--red);color:#fff;display:flex;align-items:center;justify-content:center}',
'.st-cadernos .vis{flex:none;height:168px;position:relative;border-radius:10px;background:var(--soft);border:2px solid var(--gray);overflow:hidden}',
'.st-cadernos .cap{font-size:24px;font-weight:500;line-height:1.3;color:var(--text)}',
'.st-cadernos .chip{align-self:flex-start;font-size:23px;padding:4px 14px;border-radius:12px;line-height:1.25;margin-top:auto;background:var(--ink);color:#fff;border-color:var(--ink)}',
'.st-cadernos .pg .vis,.st-cadernos .pg .cap,.st-cadernos .pg .chip{opacity:0;transform:translateY(8px);transition:opacity .5s,transform .5s}',
'.st-cadernos .nb.open .pg .pg-h{opacity:1}.st-cadernos .nb.open .pg .vis{opacity:1;transform:none;transition-delay:.55s}',
'.st-cadernos .nb.open .pg .cap{opacity:1;transform:none;transition-delay:.75s}',
'.st-cadernos .nb.open .pg .chip{opacity:1;transform:none;transition-delay:.95s}',
'.st-cadernos .cov{position:absolute;inset:0;z-index:3;border-radius:6px 16px 16px 6px;transform-origin:left center;backface-visibility:hidden;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding-left:20px;',
  'box-shadow:0 14px 34px rgba(0,0,0,.2);transition:transform 1.1s cubic-bezier(.5,0,.2,1),opacity .5s .65s}',
'.st-cadernos .cov::before{content:"";position:absolute;left:12px;top:14px;bottom:14px;width:14px;background:radial-gradient(circle at 7px 7px,rgba(255,255,255,.75) 4px,transparent 5px) 0 0/14px 34px repeat-y}',
'.st-cadernos .cov .big{width:96px;height:96px;border-radius:50%;border:3px solid rgba(255,255,255,.85);display:flex;align-items:center;justify-content:center}',
'.st-cadernos .cov h3{font-size:36px;font-weight:800;color:#fff}',
'.st-cadernos .cov .n{position:absolute;right:18px;top:12px;font-size:22px;font-weight:700;opacity:.85}',
'.st-cadernos .nb:nth-child(odd) .cov{background:var(--red)}.st-cadernos .nb:nth-child(even) .cov{background:var(--ink)}',
'.st-cadernos .nb.open .cov{transform:rotateY(-118deg);opacity:0;pointer-events:none}',
/* visuais */
'.st-cadernos .v1{position:absolute;inset:0;padding:12px 14px;display:flex;flex-direction:column;justify-content:center;gap:6px;font-family:var(--mono);font-size:26px;line-height:1.35;color:var(--text)}',
'.st-cadernos .v1 span{opacity:0;transform:translateX(-10px);transition:all .4s}.st-cadernos .v1 b{color:var(--red)}',
'.st-cadernos .nb.go .v1 span{opacity:1;transform:none}.st-cadernos .nb.go .v1 span:nth-child(2){transition-delay:.35s}.st-cadernos .nb.go .v1 span:nth-child(3){transition-delay:.7s}.st-cadernos .nb.go .v1 span:nth-child(4){transition-delay:1.05s}',
'.st-cadernos .v2{position:absolute;inset:0;padding:14px 16px;display:flex;flex-direction:column;justify-content:space-around}',
'.st-cadernos .v2 div{display:flex;align-items:center;gap:12px}',
'.st-cadernos .v2 .bx{flex:none;width:30px;height:30px;border-radius:8px;border:3px solid var(--line);background:#fff;display:flex;align-items:center;justify-content:center;transition:all .3s}',
'.st-cadernos .v2 .bx svg{opacity:0;transform:scale(.4);transition:all .3s}',
'.st-cadernos .v2 .ln{flex:1;height:12px;border-radius:6px;background:var(--gray)}',
'.st-cadernos .nb.go .v2 .bx{background:var(--red);border-color:var(--red)}.st-cadernos .nb.go .v2 .bx svg{opacity:1;transform:none}',
'.st-cadernos .nb.go .v2 div:nth-child(1) .bx,.st-cadernos .nb.go .v2 div:nth-child(1) svg{transition-delay:.2s}.st-cadernos .nb.go .v2 div:nth-child(2) .bx,.st-cadernos .nb.go .v2 div:nth-child(2) svg{transition-delay:.7s}.st-cadernos .nb.go .v2 div:nth-child(3) .bx,.st-cadernos .nb.go .v2 div:nth-child(3) svg{transition-delay:1.2s}',
'.st-cadernos .v3{position:absolute;inset:0}.st-cadernos .v3 svg{width:100%;height:100%}',
'.st-cadernos .v3 .pk{transition:transform .8s cubic-bezier(.3,1.3,.5,1),opacity .4s;opacity:0}',
'.st-cadernos .v3 .pk.l{transform:translateX(-120px)}.st-cadernos .v3 .pk.r{transform:translateX(120px)}.st-cadernos .v3 .pk.c{transform:translateY(-80px)}',
'.st-cadernos .nb.go .v3 .pk{transform:none;opacity:1}',
'.st-cadernos .v3 .rail{transform-origin:left;transform:scaleX(0);transition:transform .7s .5s}.st-cadernos .nb.go .v3 .rail{transform:scaleX(1)}',
'.st-cadernos .v3 .lk{position:absolute;left:50%;top:6px;margin-left:-22px;width:44px;height:44px;border-radius:50%;background:var(--red);color:#fff;display:flex;align-items:center;justify-content:center;transform:scale(0)}',
'.st-cadernos .nb.go .v3 .lk{animation:m3pop .5s 1.1s forwards cubic-bezier(.3,1.5,.5,1)}',
'.st-cadernos .v4{position:absolute;inset:0;padding:12px 16px;display:flex;flex-direction:column;gap:9px}',
'.st-cadernos .v4 b{font-size:22px;font-weight:800;color:var(--ink)}',
'.st-cadernos .v4 i{display:block;height:11px;border-radius:6px;background:var(--gray)}',
'.st-cadernos .v4 .stp{position:absolute;right:12px;bottom:10px;border:4px solid var(--red);color:var(--red);font-size:26px;font-weight:800;letter-spacing:2px;border-radius:8px;padding:0 12px;transform:rotate(-8deg) scale(2.6);opacity:0;background:rgba(255,255,255,.85)}',
'.st-cadernos .nb.go .v4 .stp{opacity:1;transform:rotate(-8deg) scale(1);transition:all .35s 1s cubic-bezier(.2,1.5,.4,1)}',
'.st-cadernos .k-ban{flex:none;width:1190px;opacity:0;transform:translateY(20px);transition:opacity .6s,transform .6s}',
'.st-cadernos.k-end .k-ban{opacity:1;transform:none}'
].join('\n'));

function pickets() {
  var s = '', xs = [30, 56, 82, 108, 134, 160, 186, 212, 238];
  xs.forEach(function (x, i) {
    var c = i < 4 ? 'l' : i > 4 ? 'r' : 'c';
    s += '<g class="pk ' + c + '"><path d="M' + (x - 8) + ' 112V58l8-10 8 10v54z" fill="#e3001b"/></g>';
  });
  return s;
}
var NBS = [
  { n: 'Contexto', ic: 'book', cap: 'O resumo do projeto: objetivo, pessoas, bases e decisões.', chip: 'contexto.md',
    vis: '<div class="v1"><span><b>#</b> Painel BKO</span><span><b>##</b> Objetivo</span><span><b>##</b> Regras</span></div>' },
  { n: 'Instruções', ic: 'cog', cap: 'O manual da casa: regras que ela lê antes de qualquer tarefa.', chip: 'CLAUDE.md, AGENTS.md',
    vis: '<div class="v2"><div><span class="bx">' + ic('tick', 20, '#fff', 3.5) + '</span><i class="ln"></i></div><div><span class="bx">' + ic('tick', 20, '#fff', 3.5) + '</span><i class="ln" style="width:70%;flex:none"></i></div><div><span class="bx">' + ic('tick', 20, '#fff', 3.5) + '</span><i class="ln"></i></div></div>' },
  { n: 'Guardrails', ic: 'lock', cap: 'As cercas: o que ela nunca pode fazer.', chip: 'Ex.: dado real não entra',
    vis: '<div class="v3"><svg viewBox="0 0 268 118" preserveAspectRatio="xMidYMid meet"><rect x="108" y="70" width="52" height="42" rx="6" fill="#ebeaeb"/><circle cx="134" cy="88" r="9" fill="#e3001b"/><rect class="rail" x="14" y="68" width="240" height="8" rx="3" fill="#333"/><rect class="rail" x="14" y="92" width="240" height="8" rx="3" fill="#333"/>' + pickets() + '<path d="M6 112h256" stroke="#c9c7c8" stroke-width="3"/></svg><span class="lk">' + ic('lock', 24, '#fff') + '</span></div>' },
  { n: 'Skills', ic: 'bolt', cap: 'Receitas salvas: você ensina a tarefa repetida uma vez.', chip: 'Ex.: resumo de sexta',
    vis: '<div class="v4"><b>Receita: resumo de sexta</b><i style="width:92%"></i><i style="width:78%"></i><i style="width:60%"></i><span class="stp">SALVA</span></div>' }
];
function cadReset(el) { $$(el, '.nb').forEach(function (n) { n.classList.remove('open', 'go'); }); el.classList.remove('k-end'); }
function cadFinal(el) { $$(el, '.nb').forEach(function (n) { n.classList.add('open', 'go'); }); el.classList.add('k-end'); }
ORQ.add({
  id: 'cadernos', mov: 3, order: 44, title: 'Quatro cadernos deixam a IA confiável.', tone: 'light', steps: 0,
  render: function (el) {
    var bd = shell(el, 'MOVIMENTO 3 · OS CADERNOS DA IA', 'Quatro cadernos <em>deixam a IA confiável.</em>', true);
    bd.innerHTML = '<div class="k-grid">' + NBS.map(function (b, i) {
      return '<div class="nb"><div class="pg"><div class="pg-h"><span class="ic">' + ic(b.ic, 22, '#fff') + '</span>' + b.n + '</div><div class="vis">' + b.vis + '</div><p class="cap">' + b.cap + '</p><span class="chip">' + b.chip + '</span></div>' +
        '<div class="cov"><span class="n">' + (i + 1) + '</span><span class="big">' + ic(b.ic, 52, '#fff', 1.8) + '</span><h3>' + b.n + '</h3></div></div>';
    }).join('') + '</div>' + fx('check', 'Você documenta uma vez. A IA lê toda vez.', 'k-ban');
    if (STILL) cadFinal(el);
  },
  enter: function (el) {
    stop(el); cadReset(el);
    if (STILL) { cadFinal(el); return; }
    $$(el, '.nb').forEach(function (nb, i) {
      later(el, function () { nb.classList.add('open'); }, 700 + i * 1400);
      later(el, function () { nb.classList.add('go'); }, 700 + i * 1400 + 800);
    });
    later(el, function () { el.classList.add('k-end'); }, 700 + 3 * 1400 + 2600);
  },
  leave: function (el) { stop(el); cadReset(el); },
  notes: NOTES['cadernos']
});

/* =====================================================================
   45 · dados
   ===================================================================== */
var DADOS = [['users', 'Nome de promotor ou colega'], ['id', 'CPF e documentos'], ['db', 'Salário e valores pagos'], ['key', 'Senha e login'], ['sheet', 'Planilha exportada do sistema']];
css([
'.st-dados .bd{display:flex;flex-direction:column;gap:30px}',
'.st-dados .d-row{flex:1;min-height:0;display:grid;grid-template-columns:repeat(5,1fr);gap:20px}',
'.st-dados .d-c{position:relative;background:#fff;border:2px solid var(--line);border-radius:18px;box-shadow:var(--shadow);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;padding:20px 14px;transition:border-color .3s,box-shadow .3s,background .3s}',
'.st-dados .d-c .ib{position:relative;width:132px;height:132px;border-radius:50%;background:var(--soft);border:2px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--ink);transition:color .3s,opacity .3s}',
'.st-dados .d-c .ib svg.no{position:absolute;inset:-6px;width:144px;height:144px;overflow:visible}',
'.st-dados .d-c .no circle,.st-dados .d-c .no path{fill:none;stroke:var(--red);stroke-width:8;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .5s ease}',
'.st-dados .d-c .no path{transition-delay:.3s}',
'.st-dados .d-c p{font-size:29px;font-weight:700;line-height:1.25;text-align:center;color:var(--ink);transition:color .3s .5s}',
'.st-dados .d-c .lk{position:absolute;right:-12px;top:-14px;width:56px;height:56px;border-radius:50%;background:var(--red);color:#fff;display:flex;align-items:center;justify-content:center;transform:scale(0);box-shadow:0 6px 16px rgba(227,0,27,.4)}',
'.st-dados .d-c.x{border-color:var(--red);box-shadow:0 10px 30px rgba(227,0,27,.16)}',
'.st-dados .d-c.x .ib{color:var(--muted);opacity:.7}',
'.st-dados .d-c.x .no circle,.st-dados .d-c.x .no path{stroke-dashoffset:0}',
'.st-dados .d-c.x p{color:var(--red)}',
'.st-dados .d-c.x .lk{animation:m3pop .5s .6s forwards cubic-bezier(.3,1.5,.5,1)}',
'.st-dados .d-c.shake{animation:m3shake .45s .35s}',
'.st-dados .d-ban{flex:none;display:flex;align-items:center;gap:22px;background:var(--red);color:#fff;border-radius:18px;padding:22px 34px;box-shadow:0 14px 34px rgba(227,0,27,.3);opacity:0;transform:translateY(30px)}',
'.st-dados .d-ban .ico{flex:none;width:60px;height:60px;border-radius:50%;background:#fff;color:var(--red);display:flex;align-items:center;justify-content:center}',
'.st-dados .d-ban p{font-size:34px;font-weight:800;line-height:1.2;color:#fff}',
'.st-dados.d-end .d-ban{opacity:1;transform:none;transition:opacity .5s,transform .6s cubic-bezier(.2,1.2,.3,1)}'
].join('\n'));
function dadosReset(el) { $$(el, '.d-c').forEach(function (c) { c.classList.remove('x', 'shake'); }); el.classList.remove('d-end'); }
ORQ.add({
  id: 'dados', mov: 3, order: 45, title: 'O que nunca entra na IA.', tone: 'light', steps: 0,
  render: function (el) {
    var bd = shell(el, 'GUARDRAIL Nº 1 · REGRA DE DADOS', 'O que <em>nunca entra na IA.</em>', false);
    var no = '<svg class="no" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" pathLength="1"/><path d="M22 22L106 106" pathLength="1"/></svg>';
    bd.innerHTML = '<div class="d-row">' + DADOS.map(function (d) {
      return '<div class="d-c"><span class="lk">' + ic('lock', 28, '#fff', 2.4) + '</span><span class="ib">' + ic(d[0], 64, 'currentColor', 1.7) + no + '</span><p>' + d[1] + '</p></div>';
    }).join('') + '</div><div class="d-ban"><span class="ico">' + ic('warn', 34, '#e3001b', 2.4) + '</span><p>Use exemplos inventados. A conta é sua, não da SPOT.</p></div>';
    if (STILL) { $$(el, '.d-c').forEach(function (c) { c.classList.add('x'); }); el.classList.add('d-end'); }
  },
  enter: function (el) {
    stop(el); dadosReset(el);
    if (STILL) { $$(el, '.d-c').forEach(function (c) { c.classList.add('x'); }); el.classList.add('d-end'); return; }
    $$(el, '.d-c').forEach(function (c, i) {
      later(el, function () { c.classList.add('x', 'shake'); }, 700 + i * 800);
    });
    later(el, function () { el.classList.add('d-end'); }, 700 + 5 * 800 + 500);
  },
  leave: function (el) { stop(el); dadosReset(el); },
  notes: NOTES['dados']
});

/* =====================================================================
   46 · agentes
   ===================================================================== */
var AG = {
  voce: [0, 0, 170, 84], opus: [310, 0, 460, 84],
  son: [[60, 150, 300, 84, 'Construção'], [390, 150, 300, 84, 'Plantação'], [720, 150, 360, 84, 'Animais']],
  hk: [[77, 316, 'celeiro', 0], [215, 316, 'cerca', 0], [407, 316, 'campo', 1], [545, 316, 'árvores', 1], [698, 316, 'vaca', 2], [836, 316, 'galinhas', 2], [974, 316, 'porco', 2]]
};
var AG_HW = 120, AG_HH = 56;
css([
'.st-agentes .bd{overflow:visible}',
'.st.st-agentes .ttl{font-size:56px}',
'.st-agentes .g-n{position:absolute;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;transition:opacity .45s,transform .45s cubic-bezier(.3,1.5,.5,1)}',
'.st-agentes .g-n.hid{opacity:0;transform:scale(.8)}',
'.st-agentes .g-voce{background:#fff;border:3px solid var(--ink);border-radius:999px;font-size:30px;font-weight:800;color:var(--ink)}',
'.st-agentes .g-opus{background:var(--red);border:3px solid var(--red)}',
'.st-agentes .g-opus b{font-size:32px;font-weight:800;color:#fff}.st-agentes .g-opus span{font-size:22px;font-weight:500;color:#fff}',
'.st-agentes .g-son{background:var(--ink);border:3px solid var(--ink)}',
'.st-agentes .g-son span{font-size:22px;font-weight:600;color:var(--stage-muted)}.st-agentes .g-son b{font-size:30px;font-weight:800;color:#fff}',
'.st-agentes .g-hk{background:var(--gray);border:2px solid var(--line);border-radius:999px;font-size:24px;font-weight:700;color:var(--ink);padding:0 4px}',
'.st-agentes .g-bar{position:absolute;left:14px;right:14px;bottom:-16px;height:7px;border-radius:4px;background:var(--gray);overflow:hidden}',
'.st-agentes .g-bar i{display:block;height:100%;width:0;background:var(--red);border-radius:4px}',
'.st-agentes .g-ok{position:absolute;right:-12px;top:-22px;width:32px;height:32px;border-radius:50%;background:var(--red);color:#fff;font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center;transform:scale(0);transition:transform .3s cubic-bezier(.3,1.7,.5,1)}',
'.st-agentes .g-ok.on{transform:scale(1)}.st-agentes .g-ok.bad{background:var(--ink)}',
'.st-agentes .g-svg{position:absolute;left:0;top:0;width:1408px;height:580px;overflow:visible;pointer-events:none}',
'.st-agentes .g-svg path{fill:none;stroke:#b9b7b8;stroke-width:3;stroke-dasharray:1;stroke-dashoffset:0;transition:stroke-dashoffset .6s ease}',
'.st-agentes .g-svg path.top{stroke:var(--ink);stroke-width:4}',
'.st-agentes .g-svg path.hid{stroke-dashoffset:1}',
'.st-agentes .g-dot{position:absolute;left:-9px;top:-9px;width:18px;height:18px;border-radius:50%;background:var(--red);box-shadow:0 0 14px rgba(227,0,27,.85);z-index:4}',
'.st-agentes .g-dot.up{background:#fff;border:4px solid var(--red)}',
'.st-agentes .g-lab{position:absolute;left:1130px;width:278px;display:flex;flex-direction:column;gap:2px}',
'.st-agentes .g-lab b{font-size:22px;font-weight:800;letter-spacing:1.5px}.st-agentes .g-lab span{font-size:22px;color:var(--text)}',
'.st-agentes .g-stat{position:absolute;left:790px;top:20px;min-width:300px;font-size:22px;font-weight:700;color:var(--red);background:#fff;border:2px solid var(--red);border-radius:999px;padding:6px 20px;text-align:center;opacity:0;transition:opacity .3s}',
'.st-agentes .g-stat.on{opacity:1}',
'.st-agentes .g-end{position:absolute;left:0;top:480px;display:flex;align-items:center;gap:16px;width:930px}',
'.st-agentes .g-end p{font-size:27px;font-weight:700;color:var(--ink);line-height:1.25}',
'.st-agentes .g-btn{position:absolute;left:960px;top:474px}',
'.st-agentes .g-btn svg{flex:none}'
].join('\n'));

function agPath(pts) { return 'M' + pts.map(function (p) { return p[0] + ' ' + p[1]; }).join(' L'); }
function agGeo() {
  var o = AG.opus, oc = o[0] + o[2] / 2, ob = o[1] + o[3];
  var G = { vp: [[AG.voce[2], 42], [o[0], 42]], sp: [], hp: [], sc: [] };
  AG.son.forEach(function (s) { var cx = s[0] + s[2] / 2; G.sc.push(cx); G.sp.push([[oc, ob], [oc, ob + 28], [cx, ob + 28], [cx, s[1]]]); });
  AG.hk.forEach(function (h) {
    var s = AG.son[h[3]], sc = s[0] + s[2] / 2, sb = s[1] + s[3], hc = h[0] + 64;
    G.hp.push([[sc, sb], [sc, sb + 40], [hc, sb + 40], [hc, h[1]]]);
  });
  return G;
}
var AGG = agGeo();
function agReset(el) {
  $$(el, '.g-dot').forEach(function (d) { d.remove(); });
  $$(el, '.g-n.sn,.g-n.hn,.g-svg path.sub').forEach(function (n) { n.classList.add('hid'); });
  $$(el, '.g-bar i').forEach(function (b) { b.style.transition = 'none'; b.style.width = '0'; });
  $$(el, '.g-ok').forEach(function (o) { o.classList.remove('on', 'bad'); o.textContent = ''; });
  $(el, '.g-stat').classList.remove('on');
}
function agFinal(el) {
  agReset(el);
  $$(el, '.hid').forEach(function (n) { n.classList.remove('hid'); });
  $$(el, '.g-bar i').forEach(function (b) { b.style.width = '100%'; });
  $$(el, '.g-ok').forEach(function (o) { o.classList.add('on'); o.textContent = '✓'; });
  var s = $(el, '.g-stat'); s.textContent = 'tudo certo'; s.classList.add('on');
}
function agStatus(el, t) { var s = $(el, '.g-stat'); s.textContent = t; s.classList.add('on'); }
function agTravel(el, path, ms, up, cb) {
  var root = $(el, '.bd'), d = document.createElement('div'); d.className = 'g-dot' + (up ? ' up' : ''); root.appendChild(d);
  var L = 0, seg = [], i, acc = 0, kf = [];
  for (i = 1; i < path.length; i++) { var l = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]); seg.push(l); L += l; }
  for (i = 0; i < path.length; i++) { if (i > 0) acc += seg[i - 1]; kf.push({ transform: 'translate(' + path[i][0] + 'px,' + path[i][1] + 'px)', opacity: 1, offset: L ? acc / L : 0 }); }
  var a = anim(el, d, kf, { duration: ms, easing: 'ease-in-out', fill: 'forwards' });
  a.addEventListener('finish', function () { d.remove(); if (cb) cb(); });
}
function agPulse(el, node, red) {
  anim(el, node, [{ boxShadow: '0 0 0 0 ' + (red ? 'rgba(227,0,27,.75)' : 'rgba(51,51,51,.6)') }, { boxShadow: '0 0 0 16px rgba(227,0,27,0)' }], { duration: 900, easing: 'ease-out' });
}
function agRun(el) {
  agReset(el);
  var opus = $(el, '.g-opus'), SN = $$(el, '.g-n.sn'), HN = $$(el, '.g-n.hn'), LS = $$(el, '.g-svg path.s'), LH = $$(el, '.g-svg path.h');
  var BARS = HN.map(function (h) { return $(h, '.g-bar i'); }), OKS = HN.map(function (h) { return $(h, '.g-ok'); }), OKO = $(opus, '.g-ok');
  var at = function (t, f) { later(el, f, t); }, t = 300;
  at(t, function () { agStatus(el, 'lendo o pedido…'); agTravel(el, AGG.vp, 700, false, function () { agPulse(el, opus, true); }); });
  t += 1200;
  at(t, function () {
    agStatus(el, 'dividindo em 3 partes');
    AGG.sp.forEach(function (p, i) {
      LS[i].classList.remove('hid');
      agTravel(el, p, 900, false, function () { SN[i].classList.remove('hid'); agPulse(el, SN[i], false); });
    });
  });
  t += 1500;
  at(t, function () {
    AGG.hp.forEach(function (p, i) {
      LH[i].classList.remove('hid');
      agTravel(el, p, 700, false, function () {
        HN[i].classList.remove('hid'); agPulse(el, HN[i], true);
        var dur = 900 + ((i * 373) % 900), b = BARS[i];
        b.style.transition = 'width ' + dur + 'ms linear'; b.style.width = '100%';
        later(el, function () { var o = OKS[i]; if (AG.hk[i][2] === 'cerca') { o.textContent = '!'; o.className = 'g-ok on bad'; } else { o.textContent = '✓'; o.className = 'g-ok on'; } }, dur);
      });
    });
  });
  t += 3300;
  at(t, function () { agStatus(el, 'conferindo tudo…'); AGG.hp.forEach(function (p) { agTravel(el, p.slice().reverse(), 600, true); }); });
  t += 700;
  at(t, function () { AGG.sp.forEach(function (p) { agTravel(el, p.slice().reverse(), 700, true); }); });
  t += 800;
  at(t, function () { agPulse(el, opus, true); });
  t += 600;
  var ci = 1;
  at(t, function () {
    agStatus(el, 'vão na cerca: corrigir');
    agTravel(el, AGG.sp[0], 600, false, function () {
      agTravel(el, AGG.hp[ci], 500, false, function () {
        agPulse(el, HN[ci], true); var b = BARS[ci]; b.style.transition = 'none'; b.style.width = '0'; void b.offsetWidth;
        b.style.transition = 'width 800ms linear'; b.style.width = '100%';
        later(el, function () { OKS[ci].textContent = '✓'; OKS[ci].className = 'g-ok on'; }, 800);
      });
    });
  });
  t += 2400;
  at(t, function () { OKO.textContent = '✓'; OKO.className = 'g-ok on'; agPulse(el, opus, true); agStatus(el, 'tudo certo'); });
  t += 5200;
  at(t, function () { agRun(el); });
}

ORQ.add({
  id: 'agentes', mov: 3, order: 46, title: 'Agentes: uma orquestra trabalhando por você.', tone: 'light', steps: 0,
  render: function (el) {
    var bd = shell(el, 'MOVIMENTO 3 · AGENTES', 'Agentes: <em>uma orquestra trabalhando por você.</em>', false);
    var h = '<svg class="g-svg" viewBox="0 0 1408 580"><path class="top" d="' + agPath(AGG.vp) + '" pathLength="1"/>';
    AGG.sp.forEach(function (p) { h += '<path class="s sub top" d="' + agPath(p) + '" pathLength="1"/>'; });
    AGG.hp.forEach(function (p) { h += '<path class="h sub" d="' + agPath(p) + '" pathLength="1"/>'; });
    h += '</svg>';
    var box = function (c, b, inner) { return '<div class="g-n ' + c + '" style="left:' + b[0] + 'px;top:' + b[1] + 'px;width:' + b[2] + 'px;height:' + b[3] + 'px">' + inner + '</div>'; };
    h += box('g-voce', AG.voce, 'Você');
    h += box('g-opus', AG.opus, '<b>Opus · Regente</b><span>lê, planeja, divide e confere</span><i class="g-ok"></i>');
    AG.son.forEach(function (s) { h += box('g-son sn', s, '<span>Sonnet · Maestro</span><b>' + s[4] + '</b>'); });
    AG.hk.forEach(function (k) { h += box('g-hk hn', [k[0] + 64 - AG_HW / 2, k[1], AG_HW, AG_HH], k[2] + '<span class="g-bar"><i></i></span><i class="g-ok"></i>'); });
    h += '<div class="g-lab" style="top:6px"><b class="red">REGENTE</b><span>o modelo mais forte</span></div>' +
      '<div class="g-lab" style="top:156px"><b class="ink">MAESTROS DE NAIPE</b><span>um por parte</span></div>' +
      '<div class="g-lab" style="top:316px"><b class="muted">INSTRUMENTOS</b><span>Haiku: tarefas pequenas</span></div>' +
      '<div class="g-stat"></div>' +
      '<div class="g-end"><span class="ico" style="flex:none;width:44px;height:44px;color:var(--red)">' + ic('check', 44, '#e3001b') + '</span><p>No fim, o regente confere tudo e devolve o que estiver errado.</p></div>' +
      '<button class="btn-demo g-btn" type="button">' + ic('play', 24, '#fff', 2.4) + 'Ver a fazenda dos agentes</button>';
    bd.innerHTML = h;
    $(el, '.g-btn').addEventListener('click', function () { if (window.ORQ && ORQ.openDemo) ORQ.openDemo('demos/fazenda.html'); });
    if (STILL) agFinal(el);
  },
  enter: function (el) { stop(el); if (STILL) { agFinal(el); return; } agRun(el); },
  leave: function (el) { stop(el); agReset(el); },
  notes: NOTES['agentes']
});

/* =====================================================================
   47 · limites
   ===================================================================== */
css([
'.st-limites .bd{display:flex;flex-direction:column;gap:16px}',
'.st-limites .l-lead{flex:none;font-size:30px;font-weight:600;color:var(--text)}',
'.st-limites .l-grid{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:20px}',
'.st-limites .l-c{display:flex;align-items:center;gap:22px;padding:16px 24px}',
'.st-limites .l-m{flex:none;width:300px;height:196px;position:relative;border-radius:12px;background:var(--soft);border:2px solid var(--gray);overflow:hidden}',
'.st-limites .l-t{display:flex;flex-direction:column;gap:8px;min-width:0}',
'.st-limites .l-t .hh{display:flex;align-items:center;gap:14px}',
'.st-limites .l-t .nn{flex:none;width:46px;height:46px;border-radius:50%;background:var(--red);color:#fff;font-size:26px;font-weight:800;display:flex;align-items:center;justify-content:center}',
'.st-limites .l-t h3{font-size:30px;font-weight:800;line-height:1.15;color:var(--ink)}',
'.st-limites .l-t p{font-size:24px;font-weight:500;line-height:1.3;color:var(--text)}',
/* m1 faixas */
'.st-limites .m1 i{position:absolute;display:block;height:22px;border-radius:10px;opacity:0;transform:translateY(-70px);transition:opacity .35s,transform .55s cubic-bezier(.3,1.3,.5,1)}',
'.st-limites .m1 i.on{opacity:1;transform:none}',
'.st-limites .m1 .ln{position:absolute;top:42px;bottom:10px;width:2px;background:var(--line)}',
'.st-limites .m1 .lb{position:absolute;top:8px;font-size:22px;font-weight:700;color:var(--muted);width:146px;text-align:center}',
/* m2 tanque */
'.st-limites .m2 .tk{position:absolute;left:34px;top:14px;width:66px;height:168px;border:4px solid var(--ink);border-radius:12px;overflow:hidden;background:#fff}',
'.st-limites .m2 .tk i{position:absolute;left:0;right:0;bottom:0;height:0;background:linear-gradient(0deg,var(--red-deep),var(--red));transition:height 2.2s linear}',
'.st-limites .m2 .pc{position:absolute;left:124px;top:18px;font-size:38px;font-weight:800;color:var(--ink);line-height:1}',
'.st-limites .m2 .pl{position:absolute;left:124px;top:70px;font-size:22px;font-weight:700;color:var(--muted);line-height:1.2;white-space:nowrap}',
'.st-limites .m2 .md{position:absolute;left:124px;top:116px;background:var(--ink);color:#fff;font-size:22px;font-weight:700;border-radius:8px;padding:3px 12px;opacity:0;transform:translateY(8px);transition:all .4s}',
'.st-limites .m2 .md.on{opacity:1;transform:none}',
/* m3 */
'.st-limites .m3 .ch{position:absolute;left:36px;font-size:22px;font-weight:700;color:var(--ink);background:#fff;border:2px solid var(--line);border-radius:10px;padding:3px 12px;white-space:nowrap;opacity:0;transform:translateX(-30px);transition:all .5s}',
'.st-limites .m3 .ch.on{opacity:1;transform:none}',
'.st-limites .m3.mg .ch{opacity:0;transform:translate(70px,0) scale(.4)}',
'.st-limites .m3 .sk{position:absolute;left:50%;top:50%;margin:-46px 0 0 -96px;width:192px;height:92px;border-radius:16px;background:var(--red);color:#fff;display:flex;align-items:center;justify-content:center;gap:10px;font-size:30px;font-weight:800;opacity:0;transform:scale(.4)}',
'.st-limites .m3.mg .sk{animation:m3pop .5s .35s forwards cubic-bezier(.3,1.5,.5,1)}',
/* m4 */
'.st-limites .m4 .bg{position:absolute;left:30px;right:30px;top:12px;height:50px;border-radius:10px;background:var(--ink);color:#fff;font-size:22px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:opacity .4s,transform .5s}',
'.st-limites .m4.sp .bg{opacity:.25;transform:scale(.92)}',
'.st-limites .m4>svg{position:absolute;left:0;top:0;width:100%;height:100%}',
'.st-limites .m4>svg path{fill:none;stroke:#b9b7b8;stroke-width:3;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .5s}',
'.st-limites .m4.sp>svg path{stroke-dashoffset:0}',
'.st-limites .m4 .sm{position:absolute;top:124px;width:84px;height:56px;border-radius:10px;background:var(--gray);overflow:hidden;opacity:0;transform:scale(.7);transition:opacity .4s .3s,transform .4s .3s}',
'.st-limites .m4.sp .sm{opacity:1;transform:none}',
'.st-limites .m4 .sm i{position:absolute;left:0;top:0;bottom:0;width:0;background:var(--red)}',
'.st-limites .m4 .sm b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;opacity:0;transition:opacity .3s}',
'.st-limites .m4 .sm.ok b{opacity:1}'
].join('\n'));

function lmLoop(el, key, fn, period) {
  (function run() { fn(); later(el, run, period); })();
}
function lmM1(el) {
  var m = $(el, '.m1'), B = $$(m, 'i'); B.forEach(function (b) { b.classList.remove('on'); });
  B.forEach(function (b, i) { later(el, function () { b.classList.add('on'); }, 500 + i * 650); });
}
function lmM2(el) {
  var m = $(el, '.m2'), tk = $(m, '.tk i'), pc = $(m, '.pc'), pl = $(m, '.pl'), md = $(m, '.md');
  tk.style.transition = 'none'; tk.style.height = '0'; void tk.offsetWidth; md.classList.remove('on'); pc.textContent = '0%'; pl.textContent = 'a mesa enche';
  later(el, function () { tk.style.transition = 'height 2.4s linear'; tk.style.height = '100%'; tween(el, 0, 100, 2400, function (v) { pc.textContent = v + '%'; }); }, 400);
  later(el, function () { pl.textContent = 'mesa cheia'; md.classList.add('on'); }, 3100);
  later(el, function () { tk.style.transition = 'height 1.1s ease-in-out'; tk.style.height = '10%'; tween(el, 100, 10, 1100, function (v) { pc.textContent = v + '%'; }); pl.textContent = 'conversa nova'; }, 4200);
}
function lmM3(el) {
  var m = $(el, '.m3'), C = $$(m, '.ch'); m.classList.remove('mg'); C.forEach(function (c) { c.classList.remove('on'); });
  C.forEach(function (c, i) { later(el, function () { c.classList.add('on'); }, 400 + i * 700); });
  later(el, function () { m.classList.add('mg'); }, 2900);
}
function lmM4(el) {
  var m = $(el, '.m4'), S = $$(m, '.sm'); m.classList.remove('sp');
  S.forEach(function (s) { s.classList.remove('ok'); var f = $(s, 'i'); f.style.transition = 'none'; f.style.width = '0'; });
  later(el, function () { m.classList.add('sp'); }, 1000);
  S.forEach(function (s, i) { later(el, function () { var f = $(s, 'i'); f.style.transition = 'width ' + (1000 + i * 350) + 'ms linear'; f.style.width = '100%'; later(el, function () { s.classList.add('ok'); }, 1000 + i * 350); }, 1700); });
}
function lmFinal(el) {
  $$(el, '.m1 i').forEach(function (b) { b.classList.add('on'); });
  var m2 = $(el, '.m2'); $(m2, '.tk i').style.transition = 'none'; $(m2, '.tk i').style.height = '10%'; $(m2, '.pc').textContent = '10%'; $(m2, '.pl').textContent = 'conversa nova'; $(m2, '.md').classList.add('on');
  $$(el, '.m3 .ch').forEach(function (c) { c.classList.add('on'); }); $(el, '.m3').classList.add('mg'); $(el, '.m3 .sk').style.cssText += ';opacity:1;transform:none;animation:none';
  $(el, '.m4').classList.add('sp'); $$(el, '.m4 .sm').forEach(function (s) { s.classList.add('ok'); $(s, 'i').style.width = '100%'; });
}
function lmReset(el) {
  $$(el, '.m1 i,.m2 .md,.m3 .ch').forEach(function (n) { n.classList.remove('on'); });
  $(el, '.m3').classList.remove('mg'); $(el, '.m4').classList.remove('sp'); var sk = $(el, '.m3 .sk'); sk.style.cssText = '';
  $$(el, '.m4 .sm').forEach(function (s) { s.classList.remove('ok'); $(s, 'i').style.width = '0'; });
  var m2 = $(el, '.m2'); $(m2, '.tk i').style.height = '0'; $(m2, '.pc').textContent = '0%'; $(m2, '.pl').textContent = 'a mesa enche';
}
ORQ.add({
  id: 'limites', mov: 3, order: 47, title: 'Limites: gaste a IA com inteligência.', tone: 'light', steps: 0,
  render: function (el) {
    var bd = shell(el, 'MOVIMENTO 3 · LIMITES', 'Limites: <em>gaste a IA com inteligência.</em>', true);
    var H = [['Um assunto por conversa.', 'Misturar temas confunde e gasta mais.'], ['Se perdeu? Resuma e recomece.', 'Peça o contexto.md e abra outra conversa.'],
      ['Repetiu? Vira skill.', 'Ensine uma vez, reuse sempre.'], ['Ficou grande? Vira agentes.', 'Divida em partes, cada uma com seu responsável.']];
    var tk = ic('tick', 28, '#fff', 3.5);
    var M = [
      '<div class="l-m m1"><span class="lb" style="left:0">Conversa 1</span><span class="lb" style="left:154px">Conversa 2</span><b class="ln" style="left:150px"></b>' +
        '<i style="left:12px;top:50px;width:124px;background:#e3001b"></i><i style="left:12px;top:84px;width:96px;background:#e3001b"></i><i style="left:12px;top:118px;width:116px;background:#e3001b"></i>' +
        '<i style="left:164px;top:50px;width:122px;background:#6e6e6e"></i><i style="left:164px;top:84px;width:92px;background:#6e6e6e"></i></div>',
      '<div class="l-m m2"><div class="tk"><i></i></div><div class="pc">0%</div><div class="pl">a mesa enche</div><span class="md">contexto.md</span></div>',
      '<div class="l-m m3"><span class="ch" style="top:22px">resumo de sexta</span><span class="ch" style="top:78px">resumo de sexta</span><span class="ch" style="top:134px">resumo de sexta</span><div class="sk">' + ic('bolt', 34, '#fff') + 'skill</div></div>',
      '<div class="l-m m4"><div class="bg">tarefa grande</div><svg viewBox="0 0 300 196" preserveAspectRatio="none"><path d="M150 62V94M150 94H56M150 94H244M56 94V124M244 94V124M150 94V124" pathLength="1"/></svg>' +
        '<div class="sm" style="left:12px"><i></i><b>' + tk + '</b></div><div class="sm" style="left:108px"><i></i><b>' + tk + '</b></div><div class="sm" style="left:204px"><i></i><b>' + tk + '</b></div></div>'
    ];
    bd.innerHTML = '<p class="l-lead">Ela relê a conversa inteira a cada resposta. Por isso:</p><div class="l-grid">' + H.map(function (h, i) {
      return '<div class="card l-c">' + M[i] + '<div class="l-t"><div class="hh"><span class="nn">' + (i + 1) + '</span><h3>' + h[0] + '</h3></div><p>' + h[1] + '</p></div></div>';
    }).join('') + '</div>';
    if (STILL) lmFinal(el);
  },
  enter: function (el) {
    stop(el); lmReset(el);
    if (STILL) { lmFinal(el); return; }
    lmLoop(el, 1, function () { lmM1(el); }, 6500);
    lmLoop(el, 2, function () { lmM2(el); }, 7600);
    lmLoop(el, 3, function () { lmM3(el); }, 6200);
    lmLoop(el, 4, function () { lmM4(el); }, 7000);
  },
  leave: function (el) { stop(el); lmReset(el); },
  notes: NOTES['limites']
});

/* ---------- injeta CSS ---------- */
(function () {
  if (document.getElementById('css-m3')) return;
  var st = document.createElement('style'); st.id = 'css-m3'; st.textContent = CSS + '\n' + CSS_PARTS.join('\n');
  document.head.appendChild(st);
})();
})();
