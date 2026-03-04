import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Trash2, Mail, User, Hash } from 'lucide-react';
import { Distributor } from '../types';

export default function SettingsScreen({ 
  distributors, 
  setDistributors,
  isDarkMode,
  onToggleDarkMode
}: { 
  distributors: Distributor[]; 
  setDistributors: React.Dispatch<React.SetStateAction<Distributor[]>>;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingDistributor, setEditingDistributor] = useState<Distributor | null>(null);
  const [name, setName] = useState('');
  const [initials, setInitials] = useState('');
  const [email, setEmail] = useState('');

  const openModal = (dist?: Distributor) => {
    if (dist) {
      setEditingDistributor(dist);
      setName(dist.name);
      setInitials(dist.initials);
      setEmail(dist.email);
    } else {
      setEditingDistributor(null);
      setName('');
      setInitials('');
      setEmail('');
    }
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!name || !initials || !email) return;

    if (editingDistributor) {
      setDistributors(prev => prev.map(d => 
        d.id === editingDistributor.id 
          ? { ...d, name, initials: initials.toUpperCase(), email } 
          : d
      ));
    } else {
      const newDist: Distributor = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        initials: initials.toUpperCase(),
        email: email
      };
      setDistributors(prev => [...prev, newDist]);
    }
    
    setIsAdding(false);
    setEditingDistributor(null);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDistributors(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-primary-dark p-6 overflow-y-auto pb-24 transition-colors duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-xs text-text-tertiary mt-1">Manage your bar's configuration</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Distributors Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.2em]">Distributors</h2>
            <button 
              onClick={() => openModal()}
              className="flex items-center gap-1.5 text-[10px] font-bold text-accent-primary uppercase tracking-widest hover:text-accent-primary/80 transition-colors"
            >
              <Plus size={12} />
              Add New
            </button>
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {distributors.map(dist => (
                <motion.div
                  key={dist.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => openModal(dist)}
                  className="bg-surface border border-border-custom/50 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:border-accent-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary font-bold">
                      {dist.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">{dist.name}</h3>
                      <p className="text-[10px] text-text-tertiary font-mono">{dist.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => handleDelete(e, dist.id)}
                    className="p-2 text-text-tertiary hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* General Settings */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.2em]">General</h2>
          <div className="bg-surface border border-border-custom/50 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm font-medium">Dark Mode</span>
            <button 
              onClick={onToggleDarkMode}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-accent-primary' : 'bg-border-custom'}`}
            >
              <motion.div 
                animate={{ x: isDarkMode ? 24 : 4 }}
                className="absolute left-0 top-1 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>
        </section>
      </div>

      {/* Add/Edit Distributor Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-surface border border-border-custom rounded-2xl p-6 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{editingDistributor ? 'Edit Distributor' : 'New Distributor'}</h3>
                <button onClick={() => setIsAdding(false)} className="text-text-tertiary hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest px-1">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={16} />
                    <input 
                      type="text" 
                      placeholder="e.g. Southern Glazer's"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 bg-black/20 border border-border-custom rounded-xl pl-10 pr-4 text-sm focus:border-accent-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 space-y-1.5">
                    <label className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest px-1">Initials</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={16} />
                      <input 
                        type="text" 
                        maxLength={3}
                        placeholder="SG"
                        value={initials}
                        onChange={(e) => setInitials(e.target.value)}
                        className="w-full h-12 bg-black/20 border border-border-custom rounded-xl pl-10 pr-4 text-sm focus:border-accent-primary outline-none transition-colors uppercase"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest px-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={16} />
                      <input 
                        type="email" 
                        placeholder="orders@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 bg-black/20 border border-border-custom rounded-xl pl-10 pr-4 text-sm focus:border-accent-primary outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSave}
                disabled={!name || !initials || !email}
                className="btn-primary w-full h-12 disabled:opacity-30"
              >
                {editingDistributor ? 'Update Distributor' : 'Save Distributor'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
