import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { 
  TrendingUp, 
  ShieldCheck, 
  ShieldAlert,
  Wallet,
  Bot,
  CreditCard,
  Menu,
  X,
  Lock,
  ArrowRight,
  User,
  LogOut,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    viewMode,
    setViewMode,
    publicPage,
    setPublicPage,
    totalNetWorth,
    cashBalance,
    accruedInterest, 
    hysaApy, 
    setIsTransferModalOpen,
    setIsAICopilotOpen,
    liveMarketTickerActive,
    setLiveMarketTickerActive,
    isAdminLoggedIn,
    pendingApprovalsCount,
    loanApplications,
    setIsAdminModalOpen,
    isAuthenticated,
    currentUser,
    logoutUser,
    setIsAuthModalOpen,
    setAuthModalMode,
    setIsLoanModalOpen,
    setIsBtcWalletModalOpen,
    setActiveTab
  } = useInvestment();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Total pending items requiring admin action
  const pendingLoansCount = loanApplications.filter(l => l.status === 'PENDING_APPROVAL').length;
  const totalAdminAttentionCount = pendingApprovalsCount + pendingLoansCount;

  const navigateTo = (page: typeof publicPage) => {
    setViewMode('landing');
    setPublicPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openMarketsTerminal = () => {
    setViewMode('app');
    setActiveTab('explore');
    setMobileMenuOpen(false);
  };

  const openDashboard = () => {
    if (!isAuthenticated) {
      setAuthModalMode('signin');
      setIsAuthModalOpen(true);
    } else {
      setViewMode('app');
      setActiveTab('portfolio');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-slate-800/80 bg-[#060b18]/90 backdrop-blur-md sticky top-0 z-40 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo: AETWEALTHCAPITAL */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-[#060b18] rounded-[10px] flex items-center justify-center">
              <span className="font-serif font-black text-amber-400 text-sm tracking-tighter">AET</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                AETWEALTHCAPITAL
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-wider text-amber-400/90 uppercase leading-none mt-0.5">
              Wealth & Investment Management
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium text-slate-300">
          <button
            onClick={() => navigateTo('home')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'landing' && publicPage === 'home'
                ? 'text-amber-400 font-semibold bg-amber-500/10'
                : 'hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('about')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'landing' && publicPage === 'about'
                ? 'text-amber-400 font-semibold bg-amber-500/10'
                : 'hover:text-white hover:bg-slate-900/60'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => navigateTo('plans')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'landing' && publicPage === 'plans'
                ? 'text-amber-400 font-semibold bg-amber-500/10'
                : 'hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Investment Plans
          </button>
          <button
            onClick={() => navigateTo('services')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'landing' && publicPage === 'services'
                ? 'text-amber-400 font-semibold bg-amber-500/10'
                : 'hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Services
          </button>
          <button
            onClick={openMarketsTerminal}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'app'
                ? 'text-amber-400 font-semibold bg-amber-500/10'
                : 'hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Markets
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'landing' && publicPage === 'contact'
                ? 'text-amber-400 font-semibold bg-amber-500/10'
                : 'hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Contact
          </button>

          {/* Quick Loan Facility Button */}
          <button
            onClick={() => setIsLoanModalOpen(true)}
            className="ml-2 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Loan Facility</span>
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Bitcoin / Crypto Spot Address Viewer */}
          <button
            onClick={() => setIsBtcWalletModalOpen(true)}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs text-amber-300 font-medium transition-all cursor-pointer"
            title="View Institutional Bitcoin & Ethereum Spot Custody Addresses"
          >
            <Wallet className="w-3.5 h-3.5 text-amber-400" />
            <span>Spot Custody</span>
          </button>

          {/* Admin Desk Trigger (Maker-Checker / Underwriting) */}
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              isAdminLoggedIn 
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                : totalAdminAttentionCount > 0 
                  ? 'bg-rose-950/30 border-rose-500/40 text-rose-300 hover:bg-rose-950/50' 
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
            }`}
            title="Private Compliance & Trade Approval Desk"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Admin Desk</span>
            {totalAdminAttentionCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold flex items-center justify-center animate-pulse">
                {totalAdminAttentionCount}
              </span>
            )}
          </button>

          {/* Portal Switcher / Auth State */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={openDashboard}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Client Portal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={logoutUser}
                title="Log Out of Session"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setAuthModalMode('signin');
                  setIsAuthModalOpen(true);
                }}
                className="hidden sm:block px-3.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white font-medium hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                Create Account
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#060b18] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <button
              onClick={() => navigateTo('home')}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-200"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-200"
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo('plans')}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-200"
            >
              Investment Plans
            </button>
            <button
              onClick={() => navigateTo('services')}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-200"
            >
              Services
            </button>
            <button
              onClick={openMarketsTerminal}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-200"
            >
              Markets Terminal
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-slate-200"
            >
              Contact
            </button>
          </div>

          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => {
                setIsLoanModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Apply for Institutional Credit Facility</span>
            </button>
            <button
              onClick={() => {
                setIsBtcWalletModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center space-x-2"
            >
              <Wallet className="w-4 h-4 text-amber-400" />
              <span>Spot BTC & ETH Custody Addresses</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
