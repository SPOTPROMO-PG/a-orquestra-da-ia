/* Motor da apresentação: registro das estações, câmera estilo Prezi, navegação, partitura, notas, modo ensaio, ajuda e demos (API window.ORQ). */
(function (root) {
  'use strict';
  var PI = Math.PI, DEG = PI / 180;
  var ORQ = root.ORQ = root.ORQ || { stations: [], add: function (s) { this.stations.push(s); } };
  if (!ORQ.add) ORQ.add = function (s) { this.stations.push(s); };
  if (!ORQ.stations) ORQ.stations = [];

  var LS_KEY = 'orq-layout-v1';
  var reduce = !!(root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var S = [], pos = {}, defaults = {}, slots = [], els = {};
  var idx = -1, stp = 0, active = -1, ov = false, notesOpen = false, rehearse = false, ovBefore = false, helpOpen = false, demoOpen = false;
  var near = false, visited = {}, started = false, timerStart = 0, timerId = 0;
  var cam = { cx: 0, cy: 0, k: 0.07, rot: 0, fx: 0, fy: 0 }, anim = null, raf = 0, drift = 0;
  var vw = innerWidth, vh = innerHeight;
  var STG = null, particles = null, spot = null, bnd = null, scoreX = [];

  function $(id) { return document.getElementById(id); }
  function safe(fn, a, b) { try { return fn(a, b); } catch (e) { if (root.console) console.error(e); } }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function now() { return root.performance ? performance.now() : Date.now(); }

  /* ------------------------------------------------------------ geometria da câmera */
  function insets() {
    var nh = notesOpen && els.notes ? els.notes.offsetHeight + 12 : 0;
    return { top: rehearse ? 150 : 72, bottom: 104 + nh };
  }
  function uy() { var n = insets(); return (n.top + (vh - n.bottom)) / 2; }
  function makeCam(px, py, k, rot) {
    var dy = uy() - vh / 2;
    return { cx: px - Math.sin(rot) * dy / k, cy: py - Math.cos(rot) * dy / k, k: k, rot: rot, fx: px, fy: py };
  }
  function frameFor(i) {
    var p = pos[S[i].id], n = insets(), uh = vh - n.top - n.bottom;
    var k = 0.9 * Math.min(vw / 1600, uh / 900);
    return makeCam(p.x, p.y, k, -p.rot * DEG);
  }
  function overviewFrame(zoom) {
    var b = bnd, n = insets(), uh = vh - n.top - n.bottom, m = 120;
    var bw = b.x1 - b.x0 + m * 2, bh = b.y1 - b.y0 + m * 2 + 300;
    var k = Math.min(vw / bw, uh / bh) * (zoom || 0.97);
    return makeCam((b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2 + 100, k, 0);
  }
  function homeFrame() { return overviewFrame(1.0); }

  function apply(c) {
    c = c || cam;
    var cs = Math.cos(c.rot) * c.k, sn = Math.sin(c.rot) * c.k;
    var e = vw / 2 - (cs * c.cx - sn * c.cy), f = vh / 2 - (sn * c.cx + cs * c.cy);
    var m = 'matrix(' + cs.toFixed(6) + ',' + sn.toFixed(6) + ',' + (-sn).toFixed(6) + ',' + cs.toFixed(6) + ',' + e.toFixed(2) + ',' + f.toFixed(2) + ')';
    els.world.style.transform = m; els.floor.style.transform = m;
    if (spot) {
      var kOv = bnd ? overviewFrame().k : 0.07, kSt = 0.9 * Math.min(vw / 1600, (vh - 176) / 900);
      var op = clamp((c.k - kOv * 1.5) / (kSt * 0.75 - kOv * 1.5), 0, 1);
      spot.style.opacity = op.toFixed(3);
      spot.style.transform = 'translate(' + c.fx.toFixed(1) + 'px,' + c.fy.toFixed(1) + 'px)';
    }
    var nr = c.k > 0.25; if (nr !== near) { near = nr; els.floor.classList.toggle('near', nr); }
    if (c.k < 0.4) for (var i = 0; i < slots.length; i++) labXform(i, c.k);
  }

  /* Durante o voo o piso vetorial é trocado por um bitmap pré-renderizado (leve); em repouso volta o vetor nítido. */
  function promote(on) {
    if (on && !els.floor.querySelector('canvas.bake[data-ready]')) return;
    els.floor.classList.toggle('fly', !!on);
  }
  function requestFrame() { if (!raf) raf = root.requestAnimationFrame(tick); }
  function tick(t) {
    raf = 0;
    if (anim) {
      var u = clamp((t - anim.t0) / anim.dur, 0, 1), e = ease(u), a = anim.from, b = anim.to;
      cam.cx = a.cx + (b.cx - a.cx) * e; cam.cy = a.cy + (b.cy - a.cy) * e;
      cam.fx = a.fx + (b.fx - a.fx) * e; cam.fy = a.fy + (b.fy - a.fy) * e;
      cam.rot = a.rot + (b.rot - a.rot) * e;
      cam.k = Math.exp(Math.log(a.k) + (Math.log(b.k) - Math.log(a.k)) * e - anim.dip * Math.sin(PI * u));
      apply();
      if (u >= 1) { var done = anim.done; anim = null; window.__orqFlying = false; promote(false); cam.cx = b.cx; cam.cy = b.cy; cam.k = b.k; cam.rot = b.rot; cam.fx = b.fx; cam.fy = b.fy; apply(); if (done) safe(done); }
      requestFrame();
    } else if (idx < 0 && !ov && !reduce && started) {
      var s = t, d = { cx: cam.cx + Math.sin(s / 5200) * 420, cy: cam.cy + Math.cos(s / 6100) * 150, k: cam.k * (1 + 0.018 * Math.sin(s / 7300)), rot: cam.rot + 0.012 * Math.sin(s / 8800), fx: cam.fx, fy: cam.fy };
      promote(true); apply(d); drift = 1; requestFrame();
    }
  }

  function fly(to, o) {
    o = o || {};
    var from = { cx: cam.cx, cy: cam.cy, k: cam.k, rot: cam.rot, fx: cam.fx, fy: cam.fy };
    var dr = to.rot - from.rot; while (dr > PI) dr -= 2 * PI; while (dr < -PI) dr += 2 * PI;
    to = { cx: to.cx, cy: to.cy, k: to.k, rot: from.rot + dr, fx: to.fx, fy: to.fy };
    promote(false);
    if (o.jump || reduce) { cam.cx = to.cx; cam.cy = to.cy; cam.k = to.k; cam.rot = to.rot; cam.fx = to.fx; cam.fy = to.fy; anim = null; apply(); if (o.done) safe(o.done); requestFrame(); return; }
    var dist = Math.sqrt(Math.pow(to.cx - from.cx, 2) + Math.pow(to.cy - from.cy, 2)), dip = 0, dur = o.dur || 1100;
    if (o.act && !o.noDip && from.k > 0.4 && to.k > 0.4) {
      /* entre atos: voo longo, zoom-out até mostrar o palco inteiro */
      var kst = overviewFrame(1).k * 0.95, mid0 = (Math.log(from.k) + Math.log(to.k)) / 2;
      dip = Math.max(0, mid0 - Math.log(kst)); dur = o.dur || 2900;
    } else if (!o.noDip && from.k > 0.4 && to.k > 0.4 && (dist > 3300 || o.far)) {
      var n = insets(), uh = vh - n.top - n.bottom;
      var kfit = 0.8 * Math.min(vw / (Math.abs(to.cx - from.cx) + 4200), uh / (Math.abs(to.cy - from.cy) + 3000));
      var mid = (Math.log(from.k) + Math.log(to.k)) / 2;
      dip = Math.max(0, mid - Math.log(Math.max(kfit, 0.045)));
      if (dip > 0.05) dur = o.dur || 1700;
    }
    anim = { from: from, to: to, t0: now(), dur: dur, dip: dip, done: o.done }; window.__orqFlying = true;
    promote(true);
    requestFrame();
  }

  /* ------------------------------------------------------------ estações / slots */
  function labXform(i, k) {
    var p = pos[S[i].id];
    slots[i].lab.style.transform = 'rotate(' + (-p.rot).toFixed(2) + 'deg) scale(' + (1 / k).toFixed(3) + ')';
  }
  function setSlot(i) {
    var p = pos[S[i].id], sl = slots[i].el;
    if (cam.k < 0.4) labXform(i, cam.k);
    sl.style.left = (p.x - 800).toFixed(1) + 'px'; sl.style.top = (p.y - 450).toFixed(1) + 'px';
    sl.style.transform = 'rotate(' + p.rot.toFixed(2) + 'deg)';
  }
  function legsSVG() {
    return '<svg class="legs" viewBox="0 0 840 520" aria-hidden="true"><g stroke="#2a2b33" stroke-linecap="round" fill="none">' +
      '<line x1="420" y1="30" x2="420" y2="260" stroke-width="46"/><line x1="420" y1="250" x2="170" y2="470" stroke-width="30"/>' +
      '<line x1="420" y1="250" x2="670" y2="470" stroke-width="30"/><line x1="420" y1="250" x2="420" y2="500" stroke-width="30"/></g>' +
      '<g fill="#3a3b45"><circle cx="420" cy="250" r="42"/><circle cx="170" cy="470" r="24"/><circle cx="670" cy="470" r="24"/><circle cx="420" cy="500" r="24"/></g></svg>';
  }
  function buildSlots() {
    S.forEach(function (s, i) {
      var sl = document.createElement('div'); sl.className = 'slot'; sl.dataset.i = i; sl.dataset.id = s.id;
      sl.innerHTML = '<div class="sh"></div>' + legsSVG() + '<div class="ledge"></div><div class="glow"></div><div class="frame"></div>';
      var st = document.createElement('div'); st.className = 'st st-' + s.id + ' ' + (s.tone || 'light');
      sl.appendChild(st);
      var dim = document.createElement('div'); dim.className = 'dim'; sl.appendChild(dim);
      var lab = document.createElement('div'); lab.className = 'lab';
      var b = document.createElement('b'); b.textContent = String(i + 1);
      var sp = document.createElement('span'); sp.textContent = s.title || s.id;
      lab.appendChild(b); lab.appendChild(sp); sl.appendChild(lab);
      els.world.appendChild(sl);
      slots.push({ el: sl, st: st, lab: lab, cur: false });
      safe(function () { if (s.render) s.render(st); });
      setSlot(i);
    });
  }
  function loadOverrides() {
    var o = null;
    try { o = JSON.parse(localStorage.getItem(LS_KEY) || 'null'); } catch (e) { o = null; }
    S.forEach(function (s) {
      var d = defaults[s.id];
      pos[s.id] = { x: d.x, y: d.y, rot: d.rot, act: d.act };
      if (o && o[s.id] && isFinite(o[s.id][0]) && isFinite(o[s.id][1])) {
        pos[s.id].x = +o[s.id][0]; pos[s.id].y = +o[s.id][1];
        pos[s.id].rot = STG.rotFor(s, pos[s.id].x, pos[s.id].y);
      }
    });
  }
  function saveLayout() {
    var o = {}, changed = false;
    S.forEach(function (s) {
      var p = pos[s.id], d = defaults[s.id];
      if (Math.abs(p.x - d.x) > 0.5 || Math.abs(p.y - d.y) > 0.5) { o[s.id] = [Math.round(p.x), Math.round(p.y)]; changed = true; }
    });
    try { if (changed) localStorage.setItem(LS_KEY, JSON.stringify(o)); else localStorage.removeItem(LS_KEY); } catch (e) {}
  }

  /* ------------------------------------------------------------ navegação */
  function callLeave(i) {
    var s = S[i]; if (!s) return;
    safe(function () { if (s.leave) s.leave(slots[i].st); });
    slots[i].el.classList.remove('active');
  }
  function arrive(i) {
    if (i !== idx || ov || i < 0) return;
    if (active !== i) {
      active = i;
      var s = S[i];
      slots[i].el.classList.add('active');
      safe(function () { if (s.enter) s.enter(slots[i].st); });
      document.dispatchEvent(new CustomEvent('orq:enter', { detail: { id: s.id } }));
    }
  }
  function markCurrent() {
    slots.forEach(function (sl, i) { var on = i === idx; if (on !== sl.cur) { sl.cur = on; sl.el.classList.toggle('cur', on); } });
  }
  function whereLabel(s) {
    var m = STG.MOV[s.mov];
    if (s.act === 1) return ['1º ato', ' · ' + (STG.MOV1[s.mov] || '')];
    if (s.mov === 0) return ['2º ato', ' · Abertura · Pódio do regente'];
    return ['2º ato', ' · Movimento ' + s.mov + ' · ' + (m ? m.name : '')];
  }
  function updateHud() {
    var s = S[idx];
    els.mv.innerHTML = '';
    if (s) {
      var w = whereLabel(s), b = document.createElement('b'); b.textContent = w[0];
      els.mv.appendChild(b); els.mv.appendChild(document.createTextNode(w[1]));
    }
    els.cnt.textContent = s ? (idx + 1) + ' / ' + S.length : '';
    updateScore(); renderNotes();
    els.intro.classList.toggle('show', idx < 0 && !ov && S.length > 0);
    try { var h = idx >= 0 ? '#' + s.id : location.pathname + location.search; history.replaceState(null, '', h); } catch (e) {}
  }

  function go(i, o) {
    o = o || {};
    if (!S.length) return;
    i = clamp(Math.round(+i), -1, S.length - 1);
    if (isNaN(i)) return;
    var same = (i === idx), wasOv = ov, far = idx >= 0 && i >= 0 && (S[idx].mov !== S[i].mov || S[idx].act !== S[i].act), actFly = idx >= 0 && i >= 0 && S[idx].act !== S[i].act;
    if (ov) { ov = false; els.world.classList.remove('ov'); els.app.classList.remove('is-ov'); }
    if (!same) {
      if (active >= 0 && active !== i) { callLeave(active); active = -1; }
      idx = i; stp = (o.atEnd && i >= 0) ? (S[i].steps || 0) : 0;
      if (i >= 0) { visited[S[i].id] = 1; safe(function () { var s = S[i]; if (s.step) s.step(slots[i].st, stp); }); }
    } else if (!wasOv) { /* recentraliza */ }
    markCurrent(); updateHud();
    var target = i >= 0 ? frameFor(i) : homeFrame();
    fly(target, { jump: o.jump, noDip: wasOv && same, far: far, act: actFly, dur: wasOv ? 1300 : (i < 0 ? 1500 : 0) || undefined, done: function () { arrive(i); } });
  }

  function overview(on) {
    if (!S.length) return;
    if (on === undefined) on = !ov;
    if (on === ov) return;
    if (on) {
      ov = true; els.world.classList.add('ov'); els.app.classList.add('is-ov');
      els.intro.classList.remove('show');
      fly(overviewFrame(), { noDip: true, dur: 1300 });
    } else {
      go(idx);
    }
  }

  function startTimer() {
    if (timerStart) return;
    timerStart = Date.now();
    timerId = setInterval(function () {
      var s = Math.floor((Date.now() - timerStart) / 1000), m = Math.floor(s / 60);
      els.tm.textContent = (m < 10 ? '0' : '') + m + ':' + (s % 60 < 10 ? '0' : '') + (s % 60);
    }, 500);
  }
  function next() {
    if (!S.length || demoOpen || rehearse) return;
    startTimer();
    if (ov) { overview(false); return; }
    if (idx < 0) { go(0); return; }
    var s = S[idx];
    if (stp < (s.steps || 0)) { stp++; safe(function () { if (s.step) s.step(slots[idx].st, stp); }); return; }
    if (idx < S.length - 1) go(idx + 1);
  }
  function prev() {
    if (!S.length || demoOpen || rehearse) return;
    if (ov) { overview(false); return; }
    if (idx < 0) return;
    var s = S[idx];
    if (stp > 0) { stp--; safe(function () { if (s.step) s.step(slots[idx].st, stp); }); return; }
    go(idx - 1, { atEnd: true });
  }
  function goMov(n, act) {
    act = act || 2;
    for (var i = 0; i < S.length; i++) if (S[i].mov === n && S[i].act === act) { startTimer(); if (ov) overviewClose(); go(i); return; }
  }
  function overviewClose() { if (ov) { ov = false; els.world.classList.remove('ov'); els.app.classList.remove('is-ov'); } }

  /* ------------------------------------------------------------ partitura */
  var SVGNS = 'http://www.w3.org/2000/svg';
  function se(n, a, p) { var e = document.createElementNS(SVGNS, n), k; for (k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  var PITCH = [2, 4, 3, 5, 4, 6, 3, 5, 2, 4, 6, 5, 3, 4];
  var scoreNotes = [], halo = null;
  function buildScore() {
    var W = els.score.clientWidth || (vw - 48), H = 66, n = S.length;
    els.score.innerHTML = ''; scoreNotes = []; scoreX = [];
    if (!n) return;
    var svg = se('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, preserveAspectRatio: 'none' }, els.score);
    var gu = 2.4, au = 3.4, extra = 0, i;
    for (i = 1; i < n; i++) { if (S[i].act !== S[i - 1].act) extra += au - 1; else if (S[i].mov !== S[i - 1].mov) extra += gu - 1; }
    var pad = 34, u = (W - pad * 2 - 20) / ((n - 1) + extra + 1), x = pad, ys = [22, 28, 34, 40, 46];
    var FF = 'Montserrat,Arial,sans-serif';
    function actLabel(tx, txt) { var t = se('text', { x: tx, y: 13, 'font-size': 11, 'font-weight': 800, fill: '#6f6a63', 'letter-spacing': 0.8, 'font-family': FF }, svg); t.textContent = txt; return t; }
    ys.forEach(function (y) { se('line', { x1: 10, x2: W - 10, y1: y, y2: y, stroke: '#8f8b84', 'stroke-width': 1.2 }, svg); });
    se('line', { x1: 10, x2: 10, y1: 22, y2: 46, stroke: '#333', 'stroke-width': 2.5 }, svg);
    var xs = [];
    if (S[0]) actLabel(18, S[0].act === 1 ? '1º ato · Manhã' : '2º ato · Tarde');
    for (i = 0; i < n; i++) {
      if (i > 0) {
        var actCh = S[i].act !== S[i - 1].act, movCh = S[i].mov !== S[i - 1].mov;
        var step = actCh ? au * u : (movCh ? gu * u : u);
        if (actCh) {
          var ax = x + step / 2;
          se('line', { x1: ax - 3, x2: ax - 3, y1: 22, y2: 46, stroke: '#333', 'stroke-width': 2 }, svg);
          se('line', { x1: ax + 3, x2: ax + 3, y1: 22, y2: 46, stroke: '#333', 'stroke-width': 2 }, svg);
          actLabel(ax + 11, S[i].act === 1 ? '1º ato · Manhã' : '2º ato · Tarde');
        } else if (movCh) {
          var bx = x + step / 2;
          se('line', { x1: bx, x2: bx, y1: 22, y2: 46, stroke: '#333', 'stroke-width': 2 }, svg);
          var t = se('text', { x: bx + 7, y: 62, 'font-size': 16, 'font-weight': 800, fill: '#e3001b', 'font-family': FF }, svg);
          t.textContent = S[i].mov;
        }
        x += step;
      }
      xs.push(x);
    }
    var ex = x + u * 1.1;
    se('line', { x1: ex, x2: ex, y1: 22, y2: 46, stroke: '#333', 'stroke-width': 2 }, svg);
    se('line', { x1: ex + 5, x2: ex + 5, y1: 22, y2: 46, stroke: '#333', 'stroke-width': 4.5 }, svg);
    halo = se('circle', { r: 11, fill: '#e3001b', opacity: 0 }, svg);
    halo.setAttribute('class', 'cur-halo');
    for (i = 0; i < n; i++) {
      var p = PITCH[(i * 3) % PITCH.length], y = 46 - p * 3, g = se('g', { 'data-i': i, class: 'note' }, svg);
      var up = p < 4;
      se('line', { class: 'stem', x1: up ? xs[i] + 6 : xs[i] - 6, x2: up ? xs[i] + 6 : xs[i] - 6, y1: y, y2: up ? y - 19 : y + 19, stroke: '#333', 'stroke-width': 1.8 }, g);
      var h = se('ellipse', { class: 'head nh', cx: xs[i], cy: y, rx: 6.8, ry: 4.9, transform: 'rotate(-20 ' + xs[i] + ' ' + y + ')', fill: '#fff', stroke: '#333', 'stroke-width': 2 }, g);
      se('circle', { class: 'hit', cx: xs[i], cy: y, r: 15 }, g);
      scoreNotes.push({ g: g, head: h, x: xs[i], y: y });
      scoreX.push(xs[i]);
    }
    updateScore();
  }
  function updateScore() {
    if (!scoreNotes.length) return;
    scoreNotes.forEach(function (n, i) {
      var cur = i === idx, vis = !cur && !!visited[S[i].id] && i < idx;
      var c = cur ? '#e3001b' : '#333';
      n.head.setAttribute('fill', cur ? '#e3001b' : (vis ? '#333' : '#fff'));
      n.head.setAttribute('stroke', c);
      n.g.querySelector('.stem').setAttribute('stroke', c);
      n.head.setAttribute('class', 'head nh' + (cur ? ' cur-note' : ''));
    });
    if (idx >= 0 && scoreNotes[idx]) { halo.setAttribute('cx', scoreNotes[idx].x); halo.setAttribute('cy', scoreNotes[idx].y); halo.setAttribute('opacity', 0.35); }
    else if (halo) halo.setAttribute('opacity', 0);
    if (halo) halo.style.display = idx >= 0 ? '' : 'none';
  }
  function tipWhere(s) { var w = whereLabel(s); return w[0] + w[1]; }
  function tip(i, on) {
    if (!on) { els.tip.classList.remove('on'); return; }
    var s = S[i], r = els.score.getBoundingClientRect(), W = els.score.clientWidth || 1, x = r.left + scoreX[i] * (r.width / W);
    els.tip.innerHTML = ''; var sm = document.createElement('small'); sm.textContent = (i + 1) + ' · ' + tipWhere(s); els.tip.appendChild(sm);
    els.tip.appendChild(document.createTextNode(s.title || s.id));
    els.tip.style.left = clamp(x, 290, vw - 290) + 'px'; els.tip.style.top = (r.top - 12) + 'px';
    els.tip.classList.add('on');
  }

  /* ------------------------------------------------------------ notas */
  function parseNotes(t) {
    var re = /(TEMPO|FALA(?:\s*\([^)]*\))?|APOIO|TRANSIÇÃO|TRANSICAO|[A-ZÁÉÍÓÚÂÊÔÃÕÇ]{3,}(?: [A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9º]{1,})*(?:\s*\([^)]*\))?)\s*:/g, parts = [], m, last = 0, label = null;
    t = t || '';
    while ((m = re.exec(t))) {
      if (label !== null) parts.push([label, t.slice(last, m.index).trim()]);
      else if (t.slice(0, m.index).trim()) parts.push(['', t.slice(0, m.index).trim()]);
      label = m[1]; last = re.lastIndex;
    }
    if (label !== null) parts.push([label, t.slice(last).trim()]); else if (t.trim()) parts.push(['', t.trim()]);
    return parts;
  }
  function renderNotes() {
    if (!notesOpen) return;
    var s = S[idx], box = els.notes;
    box.innerHTML = '';
    var hd = document.createElement('div'); hd.className = 'hd';
    hd.textContent = s ? 'Notas · ' + (idx + 1) + ' / ' + S.length + ' · ' + (s.title || s.id) : 'Notas do apresentador';
    box.appendChild(hd);
    var parts = s ? parseNotes(s.notes) : [];
    if (!parts.length) { var n = document.createElement('p'); n.className = 'none'; n.textContent = s ? 'Esta estação não tem notas.' : 'Avance para a primeira estação para ver as notas.'; box.appendChild(n); }
    parts.forEach(function (pr) {
      var p = document.createElement('p');
      if (pr[0]) { var b = document.createElement('b'); b.textContent = pr[0].replace(/\s+/g, ' ') + ':'; p.appendChild(b); }
      p.appendChild(document.createTextNode(pr[1])); box.appendChild(p);
    });
    box.scrollTop = 0;
  }
  function toggleNotes() {
    if (!S.length) return;
    notesOpen = !notesOpen;
    els.notes.classList.toggle('on', notesOpen);
    renderNotes();
    if (!ov && idx >= 0 && !demoOpen) fly(frameFor(idx), { noDip: true, dur: 700 });
  }

  /* ------------------------------------------------------------ ensaio */
  function toast(msg) {
    els.toast.textContent = msg; els.toast.classList.add('on');
    clearTimeout(toast.t); toast.t = setTimeout(function () { els.toast.classList.remove('on'); }, 1800);
  }
  function setRehearse(on) {
    if (on === rehearse || !S.length) return;
    if (on) { ovBefore = ov; rehearse = true; document.body.classList.add('rehearse'); els.intro.classList.remove('show'); if (!ov) overview(true); else fly(overviewFrame(), { noDip: true, dur: 700 }); }
    else { rehearse = false; document.body.classList.remove('rehearse'); if (!ovBefore) overview(false); else fly(overviewFrame(), { noDip: true, dur: 700 }); }
  }
  function layoutJSON() {
    var o = {}; S.forEach(function (s) { o[s.id] = [Math.round(pos[s.id].x), Math.round(pos[s.id].y)]; });
    return JSON.stringify(o, null, 1);
  }
  function copyLayout() {
    var txt = layoutJSON(), ok = false;
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = txt; ta.style.cssText = 'position:fixed;left:-9999px;top:0'; document.body.appendChild(ta); ta.select();
      try { ok = document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta); toast(ok ? 'Layout copiado' : 'Não foi possível copiar'); root.__lastLayout = txt;
    }
    try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(txt).then(function () { toast('Layout copiado'); }, fallback); root.__lastLayout = txt; return; } } catch (e) {}
    fallback();
  }
  function resetLayout() {
    try { localStorage.removeItem(LS_KEY); } catch (e) {}
    S.forEach(function (s, i) { var d = defaults[s.id]; pos[s.id] = { x: d.x, y: d.y, rot: d.rot, act: d.act }; setSlot(i); });
    toast('Layout restaurado');
  }
  function toWorld(sx, sy) {
    var dx = sx - vw / 2, dy = sy - vh / 2, c = Math.cos(cam.rot), s = Math.sin(cam.rot);
    return { x: cam.cx + (c * dx + s * dy) / cam.k, y: cam.cy + (-s * dx + c * dy) / cam.k };
  }
  var drag = null;
  function dragStart(e) {
    if (!rehearse || e.button > 0) return;
    var sl = e.target.closest && e.target.closest('.slot'); if (!sl) return;
    var i = +sl.dataset.i, w = toWorld(e.clientX, e.clientY), p = pos[S[i].id];
    drag = { i: i, ox: p.x - w.x, oy: p.y - w.y }; sl.classList.add('drag'); e.preventDefault();
  }
  function dragMove(e) {
    if (!drag) return;
    var w = toWorld(e.clientX, e.clientY), s = S[drag.i], p = pos[s.id];
    p.x = w.x + drag.ox; p.y = w.y + drag.oy;
    p.rot = STG.rotFor(s, p.x, p.y);
    setSlot(drag.i);
  }
  function dragEnd() {
    if (!drag) return;
    slots[drag.i].el.classList.remove('drag'); drag = null; saveLayout();
  }

  /* ------------------------------------------------------------ demo e ajuda */
  function openDemo(src) {
    var d = $('demo'), f = d.querySelector('iframe');
    demoOpen = true; d.classList.add('on'); f.src = src;
    f.onload = function () { try { f.contentWindow.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDemo(); }); } catch (e) {} };
    $('demo-close').focus();
  }
  function closeDemo() {
    var d = $('demo'); if (!demoOpen) return;
    demoOpen = false; d.classList.remove('on'); d.querySelector('iframe').onload = null; d.querySelector('iframe').src = 'about:blank';
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }
  function toggleHelp(on) { helpOpen = on === undefined ? !helpOpen : on; $('help').classList.toggle('on', helpOpen); }

  /* ------------------------------------------------------------ eventos */
  function onKey(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key;
    if (demoOpen) { if (k === 'Escape') { closeDemo(); e.preventDefault(); } return; }
    var ae = document.activeElement, tag = ae && ae.tagName;
    var inCtl = tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
    if ((k === 'Enter' || k === ' ') && inCtl) return;
    if (notesOpen && (k === 'ArrowDown' || k === 'ArrowUp')) { e.preventDefault(); els.notes.scrollBy({ top: k === 'ArrowDown' ? 160 : -160, behavior: 'smooth' }); return; }
    if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'Enter') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); prev(); }
    else if (k === 'Home') { e.preventDefault(); if (rehearse) setRehearse(false); if (S.length) { overviewClose(); go(-1); } }
    else if (k === 'Escape') {
      if (helpOpen) toggleHelp(false);
      else if (rehearse) setRehearse(false);
      else if (ov) overview(false);
    }
    else if (k === 'o' || k === 'O') { if (rehearse) return; overview(); }
    else if (e.shiftKey && /^(Digit|Numpad)[1-5]$/.test(e.code || '')) { if (rehearse) return; goMov(+e.code.slice(-1), 1); }
    else if (k >= '0' && k <= '5' && k.length === 1) { if (rehearse) return; goMov(+k, 2); }
    else if (k === 'm' || k === 'M') { if (rehearse) return; goMov(1, 1); }
    else if (k === 'n' || k === 'N') toggleNotes();
    else if (k === 'f' || k === 'F') { try { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); } catch (er) {} }
    else if (k === 't' || k === 'T') document.body.classList.toggle('show-timer');
    else if (k === 'e' || k === 'E') setRehearse(!rehearse);
    else if (k === '?' || k === '/') toggleHelp();
  }
  function onClick(e) {
    if (demoOpen || rehearse || drag) return;
    var t = e.target;
    if (t.closest('#top, #score, #notes, #help, #rehearse, #demo, #toast, button, a, input')) return;
    var sl = t.closest('.slot');
    if (ov) { if (sl) { startTimer(); go(+sl.dataset.i); } else overview(false); return; }
    if (sl) { var i = +sl.dataset.i; if (i !== idx) { startTimer(); go(i); } return; }
    next();
  }
  var idleT = 0;
  function onMove() { document.body.classList.remove('idle'); clearTimeout(idleT); idleT = setTimeout(function () { if (!rehearse) document.body.classList.add('idle'); }, 3500); }
  function onResize() {
    vw = innerWidth; vh = innerHeight; buildScore();
    if (!S.length) return;
    bnd = STG.bounds(pos);
    var t = ov ? overviewFrame() : (idx >= 0 ? frameFor(idx) : homeFrame());
    anim = null; cam.cx = t.cx; cam.cy = t.cy; cam.k = t.k; cam.rot = t.rot; cam.fx = t.fx; cam.fy = t.fy; apply();
  }

  /* ------------------------------------------------------------ início */
  function start() {
    if (started) return;
    started = true; STG = root.STAGE;
    els = { app: $('app'), floor: $('floor'), world: $('world'), score: $('score'), tip: $('tip'), notes: $('notes'), mv: $('mv'), cnt: $('cnt'), tm: $('tm'), intro: $('intro'), toast: $('toast') };
    var seen = {};
    S = ORQ.stations.filter(function (s) { if (!s || !s.id || seen[s.id]) return false; seen[s.id] = 1; s.act = s.act === 1 ? 1 : 2; return true; })
      .map(function (s, n) { return { s: s, n: n }; })
      .sort(function (a, b) { return (a.s.order - b.s.order) || (a.n - b.n); }).map(function (o) { return o.s; });
    ORQ.sorted = S;
    $('empty').classList.toggle('on', S.length === 0);
    defaults = STG.layout(S); loadOverrides(); bnd = STG.bounds(pos);
    spot = STG.buildFloor(els.floor, S);
    buildSlots(); buildScore();
    particles = new STG.Particles($('notes-cv')); particles.start();

    var t0 = S.length ? homeFrame() : { cx: 12800, cy: 8000, k: 0.07, rot: 0, fx: 12800, fy: 8000 };
    cam.cx = t0.cx; cam.cy = t0.cy; cam.k = t0.k; cam.rot = t0.rot; cam.fx = t0.fx; cam.fy = t0.fy; apply();

    document.addEventListener('keydown', onKey);
    els.app.addEventListener('click', onClick);
    els.app.addEventListener('pointerdown', dragStart);
    addEventListener('pointermove', dragMove);
    addEventListener('pointerup', dragEnd);
    addEventListener('pointermove', onMove);
    addEventListener('resize', onResize);
    els.score.addEventListener('click', function (e) { var g = e.target.closest('[data-i]'); if (g && !demoOpen) { startTimer(); if (rehearse) setRehearse(false); overviewClose(); go(+g.getAttribute('data-i')); } });
    els.world.addEventListener('mouseover', function (e) {
      var sl = (ov || rehearse) && !drag && e.target.closest && e.target.closest('.slot');
      if (!sl) return; var i = +sl.dataset.i, s = S[i];
      els.tip.innerHTML = ''; var sm = document.createElement('small'); sm.textContent = (i + 1) + ' · ' + tipWhere(s); els.tip.appendChild(sm);
      els.tip.appendChild(document.createTextNode(s.title || s.id)); els.tip.classList.add('on');
      var r = sl.getBoundingClientRect(); els.tip.style.left = clamp(r.left + r.width / 2, 290, vw - 290) + 'px'; els.tip.style.top = Math.max(110, r.top - 10) + 'px';
    });
    els.world.addEventListener('mouseout', function (e) { if (e.target.closest && e.target.closest('.slot')) els.tip.classList.remove('on'); });
    els.score.addEventListener('mouseover', function (e) { var g = e.target.closest('[data-i]'); if (g) tip(+g.getAttribute('data-i'), true); });
    els.score.addEventListener('mouseout', function (e) { if (e.target.closest('[data-i]')) tip(0, false); });
    $('rh-reset').addEventListener('click', resetLayout);
    $('rh-copy').addEventListener('click', copyLayout);
    $('rh-exit').addEventListener('click', function () { setRehearse(false); });
    $('demo-close').addEventListener('click', closeDemo);
    onMove();

    var h = (location.hash || '').replace('#', ''), hi = -1;
    S.forEach(function (s, i) { if (s.id === h) hi = i; });
    if (hi >= 0) { visited = {}; for (var j = 0; j < hi; j++) visited[S[j].id] = 1; go(hi, { jump: true }); }
    else go(-1, { jump: true });
    requestFrame();
  }

  ORQ.start = start;
  ORQ.go = function (i) { if (typeof i === 'string') { for (var k = 0; k < S.length; k++) if (S[k].id === i) { i = k; break; } } startTimer(); overviewClose(); go(i); };
  ORQ.next = next; ORQ.prev = prev;
  ORQ.overview = function (on) { overview(on); };
  ORQ.openDemo = openDemo; ORQ.closeDemo = closeDemo;
  ORQ.current = function () { return idx; };
  ORQ.step = function () { return stp; };
  ORQ.state = function () { return { idx: idx, stp: stp, active: active, ov: ov, rehearse: rehearse, notes: notesOpen, demo: demoOpen, cam: { cx: cam.cx, cy: cam.cy, k: cam.k, rot: cam.rot }, anim: !!anim }; };
  ORQ.pos = function (id) { return pos[id]; };
})(window);
