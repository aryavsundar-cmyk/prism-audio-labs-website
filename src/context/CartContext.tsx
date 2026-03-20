'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Plugin, Collection, collections, completeSuitePrice, CollectionId } from '@/data/plugins';

export type CartItemType = 'plugin' | 'collection' | 'suite';

export interface CartItem {
  id: string;
  name: string;
  type: CartItemType;
  price: number;
  collectionId?: CollectionId;
  gradient?: string;
  accentColor?: string;
}

interface CartContextType {
  items: CartItem[];
  addPlugin: (plugin: Plugin) => void;
  addCollection: (collection: Collection) => void;
  addSuite: () => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  itemCount: number;
  subtotal: number;
  savings: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addPlugin = useCallback((plugin: Plugin) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === plugin.id)) return prev;
      // Check if collection or suite already covers this plugin
      const col = collections.find((c) => c.id === plugin.collection);
      if (prev.find((i) => i.id === `collection-${plugin.collection}` || i.id === 'complete-suite')) return prev;
      return [...prev, {
        id: plugin.id,
        name: plugin.name,
        type: 'plugin' as CartItemType,
        price: plugin.price,
        collectionId: plugin.collection,
        gradient: plugin.gradient,
        accentColor: plugin.accentColor,
      }];
    });
  }, []);

  const addCollection = useCallback((collection: Collection) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === `collection-${collection.id}` || i.id === 'complete-suite')) return prev;
      // Remove individual plugins from this collection
      const filtered = prev.filter((i) => i.collectionId !== collection.id);
      return [...filtered, {
        id: `collection-${collection.id}`,
        name: `${collection.name} Collection`,
        type: 'collection' as CartItemType,
        price: collection.price,
        collectionId: collection.id,
        gradient: collection.gradient,
        accentColor: collection.accentColor,
      }];
    });
  }, []);

  const addSuite = useCallback(() => {
    setItems([{
      id: 'complete-suite',
      name: 'Complete Suite — All Collections',
      type: 'suite' as CartItemType,
      price: completeSuitePrice,
      gradient: 'from-prism-cyan via-prism-blue to-prism-accent',
      accentColor: '#6EE7B7',
    }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback((id: string) => {
    return items.some((i) => i.id === id);
  }, [items]);

  const subtotal = items.reduce((sum, i) => sum + i.price, 0);

  // Calculate what user would pay individually
  const fullPrice = items.reduce((sum, item) => {
    if (item.type === 'suite') {
      return collections.reduce((s, c) => s + c.plugins.reduce((ps, p) => ps + p.price, 0), 0);
    }
    if (item.type === 'collection') {
      const col = collections.find((c) => c.id === item.collectionId);
      return sum + (col ? col.plugins.reduce((ps, p) => ps + p.price, 0) : item.price);
    }
    return sum + item.price;
  }, 0);

  const savings = fullPrice - subtotal;

  return (
    <CartContext.Provider value={{
      items,
      addPlugin,
      addCollection,
      addSuite,
      removeItem,
      clearCart,
      isInCart,
      itemCount: items.length,
      subtotal,
      savings,
      total: subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
