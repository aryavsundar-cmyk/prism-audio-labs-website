'use client';

import { Collection } from '@/data/plugins';
import PluginCard from './PluginCard';
import AddCollectionButton from './AddCollectionButton';

export default function CollectionSection({ collection }: { collection: Collection }) {
  const isElements = collection.id === 'elements';
  const isDragonbreath = collection.id === 'dragonbreath';
  const isCosmos = collection.id === 'cosmos';

  const elementGroups = isElements
    ? (['air', 'fire', 'earth', 'water'] as const).map((el) => ({
        element: el,
        plugins: collection.plugins.filter((p) => p.element === el),
      }))
    : null;

  const elementMeta: Record<string, { color: string; desc: string; svg: React.ReactNode }> = {
    air: {
      color: 'text-slate-300',
      desc: 'Ethereal modulation and atmospheric effects',
      svg: <svg className="h-6 w-6 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    fire: {
      color: 'text-red-400',
      desc: 'Aggressive saturation and volcanic synthesis',
      svg: <svg className="h-6 w-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c-4.97 0-9-2.69-9-6 0-4 5-11 9-14 4 3 9 10 9 14 0 3.31-4.03 6-9 6z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    earth: {
      color: 'text-amber-500',
      desc: 'Tectonic distortion and grounding synthesis',
      svg: <svg className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    water: {
      color: 'text-cyan-400',
      desc: 'Crystalline reverbs and frozen textures',
      svg: <svg className="h-6 w-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l-5.5 9c-1.25 2.17-.5 5 2 6.5S14.5 19.5 16 17.5c1.5-2 2.5-4.5 1.5-6.5L12 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
  };

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Dragonbreath */}
        {isDragonbreath && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-orange-500/[0.08] bg-[#14152E] p-8 md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400/50">Flagship</span>
                  <h3 className="mt-1 text-3xl font-bold text-gradient-dragon">Dragonbreath</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                    The fire-breathing multi-effect that started it all. Chain distortion, modulation, delay, and reverb into one devastating signal path.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-orange-500/[0.08] px-3 py-1 text-xs text-orange-300/80">Multi-Effect</span>
                    <span className="rounded-full bg-red-500/[0.08] px-3 py-1 text-xs text-red-300/80">Analog Modeled</span>
                    <span className="rounded-full bg-amber-500/[0.08] px-3 py-1 text-xs text-amber-300/80">Preset Morphing</span>
                  </div>
                </div>
                <div className="flex h-48 w-32 shrink-0 items-center justify-center">
                  <div className="relative h-40 w-24 rounded-xl border border-orange-500/15 bg-gradient-to-b from-[#14080099] to-[#0A050099]">
                    <div className="flex justify-center gap-4 pt-5">
                      <div className="h-5 w-5 rounded-full border border-orange-500/20 bg-orange-900/30" />
                      <div className="h-5 w-5 rounded-full border border-orange-500/20 bg-orange-900/30" />
                    </div>
                    <div className="mt-3 flex justify-center">
                      <div className="h-6 w-6 rounded-full border border-red-500/20 bg-red-900/30" />
                    </div>
                    <div className="mt-4 flex justify-center">
                      <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse-glow" />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <div className="h-7 w-7 rounded-full border border-white/[0.06] bg-zinc-800/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {collection.plugins.map((plugin) => (
                <PluginCard key={plugin.id} plugin={plugin} collectionGlow="hover:glow-dragon" />
              ))}
            </div>
          </div>
        )}

        {/* Elements */}
        {isElements && elementGroups && (
          <div className="space-y-20">
            {elementGroups.map(({ element, plugins }) => {
              const meta = elementMeta[element];
              return (
                <div key={element}>
                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      {meta.svg}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold capitalize ${meta.color}`}>{element}</h3>
                      <p className="text-sm text-slate-400">{meta.desc}</p>
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {plugins.map((plugin) => (
                      <PluginCard key={plugin.id} plugin={plugin} collectionGlow="hover:glow-elements" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cosmos */}
        {isCosmos && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-purple-500/[0.08] bg-[#14152E99] p-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-400/50">The Collection</span>
              <h3 className="mt-1 text-2xl font-bold text-gradient-cosmos">Synthesizers & Celestial Effects</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                From blazing supersaw leads to the frozen silence of deep space. Vintage keys reimagined through a cosmic lens.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {collection.plugins.map((plugin) => (
                <PluginCard key={plugin.id} plugin={plugin} collectionGlow="hover:glow-cosmos" />
              ))}
            </div>
          </div>
        )}

        {/* World Instrument Collections (generic layout) */}
        {collection.group === 'world' && (
          <div className="space-y-8">
            <div className={`rounded-2xl border border-white/[0.06] bg-[#14152E99] p-8`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`h-1 w-10 rounded-full bg-gradient-to-r ${collection.gradient}`} />
                {collection.region && (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">{collection.region}</span>
                )}
              </div>
              <h3 className={`text-2xl font-bold ${collection.textGradientClass}`}>{collection.subtitle}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                {collection.description}
              </p>
            </div>
            <div className={`grid gap-5 sm:grid-cols-2 ${collection.plugins.length > 3 ? 'lg:grid-cols-3' : `lg:grid-cols-${collection.plugins.length}`}`}>
              {collection.plugins.map((plugin) => (
                <PluginCard key={plugin.id} plugin={plugin} collectionGlow={`hover:${collection.glowClass}`} />
              ))}
            </div>
          </div>
        )}

        {/* Collection CTA */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 md:flex-row">
          <div>
            <h4 className="text-lg font-semibold text-slate-200">Get the {collection.name} Collection</h4>
            <p className="mt-1 text-sm text-slate-400">{collection.plugins.length} plugins. One price.</p>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-2xl font-bold text-slate-200">${collection.price}</span>
            <AddCollectionButton collection={collection} />
          </div>
        </div>
      </div>
    </section>
  );
}
