import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { 
  Sparkles, 
  Coins, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  X,
  CheckCircle2,
  Gift
} from 'lucide-react';

export const NewMemberModal: React.FC = () => {
  const { 
    isNewMemberModalOpen, 
    setIsNewMemberModalOpen, 
    claimNewMemberBonus, 
    currentUser 
  } = useInvestment();

  const [selectedReward, setSelectedReward] = useState<'CASH_MATCH' | 'FREE_STOCK_NVDA'>('CASH_MATCH');

  if (!isNewMemberModalOpen) return null;

  const handleClaim = () => {
    claimNewMemberBonus(selectedReward);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden relative p-6 sm:p-8 text-left">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Member Onboarding Package</span>
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
                Welcome to Aura, {currentUser?.name?.split(' ')[0] || 'Investor'}!
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsNewMemberModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Member Protection Notice */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start space-x-2.5 text-xs text-slate-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Your new account is activated with <strong className="text-white">Institutional Maker-Checker Protections</strong>. All initial trades are supervised by the Compliance Desk for best execution and pricing stability.
          </p>
        </div>

        {/* Reward Selection */}
        <div className="mt-5 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Select Your Free Welcome Reward
          </span>

          {/* Option A: Cash Match */}
          <div
            onClick={() => setSelectedReward('CASH_MATCH')}
            className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              selectedReward === 'CASH_MATCH'
                ? 'bg-cyan-950/40 border-cyan-500/60 ring-1 ring-cyan-500/30'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center space-x-1.5">
                  <span>$1,000 Instant Deposit Match</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                    Popular
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Credited directly into your Cash Sweep account compounding at 4.85% APY.
                </p>
              </div>
            </div>

            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
              selectedReward === 'CASH_MATCH' ? 'border-cyan-400 bg-cyan-500' : 'border-slate-600'
            }`}>
              {selectedReward === 'CASH_MATCH' && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />}
            </div>
          </div>

          {/* Option B: Free NVDA Stock */}
          <div
            onClick={() => setSelectedReward('FREE_STOCK_NVDA')}
            className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              selectedReward === 'FREE_STOCK_NVDA'
                ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/30'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center space-x-1.5">
                  <span>1 Free Share of NVIDIA (NVDA)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    ~$138.25
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Instantly added to your active portfolio positions with real-time growth tracking.
                </p>
              </div>
            </div>

            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
              selectedReward === 'FREE_STOCK_NVDA' ? 'border-emerald-400 bg-emerald-500' : 'border-slate-600'
            }`}>
              {selectedReward === 'FREE_STOCK_NVDA' && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />}
            </div>
          </div>
        </div>

        {/* Claim Action */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <button
            onClick={handleClaim}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Claim Welcome Reward & Enter Terminal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
