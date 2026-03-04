import React from 'react';
import { motion } from 'motion/react';
import { Camera, ChevronRight, Zap, ShieldCheck, BarChart3 } from 'lucide-react';

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="h-full flex flex-col px-6 py-12 bg-primary-dark">
      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-accent-primary rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,107,53,0.3)]"
        >
          <Zap className="text-white" size={32} fill="currentColor" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tighter leading-tight mb-4"
        >
          Inventory at the <br />
          <span className="text-accent-primary text-5xl">speed of light.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-text-secondary text-lg mb-12 max-w-[280px]"
        >
          Professional inventory for high-pressure bars. Scan, review, and order in seconds.
        </motion.p>

        <div className="space-y-6">
          <FeatureItem 
            icon={<Camera className="text-accent-primary" size={20} />} 
            title="Visual Scanning" 
            desc="Point your camera, detect bottles instantly." 
            delay={0.3}
          />
          <FeatureItem 
            icon={<ShieldCheck className="text-accent-secondary" size={20} />} 
            title="Liquid Detection" 
            desc="AI-powered level estimation with pen guide." 
            delay={0.4}
          />
          <FeatureItem 
            icon={<BarChart3 className="text-success" size={20} />} 
            title="Smart Ordering" 
            desc="Automatic par level comparison and export." 
            delay={0.5}
          />
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="safe-area-bottom"
      >
        <button 
          onClick={onComplete}
          className="btn-primary w-full group"
        >
          Get Started
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-center text-text-tertiary text-xs mt-4">
          By continuing, you agree to our Terms of Service.
        </p>
      </motion.div>
    </div>
  );
}

function FeatureItem({ icon, title, desc, delay }: { icon: React.ReactNode; title: string; desc: string; delay: number }) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay }}
      className="flex gap-4"
    >
      <div className="w-10 h-10 rounded-lg bg-surface border border-border-custom flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-text-tertiary">{desc}</p>
      </div>
    </motion.div>
  );
}
