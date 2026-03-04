import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Camera, Barcode, Check, Search } from 'lucide-react';
import { CATEGORIES } from '../constants';

export default function ManualAdd({ onClose, onAdd }: { onClose: () => void; onAdd: (bottle: any) => void }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Spirits');

  return (
    <div className="fixed inset-0 z-[100] bg-primary-dark flex flex-col">
      <header className="px-6 h-16 flex items-center justify-between border-b border-border-custom">
        <button onClick={onClose} className="p-2 -ml-2 text-text-secondary hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold">Add Product</h2>
        <div className="w-10" />
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
        <div className="flex justify-center">
          <button className="w-32 h-32 bg-surface border-2 border-dashed border-border-custom rounded-2xl flex flex-col items-center justify-center gap-2 text-text-tertiary hover:text-white hover:border-text-tertiary transition-all">
            <Camera size={32} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Add Photo</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest px-1">Product Name</label>
            <input 
              type="text" 
              placeholder="e.g. Grey Goose Vodka"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 bg-surface border border-border-custom rounded-xl px-4 text-white focus:border-accent-primary outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest px-1">Brand</label>
            <input 
              type="text" 
              placeholder="e.g. Bacardi"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full h-14 bg-surface border border-border-custom rounded-xl px-4 text-white focus:border-accent-primary outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest px-1">Category</label>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`h-12 rounded-xl border font-medium text-sm transition-all ${
                    category === cat 
                      ? 'bg-accent-primary/10 border-accent-primary text-accent-primary' 
                      : 'bg-surface border-border-custom text-text-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button className="w-full h-14 bg-surface border border-border-custom rounded-xl flex items-center justify-center gap-3 text-text-secondary hover:text-white transition-colors">
            <Barcode size={20} />
            <span className="font-semibold">Scan Barcode Instead</span>
          </button>
        </div>
      </div>

      <div className="p-6 safe-area-bottom">
        <button 
          onClick={() => onAdd({ name, brand, category })}
          disabled={!name || !brand}
          className="btn-primary w-full disabled:opacity-30"
        >
          Add to Inventory
          <Check size={20} />
        </button>
      </div>
    </div>
  );
}
