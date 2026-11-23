// layout.ts — the front page composition, 1024x1024.
// Masthead date hero, stats strip, region strip, 3 scene heroes,
// 10 red-banner mid cards, real-coastline map + numbered briefs, DATE CHECK.

import { Canvas, rgb } from "./canvas.ts";
import { drawGlyph, drawText, textWidth, wrapText, GLYPH_H } from "./font.ts";
import { drawWorldMap } from "./map.ts";
import { paintCOP31, paintWar, paintCapitol } from "./scenes.ts";
import {
  HEROES, MIDS, BRIEFS, STATS, REGIONS, TOTAL_STORIES,
  DATE_CHECK_LEFT, DATE_CHECK_NEXT, PINS,
} from "./stories.ts";

export const W = 1024;
export const H = 1024;

const PAPER = 0xf6f1e5;
const INK = 0x111111;
const RED = 0xc8102e;
const NAVY = 0x0e2a47;
const GOLD = 0xc9a227;
const WHITE = 0xffffff;
const CARD = 0xfffdf6;
const MUTED = 0x5a5348;

// Tight text: glyphs with 1px gaps (for scale-3 hero labels).
function drawTextTight(
  cv: Canvas, text: string, x: number, y: number, scale: number, color: number,
): number {
  let cx = x;
  for (const ch of text) {
    drawGlyph(cv, ch, cx, y, scale, color);
    cx += 7 * scale + 1;
  }
  return cx;
}
function textWidthTight(text: string, scale: number): number {
  return text.length * (7 * scale + 1) - 1;
}

function centerX(text: string, scale: number, left: number, width: number): number {
  return left + Math.floor((width - textWidth(text, scale)) / 2);
}

const SCENES = [paintCOP31, paintWar, paintCapitol];

export function compose(): Canvas {
  const cv = new Canvas(W, H);
  cv.fill(PAPER);
  // Paper grain over the whole page (deterministic, subtle).
  cv.grain(0, 0, W, H, 0x23a7, 5);

  const MX = 24; // margin
  const IW = W - 2 * MX; // 976

  // ---- Masthead ------------------------------------------------------------
  cv.rect(MX, 14, IW, 3, INK);
  const kicker = "ONE DAY OF WORLD NEWS - ONE PICTURE";
  drawText(cv, kicker, centerX(kicker, 1, MX, IW), 24, 1, INK);
  const date = "MONDAY 23 NOVEMBER 2026";
  drawText(cv, date, centerX(date, 5, MX, IW), 40, 5, INK);
  const sub = `${TOTAL_STORIES} STORIES \u00b7 9 REGIONS \u00b7 EVERY ONE FROM TODAY`;
  drawText(cv, sub, centerX(sub, 2, MX, IW), 96, 2, RED);
  cv.rect(MX, 122, IW, 4, INK);
  cv.rect(MX, 129, IW, 1, INK);

  // ---- Stats strip ---------------------------------------------------------
  const statW = IW / 6;
  STATS.forEach((s, i) => {
    const bx = MX + i * statW;
    if (i > 0) cv.vline(Math.floor(bx), 136, 182, 0xc9c2b2);
    drawText(cv, s.big, Math.floor(bx + (statW - textWidth(s.big, 3)) / 2), 136, 3, NAVY);
    const lines = wrapText(s.label, statW - 12, 1);
    lines.slice(0, 2).forEach((ln, j) => {
      drawText(cv, ln, Math.floor(bx + (statW - textWidth(ln, 1)) / 2), 166 + j * 10, 1, MUTED);
    });
  });

  // ---- Region strip --------------------------------------------------------
  let rx = MX;
  const chipGap = 16;
  for (const r of REGIONS) {
    cv.rect(rx, 192, 10, 10, r.color);
    drawText(cv, r.name, rx + 14, 193, 1, INK);
    rx += 14 + textWidth(r.name, 1) + chipGap;
  }
  cv.rect(MX, 208, IW, 1, 0xc9c2b2);

  // ---- Heroes --------------------------------------------------------------
  const heroW = 320;
  const heroXs = [MX, MX + 328, MX + 656];
  HEROES.forEach((hero, i) => {
    const x = heroXs[i];
    // Kicker: number + region + topic.
    const kick = `${hero.n} - ${hero.kicker}`;
    drawText(cv, kick, x, 216, 1, RED);
    // Scene.
    SCENES[i](cv, x, 228, heroW, 110);
    cv.grain(x, 228, heroW, 110, 0x1000 + i * 7919, 10);
    // Red banner with the big label.
    cv.rect(x, 338, heroW, 46, RED);
    drawTextTight(cv, hero.label, x + Math.floor((heroW - textWidthTight(hero.label, 3)) / 2), 345, 3, WHITE);
    // Headline, scale 2, up to 2 lines.
    const hl = wrapText(hero.headline, heroW, 2);
    hl.slice(0, 2).forEach((ln, j) => {
      drawText(cv, ln, x, 390 + j * 19, 2, INK);
    });
    // Summary, scale 1, up to 3 lines.
    const sm = wrapText(hero.summary, heroW, 1);
    sm.slice(0, 3).forEach((ln, j) => {
      drawText(cv, ln, x, 428 + j * 10, 1, MUTED);
    });
    // Source line.
    drawText(cv, `${hero.tag} - ${hero.source}`, x, 460, 1, NAVY);
  });

  // ---- Mid cards: 2 rows x 5 ----------------------------------------------
  const cardW = 185;
  const cardXs = [MX, MX + 197, MX + 394, MX + 591, MX + 788];
  const rowYs = [476, 588];
  MIDS.forEach((m, i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const x = cardXs[col];
    const y = rowYs[row];
    cv.rect(x, y, cardW, 104, CARD);
    cv.rect(x, y, cardW, 1, INK);
    cv.rect(x, y + 103, cardW, 1, INK);
    cv.rect(x, y, 1, 104, INK);
    cv.rect(x + cardW - 1, y, 1, 104, INK);
    // Red banner, scale-2 white label.
    cv.rect(x, y, cardW, 24, RED);
    drawText(cv, m.banner, x + Math.floor((cardW - textWidth(m.banner, 2)) / 2), y + 3, 2, WHITE);
    // Headline scale 2, up to 2 lines.
    const hl = wrapText(m.headline, cardW - 12, 2);
    hl.slice(0, 2).forEach((ln, j) => {
      drawText(cv, ln, x + 6, y + 28 + j * 19, 2, INK);
    });
    // Summary scale 1, up to 3 lines.
    const sm = wrapText(m.summary, cardW - 12, 1);
    sm.slice(0, 3).forEach((ln, j) => {
      drawText(cv, ln, x + 6, y + 66 + j * 9, 1, MUTED);
    });
    // Source.
    drawText(cv, `${m.tag} - ${m.source}`, x + 6, y + 94, 1, NAVY);
    void GLYPH_H;
  });

  // ---- Map + briefs ---------------------------------------------------------
  cv.rect(MX, 702, IW, 1, INK);
  drawText(cv, "WHERE TODAY HAPPENED", MX, 710, 2, INK);
  drawText(cv, "THE WORLD IN BRIEF", 340, 710, 2, INK);
  drawWorldMap(
    cv,
    { x: MX, y: 730, w: 300, h: 200 },
    PINS,
    0xcfe3ea, 0x8fae7a, 0x5a7a4a, RED, WHITE,
  );
  // Map caption.
  drawText(cv, "13 PLACES - NUMBERS MATCH THE STORIES", MX, 936, 1, MUTED);

  // Briefs: two columns, 11 each, rows packed at 20px (2 lines max).
  const cols: Brief[][] = [BRIEFS.slice(0, 11), BRIEFS.slice(11)];
  const colXs = [340, 664];
  cols.forEach((col, ci) => {
    let y = 730;
    for (const b of col) {
      const full = `${b.n}. ${b.text} (${b.source})`;
      const lines = wrapText(full, 316, 1).slice(0, 2);
      lines.forEach((ln, j) => drawText(cv, ln, colXs[ci], y + j * 10, 1, INK));
      y += 20;
    }
  });

  // ---- DATE CHECK ------------------------------------------------------------
  cv.rect(MX, 962, IW, 2, RED);
  cv.rect(MX, 962, 2, 44, RED);
  cv.rect(MX + IW - 2, 962, 2, 44, RED);
  cv.rect(MX, 1004, IW, 2, RED);
  drawText(cv, "DATE CHECK", MX + 8, 968, 2, RED);
  const left = wrapText(`LEFT OUT AS YESTERDAY (22 NOV): ${DATE_CHECK_LEFT}`, IW - 16, 1);
  const next = wrapText(`NOT YET: ${DATE_CHECK_NEXT}`, IW - 16, 1);
  let dy = 988;
  for (const ln of [...left, ...next]) {
    drawText(cv, ln, MX + 8, dy, 1, INK);
    dy += 10;
    if (dy > 1002) break;
  }

  // ---- Footer ----------------------------------------------------------------
  const foot = "ALL STORIES CONFIRMED OR REPORTED BY NAMED SOURCES - COMPILED MONDAY 23 NOVEMBER 2026";
  drawText(cv, foot, centerX(foot, 1, MX, IW), 1012, 1, MUTED);

  void rgb;
  return cv;
}
