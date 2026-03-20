import Image from 'next/image';
import { collections, getPluginById, getPluginImage } from '@/data/plugins';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddPluginButton from '@/components/AddPluginButton';

export function generateStaticParams() {
  return collections.flatMap((col) =>
    col.plugins.map((plugin) => ({ id: plugin.id }))
  );
}

export default async function PluginPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = getPluginById(id);
  if (!result) return notFound();

  const { plugin, collection } = result;
  const imageSrc = getPluginImage(plugin.id);

  // Find related plugins from same collection (excluding current)
  const relatedPlugins = collection.plugins
    .filter((p) => p.id !== plugin.id)
    .slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: collection.bgPattern }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-white/65">
            <Link href="/" className="transition hover:text-white/65">Home</Link>
            <span>/</span>
            <Link href={`/collections/${collection.id}`} className="transition hover:text-white/65">{collection.name}</Link>
            <span>/</span>
            <span className="text-white/65">{plugin.name}</span>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Plugin visual */}
            <div className="relative">
              <div className={`relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br ${plugin.gradient} p-1`}>
                <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-[#14152E] overflow-hidden">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={plugin.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    /* Fallback: Abstract plugin UI mockup */
                    <div className="relative w-full max-w-xs p-8">
                      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-6">
                        <div className="mb-6 text-center">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">Prism Audio Labs</div>
                          <div className="mt-1 text-lg font-bold" style={{ color: plugin.accentColor }}>{plugin.name}</div>
                        </div>
                        <div className="flex justify-center gap-6">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="text-center">
                              <div
                                className="mx-auto h-12 w-12 rounded-full border-2 shadow-lg"
                                style={{
                                  borderColor: `${plugin.accentColor}40`,
                                  background: `radial-gradient(circle at 40% 35%, ${plugin.accentColor}20, transparent 70%)`,
                                  boxShadow: `0 0 20px ${plugin.accentColor}10`,
                                }}
                              >
                                <div className="flex h-full items-center justify-center">
                                  <div
                                    className="h-0.5 w-4 rounded-full"
                                    style={{ backgroundColor: `${plugin.accentColor}80`, transform: `rotate(${-45 + i * 45}deg)` }}
                                  />
                                </div>
                              </div>
                              <div className="mt-2 text-[8px] uppercase tracking-widest text-white/35">
                                {plugin.features[i - 1]?.split(' ')[0] || 'Ctrl'}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 space-y-1">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 20 }).map((_, i) => (
                              <div
                                key={i}
                                className="h-2 flex-1 rounded-sm"
                                style={{
                                  backgroundColor: i < 14
                                    ? `${plugin.accentColor}${Math.round(20 + i * 4).toString(16)}`
                                    : i < 17
                                    ? '#F59E0B30'
                                    : '#EF444430',
                                }}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between text-[7px] text-white/30">
                            <span>-inf</span>
                            <span>0 dB</span>
                            <span>+6</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-center">
                          <div
                            className="h-2 w-2 rounded-full animate-pulse-glow"
                            style={{ backgroundColor: plugin.accentColor, boxShadow: `0 0 8px ${plugin.accentColor}` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Format badges below image */}
              <div className="mt-4 flex justify-center gap-3">
                {plugin.formats.map((f) => (
                  <span key={f} className="rounded-lg border border-white/5 bg-white/[0.03] px-4 py-2 text-xs font-mono text-white/65">{f}</span>
                ))}
                <span className="rounded-lg border border-white/5 bg-white/[0.03] px-4 py-2 text-xs font-mono text-white/65">macOS</span>
              </div>
            </div>

            {/* Plugin info */}
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                style={{ backgroundColor: `${plugin.accentColor}15`, color: plugin.accentColor }}
              >
                {plugin.category}
              </span>

              <h1 className="mt-4 text-5xl font-black tracking-tight text-white">{plugin.name}</h1>
              <p className="mt-2 text-xl font-medium" style={{ color: plugin.accentColor }}>{plugin.tagline}</p>

              <p className="mt-6 text-base leading-relaxed text-white/65">{plugin.description}</p>

              {/* Price + CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="text-[36px] font-bold text-white/90">${plugin.price}</span>
                <AddPluginButton plugin={plugin} />
                <Link href="/cart" className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-[14px] font-medium text-white/65 transition hover:bg-white/5 hover:text-white">
                  View Cart
                </Link>
              </div>

              {/* Part of collection */}
              <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/65">Part of the</div>
                    <Link href={`/#${collection.id}`} className={`text-sm font-semibold ${collection.textGradientClass} transition hover:opacity-80`}>
                      {collection.name} Collection
                    </Link>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/65">Save with collection</div>
                    <div className="text-sm font-bold text-prism-cyan">${collection.price}</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mt-8">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/65">Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {plugin.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-white/65">
                      <svg className="h-4 w-4 shrink-0" style={{ color: plugin.accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white">About {plugin.name}</h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-white/65">
              <p>{plugin.description}</p>
              <p>
                Every parameter in {plugin.name} has been carefully tuned to deliver professional results
                with minimal effort. The intuitive interface puts the most important controls front and
                center, while deeper parameters are accessible when you need them.
              </p>
              <p>
                Designed for seamless integration into your existing workflow, {plugin.name} supports
                both VST3 and AU formats on macOS, with full Apple Silicon optimization for
                maximum performance on the latest hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-2xl font-bold text-white">Specifications</h2>
            <div className="divide-y divide-white/5 rounded-2xl border border-white/5 bg-[#14152E]">
              {[
                { label: 'Plugin Name', value: plugin.name },
                { label: 'Manufacturer', value: 'Prism Audio Labs' },
                { label: 'Category', value: plugin.category.charAt(0).toUpperCase() + plugin.category.slice(1) },
                { label: 'Collection', value: collection.name },
                { label: 'Formats', value: plugin.formats.join(', ') },
                { label: 'Platform', value: 'macOS 11+ (Intel & Apple Silicon)' },
                { label: 'Price', value: `$${plugin.price}` },
              ].map((spec) => (
                <div key={spec.label} className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-white/65">{spec.label}</span>
                  <span className="text-sm font-medium text-white/60">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Plugins */}
      {relatedPlugins.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-8 text-2xl font-bold text-white">More from {collection.name}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPlugins.map((rp) => {
                const rpImage = getPluginImage(rp.id);
                return (
                  <Link key={rp.id} href={`/plugins/${rp.id}`}>
                    <div className="group overflow-hidden rounded-2xl border border-white/5 bg-[#14152E] transition hover:border-white/10">
                      <div className={`relative h-40 overflow-hidden ${!rpImage ? `bg-gradient-to-br ${rp.gradient}` : 'bg-black'}`}>
                        {rpImage ? (
                          <Image
                            src={rpImage}
                            alt={rp.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#14152E] via-transparent to-transparent" />
                        <div className="flex h-full items-end p-4 relative">
                          <span className="rounded-full bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                            {rp.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-white">{rp.name}</h3>
                        <p className="mt-1 text-sm" style={{ color: rp.accentColor }}>{rp.tagline}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-lg font-bold text-white">${rp.price}</span>
                          <span className="text-xs text-white/65 transition group-hover:text-white/65">View →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`rounded-3xl border border-white/5 bg-gradient-to-br ${plugin.gradient} p-px`}>
            <div className="rounded-[23px] bg-[#14152E] p-12 text-center">
              <h2 className="text-3xl font-bold text-white">Get {plugin.name}</h2>
              <p className="mt-2 text-white/65">Or save with the {collection.name} Collection.</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <AddPluginButton plugin={plugin} />
                <Link
                  href={`/collections/${collection.id}`}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-8 py-3 text-[14px] font-medium text-white/65 transition hover:bg-white/5 hover:text-white"
                >
                  Get Collection — ${collection.price}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
