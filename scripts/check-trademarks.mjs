#!/usr/bin/env node
/**
 * Prism website trademark / artist-name guard.
 *
 * Scans every line of src/ for brand, gear, and artist trademarks. Product copy
 * must describe the SOUND, never the commercial product or artist that inspired
 * it ("inspired-by" belongs in internal notes, not on the storefront).
 *
 *   node scripts/check-trademarks.mjs      # exits non-zero on any hit
 *
 * This list is a MIRROR of scripts/trademark_check.py in the plugin repo — keep
 * the two in sync when either changes.
 *
 * Escape hatch: some tokens are also legitimate words (Jupiter/Taurus/Centaur are
 * planets and constellations as well as synths). If a hit is a deliberate,
 * non-infringing use, add a `trademark-ignore` comment on that same line and the
 * checker will skip it — a conscious, reviewable exception rather than a silent one.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const SRC = join(ROOT, "src");

// Mirror of the plugin repo's TRADEMARKS list. Plain strings match anywhere;
// \b...\b patterns are word-bounded to avoid catching substrings.
const TRADEMARKS = [
  // synth / keyboard brands + models
  "\\bmoog\\b", "minimoog", "\\bkorg\\b", "\\bnord\\b", "hammond", "\\bleslie\\b",
  "mellotron", "clavinet", "prophet", "oberheim", "jupiter", "fairlight",
  "farfisa", "solina", "\\bjuno\\b", "supersaw", "hypersaw", "wurlitzer",
  "\\brhodes\\b", "ensoniq", "kurzweil", "waldorf",
  // drum machines
  "tr-?808", "tr-?909", "tb-?303", "808 mirage",
  // effects / gear
  "binson", "echorec", "space echo", "echoplex", "copicat", "big muff",
  "tube screamer", "\\bklon\\b", "strymon", "eventide", "lexicon",
  "electro-harmonix", "rubberneck", "meatbox", "boneshaker", "carcosa", "fuzz war",
  "\\bppg\\b", "blofeld", "centaur", "octavia", "shin-ei", "ts-?808", "\\bce-1\\b",
  "jp-?8000", "re-?201", "h8000", "pcm96", "model d", "taurus",
  // artists / bands (world + popular)
  "nakai", "shankar", "zakir", "toumani", "diabat", "nusrat", "fateh",
  "chaurasia", "bismillah", "kalhor", "hamza el din", "bassekou", "sissoko",
  "velvet underground", "beatles", "hendrix", "\\bnirvana\\b", "daft punk",
  "aphex", "deadmau5", "skrillex", "george harrison", "ray charles",
  "supertramp", "radiohead", "\\bstooges\\b",
];

// Genuinely-generic strings that would otherwise trip a rule above.
const ALLOW = [];

const PAT = new RegExp(TRADEMARKS.join("|"), "gi");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx|js|jsx|md|mdx)$/.test(entry)) out.push(p);
  }
  return out;
}

const hits = [];
for (const file of walk(SRC)) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (line.includes("trademark-ignore")) return; // conscious, reviewable exception
    for (const m of line.matchAll(PAT)) {
      if (ALLOW.includes(m[0])) continue;
      hits.push({ file: relative(ROOT, file), line: i + 1, tok: m[0], ctx: line.trim().slice(0, 90) });
    }
  });
}

if (hits.length) {
  console.error(`\n❌ ${hits.length} trademark/artist reference(s) in the website copy:\n`);
  for (const h of hits) console.error(`   ${h.file}:${h.line}  [${h.tok}]  ${h.ctx}`);
  console.error(`\nDescribe the SOUND, never the brand or artist. If a hit is a deliberate,`);
  console.error(`non-infringing use (e.g. Jupiter the planet), add a "trademark-ignore" comment`);
  console.error(`on that line.\n`);
  process.exit(1);
}
console.log("✅ Trademark check passed — website copy is clean.");
