'use client';
import Image from 'next/image';
import { pluginImageMap } from '@/data/plugins';

export default function InfiniteMarquee() {
  const allImages = Object.entries(pluginImageMap);
  const mid = Math.ceil(allImages.length / 2);
  const row1 = allImages.slice(0, mid);
  const row2 = allImages.slice(mid);

  return (
    <section className="py-20 border-t border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 text-center mb-12">
        <h2 className="text-4xl font-bold text-white">46 Professional Plugins</h2>
        <p className="mt-3 text-base text-slate-400">Every interface designed with purpose</p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-4 hover-pause">
        <div className="flex w-max animate-marquee-left hover-pause">
          {[...row1, ...row1].map(([id, src], i) => (
            <div
              key={`r1-${id}-${i}`}
              className="mx-2 w-[200px] flex-shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-[#14152E] transition-transform duration-300 hover:scale-105 hover:border-prism-violet/20"
            >
              <div className="relative aspect-square">
                <Image
                  src={src}
                  alt={id}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#08091A] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#08091A] to-transparent z-10" />
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative hover-pause">
        <div className="flex w-max animate-marquee-right hover-pause">
          {[...row2, ...row2].map(([id, src], i) => (
            <div
              key={`r2-${id}-${i}`}
              className="mx-2 w-[200px] flex-shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-[#14152E] transition-transform duration-300 hover:scale-105 hover:border-prism-violet/20"
            >
              <div className="relative aspect-square">
                <Image
                  src={src}
                  alt={id}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#08091A] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#08091A] to-transparent z-10" />
      </div>
    </section>
  );
}
