import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, Zap, AlertCircle, Loader2, PenTool, ChevronRight } from 'lucide-react';

export default function CameraScan({ onReview, onPenDetect }: { onReview: () => void; onPenDetect: () => void }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [bottlesDetected, setBottlesDetected] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!hasStarted) return;

    setIsLoading(true);
    const timer = setInterval(() => setElapsed(prev => prev + 1), 1000);
    const detectionTimer = setTimeout(() => {
      setIsLoading(false);
      setBottlesDetected(12);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(detectionTimer);
    };
  }, [hasStarted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative h-full w-full bg-primary-dark overflow-hidden">
      {/* Camera Feed Simulation - No background photo as requested */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/20 to-black opacity-80" />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inventory Scan</h2>
          <p className="text-text-secondary text-sm flex items-center gap-1.5">
            <Zap size={14} className={`text-accent-primary ${hasStarted ? 'animate-pulse' : ''}`} fill="currentColor" />
            {hasStarted ? `${bottlesDetected} bottles detected` : 'Ready to scan'}
          </p>
        </div>
        {hasStarted && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent-primary/20 border border-accent-primary/30 px-3 py-1.5 rounded-full backdrop-blur-md"
          >
            <span className="text-accent-primary font-mono text-sm font-bold">{formatTime(elapsed)} elapsed</span>
          </motion.div>
        )}
      </header>

      {/* Detection Boxes (Simulated) */}
      {hasStarted && !isLoading && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <DetectionBox x="20%" y="30%" name="Grey Goose" level="75%" color="bg-success" />
          <DetectionBox x="60%" y="45%" name="Casamigos" level="50%" color="bg-warning" />
          <DetectionBox x="15%" y="60%" name="Hendrick's" level="25%" color="bg-error" />
          <DetectionBox x="55%" y="20%" name="Jack Daniel's" level="100%" color="bg-success" />
        </div>
      )}

      {/* Center Message / Start Button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6">
        {!hasStarted ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-accent-primary/10 border border-accent-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Camera size={32} className="text-accent-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Position your camera</h3>
            <p className="text-text-secondary text-sm mb-8 max-w-[260px] mx-auto">
              Ensure bottles are clearly visible and well-lit for the most accurate detection.
            </p>
            <button 
              onClick={() => setHasStarted(true)}
              className="btn-primary px-12 shadow-[0_8px_32px_rgba(255,107,53,0.4)]"
            >
              Start Inventory Scan
            </button>
          </motion.div>
        ) : isLoading ? (
          <div className="flex flex-col items-center">
            <Loader2 size={48} className="text-accent-primary animate-spin mb-4" />
            <p className="text-text-secondary font-medium">Initializing AI Vision...</p>
          </div>
        ) : null}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 safe-area-bottom">
        <div className="flex gap-4 mb-6">
          <button 
            onClick={onPenDetect}
            className="w-full h-14 bg-surface/80 border border-border-custom backdrop-blur-md rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-surface transition-colors"
          >
            <PenTool size={18} className="text-accent-secondary" />
            Pen Guide
          </button>
        </div>

        <button 
          onClick={onReview}
          disabled={!hasStarted || isLoading}
          className="btn-primary w-full shadow-[0_8px_24px_rgba(255,107,53,0.3)] disabled:opacity-30"
        >
          Review All ({bottlesDetected})
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </div>
  );
}

function DetectionBox({ x, y, name, level, color }: { x: string; y: string; name: string; level: string; color: string }) {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{ left: x, top: y }}
      className="absolute"
    >
      <div className="w-32 h-48 border-2 border-accent-primary rounded-lg relative">
        <div className="absolute -bottom-10 left-0 right-0">
          <div className="bg-accent-primary text-white text-[10px] font-bold px-2 py-1 rounded-sm whitespace-nowrap mb-1">
            {name}
          </div>
          <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden">
            <div className={`h-full ${color}`} style={{ width: level }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
