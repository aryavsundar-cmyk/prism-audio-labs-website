import Link from 'next/link';
import Image from 'next/image';
import { pluginImageMap } from '@/data/plugins';

// 12 best MidJourney images for gallery
const galleryPlugins = [
  { id: 'dragonbreath-pedal', name: 'Dragonbreath' },
  { id: 'stellar-supersaw', name: 'Stellar Supersaw' },
  { id: 'nebula-mfx', name: 'Nebula MFX' },
  { id: 'prism-tabla', name: 'Tabla' },
  { id: 'glacier-plate', name: 'Glacier Plate' },
  { id: 'comet-juno', name: 'Comet Juno' },
  { id: 'magma-hard-synth', name: 'Magma Hard Synth' },
  { id: 'prism-oud', name: 'Oud' },
  { id: 'astral-rhodes', name: 'Astral Rhodes' },
  { id: 'aurora-string-pad', name: 'Aurora String Pad' },
  { id: 'prism-kora', name: 'Kora' },
  { id: 'telluric-analog-synth', name: 'Telluric Analog Synth' },
];

export default function AboutPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="relative py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-prism-violet/[0.06] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2 text-[14px] text-white/65 mb-8">
            <Link href="/" className="transition hover:text-white/65">Home</Link>
            <span>/</span>
            <span className="text-white/65">About</span>
          </div>

          <div className="max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-1.5 w-14 rounded-full animated-border" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/65">About</span>
            </div>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tight text-white leading-[1.05]">
              Analog Soul.<br />
              <span className="text-gradient-prism">Digital Precision.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="max-w-xl">
              <p className="text-[17px] leading-[1.9] text-white/65">
                Prism Audio Labs was born from a deep love of analog gear and a belief that digital tools should feel just as alive. Every plugin in our collection is meticulously crafted to capture the warmth, character, and unpredictability of real hardware.
              </p>
              <p className="mt-6 text-[17px] leading-[1.9] text-white/65">
                From the fire-breathing Dragonbreath effects pedals to the ancient world instruments of the Prism World collection, we bridge the gap between tradition and technology. Our plugins don&apos;t just process sound — they inspire it.
              </p>
              <p className="mt-6 text-[17px] leading-[1.9] text-white/65">
                We believe the best tools disappear into the creative process. That&apos;s why every parameter, every knob, every preset has been tuned not just for technical accuracy, but for musical feel. When you reach for a Prism plugin, you should feel like you&apos;re reaching for a trusted piece of gear.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl border border-orange-500/10 bg-gradient-to-br from-orange-500/[0.04] to-transparent p-7">
                <div className="text-[28px] font-bold text-gradient-dragon">01</div>
                <h4 className="mt-3 text-[16px] font-semibold text-white/85">Analog Inspired</h4>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65">Every algorithm starts with real hardware analysis and listening tests</p>
              </div>
              <div className="rounded-2xl border border-purple-500/10 bg-gradient-to-br from-purple-500/[0.04] to-transparent p-7">
                <div className="text-[28px] font-bold text-gradient-cosmos">02</div>
                <h4 className="mt-3 text-[16px] font-semibold text-white/85">Celestial Design</h4>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65">Interfaces inspired by cosmic phenomena and natural beauty</p>
              </div>
              <div className="rounded-2xl border border-amber-500/10 bg-gradient-to-br from-amber-500/[0.04] to-transparent p-7">
                <div className="text-[28px] font-bold text-gradient-world">03</div>
                <h4 className="mt-3 text-[16px] font-semibold text-white/85">Cultural Respect</h4>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65">World instruments honoring centuries of musical tradition and heritage</p>
              </div>
              <div className="rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/[0.04] to-transparent p-7">
                <div className="text-[28px] font-bold text-gradient-elements">04</div>
                <h4 className="mt-3 text-[16px] font-semibold text-white/85">Elemental Force</h4>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65">Harnessing nature&apos;s primal energy — air, fire, water, earth — in sound</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Plugins Gallery */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h2 className="text-[28px] font-bold text-white/90">Our Plugins</h2>
            <p className="mt-2 text-[16px] text-white/55">Crafted interfaces, designed to inspire.</p>
          </div>

          {/* Staggered masonry-style grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryPlugins.map((plugin, idx) => {
              const src = pluginImageMap[plugin.id];
              if (!src) return null;
              // Alternate between taller and shorter aspect ratios for staggered feel
              const isTall = idx % 3 === 0;
              return (
                <Link
                  key={plugin.id}
                  href={`/plugins/${plugin.id}`}
                  className="group block break-inside-avoid overflow-hidden rounded-xl border border-white/[0.06] bg-[#14152E] transition hover:border-prism-violet/20"
                >
                  <div className={`relative ${isTall ? 'aspect-[3/4]' : 'aspect-square'} overflow-hidden`}>
                    <Image
                      src={src}
                      alt={plugin.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-semibold text-white">{plugin.name}</p>
                      <p className="text-xs text-white/60">View Plugin</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-[28px] font-bold text-white/90">System Requirements</h2>
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.06] bg-[#14152E] p-10">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h4 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.15em] text-prism-cyan/60">Minimum</h4>
                <ul className="space-y-4 text-[15px] text-white/60">
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-white/20" /> macOS 11 (Big Sur) or later</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-white/20" /> Intel or Apple Silicon</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-white/20" /> 8 GB RAM</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-white/20" /> 500 MB disk space</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-white/20" /> VST3 or AU compatible DAW</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.15em] text-prism-cyan/60">Tested With</h4>
                <ul className="space-y-4 text-[15px] text-white/60">
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-prism-cyan/40" /> Logic Pro</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-prism-cyan/40" /> Ableton Live</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-prism-cyan/40" /> REAPER</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-prism-cyan/40" /> GarageBand</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-prism-cyan/40" /> Pro Tools (VST3)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-white/[0.06] bg-[#14152E] p-10 text-center">
            <h2 className="text-[24px] font-bold text-white/90">Get in Touch</h2>
            <p className="mt-3 text-[16px] text-white/55">Questions, feedback, or partnership inquiries — we&apos;d love to hear from you.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <span className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-6 py-3 text-[15px] font-mono text-white/65">support@prismaudiolabs.com</span>
              <Link href="/pricing" className="rounded-xl bg-prism-cyan px-6 py-3 text-[14px] font-semibold text-[#14152E] transition hover:bg-prism-cyan/85">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
