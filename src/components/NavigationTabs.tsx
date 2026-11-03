import React from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { 
  PieChart, 
  TrendingUp, 
  Target, 
  ShieldAlert, 
  Coins, 
  History,
  Sparkles
} from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export const NavigationTabs: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsAuditModalOpen, 
    pendingApprovalsCount,
    setIsAdminModalOpen 
  } = useInvestment();

  const tabs: TabItem[] = [
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'explore', label: 'Markets & Discovery', icon: TrendingUp },
    { id: 'goals', label: 'Goals & DCA Auto-Invest', icon: Target },
    { id: 'cash', label: 'Cash Sweep', icon: Coins, badge: '4.85%', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    { id: 'audit', label: 'AI Risk Audit', icon: ShieldAlert, badge: 'CIO', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { id: 'history', label: 'Activity & Tax Ledger', icon: History },
    { 
      id: 'admin', 
      label: 'Admin Approvals', 
      icon: ShieldAlert, 
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} Review` : 'Admin', 
      badgeColor: pendingApprovalsCount > 0 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold' : 'bg-slate-800 text-slate-400 border-slate-700' 
    }
  ];

  return (
    <div className="border-b border-slate-800/80 bg-slate-900/40 sticky top-16 z-30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2.5 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'audit') {
                    setActiveTab('portfolio');
                    setIsAuditModalOpen(true);
                  } else if (tab.id === 'admin') {
                    setIsAdminModalOpen(true);
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono font-bold leading-none ${tab.badgeColor}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
