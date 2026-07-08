#!/usr/bin/env node
/**
 * Reconcile the website roster (src/data/plugins.ts) against the authoritative
 * build catalog (src/data/catalog.json). Fails CI on unexpected drift — a plugin
 * that ships but isn't sold, or a store entry for a plugin that doesn't ship.
 *
 *   node scripts/check-catalog.mjs
 *
 * This is why the site once listed 79 plugins while the build shipped 80. Both
 * files live in the repo, so this runs in CI (no plugin repo needed). Regenerate
 * catalog.json with generate-catalog.mjs when the plugin catalog changes.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");

// Must match norm() in generate-catalog.mjs (accent-folds, e.g. Cajón -> cajon).
const norm = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim().toLowerCase().replace(/^prism[\s-]*/, "").replace(/[^a-z0-9]/g, "");

// Intentional build-name <-> marketing-name differences. The store uses friendlier
// names than the terse build targets; these are reconciled, not flagged. A `note`
// marks a pairing that still needs a human confirmation (prints as a warning).
const ALIASES = [
  { build: "Prism Bass Env Filter",   site: "Bass Envelope Filter" },
  { build: "Prism Dragonbreath Bass", site: "Dragonbreath Bass Synth" },
  { build: "Prism Dragonbreath FX",   site: "Dragonbreath" },
  { build: "Prism Native Flute",      site: "Native American Flute" },
  { build: "Prism Palmas",            site: "Flamenco Palmas" },
  { build: "Prism Octaver",           site: "Prisma Octaver", note: "site says 'Prisma Octaver' — confirm vs 'Prism Octaver' (likely a typo)" },
];

// Known, accepted roster gaps: ship-but-not-sold, awaiting a product decision.
// Each entry warns (doesn't fail) so CI stays green while the decision is open,
// but stays visible as a forcing function. Remove once resolved.
const KNOWN_GAPS = {
  seismic: "Prism Seismic ships but has no store listing — pending pricing/copy decision (see backlog).",
};

const catalog = JSON.parse(readFileSync(join(ROOT, "src/data/catalog.json"), "utf8"));
const catalogKeys = new Map(catalog.plugins.map((p) => [p.key, p.name]));

// Extract the website roster: a plugin object is an id+name pair that also
// carries a `collection:` field (collections themselves don't). Robust to field
// reordering; update this if the data shape changes substantially.
const src = readFileSync(join(ROOT, "src/data/plugins.ts"), "utf8");
const siteKeys = new Map();
let curId = null, curName = null;
for (const line of src.split("\n")) {
  const id = line.match(/^\s*id:\s*'([^']+)',/);
  if (id) { curId = id[1]; curName = null; continue; }
  const nm = line.match(/^\s*name:\s*'([^']+)'/);
  if (nm && curId && curName === null) {
    // plugins.ts stores accented names as \uXXXX escapes; decode so norm() can fold them.
    curName = nm[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
    continue;
  }
  if (/^\s*collection:\s*'[^']+'/.test(line) && curId && curName) {
    siteKeys.set(norm(curName), curName);
    curId = null;
  }
}

// Translate site keys into build-space via the alias map, then diff.
const aliasSiteToBuild = new Map(ALIASES.map((a) => [norm(a.site), norm(a.build)]));
const aliasNotes = new Map(ALIASES.filter((a) => a.note).map((a) => [norm(a.build), a.note]));
const siteInBuildSpace = new Map();
for (const [k, name] of siteKeys) siteInBuildSpace.set(aliasSiteToBuild.get(k) || k, name);

const missing = [...catalogKeys.keys()].filter((k) => !siteInBuildSpace.has(k)); // ship, not sold
const extra = [...siteInBuildSpace.keys()].filter((k) => !catalogKeys.has(k));    // sold, not shipped

const warnings = [];
const errors = [];
for (const k of missing) {
  (KNOWN_GAPS[k] ? warnings : errors).push(
    `  ship-but-not-sold: ${catalogKeys.get(k)}${KNOWN_GAPS[k] ? ` — ${KNOWN_GAPS[k]}` : ""}`
  );
}
for (const k of extra) {
  errors.push(`  sold-but-not-shipped: ${siteInBuildSpace.get(k)} (no matching build target)`);
}
// Reconciled-but-flagged aliases (e.g. the Prisma/Prism spelling) surface as warnings.
for (const [buildKey, note] of aliasNotes) {
  if (catalogKeys.has(buildKey)) warnings.push(`  name to confirm: ${note}`);
}

console.log(`Catalog: ${catalogKeys.size} plugins   Website: ${siteKeys.size} plugins`);
if (warnings.length) {
  console.log(`\n⚠️  Known gaps (allowed):`);
  for (const w of warnings) console.log(w);
}
if (errors.length) {
  console.error(`\n❌ ${errors.length} unexpected roster drift(s):`);
  for (const e of errors) console.error(e);
  console.error(`\nRegenerate catalog.json, add the plugin to plugins.ts, or (if intentional`);
  console.error(`and pending) add its key to KNOWN_GAPS in scripts/check-catalog.mjs.\n`);
  process.exit(1);
}
console.log(`\n✅ Roster reconciled — every shipping plugin is accounted for.`);
