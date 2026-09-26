// ─────────────────────────────────────────────────────────────
//  Árbol de cuervos — un árbol sin hojas cuyas "hojas" son cuervos.
//  Pasa el mouse (o el dedo) y los cuervos salen volando.
//  Versión Matrix: lluvia de código, árbol de neón y cuervos
//  que dejan una estela de caracteres al volar.
//  El árbol se toma de una silueta (imagen) y los puntos de posado
//  se precalcularon sobre el borde superior de sus ramas.
// ─────────────────────────────────────────────────────────────

import { TREE_DATA } from './tree-data';

const enum State {
  Perched,
  Flying,
  Away,
  Returning,
}

interface Crow {
  px: number;
  py: number; // punto donde se posa
  x: number;
  y: number; // posición actual
  vx: number;
  vy: number; // velocidad
  state: State;
  size: number;
  dir: 1 | -1; // hacia dónde mira
  flap: number; // fase del aleteo
  flapSpeed: number;
  startleAt: number; // momento programado para asustarse (-1 = nada)
  startleLevel: number; // cuánto se propaga el susto
  awayUntil: number; // cuándo vuelve
  phase: number; // para el vaivén del vuelo
}

// ── Configuración ────────────────────────────────────────────
const CONFIG = {
  targetCrows: 650, // cuántos cuervos se intentan posar
  scareRadius: 80, // radio del mouse que asusta
  chainRadius: 44, // radio del susto contagioso
  chainChance: 0.45,
  returnMin: 5000, // ms fuera antes de volver
  returnMax: 13000,
};

export interface CrowSceneOptions {
  canvas: HTMLCanvasElement;
  rainCanvas: HTMLCanvasElement;
  counterEl?: HTMLElement;
  callBtn?: HTMLButtonElement;
  rainEnabled?: boolean;
  interactionTarget?: HTMLElement;
  treeAnchor?: HTMLElement;
  onReady?: () => void;
  onError?: (error: unknown) => void;
}

/** Iniciar después de montar el DOM; ejecutar la función devuelta al desmontar. */
export function createCrowScene({
  canvas,
  rainCanvas,
  counterEl,
  callBtn,
  rainEnabled = true,
  interactionTarget = canvas,
  treeAnchor,
  onReady,
  onError,
}: CrowSceneOptions): () => void {
  const sceneContext = canvas.getContext('2d');
  const rainContext = rainCanvas.getContext('2d');
  if (!sceneContext || !rainContext) {
    onError?.(new Error('No se pudo iniciar el canvas del árbol de cuervos.'));
    return () => {};
  }
  const ctx = sceneContext;
  const rctx = rainContext;
  let disposed = false;
  let ready = false;
  let animationFrame = 0;
  let resizeTimer = 0;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = motionQuery.matches;

  // ── Paleta y glifos Matrix ───────────────────────────────────
  const GREEN = '#00FF41';
  const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789:=*+-<>¦';
  const glyph = () => GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
  const MONO = '"Share Tech Mono", "MS Gothic", "Osaka-Mono", monospace';

  // Estela de caracteres que sueltan los cuervos
  interface Particle {
    x: number;
    y: number;
    ch: string;
    life: number;
    vy: number;
    size: number;
  }
  const particles: Particle[] = [];
  const MAX_PARTICLES = 1400;
  function emit(x: number, y: number, size: number): void {
    if (particles.length >= MAX_PARTICLES) return;
    particles.push({ x, y, ch: glyph(), life: 1, vy: rand(0.2, 0.8), size });
  }

  // Lluvia de código de fondo
  const RAIN_FONT = 16;
  let drops: number[] = [];
  let lastRain = 0;
  let W = 0,
    H = 0,
    DPR = 1;
  const treeImg = new Image();
  treeImg.src = TREE_DATA.src;
  // dónde y a qué escala se dibuja la silueta
  const tree = { x: 0, y: 0, scale: 1, w: 0, h: 0 };
  const treeArea = { x: 0, y: 0, width: 0, height: 0 };
  let crows: Crow[] = [];
  let backdrop: HTMLCanvasElement; // cielo + árbol, se pinta una sola vez
  const mouse = { x: -9999, y: -9999, active: false };

  // Grilla espacial para buscar vecinos rápido
  const CELL = 32;
  let gridCols = 0,
    gridRows = 0;
  let grid: number[][] = [];

  const rand = (a: number, b: number) => a + Math.random() * (b - a);

  // ── Ubicación del árbol en pantalla ─────────────────────────
  function layoutTree(): void {
    const canvasBounds = canvas.getBoundingClientRect();
    const bounds = treeAnchor?.getBoundingClientRect() ?? canvasBounds;
    treeArea.x = bounds.left - canvasBounds.left;
    treeArea.y = bounds.top - canvasBounds.top;
    treeArea.width = Math.max(1, bounds.width);
    treeArea.height = Math.max(1, bounds.height);
    const groundY = treeArea.y + treeArea.height * (treeAnchor ? 1 : 0.975);
    const h = treeArea.height * 0.96;
    let scale = h / TREE_DATA.h;
    if (TREE_DATA.w * scale > treeArea.width * 1.05) scale = (treeArea.width * 1.05) / TREE_DATA.w;
    tree.scale = scale;
    tree.w = TREE_DATA.w * scale;
    tree.h = TREE_DATA.h * scale;
    tree.x = treeArea.x + (treeArea.width - tree.w) / 2;
    tree.y = groundY - tree.h;
  }

  // Pinta la silueta de un color (o patrón) usando el alfa de la imagen
  function tinted(
    fill: (g: CanvasRenderingContext2D, w: number, h: number) => void,
  ): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = Math.ceil(tree.w * DPR);
    c.height = Math.ceil(tree.h * DPR);
    const g = c.getContext('2d')!;
    g.scale(DPR, DPR);
    fill(g, tree.w, tree.h);
    g.globalCompositeOperation = 'destination-in';
    g.drawImage(treeImg, 0, 0, tree.w, tree.h);
    return c;
  }

  // ── Fondo: árbol de neón (se pinta una sola vez) ─────────────
  function paintBackdrop(): void {
    backdrop = document.createElement('canvas');
    backdrop.width = W * DPR;
    backdrop.height = H * DPR;
    const b = backdrop.getContext('2d')!;
    b.scale(DPR, DPR);
    b.lineCap = 'round';

    // halo verde detrás del árbol
    const halo = b.createRadialGradient(
      tree.x + tree.w / 2,
      tree.y + tree.h * 0.35,
      0,
      tree.x + tree.w / 2,
      tree.y + tree.h * 0.35,
      Math.min(treeArea.width, treeArea.height) * 0.6,
    );
    halo.addColorStop(0, 'rgba(0,255,65,0.07)');
    halo.addColorStop(1, 'rgba(0,255,65,0)');
    b.fillStyle = halo;
    b.fillRect(0, 0, W, H);

    // resplandor exterior: silueta verde con sombra difusa
    const glow = tinted((g, w, h) => {
      g.fillStyle = GREEN;
      g.fillRect(0, 0, w, h);
    });
    b.save();
    b.shadowColor = GREEN;
    b.shadowBlur = 18;
    b.globalAlpha = 0.85;
    b.drawImage(glow, tree.x, tree.y, tree.w, tree.h);
    b.restore();

    // relleno: el árbol está hecho de código
    const code = tinted((g, w, h) => {
      g.fillStyle = '#0B6E2C';
      g.fillRect(0, 0, w, h);
      const fs = Math.max(9, Math.round(tree.w / 90));
      g.font = `${fs}px ${MONO}`;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      for (let y = fs / 2; y < h; y += fs) {
        for (let x = fs / 2; x < w; x += fs * 0.8) {
          const v = Math.random();
          g.fillStyle =
            v > 0.92 ? '#B8FFC8' : v > 0.5 ? 'rgba(0,255,65,0.85)' : 'rgba(0,200,60,0.45)';
          g.fillText(glyph(), x, y);
        }
      }
    });
    b.drawImage(code, tree.x, tree.y, tree.w, tree.h);

    // línea del suelo
    const g = b.createLinearGradient(treeArea.x, 0, treeArea.x + treeArea.width, 0);
    g.addColorStop(0, 'rgba(0,255,65,0)');
    g.addColorStop(0.5, 'rgba(0,255,65,0.8)');
    g.addColorStop(1, 'rgba(0,255,65,0)');
    b.strokeStyle = g;
    b.lineWidth = 1.5;
    b.shadowBlur = 10;
    b.beginPath();
    b.moveTo(treeArea.x, tree.y + tree.h - 2);
    b.lineTo(treeArea.x + treeArea.width, tree.y + tree.h - 2);
    b.stroke();
  }

  function rainStep(now: number): void {
    if (now - lastRain < (reduceMotion ? 90 : 45)) return;
    lastRain = now;
    rctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    rctx.fillStyle = 'rgba(0,0,0,0.075)';
    rctx.fillRect(0, 0, W, H);
    rctx.font = `${RAIN_FONT}px ${MONO}`;
    rctx.textAlign = 'left';
    rctx.textBaseline = 'top';
    for (let i = 0; i < drops.length; i++) {
      const drop = drops[i];
      if (drop === undefined) continue;
      const y = drop * RAIN_FONT;
      // cabeza casi blanca, cola verde oscuro
      rctx.fillStyle = 'rgba(0,120,35,0.9)';
      rctx.fillText(glyph(), i * RAIN_FONT, y - RAIN_FONT);
      rctx.fillStyle = '#B8FFC8';
      rctx.fillText(glyph(), i * RAIN_FONT, y);
      drops[i] = y > H && Math.random() > 0.975 ? rand(-20, 0) : drop + 1;
    }
  }

  // ── Colocar cuervos sobre las ramas ──────────────────────────
  function perchCrows(): void {
    crows = [];
    const s =
      Math.max(2.5, Math.min(treeArea.width, treeArea.height) / 78) * (treeAnchor ? 1.2 : 1);
    const targetCrows =
      treeArea.width < 360
        ? Math.max(40, Math.round((treeArea.width * treeArea.height) / 600))
        : CONFIG.targetCrows;
    let minDist = s * 1.6;
    const occupied = new Map<string, Array<[number, number]>>();
    const key = (x: number, y: number) => `${Math.floor(x / 12)},${Math.floor(y / 12)}`;

    const free = (x: number, y: number): boolean => {
      const cx = Math.floor(x / 12),
        cy = Math.floor(y / 12);
      const reach = Math.ceil(minDist / 12);
      for (let i = -reach; i <= reach; i++)
        for (let j = -reach; j <= reach; j++) {
          const list = occupied.get(`${cx + i},${cy + j}`);
          if (!list) continue;
          for (const [ox, oy] of list)
            if ((ox - x) ** 2 + (oy - y) ** 2 < minDist * minDist) return false;
        }
      return true;
    };

    const candidates: Array<[number, number]> = [];
    const P = TREE_DATA.p;
    for (let i = 0; i < P.length; i += 2) {
      const x = P[i],
        y = P[i + 1];
      if (x === undefined || y === undefined) continue;
      candidates.push([tree.x + x * tree.scale, tree.y + y * tree.scale]);
    }
    // mezclar para distribuir parejo
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j]!, candidates[i]!];
    }

    // Varias pasadas: primero repartidos, luego se van llenando los huecos
    // (acercándose cada vez más) hasta llegar a la cantidad deseada.
    const used = new Uint8Array(candidates.length);
    while (crows.length < targetCrows && minDist > s * 0.2) {
      for (let n = 0; n < candidates.length && crows.length < targetCrows; n++) {
        if (used[n]) continue;
        const candidate = candidates[n];
        if (!candidate) continue;
        const [x, y] = candidate;
        if (!free(x, y)) continue;
        used[n] = 1;
        const k = key(x, y);
        if (!occupied.has(k)) occupied.set(k, []);
        occupied.get(k)!.push([x, y]);
        crows.push({
          px: x,
          py: y,
          x,
          y,
          vx: 0,
          vy: 0,
          state: State.Perched,
          size: s * rand(0.85, 1.15),
          dir: Math.random() < 0.5 ? 1 : -1,
          flap: rand(0, Math.PI * 2),
          flapSpeed: rand(0.35, 0.5),
          startleAt: -1,
          startleLevel: 0,
          awayUntil: 0,
          phase: rand(0, 1000),
        });
      }
      minDist *= 0.85;
    }
    // de atrás hacia adelante al azar, para que se encimen de forma natural
    crows.sort((a, b) => a.py - b.py);
    buildGrid();
  }

  function buildGrid(): void {
    gridCols = Math.ceil(W / CELL) + 1;
    gridRows = Math.ceil(H / CELL) + 1;
    grid = Array.from({ length: gridCols * gridRows }, () => []);
    crows.forEach((c, i) => {
      const gx = Math.floor(c.px / CELL),
        gy = Math.floor(c.py / CELL);
      if (gx >= 0 && gy >= 0 && gx < gridCols && gy < gridRows) grid[gy * gridCols + gx]?.push(i);
    });
  }

  function neighbors(x: number, y: number, r: number, fn: (i: number) => void): void {
    const r2 = r * r;
    const gx0 = Math.max(0, Math.floor((x - r) / CELL)),
      gx1 = Math.min(gridCols - 1, Math.floor((x + r) / CELL));
    const gy0 = Math.max(0, Math.floor((y - r) / CELL)),
      gy1 = Math.min(gridRows - 1, Math.floor((y + r) / CELL));
    for (let gy = gy0; gy <= gy1; gy++)
      for (let gx = gx0; gx <= gx1; gx++) {
        for (const i of grid[gy * gridCols + gx] ?? []) {
          const c = crows[i];
          if (!c) continue;
          if ((c.px - x) ** 2 + (c.py - y) ** 2 <= r2) fn(i);
        }
      }
  }

  // ── Comportamiento ───────────────────────────────────────────
  function schedule(c: Crow, now: number, delay: number, level: number): void {
    if (c.state !== State.Perched) return;
    if (c.startleAt >= 0 && c.startleAt <= now + delay) return;
    c.startleAt = now + delay;
    c.startleLevel = level;
  }

  function takeOff(c: Crow, now: number): void {
    c.state = State.Flying;
    c.startleAt = -1;
    // huyen alejándose del mouse, siempre hacia arriba
    let dx = c.x - mouse.x,
      dy = c.y - mouse.y;
    const d = Math.hypot(dx, dy) || 1;
    dx /= d;
    dy /= d;
    const speed = rand(2.2, 4);
    c.vx = dx * speed + rand(-1, 1);
    c.vy = Math.min(-1.2, dy * speed) - rand(1, 2.5);
    c.dir = c.vx >= 0 ? 1 : -1;
    c.flapSpeed = rand(0.45, 0.65);
    for (let k = 0; k < 3; k++) emit(c.px + rand(-4, 4), c.py + rand(-4, 2), c.size * 3.2);

    // el susto se contagia a los vecinos
    if (c.startleLevel > 0) {
      const lvl = c.startleLevel - 1;
      neighbors(c.px, c.py, CONFIG.chainRadius, (i) => {
        const neighbor = crows[i];
        if (neighbor && Math.random() < CONFIG.chainChance)
          schedule(neighbor, now, rand(60, 380), lvl);
      });
    }
  }

  function update(now: number, dt: number): void {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (!p) continue;
      p.life -= 0.022 * dt;
      p.y += p.vy * dt;
      if (Math.random() < 0.08) p.ch = glyph();
      if (p.life <= 0) {
        const tail = particles.pop();
        if (tail && i < particles.length) particles[i] = tail;
      }
    }

    if (mouse.active) {
      neighbors(mouse.x, mouse.y, CONFIG.scareRadius, (i) => {
        const c = crows[i];
        if (!c) return;
        const d = Math.hypot(c.px - mouse.x, c.py - mouse.y);
        schedule(c, now, (d / CONFIG.scareRadius) * 180 + rand(0, 90), 2);
      });
    }

    for (const c of crows) {
      switch (c.state) {
        case State.Perched:
          if (c.startleAt >= 0 && now >= c.startleAt) takeOff(c, now);
          else if (Math.random() < 0.0004 * dt) c.dir = c.dir === 1 ? -1 : 1;
          break;

        case State.Flying: {
          c.vy -= 0.05 * dt;
          c.vx *= 1 + 0.008 * dt;
          c.vy += Math.sin(now * 0.004 + c.phase) * 0.04 * dt;
          c.x += c.vx * dt;
          c.y += c.vy * dt;
          c.flap += c.flapSpeed * dt;
          if (Math.random() < 0.18 * dt) emit(c.x - c.vx * 2, c.y - c.vy * 2, c.size * 3);
          if (c.x < -60 || c.x > W + 60 || c.y < -60) {
            c.state = State.Away;
            c.awayUntil = now + rand(CONFIG.returnMin, CONFIG.returnMax);
          }
          break;
        }

        case State.Away:
          if (now >= c.awayUntil) {
            c.state = State.Returning;
            // entran desde arriba o desde los costados
            const edge = Math.random();
            if (edge < 0.6) {
              c.x = rand(-40, W + 40);
              c.y = -40;
            } else if (edge < 0.8) {
              c.x = -40;
              c.y = rand(0, H * 0.5);
            } else {
              c.x = W + 40;
              c.y = rand(0, H * 0.5);
            }
            c.vx = 0;
            c.vy = 1;
            c.flapSpeed = rand(0.35, 0.5);
          }
          break;

        case State.Returning: {
          const dx = c.px - c.x,
            dy = c.py - c.y;
          const d = Math.hypot(dx, dy);
          // si el mouse sigue cerca del lugar, dan vuelta y se van otra vez
          if (
            mouse.active &&
            d < 140 &&
            Math.hypot(c.px - mouse.x, c.py - mouse.y) < CONFIG.scareRadius
          ) {
            c.startleLevel = 0;
            takeOff(c, now);
            break;
          }
          if (d < 1.5) {
            c.state = State.Perched;
            c.x = c.px;
            c.y = c.py;
            c.vx = 0;
            c.vy = 0;
            break;
          }
          const sp = Math.min(4.5, d * 0.045 + 0.4);
          c.vx += ((dx / d) * sp - c.vx) * 0.07 * dt;
          c.vy += ((dy / d) * sp - c.vy) * 0.07 * dt;
          c.x += c.vx * dt;
          c.y += c.vy * dt;
          if (Math.abs(c.vx) > 0.2) c.dir = c.vx > 0 ? 1 : -1;
          c.flap += c.flapSpeed * (d < 30 ? 1.4 : 1) * dt;
          break;
        }
      }
    }
  }

  // ── Dibujo de siluetas ───────────────────────────────────────
  // Coordenadas locales: x hacia adelante, y negativa = arriba.
  const PERCHED: ReadonlyArray<readonly [number, number]> = [
    [1.1, -1.95],
    [1.55, -1.7],
    [2.35, -1.45],
    [1.55, -1.25],
    [1.25, -0.85],
    [1.05, -0.2],
    [0.45, 0.3],
    [-0.55, 0.25],
    [-1.75, 1.0],
    [-1.95, 0.72],
    [-0.95, -0.45],
    [0.15, -1.3],
    [0.55, -1.85],
  ];
  const FLY_BODY: ReadonlyArray<readonly [number, number]> = [
    [2.2, 0.05],
    [1.5, -0.3],
    [0.6, -0.38],
    [-0.8, -0.22],
    [-1.9, -0.55],
    [-2.0, 0.35],
    [-0.8, 0.25],
    [0.6, 0.35],
    [1.5, 0.25],
  ];

  function addShape(
    pts: ReadonlyArray<readonly [number, number]>,
    x: number,
    y: number,
    s: number,
    dir: number,
    cos: number,
    sin: number,
  ): void {
    for (let i = 0; i < pts.length; i++) {
      const point = pts[i];
      if (!point) continue;
      const lx = point[0] * dir * s,
        ly = point[1] * s;
      const X = x + lx * cos - ly * sin;
      const Y = y + lx * sin + ly * cos;
      if (i === 0) ctx.moveTo(X, Y);
      else ctx.lineTo(X, Y);
    }
    ctx.closePath();
  }

  function drawFlying(c: Crow): void {
    const s = c.size;
    // inclinación según la velocidad
    let ang = Math.atan2(c.vy, Math.abs(c.vx) + 0.001);
    ang = Math.max(-0.7, Math.min(0.7, ang)) * c.dir;
    const cos = Math.cos(ang),
      sin = Math.sin(ang);
    addShape(FLY_BODY, c.x, c.y, s, c.dir, cos, sin);
    // alas: la punta sube y baja
    const f = Math.sin(c.flap);
    const tipY = -f * 2.9;
    const midY = -f * 1.5 - 0.3;
    const wing: Array<[number, number]> = [
      [0.8, 0],
      [0.3, midY],
      [-0.4, tipY],
      [-0.7, midY * 0.7],
      [-0.5, 0],
    ];
    addShape(wing, c.x, c.y, s, c.dir, cos, sin);
  }

  function render(): void {
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(backdrop, 0, 0, W, H);

    // cuervos posados: masa verde que hace de follaje
    // tres tonos para que cada cuervo se distinga dentro de la masa
    const SHADES = ['#176437', '#237D46', '#389958'];
    let perched = 0;
    for (let shade = 0; shade < SHADES.length; shade++) {
      ctx.fillStyle = SHADES[shade] ?? GREEN;
      ctx.beginPath();
      for (let i = shade; i < crows.length; i += SHADES.length) {
        const c = crows[i];
        if (!c) continue;
        if (c.state === State.Perched) {
          perched++;
          addShape(PERCHED, c.x, c.y - c.size * 0.25, c.size, c.dir, 1, 0);
        }
      }
      ctx.fill();
    }

    // Cuervos en vuelo con un resplandor suave.
    ctx.fillStyle = '#60AD7B';
    ctx.shadowColor = '#398D55';
    ctx.shadowBlur = 2;
    ctx.beginPath();
    for (const c of crows) {
      if (c.state === State.Flying || c.state === State.Returning) drawFlying(c);
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    // estela de caracteres
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#459965';
    for (const p of particles) {
      ctx.globalAlpha = p.life * 0.45;
      ctx.font = `${Math.round(p.size)}px ${MONO}`;
      ctx.fillText(p.ch, p.x, p.y);
    }
    ctx.globalAlpha = 1;

    if (counterEl) counterEl.textContent = perched.toLocaleString('es');
  }

  // ── Bucle principal ──────────────────────────────────────────
  let last = performance.now();
  function frame(now: number): void {
    animationFrame = 0;
    if (disposed || !ready || reduceMotion || document.hidden) return;
    const dt = Math.min(3, (now - last) / 16.667);
    last = now;
    update(now, dt);
    if (rainEnabled) rainStep(now);
    render();
    animationFrame = requestAnimationFrame(frame);
  }

  function resize(): void {
    DPR = Math.min(2, window.devicePixelRatio || 1);
    const bounds = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(bounds.width));
    H = Math.max(1, Math.round(bounds.height));
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    rainCanvas.width = W * DPR;
    rainCanvas.height = H * DPR;
    rctx.fillStyle = '#000';
    rctx.fillRect(0, 0, W * DPR, H * DPR);
    drops = Array.from({ length: Math.ceil(W / RAIN_FONT) }, () => rand(-H / RAIN_FONT, 0));
    particles.length = 0;
    layoutTree();
    paintBackdrop();
    perchCrows();
    render();
  }

  // Eventos locales: funcionan también dentro de una sección con scroll.
  function movePointer(event: PointerEvent): void {
    if (reduceMotion || !ready) return;
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) {
      clearPointer();
      return;
    }
    mouse.x = ((event.clientX - bounds.left) * W) / bounds.width;
    mouse.y = ((event.clientY - bounds.top) * H) / bounds.height;
    mouse.active = mouse.x >= 0 && mouse.x <= W && mouse.y >= 0 && mouse.y <= H;
  }
  function clearPointer(): void {
    mouse.active = false;
  }
  function releasePointer(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') clearPointer();
  }
  function recall(): void {
    const now = performance.now();
    for (const c of crows) if (c.state === State.Away) c.awayUntil = now + rand(0, 1500);
  }
  function refreshAnimation(): void {
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    clearPointer();
    if (!ready || disposed) return;
    if (reduceMotion) {
      particles.length = 0;
      for (const crow of crows) {
        crow.state = State.Perched;
        crow.x = crow.px;
        crow.y = crow.py;
        crow.startleAt = -1;
      }
      rctx.clearRect(0, 0, W * DPR, H * DPR);
      render();
    } else if (!document.hidden) {
      last = performance.now();
      animationFrame = requestAnimationFrame(frame);
    }
  }
  function motionChanged(): void {
    reduceMotion = motionQuery.matches;
    refreshAnimation();
  }
  function scheduleResize(): void {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (!ready || disposed) return;
      clearPointer();
      resize();
    }, 200);
  }
  interactionTarget.addEventListener('pointermove', movePointer, { passive: true });
  interactionTarget.addEventListener('pointerdown', movePointer, { passive: true });
  interactionTarget.addEventListener('pointerleave', clearPointer);
  interactionTarget.addEventListener('pointercancel', clearPointer);
  interactionTarget.addEventListener('pointerup', releasePointer);
  window.addEventListener('blur', clearPointer);
  callBtn?.addEventListener('click', recall);
  window.addEventListener('resize', scheduleResize);
  document.addEventListener('visibilitychange', refreshAnimation);
  motionQuery.addEventListener('change', motionChanged);
  const resizeObserver = new ResizeObserver(scheduleResize);
  resizeObserver.observe(canvas);
  if (treeAnchor) resizeObserver.observe(treeAnchor);

  function dispose(): void {
    disposed = true;
    cancelAnimationFrame(animationFrame);
    window.clearTimeout(resizeTimer);
    resizeObserver.disconnect();
    interactionTarget.removeEventListener('pointermove', movePointer);
    interactionTarget.removeEventListener('pointerdown', movePointer);
    interactionTarget.removeEventListener('pointerleave', clearPointer);
    interactionTarget.removeEventListener('pointercancel', clearPointer);
    interactionTarget.removeEventListener('pointerup', releasePointer);
    window.removeEventListener('blur', clearPointer);
    callBtn?.removeEventListener('click', recall);
    window.removeEventListener('resize', scheduleResize);
    document.removeEventListener('visibilitychange', refreshAnimation);
    motionQuery.removeEventListener('change', motionChanged);
  }

  // La carga puede terminar después de que Vue haya desmontado el componente.
  treeImg
    .decode()
    .then(() => {
      if (disposed) return;
      resize();
      ready = true;
      refreshAnimation();
      onReady?.();
    })
    .catch((error: unknown) => {
      if (disposed) return;
      dispose();
      if (onError) onError(error);
      else console.error('No se pudo cargar el árbol de cuervos.', error);
    });
  return dispose;
}
