import Image from 'next/image';
import { collections, totalPluginCount, completeSuitePrice, getPluginImage, effectsSynthsCollections, worldCollections } from '@/data/plugins';
import Link from 'next/link';
import InfiniteMarquee from '@/components/InfiniteMarquee';

export default function Home() {
  const heroBgImages = [
    { id: 'dragonbreath-pedal', pos: 'top-[10%] left-[5%]', size: 'w-[340px] h-[340px]', opacity: 'opacity-[0.07]' },
    { id: 'stellar-supersaw', pos: 'top-[15%] right-[8%]', size: 'w-[280px] h-[280px]', opacity: 'opacity-[0.05]' },
    { id: 'prism-tabla', pos: 'bottom-[15%] left-[15%]', size: 'w-[260px] h-[260px]', opacity: 'opacity-[0.05]' },
    { id: 'prism-lur', pos: 'bottom-[10%] right-[12%]', size: 'w-[300px] h-[300px]', opacity: 'opacity-[0.06]' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-prism-violet/[0.06] blur-[140px]" />
          <div className="absolute left-1/4 top-2/3 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-prism-indigo/[0.04] blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(rgba(124,92,252,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,252,0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
        </div>
        <div className="pointer-events-none absolute inset-0">
          {heroBgImages.map((img) => {
            const src = getPluginImage(img.id);
            return src ? (
              <div key={img.id} className={`absolute ${img.pos} ${img.size} ${img.opacity} blur-[2px] rounded-3xl overflow-hidden`}>
                <Image src={src} alt="" fill className="object-cover" sizes="340px" priority />
              </div>
            ) : null;
          })}
          <div className="absolute inset-0 bg-[#08091A]/80" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
          <div className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2">
            <div className="h-1.5 w-1.5 rounded-full bg-prism-cyan animate-pulse-glow" />
            <span className="text-sm text-slate-400">{totalPluginCount} Plugins &mdash; {collections.length} Collections</span>
          </div>
          <h1 className="text-[clamp(3.5rem,9vw,7rem)] font-black tracking-tighter leading-[0.95]">
            <span className="block text-white">Enter the</span>
            <span className="block text-gradient-prism">Spectrum</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
            {totalPluginCount} instruments and effects forged at the intersection of
            analog circuitry, spectral synthesis, and world musical heritage. {collections.length} collections. No boundaries.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/pricing" className="rounded-xl bg-prism-cyan px-8 py-3.5 text-[15px] font-bold text-[#14152E] transition hover:bg-prism-cyan/85">
              Get the Complete Suite &mdash; ${completeSuitePrice}
            </Link>
            <Link href="/collections/dragonbreath" className="rounded-xl border border-white/[0.08] px-8 py-3.5 text-[15px] text-slate-400 transition hover:border-white/15 hover:text-white">
              Explore Collections
            </Link>
          </div>
          <div className="mx-auto mt-20 flex max-w-lg justify-between">
            {[
              { value: `${totalPluginCount}`, label: 'Plugins' },
              { value: `${collections.length}`, label: 'Collections' },
              { value: 'VST3+AU', label: 'Formats' },
              { value: 'macOS', label: 'Platform' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold text-slate-200">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFINITE MARQUEE */}
      <InfiniteMarquee />

      {/* EFFECTS & SYNTHS COLLECTIONS */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Effects & Synthesis</h2>
            <p className="mt-3 text-base text-slate-400">Analog-inspired processing and celestial synthesis engines.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {effectsSynthsCollections.map((col) => {
              const stripImages = col.plugins
                .slice(0, 3)
                .map((p) => ({ id: p.id, name: p.name, src: getPluginImage(p.id) }))
                .filter((img) => img.src);
              return (
                <Link key={col.id} href={`/collections/${col.id}`} className="group relative rounded-2xl border border-white/[0.08] bg-[#14152E] overflow-hidden transition hover:border-prism-violet/20">
                  <div className="relative h-36 overflow-hidden flex">
                    {stripImages.map((img, idx) => (
                      <div key={img.id} className="relative flex-1 overflow-hidden">
                        <Image src={img.src!} alt={img.name} fill className="object-cover opacity-50 transition-all duration-500 group-hover:opacity-70 group-hover:scale-105" sizes="(max-width: 640px) 33vw, 17vw" />
                        {idx < stripImages.length - 1 && <div className="absolute right-0 inset-y-0 w-px bg-white/[0.06] z-10" />}
                      </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#14152E]" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${col.gradient} opacity-[0.08]`} />
                  </div>
                  <div className="p-10 pt-4">
                    <div className={`mb-5 h-1 w-14 rounded-full bg-gradient-to-r ${col.gradient}`} />
                    <h3 className={`text-2xl font-bold ${col.textGradientClass}`}>{col.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{col.subtitle}</p>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate-400">{col.description}</p>
                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-200">${col.price}</span>
                        <span className="text-xs text-slate-400">{col.plugins.length} plugins</span>
                      </div>
                      <span className="text-sm text-slate-400 transition group-hover:text-slate-300">Explore &rarr;</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORLD INSTRUMENT COLLECTIONS */}
      <section className="py-28 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">World Instruments</h2>
            <p className="mt-3 text-base text-slate-400 max-w-2xl mx-auto">
              Authentic virtual instruments from musical traditions spanning six continents &mdash; each with culturally accurate articulations, traditional tuning systems, and expressive controls.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {worldCollections.map((col) => {
              const firstPlugin = col.plugins[0];
              const firstImage = firstPlugin ? getPluginImage(firstPlugin.id) : undefined;
              return (
                <Link key={col.id} href={`/collections/${col.id}`} className="group relative rounded-2xl border border-white/[0.08] bg-[#14152E] overflow-hidden transition hover:border-white/[0.15]">
                  <div className={`relative h-32 overflow-hidden ${!firstImage ? `bg-gradient-to-br ${col.gradient}` : 'bg-black'}`}>
                    {firstImage ? (
                      <Image src={firstImage} alt={col.name} fill className="object-cover opacity-50 transition-all duration-500 group-hover:opacity-70 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${col.gradient} opacity-30`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14152E] via-transparent to-transparent" />
                  </div>
                  <div className="p-6 pt-3">
                    <div className={`mb-3 h-1 w-10 rounded-full bg-gradient-to-r ${col.gradient}`} />
                    <h3 className={`text-lg font-bold ${col.textGradientClass}`}>{col.name}</h3>
                    <p className="mt-0.5 text-xs text-slate-400">{col.subtitle}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-slate-200">${col.price}</span>
                        <span className="text-[11px] text-slate-400">{col.plugins.length} plugins</span>
                      </div>
                      <span className="text-xs text-slate-400 transition group-hover:text-slate-300">Explore &rarr;</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PLUGINS */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold text-white mb-2">Featured Plugins</h2>
          <p className="text-sm text-slate-400 mb-10">A highlight from each collection.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {collections.slice(0, 8).map((col) => {
              const p = col.plugins[0];
              const pImage = getPluginImage(p.id);
              return (
                <Link key={p.id} href={`/plugins/${p.id}`} className="group">
                  <div className="rounded-2xl border border-white/[0.08] bg-[#14152E] overflow-hidden transition hover:border-prism-violet/20">
                    <div className={`relative h-40 overflow-hidden ${!pImage ? `bg-gradient-to-br ${p.gradient}` : 'bg-black'}`}>
                      {pImage ? (
                        <Image src={pImage} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14152E] via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <span className="rounded-full bg-black/30 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/70 backdrop-blur-sm">{col.name}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[15px] font-semibold text-slate-200">{p.name}</h3>
                      <p className="mt-0.5 text-sm" style={{ color: p.accentColor }}>{p.tagline}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-base font-bold text-slate-200">${p.price}</span>
                        <span className="text-xs text-slate-400 transition group-hover:text-slate-300">View &rarr;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLUGIN SPOTLIGHT */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-orange-600/20 via-red-600/10 to-amber-500/20 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]">
                <div className="relative aspect-square">
                  <Image src={getPluginImage('dragonbreath-pedal')!} alt="Dragonbreath Pedal" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              </div>
            </div>
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/[0.05] px-4 py-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-400">Plugin Spotlight</span>
              </div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight leading-[1.1]">
                <span className="text-gradient-dragon">Dragonbreath</span>
              </h2>
              <p className="mt-2 text-lg text-white/70 font-medium">Where Clean Signal Goes to Evolve</p>
              <p className="mt-6 text-[16px] leading-[1.8] text-slate-400">
                Four-stage multi-effect engine with cascading saturation, tempo-synced modulation, filtered delay, and convolution reverb in a single signal path. Parallel dry/wet routing with per-stage gain staging &mdash; the kind of architecture you&apos;d build with a rack of outboard, collapsed into one plugin.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {['Multi-effect chain', 'Parallel routing', 'Analog saturation', 'Preset morphing'].map((f) => (
                  <span key={f} className="rounded-full border border-orange-500/15 bg-orange-500/[0.05] px-3 py-1 text-xs text-orange-300/80">{f}</span>
                ))}
              </div>
              <div className="mt-10 flex items-center gap-6">
                <Link href="/plugins/dragonbreath-pedal" className="rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-7 py-3 text-[15px] font-bold text-white transition hover:opacity-90">
                  View Dragonbreath
                </Link>
                <span className="text-2xl font-bold text-slate-200">$49</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-prism-violet/[0.05] blur-[120px]" />
          <div className="relative">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tight leading-tight">
              The Signal Starts<br />
              <span className="text-gradient-prism">Here.</span>
            </h2>
            <p className="mt-5 text-base text-slate-400">Shape the frequencies that shape the future.</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/pricing" className="rounded-xl bg-prism-cyan px-8 py-3.5 text-[15px] font-bold text-[#14152E] transition hover:bg-prism-cyan/85">
                Get Started &mdash; ${completeSuitePrice}
              </Link>
              <span className="text-sm text-slate-400">30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
