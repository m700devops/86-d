import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, PenTool, Info } from 'lucide-react';

export default function PenDetection({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  return (
    <div className="h-full flex flex-col bg-primary-dark">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-text-secondary hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">Pen Detection Guide</h2>
        <div className="w-10" />
      </header>

      {/* Content */}
      <div className="flex-1 px-6 py-4 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-[280px] aspect-[3/4] bg-surface border border-border-custom rounded-3xl overflow-hidden mb-12 shadow-2xl">
          {/* Simulated Camera View with Pen */}
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/bottle-pen/600/800?blur=1')] bg-cover bg-center opacity-40" />
          
          {/* Liquid Line Animation */}
          <motion.div 
            initial={{ y: '60%' }}
            animate={{ y: ['60%', '58%', '60%'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute left-0 right-0 h-0.5 bg-accent-secondary shadow-[0_0_10px_rgba(255,215,0,0.8)] z-10"
          />

          {/* Pen Overlay Animation */}
          <motion.div
            initial={{ x: '100%', y: '50%', rotate: -45 }}
            animate={{ x: '40%', y: '58%', rotate: -30 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute z-20"
          >
            <div className="w-40 h-4 bg-gray-400 rounded-full shadow-lg relative">
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-black rounded-full" />
            </div>
          </motion.div>

          {/* Detection Pulse */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute left-[40%] top-[58%] w-12 h-12 -ml-6 -mt-6 bg-accent-secondary rounded-full z-0"
          />

          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <div className="bg-accent-secondary/20 border border-accent-secondary/40 px-3 py-1 rounded-full backdrop-blur-md">
              <span className="text-accent-secondary text-[10px] font-bold uppercase tracking-widest">Liquid Line Detected</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 w-full max-w-[320px]">
          <StepItem 
            number="01" 
            title="Hold pen at liquid line" 
            desc="Align the tip of a pen or pencil with the top of the liquid." 
          />
          <StepItem 
            number="02" 
            title="Wait for gold pulse" 
            desc="Our AI uses the pen as a physical reference for 99.9% accuracy." 
          />
          <StepItem 
            number="03" 
            title="Confirm level" 
            desc="Tap the screen to lock in the precise volume." 
          />
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 safe-area-bottom">
        <div className="bg-surface border border-border-custom rounded-xl p-4 mb-6 flex gap-4">
          <div className="w-10 h-10 bg-accent-secondary/10 rounded-lg flex items-center justify-center shrink-0">
            <Info size={20} className="text-accent-secondary" />
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            <span className="text-white font-semibold">Pro Tip:</span> Using a pen reduces error by 40% compared to eye-balling, especially in dark environments.
          </p>
        </div>

        <button 
          onClick={onComplete}
          className="btn-primary w-full"
        >
          Got it, let's scan
          <Check size={20} />
        </button>
      </div>
    </div>
  );
}

function StepItem({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-accent-primary font-mono font-bold text-lg">{number}</span>
      <div>
        <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
        <p className="text-xs text-text-tertiary leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
