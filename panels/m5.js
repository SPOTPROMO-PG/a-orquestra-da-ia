/* Movimento 5 · Como tocar juntos — boneco, duas-maos, time, time-roteiro, compromisso (palco, 1600×900). */
(function () {
  'use strict';
  window.ORQ = window.ORQ || { stations: [], add: function (s) { this.stations.push(s); } };

  function isRM() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function css(id, txt) {
    if (document.getElementById(id)) return;
    var s = document.createElement('style'); s.id = id; s.textContent = txt; document.head.appendChild(s);
  }
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
  var LOGO = '<img class="logo" src="img/spot-logo.png" alt="SPOT">';
  var LOGO_D = '<img class="logo" src="img/spot-logo-sobre-escuro.png" alt="SPOT">';
  var FOOT = '<p class="foot">BKO 360° · Programa P&amp;G • SPOT</p>';

  css('css-m5', [
    /* ===== boneco ===== */
    '.st-boneco .ttl{font-size:56px;width:880px}',
    '.st-boneco .stp{position:absolute;left:96px;top:300px;width:860px}',
    '.st-boneco .stp div{display:flex;align-items:center;gap:20px;height:56px;font-size:27px;font-weight:600;color:var(--ink)}',
    '.st-boneco .stp b{flex:none;width:44px;height:44px;border-radius:50%;background:var(--red);color:#fff;font:800 24px/44px var(--font);text-align:center}',
    '.st-boneco .fi{position:absolute;left:96px;top:484px;width:860px;height:286px;padding:22px 28px}',
    '.st-boneco .fi h4{margin:0;font-size:22px;font-weight:800;letter-spacing:3px;color:var(--red)}',
    '.st-boneco .fi .mono{margin-top:10px;font:600 26px/1.5 var(--mono);color:var(--ink)}',
    '.st-boneco .fi .mono span{color:var(--muted)}',
    '.st-boneco .pls{margin-top:14px;display:flex;flex-wrap:wrap;gap:10px}',
    '.st-boneco .pl{font-size:22px;font-weight:700;padding:5px 16px;border-radius:999px;border:2px solid var(--line);color:#9a9899;background:#fff;transition:all .35s}',
    '.st-boneco .pl.on{border-color:var(--red);color:var(--red)}',
    '.st-boneco .pl.cur{background:var(--red);border-color:var(--red);color:#fff;transform:scale(1.08)}',
    '.st-boneco .sno{position:absolute;left:1000px;top:112px;width:504px;height:580px;padding:0;overflow:hidden;border-radius:24px;background:#dfe8f2;border-color:#cdd8e6}',
    '.st-boneco .sno svg{display:block;width:100%;height:100%}',
    '.st-boneco .btn-demo.big{position:absolute;left:1000px;top:712px;width:504px;justify-content:center;font-size:28px;padding:20px 30px}',
    '.st-boneco .btn-demo.big svg{width:24px;height:24px}',
    '.st-boneco .p{opacity:0;transform:scale(.45);transform-box:fill-box;transform-origin:50% 100%;transition:opacity .3s,transform .6s cubic-bezier(.2,1.5,.4,1)}',
    '.st-boneco .p.on{opacity:1;transform:none}',
    '.st-boneco .cen{opacity:0;transition:opacity 1s}',
    '.st-boneco .cen.on{opacity:1}',
    '.st-boneco .fl{animation:stb-fall 5s linear infinite;animation-play-state:paused}',
    '.st-boneco.on .fl{animation-play-state:running}',
    '@keyframes stb-fall{0%{transform:translate(0,-20px)}50%{transform:translate(14px,300px)}100%{transform:translate(-6px,620px)}}',

    /* ===== duas-maos ===== */
    '.st-duas-maos .ttl{font-size:58px}',
    '.st-duas-maos .fr{position:absolute;left:96px;top:330px;width:640px}',
    '.st-duas-maos .fr p{position:relative;padding-left:44px;font-size:29px;font-weight:600;line-height:1.35;color:var(--ink);margin-bottom:56px}',
    '.st-duas-maos .fr p::before{content:"";position:absolute;left:0;top:10px;width:20px;height:20px;border-radius:50%;background:var(--red)}',
    '.st-duas-maos .fr p::after{content:"";position:absolute;left:9px;top:34px;width:2px;height:calc(100% + 32px);background:var(--line)}',
    '.st-duas-maos .fr p:last-child::after{display:none}',
    '.st-duas-maos .mm{position:absolute;left:780px;top:320px;width:724px;height:470px;padding:0;overflow:hidden}',
    '.st-duas-maos .mm h4{position:absolute;left:32px;top:22px;margin:0;font-size:22px;font-weight:800;letter-spacing:4px;color:var(--red)}',
    '.st-duas-maos .pc{position:absolute;top:84px;width:310px;height:262px;filter:drop-shadow(0 12px 18px rgba(0,0,0,.16))}',
    '.st-duas-maos .pc div{width:100%;height:100%;border-radius:22px;padding:22px 26px 20px 28px;color:#fff}',
    '.st-duas-maos .pc.l{left:57px}',
    '.st-duas-maos .pc.r{left:367px}',
    '.st-duas-maos .pc.l div{background:var(--red)}',
    '.st-duas-maos .pc.r div{background:#333;-webkit-mask:radial-gradient(circle 40px at 0 50%,transparent 97%,#000 100%);mask:radial-gradient(circle 40px at 0 50%,transparent 97%,#000 100%);padding-left:56px}',
    '.st-duas-maos .pc.l::after{content:"";position:absolute;right:-34px;top:50%;width:68px;height:68px;margin-top:-34px;border-radius:50%;background:var(--red)}',
    '.st-duas-maos .pc b{display:block;font-size:34px;font-weight:800;line-height:1;margin-bottom:10px}',
    '.st-duas-maos .pc h3{font-size:30px;font-weight:800;line-height:1.1;color:#fff}',
    '.st-duas-maos .pc p{font-size:22px;line-height:1.3;margin-top:10px;color:rgba(255,255,255,.92)}',
    '.st-duas-maos .res{position:absolute;left:0;right:0;top:376px;text-align:center;font-size:28px;font-weight:800;color:var(--ink);opacity:0}',
    '.st-duas-maos .res i{display:inline-block;width:34px;height:34px;border-radius:50%;background:var(--red);vertical-align:-8px;margin-right:12px;position:relative}',
    '.st-duas-maos .res i::after{content:"";position:absolute;left:11px;top:6px;width:8px;height:15px;border:solid #fff;border-width:0 4px 4px 0;transform:rotate(40deg)}',
    '.st-duas-maos .spk{position:absolute;left:367px;top:215px;width:0;height:0;border-radius:50%;border:4px solid var(--red);margin:0;opacity:0;transform:translate(-50%,-50%)}',
    '.st-duas-maos.on .pc.l{animation:sdm-l 7s cubic-bezier(.3,.8,.3,1) infinite}',
    '.st-duas-maos.on .pc.r{animation:sdm-r 7s cubic-bezier(.3,.8,.3,1) infinite}',
    '.st-duas-maos.on .res{animation:sdm-res 7s ease-in-out infinite}',
    '.st-duas-maos.on .spk{animation:sdm-spk 7s ease-out infinite}',
    '@keyframes sdm-l{0%,4%{transform:translateX(-120px) rotate(-4deg);opacity:0}16%{opacity:1}34%{transform:translateX(0) rotate(0)}36%{transform:translateX(10px)}40%,88%{transform:translateX(0);opacity:1}96%,100%{transform:translateX(-120px) rotate(-4deg);opacity:0}}',
    '@keyframes sdm-r{0%,4%{transform:translateX(120px) rotate(4deg);opacity:0}16%{opacity:1}34%{transform:translateX(0) rotate(0)}36%{transform:translateX(-10px)}40%,88%{transform:translateX(0);opacity:1}96%,100%{transform:translateX(120px) rotate(4deg);opacity:0}}',
    '@keyframes sdm-res{0%,40%{opacity:0;transform:translateY(12px)}48%,84%{opacity:1;transform:none}92%,100%{opacity:0}}',
    '@keyframes sdm-spk{0%,34%{opacity:0;width:0;height:0}36%{opacity:1;width:20px;height:20px}50%,100%{opacity:0;width:230px;height:230px}}',
    '.st-duas-maos.rm .res{opacity:1}',

    /* ===== time ===== */
    '.st-time .ttl{font-size:60px}',
    '.st-time .mis{position:absolute;left:96px;top:236px;width:1408px;font-size:28px;font-weight:600;color:var(--text)}',
    '.st-time .mis b{color:var(--red);font-weight:800}',
    '.st-time .th{position:absolute;left:96px;top:300px;width:880px;height:44px;display:flex;font-size:22px;font-weight:700;color:var(--muted)}',
    '.st-time .th span{display:block;padding:8px 0 0 20px}',
    '.st-time .rw{position:absolute;left:96px;width:880px;height:64px;display:flex;align-items:center;background:#fff;border:2px solid var(--line);border-radius:14px;transition:background .35s,border-color .35s,transform .35s,box-shadow .35s}',
    '.st-time .rw.act{background:#fff0f1;border-color:var(--red);transform:translateX(10px);box-shadow:0 10px 26px rgba(227,0,27,.16)}',
    '.st-time .rw.ia{background:var(--ink);border-color:var(--ink)}',
    '.st-time .rw.ia.act{background:var(--red);border-color:var(--red)}',
    '.st-time .rw .a{width:170px;padding-left:20px;font-size:28px;font-weight:800;color:var(--ink)}',
    '.st-time .rw .b{width:120px;text-align:center;font-size:30px;font-weight:800;color:var(--red)}',
    '.st-time .rw .c{flex:1;padding-right:16px;font-size:22px;line-height:1.22;color:var(--text)}',
    '.st-time .rw.ia .a,.st-time .rw.ia .b,.st-time .rw.ia .c{color:#fff}',
    '.st-time .rw.ia .b{font-size:24px}',
    '.st-time .ch{position:absolute;left:1086px;width:418px;height:32px;padding:0 16px;display:flex;align-items:center;border-radius:10px;background:#ebeaeb;border:2px solid transparent;font-size:22px;font-weight:700;color:#8a8889;transition:all .35s}',
    '.st-time .ch.lit{background:var(--red);color:#fff;transform:translateX(-8px);box-shadow:0 6px 16px rgba(227,0,27,.28)}',
    '.st-time svg.cn{position:absolute;left:0;top:0;width:1600px;height:900px;pointer-events:none}',
    '.st-time .cn path{fill:none;stroke:var(--red);stroke-width:4;stroke-linecap:round;stroke-dasharray:7 9;transition:opacity .3s;animation:stt-flow 1s linear infinite}',
    '.st-time .cn line{stroke:var(--red);stroke-width:4;stroke-linecap:round;transition:opacity .3s}',
    '@keyframes stt-flow{to{stroke-dashoffset:-32}}',

    /* ===== time-roteiro ===== */
    '.st-time-roteiro .ttl{font-size:60px}',
    '.st-time-roteiro .bl{position:absolute;top:232px;width:264px;height:244px;padding:14px 18px 20px;transition:border-color .4s,background .4s,transform .4s,box-shadow .4s}',
    '.st-time-roteiro .bl b{display:block;font-size:38px;font-weight:800;line-height:1;color:var(--red)}',
    '.st-time-roteiro .bl h3{margin-top:8px;font-size:25px;font-weight:800;line-height:1.15;color:var(--ink)}',
    '.st-time-roteiro .bl p{margin-top:6px;font-size:22px;line-height:1.22;color:var(--text)}',
    '.st-time-roteiro .bl.act{background:var(--red);border-color:var(--red);transform:translateY(-6px);box-shadow:0 16px 34px rgba(227,0,27,.3)}',
    '.st-time-roteiro .bl.act b,.st-time-roteiro .bl.act h3,.st-time-roteiro .bl.act p{color:#fff}',
    '.st-time-roteiro .bl.dn{background:#f0eff0;box-shadow:none}',
    '.st-time-roteiro .bl.dn b,.st-time-roteiro .bl.dn h3,.st-time-roteiro .bl.dn p{color:#9a9899}',
    '.st-time-roteiro .bl.dn::after{content:"";position:absolute;right:16px;top:20px;width:12px;height:22px;border:solid #9a9899;border-width:0 4px 4px 0;transform:rotate(40deg)}',
    '.st-time-roteiro .tp{position:absolute;left:96px;top:494px;width:1408px;height:246px;padding:20px 40px 0;background:#fff;border:3px solid var(--line);border-radius:22px;box-shadow:var(--shadow);transition:border-color .3s}',
    '.st-time-roteiro .tp.run{border-color:var(--ink)}',
    '.st-time-roteiro .tp.warn{border-color:var(--red);animation:str-warn 1s ease-in-out infinite}',
    '.st-time-roteiro .tp.end{border-color:var(--red)}',
    '@keyframes str-warn{0%,100%{box-shadow:0 0 0 0 rgba(227,0,27,.5)}50%{box-shadow:0 0 0 14px rgba(227,0,27,0)}}',
    '.st-time-roteiro .dg{position:absolute;left:40px;top:2px;font-size:168px;font-weight:800;line-height:1.1;letter-spacing:-4px;color:var(--ink);font-variant-numeric:tabular-nums;min-width:640px}',
    '.st-time-roteiro .tp.idle .dg{color:#cfcccd}',
    '.st-time-roteiro .tp.warn .dg,.st-time-roteiro .tp.end .dg{color:var(--red)}',
    '.st-time-roteiro .inf{position:absolute;left:740px;top:24px;width:620px}',
    '.st-time-roteiro .inf small{display:block;font-size:22px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--muted)}',
    '.st-time-roteiro .inf h3{margin-top:8px;font-size:44px;font-weight:800;line-height:1.1;color:var(--ink)}',
    '.st-time-roteiro .inf p{margin-top:10px;font-size:26px;line-height:1.3;color:var(--text)}',
    '.st-time-roteiro .tg{position:absolute;left:740px;top:166px;display:none;font-size:22px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#fff;background:var(--red);border-radius:8px;padding:6px 16px}',
    '.st-time-roteiro .tp.warn .tg,.st-time-roteiro .tp.end .tg{display:inline-block}',
    '.st-time-roteiro .tp.warn .tg{animation:str-blink 1s steps(1) infinite}',
    '@keyframes str-blink{50%{opacity:.35}}',
    '.st-time-roteiro .pb{position:absolute;left:40px;right:40px;bottom:26px;height:16px;border-radius:8px;background:#ebeaeb;overflow:hidden}',
    '.st-time-roteiro .pb i{display:block;height:100%;width:0;background:var(--ink);border-radius:8px;transition:width .3s linear,background .3s}',
    '.st-time-roteiro .tp.warn .pb i,.st-time-roteiro .tp.end .pb i{background:var(--red)}',
    '.st-time-roteiro .tp.warn .pb i{animation:str-blink 1s steps(1) infinite}',
    '.st-time-roteiro .fc{position:absolute;left:96px;top:756px;height:58px;display:flex;align-items:center;gap:14px;padding:0 24px 0 8px;background:#fff;border:2px solid var(--line);border-radius:999px;font-size:24px;font-weight:600;color:var(--ink)}',
    '.st-time-roteiro .fc i{flex:none;width:42px;height:42px;border-radius:50%;background:var(--red);color:#fff;font:800 26px/42px var(--font);text-align:center;font-style:normal}',
    '.st-time-roteiro .btn-demo{position:absolute;right:96px;top:752px;font-size:25px;padding:14px 30px}',
    '.st-time-roteiro .btn-demo svg{width:22px;height:22px}',

    /* ===== compromisso ===== */
    '.st.st-compromisso{background:var(--stage) url("img/medalha.jpg") center/cover no-repeat}',
    '.st-compromisso .col{position:absolute;left:96px;top:110px;width:760px}',
    '.st-compromisso .ttl{font-size:56px}',
    '.st-compromisso .its{position:absolute;z-index:2;left:96px;top:326px;width:700px}',
    '.st-compromisso .it{display:flex;align-items:center;gap:22px;height:100px;padding:0 26px;margin-bottom:18px;background:rgba(29,31,37,.94);border:2px solid #3a3d46;border-radius:18px;font-size:29px;font-weight:700;line-height:1.2;color:#fff}',
    '.st-compromisso .it b{flex:none;width:52px;height:52px;border-radius:50%;background:var(--red);font:800 28px/52px var(--font);text-align:center}',
    '.st-compromisso .it:last-child{background:var(--red);border-color:var(--red)}',
    '.st-compromisso .it:last-child b{background:#fff;color:var(--red)}',
    '.st-compromisso .foot{color:#c4c4ca}',
    '.st-compromisso svg.stf{position:absolute;left:0;top:0;width:1600px;height:900px;pointer-events:none}',
    '.st-compromisso .sl{stroke:#fff;stroke-opacity:.32;stroke-width:2;transform-box:fill-box;transform-origin:0 50%}',
    '.st-compromisso .nt{transform-box:fill-box;transform-origin:50% 100%;fill:#fff}',
    '.st-compromisso .nt.r{fill:#ff3347}',
    '.st-compromisso .bar1{fill:#fff;transform-box:fill-box;transform-origin:50% 50%}',
    '.st-compromisso .rise{fill:#fff;opacity:0}',
    '.st-compromisso .it{opacity:0;transform:translateY(24px)}',
    '.st-compromisso.on .it{animation:stc-in .8s cubic-bezier(.2,.8,.2,1) forwards}',
    '.st-compromisso.on .it:nth-child(1){animation-delay:.25s}.st-compromisso.on .it:nth-child(2){animation-delay:.65s}.st-compromisso.on .it:nth-child(3){animation-delay:1.05s}',
    '@keyframes stc-in{to{opacity:1;transform:none}}',
    '.st-compromisso .sl,.st-compromisso .nt,.st-compromisso .bar1{opacity:0}',
    '.st-compromisso.on .sl{animation:stc-draw 1.4s ease-out 1.5s forwards}',
    '@keyframes stc-draw{0%{opacity:1;transform:scaleX(0)}100%{opacity:1;transform:scaleX(1)}}',
    '.st-compromisso.on .nt{animation:stc-note .6s cubic-bezier(.2,1.5,.4,1) forwards}',
    '@keyframes stc-note{0%{opacity:0;transform:translateY(26px) scale(.4)}100%{opacity:1;transform:none}}',
    '.st-compromisso.on .bar1{animation:stc-bar .8s cubic-bezier(.2,1.4,.4,1) 4.3s forwards}',
    '@keyframes stc-bar{0%{opacity:0;transform:scaleY(0)}100%{opacity:1;transform:scaleY(1)}}',
    '.st-compromisso.on .rise{animation:stc-rise 7s ease-in infinite}',
    '@keyframes stc-rise{0%{opacity:0;transform:translateY(0) rotate(0)}12%{opacity:.4}80%{opacity:.14}100%{opacity:0;transform:translateY(-22px) rotate(10deg)}}',
    '.st-compromisso.rm .it,.st-compromisso.rm .sl,.st-compromisso.rm .nt,.st-compromisso.rm .bar1{opacity:1;transform:none}'
  ].join('\n'));

  /* ====================== BONECO ====================== */
  var PARTS = ['Base', 'Corpo', 'Cabeça', 'Olhos', 'Nariz', 'Boca', 'Chapéu', 'Cachecol', 'Braços', 'Botões', 'Cenário'];
  var SNOW = (function () {
    var st = 'stroke="#b9c7d8" stroke-width="3"';
    var flakes = '';
    for (var i = 0; i < 16; i++) flakes += '<circle class="fl" cx="' + (20 + i * 31) + '" cy="-10" r="' + (3 + (i % 3)) + '" fill="#fff" style="animation-delay:-' + ((i * 0.73) % 5).toFixed(2) + 's"/>';
    return '<svg viewBox="0 0 504 580" aria-hidden="true">' +
      '<g class="cen" data-k="10"><defs><linearGradient id="stb-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16233f"/><stop offset="1" stop-color="#3b5a8c"/></linearGradient></defs>' +
      '<rect width="504" height="580" fill="url(#stb-sky)"/><circle cx="410" cy="92" r="34" fill="#fdf3c8"/><circle cx="424" cy="84" r="30" fill="#1b2c4d" opacity=".0"/>' +
      '<path d="M40 470 L78 360 L116 470 Z M18 500 L78 330 L138 500 Z" fill="#1f4a3c"/><path d="M400 480 L442 350 L484 480 Z" fill="#1f4a3c"/>' +
      '<ellipse cx="252" cy="640" rx="420" ry="150" fill="#f4f8fc"/><ellipse cx="60" cy="600" rx="190" ry="80" fill="#e6eef7"/><ellipse cx="470" cy="610" rx="170" ry="80" fill="#e6eef7"/>' + flakes + '</g>' +
      '<g class="p" data-k="0"><circle cx="252" cy="430" r="92" fill="#fff" ' + st + '/></g>' +
      '<g class="p" data-k="1"><circle cx="252" cy="318" r="70" fill="#fff" ' + st + '/></g>' +
      '<g class="p" data-k="2"><circle cx="252" cy="210" r="52" fill="#fff" ' + st + '/></g>' +
      '<g class="p" data-k="3"><circle cx="234" cy="200" r="6.5" fill="#222"/><circle cx="270" cy="200" r="6.5" fill="#222"/></g>' +
      '<g class="p" data-k="4"><polygon points="250,208 306,216 250,224" fill="#f08a24"/></g>' +
      '<g class="p" data-k="5"><circle cx="226" cy="232" r="3.6" fill="#222"/><circle cx="237" cy="240" r="3.6" fill="#222"/><circle cx="252" cy="243" r="3.6" fill="#222"/><circle cx="267" cy="240" r="3.6" fill="#222"/><circle cx="278" cy="232" r="3.6" fill="#222"/></g>' +
      '<g class="p" data-k="6"><rect x="198" y="156" width="108" height="13" rx="6.5" fill="#222"/><rect x="216" y="104" width="72" height="56" rx="6" fill="#222"/><rect x="216" y="138" width="72" height="14" fill="#e3001b"/></g>' +
      '<g class="p" data-k="7"><rect x="203" y="254" width="98" height="22" rx="11" fill="#e3001b"/><rect x="270" y="266" width="24" height="64" rx="9" fill="#c41029" transform="rotate(8 282 266)"/></g>' +
      '<g class="p" data-k="8"><path d="M192 308 L110 262 M140 280 L122 306 M130 274 L108 270" stroke="#6b4423" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M312 308 L394 262 M364 280 L382 306 M374 274 L396 270" stroke="#6b4423" stroke-width="7" stroke-linecap="round" fill="none"/></g>' +
      '<g class="p" data-k="9"><circle cx="252" cy="296" r="7" fill="#333"/><circle cx="252" cy="320" r="7" fill="#333"/><circle cx="252" cy="344" r="7" fill="#333"/></g>' +
      '</svg>';
  })();
  function bSet(el, n) {
    var S = el.__b; S.n = n;
    el.querySelectorAll('.sno [data-k]').forEach(function (g) { g.classList.toggle('on', +g.getAttribute('data-k') < n); });
    S.pl.forEach(function (p, i) { p.classList.toggle('on', i < n); p.classList.toggle('cur', i === n - 1); });
  }
  ORQ.add({
    id: 'boneco', mov: 5, order: 60, title: 'Vamos montar um boneco de neve juntos.', tone: 'light', steps: 0,
    render: function (el) {
      if (isRM()) el.classList.add('rm');
      var pls = PARTS.map(function (p) { return '<span class="pl">' + p + '</span>'; }).join('');
      el.innerHTML = LOGO + '<p class="eyebrow">Movimento 5 · Como tocar juntos</p>' +
        '<h2 class="ttl">Vamos montar um boneco de neve <em>juntos.</em></h2>' +
        '<div class="stp"><div><b>1</b>Cada pessoa escolhe uma parte.</div><div><b>2</b>Descreve do seu jeito, em voz alta.</div><div><b>3</b>Eu escrevo na ficha, e o boneco se monta na hora.</div></div>' +
        '<div class="card fi"><h4>A FICHA, UMA LINHA POR PARTE</h4><div class="mono">parte: descrição (seu nome)<br><span>nariz: cenoura comprida (…)</span></div><div class="pls">' + pls + '</div></div>' +
        '<div class="card sno">' + SNOW + '</div>' +
        '<button class="btn-demo big" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3 L21 12 L6 21 Z" fill="#fff"/></svg>Montar o boneco ao vivo</button>' + FOOT;
      el.__b = { n: 0, c: 0, pl: [].slice.call(el.querySelectorAll('.pl')) };
      el.querySelector('.btn-demo').addEventListener('click', function () { ORQ.openDemo('demos/boneco.html'); });
      bSet(el, 11);
    },
    enter: function (el) {
      stopAll(el); startCss(el);
      var S = el.__b; S.c = 0;
      if (isRM()) { bSet(el, 11); return; }
      bSet(el, 0);
      later(el, function () {
        every(el, function () {
          S.c = (S.c + 1) % 16;
          bSet(el, S.c <= 11 ? S.c : (S.c < 15 ? 11 : 0));
        }, 850);
        bSet(el, 1); S.c = 1;
      }, 500);
    },
    leave: function (el) { stopAll(el); el.classList.remove('on'); },
    step: function () { },
    notes: "TEMPO: 10 min. Abrir o boneco de neve.\nFALA (Arthur): \"Último movimento: como tocar juntos. E a gente começa brincando: vamos montar um boneco de neve, todo mundo junto. Cada um escolhe uma parte e descreve do seu jeito, em voz alta. Eu escrevo na ficha e o boneco aparece na hora.\"\nCOMO CONDUZIR: abrir o boneco de neve (link no slide). Distribuir as 11 partes entre as pessoas (algumas ficam com duas). Digitar cada descrição no formato \"parte: descrição (nome)\". Não corrigir ninguém: se alguém pedir algo que a página não entende, ela mostra \"não entendi\" ao lado da linha; aproveitar para rir e perguntar \"como eu digo isso de um jeito que ela entenda?\". No fim, ligar \"Mostrar autores\" para ver quem fez cada parte.\nPLANO B: se a internet cair, a ficha continua lendo as linhas; descrever o boneco em voz alta e seguir.\nTRANSIÇÃO: \"Ficou lindo, ou ficou esquisito? E por que a gente fez isso?\" (passa para por que fizemos isso)"
  });

  /* ====================== DUAS-MAOS ====================== */
  ORQ.add({
    id: 'duas-maos', mov: 5, order: 61, title: 'Cada um viu o boneco do seu jeito. Agentes também.', tone: 'light', steps: 0,
    render: function (el) {
      if (isRM()) el.classList.add('rm');
      el.innerHTML = LOGO + '<p class="eyebrow">Movimento 5 · Por que fizemos isso</p>' +
        '<h2 class="ttl">Cada um viu o boneco do seu jeito.<br><em>Agentes também.</em></h2>' +
        '<div class="fr"><p>Vocês viram, ao vivo, como o outro enxerga.</p><p>O trabalho de vocês já é conectado, por arquivos e fluxos.</p><p>Cada agente faz a sua parte. Sempre alguém confere.</p></div>' +
        '<div class="card mm"><h4>AS DUAS MÃOS</h4>' +
        '<div class="pc l"><div><b>1</b><h3>O orquestrador</h3><p>Transforma a sua ideia num pedido bem feito.</p></div></div>' +
        '<div class="pc r"><div><b>2</b><h3>Você</h3><p>Dá a informação, as regras e tudo o que pode acontecer.</p></div></div>' +
        '<div class="spk"></div><div class="res"><i></i>um pedido bem feito</div></div>' + FOOT;
    },
    enter: function (el) { startCss(el); },
    leave: function (el) { el.classList.remove('on'); },
    step: function () { },
    notes: "TEMPO: 3 min.\nFALA (Arthur): \"Por que a gente fez isso? Porque cada um de vocês imaginou o boneco de um jeito, e todo mundo viu, ao vivo, a percepção do outro. É assim que vocês já trabalham: o trabalho de cada um está conectado ao do outro, por arquivos e por fluxos. Uma pessoa atualiza a movimentação, e várias outras usam. E os agentes fazem a mesma coisa: cada um executa a sua parte, e sempre tem alguém para olhar, validar e conferir.\"\nAPOIO: esse trabalho tem duas mãos. Uma é o orquestrador, que pega a sua ideia e transforma num pedido bem feito; pode ser uma IA ou um colega. A outra é você, que dá toda a informação, todas as regras e as variações que podem acontecer. Sem a sua mão, o orquestrador inventa.\nTRANSIÇÃO: \"No boneco, cada um descreveu do seu jeito, sem plano. Agora vamos fazer de novo, com plano, e com uma coisa de verdade.\" (passa para o time de agentes)"
  });

  /* ====================== TIME ====================== */
  var ROLES = [
    ['Regente', '1', 'Objetivo, seu papel e como saber que deu certo. Junta tudo no plano.'],
    ['Dados', '2', 'Dados e envolvidos, e o contexto.'],
    ['Regras', '2', 'Regras e limites, e as etapas.'],
    ['Leitura', '1', 'Quem vai ler, tipo de entrega, formato e visual.'],
    ['Inspetor', '1', 'Três casos para conferir o resultado.'],
    ['IA', 'Arthur', 'Executa o plano, ao vivo.']
  ];
  var PAGES = [['Objetivo', 'Seu papel', 'Como saber que deu certo'], ['Dados e envolvidos', 'Contexto'], ['Regras e limites', 'Etapas'], ['Quem vai ler', 'Tipo de entrega', 'Formato e visual'], ['Três casos para conferir']];
  var ROW_Y = 352, ROW_H = 72, CH_X = 1086;
  var CHIPS = [], GRP = [];
  (function () {
    var y = 336;
    PAGES.forEach(function (g, gi) {
      var y0 = y;
      g.forEach(function (t) { CHIPS.push({ t: t, g: gi, y: y }); y += 36; });
      GRP.push({ top: y0, bot: y - 4, mid: (y0 + y - 4) / 2 });
      y += 10;
    });
  })();
  function tApply(el, idx) {
    var S = el.__t;
    S.rows.forEach(function (r, i) { r.classList.toggle('act', i === idx); });
    S.chips.forEach(function (c, i) { c.classList.toggle('lit', idx === 5 || CHIPS[i].g === idx); });
    var path = S.path, ln = S.ln;
    if (idx < 0) { path.style.opacity = 0; ln.style.opacity = 0; return; }
    var y1 = ROW_Y + idx * ROW_H + ROW_H / 2 - 4, y2, d;
    path.style.opacity = 1;
    if (idx === 5) {
      y2 = (GRP[0].top + GRP[4].bot) / 2;
      ln.setAttribute('y1', GRP[0].top + 4); ln.setAttribute('y2', GRP[4].bot - 4); ln.style.opacity = 1;
      d = 'M976 ' + y1 + ' C1020 ' + y1 + ' 1030 ' + y2 + ' 1066 ' + y2;
    } else {
      y2 = GRP[idx].mid; ln.style.opacity = 0;
      d = 'M976 ' + y1 + ' C1020 ' + y1 + ' 1036 ' + y2 + ' 1076 ' + y2;
    }
    path.setAttribute('d', d);
  }
  ORQ.add({
    id: 'time', mov: 5, order: 62, title: 'Agora a sala é a orquestra.', tone: 'light', steps: 0,
    render: function (el) {
      if (isRM()) el.classList.add('rm');
      var rows = ROLES.map(function (r, i) {
        return '<div class="rw' + (i === 5 ? ' ia' : '') + '" style="top:' + (ROW_Y + i * ROW_H) + 'px;height:' + (ROW_H - 8) + 'px"><span class="a">' + r[0] + '</span><span class="b">' + r[1] + '</span><span class="c">' + r[2] + '</span></div>';
      }).join('');
      var chips = CHIPS.map(function (c) { return '<div class="ch" style="top:' + c.y + 'px;height:32px">' + c.t + '</div>'; }).join('');
      el.innerHTML = LOGO + '<p class="eyebrow">Movimento 5 · Nosso time de agentes</p>' +
        '<h2 class="ttl">Agora a sala é a <em>orquestra.</em></h2>' +
        '<p class="mis"><b>Missão:</b> o Painel de Pendências do BKO, a partir de um plano escrito por vocês.</p>' +
        '<div class="th"><span style="width:170px">Papel</span><span style="width:120px;padding-left:0;text-align:center">Pessoas</span><span>Escreve no plano (as páginas do livro)</span></div>' +
        rows + chips +
        '<svg class="cn" viewBox="0 0 1600 900" aria-hidden="true"><path d="M0 0"/><line x1="1066" y1="340" x2="1066" y2="700" style="opacity:0"/></svg>' + FOOT;
      var S = el.__t = { rows: [].slice.call(el.querySelectorAll('.rw')), chips: [].slice.call(el.querySelectorAll('.ch')), path: el.querySelector('.cn path'), ln: el.querySelector('.cn line'), i: 0 };
      tApply(el, 5);
    },
    enter: function (el) {
      stopAll(el);
      var S = el.__t, seq = [0, 1, 2, 3, 4, 5, -1];
      if (isRM()) { tApply(el, 5); return; }
      S.i = 0; tApply(el, 0);
      every(el, function () { S.i = (S.i + 1) % seq.length; tApply(el, seq[S.i]); }, 2300);
    },
    leave: function (el) { stopAll(el); },
    step: function () { },
    notes: "TEMPO: 3 min (explicação). A dinâmica segue no próximo slide.\nFALA (Arthur): \"Agora a sala é a orquestra, e eu sou a IA. A missão: construir o Painel de Pendências do BKO, aquele controle que hoje fica de cabeça, a partir de um plano escrito por vocês. Cada um tem um papel, e cada papel escreve algumas páginas do livro que a gente viu.\"\nPAPÉIS (7 pessoas): Regente (1): objetivo, seu papel e como saber que deu certo; no fim junta tudo e lê em voz alta. Dados (2): quais dados e quem são os envolvidos (colunas da base: promotor, pendência, área, coordenador, prazo e status; a base é uma planilha de exemplo com dados inventados), e o contexto. Regras (2): regras e limites (o que é atrasada, vence hoje, no prazo; o que sai da conta) e as etapas. Leitura (1): quem vai ler, tipo de entrega, formato e visual (o que aparece primeiro, cores, filtros). Inspetor (1): escolhe três casos para conferir o resultado (um atrasado, um que vence hoje, um resolvido). Sugestão de distribuição, ajustar na hora: Regente, Dados x2, Regras x2, Leitura e Inspetor. Mais de 7 pessoas: Dados e Regras viram trios. Menos de 7: Arthur acumula o Inspetor.\nMATERIAL: gabarito do plano (plano.md) e o painel pronto, para o caso de a execução ao vivo falhar: https://claude.ai/artifact/5BFJberZujsRGFLb5ztsfk (botão \"Usar base de exemplo\").\nTRANSIÇÃO: \"Vamos ao roteiro: vinte e cinco minutos, do plano ao painel.\" (passa para o roteiro)"
  });

  /* ====================== TIME-ROTEIRO ====================== */
  var BLK = [
    [3, 'Papéis', 'Cada um pega o seu.'],
    [8, 'Cada naipe escreve', 'A sua parte do plano, em frases curtas.'],
    [4, 'O regente junta', 'Lê em voz alta. A sala ajusta.'],
    [6, 'A IA executa', 'Ao vivo, com o plano colado.'],
    [4, 'O inspetor confere', 'Três casos. Passou? Aplausos.']
  ];
  function fmt(ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60); }
  function rShow(el) {
    var S = el.__r, tp = S.tp, s = Math.ceil(S.rem / 1000), n = S.n;
    S.cards.forEach(function (c, i) { c.classList.toggle('act', n === i + 1); c.classList.toggle('dn', n > i + 1); });
    tp.classList.remove('idle', 'run', 'warn', 'end');
    if (n === 0) {
      tp.classList.add('idle');
      S.dg.textContent = '25:00'; S.sm.textContent = 'Cronômetro parado'; S.nm.textContent = 'Dinâmica completa'; S.ds.textContent = 'Avance para iniciar o primeiro bloco.';
      S.tg.textContent = ''; S.pb.style.width = '0%';
    } else {
      var b = BLK[n - 1];
      S.dg.textContent = fmt(S.rem); S.sm.textContent = 'Bloco ' + n + ' de 5 · ' + b[0] + ' min'; S.nm.textContent = b[1]; S.ds.textContent = b[2];
      S.pb.style.width = (S.tot ? (100 * (1 - S.rem / S.tot)) : 0).toFixed(1) + '%';
      if (S.rem <= 0) { tp.classList.add('end'); S.tg.textContent = 'Tempo!'; }
      else if (s <= 30) { tp.classList.add('warn'); S.tg.textContent = 'Últimos 30 segundos'; }
      else { tp.classList.add('run'); S.tg.textContent = ''; }
    }
  }
  function rTick(el) {
    var S = el.__r, now = Date.now();
    if (S.running) { S.rem = Math.max(0, S.rem - (now - S.last)); }
    S.last = now;
    if (S.rem <= 0 && S.n > 0) { S.running = false; stopAll(el); }
    rShow(el);
  }
  function rStart(el) {
    var S = el.__r;
    if (S.running) S.rem = Math.max(0, S.rem - (Date.now() - S.last));
    stopAll(el);
    if (!S.entered || S.n === 0 || S.rem <= 0) { S.running = false; return; }
    S.running = true; S.last = Date.now();
    every(el, function () { rTick(el); }, 250);
  }
  ORQ.add({
    id: 'time-roteiro', mov: 5, order: 63, title: '25 minutos, do plano ao painel.', tone: 'light', steps: 5,
    render: function (el) {
      var cards = BLK.map(function (b, i) {
        return '<div class="card bl" style="left:' + (96 + i * 286) + 'px"><b>' + b[0] + ' min</b><h3>' + b[1] + '</h3><p>' + b[2] + '</p></div>';
      }).join('');
      el.innerHTML = LOGO + '<p class="eyebrow">Movimento 5 · A dinâmica</p><h2 class="ttl">25 minutos, do plano ao <em>painel.</em></h2>' + cards +
        '<div class="tp idle"><div class="dg">25:00</div><div class="inf"><small></small><h3></h3><p></p></div><span class="tg"></span><div class="pb"><i></i></div></div>' +
        '<div class="fc"><i>!</i>Só dados fictícios: Promotor A, Coord. 1, Loja X.</div>' +
        '<button class="btn-demo" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3 L21 12 L6 21 Z" fill="#fff"/></svg>Abrir o painel gabarito</button>' + FOOT;
      el.__r = { n: 0, rem: 0, tot: 0, last: 0, running: false, entered: false, tp: el.querySelector('.tp'), dg: el.querySelector('.dg'), sm: el.querySelector('.inf small'), nm: el.querySelector('.inf h3'), ds: el.querySelector('.inf p'), tg: el.querySelector('.tg'), pb: el.querySelector('.pb i'), cards: [].slice.call(el.querySelectorAll('.bl')) };
      el.querySelector('.btn-demo').addEventListener('click', function () { ORQ.openDemo('demos/painel.html'); });
      rShow(el);
    },
    enter: function (el) { var S = el.__r; S.entered = true; rStart(el); rShow(el); },
    leave: function (el) {
      var S = el.__r;
      if (S.running) { S.rem = Math.max(0, S.rem - (Date.now() - S.last)); }
      S.running = false; S.entered = false; stopAll(el); rShow(el);
    },
    step: function (el, n) {
      var S = el.__r; n = Math.max(0, Math.min(5, n | 0));
      if (n !== S.n) {
        S.n = n;
        if (n === 0) { S.rem = 0; S.tot = 0; }
        else { S.tot = BLK[n - 1][0] * 60000; S.rem = S.tot; }
      }
      rStart(el); rShow(el);
    },
    notes: "TEMPO: 25 min (3 + 8 + 4 + 6 + 4, cronometrar). A tarde inteira soma 120 min, sem folga: se atrasar, encurte o boneco.\n1. PAPÉIS (3 min): distribuir os papéis. Cada naipe recebe a pergunta da sua parte (ver slide anterior).\n2. CADA NAIPE ESCREVE (8 min): naipe é cada grupo de papel (Dados, Regras, Leitura). no celular ou no papel, frases curtas. Circular pelas duplas: se alguém travar, perguntar \"como você saberia que deu certo?\".\n3. O REGENTE JUNTA (4 min): o regente lê o plano inteiro em voz alta, na ordem do livro. A sala aponta o que falta ou o que conflita. Arthur digita ou cola no Claude.\n4. A IA EXECUTA (6 min): colar o plano e pedir: \"leia o plano, faça as perguntas que faltarem e depois gere um único arquivo painel.html que leia a planilha de pendências em CSV (uma planilha salva em texto simples) e aplique as regras\". Responder às perguntas da IA com a sala. Enquanto gera, mostrar que ela está seguindo o plano. PLANO B: se demorar ou falhar, abrir o painel.html do gabarito com a base fictícia e seguir.\n5. O INSPETOR CONFERE (4 min): carregar a base fictícia, e o inspetor confere os três casos que escolheu. Se algo estiver errado, mostrar que a correção é no plano, não na bronca. Passou: aplausos.\nMENSAGEM FINAL: \"No boneco, cada um tocou a sua música. Aqui, todo mundo tocou a mesma partitura. Isso é uma orquestra.\"\nTRANSIÇÃO: passar para o Nicolas fechar (compromisso)."
  });

  /* ====================== COMPROMISSO ====================== */
  function noteSvg(x, y, cls, delay) {
    /* nota de colcheia (cabeça, haste e bandeira) com base em (x,y) = centro da cabeça */
    return '<g class="nt ' + cls + '" style="animation-delay:' + delay + 's"><ellipse cx="' + x + '" cy="' + y + '" rx="12" ry="9" transform="rotate(-20 ' + x + ' ' + y + ')"/><rect x="' + (x + 9) + '" y="' + (y - 56) + '" width="4" height="56"/><path d="M' + (x + 13) + ' ' + (y - 56) + ' q 22 10 14 34 q 2 -16 -14 -22 z"/></g>';
  }
  ORQ.add({
    id: 'compromisso', mov: 5, order: 64, title: 'Em 15 dias, sua tarefa ganha um plano.', tone: 'dark', steps: 0,
    render: function (el) {
      if (isRM()) el.classList.add('rm');
      var sl = '', i;
      for (i = 0; i < 5; i++) sl += '<line class="sl" x1="96" x2="752" y1="' + (754 + i * 13) + '" y2="' + (754 + i * 13) + '"/>';
      var notes = '', xs = [150, 240, 330, 420, 510, 600, 690], ys = [793, 780, 767, 754, 767, 780, 793];
      xs.forEach(function (x, k) { notes += noteSvg(x, ys[k], k % 4 === 3 ? 'r' : '', (2.3 + k * 0.22).toFixed(2)); });
      var rise = '', rx = [140, 260, 380, 500, 620, 720];
      rx.forEach(function (x, k) { rise += '<g transform="translate(' + x + ' 745)"><g class="rise" style="animation-delay:' + (1.5 + k * 1.1).toFixed(1) + 's"><ellipse cx="0" cy="0" rx="9" ry="7" transform="rotate(-20)"/><rect x="7" y="-42" width="3" height="42"/><path d="M10 -42 q 16 8 10 26 q 1 -12 -10 -17 z"/></g></g>'; });
      el.innerHTML = LOGO_D +
        '<div class="col"><p class="eyebrow">Fechamento</p><h2 class="ttl">Em 15 dias, sua tarefa ganha <em>um plano.</em></h2></div>' +
        '<div class="its"><div class="it"><b>1</b>Escreva o plano da tarefa do almoço</div><div class="it"><b>2</b>Peça para a IA executar, e confira</div><div class="it"><b>3</b>Retorno em [data do retorno]</div></div>' +
        '<svg class="stf" viewBox="0 0 1600 900" aria-hidden="true">' + rise + sl + notes +
        '<g class="bar1"><rect x="722" y="754" width="3" height="52" /><rect x="732" y="754" width="9" height="52"/></g></svg>' + FOOT;
    },
    enter: function (el) { startCss(el); },
    leave: function (el) { el.classList.remove('on'); },
    step: function () { },
    notes: "TEMPO: 7 min. Nicolas fecha.\nFALA (Nicolas): \"Hoje vocês tocaram numa orquestra. Agora cada um vai reger a sua. Lembram da tarefa que vocês escolheram no almoço? Em 15 dias, ela ganha um plano.\"\nAPOIO: o compromisso tem três partes. 1) Escrever o plano da tarefa do almoço com as dez páginas do livro (objetivo, seu papel, tipo de entrega, quem vai ler, dados, contexto, etapas, regras, como saber que deu certo, formato). Pode pedir para a IA entrevistar vocês. 2) Pedir para a IA executar o plano, só com dados fictícios, e conferir com três casos. 3) No retorno, cada pessoa mostra em 2 minutos o plano, o resultado e o erro que a IA cometeu. Anotar o tempo que a tarefa levava antes e depois. Confirmar a data do retorno antes do encontro.\nFALA FINAL: \"O aprendizado de hoje só tem valor se alguma coisa mudar na prática.\" Agradecer."
  });
})();
