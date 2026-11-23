// scenes.ts — three dark, saturated scene illustrations for the heroes,
// painted with the canvas primitives only. Deterministic throughout.

import { Canvas, rgb } from "./canvas.ts";

// --- COP31: a cracked earth over a conference hall -------------------------
export function paintCOP31(cv: Canvas, x: number, y: number, w: number, h: number): void {
  cv.vgrad(x, y, w, h, 0x0b3d3d, 0x062a2a);
  // Heat glow top-right.
  cv.filledCircle(x + w - 30, y + 18, 34, 0x8a4a12);
  cv.filledCircle(x + w - 30, y + 18, 22, 0xc47a1a);
  // Earth globe, centre-left.
  const cx = x + Math.floor(w * 0.42), cy = y + Math.floor(h * 0.46), r = 46;
  cv.filledCircle(cx, cy, r, 0x1b6b8a);
  cv.filledCircle(cx - 14, cy - 12, 12, 0x3f7a4a);
  cv.filledCircle(cx + 16, cy + 6, 10, 0x3f7a4a);
  cv.filledCircle(cx + 4, cy - 22, 8, 0x4a8a55);
  cv.filledCircle(cx - 22, cy + 16, 8, 0x4a8a55);
  // Ice cap.
  cv.filledCircle(cx, cy - r + 4, 10, 0xe8f2f2);
  // Cracks: jagged orange lines across the globe.
  cv.line(cx - 40, cy - 6, cx - 18, cy + 4, 0xff7a1a);
  cv.line(cx - 18, cy + 4, cx - 4, cy - 6, 0xff7a1a);
  cv.line(cx - 4, cy - 6, cx + 12, cy + 8, 0xff7a1a);
  cv.line(cx + 12, cy + 8, cx + 30, cy - 2, 0xff7a1a);
  cv.line(cx - 30, cy + 22, cx - 8, cy + 30, 0xffb347);
  cv.line(cx - 8, cy + 30, cx + 14, cy + 24, 0xffb347);
  cv.circleOutline(cx, cy, r, 0x0a2a2a, 2);
  // Conference hall floor: dark desks with delegates.
  cv.rect(x, y + h - 26, w, 26, 0x04201f);
  for (let i = 0; i < 10; i++) {
    const dx = x + 8 + i * 31;
    cv.rect(dx, y + h - 22, 24, 5, 0x0e5a5a);
    cv.filledCircle(dx + 12, y + h - 26, 3, 0xd9c27a);
  }
  // Small flags along the hall.
  for (let i = 0; i < 7; i++) {
    const fx = x + 22 + i * 44;
    cv.vline(fx, y + h - 44, y + h - 26, 0xd9c27a);
    cv.rect(fx, y + h - 44, 12, 7, i % 2 === 0 ? 0xc8102e : 0x1f4e79);
  }
}

// --- Gulf war: refinery flames and a tanker --------------------------------
export function paintWar(cv: Canvas, x: number, y: number, w: number, h: number): void {
  cv.vgrad(x, y, w, h, 0x2a0a0a, 0x120404);
  // Explosion glow.
  cv.filledCircle(x + 62, y + 34, 30, 0x8a2a00);
  cv.filledCircle(x + 62, y + 34, 20, 0xff8c1a);
  cv.filledCircle(x + 62, y + 34, 11, 0xffd23f);
  // Smoke columns.
  for (const [sx, sy, sr] of [[150, 22, 12], [168, 14, 9], [196, 26, 11], [214, 16, 8]] as const) {
    cv.filledCircle(x + sx, y + sy, sr, 0x5a5a5a);
  }
  // Refinery towers, left.
  const tower = (tx: number, tw: number, th: number) => {
    cv.rect(x + tx, y + h - 34 - th, tw, th, 0x1a1a1a);
    for (let yy = y + h - 34 - th; yy < y + h - 34; yy += 8) cv.hline(x + tx, x + tx + tw, yy, 0x3a3a3a);
  };
  tower(18, 16, 52); tower(42, 12, 66); tower(96, 18, 44); tower(122, 12, 58);
  // Flare flames on two stacks.
  cv.filledTriangle(x + 44, y + h - 34 - 66, x + 52, y + h - 34 - 66, x + 48, y + h - 34 - 84, 0xff6a00);
  cv.filledTriangle(x + 47, y + h - 34 - 66, x + 51, y + h - 34 - 66, x + 49, y + h - 34 - 78, 0xffd23f);
  cv.filledTriangle(x + 124, y + h - 34 - 58, x + 132, y + h - 34 - 58, x + 128, y + h - 34 - 74, 0xff6a00);
  // Pipes between towers.
  cv.line(x + 34, y + h - 52, x + 96, y + h - 52, 0x6b6b6b);
  cv.line(x + 60, y + h - 40, x + 122, y + h - 40, 0x4a4a4a);
  // Sea + tanker, bottom.
  cv.rect(x, y + h - 34, w, 34, 0x0e2a3a);
  for (let i = 0; i < 8; i++) cv.hline(x + 6 + i * 40, x + 26 + i * 40, y + h - 26 + (i % 3) * 6, 0x3a6a8a);
  // Tanker hull right.
  cv.rect(x + 190, y + h - 56, 118, 18, 0x0a0a0a);
  cv.filledTriangle(x + 190, y + h - 56, x + 190, y + h - 38, x + 172, y + h - 38, 0x0a0a0a);
  cv.rect(x + 196, y + h - 72, 26, 16, 0x7a1f1f);
  cv.rect(x + 226, y + h - 72, 26, 16, 0x2a4a6b);
  cv.rect(x + 256, y + h - 72, 26, 16, 0x7a6a1f);
  cv.rect(x + 286, y + h - 66, 14, 10, 0xd9d9d9);
  // Fire on the water.
  cv.filledTriangle(x + 176, y + h - 30, x + 188, y + h - 30, x + 182, y + h - 42, 0xff8c1a);
}

// --- Democrats: the Capitol under stars ------------------------------------
export function paintCapitol(cv: Canvas, x: number, y: number, w: number, h: number): void {
  cv.vgrad(x, y, w, h, 0x0e2a47, 0x081426);
  // Stars (fixed positions).
  const stars: Array<[number, number]> = [
    [18, 12], [52, 8], [90, 16], [128, 9], [170, 14], [210, 8], [248, 18],
    [286, 10], [34, 30], [262, 32], [300, 26], [8, 44], [150, 6],
  ];
  for (const [sx, sy] of stars) cv.filledCircle(x + sx, y + sy, 2, 0xffffff);
  // Gold sunburst behind the dome.
  const cx = x + Math.floor(w / 2), base = y + h - 22;
  for (let a = 0; a < 12; a++) {
    const ang = (Math.PI * (200 + a * 12)) / 180;
    cv.line(cx, base - 30, Math.round(cx + 78 * Math.cos(ang)), Math.round(base - 30 + 78 * Math.sin(ang)), 0x8a6d1f);
  }
  cv.filledCircle(cx, base - 30, 34, 0xc9a227);
  // Capitol: dome + drum + wings, cream.
  const cream = 0xe8d9a8, creamDark = 0xc9b478;
  cv.rect(cx - 46, base - 34, 92, 8, cream); // drum
  cv.filledCircle(cx, base - 34, 30, cream); // dome
  cv.rect(cx - 30, base - 34, 60, 34, cream); // body
  cv.filledCircle(cx, base - 66, 4, cream); // statue
  cv.rect(cx - 2, base - 64, 4, 8, cream);
  // Wings.
  cv.rect(x + 26, base - 22, 62, 22, cream);
  cv.rect(x + w - 88, base - 22, 62, 22, cream);
  // Columns.
  for (let i = 0; i < 7; i++) {
    const colx = cx - 24 + i * 8;
    cv.vline(colx, base - 30, base - 4, creamDark);
  }
  for (let i = 0; i < 5; i++) {
    cv.vline(x + 34 + i * 12, base - 20, base - 4, creamDark);
    cv.vline(x + w - 82 + i * 12, base - 20, base - 4, creamDark);
  }
  // Steps.
  cv.rect(x + 10, base, w - 20, 4, creamDark);
  cv.rect(x + 4, base + 4, w - 8, 4, 0x8a7a4a);
  // Flag on the right.
  const fx = x + w - 30;
  cv.vline(fx, y + 12, base, 0xd9d9d9);
  for (let s = 0; s < 7; s++) cv.rect(fx + 1, y + 12 + s * 3, 22, 2, s % 2 === 0 ? 0xc8102e : 0xffffff);
  cv.rect(fx + 1, y + 12, 10, 9, 0x1f4e79);
  void rgb;
}
