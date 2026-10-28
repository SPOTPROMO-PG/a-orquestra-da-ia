/* 1º ato · Manhã — "Do processo ao propósito" (11 estações, act 1). Gerado por work-manha/build.js a partir de manha.src.js. */
(function () {
  'use strict';
  window.ORQ = window.ORQ || { stations: [], add: function (s) { this.stations.push(s); } };

  /* ---------- utilidades ---------- */
  function isRM() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function css(id, txt) {
    if (document.getElementById(id)) return;
    var s = document.createElement('style'); s.id = id; s.textContent = txt; document.head.appendChild(s);
  }
  function S(id, txt) { return txt.replace(/&/g, '.st-' + id); }
  function startCss(el) {
    el.classList.remove('on'); el.classList.toggle('rm', isRM());
    if (!el.classList.contains('rm')) { void el.offsetWidth; el.classList.add('on'); }
  }
  function tm(el) { return el.__tm || (el.__tm = { to: [], iv: [], raf: 0 }); }
  function later(el, fn, ms) { var id = setTimeout(fn, ms); tm(el).to.push(id); return id; }
  function every(el, fn, ms) { var id = setInterval(fn, ms); tm(el).iv.push(id); return id; }
  function stopAll(el) {
    var t = tm(el);
    t.to.forEach(clearTimeout); t.iv.forEach(clearInterval);
    if (t.raf) cancelAnimationFrame(t.raf);
    t.to = []; t.iv = []; t.raf = 0;
  }
  function run(el, fn) {
    var t = tm(el), t0 = null;
    if (t.raf) cancelAnimationFrame(t.raf);
    function f(now) { if (t0 === null) t0 = now; var k = fn(now - t0); if (k !== false) t.raf = requestAnimationFrame(f); else t.raf = 0; }
    t.raf = requestAnimationFrame(f);
  }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function eo(t) { return 1 - Math.pow(1 - t, 3); }
  function fmt(v, d) { return v.toFixed(d).replace('.', ','); }
  function $(el, sel) { return el.querySelector(sel); }
  function $$(el, sel) { return [].slice.call(el.querySelectorAll(sel)); }
  var LOGO = '<img class="logo" src="img/spot-logo.png" alt="SPOT">';
  var LOGO_D = '<img class="logo" src="img/spot-logo-sobre-escuro.png" alt="SPOT">';
  function foot(t) { return '<p class="foot">' + (t || 'BKO 360° · Programa P&amp;G • SPOT') + '</p>'; }
  function ico(path) { return '<svg viewBox="0 0 48 48" aria-hidden="true">' + path + '</svg>'; }

  var IDS = ['capa', 'cadeia', 'loja', 'promotor', 'dinamica', 'nota', 'regua', 'fee', 'ponte', 'almoco'];
  css('css-manha-base', IDS.map(function (i) { return '.st-' + i + ' .foot'; }).join(',') + '{font-size:22px}' +
    IDS.map(function (i) { return '.st-' + i + ' .ttl'; }).join(',') + '{letter-spacing:-.5px}');

  /* ===================================================================
     1 · CAPA
     =================================================================== */
  css('css-manha-capa', S('capa', [
    '&.st{background:var(--stage) url("img/escada-ideia.jpg") center/cover no-repeat}',
    '&.st::before{content:"";position:absolute;left:0;bottom:0;width:900px;height:560px;transform-origin:0 100%;background:radial-gradient(closest-side,rgba(227,0,27,.30),rgba(227,0,27,0));pointer-events:none}',
    '&.on.st::before{animation:stc-glow 6s ease-in-out infinite}',
    '@keyframes stc-glow{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}',
    '& .col{position:absolute;left:96px;top:90px;bottom:50px;width:800px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:26px}',
    '& .tag{font-size:24px;font-weight:700;letter-spacing:2px;color:#fff;background:var(--red);padding:8px 18px;border-radius:6px}',
    '& h1{margin:0;font-weight:900;color:#fff;line-height:1}',
    '& .l1{display:block;font-size:136px;letter-spacing:-3px}',
    '& .l2{display:block;font-size:70px;line-height:1.04;margin-top:10px;font-weight:800;letter-spacing:-1px}',
    '& .l2 em{font-style:normal;color:#ff3347}',
    '& .deg{position:relative;display:inline-block}',
    '& .orb{position:absolute;left:50%;top:50%;width:460px;height:210px;margin:-105px 0 0 -230px;pointer-events:none;overflow:visible}',
    '& .orb ellipse{fill:none;stroke:rgba(255,51,71,.55);stroke-width:3;stroke-dasharray:4 12;stroke-linecap:round}',
    '& hr{width:96px;border:0;border-top:4px solid var(--red);margin:0;transform-origin:left center}',
    '& .who{font-size:32px;font-weight:500;color:var(--stage-muted)}',
    '& .who b{color:#fff;font-weight:700}',
    '& .sch{display:flex;align-items:center;gap:0}',
    '& .pc{position:relative;overflow:hidden;font-size:24px;font-weight:700;color:#fff;border:2px solid rgba(255,255,255,.4);border-radius:999px;padding:9px 24px;background:rgba(255,255,255,.06)}',
    '& .pc::after{content:"";position:absolute;top:0;bottom:0;left:-60%;width:40%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:skewX(-20deg)}',
    '&.on .pc::after{animation:stc-shim 5s ease-in-out infinite}',
    '&.on .pc.b::after{animation-delay:.6s}',
    '@keyframes stc-shim{0%,55%{left:-60%}100%{left:130%}}',
    '& .ln{width:44px;height:3px;background:linear-gradient(90deg,rgba(255,255,255,.4),var(--red))}',
    '& .go{font-size:30px;font-weight:600;color:#fff;line-height:1.25}',
    '&.on .rv{animation:stc-up 1s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d,0s)}',
    '&.on hr{animation:stc-grow 1s .9s cubic-bezier(.2,.8,.2,1) both}',
    '@keyframes stc-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}',
    '@keyframes stc-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}'
  ].join('\n')));

  ORQ.add({
    id: 'capa', act: 1, mov: 1, order: -30, title: "BKO 360° Do processo ao propósito", tone: 'dark', steps: 0,
    render: function (el) {
      el.innerHTML = LOGO_D +
        '<div class="col">' +
        '<p class="tag rv" style="--d:.1s">ENCONTRO BKO · P&amp;G REGULAR</p>' +
        '<h1><span class="l1 rv" style="--d:.3s">BKO <span class="deg">360°<svg class="orb" viewBox="0 0 460 210" aria-hidden="true"><ellipse cx="230" cy="105" rx="212" ry="84"/>' +
        '<circle r="9" fill="#ff3347"><animateMotion dur="7s" repeatCount="indefinite" path="M18 105 a212 84 0 1 0 424 0 a212 84 0 1 0 -424 0"/></circle>' +
        '<circle r="4" fill="#fff"><animateMotion dur="7s" repeatCount="indefinite" path="M18 105 a212 84 0 1 0 424 0 a212 84 0 1 0 -424 0"/></circle></svg></span></span>' +
        '<span class="l2 rv" style="--d:.55s">Do processo<br>ao <em>propósito</em></span></h1>' +
        '<hr>' +
        '<p class="who rv" style="--d:1.1s"><b>Nicolas</b> · Treinamento &nbsp;|&nbsp; <b>Arthur</b> · Inteligência</p>' +
        '<div class="sch rv" style="--d:1.3s"><span class="pc a">Manhã 10h–12h</span><i class="ln"></i><span class="pc b">Tarde 14h–16h</span></div>' +
        '<p class="go rv" style="--d:1.5s">Você sai sabendo <em style="font-style:normal;color:#ff3347">orquestrar a IA</em></p>' +
        '</div>';
    },
    enter: function (el) {
      startCss(el);
      var o = $(el, '.orb'); if (o && o.unpauseAnimations) { try { if (el.classList.contains('rm')) o.pauseAnimations(); else o.unpauseAnimations(); } catch (e) { } }
    },
    leave: function (el) {
      el.classList.remove('on');
      var o = $(el, '.orb'); if (o && o.pauseAnimations) { try { o.pauseAnimations(); } catch (e) { } }
    },
    step: function () { },
    notes: "TEMPO: 5 min. Nicolas abre.\nFALA (Nicolas): \"Bom dia! Hoje não estamos aqui para aprender a fazer mais tarefas. Estamos aqui para enxergar o que existe por trás das tarefas que já fazemos, e para sair com uma delas melhor.\"\nAPOIO: apresentar os dois facilitadores (Nicolas, treinamento; Arthur, inteligência). Formato: dois blocos de duas horas, manhã 10h às 12h e tarde das 14h às 16h. Antecipar a tarde: cada pessoa aprende a orquestrar a IA e sai com o compromisso de escrever o plano de uma tarefa sua. Combinados: celular no silencioso, participação, ninguém está sendo avaliado.\nTRANSIÇÃO: \"Para começar, vamos olhar para onde o nosso trabalho ganha vida: a loja.\" (passa para a cadeia)"
  });

  /* ===================================================================
     2 · CADEIA
     =================================================================== */
  css('css-manha-cadeia', S('cadeia', [
    '&.st{background:#fafafa url("img/claro-bracos-cruzados.jpg") 0 0/1600px 900px no-repeat}',
    '& .ttl{width:850px;font-size:58px}',
    '& .chain{position:absolute;left:96px;top:486px;width:900px;height:300px}',
    '& .trk{position:absolute;left:100px;top:45px;width:678px;height:6px;border-radius:3px;background:var(--line)}',
    '& .fill{position:absolute;left:0;top:0;bottom:0;width:0;background:var(--red);border-radius:3px}',
    '& .pls{position:absolute;left:0;top:50%;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:#fff;border:7px solid var(--red);box-shadow:0 0 0 10px rgba(227,0,27,.18);opacity:0;z-index:3}',
    '& .nd{position:absolute;top:0;width:200px;text-align:center}',
    '& .cir{position:relative;z-index:2;width:96px;height:96px;margin:0 auto 18px;border-radius:50%;background:#fff;border:3px solid var(--red);display:flex;align-items:center;justify-content:center;transition:background .35s,transform .45s cubic-bezier(.2,.9,.3,1.5),box-shadow .45s}',
    '& .cir svg{width:50px;height:50px;fill:none;stroke:var(--red);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;transition:stroke .3s}',
    '& .nd.lit .cir{background:var(--red);transform:scale(1.12);box-shadow:0 0 0 12px rgba(227,0,27,.16)}',
    '& .nd.lit .cir svg{stroke:#fff}',
    '& .nd h3{font-size:36px;font-weight:800;color:var(--ink);transition:color .3s}',
    '& .nd.lit h3{color:var(--red)}',
    '& .nd p{font-size:22px;line-height:1.35;color:var(--muted);margin-top:8px}',
    '&.rm .nd .cir,&.rm .nd h3{transition:none}'
  ].join('\n')));

  var CH = [
    ['P&amp;G', 'Indústria. Define marcas e metas.', ico('<path d="M6 42V22l12 7V22l12 7V10h8v32z"/><path d="M12 42v-6M22 42v-6M32 42v-6"/>')],
    ['SPOT', 'Agência. Executa e mede.', ico('<circle cx="18" cy="16" r="6"/><circle cx="33" cy="19" r="5"/><path d="M6 40c0-8 5-12 12-12s12 4 12 12M30 29c7-1 13 2 13 10"/>')],
    ['Loja', 'Varejo. Onde a marca aparece.', ico('<path d="M8 20l3-11h26l3 11v3H8zM10 23v17h28V23M20 40V29h8v11"/>')],
    ['Shopper', 'Cliente. Decide em segundos.', ico('<path d="M5 10h6l4 20h21l4-15H13"/><circle cx="19" cy="38" r="3"/><circle cx="33" cy="38" r="3"/>')]
  ];
  var CH_LEN = 678, CH_CYC = 8800;
  function chApply(el, t) {
    var p = seg(t, 400, 4000), reset = t > 8000;
    if (reset) p = 0;
    var nd = $$(el, '.nd');
    nd.forEach(function (n, i) { n.classList.toggle('lit', !reset && p >= i / 3 - .002 && t >= 400); });
    $(el, '.fill').style.width = (p * CH_LEN) + 'px';
    var d = $(el, '.pls');
    d.style.transform = 'translateX(' + (p * CH_LEN) + 'px) scale(' + (1 + .12 * Math.sin(t / 130)) + ')';
    d.style.opacity = reset ? 0 : (t < 400 ? seg(t, 150, 400) : (t > 4400 ? 1 - seg(t, 4400, 5000) : 1));
  }
  ORQ.add({
    id: 'cadeia', act: 1, mov: 2, order: -29, title: "A P&G paga a SPOT para a marca estar certa na loja.", tone: 'light', steps: 0,
    render: function (el) {
      var nodes = CH.map(function (c, i) {
        return '<div class="nd" style="left:' + (i * 226) + 'px"><div class="cir">' + c[2] + '</div><h3>' + c[0] + '</h3><p>' + c[1] + '</p></div>';
      }).join('');
      el.innerHTML = LOGO + '<p class="eyebrow">Quem é quem</p>' +
        '<h2 class="ttl">A P&amp;G paga a SPOT para a marca <em>estar certa na loja.</em></h2>' +
        '<div class="chain"><div class="trk"><i class="fill"></i><i class="pls"></i></div>' + nodes + '</div>' + foot();
      el.classList.toggle('rm', isRM());
      chApply(el, 4400);
      $(el, '.pls').style.opacity = 0; $(el, '.fill').style.width = CH_LEN + 'px';
      $$(el, '.nd').forEach(function (n) { n.classList.add('lit'); });
    },
    enter: function (el) {
      stopAll(el); el.classList.toggle('rm', isRM());
      if (isRM()) { chApply(el, 4400); $(el, '.pls').style.opacity = 0; return; }
      run(el, function (t) { chApply(el, t % CH_CYC); });
    },
    leave: function (el) { stopAll(el); },
    step: function () { },
    notes: "TEMPO: 5 min. Nicolas.\nFALA (Nicolas): \"Antes de falar de planilhas e indicadores, vamos olhar para onde o nosso trabalho ganha vida. A P&G paga a SPOT para a marca estar certa na loja.\"\nAPOIO: da esquerda para a direita. P&G é a indústria e define as marcas e as metas. A SPOT é a agência que coloca os promotores na rua, executa e mede. A loja é o varejo, onde a marca aparece. O shopper é o cliente, que decide a compra em segundos na frente da gôndola. Tudo o que o BKO faz existe para a SPOT conseguir executar bem entre a indústria e o shopper.\nPERGUNTA PARA A SALA: \"Quem aqui já passou numa gôndola e reconheceu uma coisa que a gente faz?\"\nTRANSIÇÃO: \"Para falar a mesma língua, vou explicar quatro palavras que vocês vão ouvir o dia todo.\" (passa para a loja)"
  });

  /* ===================================================================
     3 · LOJA
     =================================================================== */
  css('css-manha-loja', S('loja', [
    '& .ttl{width:1300px;font-size:62px}',
    '& .row{position:absolute;left:96px;top:340px;width:1408px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}',
    '& .cd{padding:24px;transition:transform .5s cubic-bezier(.2,.8,.2,1),border-color .4s,box-shadow .5s;height:456px}',
    '& .ill{display:block;width:100%;height:auto;background:#f3f1f2;border-radius:12px;margin-bottom:22px}',
    '& .cd h3{font-size:34px;font-weight:800;color:var(--ink);margin-bottom:10px;white-space:nowrap}',
    '& .cd p{font-size:25px;line-height:1.4;color:var(--muted)}',
    '& .n{display:inline-block;width:44px;height:44px;border-radius:50%;background:var(--red);color:#fff;font:800 24px/44px var(--font);text-align:center;margin-right:12px;vertical-align:4px}',
    '&.on .cd{animation:stl-in .8s cubic-bezier(.2,.8,.2,1) both var(--d),stl-hl 12s ease-in-out infinite var(--h)}',
    '@keyframes stl-in{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}',
    '@keyframes stl-hl{0%,2%{transform:none;border-color:var(--line);box-shadow:var(--shadow)}6%,22%{transform:translateY(-12px);border-color:var(--red);box-shadow:0 26px 50px rgba(227,0,27,.22)}28%,100%{transform:none;border-color:var(--line);box-shadow:var(--shadow)}}',
    '& .bx{transform-box:fill-box;transform-origin:50% 100%}',
    '&.on .bx{animation:stl-fill 6s ease-in-out infinite both;animation-delay:var(--b)}',
    '@keyframes stl-fill{0%{transform:scaleY(0)}7%{transform:scaleY(1.1)}10%,84%{transform:scaleY(1)}92%,100%{transform:scaleY(0)}}',
    '&.on .gap{animation:stl-blink 1.3s ease-in-out infinite}',
    '@keyframes stl-blink{0%,100%{opacity:.25}50%{opacity:1}}',
    '& .gap{transform-box:fill-box;transform-origin:center}',
    '&.on .hop{animation:stl-hop 1.6s ease-in-out infinite both;animation-delay:var(--b)}',
    '& .hop{transform-box:fill-box;transform-origin:50% 100%}',
    '@keyframes stl-hop{0%,100%{transform:translateY(0)}30%{transform:translateY(-14px)}60%{transform:translateY(0)}}',
    '&.on .belt{animation:stl-belt 4s linear infinite both;animation-delay:var(--b)}',
    '@keyframes stl-belt{0%{transform:translateX(0);opacity:0}8%{opacity:1}80%{transform:translateX(118px);opacity:1}92%,100%{transform:translateX(118px);opacity:0}}',
    '&.on .spk{animation:stl-spk 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}',
    '@keyframes stl-spk{0%,100%{transform:scale(.7) rotate(0);opacity:.6}50%{transform:scale(1.2) rotate(25deg);opacity:1}}'
  ].join('\n')));

  function LB(x, y, w, h, c, b) { return '<rect class="bx" style="--b:' + b + 's" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" fill="' + c + '"/>'; }
  var LJ_ILL = (function () {
    var R = '#e3001b', D = '#333', G = '#a9a5a7', i, s = '', cols = [R, D, R, G, R, D];
    /* 1 gôndola e SKU */
    var hs1 = [50, 56, 46, 52, 58, 48], hs2 = [40, 34, 44, 38, 42, 36];
    var g1 = '<rect x="10" y="100" width="260" height="7" rx="3" fill="#6e6e6e"/><rect x="10" y="160" width="260" height="7" rx="3" fill="#6e6e6e"/>';
    for (i = 0; i < 6; i++) { g1 += LB(20 + i * 42, 100 - hs1[i], 34, hs1[i], cols[i], (i * .18).toFixed(2)); g1 += LB(20 + i * 42, 160 - hs2[i], 34, hs2[i], cols[(i + 3) % 6], (1.2 + i * .18).toFixed(2)); }
    g1 += '<rect x="104" y="2" width="64" height="30" rx="8" fill="#e3001b"/><text x="136" y="24" font-family="Montserrat,Arial" font-weight="800" font-size="22" fill="#fff" text-anchor="middle">SKU</text><path d="M136 32v8" stroke="#e3001b" stroke-width="3" stroke-linecap="round"/>';
    /* 2 ruptura */
    var g2 = '<rect x="10" y="100" width="260" height="7" rx="3" fill="#6e6e6e"/><rect x="10" y="160" width="260" height="7" rx="3" fill="#6e6e6e"/>';
    for (i = 0; i < 6; i++) {
      g2 += LB(20 + i * 42, 100 - hs1[i], 34, hs1[i], cols[i], (i * .15).toFixed(2));
      if (i !== 2) g2 += LB(20 + i * 42, 160 - hs2[i], 34, hs2[i], cols[(i + 3) % 6], (.9 + i * .15).toFixed(2));
    }
    g2 += '<g class="gap"><rect x="104" y="112" width="34" height="46" rx="5" fill="rgba(227,0,27,.08)" stroke="#e3001b" stroke-width="3" stroke-dasharray="6 6"/><text x="121" y="146" font-family="Montserrat,Arial" font-weight="900" font-size="34" fill="#e3001b" text-anchor="middle">!</text></g>';
    /* 3 ponto extra: ilha */
    var g3 = '<rect x="8" y="150" width="264" height="5" rx="2" fill="#d8d5d7"/><rect x="56" y="136" width="168" height="14" rx="4" fill="#333"/><rect x="66" y="150" width="12" height="10" fill="#333"/><rect x="202" y="150" width="12" height="10" fill="#333"/>';
    var rows = [[4, 106], [3, 76], [2, 46], [1, 16]], k = 0, r, j;
    for (r = 0; r < rows.length; r++) {
      var n = rows[r][0], y = rows[r][1], x0 = 140 - (n * 36) / 2 + 2;
      for (j = 0; j < n; j++) { g3 += LB(x0 + j * 36, y + 2, 32, 28, cols[(k++) % 6], (r * .5 + j * .12).toFixed(2)); }
    }
    g3 += '<path class="spk" d="M140 -2l4 9 10 1-8 6 3 10-9-6-9 6 3-10-8-6 10-1z" fill="#e3001b" transform="translate(0,2)"/>';
    /* 4 checkout */
    var g4 = '<rect x="8" y="150" width="264" height="5" rx="2" fill="#d8d5d7"/><rect x="14" y="116" width="170" height="16" rx="8" fill="#333"/>' +
      '<path d="M26 124h146" stroke="#6e6e6e" stroke-width="3" stroke-dasharray="6 8"/><rect x="26" y="132" width="14" height="18" fill="#6e6e6e"/><rect x="158" y="132" width="14" height="18" fill="#6e6e6e"/>' +
      '<rect x="196" y="84" width="64" height="66" rx="8" fill="#e3001b"/><rect x="204" y="92" width="48" height="24" rx="4" fill="#fff"/><path d="M212 104h20" stroke="#e3001b" stroke-width="4" stroke-linecap="round"/>' +
      '<rect x="206" y="124" width="12" height="10" rx="2" fill="#fff"/><rect x="224" y="124" width="12" height="10" rx="2" fill="#fff"/><rect x="242" y="124" width="12" height="10" rx="2" fill="#fff"/>' +
      '<g><rect class="hop" style="--b:0s" x="204" y="46" width="14" height="24" rx="3" fill="#e3001b"/><rect class="hop" style="--b:.3s" x="224" y="46" width="14" height="24" rx="3" fill="#333"/><rect class="hop" style="--b:.6s" x="244" y="46" width="14" height="24" rx="3" fill="#a9a5a7"/><rect x="198" y="70" width="66" height="6" rx="3" fill="#6e6e6e"/></g>' +
      '<rect class="belt" style="--b:0s" x="30" y="96" width="22" height="28" rx="4" fill="#e3001b"/><rect class="belt" style="--b:1.3s" x="30" y="102" width="22" height="22" rx="4" fill="#333"/><rect class="belt" style="--b:2.6s" x="30" y="92" width="22" height="32" rx="4" fill="#a9a5a7"/>';
    return [g1, g2, g3, g4];
  })();
  var LJ = [
    ['Gôndola e SKU', 'A prateleira da categoria. SKU é cada versão de um produto.'],
    ['Ruptura', 'Produto que falta na gôndola. É venda perdida.'],
    ['Ponto extra', 'Espaço negociado fora da gôndola: ilha, ponta, display.'],
    ['Checkout', 'Produtos no caixa, para a compra por impulso.']
  ];
  ORQ.add({
    id: 'loja', act: 1, mov: 2, order: -28, title: "Na loja, quatro coisas fazem a marca vender.", tone: 'light', steps: 0,
    render: function (el) {
      var cards = LJ.map(function (c, i) {
        return '<div class="card cd" style="--d:' + (.25 + i * .15) + 's;--h:' + (1.2 + i * 3) + 's"><svg class="ill" viewBox="0 0 280 170" aria-hidden="true">' + LJ_ILL[i] + '</svg><h3>' + c[0] + '</h3><p>' + c[1] + '</p></div>';
      }).join('');
      el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">A loja em 4 conceitos</p>' +
        '<h2 class="ttl">Na loja, quatro coisas<br><em>fazem a marca vender.</em></h2><div class="row">' + cards + '</div>' + foot();
      if (isRM()) el.classList.add('rm');
    },
    enter: function (el) { startCss(el); },
    leave: function (el) { el.classList.remove('on'); },
    step: function () { },
    notes: "TEMPO: 8 min. Nicolas. Nivelamento superficial: um conceito por vez, sem aprofundar.\nFALA (Nicolas): \"Na loja, quatro coisas fazem a marca vender. Vou passar rapidinho por cada uma.\"\nAPOIO: 1) Gôndola e SKU: a gôndola é a prateleira da categoria; SKU é cada versão de um produto (tamanho, fragrância). 2) Ruptura: o produto falta na gôndola; o shopper leva o do concorrente e a venda se perde. 3) Ponto extra: espaço negociado fora da gôndola, como ilha, ponta ou display. 4) Checkout: produtos no caixa, para a compra por impulso. Mostrar uma foto se tiver.\nPERGUNTA PARA A SALA: \"Alguém já viu uma ruptura no mercado essa semana?\"\nTRANSIÇÃO: \"Agora que sabemos o que acontece na loja, vamos ver quem leva a marca até lá: o promotor.\" (passa para o dia do promotor)"
  });

  /* ===================================================================
     4 · PROMOTOR
     =================================================================== */
  css('css-manha-promotor', S('promotor', [
    '& .ttl{width:1300px;font-size:62px}',
    '& .tl{position:absolute;left:96px;top:340px;width:1408px;height:330px}',
    '& .trk{position:absolute;left:117px;top:112px;width:1174px;height:6px;border-radius:3px;background:var(--line)}',
    '& .fill{position:absolute;left:0;top:0;bottom:0;width:0;background:var(--red);border-radius:3px}',
    '& .stp{position:absolute;top:70px;width:234px;text-align:center}',
    '& .cir{position:relative;z-index:2;width:90px;height:90px;margin:0 auto 18px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:transform .45s cubic-bezier(.2,.9,.3,1.5),box-shadow .45s,background .3s}',
    '& .cir.s{background:var(--red)}',
    '& .cir.o{background:#fff;border:3px solid var(--red)}',
    '& .cir svg{width:46px;height:46px;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}',
    '& .cir.s svg{stroke:#fff}& .cir.o svg{stroke:var(--red)}',
    '& .stp.lit .cir{transform:scale(1.14);box-shadow:0 0 0 12px rgba(227,0,27,.16)}',
    '& .stp.lit .cir.o{background:var(--red)}& .stp.lit .cir.o svg{stroke:#fff}',
    '& .stp h3{font-size:27px;font-weight:800;line-height:1.2;color:var(--ink);padding:0 14px}',
    '& .wk{position:absolute;left:0;top:-30px;width:76px;height:95px;margin-left:-38px;z-index:4;will-change:transform}',
    '& .wk .leg{transform-box:fill-box;transform-origin:50% 0}',
    '&.on .wk.walk .l1{animation:stp-leg .36s ease-in-out infinite alternate}',
    '&.on .wk.walk .l2{animation:stp-leg .36s ease-in-out infinite alternate-reverse}',
    '@keyframes stp-leg{from{transform:rotate(-28deg)}to{transform:rotate(28deg)}}',
    '& .wk.hide{opacity:0}',
    '& .br{position:absolute;left:18px;top:250px;width:904px;height:60px;border:4px solid var(--red);border-top:0;border-radius:0 0 14px 14px;text-align:center;transition:filter .4s}',
    '& .br span{position:absolute;left:50%;top:14px;transform:translateX(-50%);font-size:24px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--red);white-space:nowrap}',
    '& .ban{position:absolute;left:96px;top:700px;width:1408px;display:flex;align-items:center;gap:22px;background:#fff;border:2px solid var(--red);border-radius:16px;padding:22px 34px;transition:box-shadow .5s,transform .5s}',
    '& .ban.hl{box-shadow:0 0 0 8px rgba(227,0,27,.16),0 18px 40px rgba(227,0,27,.22);transform:scale(1.012)}',
    '& .ban i{flex:none;width:60px;height:60px;border-radius:50%;background:var(--red);color:#fff;font:900 36px/60px var(--font);text-align:center;font-style:normal}',
    '& .ban p{font-size:34px;font-weight:700;line-height:1.25;color:var(--ink)}',
    '& .ban p em{font-style:normal;color:var(--red)}'
  ].join('\n')));

  var PR = [
    ['Vaga e admissão', 's', ico('<circle cx="20" cy="16" r="7"/><path d="M6 41c0-9 6-14 14-14s14 5 14 14M37 12v12M31 18h12"/>')],
    ['Celular e uniforme', 's', ico('<rect x="14" y="5" width="20" height="38" rx="4"/><path d="M21 37h6"/>')],
    ['Acesso ao app', 's', ico('<circle cx="16" cy="24" r="8"/><path d="M24 24h19M36 24v8M43 24v6"/>')],
    ['Ajuda de custo e ponto', 's', ico('<circle cx="24" cy="24" r="17"/><path d="M24 12v24M30 18c-1-3-12-4-12 2s12 3 12 9-11 5-13 1"/>')],
    ['Rota e loja', 'o', ico('<path d="M24 43S9 29 9 19a15 15 0 0130 0c0 10-15 24-15 24z"/><circle cx="24" cy="19" r="5"/>')],
    ['Leitura e foto', 'o', ico('<path d="M5 16h8l3-5h16l3 5h8v25H5z"/><circle cx="24" cy="28" r="7"/>')]
  ];
  var PT = [500, 1800, 3100, 4400, 5700, 7000], P_CYC = 10400, P_CW = 1408 / 6;
  function pApply(el, t) {
    var xs = PT.map(function (_, i) { return (i + .5) * P_CW; }), x, i, walking = false, rst = t > 9400, hide = rst;
    if (rst) t = 0;
    if (t <= PT[0]) x = xs[0];
    else if (t >= PT[5]) x = xs[5];
    else {
      for (i = 0; i < 5; i++) if (t < PT[i + 1]) break;
      var p = seg(t, PT[i] + 280, PT[i + 1] - 80);
      walking = p > 0 && p < 1; x = xs[i] + (xs[i + 1] - xs[i]) * ease(p);
    }
    var w = $(el, '.wk');
    w.style.transform = 'translate(' + (x) + 'px,' + (walking ? -Math.abs(Math.sin(t / 95)) * 7 : 0) + 'px)';
    w.classList.toggle('walk', walking); w.classList.toggle('hide', hide);
    $(el, '.fill').style.width = Math.max(0, x - xs[0]) + 'px';
    $$(el, '.stp').forEach(function (s, k) { s.classList.toggle('lit', !rst && t >= PT[k]); });
    $(el, '.ban').classList.toggle('hl', !rst && t >= PT[3]);
  }
  ORQ.add({
    id: 'promotor', act: 1, mov: 2, order: -27, title: "O dia do promotor depende do que o suporte entrega.", tone: 'light', steps: 0,
    render: function (el) {
      var nodes = PR.map(function (c, i) {
        return '<div class="stp" style="left:' + (i * P_CW) + 'px"><div class="cir ' + c[1] + '">' + c[2] + '</div><h3>' + c[0] + '</h3></div>';
      }).join('');
      var wk = '<svg class="wk" viewBox="0 0 56 70" aria-hidden="true"><g class="leg l1"><path d="M28 40v20" stroke="#333" stroke-width="6" stroke-linecap="round"/></g><g class="leg l2"><path d="M28 40v20" stroke="#6e6e6e" stroke-width="6" stroke-linecap="round"/></g>' +
        '<rect x="16" y="22" width="24" height="26" rx="9" fill="#e3001b"/><circle cx="28" cy="12" r="9" fill="#333"/><path d="M18 11a10 10 0 0120 0z" fill="#e3001b"/><path d="M28 62l-6 7h12z" fill="#e3001b" opacity="0"/></svg>';
      el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">Um dia do promotor</p>' +
        '<h2 class="ttl">O dia do promotor <em>depende do que o suporte entrega.</em></h2>' +
        '<div class="tl"><div class="trk"><i class="fill"></i></div>' + nodes + wk + '<div class="br"><span>Entregas do suporte</span></div></div>' +
        '<div class="ban"><i>!</i><p>Antes da loja, o promotor já passou por <em>quatro entregas do suporte.</em></p></div>' + foot();
      el.classList.toggle('rm', isRM());
      pApply(el, 7600);
    },
    enter: function (el) {
      stopAll(el); el.classList.toggle('rm', isRM());
      if (isRM()) { pApply(el, 7600); return; }
      el.classList.add('on');
      run(el, function (t) { pApply(el, t % P_CYC); });
    },
    leave: function (el) { stopAll(el); el.classList.remove('on'); },
    step: function () { },
    notes: "TEMPO: 8 min. Nicolas.\nFALA (Nicolas): \"Vou contar o dia de um promotor do começo. Antes de ele chegar na loja, ele já passou por quatro entregas do suporte.\"\nAPOIO: o promotor foi contratado, recebeu celular e uniforme, entra no app, tem a ajuda de custo e o ponto em dia, segue a rota, chega na loja e faz a leitura com foto. Os quatro círculos vermelhos são entregas do suporte: vagas e admissão, celular e uniforme, acesso ao app, ajuda de custo e ponto. Se uma falha, o promotor não chega na loja ou chega sem condição de trabalhar.\nPERGUNTA PARA A SALA: \"Em qual desses círculos está a tarefa de vocês?\" (deixar cada pessoa responder; anotar o que se repetir)\nTRANSIÇÃO: \"Agora é com vocês: o que acontece quando a tarefa de vocês atrasa?\" (passa para a dinâmica)"
  });

  /* ===================================================================
     6 · DINÂMICA (cronômetro 10:00)
     =================================================================== */
  var DIN_TOTAL = 600000;
  css('css-manha-dinamica', S('dinamica', [
    '&.st{background:var(--stage) url("img/roda-de-conversa.jpg") 60px 0/1600px 900px no-repeat}',
    '& .col{position:absolute;left:96px;top:92px;bottom:40px;width:700px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:24px}',
    '& .tag{font-size:24px;font-weight:700;letter-spacing:2px;color:#fff;background:var(--red);padding:8px 18px;border-radius:6px}',
    '& h2{font-size:54px;font-weight:800;line-height:1.08;color:#fff;letter-spacing:-.5px}',
    '& hr{width:96px;border:0;border-top:4px solid var(--red);margin:0}',
    '& ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}',
    '& li{display:flex;align-items:center;gap:18px;font-size:27px;line-height:1.2;color:#d6d6da}',
    '& li b{flex:none;width:42px;height:42px;border-radius:50%;border:3px solid var(--red);color:#fff;font:800 22px/36px var(--font);text-align:center}',
    '&.on li{animation:std2-in .8s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d)}',
    '@keyframes std2-in{from{opacity:0;transform:translateX(-26px)}to{opacity:1;transform:none}}',
    '& .tmr{margin-top:6px;width:640px}',
    '& .big{font-size:176px;font-weight:900;line-height:1;color:#fff;font-variant-numeric:tabular-nums;letter-spacing:-4px;transition:color .4s,opacity .4s;opacity:.42}',
    '& .tmr.run .big{opacity:1}',
    '& .tmr.warn .big{color:#ff3347;animation:std2-pulse 1s ease-in-out infinite}',
    '& .tmr.end .big{color:#ff3347;animation:std2-flash .7s steps(2,jump-none) infinite}',
    '@keyframes std2-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}',
    '@keyframes std2-flash{0%{opacity:1}100%{opacity:.25}}',
    '& .bar{height:12px;border-radius:6px;background:rgba(255,255,255,.16);overflow:hidden;margin-top:14px}',
    '& .bar i{display:block;height:100%;width:100%;border-radius:6px;background:var(--red);transform-origin:left center}',
    '& .tmr.warn .bar i{background:#ff3347}'
  ].join('\n')));

  function dinShow(el) {
    var D = el.__d, rem = Math.max(0, D.rem), sec = Math.ceil(rem / 1000);
    var big = $(el, '.big'), tmr = $(el, '.tmr');
    var txt = (sec >= 600 ? '10:00' : (('0' + Math.floor(sec / 60)).slice(-2) + ':' + ('0' + (sec % 60)).slice(-2)));
    if (big.textContent !== txt) big.textContent = txt;
    $(el, '.bar i').style.transform = 'scaleX(' + (rem / DIN_TOTAL) + ')';
    tmr.classList.toggle('run', D.n === 1);
    tmr.classList.toggle('warn', D.n === 1 && rem > 0 && rem <= 30000);
    tmr.classList.toggle('end', D.n === 1 && rem <= 0);
  }
  function dinTick(el) {
    var D = el.__d; if (!D.go) return;
    var now = Date.now(); D.rem -= (now - D.last); D.last = now;
    if (D.rem <= 0) { D.rem = 0; D.go = false; }
    dinShow(el);
  }
  function dinGo(el) {
    var D = el.__d; stopAll(el);
    if (D.n !== 1 || D.rem <= 0) { D.go = false; dinShow(el); return; }
    D.go = true; D.last = Date.now(); dinShow(el);
    every(el, function () { dinTick(el); }, 200);
  }
  ORQ.add({
    id: 'dinamica', act: 1, mov: 3, order: -25, title: "Quando a minha tarefa atrasa, o promotor…", tone: 'dark', steps: 1,
    render: function (el) {
      el.__d = { n: 0, rem: DIN_TOTAL, go: false, last: 0 };
      el.innerHTML = LOGO_D + '<div class="col"><p class="tag">DINÂMICA · 10 MIN</p>' +
        '<h2>Quando a minha tarefa atrasa, o promotor…</h2><hr>' +
        '<ol><li style="--d:.3s"><b>1</b>Complete a frase num post-it.</li><li style="--d:.5s"><b>2</b>Cole no mural, na etapa do dia do promotor.</li><li style="--d:.7s"><b>3</b>Vamos ler juntos o que se repete.</li></ol>' +
        '<div class="tmr"><div class="big">10:00</div><div class="bar"><i></i></div></div></div>';
      dinShow(el);
    },
    enter: function (el) { startCss(el); dinGo(el); },
    leave: function (el) { var D = el.__d; if (D.go) dinTick(el); D.go = false; stopAll(el); el.classList.remove('on'); },
    step: function (el, n) {
      var D = el.__d; n = n >= 1 ? 1 : 0;
      if (D.go) dinTick(el);
      if (n === 0) { D.n = 0; D.rem = DIN_TOTAL; D.go = false; stopAll(el); dinShow(el); return; }
      if (D.n === 1 && D.go) return;      /* idempotente: já está rodando */
      D.n = 1;
      if (el.classList.contains('on') || el.__d.entered) dinGo(el); else dinShow(el);
    },
    notes: "TEMPO: 12 min. Nicolas conduz.\nFALA (Nicolas): \"Agora é a vez de vocês. Completem a frase: quando a minha tarefa atrasa, o promotor... Pensem numa tarefa de vocês e escrevam num post-it.\"\nAPOIO: cada pessoa completa a frase pensando numa tarefa dela e cola o post-it no mural, na etapa do dia do promotor que ela afeta. Dar uns 4 minutos para escrever e colar. Depois, leitura em grupo: quais etapas juntaram mais post-its? Onde dá para antecipar o problema? O que é urgência para o Campo? Sem julgamento: o objetivo é enxergar, não achar culpado.\nTRANSIÇÃO: \"Fechando: o que a gente faz aqui chega na loja. Agora o Arthur mostra como a operação mede esse resultado.\" (passa para Lojas Perfeitas)"
  });
  /* o cronômetro só roda enquanto a estação está ativa (entre enter e leave) */
  (function () {
    var o = ORQ.stations[ORQ.stations.length - 1], en = o.enter, lv = o.leave, st = o.step;
    o.enter = function (el) { el.__d.entered = true; en(el); };
    o.leave = function (el) { el.__d.entered = false; lv(el); };
    o.step = function (el, n) { if (el.__d.entered) st(el, n); else { var D = el.__d; n = n >= 1 ? 1 : 0; if (n === 0) { D.n = 0; D.rem = DIN_TOTAL; D.go = false; } else D.n = 1; dinShow(el); } };
  })();

  /* ===================================================================
     7 · NOTA
     =================================================================== */
  css('css-manha-nota', S('nota', [
    '& .ttl{white-space:nowrap;font-size:62px}',
    '& .deco{width:200px;height:220px;border-radius:200px 0 0 0}',
    '& .plus{position:absolute;top:12px;width:36px;height:36px;margin-left:-18px;border-radius:50%;background:#fff;border:3px solid var(--red);color:var(--red);font:900 26px/30px var(--font);text-align:center;z-index:2;opacity:0;transform:scale(.4);transition:opacity .4s .5s,transform .5s .5s cubic-bezier(.2,.9,.3,1.5)}',
    '& .plus.on{opacity:1;transform:none}',
    '& .tr{position:relative}',
    '& .pil{position:absolute;left:96px;top:262px;width:1408px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}',
    '& .pil .card{padding:22px 28px 24px;height:232px;transition:transform .5s cubic-bezier(.2,.9,.3,1.3),border-color .4s,box-shadow .5s,background .4s}',
    '& .pil h3{font-size:68px;font-weight:900;line-height:1;color:var(--red);transition:color .3s}',
    '& .pil .a{font-size:27px;font-weight:700;color:var(--ink);margin-top:12px}',
    '& .pil .b{font-size:24px;line-height:1.35;color:var(--muted);margin-top:6px}',
    '& .pil .card.lit{transform:translateY(-10px);border-color:var(--red);box-shadow:0 22px 44px rgba(227,0,27,.22)}',
    '& .mt{position:absolute;left:96px;top:532px;width:1408px}',
    '& .tr{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}',
    '& .sg{position:relative;height:60px;border-radius:12px;background:var(--gray);overflow:hidden}',
    '& .sg i{position:absolute;left:0;top:0;bottom:0;width:0;background:var(--red);transition:width .9s cubic-bezier(.3,.8,.2,1)}',
    '& .sg:nth-child(2) i{background:#d10a22}& .sg:nth-child(3) i{background:#c41029}& .sg:nth-child(4) i{background:#a50d22}',
    '& .sg.full i{width:100%}',
    '& .sg span{position:absolute;left:0;right:0;top:0;line-height:60px;text-align:center;font-size:26px;font-weight:800;letter-spacing:2px;color:var(--muted);transition:color .5s .35s}',
    '& .sg.full span{color:#fff}',
    '& .sc{display:flex;justify-content:space-between;margin-top:10px;font-size:36px;font-weight:900;color:var(--ink)}',
    '& .sc small{font-size:24px;font-weight:700;color:var(--muted);align-self:center}',
    '& .ban{position:absolute;left:96px;top:698px;width:1408px;display:flex;align-items:center;gap:22px;background:#fff;border:2px solid var(--red);border-radius:16px;padding:22px 34px;transition:box-shadow .5s,transform .5s}',
    '& .ban.hl{box-shadow:0 0 0 8px rgba(227,0,27,.16),0 18px 40px rgba(227,0,27,.22);transform:scale(1.012)}',
    '& .ban svg{flex:none;width:60px;height:60px;padding:14px;border-radius:50%;background:var(--red);fill:none;stroke:#fff;stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round}',
    '& .ban p{font-size:34px;font-weight:700;line-height:1.25;color:var(--ink)}',
    '& .ban p em{font-style:normal;color:var(--red)}',
    '&.rm .pil .card,&.rm .sg i,&.rm .sg span{transition:none}'
  ].join('\n')));

  var NT = [['SOS', 'Share of Shelf', 'Espaço da marca na prateleira.'], ['KBD', 'Execução', 'Versões certas, layout e pontos de contato.'], ['PE', 'Ponto extra', 'Espaços fora da gôndola.'], ['CKO', 'Checkout', 'Presença nos caixas.']];
  function ntSet(el, k) {
    $$(el, '.pil .card').forEach(function (c, i) { c.classList.toggle('lit', i === k - 1 && k < 5); });
    $$(el, '.sg').forEach(function (s, i) { s.classList.toggle('full', i < Math.min(k, 4)); });
    $$(el, '.plus').forEach(function (p, i) { p.classList.toggle('on', k > i + 1); });
    $(el, '.ban').classList.toggle('hl', k >= 4);
  }
  ORQ.add({
    id: 'nota', act: 1, mov: 4, order: -24, title: "Cada loja recebe uma nota de 0 a 100.", tone: 'light', steps: 0,
    render: function (el) {
      var cards = NT.map(function (c) { return '<div class="card"><h3>' + c[0] + '</h3><p class="a">' + c[1] + '</p><p class="b">' + c[2] + '</p></div>'; }).join('');
      var segs = NT.map(function (c) { return '<div class="sg"><i></i><span>' + c[0] + '</span></div>'; }).join('');
      el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">Lojas Perfeitas</p>' +
        '<h2 class="ttl">Cada loja recebe <em>uma nota de 0 a 100.</em></h2><div class="pil">' + cards + '</div>' +
        '<div class="mt"><div class="tr">' + segs + '<i class="plus" style="left:346px">+</i><i class="plus" style="left:704px">+</i><i class="plus" style="left:1062px">+</i></div><div class="sc"><span>0</span><span>100</span></div></div>' +
        '<div class="ban"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40V24M20 40V12M32 40V28M44 40H4"/></svg><p>A média das lojas lidas no mês <em>é a nota da operação.</em></p></div>' + foot();
      el.classList.toggle('rm', isRM());
      ntSet(el, 5);
    },
    enter: function (el) {
      stopAll(el); el.classList.toggle('rm', isRM());
      if (isRM()) { ntSet(el, 5); return; }
      var t0 = Date.now();
      ntSet(el, 0);
      every(el, function () {
        var t = (Date.now() - t0) % 11000, k = t < 600 ? 0 : Math.min(4, Math.floor((t - 600) / 1700) + 1);
        if (t > 9800) k = 0;
        ntSet(el, k);
      }, 120);
    },
    leave: function (el) { stopAll(el); },
    step: function () { },
    notes: "TEMPO: 4 min. Arthur.\nTRANSIÇÃO DE ENTRADA (Arthur assume): \"Agora que vimos o que acontece na ponta, vamos ver como a operação acompanha o resultado. É aqui que entram a nota das lojas e o PI.\" Arthur. Lojas Perfeitas é a nota de execução de cada loja, todo mês, de 0 a 100. Ela soma quatro pilares: SOS (espaço na prateleira), KBD (as mecânicas de execução da marca), Ponto Extra e Checkout. A nota só existe se a loja foi lida: loja sem leitura não entra na média. Essa nota pesa no PI, na remuneração dos coordenadores e na negociação da P&G com o varejo.\nTRANSIÇÃO: \"Mas uma nota só vale se ela se mexe. Vamos ver a régua.\" (passa para a régua)"
  });

  /* ===================================================================
     8 · RÉGUA
     =================================================================== */
  var RW = 1408;
  function rx(v) { return (v - 70) / 30 * RW; }
  css('css-manha-regua', S('regua', [
    '& .ttl{white-space:nowrap}',
    '& .rg{position:absolute;left:96px;top:250px;width:1408px;height:380px}',
    '& .z{position:absolute;top:130px;height:72px;transform-origin:left center}',
    '& .z1{left:0;width:' + rx(77) + 'px;background:#333;border-radius:16px 0 0 16px}',
    '& .z2{left:' + rx(77) + 'px;width:' + (rx(86) - rx(77)) + 'px;background:#dedcdd}',
    '& .z3{left:' + rx(86) + 'px;width:' + (RW - rx(86)) + 'px;background:var(--red);border-radius:0 16px 16px 0}',
    '& .zl{position:absolute;top:130px;height:72px;line-height:72px;text-align:center;font-size:27px;font-weight:700}',
    '& .num{position:absolute;top:218px;font-size:42px;font-weight:900;line-height:1}',
    '& .mk{position:absolute;top:60px;width:4px;height:70px;transform-origin:bottom center}',
    '& .lb{position:absolute;top:18px;font-size:28px;font-weight:800;white-space:nowrap}',
    '& .tr{position:absolute;top:116px;left:' + rx(75.53) + 'px;height:10px;width:0;background:var(--red);border-radius:5px}',
    '& .ball{position:absolute;top:150px;left:' + rx(75.53) + 'px;width:36px;height:36px;margin:0 0 0 -18px;border-radius:50%;background:#fff;border:8px solid var(--red);box-shadow:0 6px 18px rgba(227,0,27,.45);z-index:3}',
    '& .bd{position:absolute;top:66px;transform:translateX(-50%);background:var(--red);color:#fff;font-size:28px;font-weight:800;border-radius:999px;padding:4px 18px;white-space:nowrap;font-variant-numeric:tabular-nums}',
    '& .df{position:absolute;top:76px;left:' + ((rx(75.53) + rx(78.75)) / 2) + 'px;transform:translateX(-50%);background:#fff;border:3px solid var(--red);color:var(--red);font-size:30px;font-weight:900;border-radius:999px;padding:2px 16px;white-space:nowrap}',
    '& .gp{position:absolute;top:296px;left:' + rx(78.75) + 'px;width:' + (rx(86) - rx(78.75)) + 'px;height:30px;border:4px solid var(--red);border-top:0;transform-origin:left center}',
    '& .gpl{position:absolute;top:338px;left:' + ((rx(78.75) + rx(86)) / 2) + 'px;transform:translateX(-50%);font-size:40px;font-weight:900;color:var(--red);white-space:nowrap}',
    '& .ban{position:absolute;left:96px;top:690px;width:1408px;display:flex;align-items:center;gap:22px;background:#fff;border:2px solid var(--red);border-radius:16px;padding:22px 34px}',
    '& .ban svg{flex:none;width:60px;height:60px;padding:13px;border-radius:50%;background:var(--red);fill:none;stroke:#fff;stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round}',
    '& .ban p{font-size:34px;font-weight:700;line-height:1.25;color:var(--ink)}',
    '& .ban p em{font-style:normal;color:var(--red)}'
  ].join('\n')));

  function rgApply(el, t) {
    var g = el.__r, z, e;
    for (z = 0; z < 3; z++) { e = eo(seg(t, z * 300, z * 300 + 400)); g.z[z].style.transform = 'scaleX(' + e + ')'; g.zl[z].style.opacity = e; }
    g.nums.forEach(function (n, i) { n.style.opacity = eo(seg(t, 500 + i * 120, 800 + i * 120)); });
    var m1 = eo(seg(t, 900, 1400));
    g.mk1.style.transform = 'scaleY(' + m1 + ')'; g.lb1.style.opacity = m1;
    var mv = ease(seg(t, 1700, 3900)), x0 = rx(75.53), x1 = rx(78.75), val = 75.53 + (78.75 - 75.53) * mv;
    var moving = t >= 1500 && t < 3900;
    g.ball.style.opacity = t >= 1300 ? 1 : 0;
    g.ball.style.left = (x0 + (x1 - x0) * mv) + 'px';
    g.tr.style.width = ((x1 - x0) * mv) + 'px';
    g.bd.style.left = (x0 + (x1 - x0) * mv) + 'px'; g.bd.textContent = fmt(val, 2);
    g.bd.style.opacity = moving ? eo(seg(t, 1500, 1800)) : (t >= 3900 ? 1 - seg(t, 3900, 4200) : 0);
    var m2 = eo(seg(t, 3900, 4400));
    g.mk2.style.transform = 'scaleY(' + m2 + ')'; g.lb2.style.opacity = m2;
    var d = eo(seg(t, 4100, 4600));
    g.df.style.opacity = d; g.df.style.transform = 'translateX(-50%) scale(' + (.6 + .4 * d) + ')';
    var gp = eo(seg(t, 4800, 5600));
    g.gp.style.transform = 'scaleX(' + gp + ')'; g.gpl.style.opacity = eo(seg(t, 5300, 5800));
    var pl = t > 5800 ? 1 + .06 * Math.sin((t - 5800) / 260) : 1;
    g.gpl.style.transform = 'translateX(-50%) scale(' + pl + ')';
    return t < 5800 || true;
  }
  ORQ.add({
    id: 'regua', act: 1, mov: 4, order: -23, title: "77 é o mínimo. 86 é o alvo.", tone: 'light', steps: 0,
    render: function (el) {
      var n = function (v, x, al, c) { return '<p class="num" style="' + (al === 'l' ? 'left:0' : al === 'r' ? 'right:0' : 'left:' + (x - 60) + 'px;width:120px;text-align:center') + ';color:' + c + '">' + v + '</p>'; };
      el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">A régua</p>' +
        '<h2 class="ttl">77 é o mínimo. <em>86 é o alvo.</em></h2>' +
        '<div class="rg">' +
        '<i class="z z1"></i><i class="z z2"></i><i class="z z3"></i>' +
        '<p class="zl" style="left:0;width:' + rx(77) + 'px;color:#fff">crítica</p><p class="zl" style="left:' + rx(77) + 'px;width:' + (rx(86) - rx(77)) + 'px;color:#333">intermediária</p><p class="zl" style="left:' + rx(86) + 'px;width:' + (RW - rx(86)) + 'px;color:#fff">alvo</p>' +
        n('70', 0, 'l', '#6e6e6e') + n('77', rx(77), 'c', '#333') + n('86', rx(86), 'c', '#e3001b') + n('100', 0, 'r', '#333') +
        '<i class="mk mk1" style="left:' + (rx(75.53) - 2) + 'px;background:#6e6e6e"></i><p class="lb lb1" style="right:' + (RW - rx(75.53) + 14) + 'px;color:#6e6e6e;text-align:right">mar/26 · 75,53</p>' +
        '<i class="tr"></i><i class="mk mk2" style="left:' + (rx(78.75) - 2) + 'px;background:#e3001b"></i><p class="lb lb2" style="left:' + (rx(78.75) + 14) + 'px;color:#e3001b">set/26 · 78,75</p>' +
        '<i class="ball"></i><p class="bd">75,53</p><p class="df">+3,2</p>' +
        '<i class="gp"></i><p class="gpl">faltam 7,25</p></div>' +
        '<div class="ban"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 28h9l5-16 8 28 6-20 4 8h8"/></svg><p>Subimos 3,2 pontos desde março. <em>Faltam 7,25 para o alvo.</em></p></div>' +
        foot('Média das lojas lidas · Perfect Stores 5.0 · BKO 360°');
      el.__r = { z: $$(el, '.z'), zl: $$(el, '.zl'), nums: $$(el, '.num'), mk1: $(el, '.mk1'), mk2: $(el, '.mk2'), lb1: $(el, '.lb1'), lb2: $(el, '.lb2'), ball: $(el, '.ball'), tr: $(el, '.tr'), bd: $(el, '.bd'), df: $(el, '.df'), gp: $(el, '.gp'), gpl: $(el, '.gpl') };
      el.__r.mk1.style.transformOrigin = el.__r.mk2.style.transformOrigin = 'bottom center';
      rgApply(el, 9999);
      el.__r.ball.style.opacity = 0; el.__r.bd.style.opacity = 0;
      el.__r.tr.style.width = (rx(78.75) - rx(75.53)) + 'px';
    },
    enter: function (el) {
      stopAll(el);
      if (isRM()) { rgApply(el, 9999); el.__r.ball.style.opacity = 0; return; }
        run(el, function (t) { rgApply(el, t); if (t > 6600) { rgApply(el, 9999 + 0); return false; } });
    },
    leave: function (el) { stopAll(el); },
    step: function () { },
    notes: "TEMPO: 5 min. Arthur.\nFALA (Arthur): \"Essa é a régua da nota. Abaixo de 77 a loja está na faixa crítica. 86 é o alvo.\"\nAPOIO: 77 é o mínimo do contrato; 86 é o alvo da operação. Em março a média era 75,53; em setembro fechou em 78,75. Subimos 3,2 pontos; faltam 7,25 para o alvo. O plano é chegar a 82 em outubro, 84 em novembro e 86 em dezembro. A régua mostra só a parte de 70 a 100, que é onde a operação está.\nPERGUNTA PARA A SALA: \"O que mexe na nota de uma loja?\" (conectar à dinâmica: se o promotor não chega, a loja não é lida e não entra na média)\nTRANSIÇÃO: \"Essa nota não fica só em um painel: ela vira dinheiro. Isso se chama PI.\" (passa para o PI)"
  });

  /* ===================================================================
     9 · FEE (steps 3)
     =================================================================== */
  css('css-manha-fee', S('fee', [
    '& .ttl{white-space:nowrap}',
    '& .top{position:absolute;left:96px;top:258px;width:1408px;display:flex;gap:36px;align-items:stretch}',
    '& .base{position:relative;width:452px;flex:none;border-radius:16px;padding:30px 30px 22px;background:#e3001b;color:#fff;transition:background .6s;overflow:hidden}',
    '& .base.l1{background:#c41029}& .base.l2{background:#a30d22}& .base.l3{background:#7c0a1a}',
    '& .v{font-size:94px;font-weight:900;line-height:1;letter-spacing:-3px;font-variant-numeric:tabular-nums}',
    '& .l1t{font-size:30px;font-weight:700;line-height:1.25;margin-top:8px}',
    '& .l2t{font-size:24px;line-height:1.35;margin-top:6px}',
    '& .base.bump{animation:stf-bump .7s cubic-bezier(.2,.9,.3,1.4)}',
    '@keyframes stf-bump{0%{transform:scale(1)}30%{transform:scale(1.045) rotate(-.6deg)}60%{transform:scale(.99)}100%{transform:scale(1)}}',
    '& .tb{flex:1;background:#fff;border:2px solid var(--line);border-radius:16px;overflow:hidden;box-shadow:var(--shadow)}',
    '& .hd,& .rw{display:grid;grid-template-columns:30% 31% 39%;align-items:center;padding:0 26px}',
    '& .bar{height:34px;border-radius:999px;background:rgba(255,255,255,.22);margin-top:22px;overflow:hidden}',
    '& .bar i{display:block;height:100%;width:100%;background:#fff;border-radius:999px;transition:width .8s cubic-bezier(.2,.9,.3,1)}',
    '& .v2{font-size:36px;font-weight:900;line-height:1.1;margin-top:16px;white-space:nowrap}',
    '&.rm .bar i{transition:none}',
    '& .hd{height:50px;background:#333;color:#fff;font-size:24px;font-weight:700}',
    '& .rw{height:72px;font-size:30px;color:var(--ink);border-top:2px solid var(--line);transition:background .5s}',
    '& .rw:first-of-type{border-top:0}',
    '& .rw .nm{display:flex;align-items:center;gap:14px;font-weight:700}',
    '& .rw .nm svg{width:38px;height:38px;fill:none;stroke:var(--ink);stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round;flex:none;transition:stroke .4s}',
    '& .rw .nm .x{opacity:0;stroke:var(--red);transition:opacity .4s}',
    '& .rw .mt{font-weight:600}',
    '& .rw .pn{text-align:right;color:var(--red);font-weight:800;font-size:26px;transition:transform .45s cubic-bezier(.2,.9,.3,1.5)}',
    '& .rw.fail{background:#fbe5e8}',
    '& .rw.fail .nm svg{stroke:var(--red)}& .rw.fail .nm .x{opacity:1}',
    '& .rw.fail .pn{transform:scale(1.08);transform-origin:right center}',
    '& .bot{position:absolute;left:96px;top:556px;width:1408px;background:#fff;border:2px solid var(--red);border-radius:16px;padding:18px 28px 20px}',
    '& .bot>p{font-size:27px;font-weight:700;line-height:1.35;color:var(--ink)}',
    '& .bot>p em{font-style:normal;color:var(--red)}',
    '& .bn{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:16px;margin-top:14px;transition:opacity .6s,filter .6s}',
    '& .bn.dim{opacity:.28;filter:grayscale(1)}',
    '& .bn div{background:#fff;border:2px solid var(--line);border-radius:14px;padding:10px 20px}',
    '& .bn div.hi{background:#fbe5e8;border-color:var(--red)}',
    '& .bn p{font-size:23px;font-weight:700;color:var(--muted);white-space:nowrap}',
    '& .bn b{display:block;font-size:34px;font-weight:800;color:var(--ink)}',
    '& .bn .hi b{color:var(--red)}',
    '&.rm .base,&.rm .rw,&.rm .bn{transition:none}'
  ].join('\n')));

  var FD = [['Visitas', '3 de cada 4 lojas', 'perde a maior fatia', .30, ico('<path d="M13 42V8h22v34M8 42h32"/><circle cx="29" cy="26" r="2"/>')],
  ['Leituras ou STAR', '9 de cada 10 lojas', 'perde uma fatia', .17, ico('<path d="M13 42V8h22v34M8 42h32"/><circle cx="29" cy="26" r="2"/>')],
  ['Auditoria', 'nota 8,5 ou mais', 'perde uma fatia', .17, ico('<path d="M13 42V8h22v34M8 42h32"/><circle cx="29" cy="26" r="2"/>')]];
  function feeApply(el, n, anim) {
    var F = el.__f, v = 1, i;
    for (i = 0; i < n; i++) v -= FD[i][3];
    var base = $(el, '.base');
    base.classList.remove('l1', 'l2', 'l3'); if (n > 0) base.classList.add('l' + n);
    $$(el, '.rw').forEach(function (r, k) { r.classList.toggle('fail', k < n); });
    $(el, '.bn').classList.toggle('dim', n > 0);
    if (anim && n !== F.n && !isRM()) { base.classList.remove('bump'); void base.offsetWidth; base.classList.add('bump'); }
    F.n = n;
    $(el, '.bar i').style.width = Math.round(v * 100) + '%';
    $(el, '.v2').textContent = ['Fee cheio', 'Perdeu a maior fatia', 'Perdeu duas fatias', 'Fee mínimo'][n];
  }
  ORQ.add({
    id: 'fee', act: 1, mov: 4, order: -22, title: "O PI define quanto a SPOT recebe.", tone: 'light', steps: 3,
    render: function (el) {
      el.__f = { n: 0, shown: 1, tw: 0 };
      var rows = FD.map(function (r) {
        return '<div class="rw"><span class="nm">' + r[4].replace('</svg>', '<path class="x" d="M17 18l14 14M31 18L17 32"/></svg>') + r[0] + '</span><span class="mt">' + r[1] + '</span><span class="pn">' + r[2] + '</span></div>';
      }).join('');
      el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">PI · Performance Indicator</p>' +
        '<h2 class="ttl">O PI define <em>quanto a SPOT recebe.</em></h2>' +
        '<div class="top"><div class="base"><p class="l1t">Fee do mês</p><div class="bar"><i></i></div><p class="v2">Fee cheio</p><p class="l2t">Cada porta que falha tira uma fatia.</p></div>' +
        '<div class="tb"><div class="hd"><span>Porta de serviço</span><span>Meta</span><span style="text-align:right">Se falhar</span></div>' + rows + '</div></div>' +
        '<div class="bot"><p><em>Sem nenhuma porta falhando</em> e com cada grupo de canal em 70 pontos ou mais, a nota média vale bônus. Falhando nas três portas, o fee chega ao <em>menor valor possível.</em></p>' +
        '<div class="bn"><div><p>Nota média abaixo de 77</p><b>sem bônus</b></div><div><p>77 a 82</p><b>bônus</b></div><div><p>82 a 84</p><b>bônus maior</b></div><div class="hi"><p>acima de 84</p><b>bônus máximo</b></div></div></div>' +
        foot('Fact Sheet PI FY26/27 e JAS’26. Faixas de setembro; a régua muda a cada trimestre. · BKO 360°');
      el.classList.toggle('rm', isRM());
    },
    enter: function (el) { el.classList.toggle('rm', isRM()); feeApply(el, el.__f.n, false); },
    leave: function (el) { el.__f.tw++; stopAll(el); feeApply(el, el.__f.n, false); },
    step: function (el, n) { n = clamp(n | 0, 0, 3); feeApply(el, n, true); },
    notes: "TEMPO: 8 min. Arthur.\nFALA (Arthur): \"O PI é o indicador mensal que a SPOT apresenta à P&G. E ele define o fee, quanto a SPOT recebe.\"\nAPOIO: o fee do mês começa cheio. Três portas de serviço podem tirar uma fatia dele: visitar pelo menos 3 de cada 4 lojas planejadas (é a porta que tira a maior fatia), ler pelo menos 9 de cada 10 lojas (ou 9 de cada 10 lojas STAR, as que ficaram sem leitura no mês anterior) e ter nota de auditoria de pelo menos 8,5. Visita e leitura dependem do promotor estar ativo, equipado e com acesso. É aqui que o BKO entra. A cada clique uma porta falha e o fee perde uma fatia; a barra é só ilustrativa.\nBÔNUS: se nenhuma porta falhar e cada um dos três grupos de canal tiver pelo menos 70 pontos, a nota média define o bônus: abaixo de 77 não há bônus; de 77 a 82, bônus; de 82 a 84, bônus maior; acima de 84, bônus máximo. São as faixas de setembro; a P&G publica régua nova a cada trimestre. Não citar valores nem percentuais do fee.\nPERGUNTA PARA A SALA: \"Qual dessas três portas depende de uma entrega do BKO?\"\nTRANSIÇÃO: \"Agora junta tudo: onde o BKO entra nessa história.\" (passa para a ponte)"
  });

  /* ===================================================================
     10 · PONTE
     =================================================================== */
  css('css-manha-ponte', S('ponte', [
    '& .ttl{white-space:nowrap}',
    '& .sp{position:absolute;left:108px;top:322px;width:5px;height:396px;border-radius:3px;background:var(--line)}',
    '& .sp i{position:absolute;left:0;top:0;width:100%;height:0;background:var(--red);border-radius:3px}',
    '& .dot{position:absolute;left:96px;top:322px;width:30px;height:30px;margin-top:-15px;border-radius:50%;background:#fff;border:7px solid var(--red);box-shadow:0 0 0 10px rgba(227,0,27,.18),0 0 28px rgba(227,0,27,.5);z-index:3;opacity:0}',
    '& .bd{position:absolute;left:136px;width:1368px;height:122px;display:flex;align-items:center;gap:20px;border-radius:16px;padding:0 28px;background:#fff;border:2px solid var(--line);box-shadow:var(--shadow);transition:border-color .4s,box-shadow .4s}',
    '& .bd::before{content:"";position:absolute;left:-26px;top:50%;width:26px;height:5px;margin-top:-2px;background:var(--line);transition:background .4s}',
    '& .bd.lit::before{background:var(--red)}',
    '& .bd.lit{border-color:var(--red);box-shadow:0 0 0 6px rgba(227,0,27,.14),var(--shadow)}',
    '& .bd.r{background:var(--red);border-color:var(--red)}',
    '& .bd h3{flex:none;width:222px;font-size:24px;font-weight:800;letter-spacing:1.5px;color:var(--ink);transition:color .3s}',
    '& .bd.r h3{color:#fff}',
    '& .bd.lit h3{color:var(--red)}& .bd.r.lit h3{color:#fff}',
    '& .pl{display:flex;flex-wrap:wrap;gap:10px}',
    '& .pl span{font-size:24px;font-weight:700;border-radius:999px;padding:8px 17px;transition:transform .45s cubic-bezier(.2,.9,.3,1.5),background .35s,color .35s,opacity .4s,box-shadow .4s}',
    '& .bd.a .pl span{color:var(--red);border:2px solid var(--red);background:#fff}',
    '& .bd.b .pl span{color:var(--ink);background:var(--gray);border:2px solid var(--gray)}',
    '& .bd.r .pl span{color:var(--red);background:#fff;border:2px solid #fff}',
    '& .bd.a .pl span.lit{background:var(--red);color:#fff;transform:scale(1.1)}',
    '& .bd.b .pl span.lit{background:#333;border-color:#333;color:#fff;transform:scale(1.1)}',
    '& .bd.r .pl span.lit{transform:scale(1.12);box-shadow:0 0 0 6px rgba(255,255,255,.4)}',
    '& .pl span.dim{opacity:.3}',
    '& .ar{position:absolute;left:98px;width:26px;height:26px;fill:#c9c6c8;transition:fill .4s}',
    '& .ar.lit{fill:var(--red)}',
    '&.rm .pl span,&.rm .bd,&.rm .ar{transition:none}'
  ].join('\n')));

  var PB = [
    ['BKO ENTREGA', 'a', ['Vagas', 'Admissão', 'Equipamentos', 'Ponto e pessoal', 'Ajuda de custo']],
    ['CAMPO EXECUTA', 'b', ['Promotor na loja', 'Visita', 'Leitura com foto']],
    ['RESULTADO', 'r', ['Nota da loja', 'PI', 'Fee da SPOT']]
  ];
  var PB_TOP = [262, 450, 638], PB_CYC = 11800;
  function pbSched() {
    var L = [], i;
    L.push([0, 'b', 0, 300]);
    for (i = 0; i < 5; i++) L.push([0, 'p', i, 700 + i * 260]);
    L.push([1, 'b', 0, 3000]);
    for (i = 0; i < 3; i++) L.push([1, 'p', i, 3400 + i * 320]);
    L.push([2, 'b', 0, 5400]);
    for (i = 0; i < 3; i++) L.push([2, 'p', i, 5800 + i * 320]);
    return L;
  }
  var PB_S = pbSched();
  function pbApply(el, t) {
    var P = el.__p, rst = t > 10400, d = Math.max(0, t);
    var y;
    var Y0 = 322, Y1 = 510, Y2 = 698;
    if (t < 1900) y = Y0; else if (t < 2900) y = Y0 + (Y1 - Y0) * ease(seg(t, 1900, 2900)); else if (t < 4300) y = Y1; else if (t < 5300) y = Y1 + (Y2 - Y1) * ease(seg(t, 4300, 5300)); else y = Y2;
    P.dot.style.top = y + 'px';
    P.dot.style.opacity = rst ? 0 : (t < 200 ? seg(t, 0, 200) : (t > 8800 ? 1 - seg(t, 8800, 9400) : 1));
    P.fill.style.height = (rst ? 0 : (y - 322)) + 'px';
    P.bd.forEach(function (b, i) { var tt = [300, 3000, 5400][i]; b.classList.toggle('lit', !rst && t >= tt); });
    P.ar.forEach(function (a, i) { a.classList.toggle('lit', !rst && t >= [2400, 4800][i]); });
    PB_S.forEach(function (s) {
      if (s[1] !== 'p') return;
      var span = P.pills[s[0]][s[2]], on = !rst && t >= s[3];
      span.classList.toggle('lit', on); span.classList.toggle('dim', !on);
    });
  }
  ORQ.add({
    id: 'ponte', act: 1, mov: 4, order: -21, title: "Visita e leitura passam pelo BKO.", tone: 'light', steps: 0,
    render: function (el) {
      var bands = PB.map(function (b, i) {
        return '<div class="bd ' + b[1] + '" style="top:' + PB_TOP[i] + 'px"><h3>' + b[0] + '</h3><div class="pl">' + b[2].map(function (p) { return '<span>' + p + '</span>'; }).join('') + '</div></div>';
      }).join('');
      var arr = [[430], [618]].map(function (a) { return '<svg class="ar" style="top:' + (a[0] - 14) + 'px" viewBox="0 0 26 26" aria-hidden="true"><path d="M3 7l10 12L23 7z"/></svg>'; }).join('');
      el.innerHTML = '<div class="deco"></div>' + LOGO + '<p class="eyebrow">A ponte</p>' +
        '<h2 class="ttl">Visita e leitura <em>passam pelo BKO.</em></h2>' +
        '<div class="sp"><i></i></div>' + arr + '<i class="dot"></i>' + bands + foot();
      var bd = $$(el, '.bd');
      el.__p = { dot: $(el, '.dot'), fill: $(el, '.sp i'), bd: bd, ar: $$(el, '.ar'), pills: bd.map(function (b) { return $$(b, '.pl span'); }) };
      el.classList.toggle('rm', isRM());
      el.__p.dot.style.opacity = 0;
    },
    enter: function (el) {
      stopAll(el); el.classList.toggle('rm', isRM());
      var P = el.__p;
      if (isRM()) {
        P.pills.forEach(function (a) { a.forEach(function (s) { s.classList.remove('lit', 'dim'); }); });
        P.bd.forEach(function (b) { b.classList.remove('lit'); }); P.ar.forEach(function (a) { a.classList.remove('lit'); }); P.dot.style.opacity = 0; P.fill.style.height = '396px'; return;
      }
      pbApply(el, 0);
      run(el, function (t) { pbApply(el, t % PB_CYC); });
    },
    leave: function (el) { stopAll(el); },
    step: function () { },
    notes: "TEMPO: 8 min. Arthur.\nFALA (Arthur): \"Esse é o slide mais importante da manhã. Ele liga tudo o que vimos.\"\nAPOIO: Este é o slide mais importante da manhã. Ler de cima para baixo: cada área do BKO aparece na primeira faixa. Sem vaga preenchida, admissão, equipamento, ponto em dia e ajuda de custo paga, o promotor não chega na loja; sem promotor, não há visita nem leitura; sem leitura, a loja fica sem nota e a porta de serviço do PI falha. Perguntar: \"em qual dessas pílulas está o seu trabalho?\"\nTRANSIÇÃO: \"Essa é a lógica da manhã. À tarde vamos fazer o caminho inverso: como melhorar a sua parte da cadeia.\" (passa para o Nicolas, almoço)"
  });

  /* ===================================================================
     11 · ALMOÇO (intervalo)
     =================================================================== */
  css('css-manha-almoco', S('almoco', [
    '&.st{background:var(--stage) url("img/pausa-cafe.jpg") 60px 0/1600px 900px no-repeat}',
    '& .col{position:absolute;left:96px;top:92px;bottom:40px;width:760px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:26px}',
    '& .tag{font-size:24px;font-weight:700;letter-spacing:2px;color:#fff;background:var(--red);padding:8px 18px;border-radius:6px}',
    '& h2{font-size:64px;font-weight:800;line-height:1.06;color:#fff;letter-spacing:-.5px}',
    '& hr{width:96px;border:0;border-top:4px solid var(--red);margin:0}',
    '& .cr{display:flex;flex-direction:column;gap:20px}',
    '& .cr div{display:flex;align-items:center;gap:20px;font-size:34px;font-weight:500;color:#fff}',
    '& .cr svg{flex:none;width:48px;height:48px;fill:none;stroke:var(--red);stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round}',
    '& .cr .c{stroke-dasharray:140;stroke-dashoffset:0}',
    '& .cr .k{stroke-dasharray:40;stroke-dashoffset:0;stroke:#fff}',
    '&.on .cr div{animation:sta-in .8s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d)}',
    '&.on .cr .c{animation:sta-draw .9s ease-out both;animation-delay:calc(var(--d) + .15s)}',
    '&.on .cr .k{animation:sta-draw .6s ease-out both;animation-delay:calc(var(--d) + .6s)}',
    '@keyframes sta-in{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:none}}',
    '@keyframes sta-draw{from{stroke-dashoffset:140}to{stroke-dashoffset:0}}',
    '& .ck{display:flex;align-items:center;gap:24px;margin-top:4px}',
    '& .ck svg{flex:none;width:150px;height:150px;overflow:visible}',
    '& .hh,& .mh{transform-origin:80px 80px}',
    '&.on .hh{animation:sta-h 10s ease-in-out infinite both}',
    '&.on .mh{animation:sta-m 10s ease-in-out infinite both}',
    '&.on .ck svg{animation:sta-cf 10s linear infinite both}',
    '@keyframes sta-h{0%{transform:rotate(0)}62%,100%{transform:rotate(60deg)}}',
    '@keyframes sta-m{0%{transform:rotate(0)}62%,100%{transform:rotate(720deg)}}',
    '@keyframes sta-cf{0%{opacity:0}4%{opacity:1}90%{opacity:1}96%,100%{opacity:0}}',
    '& .hh{transform:rotate(60deg)}',
    '& .ring{transform-origin:80px 80px;opacity:0}',
    '&.on .ring{animation:sta-ring 10s ease-out infinite both}',
    '@keyframes sta-ring{0%,62%{opacity:0;transform:scale(.9)}64%{opacity:.8;transform:scale(1)}80%,100%{opacity:0;transform:scale(1.5)}}',
    '& .tx b{display:block;font-size:46px;font-weight:800;color:#fff;line-height:1.1}',
    '& .tx b em{font-style:normal;color:#ff3347}',
    '& .tx span{display:block;font-size:24px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--stage-muted);margin-top:8px}'
  ].join('\n')));
  ORQ.add({
    id: 'almoco', act: 1, mov: 5, order: -20, title: "No almoço, escolha uma tarefa sua.", tone: 'dark', steps: 0,
    render: function (el) {
      var cr = ['Acontece toda semana', 'Você domina', 'Dá para testar sem pedir aprovação'].map(function (t, i) {
        return '<div style="--d:' + (.5 + i * .45) + 's"><svg viewBox="0 0 48 48" aria-hidden="true"><circle class="c" cx="24" cy="24" r="20"/><path class="k" d="M14 25l7 7 13-15"/></svg><span>' + t + '</span></div>';
      }).join('');
      var ticks = ''; for (var i = 0; i < 12; i++) ticks += '<path d="M80 12v' + (i % 3 ? 6 : 12) + '" stroke="' + (i % 3 ? '#8a8c96' : '#fff') + '" stroke-width="' + (i % 3 ? 3 : 5) + '" stroke-linecap="round" transform="rotate(' + (i * 30) + ' 80 80)"/>';
      var clock = '<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="74" fill="#1d1f25" stroke="#e3001b" stroke-width="6"/><circle class="ring" cx="80" cy="80" r="74" fill="none" stroke="#ff3347" stroke-width="5"/>' + ticks +
        '<g class="hh"><path d="M80 80V44" stroke="#fff" stroke-width="8" stroke-linecap="round"/></g><g class="mh"><path d="M80 80V26" stroke="#ff3347" stroke-width="5" stroke-linecap="round"/></g><circle cx="80" cy="80" r="7" fill="#fff"/></svg>';
      el.innerHTML = LOGO_D + '<div class="col"><p class="tag">LIÇÃO DO ALMOÇO · VOLTAMOS ÀS 14h</p>' +
        '<h2>No almoço, escolha uma tarefa sua.</h2><hr><div class="cr">' + cr + '</div>' +
        '<div class="ck">' + clock + '<p class="tx"><b>Voltamos às <em>14h</em></b><span>2º ato · A orquestra da IA</span></p></div></div>';
      if (isRM()) el.classList.add('rm');
    },
    enter: function (el) { startCss(el); },
    leave: function (el) { el.classList.remove('on'); },
    step: function () { },
    notes: "TEMPO: 3 min. Nicolas fecha a manhã.\nFALA (Nicolas): \"Antes do almoço, uma lição de casa bem pequena: voltem com uma tarefa de vocês na cabeça.\"\nAPOIO: três critérios para escolher: acontece toda semana, você domina, dá para testar sem pedir aprovação. Os três servem para a tarefa ser pequena o bastante para melhorar e testar em 15 dias. Ela vai ser a lição de casa do fim da tarde: escrever o plano dela. Reforçar o horário de volta: 14h.\nTRANSIÇÃO: \"Bom almoço, e nos vemos às 14h com a tarefa escolhida.\" (intervalo)"
  });
})();
