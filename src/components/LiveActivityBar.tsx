import React from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { Activity, ShieldCheck, TrendingUp, Users, ShieldAlert, ArrowRight } from 'lucide-react';

export const LiveActivityBar: React.FC = () => {
  const { activityFeed, setIsAdminModalOpen, pendingApprovalsCount } = useInvestment();

  return (
    <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-2 text-xs backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Label */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 hidden sm:inline">
            Live Platform Feed:
          </span>
        </div>

        {/* Scrolling Ticker of real-time events */}
        <div className="flex-1 overflow-x-auto scrollbar-none flex items-center space-x-6 text-[11px]">
          {activityFeed.slice(0, 4).map((item) => (
            <div key={item.id} className="flex items-center space-x-1.5 whitespace-nowrap shrink-0 text-slate-300">
              <span className={`px-1.5 py-0.2 rounded font-mono font-semibold text-[10px] ${item.badgeColor || 'text-slate-400 bg-slate-800'}`}>
                {item.type === 'NEW_MEMBER' ? 'Member' : item.type === 'TRADE_PENDING' ? 'Pre-Trade' : item.type === 'TRADE_APPROVED' ? 'Approved' : 'Deposit'}
              </span>
              <span className="text-white font-medium">{item.title}:</span>
              <span className="text-slate-400 truncate max-w-xs">{item.description}</span>
              <span className="text-slate-600 font-mono text-[10px]">({item.timeAgo})</span>
            </div>
          ))}
        </div>

        {/* Right Admin Desk Prompt if orders are pending */}
        {pendingApprovalsCount > 0 ? (
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="shrink-0 flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-bold cursor-pointer transition-colors"
          >
            <ShieldAlert className="w-3 h-3 text-amber-400 animate-pulse" />
            <span>{pendingApprovalsCount} Trade{pendingApprovalsCount > 1 ? 's' : ''} Need Approval →</span>
          </button>
        ) : (
          <div className="hidden md:flex items-center space-x-1 text-[11px] font-mono text-emerald-400 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Desk Surveillance Active</span>
          </div>
        )}
      </div>
    </div>
  );
};
