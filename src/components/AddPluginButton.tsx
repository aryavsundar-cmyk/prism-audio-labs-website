'use client';

import { Plugin } from '@/data/plugins';
import { useCart } from '@/context/CartContext';

export default function AddPluginButton({ plugin, size = 'md' }: { plugin: Plugin; size?: 'sm' | 'md' }) {
  const { addPlugin, isInCart } = useCart();
  const inCart = isInCart(plugin.id) || isInCart(`collection-${plugin.collection}`) || isInCart('complete-suite');

  if (size === 'sm') {
    return (
      <button
        onClick={() => { if (!inCart) addPlugin(plugin); }}
        className={`rounded-lg px-4 py-2 text-[13px] font-semibold transition ${
          inCart
            ? 'bg-prism-cyan/10 text-prism-cyan cursor-default'
            : 'bg-white/[0.06] text-white/60 hover:bg-white/10 hover:text-white'
        }`}
      >
        {inCart ? 'In Cart' : 'Add to Cart'}
      </button>
    );
  }

  return (
    <button
      onClick={() => { if (!inCart) addPlugin(plugin); }}
      className={`rounded-xl px-8 py-3 text-[14px] font-bold transition ${
        inCart
          ? 'bg-prism-cyan/10 text-prism-cyan cursor-default'
          : 'text-white hover:opacity-90'
      }`}
      style={!inCart ? { backgroundColor: plugin.accentColor } : undefined}
    >
      {inCart ? 'Added to Cart' : `Add to Cart — $${plugin.price}`}
    </button>
  );
}
