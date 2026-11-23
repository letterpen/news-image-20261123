[![make.fun](https://make.fun/badge/news-image-20261123.svg)](https://make.fun/bounty/news-image-20261123)
[![rank](https://make.fun/badge/news-image-20261123/letterpen/news-image-20261123/rank.svg)](https://make.fun/bounty/news-image-20261123)
[![reward](https://make.fun/badge/news-image-20261123/letterpen/news-image-20261123/reward.svg)](https://make.fun/bounty/news-image-20261123)

# World news of Monday 23 November 2026 in one image

A front-page newspaper in a single 1024x1024 PNG: **35 stories across 9 regions**, led by the day's three biggest hard-news stories — the COP31 climate talks collapsing with no deal on fossil fuels, the Gulf war widening as Houthis claim strikes on a Saudi refinery and Iran hits Bahrain, and the Democrats taking 258 House seats, their biggest majority since 1992.

Every story carries a named source and a CONFIRMED / REPORTED tag. A DATE CHECK box separates what belongs to yesterday from what has not happened yet.

## How it is drawn

`main.ts` (Node 22, standard library only) draws the whole page from scratch — its own PNG encoder, canvas primitives, a hand-drawn 7x9 bitmap font, three scene illustrations (a cracked earth over the COP31 hall, a burning Gulf refinery and tanker, the Capitol under stars), a real-coastline world map with numbered pins, and a numbered brief list. No network, no fonts, no image assets: two runs write byte-identical output.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Writes `out/entry.png` (1024x1024, under 1 MiB).

## The day, in numbers

- 258 — House seats for the Democrats, biggest majority since 1992
- 194 — nations at COP31, no deal
- 4-0 — Liverpool rout Manchester United at Anfield
- 36+ — missing in the Banten candy-factory fire
- 24 — civilians killed in fresh South Sudan violence
- 2 — wounded in the Iranian strike on Bahrain

## Entry

Built for the [make.fun bounty "Sum up 23 November's world news in one image"](https://make.fun/bounty/news-image-20261123) (news-image-20261123). The image is drawn by the program in this repository; the entry is the program, not a pasted picture.
