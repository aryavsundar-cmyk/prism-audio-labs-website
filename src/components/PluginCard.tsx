import Image from 'next/image';
import { Plugin, getPluginImage } from '@/data/plugins';
import Link from 'next/link';

interface PluginCardProps {
  plugin: Plugin;
  collectionGlow: string;
}

export default function PluginCard({ plugin, collectionGlow }: PluginCardProps) {
  const imageSrc = getPluginImage(plugin.id);

  return (
    <div className={`plugin-card group rounded-2xl border border-white/[0.08] bg-[#14152E] overflow-hidden ${collectionGlow}`}>
      {/* Plugin image or gradient fallback */}
      <Link href={`/plugins/${plugin.id}`}>
        <div className={`relative h-48 overflow-hidden ${!imageSrc ? `bg-gradient-to-br ${plugin.gradient}` : 'bg-black'}`}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={plugin.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14152E] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-5">
            <span className="rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
              {plugin.category}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="px-5 pb-5 pt-4">
        <Link href={`/plugins/${plugin.id}`} className="block">
          <h3 className="text-base font-semibold text-slate-100">{plugin.name}</h3>
          <p className="mt-0.5 text-sm" style={{ color: plugin.accentColor }}>{plugin.tagline}</p>
        </Link>

        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-slate-400">
          {plugin.description}
        </p>

        {/* Coming Soon */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/[0.05]">
          <span className="rounded-full bg-prism-cyan/[0.08] px-2.5 py-0.5 text-[11px] font-medium text-prism-cyan/80">Coming Soon</span>
          <Link href={`/plugins/${plugin.id}`} className="text-[12px] text-slate-400 transition hover:text-slate-300">
            Learn more &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
