import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trash2, ChevronRight, Search, Plus, Minus } from 'lucide-react';
import { Bottle, LiquidLevel } from '../types';
import { LEVELS } from '../constants';

export default function ReviewGrid({ 
  bottles, 
  onGenerateOrder, 
  onAddManual,
  onUpdateBottle 
}: { 
  bottles: Bottle[]; 
  onGenerateOrder: () => void; 
  onAddManual: () => void;
  onUpdateBottle: (id: string, updates: Partial<Bottle>) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBottles = bottles.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-primary-dark">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Review & Par</h1>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-text-tertiary uppercase tracking-widest bg-surface/50 px-2 py-0.5 rounded border border-border-custom/50">
              {filteredBottles.length} Items
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={14} />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-surface/50 border border-border-custom/50 rounded-lg pl-9 pr-4 text-xs focus:border-accent-primary outline-none transition-colors"
            />
          </div>
          <button 
            onClick={onAddManual}
            className="w-10 h-10 bg-accent-primary border border-accent-primary rounded-lg flex items-center justify-center text-white shadow-[0_4px_12px_rgba(255,107,53,0.2)]"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        <div className="space-y-1.5">
          {filteredBottles.map(bottle => (
            <BottleRow 
              key={bottle.id} 
              bottle={bottle} 
              onUpdate={(updates) => onUpdateBottle(bottle.id, updates)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary-dark via-primary-dark to-transparent z-20 safe-area-bottom">
        <button 
          onClick={onGenerateOrder}
          className="btn-primary w-full shadow-[0_8px_24px_rgba(255,107,53,0.3)]"
        >
          Generate Order Summary
          <ChevronRight size={20} />
        </button>
        <p className="text-center text-text-tertiary text-[10px] font-medium uppercase tracking-widest mt-3">
          Finalize inventory and par levels
        </p>
      </div>
    </div>
  );
}

const BottleRow: React.FC<{ 
  bottle: Bottle; 
  onUpdate: (updates: Partial<Bottle>) => void;
}> = ({ bottle, onUpdate }) => {
  return (
    <motion.div 
      layout
      className="bg-surface/30 border border-border-custom/30 rounded-md p-2 flex items-center gap-4 hover:bg-surface/50 transition-colors"
    >
      {/* Name & Brand - Exactly 50% width to bring controls to the middle */}
      <div className="w-1/2 min-w-0 pr-2">
        <h3 className="text-[12px] font-bold truncate leading-tight">{bottle.name}</h3>
        <p className="text-[9px] text-text-tertiary font-medium uppercase tracking-wider leading-none">{bottle.brand}</p>
      </div>

      {/* Controls Container - Occupies the remaining 50% */}
      <div className="flex-1 flex items-center gap-2 justify-between">
        {/* Current Level (4 small boxes) */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="flex gap-0.5 w-full">
            {LEVELS.map(l => (
              <button
                key={l.value}
                onClick={() => onUpdate({ level: l.value as LiquidLevel })}
                className={`flex-1 h-6 rounded-[1px] border transition-all ${
                  bottle.level === l.value 
                    ? 'bg-accent-primary border-accent-primary' 
                    : 'bg-border-custom/20 border-border-custom/40 hover:border-text-tertiary'
                }`}
              />
            ))}
          </div>
          <span className="text-[8px] font-bold text-accent-secondary uppercase tracking-tighter leading-none">{bottle.level}</span>
        </div>

        {/* Backups (Unopened bottles) */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="flex items-center bg-white/5 rounded border border-white/10 h-8 px-1.5 w-full justify-between">
            <button 
              onClick={() => onUpdate({ currentStock: Math.max(0, bottle.currentStock - 1) })}
              className="w-5 h-5 flex items-center justify-center text-text-tertiary hover:text-white"
            >
              <Minus size={12} />
            </button>
            <span className="text-[11px] font-mono font-bold text-white text-center">{bottle.currentStock}</span>
            <button 
              onClick={() => onUpdate({ currentStock: bottle.currentStock + 1 })}
              className="w-5 h-5 flex items-center justify-center text-text-tertiary hover:text-white"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="text-[8px] font-bold text-text-tertiary uppercase tracking-widest leading-none">Back up</span>
        </div>

        {/* Par Level */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="flex items-center bg-accent-primary/10 rounded border border-accent-primary/30 h-8 px-1.5 w-full justify-between">
            <button 
              onClick={() => onUpdate({ parLevel: Math.max(0, bottle.parLevel - 1) })}
              className="w-5 h-5 flex items-center justify-center text-accent-primary/60 hover:text-accent-primary"
            >
              <Minus size={12} />
            </button>
            <span className="text-[11px] font-mono font-bold text-accent-primary text-center">{bottle.parLevel}</span>
            <button 
              onClick={() => onUpdate({ parLevel: bottle.parLevel + 1 })}
              className="w-5 h-5 flex items-center justify-center text-accent-primary/60 hover:text-accent-primary"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="text-[8px] font-bold text-accent-primary uppercase tracking-widest leading-none">Par</span>
        </div>
      </div>

      {/* Delete */}
      <button className="p-1 text-text-tertiary hover:text-error transition-colors shrink-0">
        <Trash2 size={14} />
      </button>
    </motion.div>
  );
}
