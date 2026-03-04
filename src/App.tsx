import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  LayoutGrid, 
  Settings, 
  Plus, 
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  MapPin,
  LogOut
} from 'lucide-react';
import { AppScreen, Bottle, Location, Distributor } from './types';
import { MOCK_BOTTLES, MOCK_LOCATIONS, MOCK_DISTRIBUTORS } from './constants';

import ManualAdd from './components/ManualAdd';
import CameraScan from './components/CameraScan';
import ReviewGrid from './components/ReviewGrid';
import OrderSummary from './components/OrderSummary';
import Onboarding from './components/Onboarding';
import PenDetection from './components/PenDetection';
import SettingsScreen from './components/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('onboarding');
  const [bottles, setBottles] = useState<Bottle[]>(() => {
    const saved = localStorage.getItem('inventory_bottles');
    return saved ? JSON.parse(saved) : MOCK_BOTTLES;
  });

  const [distributors, setDistributors] = useState<Distributor[]>(() => {
    const saved = localStorage.getItem('inventory_distributors');
    return saved ? JSON.parse(saved) : MOCK_DISTRIBUTORS;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('inventory_dark_mode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('inventory_bottles', JSON.stringify(bottles));
  }, [bottles]);

  useEffect(() => {
    localStorage.setItem('inventory_distributors', JSON.stringify(distributors));
  }, [distributors]);

  useEffect(() => {
    localStorage.setItem('inventory_dark_mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);
  const [locations, setLocations] = useState<Location[]>(MOCK_LOCATIONS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  // Modal states
  const [isManualAddOpen, setIsManualAddOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navigate = (screen: AppScreen) => {
    setCurrentScreen(screen);
    setIsSidebarOpen(false);
  };

  const handleAddBottle = (newBottle: any) => {
    const bottle: Bottle = {
      id: Math.random().toString(36).substr(2, 9),
      name: newBottle.name,
      brand: newBottle.brand,
      category: newBottle.category,
      level: 'Almost Full',
      price: 40,
      parLevel: 4,
      currentStock: 2,
      imageUrl: `https://picsum.photos/seed/${newBottle.name}/200/200`
    };
    setBottles(prev => [bottle, ...prev]);
    setIsManualAddOpen(false);
  };

  const handleUpdateBottle = (id: string, updates: Partial<Bottle>) => {
    setBottles(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={() => navigate('camera')} />;
      case 'camera':
        return (
          <CameraScan 
            onReview={() => navigate('review')} 
            onPenDetect={() => navigate('pen-detection')} 
          />
        );
      case 'pen-detection':
        return <PenDetection onBack={() => navigate('camera')} onComplete={() => navigate('review')} />;
      case 'review':
        return (
          <ReviewGrid 
            bottles={bottles} 
            onGenerateOrder={() => navigate('order-summary')} 
            onAddManual={() => setIsManualAddOpen(true)}
            onUpdateBottle={handleUpdateBottle}
          />
        );
      case 'order-summary':
        return (
          <OrderSummary 
            bottles={bottles} 
            distributors={distributors}
            onUpdateBottle={handleUpdateBottle}
            onRestart={() => navigate('camera')} 
          />
        );
      case 'settings':
        return (
          <SettingsScreen 
            distributors={distributors} 
            setDistributors={setDistributors} 
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
        );
      default:
        return <div className="flex items-center justify-center h-full text-text-tertiary">Screen coming soon...</div>;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-primary-dark text-text-primary">
      {/* Modals */}
      <AnimatePresence>
        {isManualAddOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100]"
          >
            <ManualAdd onClose={() => setIsManualAddOpen(false)} onAdd={handleAddBottle} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Offline Indicator */}
      {isOffline && (
        <div className="absolute top-0 left-0 right-0 z-[100] bg-error px-4 py-1 text-center text-[10px] font-bold uppercase tracking-widest">
          Offline Mode • Changes will sync when online
        </div>
      )}

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 left-0 z-50 w-72 bg-surface border-r border-border-custom p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent-primary rounded flex items-center justify-center font-bold text-white">86</div>
                  <span className="text-xl font-bold tracking-tighter">86'd</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-text-tertiary hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-1 flex-1">
                <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2 px-2">Inventory</p>
                <SidebarItem icon={<Camera size={18} />} label="New Scan" active={currentScreen === 'camera'} onClick={() => navigate('camera')} />
                <SidebarItem icon={<LayoutGrid size={18} />} label="Review & Par" active={currentScreen === 'review'} onClick={() => navigate('review')} />
                
                <div className="pt-6">
                  <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2 px-2">Management</p>
                  <SidebarItem icon={<Settings size={18} />} label="Settings" active={currentScreen === 'settings'} onClick={() => navigate('settings')} />
                </div>
              </div>

              <div className="pt-6 border-t border-border-custom">
                <div className="flex items-center gap-3 px-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-border-custom flex items-center justify-center text-text-secondary">
                    MB
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Main Bar</p>
                    <p className="text-xs text-text-tertiary">m700devops@gmail.com</p>
                  </div>
                </div>
                <button className="w-full flex items-center gap-2 px-2 py-2 text-error text-sm font-medium hover:bg-error/10 rounded-lg transition-colors">
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Layout */}
      <div className="flex flex-col h-full">
        {/* Global Header (Optional, some screens have their own) */}
        {currentScreen !== 'onboarding' && currentScreen !== 'camera' && (
          <header className="h-16 px-4 flex items-center justify-between border-b border-border-custom bg-surface/50 backdrop-blur-md sticky top-0 z-30">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-text-secondary hover:text-white">
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-accent-primary" />
              <span className="text-sm font-medium">Main Bar</span>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              {/* Sync Status */}
              <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
            </div>
          </header>
        )}

        <main className="flex-1 relative overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
        active 
          ? 'bg-accent-primary/10 text-accent-primary' 
          : 'text-text-secondary hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
