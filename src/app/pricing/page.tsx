import type { Metadata } from 'next';
import {
  collections,
  totalPluginCount,
  completeSuitePrice,
  worldCompletePrice,
  effectsSynthsCollections,
  worldCollections,
  worldPluginCount,
  instrumentFamilyBundles,
  byoTiers,
  patternLibraryPrice,
  patternLibraryPatternCount,
  patternLibraryGenreCount,
} from '@/data/plugins';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Pricing for all Prism Audio Labs collections — effects, synthesizers, and world instruments. Geographic bundles, instrument families, or build your own.',
  openGraph: {
    title: 'Pricing — Prism Audio Labs',
    description:
      'Multiple ways to buy: geographic collections, instrument family bundles, build your own, or the complete catalog. No subscriptions for plugins.',
  },
};

export default function PricingPage() {
  const worldCollectionTotal = worldCollections.reduce((sum, c) => sum + c.price, 0);
  const worldSavings = worldCollectionTotal - worldCompletePrice;
  const individualTotal = collections.reduce((sum, c) => sum + c.price, 0);
  const suiteSavings = individualTotal - completeSuitePrice;

  return (
    <div className="pt-28">
      {/* Header */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-prism-cyan/20 bg-prism-cyan/[0.06] px-5 py-2">
            <div className="h-1.5 w-1.5 rounded-full bg-prism-cyan animate-pulse-glow" />
            <span className="text-sm font-medium text-prism-cyan">Coming 2026</span>
          </div>
          <h1 className="text-4xl font-bold text-white">Pricing</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-400">
            {totalPluginCount} plugins. No subscriptions. No inflated list prices. Buy individual collections, build a custom bundle, or get everything at once. Prices shown are planned launch pricing.
          </p>
        </div>
      </section>

      {/* ── Section 1: Complete Suite ── */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-prism-violet/15 bg-gradient-to-br from-prism-navy/40 to-[#14152E] p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-prism-cyan/60">Everything</div>
                <h2 className="text-3xl font-bold text-white">Complete Suite</h2>
                <p className="mt-2 max-w-xl text-base text-slate-400">
                  All {totalPluginCount} plugins across all {collections.length} collections — effects, synthesizers, and every world instrument. One purchase. Includes the 10,000-pattern MIDI library.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {collections.map((c) => (
                    <span key={c.id} className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-slate-400">
                      {c.name} ({c.plugins.length})
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-center md:text-right">
                <div className="text-4xl font-bold text-prism-cyan">${completeSuitePrice}</div>
                <div className="mt-1 text-sm text-slate-400 line-through">${individualTotal}</div>
                <div className="mt-1 text-sm text-prism-cyan/60">Save ${suiteSavings}</div>
                <a href="/#waitlist" className="mt-4 inline-block rounded-xl bg-prism-cyan px-8 py-3 text-sm font-bold text-[#14152E] transition hover:bg-prism-cyan/85">
                  Join Waitlist
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Effects & Synthesis Collections ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-2 text-lg font-semibold text-slate-200">Effects & Synthesis</h3>
          <p className="mb-6 text-sm text-slate-400">Digital effects, synthesizers, and instruments. No physical modeling — these are signal processing and oscillator-based plugins.</p>
          <div className="grid gap-6 sm:grid-cols-3">
            {effectsSynthsCollections.map((col) => (
              <div key={col.id} className="rounded-2xl border border-white/[0.06] bg-[#14152E] p-8">
                <div className={`mb-5 h-1 w-12 rounded-full bg-gradient-to-r ${col.gradient}`} />
                <h4 className="text-xl font-bold text-slate-200">{col.name}</h4>
                <p className="mt-1 text-sm text-slate-400">{col.subtitle} — {col.plugins.length} plugins</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{col.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-200">${col.price}</span>
                  <span className="rounded-full bg-prism-cyan/[0.08] px-4 py-1.5 text-xs font-medium text-prism-cyan/80">Coming Soon</span>
                </div>
                <Link href={`/collections/${col.id}`} className="mt-4 block text-sm text-slate-400 transition hover:text-slate-300">
                  View all plugins &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider: World Instruments ── */}
      <section className="border-t border-white/[0.04] pt-16 pb-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white">World Instruments</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-400">
            {worldPluginCount} instruments built on the PrismWorldEngine — a shared physical modeling architecture where sound is generated from the interaction of exciters (pluck, bow, strike, blow), resonators (string, bore, membrane, tine), and body models (wood, metal, gourd, clay). No samples at the core. Four ways to buy.
          </p>
        </div>
      </section>

      {/* ── Section 3: World Complete ── */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-900/20 to-[#14152E] p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-400/60">All World Instruments</div>
                <h3 className="text-2xl font-bold text-white">World Complete</h3>
                <p className="mt-2 max-w-lg text-sm text-slate-400">
                  Every world instrument plugin. All {worldCollections.length} geographic collections, every instrument family, every tuning system. Includes the {patternLibraryPatternCount.toLocaleString()}-pattern MIDI library.
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Comparable world instrument libraries (EastWest Silk, 8Dio ethnic collections) cost $200–500 each and require a $400 Kontakt license. This is {worldPluginCount} instruments with no dependencies.
                </p>
              </div>
              <div className="shrink-0 text-center md:text-right">
                <div className="text-3xl font-bold text-amber-400">${worldCompletePrice}</div>
                <div className="mt-1 text-sm text-slate-400 line-through">${worldCollectionTotal}</div>
                <div className="mt-1 text-sm text-amber-400/60">Save ${worldSavings} — ${(worldCompletePrice / worldPluginCount).toFixed(0)}/instrument</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Instrument Family Bundles ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-2 flex items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-200">Instrument Family Bundles</h3>
            <span className="rounded-full bg-prism-cyan/10 px-2.5 py-0.5 text-[11px] font-medium text-prism-cyan">Cross-Collection</span>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-slate-400">
            Buy by instrument type instead of geography. Each bundle pulls instruments from multiple geographic collections. Useful when you need &ldquo;all the bowed strings&rdquo; or &ldquo;all the percussion&rdquo; regardless of origin.
          </p>

          {/* Who these are for */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { persona: 'Film & Game Composers', note: 'Need specific timbral families for scoring. "I need bowed strings for this cue" is a more common thought than "I need Nordic instruments."' },
              { persona: 'Beat Producers', note: 'World Percussion gives you tabla, taiko, cajón, and clapsticks in one bundle — covers Afrobeats, trap, lo-fi, and cinematic in a single purchase.' },
              { persona: 'Session & Live Players', note: 'Plucked strings or winds bundles give you the breadth to cover diverse session work without buying instruments you won\'t use.' },
            ].map((p) => (
              <div key={p.persona} className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-4">
                <div className="text-xs font-semibold text-slate-300">{p.persona}</div>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{p.note}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {instrumentFamilyBundles.map((bundle) => (
              <div key={bundle.id} className="rounded-2xl border border-white/[0.06] bg-[#14152E] p-6">
                <div className={`mb-4 h-1 w-10 rounded-full bg-gradient-to-r ${bundle.gradient}`} />
                <h4 className="text-lg font-bold text-slate-200">{bundle.name}</h4>
                <p className="mt-0.5 text-xs text-slate-400">{bundle.subtitle}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-400">{bundle.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {bundle.pluginIds.map((pid) => {
                    const name = pid.replace('prism-', '').replace('flamenco-', '').replace(/-/g, ' ');
                    return (
                      <span key={pid} className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] capitalize text-slate-500">
                        {name}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-200">${bundle.price}</span>
                  <span className="text-xs text-slate-500">${(bundle.price / bundle.pluginIds.length).toFixed(0)}/instrument</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Build Your Own ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-2 flex items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-200">Build Your Own Bundle</h3>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">Pick Any Instruments</span>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-slate-400">
            Choose any world instruments from any collection. No restrictions on mixing regions or instrument types. The per-instrument price drops as you add more.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {byoTiers.map((tier, i) => (
              <div
                key={tier.count}
                className={`rounded-2xl border p-8 text-center ${
                  i === 1
                    ? 'border-prism-cyan/20 bg-gradient-to-b from-prism-cyan/[0.04] to-[#14152E]'
                    : 'border-white/[0.06] bg-[#14152E]'
                }`}
              >
                {i === 1 && (
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-prism-cyan/60">Most Flexible</div>
                )}
                <div className="text-sm font-semibold uppercase tracking-wider text-slate-400">{tier.label}</div>
                <div className="mt-1 text-[13px] text-slate-500">Pick any {tier.count}</div>
                <div className="mt-3 text-3xl font-bold text-slate-200">${tier.price}</div>
                <div className="mt-1 text-sm text-slate-400">${tier.perUnit.toFixed(2)} per instrument</div>
                <div className="mt-1 text-sm font-medium text-emerald-400/80">~{tier.savingsPercent}% off individual</div>
                <div className="mt-4 border-t border-white/[0.04] pt-4 text-left">
                  <ul className="space-y-2 text-[12px] text-slate-500">
                    <li>Mix any collections freely</li>
                    <li>All formats included (VST3 + AU)</li>
                    <li>Free updates within major version</li>
                    {tier.count >= 5 && <li>Pattern library included ({patternLibraryPatternCount.toLocaleString()} MIDI patterns)</li>}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Who BYO is for */}
          <div className="mt-8 rounded-xl border border-white/[0.04] bg-white/[0.015] p-5">
            <div className="text-sm font-semibold text-slate-300">Who this is for</div>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
              Producers who know exactly what they need. A hip-hop producer grabs Tabla + Kora + Santoor + Berimbau + Sitar. A trailer composer picks Taiko + Erhu + Duduk + Lur + Uilleann Pipes. You&apos;re not paying for instruments you won&apos;t use, and at the 10-pick tier the per-instrument cost is low enough that adding something you&apos;re curious about is an easy decision.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 6: Geographic Collections ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-2 text-lg font-semibold text-slate-200">Geographic Collections</h3>
          <p className="mb-8 max-w-2xl text-sm text-slate-400">
            The original way to buy — instruments grouped by cultural region. Each collection shares tuning systems, ornament styles, and performance idioms specific to that tradition. If you&apos;re working on a project set in a specific region or culture, this is the most coherent way to buy.
          </p>

          {/* Who these are for */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { persona: 'World Music Specialists', note: 'Working within a specific tradition. Raga gives you the full South Asian palette — 10 instruments from Hindustani to Carnatic to Punjabi folk — with shared microtuning and ornament systems.' },
              { persona: 'Film/TV Composers', note: 'Scoring for a location-specific project. "This scene is set in West Africa" → Griot collection. The instruments are designed to work together.' },
              { persona: 'Cultural Educators', note: 'Teaching or documenting a musical tradition. Geographic collections keep instruments in their cultural context with historically accurate tuning and performance modes.' },
            ].map((p) => (
              <div key={p.persona} className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-4">
                <div className="text-xs font-semibold text-slate-300">{p.persona}</div>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{p.note}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {worldCollections.map((col) => (
              <div key={col.id} className="rounded-2xl border border-white/[0.06] bg-[#14152E] p-6">
                <div className={`mb-4 h-1 w-10 rounded-full bg-gradient-to-r ${col.gradient}`} />
                <h4 className="text-lg font-bold text-slate-200">{col.name}</h4>
                <p className="mt-0.5 text-xs text-slate-400">{col.subtitle} — {col.plugins.length} plugins</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-2">{col.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-200">${col.price}</span>
                  <span className="text-xs text-slate-500">${(col.price / col.plugins.length).toFixed(0)}/instrument</span>
                </div>
                <Link href={`/collections/${col.id}`} className="mt-3 block text-xs text-slate-400 transition hover:text-slate-300">
                  View plugins &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: Pattern Library ── */}
      <section className="pb-20 border-t border-white/[0.04] pt-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-prism-violet/60">Works with any DAW</div>
              <h3 className="text-2xl font-bold text-white">Pattern Library</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {patternLibraryPatternCount.toLocaleString()} MIDI patterns across {patternLibraryGenreCount} genres. Standard MIDI files — they work in any DAW with any plugin, not just ours.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Every pattern is generated from genre-authentic scales and chord progressions using the full 32-scale PrismScaleMode system. Seven functional categories per genre: bass lines, chord progressions, lead melodies, arpeggios, pads, grooves, and builds. Each pattern is tagged with 8 dimensions (register, density, articulation, harmonic role, mood, tempo class, complexity, genre) for precise filtering.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                The patterns are not loops — they are compositional starting points. Load one into your DAW&apos;s piano roll, point it at any instrument (ours or anyone else&apos;s), and edit from there.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <div className="rounded-2xl border border-prism-violet/15 bg-[#14152E] p-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-prism-violet">${patternLibraryPrice}</div>
                  <div className="mt-1 text-sm text-slate-400">standalone purchase</div>
                </div>
                <div className="mt-6 space-y-3 text-[13px] text-slate-400">
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-prism-cyan/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Included free with World Complete ($299) and Complete Suite ($599)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-prism-cyan/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Included free with any Build Your Own bundle of 5 or more</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-prism-cyan/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Standard MIDI — works in Ableton, Logic, FL Studio, Cubase, Reaper, or any DAW</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-prism-cyan/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>{patternLibraryGenreCount} genres from Ambient to World, each with 350+ patterns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 8: Technical Details ── */}
      <section className="pb-20 border-t border-white/[0.04] pt-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="text-center text-lg font-semibold text-slate-200 mb-10">Technical Details</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'VST3 & AU',
                desc: 'macOS native. Compatible with Ableton Live, Logic Pro, FL Studio, Cubase, Studio One, Reaper, and any DAW that supports VST3 or AU. Windows support planned for 2026.',
              },
              {
                title: 'Physical Modeling',
                desc: 'World instruments use PrismWorldEngine — exciter/resonator/body physical modeling, not sample playback. Sound is generated mathematically from the physics of the instrument. No large sample libraries to download.',
              },
              {
                title: 'Free Updates',
                desc: 'All updates within the current major version are free. Bug fixes, performance improvements, new presets, and new patterns. No forced upgrades, no planned obsolescence.',
              },
              {
                title: '2 Activations',
                desc: 'Install on your studio machine and your laptop. Both run simultaneously. Need more? Contact support — we are not interested in DRM that punishes legitimate users.',
              },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-prism-cyan/[0.08]">
                  <svg className="h-5 w-5 text-prism-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-sm font-semibold text-slate-200">{f.title}</h4>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 9: Price Comparison ── */}
      <section className="pb-20 border-t border-white/[0.04] pt-16">
        <div className="mx-auto max-w-3xl px-6">
          <h3 className="text-center text-lg font-semibold text-slate-200 mb-4">Honest Pricing</h3>
          <p className="text-center text-sm text-slate-400 mb-8">
            We don&apos;t inflate list prices to make sales look dramatic. The price you see is the price we think the product is worth. No 90% off sales, no countdown timers, no artificial urgency.
          </p>
          <div className="overflow-hidden rounded-xl border border-white/[0.06]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="px-5 py-3 text-xs font-semibold text-slate-400">What you get</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-400">Typical market price</th>
                  <th className="px-5 py-3 text-xs font-semibold text-prism-cyan/80">Prism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-[13px]">
                <tr>
                  <td className="px-5 py-3 text-slate-300">Single world instrument</td>
                  <td className="px-5 py-3 text-slate-500">$100–200 (Kontakt library)</td>
                  <td className="px-5 py-3 text-slate-300">$29–39</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-slate-300">Regional instrument set (2–10)</td>
                  <td className="px-5 py-3 text-slate-500">$300–600 + $400 Kontakt</td>
                  <td className="px-5 py-3 text-slate-300">$39–149 (no dependencies)</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-slate-300">Full world instrument catalog</td>
                  <td className="px-5 py-3 text-slate-500">$2,000+ across multiple vendors</td>
                  <td className="px-5 py-3 text-slate-300">$299</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-slate-300">10,000 MIDI patterns (28 genres)</td>
                  <td className="px-5 py-3 text-slate-500">$150–300 (comparable MIDI packs)</td>
                  <td className="px-5 py-3 text-slate-300">$49 standalone, free with bundles</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Section 10: FAQ ── */}
      <section className="pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <h3 className="text-center text-xl font-bold text-slate-200 mb-8">FAQ</h3>
          <div className="space-y-3">
            {[
              {
                q: 'How do I install the plugins?',
                a: 'Download the DMG installer, drag the plugin files to your AU or VST3 folder, and rescan plugins in your DAW. World instrument plugins are small (typically under 50MB each) because sound is generated via physical modeling, not sample playback.',
              },
              {
                q: 'Do the instrument family bundles overlap with geographic collections?',
                a: 'Yes — they draw from the same instrument catalog, just organized differently. The Raga collection includes Tabla, Dhol, Dholak, and Mridangam, which also appear in the World Percussion family bundle. If you buy both, overlapping instruments are credited — you never pay twice for the same instrument.',
              },
              {
                q: 'Can I upgrade from a smaller bundle to a larger one?',
                a: 'Yes. Previous purchases are always credited. If you bought the Griot collection for $79 and later want World Complete at $299, you pay $220. If you bought a Build Your Own 3-pack and want to upgrade to the 10-pack, you pay the difference.',
              },
              {
                q: 'What is the pattern library? Do I need Prism plugins to use it?',
                a: 'The pattern library is 10,000 standard MIDI files organized by genre and function. They work in any DAW with any instrument — ours or anyone else\'s. They are compositional starting points, not loops. You do not need any Prism plugin to use them.',
              },
              {
                q: 'Do you offer educational discounts?',
                a: 'Yes. Students and educators get 40% off with valid academic credentials. Contact support with your .edu email or proof of enrollment.',
              },
              {
                q: 'What is your refund policy?',
                a: '30-day money-back guarantee, no questions asked. If a plugin does not work in your setup or does not sound the way you expected, we refund you.',
              },
              {
                q: 'Will Windows be supported?',
                a: 'Windows VST3 support is planned for late 2026. macOS AU and VST3 ship at launch.',
              },
              {
                q: 'How are the world instruments different from sample-based Kontakt libraries?',
                a: 'Our instruments use physical modeling synthesis — sound is generated mathematically from simulated exciter-resonator-body interactions, not from recorded audio samples. This means smaller file sizes, no round-robin limits, infinite sustain variation, and real-time parameter control over things like pluck position, bow pressure, and body resonance. The tradeoff is that physical models approximate the sound of real instruments rather than replaying recordings of them.',
              },
            ].map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-white/[0.06] bg-white/[0.015]">
                <summary className="cursor-pointer px-6 py-4 text-[15px] text-slate-300 transition hover:text-white">
                  {faq.q}
                </summary>
                <div className="px-6 pb-4 text-sm leading-relaxed text-slate-400">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
