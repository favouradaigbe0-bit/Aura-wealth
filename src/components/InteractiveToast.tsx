import React from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  X,
  Bell,
  Clock
} from 'lucide-react';

export const InteractiveToast: React.FC = () => {
  const { activeToast, dismissToast, setIsAdminModalOpen } = useInvestment();

  if (!activeToast) return null;

  const isAdminAlert = activeToast.type === 'admin_alert';
  const isApproved = activeToast.type === 'trade_approved';
  const isWelcome = activeToast.type === 'member_welcome';
  const isCrypto = activeToast.type === 'crypto_received' || activeToast.type === 'deposit_received';

  const handleAction = () => {
    if (isAdminAlert) {
      setIsAdminModalOpen(true);
      dismissToast();
    } else {
      dismissToast();
    }
  };

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full animate-bounce-in shadow-2xl">
      <div className={`p-4 rounded-2xl border backdrop-blur-md shadow-2xl relative overflow-hidden ${
        isAdminAlert
          ? 'bg-slate-900/95 border-amber-500/40 text-amber-200 shadow-amber-500/10'
          : isApproved
          ? 'bg-slate-900/95 border-emerald-500/40 text-emerald-200 shadow-emerald-500/10'
          : isCrypto
          ? 'bg-slate-900/95 border-amber-500/40 text-amber-100 shadow-amber-500/15'
          : 'bg-slate-900/95 border-cyan-500/40 text-cyan-200 shadow-cyan-500/10'
      }`}>
        {/* Glow ambient */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 ${
          isAdminAlert ? 'bg-amber-500/15' : isApproved ? 'bg-emerald-500/15' : isCrypto ? 'bg-amber-500/20' : 'bg-cyan-500/15'
        }`} />

        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="flex items-center space-x-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              isAdminAlert
                ? 'bg-amber-500/20 text-amber-400'
                : isApproved
                ? 'bg-emerald-500/20 text-emerald-400'
                : isCrypto
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-cyan-500/20 text-cyan-400'
            }`}>
              {isAdminAlert ? (
                <ShieldAlert className="w-4 h-4 animate-pulse" />
              ) : isApproved ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </div>
            <div>
              <h4 className="text-xs font-bold text-white tracking-tight flex items-center space-x-1">
                <span>{activeToast.title}</span>
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                {activeToast.message}
              </p>
            </div>
          </div>

          <button
            onClick={dismissToast}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Button for Admin review */}
        {isAdminAlert && (
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[10px] font-mono text-amber-400 flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Pending Authorization</span>
            </span>

            <button
              onClick={handleAction}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 active:scale-95 flex items-center space-x-1 cursor-pointer"
            >
              <span>{activeToast.actionText || 'Authorize as Admin'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
