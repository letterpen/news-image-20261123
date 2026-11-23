// main.ts — entrypoint: compose the front page and write entry.png.
// Node 22, stdlib only. Deterministic: two runs write byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { compose } from "./src/layout.ts";
import { encodePNG } from "./src/png.ts";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
const cv = compose();
const png = encodePNG(cv.w, cv.h, cv.data);
writeFileSync(join(outDir, "entry.png"), png);
console.log(`wrote ${png.length} bytes to ${join(outDir, "entry.png")}`);
