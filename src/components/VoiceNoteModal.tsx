import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, X, Square, Play, Trash2, Check } from 'lucide-react';

export default function VoiceNoteModal({ onClose, onSave }: { onClose: () => void; onSave: (note: string) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [transcription, setTranscription] = useState('');

  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => setDuration(prev => prev + 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setIsRecording(true);
    setDuration(0);
    setTranscription('');
  };

  const stopRecording = () => {
    setIsRecording(false);
    setTranscription('Ordering 2 extra cases of Grey Goose for the weekend event. Stock is lower than usual due to the holiday rush.');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center px-4 pb-10 sm:pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="relative w-full max-w-md bg-surface border border-border-custom rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Voice Note</h3>
            <button onClick={onClose} className="p-2 text-text-tertiary hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center py-10">
            <div className="relative mb-6">
              <AnimatePresence>
                {isRecording && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-accent-primary rounded-full"
                  />
                )}
              </AnimatePresence>
              
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all relative z-10 ${
                  isRecording ? 'bg-error text-white' : 'bg-accent-primary text-white shadow-[0_0_30px_rgba(255,107,53,0.4)]'
                }`}
              >
                {isRecording ? <Square size={32} fill="currentColor" /> : <Mic size={32} fill="currentColor" />}
              </button>
            </div>

            <p className={`text-2xl font-mono font-bold mb-2 ${isRecording ? 'text-error' : 'text-white'}`}>
              {formatDuration(duration)}
            </p>
            <p className="text-sm text-text-tertiary">
              {isRecording ? 'Recording audio...' : 'Tap to start recording'}
            </p>
          </div>

          <AnimatePresence>
            {transcription && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary-dark/50 border border-border-custom rounded-2xl p-4 mb-6"
              >
                <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2">Transcription</p>
                <p className="text-sm text-text-secondary leading-relaxed italic">
                  "{transcription}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            <button 
              onClick={() => setTranscription('')}
              className="flex-1 h-14 bg-surface border border-border-custom rounded-xl flex items-center justify-center gap-2 text-text-tertiary hover:text-error transition-colors"
            >
              <Trash2 size={18} />
              Discard
            </button>
            <button 
              onClick={() => onSave(transcription)}
              disabled={!transcription}
              className="flex-1 h-14 bg-accent-primary text-white rounded-xl flex items-center justify-center gap-2 font-semibold disabled:opacity-30 transition-all"
            >
              <Check size={18} />
              Save Note
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
