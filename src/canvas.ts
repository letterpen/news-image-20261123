// canvas.ts — a tiny deterministic raster canvas: RGB buffer, rects, lines,
// circles, triangles, polygons, vertical gradients and seeded paper grain.

export function rgb(r: number, g: number, b: number): number {
  return ((r & 255) << 16) | ((g & 255) << 8) | (b & 255);
}

export class Canvas {
  readonly w: number;
  readonly h: number;
  readonly data: Uint8Array; // RGB, row-major

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.data = new Uint8Array(w * h * 3);
  }

  set(x: number, y: number, c: number): void {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const i = (y * this.w + x) * 3;
    this.data[i] = (c >> 16) & 255;
    this.data[i + 1] = (c >> 8) & 255;
    this.data[i + 2] = c & 255;
  }

  get(x: number, y: number): number {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return 0;
    const i = (y * this.w + x) * 3;
    return (this.data[i] << 16) | (this.data[i + 1] << 8) | this.data[i + 2];
  }

  fill(c: number): void {
    const r = (c >> 16) & 255, g = (c >> 8) & 255, b = c & 255;
    for (let i = 0; i < this.data.length; i += 3) {
      this.data[i] = r; this.data[i + 1] = g; this.data[i + 2] = b;
    }
  }

  rect(x: number, y: number, w: number, h: number, c: number): void {
    const x0 = Math.max(0, Math.floor(x)), y0 = Math.max(0, Math.floor(y));
    const x1 = Math.min(this.w, Math.ceil(x + w)), y1 = Math.min(this.h, Math.ceil(y + h));
    for (let yy = y0; yy < y1; yy++) {
      for (let xx = x0; xx < x1; xx++) this.set(xx, yy, c);
    }
  }

  hline(x0: number, x1: number, y: number, c: number): void {
    if (y < 0 || y >= this.h) return;
    const a = Math.max(0, Math.min(x0, x1)), b = Math.min(this.w - 1, Math.max(x0, x1));
    for (let x = a; x <= b; x++) this.set(x, y, c);
  }

  vline(x: number, y0: number, y1: number, c: number): void {
    if (x < 0 || x >= this.w) return;
    const a = Math.max(0, Math.min(y0, y1)), b = Math.min(this.h - 1, Math.max(y0, y1));
    for (let y = a; y <= b; y++) this.set(x, y, c);
  }

  // Bresenham line.
  line(x0: number, y0: number, x1: number, y1: number, c: number): void {
    const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    const dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    let x = x0, y = y0;
    for (;;) {
      this.set(x, y, c);
      if (x === x1 && y === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) { err += dy; x += sx; }
      if (e2 <= dx) { err += dx; y += sy; }
    }
  }

  filledCircle(cx: number, cy: number, r: number, c: number): void {
    const r2 = r * r;
    for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) {
      for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
        const dx = x - cx, dy = y - cy;
        if (dx * dx + dy * dy <= r2) this.set(x, y, c);
      }
    }
  }

  circleOutline(cx: number, cy: number, r: number, c: number, thick = 1): void {
    for (let a = 0; a < 360; a += 1) {
      const rad = (a * Math.PI) / 180;
      for (let t = 0; t < thick; t++) {
        this.set(Math.round(cx + (r - t) * Math.cos(rad)), Math.round(cy + (r - t) * Math.sin(rad)), c);
      }
    }
  }

  // Filled triangle via edge-walk scanlines.
  filledTriangle(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, c: number): void {
    const minY = Math.max(0, Math.floor(Math.min(y0, y1, y2)));
    const maxY = Math.min(this.h - 1, Math.ceil(Math.max(y0, y1, y2)));
    const edge = (ax: number, ay: number, bx: number, by: number, y: number): number =>
      ay === by ? ax : ax + ((y - ay) * (bx - ax)) / (by - ay);
    for (let y = minY; y <= maxY; y++) {
      const xs = [edge(x0, y0, x1, y1, y), edge(x1, y1, x2, y2, y), edge(x2, y2, x0, y0, y)];
      const lo = Math.max(0, Math.floor(Math.min(...xs)));
      const hi = Math.min(this.w - 1, Math.ceil(Math.max(...xs)));
      for (let x = lo; x <= hi; x++) this.set(x, y, c);
    }
  }

  // Filled polygon (list of [x,y]) via even-odd scanlines.
  filledPolygon(pts: Array<[number, number]>, c: number): void {
    let minY = Infinity, maxY = -Infinity;
    for (const [, y] of pts) { minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
    minY = Math.max(0, Math.floor(minY)); maxY = Math.min(this.h - 1, Math.ceil(maxY));
    for (let y = minY; y <= maxY; y++) {
      const xs: number[] = [];
      for (let i = 0; i < pts.length; i++) {
        const [x0, y0] = pts[i];
        const [x1, y1] = pts[(i + 1) % pts.length];
        if ((y0 <= y && y1 > y) || (y1 <= y && y0 > y)) {
          xs.push(x0 + ((y - y0) * (x1 - x0)) / (y1 - y0));
        }
      }
      xs.sort((a, b) => a - b);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const lo = Math.max(0, Math.floor(xs[k]));
        const hi = Math.min(this.w - 1, Math.ceil(xs[k + 1]));
        for (let x = lo; x <= hi; x++) this.set(x, y, c);
      }
    }
  }

  polygonOutline(pts: Array<[number, number]>, c: number): void {
    for (let i = 0; i < pts.length; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[(i + 1) % pts.length];
      this.line(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), c);
    }
  }

  vgrad(x: number, y: number, w: number, h: number, top: number, bottom: number): void {
    const tr = (top >> 16) & 255, tg = (top >> 8) & 255, tb = top & 255;
    const br = (bottom >> 16) & 255, bg = (bottom >> 8) & 255, bb = bottom & 255;
    for (let yy = 0; yy < h; yy++) {
      const t = h <= 1 ? 0 : yy / (h - 1);
      const c = rgb(
        Math.round(tr + (br - tr) * t),
        Math.round(tg + (bg - tg) * t),
        Math.round(tb + (bb - tb) * t),
      );
      this.rect(x, y + yy, w, 1, c);
    }
  }

  // Deterministic grain: seeded LCG, adds +/- amt to each channel.
  grain(x: number, y: number, w: number, h: number, seed: number, amt: number): void {
    let s = seed >>> 0;
    const next = (): number => {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };
    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        const d = Math.floor((next() - 0.5) * 2 * amt);
        if (d === 0) continue;
        const i = (yy * this.w + xx) * 3;
        this.data[i] = Math.max(0, Math.min(255, this.data[i] + d));
        this.data[i + 1] = Math.max(0, Math.min(255, this.data[i + 1] + d));
        this.data[i + 2] = Math.max(0, Math.min(255, this.data[i + 2] + d));
      }
    }
  }
}
