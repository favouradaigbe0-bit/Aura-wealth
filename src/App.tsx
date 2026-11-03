/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { InvestmentProvider, useInvestment } from './context/InvestmentContext';
import { Navbar } from './components/Navbar';
import { NavigationTabs } from './components/NavigationTabs';
import { PortfolioOverview } from './components/PortfolioOverview';
import { HoldingsTable } from './components/HoldingsTable';
import { MarketExplore } from './components/MarketExplore';
import { CashSweepView } from './components/CashSweepView';
import { GoalsAndDCAView } from './components/GoalsAndDCAView';
import { OrderHistoryView } from './components/OrderHistoryView';
import { TradeModal } from './components/TradeModal';
import { AssetDetailModal } from './components/AssetDetailModal';
import { CashTransferModal } from './components/CashTransferModal';
import { BitcoinWalletModal } from './components/BitcoinWalletModal';
import { PortfolioAuditModal } from './components/PortfolioAuditModal';
import { AICopilotDrawer } from './components/AICopilotDrawer';
import { AdminPortal } from './components/AdminPortal';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { InteractiveToast } from './components/InteractiveToast';
import { NewMemberModal } from './components/NewMemberModal';
import { LiveActivityBar } from './components/LiveActivityBar';
import { LoanApplicationModal } from './components/LoanApplicationModal';
import { InquiryModal } from './components/InquiryModal';
import { LegalModal } from './components/LegalModal';
import { ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

const AppContent: React.FC = () => {
  const { viewMode, activeTab } = useInvestment();

  // If in landing page mode, render public presence
  if (viewMode === 'landing') {
    return (
      <>
        <LandingPage />
        <AdminPortal />
        <BitcoinWalletModal />
        <AuthModal />
        <LoanApplicationModal />
        <InquiryModal />
        <LegalModal />
        <NewMemberModal />
        <InteractiveToast />
      </>
    );
  }

  // Active Trading Terminal Dashboard
  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Navbar />

      {/* Real-time Streaming Community & Compliance Activity Bar */}
      <LiveActivityBar />

      {/* Segmented Navigation */}
      <NavigationTabs />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <PortfolioOverview />
            <HoldingsTable />
          </div>
        )}

        {activeTab === 'explore' && <MarketExplore />}

        {activeTab === 'goals' && <GoalsAndDCAView />}

        {activeTab === 'cash' && <CashSweepView />}

        {activeTab === 'history' && <OrderHistoryView />}
      </main>

      {/* Modals & Drawers */}
      <TradeModal />
      <AssetDetailModal />
      <CashTransferModal />
      <BitcoinWalletModal />
      <PortfolioAuditModal />
      <AICopilotDrawer />
      <AdminPortal />
      <AuthModal />
      <LoanApplicationModal />
      <InquiryModal />
      <LegalModal />
      <NewMemberModal />
      <InteractiveToast />

      {/* Institutional Platform Footer */}
      <footer className="border-t border-slate-800/80 bg-[#040813] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-md bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <span className="font-serif font-black text-amber-400 text-[10px]">AET</span>
            </div>
            <span className="font-bold text-slate-300">AETWEALTHCAPITAL Institutional</span>
            <span>•</span>
            <span>Fiduciary wealth management, multi-asset trading, and segregated digital custody.</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>FDIC Cash Sweep ($2.5M)</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Gemini Quantitative Neural Engine</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <InvestmentProvider>
      <AppContent />
    </InvestmentProvider>
  );
}
