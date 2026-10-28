/* Cenário da orquestra: posições dos naipes, piso SVG (praticáveis, cadeiras, rótulos, pódio), holofote e notas musicais flutuantes. */
(function (root) {
  'use strict';
  var DEG = Math.PI / 180;
  var NS = 'http://www.w3.org/2000/svg';

  var MOV = {
    0: { name: 'Abertura', sec: 'REGENTE', sub: 'Pódio' },
    1: { name: 'O que é a IA', sec: 'CORDAS', sub: 'O que é a IA' },
    2: { name: 'Como pedir', sec: 'MADEIRAS', sub: 'Como pedir' },
    3: { name: 'Como planejar', sec: 'METAIS', sub: 'Como planejar' },
    4: { name: 'Como entregar', sec: 'PERCUSSÃO', sub: 'Como entregar' },
    5: { name: 'Como tocar juntos', sec: 'CORO', sub: 'Como tocar juntos' }
  };

  /* 1º ato (manhã): nomes dos grupos (campo mov das estações com act = 1). */
  var MOV1 = { 1: 'Abertura', 2: 'Nivelamento', 3: 'Efeito dominó', 4: 'Lojas Perfeitas e PI', 5: 'Intervalo' };

  /* Geometria do palco (unidades de mundo = px de uma estação 1600×900 em escala 1). */
  var G = {
    W: 25600, H: 21800,
    O: { x: 12800, y: 13000 },          // centro do pódio
    front: { ry: 4700, a: 1.75, S: 1950, gap: 1100 },
    mid:   { ry: 7400, a: 1.75, S: 1950 },
    back:  { ry: 10100, a: 1.65, S: 2250 },
    maxRot: 25,
    /* proscênio do 1º ato: meia-elipse à frente do pódio; duas fileiras em arco (externa 8, interna 3 — almoço no centro, perto do pódio) */
    A1: { y0: 14500, rx: 13600, ry: 6600,
          out: { R: 20000, y: 18700, S: 1950 }, inn: { R: 14000, y: 16300, S: 2000 } }
  };

  function Ring(p) {
    this.ry = p.ry; this.rx = p.ry * p.a;
    var n = Math.round(115 / 0.25), phis = [0], ss = [0], i, ph, prev = 0, s = 0, rx = this.rx, ry = this.ry;
    function speed(f) { return Math.sqrt(Math.pow(rx * Math.cos(f), 2) + Math.pow(ry * Math.sin(f), 2)); }
    for (i = 1; i <= n; i++) {
      ph = i * 0.25 * DEG;
      s += (speed(prev) + speed(ph)) / 2 * (ph - prev);
      phis.push(ph); ss.push(s); prev = ph;
    }
    this.phis = phis; this.ss = ss;
  }
  Ring.prototype.phiAt = function (sv) {
    var sg = sv < 0 ? -1 : 1, a = Math.abs(sv), ss = this.ss, lo = 0, hi = ss.length - 1, m;
    if (a >= ss[hi]) return sg * this.phis[hi];
    while (hi - lo > 1) { m = (lo + hi) >> 1; if (ss[m] <= a) lo = m; else hi = m; }
    var t = (a - ss[lo]) / (ss[hi] - ss[lo]);
    return sg * (this.phis[lo] + t * (this.phis[hi] - this.phis[lo]));
  };
  Ring.prototype.pt = function (phi, dr) {
    var k = 1 + (dr || 0) / this.ry; // desloca radialmente (dr em unidades de ry)
    return { x: G.O.x + this.rx * k * Math.sin(phi), y: G.O.y - this.ry * k * Math.cos(phi) };
  };
  Ring.prototype.at = function (sv) { var phi = this.phiAt(sv), p = this.pt(phi); p.phi = phi; return p; };

  var rings = null;
  function getRings() {
    if (!rings) rings = { front: new Ring(G.front), mid: new Ring(G.mid), back: new Ring(G.back) };
    return rings;
  }

  function lookRot(x, y) {
    var dx = G.O.x - x, dy = G.O.y - y;
    var r = Math.atan2(-dx, dy) / DEG;
    return Math.max(-G.maxRot, Math.min(G.maxRot, r));
  }

  /* Proscênio: ponto de uma fileira (smile) a dx do eixo e inclinação tangente (esquerda gira no sentido horário). */
  function tierPt(t, dx) {
    var drop = t.R - Math.sqrt(t.R * t.R - dx * dx);
    return { x: G.O.x + dx, y: t.y - drop, rot: -Math.asin(dx / t.R) / DEG };
  }
  function act1Pos(n) {
    var A = G.A1, nIn = Math.min(3, n), nOut = n - nIn, out = [], k;
    for (k = 0; k < nOut; k++) out.push(tierPt(A.out, (k - (nOut - 1) / 2) * A.out.S));
    for (k = 0; k < nIn; k++) out.push(tierPt(A.inn, (nIn - 1 - k) * A.inn.S));
    return out;
  }
  /* Rotação padrão de uma estação em (x,y): 2º ato olha para o pódio; 1º ato segue a tangente do proscênio. */
  function rotFor(s, x, y) {
    if (s.act === 1) {
      var A = G.A1, dx = Math.max(-A.inn.R * 0.95, Math.min(A.inn.R * 0.95, x - G.O.x));
      var dxo = Math.max(-A.out.R * 0.95, Math.min(A.out.R * 0.95, dx));
      var yo = tierPt(A.out, dxo).y, yi = tierPt(A.inn, dx).y;
      return Math.abs(y - yo) < Math.abs(y - yi) ? tierPt(A.out, dxo).rot : tierPt(A.inn, dx).rot;
    }
    if (s.mov === 0) return 0;
    return lookRot(x, y);
  }

  /* Posição padrão de cada estação: { id: {x,y,rot,act} }. Estações já ordenadas por `order`. */
  function layout(stations) {
    var R = getRings(), out = {}, by = {}, a1 = [], i;
    stations.forEach(function (s) { if (s.act === 1) a1.push(s); else (by[s.mov] = by[s.mov] || []).push(s); });
    function put(s, p) { out[s.id] = { x: p.x, y: p.y, rot: lookRot(p.x, p.y), act: 2 }; }
    (by[0] || []).forEach(function (s, k) { put(s, { x: G.O.x + k * 0, y: G.O.y }); out[s.id].rot = 0; });
    var m1 = by[1] || [], m2 = by[2] || [], m3 = by[3] || [], m4 = by[4] || [], m5 = by[5] || [];
    m1.forEach(function (s, k) { put(s, R.front.at(-(G.front.gap + (m1.length - 1 - k) * G.front.S))); });
    m2.forEach(function (s, k) { put(s, R.front.at(G.front.gap + k * G.front.S)); });
    m3.forEach(function (s, k) { put(s, R.mid.at((k - (m3.length - 1) / 2) * G.mid.S)); });
    var back = m4.concat(m5);
    back.forEach(function (s, k) { put(s, R.back.at((k - (back.length - 1) / 2) * G.back.S)); });
    var ap = act1Pos(a1.length);
    a1.forEach(function (s, k) { out[s.id] = { x: ap[k].x, y: ap[k].y, rot: ap[k].rot, act: 1 }; });
    return out;
  }

  /* Retângulo (com rotação) de uma estação para cálculo de limites/colisões. */
  function corners(p, pad) {
    var hw = 800 + (pad || 0), hh = 450 + (pad || 0), c = Math.cos(p.rot * DEG), s = Math.sin(p.rot * DEG);
    return [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]].map(function (q) { return { x: p.x + q[0] * c - q[1] * s, y: p.y + q[0] * s + q[1] * c }; });
  }
  function bounds(pos) {
    var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    Object.keys(pos).forEach(function (id) {
      corners(pos[id], 60).forEach(function (c) { x0 = Math.min(x0, c.x); y0 = Math.min(y0, c.y); x1 = Math.max(x1, c.x); y1 = Math.max(y1, c.y); });
    });
    var has1 = Object.keys(pos).some(function (id) { return pos[id].act === 1; });
    if (has1) y1 = Math.max(y1, G.A1.y0 + G.A1.ry);   /* inclui a borda do proscênio, pernas e rótulos */
    if (x0 > x1) { x0 = G.O.x - 4000; x1 = G.O.x + 4000; y0 = G.O.y - 3000; y1 = G.O.y + 500; }
    return { x0: x0, y0: y0, x1: x1, y1: y1 };
  }

  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name), k;
    for (k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function arcPath(ring, dr, a0, a1) {
    var d = '', i, n = 90, p;
    for (i = 0; i <= n; i++) { p = ring.pt(a0 + (a1 - a0) * i / n, dr); d += (i ? 'L' : 'M') + p.x.toFixed(1) + ' ' + p.y.toFixed(1); }
    return d;
  }

  /* Rasteriza o piso uma vez (bitmap leve) para usar durante os voos da câmera; em repouso o SVG vetorial aparece. */
  function bakeFloor(svg, host) {
    try {
      var X0 = -2800, VW = G.W + 5600, sc = 0.1, cv = document.createElement('canvas');
      cv.className = 'bake'; cv.width = Math.round(VW * sc); cv.height = Math.round(G.H * sc);
      cv.style.cssText = 'position:absolute;left:' + X0 + 'px;top:0;width:' + VW + 'px;height:' + G.H + 'px;display:none;pointer-events:none';
      var c = svg.cloneNode(true);
      c.setAttribute('viewBox', X0 + ' 0 ' + VW + ' ' + G.H); c.setAttribute('width', cv.width); c.setAttribute('height', cv.height);
      c.setAttribute('xmlns', NS); c.style.cssText = '';
      var img = new Image();
      img.onload = function () { try { cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height); cv.dataset.ready = '1'; } catch (e) {} };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(c));
      host.appendChild(cv);
    } catch (e) {}
  }

  /* Constrói o piso dentro de um <div> (camada do mundo). Devolve o elemento do holofote. */
  function buildFloor(host, stations) {
    var R = getRings(), O = G.O;
    var svg = el('svg', { width: G.W, height: G.H, viewBox: '0 0 ' + G.W + ' ' + G.H, 'aria-hidden': 'true' });
    svg.style.cssText = 'position:absolute;left:0;top:0;display:block;overflow:visible';
    var defs = el('defs', {}, svg);
    var g1 = el('radialGradient', { id: 'pisoG', gradientUnits: 'userSpaceOnUse', cx: O.x, cy: O.y - 3000, r: 15500, gradientTransform: 'translate(' + O.x + ' ' + (O.y - 3000) + ') scale(1 0.82) translate(' + (-O.x) + ' ' + (-(O.y - 3000)) + ')' }, defs);
    el('stop', { offset: '0', 'stop-color': '#2a2c35' }, g1);
    el('stop', { offset: '.55', 'stop-color': '#1a1c22' }, g1);
    el('stop', { offset: '1', 'stop-color': '#121317' }, g1);
    var g2 = el('radialGradient', { id: 'podG', cx: '.5', cy: '.5', r: '.5' }, defs);
    el('stop', { offset: '0', 'stop-color': '#33353e' }, g2);
    el('stop', { offset: '1', 'stop-color': '#22242b' }, g2);
    var g3 = el('radialGradient', { id: 'apG', gradientUnits: 'userSpaceOnUse', cx: O.x, cy: G.A1.y0 + 2600, r: 11500, gradientTransform: 'translate(' + O.x + ' ' + (G.A1.y0 + 2600) + ') scale(1 0.62) translate(' + (-O.x) + ' ' + (-(G.A1.y0 + 2600)) + ')' }, defs);
    el('stop', { offset: '0', 'stop-color': '#4a3a30' }, g3);
    el('stop', { offset: '.6', 'stop-color': '#2c231e' }, g3);
    el('stop', { offset: '1', 'stop-color': '#1c1715' }, g3);
    var f2 = el('filter', { id: 'blurG', x: '-20%', y: '-20%', width: '140%', height: '140%' }, defs);
    el('feGaussianBlur', { stdDeviation: 110 }, f2);
    var f = el('filter', { id: 'blurS', x: '-20%', y: '-20%', width: '140%', height: '140%' }, defs);
    el('feGaussianBlur', { stdDeviation: 40 }, f);


    /* proscênio do 1º ato: plataforma em meia-elipse à frente do pódio, com piso de madeira, arco de luzes e fileiras de estantes */
    var a1 = stations.filter(function (s) { return s.act === 1; });
    var posAll = layout(stations);
    if (a1.length) {
      var A = G.A1, ex = function (k) { return arcE(O.x, A.y0, A.rx * k, A.ry * k); };
      function arcE(cx, cy, rx_, ry_) { return 'M' + (cx - rx_) + ' ' + cy + 'A' + rx_ + ' ' + ry_ + ' 0 0 0 ' + (cx + rx_) + ' ' + cy; }
      el('ellipse', { cx: O.x, cy: A.y0 + 120, rx: A.rx + 200, ry: A.ry + 260, fill: 'rgba(0,0,0,.55)', filter: 'url(#blurS)' }, svg);
      el('path', { d: ex(1) + 'Z', fill: 'url(#apG)', stroke: 'rgba(255,214,160,.30)', 'stroke-width': 10, 'stroke-linejoin': 'round' }, svg);
      el('path', { d: ex(1.07), fill: 'none', stroke: 'rgba(255,205,140,.10)', 'stroke-width': 8 }, svg);
      /* tábuas: arcos concêntricos */
      var gB = el('g', { fill: 'none', stroke: 'rgba(255,225,180,.06)', 'stroke-width': 7 }, svg), q;
      for (q = 0.12; q < 0.93; q += 0.075) el('path', { d: ex(q) }, gB);
      /* poça de luz quente no centro */
      el('ellipse', { cx: O.x, cy: A.y0 + 3200, rx: 8600, ry: 2800, fill: 'rgba(255,200,130,.075)', filter: 'url(#blurG)' }, svg);
      /* arco: faixa vermelha interna + luzes de ribalta */
      el('path', { d: ex(0.935), fill: 'none', stroke: 'rgba(227,0,27,.62)', 'stroke-width': 16, 'stroke-linecap': 'round' }, svg);
      el('path', { d: ex(0.975), fill: 'none', stroke: 'rgba(255,196,120,.34)', 'stroke-width': 150, 'stroke-dasharray': '0 330', 'stroke-linecap': 'round', filter: 'url(#blurG)' }, svg);
      el('path', { d: ex(0.975), fill: 'none', stroke: '#ffe3b0', 'stroke-opacity': .85, 'stroke-width': 50, 'stroke-dasharray': '0 330', 'stroke-linecap': 'round' }, svg);
      /* trilha tracejada: capa -> ... -> almoço -> pódio */
      var pts = a1.map(function (s) { return posAll[s.id]; }), d2 = '', i2, p0, p1, p2, p3;
      pts.push({ x: O.x, y: O.y + 1300 });
      for (i2 = 0; i2 < pts.length - 1; i2++) {
        p0 = pts[Math.max(0, i2 - 1)]; p1 = pts[i2]; p2 = pts[i2 + 1]; p3 = pts[Math.min(pts.length - 1, i2 + 2)];
        if (!i2) d2 += 'M' + p1.x.toFixed(0) + ' ' + p1.y.toFixed(0);
        d2 += 'C' + (p1.x + (p2.x - p0.x) / 6).toFixed(0) + ' ' + (p1.y + (p2.y - p0.y) / 6).toFixed(0) + ' ' + (p2.x - (p3.x - p1.x) / 6).toFixed(0) + ' ' + (p2.y - (p3.y - p1.y) / 6).toFixed(0) + ' ' + p2.x.toFixed(0) + ' ' + p2.y.toFixed(0);
      }
      el('path', { d: d2, fill: 'none', stroke: 'rgba(227,0,27,.55)', 'stroke-width': 26, 'stroke-dasharray': '90 120', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'class': 'trail' }, svg);
    }

    /* plataforma do palco: meia elipse + frente reta */
    var rx = 14700, ry = 12400, bottom = O.y + 1500;
    var d = 'M' + (O.x - rx) + ' ' + bottom + 'L' + (O.x - rx) + ' ' + O.y + 'A' + rx + ' ' + ry + ' 0 0 1 ' + (O.x + rx) + ' ' + O.y + 'L' + (O.x + rx) + ' ' + bottom + 'Z';
    el('path', { d: d, fill: 'url(#pisoG)', stroke: 'rgba(255,255,255,.13)', 'stroke-width': 8, 'stroke-linejoin': 'round' }, svg);
    el('path', { d: 'M' + (O.x - rx) + ' ' + bottom + 'L' + (O.x + rx) + ' ' + bottom, stroke: 'rgba(227,0,27,.45)', 'stroke-width': 14, fill: 'none' }, svg);

    /* tábuas do piso: arcos radiais finos */
    var A = 100 * DEG, gTier = el('g', { fill: 'none', stroke: 'rgba(255,255,255,.075)', 'stroke-width': 9, 'stroke-linecap': 'round' }, svg);
    [['front', -800], ['mid', -800], ['back', -800], ['back', 1900]].forEach(function (t) {
      el('path', { d: arcPath(R[t[0]], t[1], -A, A) }, gTier);
    });
    /* cadeiras: pontos ao longo dos arcos (traço pontilhado com cap redondo) */
    var gCh = el('g', { fill: 'none', stroke: 'rgba(255,255,255,.17)', 'stroke-width': 62, 'stroke-linecap': 'round', 'stroke-dasharray': '0 330' }, svg);
    ['front', 'mid', 'back'].forEach(function (k) { el('path', { d: arcPath(R[k], 1150, -92 * DEG, 92 * DEG) }, gCh); });
    var gCh2 = el('g', { fill: 'none', stroke: 'rgba(255,255,255,.10)', 'stroke-width': 62, 'stroke-linecap': 'round', 'stroke-dasharray': '0 330' }, svg);
    ['front', 'mid', 'back'].forEach(function (k) { el('path', { d: arcPath(R[k], 1620, -88 * DEG, 88 * DEG) }, gCh2); });

    /* pódio do regente: degraus concêntricos */
    var gP = el('g', {}, svg);
    el('ellipse', { cx: O.x, cy: O.y + 70, rx: 2750, ry: 1480, fill: 'rgba(0,0,0,.55)', filter: 'url(#blurS)' }, gP);
    el('ellipse', { cx: O.x, cy: O.y, rx: 2600, ry: 1380, fill: '#1c1d23', stroke: 'rgba(255,255,255,.14)', 'stroke-width': 8 }, gP);
    el('ellipse', { cx: O.x, cy: O.y - 40, rx: 2250, ry: 1180, fill: 'url(#podG)', stroke: 'rgba(255,255,255,.18)', 'stroke-width': 8 }, gP);
    el('ellipse', { cx: O.x, cy: O.y - 80, rx: 1900, ry: 980, fill: 'none', stroke: 'rgba(227,0,27,.5)', 'stroke-width': 10 }, gP);

    /* rótulos dos naipes (no chão) */
    var by = {};
    stations.forEach(function (s) { if (s.act !== 1) (by[s.mov] = by[s.mov] || []).push(s); });
    var pos = layout(stations);
    function label(mov, ids, inward) {
      if (!ids.length) return;
      var cx = 0, cy = 0;
      ids.forEach(function (s) { cx += pos[s.id].x; cy += pos[s.id].y; });
      cx /= ids.length; cy /= ids.length;
      var vx = O.x - cx, vy = O.y - cy, vl = Math.sqrt(vx * vx + vy * vy) || 1;
      var lx = cx + vx / vl * inward, ly = cy + vy / vl * inward;
      var rot = lookRot(lx, ly) * 0.9, m = MOV[mov];
      var g = el('g', { transform: 'translate(' + lx.toFixed(0) + ' ' + ly.toFixed(0) + ') rotate(' + rot.toFixed(1) + ')', 'text-anchor': 'middle', 'font-family': 'Montserrat,Arial,sans-serif', fill: '#fff' }, svg);
      var t1 = el('text', { x: 0, y: 0, 'font-size': 330, 'font-weight': 900, 'letter-spacing': 46, opacity: 0.14 }, g);
      t1.textContent = mov + ' · ' + m.sec;
      var t2 = el('text', { x: 0, y: 330, 'font-size': 190, 'font-weight': 700, 'letter-spacing': 14, opacity: 0.12 }, g);
      t2.textContent = m.sub;
    }
    label(1, by[1] || [], 2500);
    label(2, by[2] || [], 2500);
    label(3, by[3] || [], 1850);
    var back = (by[4] || []).concat(by[5] || []);
    label(4, by[4] || [], -1750);
    label(5, by[5] || [], -1750);

    /* rótulos do 1º ato (no chão do proscênio) e do 2º ato */
    var FF = 'Montserrat,Arial,sans-serif';
    if (a1.length) {
      var A2 = G.A1, grp = {};
      a1.forEach(function (s) { (grp[s.mov] = grp[s.mov] || []).push(s); });
      Object.keys(grp).forEach(function (mv) {
        var mem = grp[mv], nOut = a1.length - Math.min(3, a1.length), outer = mem.filter(function (s) { return a1.indexOf(s) < nOut; }), use = outer.length ? outer : mem, cx = 0;
        use.forEach(function (s) { cx += posAll[s.id].x; }); cx = cx / use.length;
        var t = outer.length ? A2.out : A2.inn, pt = tierPt(t, cx - O.x), nm = (MOV1[mv] || ('Grupo ' + mv)).toUpperCase();
        var g = el('g', { transform: 'translate(' + pt.x.toFixed(0) + ' ' + (pt.y + 1090 + 420).toFixed(0) + ') rotate(' + (pt.rot * 0.85).toFixed(1) + ')', 'text-anchor': 'middle', 'font-family': FF, fill: '#ffe3b0' }, svg);
        var tt = el('text', { x: 0, y: 0, 'font-size': 190, 'font-weight': 800, 'letter-spacing': 22, opacity: 0.52 }, g); tt.textContent = nm;
      });
      var gT = el('g', { 'text-anchor': 'middle', 'font-family': FF, fill: '#ffe3b0', transform: 'translate(' + (O.x - 4500) + ' ' + (A2.inn.y - 60) + ') rotate(2)' }, svg);
      var t1a = el('text', { x: 0, y: 0, 'font-size': 330, 'font-weight': 900, 'letter-spacing': 40, opacity: 0.34 }, gT); t1a.textContent = '1º ATO · MANHÃ';
      var t2a = el('text', { x: 0, y: 320, 'font-size': 186, 'font-weight': 700, 'letter-spacing': 14, opacity: 0.28 }, gT); t2a.textContent = 'Do processo ao propósito';
    }
    if (stations.some(function (s) { return s.act !== 1; })) {
      var gA = el('g', { 'text-anchor': 'middle', 'font-family': FF, fill: '#fff' }, svg);
      var t1b = el('text', { x: O.x + 5900, y: 13650, 'font-size': 260, 'font-weight': 900, 'letter-spacing': 34, opacity: 0.22 }, gA); t1b.textContent = '2º ATO · TARDE';
      var t2b = el('text', { x: O.x + 5900, y: 13920, 'font-size': 160, 'font-weight': 700, 'letter-spacing': 12, opacity: 0.18 }, gA); t2b.textContent = 'A orquestra da IA';
    }
    var pl = el('text', { x: O.x, y: O.y + 1700, 'text-anchor': 'middle', 'font-size': 170, 'font-weight': 800, 'letter-spacing': 40, fill: '#fff', opacity: 0.12, 'font-family': 'Montserrat,Arial,sans-serif' }, svg);
    pl.textContent = 'PÓDIO · REGENTE';

    host.appendChild(svg);
    bakeFloor(svg, host);

    /* holofote que acompanha a estação atual */
    var spot = document.createElement('div');
    spot.className = 'spot';
    spot.style.cssText = 'position:absolute;left:0;top:0;width:5200px;height:3600px;margin:-1800px 0 0 -2600px;pointer-events:none;opacity:0;' +
      'background:radial-gradient(ellipse at center,rgba(255,230,185,.13) 0%,rgba(255,210,150,.06) 34%,rgba(255,200,130,0) 70%)';
    host.appendChild(spot);
    return spot;
  }

  /* Notas musicais subindo no fundo (canvas, coordenadas de tela). */
  function Particles(canvas) {
    var ctx = canvas.getContext('2d'), w = 0, h = 0, dpr = 1, items = [], raf = 0, last = 0, running = false, hid = false;
    var reduce = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function resize() {
      dpr = 1;
      w = root.innerWidth; h = root.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function mk(initial) {
      return { x: Math.random() * w, y: initial ? Math.random() * h : h + 60, s: 0.55 + Math.random() * 0.6, vy: 10 + Math.random() * 20,
        ph: Math.random() * 6.28, sw: 14 + Math.random() * 26, kind: Math.random() < 0.35 ? 1 : 0,
        a: 0.07 + Math.random() * 0.10, red: Math.random() < 0.12, rot: (Math.random() - 0.5) * 0.5 };
    }
    function drawNote(n, t) {
      var x = n.x + Math.sin(t * 0.0004 + n.ph) * n.sw, y = n.y, s = n.s * 7;
      ctx.save(); ctx.translate(x, y); ctx.rotate(n.rot * Math.sin(t * 0.0003 + n.ph));
      ctx.globalAlpha = n.a * Math.min(1, (h - y + 40) / 160) * Math.min(1, (y + 40) / 160);
      ctx.fillStyle = ctx.strokeStyle = n.red ? '#e3001b' : '#ffffff';
      ctx.lineWidth = Math.max(1.2, s * 0.22);
      function head(hx, hy) { ctx.beginPath(); ctx.ellipse(hx, hy, s * 0.95, s * 0.68, -0.4, 0, 6.2832); ctx.fill(); }
      if (n.kind === 0) {
        head(0, 0);
        ctx.beginPath(); ctx.moveTo(s * 0.88, -s * 0.2); ctx.lineTo(s * 0.88, -s * 3.6);
        ctx.bezierCurveTo(s * 0.9, -s * 2.6, s * 2.3, -s * 2.5, s * 2.1, -s * 1.1); ctx.stroke();
      } else {
        head(0, 0); head(s * 2.4, -s * 0.4);
        ctx.beginPath(); ctx.moveTo(s * 0.88, -s * 0.2); ctx.lineTo(s * 0.88, -s * 3.4);
        ctx.moveTo(s * 3.28, -s * 0.6); ctx.lineTo(s * 3.28, -s * 3.8); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(s * 0.88, -s * 3.4); ctx.lineTo(s * 3.28, -s * 3.8); ctx.lineTo(s * 3.28, -s * 3.0); ctx.lineTo(s * 0.88, -s * 2.6); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    }
    function tick(t) {
      if (!running) return;
      if (root.__orqFlying) { if (!hid) { ctx.clearRect(0, 0, w, h); hid = true; } last = t; raf = root.requestAnimationFrame(tick); return; }
      if (t - last < 30) { raf = root.requestAnimationFrame(tick); return; }
      hid = false;
      var dt = Math.min(0.08, (t - last) / 1000 || 0.016); last = t;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < items.length; i++) {
        var n = items[i]; n.y -= n.vy * dt;
        if (n.y < -80) items[i] = n = mk(false);
        drawNote(n, t);
      }
      raf = root.requestAnimationFrame(tick);
    }
    function start() {
      if (reduce || running) return;
      resize(); items = []; for (var i = 0; i < 14; i++) items.push(mk(true));
      running = true; last = performance.now(); raf = root.requestAnimationFrame(tick);
    }
    function stop() { running = false; root.cancelAnimationFrame(raf); ctx.clearRect(0, 0, w, h); }
    root.addEventListener('resize', function () { if (running) resize(); });
    return { start: start, stop: stop };
  }

  root.STAGE = { G: G, MOV: MOV, layout: layout, lookRot: lookRot, rotFor: rotFor, MOV1: MOV1, bounds: bounds, corners: corners, buildFloor: buildFloor, Particles: Particles };
  if (typeof module !== 'undefined') module.exports = root.STAGE;
})(typeof window !== 'undefined' ? window : globalThis);
