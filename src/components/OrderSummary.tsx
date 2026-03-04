import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  FileText, 
  Printer, 
  Copy, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  ArrowLeft,
  Truck
} from 'lucide-react';
import { Bottle, OrderItem, Distributor } from '../types';

export default function OrderSummary({ 
  bottles, 
  distributors,
  onUpdateBottle,
  onRestart 
}: { 
  bottles: Bottle[]; 
  distributors: Distributor[];
  onUpdateBottle: (id: string, updates: Partial<Bottle>) => void;
  onRestart: () => void;
}) {
  // Calculate order items based on par levels
  const orderItems: OrderItem[] = bottles
    .map(b => {
      const baseQuantity = Math.max(0, b.parLevel - b.currentStock);
      const extraQuantity = (b.level === 'Half' || b.level === '1/4') ? 1 : 0;
      const totalQuantity = baseQuantity + extraQuantity;
      
      return {
        ...b,
        orderQuantity: totalQuantity
      };
    })
    .filter(b => b.orderQuantity > 0)
    .map(b => ({
      bottleId: b.id,
      name: b.name,
      quantity: b.orderQuantity,
      price: b.price,
      category: b.category,
      urgency: b.orderQuantity > 5 ? 'critical' : 'normal',
      distributorId: b.distributorId
    }));

  if (orderItems.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold mb-2">All Stocked!</h2>
        <p className="text-text-secondary mb-8">Your current inventory matches all par levels. No orders needed right now.</p>
        <button onClick={onRestart} className="btn-primary px-12">Back to Dashboard</button>
      </div>
    );
  }

  // Group items by distributor for the right side
  const groupedByDistributor = distributors.map(dist => ({
    distributor: dist,
    items: orderItems.filter(item => item.distributorId === dist.id)
  })).filter(group => group.items.length > 0);

  const unassignedItems = orderItems.filter(item => !item.distributorId);

  const [isSending, setIsSending] = useState(false);
  const [sentDistributors, setSentDistributors] = useState<string[]>([]);

  const handleSendOrders = () => {
    setIsSending(true);
    // Simulate sending emails to each distributor
    setTimeout(() => {
      setSentDistributors(groupedByDistributor.map(g => g.distributor.id));
      setIsSending(false);
    }, 2000);
  };

  if (sentDistributors.length > 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center bg-primary-dark">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 size={56} className="text-success" />
        </motion.div>
        <h2 className="text-3xl font-bold mb-4">Orders Sent!</h2>
        <div className="space-y-3 mb-10 w-full max-w-xs">
          {groupedByDistributor.map(group => (
            <div key={group.distributor.id} className="flex items-center justify-between p-3 bg-surface border border-border-custom rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary font-bold text-xs">
                  {group.distributor.initials}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold">{group.distributor.name}</p>
                  <p className="text-[9px] text-text-tertiary">{group.distributor.email}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-success uppercase tracking-widest">Sent</span>
            </div>
          ))}
        </div>
        <button onClick={onRestart} className="btn-primary px-12 h-14 w-full max-w-xs">Return to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-primary-dark">
      {/* Header */}
      <div className="px-6 pt-6 pb-6 border-b border-border-custom bg-surface/30 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold tracking-tight">Order Summary</h1>
        </div>
        <div className="flex items-center gap-2 text-text-secondary">
          <span className="text-sm font-medium">{orderItems.length} items to order</span>
          <span className="w-1 h-1 rounded-full bg-border-custom" />
          <span className="text-sm font-medium">Main Bar</span>
        </div>
      </div>

      {/* Main Content Split View */}
      <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row">
        {/* Right Side: Distributor Breakdown (Top on mobile, Right on desktop) */}
        <div className="w-full lg:w-80 bg-black/20 px-6 py-6 space-y-6 order-1 lg:order-2 lg:border-l border-border-custom/30 lg:overflow-y-auto">
          <h3 className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.2em] mb-4">Distributor Breakdown</h3>
          
          {groupedByDistributor.map((group, idx) => (
            <div 
              key={group.distributor.id} 
              className={`rounded-xl p-4 border ${
                idx % 3 === 0 ? 'bg-accent-primary/5 border-accent-primary/20' :
                idx % 3 === 1 ? 'bg-blue-500/5 border-blue-500/20' :
                'bg-emerald-500/5 border-emerald-500/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white">{group.distributor.name}</span>
                <span className="px-2 py-0.5 bg-white/10 rounded text-[9px] font-bold text-text-secondary uppercase">{group.distributor.initials}</span>
              </div>
              <div className="space-y-2">
                {group.items.map(item => (
                  <div key={item.bottleId} className="flex justify-between items-center text-[11px]">
                    <span className="text-text-secondary truncate pr-2">{item.name}</span>
                    <span className="font-mono font-bold text-accent-primary">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {unassignedItems.length > 0 && (
            <div className="rounded-xl p-4 border bg-surface/30 border-border-custom/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-text-tertiary">Unassigned</span>
                <AlertTriangle size={12} className="text-warning" />
              </div>
              <div className="space-y-2">
                {unassignedItems.map(item => (
                  <div key={item.bottleId} className="flex justify-between items-center text-[11px]">
                    <span className="text-text-tertiary truncate pr-2 italic">{item.name}</span>
                    <span className="font-mono font-bold text-text-tertiary">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Left Side: Category View & Selection (Bottom on mobile, Left on desktop) */}
        <div className="flex-1 px-6 py-6 space-y-8 order-2 lg:order-1 lg:overflow-y-auto">
          {['Spirits', 'Beer', 'Wine', 'Other'].map(cat => {
            const catItems = orderItems.filter(i => i.category === cat);
            if (catItems.length === 0) return null;

            return (
              <div key={cat} className="space-y-3">
                <h3 className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.2em] mb-4">{cat}</h3>
                {catItems.map(item => (
                  <OrderItemRow 
                    key={item.bottleId} 
                    item={item} 
                    distributors={distributors}
                    onSelectDistributor={(distId) => onUpdateBottle(item.bottleId, { distributorId: distId })}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-surface border-t border-border-custom z-20 safe-area-bottom">
        <div className="flex gap-3 mb-4 overflow-x-auto pb-2 no-scrollbar">
          <ExportButton icon={<Mail size={20} />} label="Email All" />
          <ExportButton icon={<FileText size={20} />} label="PDF" />
          <ExportButton icon={<Printer size={20} />} label="Print" />
          <ExportButton icon={<Copy size={20} />} label="Copy" />
        </div>
        <button 
          onClick={handleSendOrders}
          disabled={isSending || unassignedItems.length > 0}
          className="btn-primary w-full shadow-[0_8px_24px_rgba(255,107,53,0.3)] disabled:opacity-50 disabled:grayscale"
        >
          {isSending ? 'Sending Emails...' : unassignedItems.length > 0 ? 'Assign All Distributors' : 'Confirm & Email Distributors'}
          {!isSending && <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
}

const OrderItemRow: React.FC<{ 
  item: OrderItem; 
  distributors: Distributor[];
  onSelectDistributor: (id: string) => void;
}> = ({ 
  item, 
  distributors, 
  onSelectDistributor 
}) => {
  const selectedDist = distributors.find(d => d.id === item.distributorId);

  return (
    <div className="relative overflow-hidden rounded-xl bg-surface border border-border-custom/50">
      {/* Distributor Selection Overlay (Horizontal Scroll) */}
      <div className="flex items-center gap-2 p-2 bg-black/20 border-b border-border-custom/30 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 px-2 text-[9px] font-bold text-text-tertiary uppercase tracking-widest shrink-0">
          <Truck size={10} />
          Distributor:
        </div>
        {distributors.map(dist => (
          <button
            key={dist.id}
            onClick={() => onSelectDistributor(dist.id)}
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all shrink-0 ${
              item.distributorId === dist.id
                ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20'
                : 'bg-white/5 text-text-tertiary hover:bg-white/10 hover:text-white'
            }`}
          >
            {dist.initials}
          </button>
        ))}
      </div>

      <div className="p-4 flex items-center justify-between group">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold truncate">{item.name}</h4>
            <div className="flex items-center gap-4 mt-1">
              {selectedDist && (
                <p className="text-[10px] text-accent-primary font-bold uppercase tracking-widest shrink-0">{selectedDist.initials}</p>
              )}
              <span className="text-lg font-mono font-bold text-accent-primary">x{item.quantity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExportButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 min-w-[72px] h-[72px] bg-surface border border-border-custom rounded-xl text-text-secondary hover:text-white hover:border-text-tertiary transition-all active:scale-95">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
