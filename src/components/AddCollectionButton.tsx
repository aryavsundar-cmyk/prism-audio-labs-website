'use client';

import { Collection } from '@/data/plugins';
import { useCart } from '@/context/CartContext';

export default function AddCollectionButton({ collection }: { collection: Collection }) {
  const { addCollection, isInCart } = useCart();
  const inCart = isInCart(`collection-${collection.id}`) || isInCart('complete-suite');

  return (
    <button
      onClick={() => { if (!inCart) addCollection(collection); }}
      className={`rounded-xl px-6 py-3 text-[14px] font-semibold transition ${
        inCart
          ? 'bg-prism-cyan/10 text-prism-cyan cursor-default'
          : `bg-gradient-to-r ${collection.gradient} text-white hover:opacity-90`
      }`}
    >
      {inCart ? 'In Cart' : 'Add Collection to Cart'}
    </button>
  );
}
