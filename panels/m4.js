/* Movimento 4 · Como entregar — estações juntar, validar, html, html-dia (palco, 1600×900). */
(function () {
  'use strict';
  window.ORQ = window.ORQ || { stations: [], add: function (s) { this.stations.push(s); } };

  /* ---------- utilidades ---------- */
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
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  var LOGO = '<img class="logo" src="img/spot-logo.png" alt="SPOT">';
  var LOGO_D = '<img class="logo" src="img/spot-logo-sobre-escuro.png" alt="SPOT">';
  var FOOT = '<p class="foot">BKO 360° · Programa P&amp;G • SPOT</p>';

  css('css-m4', [
    /* ===== juntar ===== */
    '.st-juntar .ttl{font-size:60px;white-space:nowrap}',
    '.st-juntar .deco{width:200px;height:220px;border-radius:200px 0 0 0}',
    '.st-juntar .cd{position:absolute;top:262px;width:256px;height:294px;padding:26px 24px;display:flex;flex-direction:column;gap:12px;transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .5s,border-color .4s}',
    '.st-juntar .nb{width:56px;height:56px;flex:none;border-radius:50%;background:var(--red);color:#fff;font:800 28px/56px var(--font);text-align:center}',
    '.st-juntar .cd h3{font-size:29px;font-weight:800;line-height:1.15;color:var(--ink)}',
    '.st-juntar .cd p{font-size:24px;line-height:1.35;color:var(--text)}',
    '.st-juntar .cd.val{background:var(--red);border-color:var(--red)}',
    '.st-juntar .cd.val h3,.st-juntar .cd.val p{color:#fff}',
    '.st-juntar .cd.val .nb{background:#fff;color:var(--red)}',
    '.st-juntar .cd.act{transform:translateY(-12px);border-color:var(--red);box-shadow:0 24px 46px rgba(227,0,27,.22)}',
    '.st-juntar .cd.val.act{box-shadow:0 0 0 7px rgba(227,0,27,.22),0 24px 46px rgba(227,0,27,.45)}',
    '.st-juntar .cd.act .nb{animation:stj-pop .8s cubic-bezier(.2,.9,.3,1.4)}',
    '@keyframes stj-pop{0%{transform:scale(.6)}100%{transform:scale(1)}}',
    '.st-juntar svg.circ{position:absolute;left:0;top:0;width:1600px;height:900px;pointer-events:none}',
    '.st-juntar .seg{stroke:var(--line);stroke-width:6;stroke-linecap:round;fill:none;transition:stroke .5s}',
    '.st-juntar .seg.lit{stroke:var(--red)}',
    '.st-juntar .arc{stroke:#c9c6c8;stroke-width:5;stroke-dasharray:3 14;stroke-linecap:round;fill:none;transition:stroke .5s}',
    '.st-juntar .arc.lit{stroke:var(--red)}',
    '.st-juntar .nd{fill:#fff;stroke:var(--line);stroke-width:5;transition:fill .4s,stroke .4s}',
    '.st-juntar .nd.act{fill:var(--red);stroke:var(--red)}',
    '.st-juntar .tick{stroke:var(--line);stroke-width:4;stroke-linecap:round}',
    '.st-juntar .ring{transform-box:fill-box;transform-origin:center;animation:stj-ring 1.2s ease-out infinite}',
    '@keyframes stj-ring{0%{transform:scale(.5);opacity:.55}100%{transform:scale(1.7);opacity:0}}',
    '.st-juntar .lbl{position:absolute;left:944px;top:664px;transform:translate(-50%,-50%);background:var(--soft);padding:6px 18px;border:2px solid var(--red);border-radius:999px;color:var(--red);font-size:22px;font-weight:700;white-space:nowrap}',
    '.st-juntar .ban{position:absolute;left:96px;top:738px;display:flex;align-items:center;gap:20px;background:#fff;border:2px solid var(--line);border-left:8px solid var(--red);border-radius:16px;padding:16px 28px 16px 22px;box-shadow:var(--shadow);max-width:1250px}',
    '.st-juntar .ban i{flex:none;width:48px;height:48px;border-radius:50%;background:var(--red);color:#fff;font:800 30px/48px var(--font);text-align:center;font-style:normal}',
    '.st-juntar .ban p{font-size:26px;line-height:1.3;color:var(--text)}',
    '.st-juntar .ban b{color:var(--ink);font-weight:800}',
    '.st-juntar.rm .cd.val{}',

    /* ===== validar ===== */
    '.st-validar .foot{color:#c4c4ca}',
    '.st.st-validar{background:var(--stage) url("img/alvo-resultado.jpg") center/cover no-repeat}',
    '.st-validar .col{position:absolute;left:96px;top:110px;width:800px}',
    '.st-validar .ttl{font-size:56px;margin-top:16px}',
    '.st-validar .ttl em{color:#ff3347}',
    '.st-validar .sub{font-size:28px;line-height:1.38;color:#d6d6da;margin-top:22px;width:690px}',
    '.st-validar .lane{position:absolute;left:96px;width:700px;height:112px}',
    '.st-validar .lane h4{margin:0;font-size:22px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--stage-muted)}',
    '.st-validar .lane.b h4{color:#fff}',
    '.st-validar .rail{position:absolute;left:12px;right:20px;top:72px;border-top:3px dashed #5b5d66}',
    '.st-validar .lane.b .rail{border-top-color:#8a8c96}',
    '.st-validar .tgt{position:absolute;left:626px;top:44px;width:56px;height:56px;border-radius:50%;background:radial-gradient(circle,var(--red) 0 18%,#fff 18% 38%,var(--red) 38% 62%,#fff 62% 100%)}',
    '.st-validar .tgt::after{content:"";position:absolute;inset:-4px;border-radius:50%;border:3px solid #ff3347;opacity:0}',
    '.st-validar .run{position:absolute;left:12px;top:55px;width:34px;height:34px;border-radius:50%;background:#fff;box-shadow:0 0 22px rgba(255,255,255,.55);opacity:0}',
    '.st-validar .run::before{content:"";position:absolute;right:30px;top:11px;width:80px;height:12px;border-radius:12px;background:linear-gradient(90deg,transparent,rgba(255,51,71,.75))}',
    '.st-validar .run::after{content:"";position:absolute;left:11px;top:9px;border-left:15px solid var(--red);border-top:8px solid transparent;border-bottom:8px solid transparent}',
    '.st-validar .gate{position:absolute;left:372px;top:42px;width:14px;height:60px;border-radius:7px;background:var(--red);box-shadow:0 0 26px rgba(255,51,71,.8);transform-origin:50% 0}',
    '.st-validar .gate.ghost{background:transparent;border:3px dashed #5b5d66;box-shadow:none;width:14px}',
    '.st-validar .chk{position:absolute;left:398px;top:46px;width:48px;height:48px;border-radius:50%;background:#fff;opacity:0;transform:scale(0)}',
    '.st-validar .chk::after{content:"";position:absolute;left:15px;top:9px;width:11px;height:22px;border:solid var(--red);border-width:0 6px 6px 0;transform:rotate(40deg)}',
    '.st-validar .q{position:absolute;left:596px;top:-6px;font-size:44px;font-weight:800;color:#ff3347;opacity:0}',
    '.st-validar .q2{position:absolute;left:520px;top:94px;font-size:22px;font-weight:700;color:#ff8f9c;opacity:0;letter-spacing:2px;text-transform:uppercase}',
    '.st-validar.on .lane.a .run{animation:stv-a 9s linear infinite}',
    '.st-validar.on .lane.a .q{animation:stv-q 9s linear infinite}',
    '.st-validar.on .lane.a .q2{animation:stv-q 9s linear infinite}',
    '.st-validar.on .lane.b .run{animation:stv-b 9s linear infinite}',
    '.st-validar.on .lane.b .gate{animation:stv-gate 9s linear infinite}',
    '.st-validar.on .lane.b .chk{animation:stv-chk 9s linear infinite}',
    '.st-validar.on .lane.b .tgt::after{animation:stv-tgt 9s linear infinite}',
    '@keyframes stv-a{0%{opacity:0;transform:translate(0,0)}4%{opacity:1}36%{transform:translate(430px,0)}50%{transform:translate(560px,-4px)}62%{transform:translate(572px,-40px) rotate(-35deg);opacity:1}74%{transform:translate(610px,-92px) rotate(-60deg);opacity:0}100%{opacity:0;transform:translate(0,0)}}',
    '@keyframes stv-q{0%,60%{opacity:0}66%,86%{opacity:1}94%,100%{opacity:0}}',
    '@keyframes stv-b{0%{opacity:0;transform:translate(0,0) scale(1,1)}4%{opacity:1}28%{transform:translate(326px,0) scale(1,1)}31%{transform:translate(330px,0) scale(.72,1.25)}35%{transform:translate(322px,0) scale(1.18,.84)}40%{transform:translate(326px,0) scale(1,1)}60%{transform:translate(326px,0) scale(1,1)}80%{transform:translate(590px,0) scale(1,1);opacity:1}88%{transform:translate(594px,0);opacity:0}100%{opacity:0;transform:translate(0,0)}}',
    '@keyframes stv-gate{0%,28%{transform:scaleY(1);opacity:1;box-shadow:0 0 26px rgba(255,51,71,.8)}31%{box-shadow:0 0 60px rgba(255,120,130,1)}38%{box-shadow:0 0 26px rgba(255,51,71,.8)}56%{transform:scaleY(1);opacity:1}62%,90%{transform:scaleY(.12);opacity:.25}97%,100%{transform:scaleY(1);opacity:1}}',
    '@keyframes stv-chk{0%,38%{opacity:0;transform:scale(0)}43%{opacity:1;transform:scale(1.25)}47%,58%{opacity:1;transform:scale(1)}64%,100%{opacity:0;transform:scale(0)}}',
    '@keyframes stv-tgt{0%,78%{opacity:0;transform:scale(1)}82%{opacity:1;transform:scale(1)}92%,100%{opacity:0;transform:scale(1.9)}}',
    /* movimento reduzido: estado final estático */
    '.st-validar.rm .lane.a .run{opacity:1;transform:translate(540px,-34px) rotate(-35deg)}',
    '.st-validar.rm .lane.a .q,.st-validar.rm .lane.a .q2{opacity:1}',
    '.st-validar.rm .lane.b .run{opacity:1;transform:translate(326px,0)}',
    '.st-validar.rm .lane.b .chk{opacity:1;transform:scale(1)}',

    /* ===== html ===== */
    '.st-html .ttl{font-size:60px}',
    '.st-html .pan{position:absolute;top:246px;height:400px;border-radius:18px;overflow:hidden}',
    '.st-html .ed{left:96px;width:620px;background:#1b1d23;box-shadow:0 12px 36px rgba(0,0,0,.25)}',
    '.st-html .bar{height:48px;display:flex;align-items:center;gap:10px;padding:0 18px;background:#272a32}',
    '.st-html .bar i{width:14px;height:14px;border-radius:50%;background:#5d606b;display:block}',
    '.st-html .bar i:nth-child(1){background:#ff5f57}.st-html .bar i:nth-child(2){background:#febc2e}.st-html .bar i:nth-child(3){background:#28c840}',
    '.st-html .bar span{margin-left:12px;font:600 22px var(--font);color:#d6d6da}',
    '.st-html .ed .tab{margin-left:auto;font:600 22px var(--mono);color:#9aa}',
    '.st-html .code{margin:0;padding:34px 28px 34px 74px;font:500 30px/58px var(--mono);color:#fff;white-space:pre;position:relative}',
    '.st-html .gut{position:absolute;left:0;top:48px;width:52px;padding-top:34px;text-align:right;font:500 24px/58px var(--mono);color:#5d606b;border-right:2px solid #2e3139;height:352px}',
    '.st-html .code .t{color:#ff8f9c}.st-html .code .a{color:#9ad1ff}.st-html .code .s{color:#f9c97c}.st-html .code .x{color:#fff}',
    '.st-html .caret{display:inline-block;width:3px;height:34px;background:#ff3347;vertical-align:-6px;margin-left:2px;animation:sth-blink .9s steps(1) infinite}',
    '@keyframes sth-blink{50%{opacity:0}}',
    '.st-html .br{left:836px;width:668px;background:#fff;border:2px solid var(--line);box-shadow:var(--shadow)}',
    '.st-html .br .bar{background:#ebeaeb}',
    '.st-html .br .url{margin-left:12px;flex:1;background:#fff;border-radius:999px;padding:4px 18px;font:600 22px var(--font);color:var(--text)}',
    '.st-html .page{padding:22px 32px}',
    '.st-html .page h1{font-size:34px;font-weight:800;color:var(--ink);line-height:1.2;clip-path:inset(0 100% 0 0);transition:clip-path .7s ease}',
    '.st-html .page h1.on{clip-path:inset(0 0 0 0)}',
    '.st-html .al{display:inline-block;margin-top:10px;background:var(--red);color:#fff;font:700 22px var(--font);border-radius:8px;padding:5px 16px;opacity:0;transform:scale(.4);transform-origin:left center;transition:opacity .3s,transform .45s cubic-bezier(.2,.9,.3,1.5)}',
    '.st-html .al.on{opacity:1;transform:scale(1)}',
    '.st-html .lst{margin-top:14px}',
    '.st-html .rw{display:flex;align-items:center;justify-content:space-between;height:40px;padding:0 14px;margin-bottom:4px;border-radius:8px;background:#f1f0f1;border-left:8px solid #c9c6c8;font-size:22px;font-weight:600;color:var(--text);opacity:0;transform:translateX(30px);transition:opacity .35s,transform .35s,background .4s,border-color .4s}',
    '.st-html .rw.in{opacity:1;transform:none}',
    '.st-html .rw b{font-size:22px;font-weight:800;opacity:0;transition:opacity .3s}',
    '.st-html .rw.in.pt b{opacity:1}',
    '.st-html .rw.pt.r{background:#fde3e6;border-color:var(--red)}.st-html .rw.pt.r b{color:var(--red)}',
    '.st-html .rw.pt.y{background:#fff1cc;border-color:#e9a600}.st-html .rw.pt.y b{color:#a86f00}',
    '.st-html .rw.pt.g{background:#dff3e3;border-color:#2e9a4d}.st-html .rw.pt.g b{color:#1f7a3a}',
    '.st-html .mid{position:absolute;left:96px;top:664px;width:1408px;text-align:center;font-size:26px;font-weight:700;color:var(--ink)}',
    '.st-html .mid::before,.st-html .mid::after{content:"";display:inline-block;width:120px;height:2px;background:var(--red);vertical-align:middle;margin:0 18px}',
    '.st-html .bn{position:absolute;top:722px;height:92px;display:flex;align-items:center;gap:14px;padding:0 18px;border-radius:16px;background:#fff;border:2px solid var(--line);box-shadow:var(--shadow);font-size:24px;font-weight:600;line-height:1.25;color:var(--ink)}',
    '.st-html .bn .ck{flex:none;width:34px;height:34px;border-radius:50%;border:3px solid var(--line);position:relative;transition:background .3s,border-color .3s,transform .4s cubic-bezier(.2,.9,.3,1.6)}',
    '.st-html .bn .ck::after{content:"";position:absolute;left:9px;top:4px;width:8px;height:15px;border:solid #fff;border-width:0 4px 4px 0;transform:rotate(40deg);opacity:0;transition:opacity .2s}',
    '.st-html .bn.on .ck{background:var(--red);border-color:var(--red);transform:scale(1.12)}',
    '.st-html .bn.on .ck::after{opacity:1}',
    '.st-html .bn.on{border-color:var(--red)}',

    /* ===== html-dia ===== */
    '.st-html-dia .ttl{font-size:58px}',
    '.st-html-dia .cds{position:absolute;left:96px;top:238px;width:1408px;gap:24px}',
    '.st-html-dia .cds .card{padding:0;overflow:hidden;height:392px;display:flex;flex-direction:column}',
    '.st-html-dia .ill{position:relative;height:196px;background:linear-gradient(180deg,#fbeaec,#f6f3f4);border-bottom:2px solid var(--line);overflow:hidden}',
    '.st-html-dia .tx{padding:20px 28px}',
    '.st-html-dia .tx h3{font-size:29px;font-weight:800;color:var(--ink);line-height:1.15}',
    '.st-html-dia .tx p{font-size:24px;line-height:1.3;margin-top:8px;color:var(--text)}',
    '.st-html-dia .dm{position:absolute;left:96px;top:660px;width:1408px;height:122px;display:flex;align-items:center;gap:28px;padding:0 32px;background:var(--ink);border-radius:20px;color:#fff}',
    '.st-html-dia .dm .pill-red{flex:none}',
    '.st-html-dia .dm .dt{flex:1}',
    '.st-html-dia .dm h3{font-size:32px;font-weight:800;color:#fff}',
    '.st-html-dia .dm p{font-size:24px;line-height:1.3;margin-top:4px;color:#d6d6da}',
    '.st-html-dia .dm .btn-demo{flex:none;font-size:26px;padding:16px 32px}',
    '.st-html-dia .dm .btn-demo svg{width:22px;height:22px}',
    /* ilustração 1: envelope */
    '.st-html-dia .ill svg{position:absolute;left:50%;top:50%;width:300px;height:190px;transform:translate(-50%,-50%);overflow:visible}',
    '.st-html-dia.on .env .flap{animation:std-flap 6s ease-in-out infinite}',
    '.st-html-dia.on .env .flapb{animation:std-flapb 6s ease-in-out infinite}',
    '.st-html-dia.on .env .paper{animation:std-paper 6s ease-in-out infinite}',
    '.st-html-dia .env .flap,.st-html-dia .env .flapb{transform-box:view-box;transform-origin:0 80px}',
    '.st-html-dia .env .flapb{transform:scaleY(0)}',
    '@keyframes std-flapb{0%,12%{transform:scaleY(0)}24%,68%{transform:scaleY(1)}80%,100%{transform:scaleY(0)}}',
    '@keyframes std-flap{0%,8%{transform:scaleY(1)}16%,76%{transform:scaleY(0)}88%,100%{transform:scaleY(1)}}',
    '@keyframes std-paper{0%,12%{transform:translateY(0)}34%,66%{transform:translateY(-62px)}86%,100%{transform:translateY(0)}}',
    /* ilustração 2: gráfico que recalcula */
    '.st-html-dia .gr{position:absolute;left:72px;right:72px;bottom:26px;height:120px;display:flex;align-items:flex-end;gap:16px;border-bottom:3px solid #c9c6c8}',
    '.st-html-dia .gr i{flex:1;height:50%;background:var(--red);border-radius:6px 6px 0 0;display:block;opacity:.9}',
    '.st-html-dia .gr i:nth-child(even){background:var(--ink);opacity:.82}',
    '.st-html-dia .nova{position:absolute;left:28px;top:18px;display:flex;align-items:center;gap:8px;background:#fff;border:2px solid var(--red);border-radius:10px;padding:4px 14px;font-size:22px;font-weight:700;color:var(--red);opacity:0}',
    '.st-html-dia.on .nova{animation:std-nova 6s ease-in-out infinite}',
    '@keyframes std-nova{0%,4%{opacity:0;transform:translateY(-26px)}12%,40%{opacity:1;transform:translateY(0)}50%{opacity:0;transform:translateY(24px)}100%{opacity:0}}',
    '.st-html-dia.on .gr i:nth-child(1){animation:std-b1 6s ease-in-out infinite}',
    '.st-html-dia.on .gr i:nth-child(2){animation:std-b2 6s ease-in-out infinite}',
    '.st-html-dia.on .gr i:nth-child(3){animation:std-b3 6s ease-in-out infinite}',
    '.st-html-dia.on .gr i:nth-child(4){animation:std-b4 6s ease-in-out infinite}',
    '.st-html-dia.on .gr i:nth-child(5){animation:std-b5 6s ease-in-out infinite}',
    '@keyframes std-b1{0%,30%{height:40%}48%,80%{height:78%}95%,100%{height:40%}}',
    '@keyframes std-b2{0%,30%{height:68%}48%,80%{height:44%}95%,100%{height:68%}}',
    '@keyframes std-b3{0%,30%{height:52%}48%,80%{height:92%}95%,100%{height:52%}}',
    '@keyframes std-b4{0%,30%{height:84%}48%,80%{height:60%}95%,100%{height:84%}}',
    '@keyframes std-b5{0%,30%{height:46%}48%,80%{height:70%}95%,100%{height:46%}}',
    /* ilustração 3: central de trabalho */
    '.st-html-dia .ct{position:absolute;left:50%;top:50%;width:330px;height:150px;transform:translate(-50%,-50%);background:#fff;border:3px solid #c9c6c8;border-radius:14px;overflow:hidden}',
    '.st-html-dia .ct::before{content:"";display:block;height:20px;background:#ebeaeb}',
    '.st-html-dia.on .ct{animation:std-ctf 6s ease-in-out infinite}',
    '@keyframes std-ctf{0%,52%{border-color:#c9c6c8;box-shadow:none}62%,90%{border-color:var(--red);box-shadow:0 0 0 6px rgba(227,0,27,.15)}100%{border-color:#c9c6c8;box-shadow:none}}',
    '.st-html-dia .ct i{position:absolute;left:18px;height:32px;width:294px;border-radius:8px;font:700 22px/32px var(--font);font-style:normal;padding-left:14px;color:#fff;background:var(--ink)}',
    '.st-html-dia .ct i:nth-child(1){top:30px;background:var(--red)}.st-html-dia .ct i:nth-child(2){top:70px}.st-html-dia .ct i:nth-child(3){top:110px;background:#6e6e6e}',
    '.st-html-dia.on .ct i:nth-child(1){animation:std-c1 6s cubic-bezier(.3,.8,.3,1) infinite}',
    '.st-html-dia.on .ct i:nth-child(2){animation:std-c2 6s cubic-bezier(.3,.8,.3,1) infinite}',
    '.st-html-dia.on .ct i:nth-child(3){animation:std-c3 6s cubic-bezier(.3,.8,.3,1) infinite}',
    '@keyframes std-c1{0%{transform:translate(-300px,-60px);opacity:0}6%{opacity:1}30%,80%{transform:none;opacity:1}92%,100%{transform:translate(-300px,-60px);opacity:0}}',
    '@keyframes std-c2{0%,8%{transform:translate(340px,20px);opacity:0}14%{opacity:1}38%,80%{transform:none;opacity:1}92%,100%{transform:translate(340px,20px);opacity:0}}',
    '@keyframes std-c3{0%,16%{transform:translate(-100px,120px);opacity:0}22%{opacity:1}46%,80%{transform:none;opacity:1}92%,100%{transform:translate(-100px,120px);opacity:0}}',
    '.st-html-dia.rm .env .flap{transform:scaleY(0)}.st-html-dia.rm .env .flapb{transform:scaleY(1)}.st-html-dia.rm .env .paper{transform:translateY(-62px)}',
    '.st-html-dia.rm .nova{opacity:1}.st-html-dia.rm .gr i:nth-child(1){height:78%}.st-html-dia.rm .gr i:nth-child(2){height:44%}.st-html-dia.rm .gr i:nth-child(3){height:92%}.st-html-dia.rm .gr i:nth-child(4){height:60%}.st-html-dia.rm .gr i:nth-child(5){height:70%}'
  ].join('\n'));

  /* ====================== JUNTAR ====================== */
  var JS = [
    ['Saber o que quer', 'A IA ajuda a descobrir.'],
    ['Montar o plano', 'Prompt, bases e arquivos de apoio.'],
    ['Executar', 'Ela pergunta o que faltar.'],
    ['Validar', 'Você confere tudo.'],
    ['Documentar', 'Vira contexto. Na próxima, comece do passo 2.']
  ];
  function jx(i) { return 96 + i * 288 + 128; }
  var J_Y = 585, ARC = 'M1376 601 C1376 702 512 702 512 601';

  function jReset(el) {
    el.querySelectorAll('.cd').forEach(function (c) { c.classList.remove('act'); });
    el.querySelectorAll('.nd').forEach(function (c) { c.classList.remove('act'); });
    if (!el.classList.contains('rm')) {
      el.querySelectorAll('.seg,.arc').forEach(function (c) { c.classList.remove('lit'); });
    }
    var p = el.querySelector('.pulse'); if (p) p.setAttribute('transform', 'translate(' + jx(0) + ',' + J_Y + ')');
  }
  function jActive(el, i) {
    el.querySelectorAll('.cd').forEach(function (c, k) { c.classList.toggle('act', k === i); });
    el.querySelectorAll('.nd').forEach(function (c, k) { c.classList.toggle('act', k === i); });
  }
  function jFly(el, getXY, ms, done) {
    var p = el.querySelector('.pulse'), t0 = null, t = tm(el);
    function f(now) {
      if (t0 === null) t0 = now;
      var k = Math.min(1, (now - t0) / ms), e = ease(k), xy = getXY(e);
      p.setAttribute('transform', 'translate(' + xy[0] + ',' + xy[1] + ')');
      if (k < 1) t.raf = requestAnimationFrame(f); else { t.raf = 0; done(); }
    }
    t.raf = requestAnimationFrame(f);
  }
  function jLap(el, i) {
    jActive(el, i);
    later(el, function () {
      if (i < 4) {
        el.querySelectorAll('.seg')[i].classList.add('lit');
        var a = jx(i), b = jx(i + 1);
        jFly(el, function (e) { return [a + (b - a) * e, J_Y]; }, 750, function () { jLap(el, i + 1); });
      } else {
        el.querySelector('.arc').classList.add('lit');
        var path = el.querySelector('.arc'), L = path.getTotalLength();
        jFly(el, function (e) { var q = path.getPointAtLength(L * e); return [q.x, q.y]; }, 1900, function () { jLap(el, 1); });
      }
    }, i === 3 ? 2000 : 1300);
  }

  ORQ.add({
    id: 'juntar', mov: 4, order: 50, title: 'Do que você quer ao que você entrega.', tone: 'light', steps: 0,
    render: function (el) {
      if (isRM()) el.classList.add('rm');
      var cards = '', nodes = '', segs = '', ticks = '', i;
      for (i = 0; i < 5; i++) {
        cards += '<div class="card cd' + (i === 3 ? ' val' : '') + '" style="left:' + (96 + i * 288) + 'px"><div class="nb">' + (i + 1) + '</div><h3>' + JS[i][0] + '</h3><p>' + JS[i][1] + '</p></div>';
        ticks += '<line class="tick" x1="' + jx(i) + '" y1="556" x2="' + jx(i) + '" y2="572"/>';
        nodes += '<circle class="nd" cx="' + jx(i) + '" cy="' + J_Y + '" r="14"/>';
        if (i < 4) segs += '<line class="seg" x1="' + (jx(i) + 18) + '" y1="' + J_Y + '" x2="' + (jx(i + 1) - 18) + '" y2="' + J_Y + '"/>';
      }
      el.innerHTML = '<div class="deco"></div>' + LOGO +
        '<p class="eyebrow">Movimento 4 · Como entregar</p>' +
        '<h2 class="ttl">Do que você quer <em>ao que você entrega.</em></h2>' +
        cards +
        '<svg class="circ" viewBox="0 0 1600 900" aria-hidden="true"><defs><marker id="stj-ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#e3001b"/></marker></defs>' +
        ticks + segs + '<path class="arc" d="' + ARC + '" marker-end="url(#stj-ah)"/>' + nodes +
        '<g class="pulse" transform="translate(' + jx(0) + ',' + J_Y + ')"><circle class="ring" r="22" fill="#e3001b"/><circle r="11" fill="#e3001b" stroke="#fff" stroke-width="4"/></g></svg>' +
        '<div class="lbl">Na próxima, comece do passo 2</div>' +
        '<div class="ban"><i>?</i><p><b>Travou em qualquer passo? Pergunte.</b> A IA explica até o erro da sua planilha.</p></div>' +
        FOOT;
      if (el.classList.contains('rm')) {
        el.querySelectorAll('.seg,.arc').forEach(function (c) { c.classList.add('lit'); });
        el.querySelector('.pulse').style.display = 'none';
      }
    },
    enter: function (el) {
      stopAll(el); jReset(el);
      if (el.classList.contains('rm')) return;
      jLap(el, 0);
    },
    leave: function (el) { stopAll(el); jReset(el); },
    step: function () { },
    notes: "TEMPO: 3 min.\nFALA (Arthur): \"Juntando tudo, o caminho tem cinco passos. Primeiro, saber o que você quer, e como quer; se não souber, a IA te ajuda a descobrir. Segundo, montar o plano: o prompt, as bases e os arquivos de apoio. Terceiro, executar: você entrega, ela analisa e, se precisar, te pergunta. Quarto, validar: é você quem confere. Quinto, documentar o que deu certo, para virar contexto e skill. Na próxima vez, você já começa do passo dois.\"\nAPOIO: o mais importante da tarde: quase toda dúvida de uso, a IA ajuda a esclarecer; só lembre de conferir. Não sabe o que está dando errado numa fórmula da planilha? Cola a fórmula (sem dado real) e pergunta. Ela explica, corrige e ensina.\nTRANSIÇÃO: \"E o passo quatro merece um slide só para ele.\" (passa para validar)"
  });

  /* ====================== VALIDAR ====================== */
  ORQ.add({
    id: 'validar', mov: 4, order: 51, title: 'A IA sempre busca o caminho mais rápido. A sua validação é o freio.', tone: 'dark', steps: 0,
    render: function (el) {
      if (isRM()) el.classList.add('rm');
      el.innerHTML = LOGO_D +
        '<div class="col"><p class="eyebrow">Movimento 4 · A sua parte</p>' +
        '<h2 class="ttl">A IA sempre busca o caminho mais rápido.<br><em>A sua validação é o freio.</em></h2>' +
        '<p class="sub">Se você deixa seguir sem conferir, ela se perde, e leva o seu trabalho junto.</p></div>' +
        '<div class="lane a" style="top:556px"><h4>Sem conferir</h4><div class="rail"></div><div class="gate ghost"></div><div class="tgt"></div><div class="run"></div><div class="q">?</div><div class="q2">se perde</div></div>' +
        '<div class="lane b" style="top:690px"><h4>Com a sua validação</h4><div class="rail"></div><div class="gate"></div><div class="chk"></div><div class="tgt"></div><div class="run"></div></div>' +
        FOOT;
    },
    enter: function (el) { startCss(el); },
    leave: function (el) { el.classList.remove('on'); },
    step: function () { },
    notes: "TEMPO: 2 min.\nFALA (Arthur): \"Guardem essa: a IA sempre vai buscar o caminho mais rápido para te entregar uma resposta. Se uma regra estiver vaga, ela escolhe a interpretação mais fácil. Se faltar um dado, ela preenche. Se você deixa seguir sem conferir, ela se perde, e leva o seu trabalho junto. A sua validação é o freio.\"\nAPOIO: validar não é ler tudo de novo; é conferir com método. Pegar três casos que você conhece de cor e ver se ela acertou. Perguntar: \"o que você supôs que eu não disse?\". Ela lista as suposições, e é ali que mora o erro.\nTRANSIÇÃO: \"E onde essa entrega aparece? Cada vez mais, num arquivo que todo mundo está falando: o HTML.\" (passa para HTML)"
  });

  /* ====================== HTML ====================== */
  var CODE = [
    [['t', '<h1>'], ['x', 'Pendências de hoje'], ['t', '</h1>']],
    [['t', '<p '], ['a', 'class'], ['t', '='], ['s', '"alerta"'], ['t', '>']],
    [['x', '  3 atrasadas']],
    [['t', '</p>']]
  ];
  var CH = [], LINE0 = 0;
  CODE.forEach(function (ln, li) {
    ln.forEach(function (sg) { for (var i = 0; i < sg[1].length; i++) CH.push([sg[0], sg[1][i]]); });
    if (li === 0) LINE0 = CH.length;
    if (li < CODE.length - 1) CH.push(['x', '\n']);
  });
  var H_STEP = 55, H_TYPE = CH.length * H_STEP;
  var H_PILL = H_TYPE + 300, H_ROW = H_PILL + 600, H_CK = H_ROW + 4 * 450 + 600, H_END = H_CK + 4 * 380 + 2600;
  var ROWS = [['Promotor A · Loja X', 'Atrasada', 'r'], ['Promotor A · Loja Y', 'Atrasada', 'r'], ['Promotor B · Loja X', 'Atrasada', 'r'], ['Promotor B · Loja Z', 'Vence hoje', 'y'], ['Promotor C · Loja X', 'No prazo', 'g']];
  var BEN = ['Abre em qualquer navegador', 'Nada para instalar', 'Aceita regras: contas, filtros e alertas', 'A IA escreve muito bem'];
  function esc(c) { return c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '&' ? '&amp;' : c; }
  function hApply(el, ms) {
    var S = el.__h, k = Math.min(CH.length, Math.floor(ms / H_STEP));
    if (S.k !== k) {
      S.k = k;
      var out = '', cur = null, i;
      for (i = 0; i < k; i++) {
        if (CH[i][0] !== cur) { if (cur) out += '</span>'; cur = CH[i][0]; out += '<span class="' + cur + '">'; }
        out += esc(CH[i][1]);
      }
      if (cur) out += '</span>';
      S.code.innerHTML = out + (k < CH.length ? '<span class="caret"></span>' : '');
    }
    S.h1.classList.toggle('on', k >= LINE0);
    S.al.classList.toggle('on', ms >= H_PILL);
    S.rows.forEach(function (r, j) {
      r.classList.toggle('in', ms >= H_ROW + j * 450);
      r.classList.toggle('pt', ms >= H_ROW + j * 450 + 300);
    });
    S.bn.forEach(function (b, j) { b.classList.toggle('on', ms >= H_CK + j * 380); });
  }

  ORQ.add({
    id: 'html', mov: 4, order: 52, title: 'HTML: por que todo mundo fala?', tone: 'light', steps: 0,
    render: function (el) {
      var rows = ROWS.map(function (r) { return '<div class="rw ' + r[2] + '"><span>' + r[0] + '</span><b>' + r[1] + '</b></div>'; }).join('');
      var BL = [96, 428, 710, 1236], BW = [320, 270, 514, 268];
      var bn = BEN.map(function (b, i) { return '<div class="bn" style="left:' + BL[i] + 'px;width:' + BW[i] + 'px"><span class="ck"></span><span>' + b + '</span></div>'; }).join('');
      el.innerHTML = LOGO + '<p class="eyebrow">Movimento 4 · HTML</p><h2 class="ttl">HTML: por que todo mundo fala?</h2>' +
        '<div class="pan ed"><div class="bar"><i></i><i></i><i></i><span>pendencias.html</span></div><div class="gut">1<br>2<br>3<br>4</div><pre class="code"></pre></div>' +
        '<div class="pan br"><div class="bar"><i></i><i></i><i></i><span class="url">pendencias.html</span></div>' +
        '<div class="page"><h1>Pendências de hoje</h1><span class="al">3 atrasadas</span><div class="lst">' + rows + '</div></div></div>' +
        '<p class="mid">O navegador lê o código e desenha a página.</p>' + bn + FOOT;
      el.__h = { k: -1, ms: 0, code: el.querySelector('.code'), h1: el.querySelector('.page h1'), al: el.querySelector('.al'), rows: [].slice.call(el.querySelectorAll('.rw')), bn: [].slice.call(el.querySelectorAll('.bn')) };
      hApply(el, 0);
    },
    enter: function (el) {
      stopAll(el);
      var S = el.__h; S.ms = 0; S.k = -1;
      if (isRM()) { hApply(el, H_END); S.code.querySelectorAll('.caret').forEach(function (c) { c.remove(); }); return; }
      hApply(el, 0);
      every(el, function () { S.ms += H_STEP; if (S.ms >= H_END) S.ms = 0; hApply(el, S.ms); }, H_STEP);
    },
    leave: function (el) { stopAll(el); },
    step: function () { },
    notes: "TEMPO: 3 min.\nFALA (Arthur): \"HTML é a língua das páginas da internet. Todo site que vocês abrem é HTML por baixo. E por que todo mundo está falando disso agora? Porque a IA escreve HTML muito bem, e um arquivo .html abre em qualquer navegador, no computador ou no celular, sem instalar nada.\"\nAPOIO: mostrar à esquerda o código e à direita o que o navegador desenha. Não precisa saber ler código: quem escreve é a IA. O que importa é a vantagem: diferente de um texto, o HTML aceita regras. Ele faz contas, filtra, pinta de vermelho o que está atrasado, avisa quando algo não bate. É uma planilha que já vem com a leitura pronta.\nTRANSIÇÃO: \"E onde isso entra no dia de vocês?\" (passa para os usos)"
  });

  /* ====================== HTML-DIA ====================== */
  ORQ.add({
    id: 'html-dia', mov: 4, order: 53, title: 'Onde o HTML entra no seu trabalho.', tone: 'light', steps: 0,
    render: function (el) {
      if (isRM()) el.classList.add('rm');
      var env = '<svg viewBox="0 0 300 190" aria-hidden="true" class="env">' +
        '<rect x="40" y="80" width="220" height="100" rx="8" fill="#f0d3d6"/>' +
        '<polygon class="flapb" points="40,80 260,80 150,12" fill="#e8c3c7" stroke="#dedcdd" stroke-width="2" stroke-linejoin="round"/>' +
        '<g class="paper"><rect x="64" y="92" width="172" height="86" rx="6" fill="#fff" stroke="#dedcdd" stroke-width="2"/>' +
        '<rect x="76" y="102" width="70" height="9" rx="4" fill="#333"/><rect x="190" y="100" width="34" height="14" rx="5" fill="#e3001b"/>' +
        '<rect x="76" y="122" width="148" height="6" rx="3" fill="#cfcccd"/><rect x="76" y="136" width="120" height="6" rx="3" fill="#cfcccd"/>' +
        '<rect x="76" y="156" width="20" height="14" fill="#e3001b"/><rect x="102" y="150" width="20" height="20" fill="#333"/><rect x="128" y="146" width="20" height="24" fill="#e3001b"/></g>' +
        '<polygon points="40,180 40,100 150,148 260,100 260,180" fill="#fff" stroke="#dedcdd" stroke-width="2" stroke-linejoin="round"/>' +
        '<polygon class="flap" points="40,80 260,80 150,150" fill="#fbeaec" stroke="#dedcdd" stroke-width="2" stroke-linejoin="round"/></svg>';
      var gr = '<div class="nova">&#8595; base nova</div><div class="gr"><i></i><i></i><i></i><i></i><i></i></div>';
      var ct = '<div class="ct"><i>Atividades</i><i>Bases</i><i>Regras</i></div>';
      el.innerHTML = LOGO + '<p class="eyebrow">Movimento 4 · No seu dia</p><h2 class="ttl">Onde o HTML entra no seu trabalho.</h2>' +
        '<div class="cds grid3">' +
        '<div class="card"><div class="ill">' + env + '</div><div class="tx"><h3>Resumo no corpo do <span style="white-space:nowrap">e-mail</span></h3><p>Pronto para colar no <span style="white-space:nowrap">e-mail</span>, sem anexo.</p></div></div>' +
        '<div class="card"><div class="ill">' + gr + '</div><div class="tx"><h3>Painel de acompanhamento</h3><p>Recalcula tudo quando você carrega a base nova.</p></div></div>' +
        '<div class="card"><div class="ill">' + ct + '</div><div class="tx"><h3>Sua central de trabalho</h3><p>Atividades, bases e regras num lugar só.</p></div></div></div>' +
        '<div class="dm"><span class="pill-red">DEMO</span><div class="dt"><h3>Busca 360</h3><p>Catálogo, movimentação e visitas do Retail-X numa página só, com dados fictícios.</p></div>' +
        '<button class="btn-demo" type="button" data-demo="demos/busca360.html"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3 L21 12 L6 21 Z" fill="#fff"/></svg>Abrir a Busca 360</button></div>' + FOOT;
      el.querySelector('.btn-demo').addEventListener('click', function () { ORQ.openDemo('demos/busca360.html'); });
    },
    enter: function (el) { startCss(el); },
    leave: function (el) { el.classList.remove('on'); },
    step: function () { },
    notes: "TEMPO: 4 min. Abrir a Busca 360. FALA (Arthur): \"Três usos que cabem no dia de vocês. Um resumo pronto para colar no corpo do e-mail, sem anexo. Um painel de acompanhamento que recalcula tudo quando você carrega a base nova. E uma central de trabalho, que junta as suas atividades, as suas bases e as suas regras num lugar só.\" DEMO: abrir a Busca 360 (link no slide). Ela junta três bases que hoje ficam separadas: o catálogo (loja, rota e promotor), a movimentação (admissões, transferências e desligamentos) e as visitas do Retail-X. Mostrar: buscar uma loja; abrir um alerta de \"visita após desligamento\" ou de \"catálogo desatualizado\"; clicar em \"Gerar resumo para e-mail\". Os dados são fictícios. CUIDADO: o envio e a atualização automáticos, todo dia, dependem de uma integração (como Power Automate) e de permissões que ainda não temos; isso é um passo seguinte. MENSAGEM: é o tipo de conferência que hoje vocês fazem à mão, cruzando arquivos. Com um plano claro, a IA monta uma página dessas. TRANSIÇÃO: \"Último movimento: como tocar juntos. E a gente começa brincando.\" (passa para o boneco de neve)"
  });
})();
