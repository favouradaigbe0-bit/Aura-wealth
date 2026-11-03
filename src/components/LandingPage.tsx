import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { LiveActivityBar } from './LiveActivityBar';
import { AboutUsPage } from './AboutUsPage';
import { InvestmentPlansPage } from './InvestmentPlansPage';
import { ServicesPage } from './ServicesPage';
import { ContactPage } from './ContactPage';
import { 
  TrendingUp, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Wallet, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  Calculator, 
  Globe, 
  Activity, 
  PieChart, 
  Scale, 
  Building2,
  Award,
  Zap,
  Users
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { 
    publicPage, 
    setPublicPage, 
    setViewMode, 
    setIsAuthModalOpen, 
    setAuthModalMode, 
    setIsLoanModalOpen,
    setIsBtcWalletModalOpen,
    investmentPlans,
    wealthServices,
    cryptoAddresses,
    hysaApy
  } = useInvestment();

  // Route subpages if user selected another page
  if (publicPage === 'about') {
    return (
      <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans">
        <Navbar />
        <LiveActivityBar />
        <AboutUsPage />
        <Footer />
      </div>
    );
  }

  if (publicPage === 'plans') {
    return (
      <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans">
        <Navbar />
        <LiveActivityBar />
        <InvestmentPlansPage />
        <Footer />
      </div>
    );
  }

  if (publicPage === 'services') {
    return (
      <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans">
        <Navbar />
        <LiveActivityBar />
        <ServicesPage />
        <Footer />
      </div>
    );
  }

  if (publicPage === 'contact') {
    return (
      <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans">
        <Navbar />
        <LiveActivityBar />
        <ContactPage />
        <Footer />
      </div>
    );
  }

  // --- HOMEPAGE VIEW ---
  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Real-Time Activity & Compliance Bar */}
      <LiveActivityBar />

      {/* 3. HERO SECTION */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#0a1128] via-[#070d1e] to-[#060b18]">
        {/* Subtle Luxury Grid Ambient Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px]"></div>
        <div className="absolute -top-40 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Premier Institutional Wealth Management</span>
              </div>

              {/* Exact user headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                Building Wealth. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                  Securing Your Financial Future.
                </span>
              </h1>

              {/* Exact user supporting text */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl">
                Discover a smarter approach to wealth management and investment planning with AETWEALTHCAPITAL. Explore financial opportunities with clear information, responsible strategies, and professional guidance.
              </p>

              {/* Exact user dual prominent buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => setPublicPage('services')}
                  className="px-7 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm rounded-xl shadow-xl shadow-amber-500/20 transition-all flex items-center space-x-2.5 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <span>Explore Investment Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setAuthModalMode('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-7 py-4 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-sm rounded-xl transition-all cursor-pointer"
                >
                  Create an Account
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap gap-6 text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Strict Fiduciary Standard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Cold Custody for Spot BTC/ETH</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>Up to $2.5M Multi-Bank FDIC</span>
                </div>
              </div>
            </div>

            {/* Right Financial Illustration & Live Performance Card */}
            <div className="lg:col-span-5 relative">
              <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a1128] to-slate-950 border border-slate-700/80 shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                      Multi-Asset Allocation
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                      AET Global Growth Mandate
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                      +11.8% Benchmark Ref.
                    </span>
                  </div>
                </div>

                {/* Illustrated Performance Metric Visualization */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-6 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Portfolio Net Assets:</span>
                    <span className="font-mono font-bold text-white text-sm">$142,890.00 USD</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Liquid Cash Sweep:</span>
                    <span className="font-mono text-amber-400 font-semibold">$14,250.00 (4.85% APY)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Spot Cold Custody:</span>
                    <span className="font-mono text-cyan-400 font-semibold">1.45 BTC · 12.8 ETH</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Credit Facility Line:</span>
                    <span className="font-mono text-slate-300 font-semibold">$50,000 Available</span>
                  </div>
                </div>

                {/* Allocation Progress Bars */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>US & Global Equities (VOO, NVDA, AAPL)</span>
                    <span className="font-mono text-white">58%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden flex">
                    <div className="bg-amber-500 h-full w-[58%]"></div>
                    <div className="bg-blue-500 h-full w-[22%]"></div>
                    <div className="bg-cyan-500 h-full w-[12%]"></div>
                    <div className="bg-emerald-500 h-full w-[8%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Equities 58%</span>
                    <span>Fixed Income 22%</span>
                    <span>Digital Assets 12%</span>
                    <span>Cash 8%</span>
                  </div>
                </div>

                {/* Quick Interactive Terminal CTA */}
                <button
                  onClick={() => setViewMode('app')}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Launch Live Client Terminal Demo</span>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL-TIME MARKET TICKER BAR */}
      <section className="py-4 border-b border-slate-800/80 bg-slate-950 overflow-x-auto text-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between space-x-8 whitespace-nowrap">
          <div className="flex items-center space-x-2 text-slate-400 shrink-0 font-medium text-[11px]">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>GLOBAL MARKETS:</span>
          </div>
          <div className="flex items-center space-x-6 text-[11px] font-mono">
            <span className="flex items-center space-x-1.5">
              <span className="text-slate-400 font-sans">S&P 500</span>
              <span className="text-white font-semibold">5,864.20</span>
              <span className="text-emerald-400">+0.68%</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <span className="text-slate-400 font-sans">NASDAQ</span>
              <span className="text-white font-semibold">18,518.60</span>
              <span className="text-emerald-400">+1.04%</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <span className="text-slate-400 font-sans">Bitcoin (BTC)</span>
              <span className="text-white font-semibold">$94,250.00</span>
              <span className="text-emerald-400">+2.45%</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <span className="text-slate-400 font-sans">Ethereum (ETH)</span>
              <span className="text-white font-semibold">$3,420.50</span>
              <span className="text-emerald-400">+1.82%</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <span className="text-slate-400 font-sans">US 10-Yr Yield</span>
              <span className="text-white font-semibold">4.32%</span>
              <span className="text-amber-400">-0.04</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <span className="text-slate-400 font-sans">Gold (XAU/USD)</span>
              <span className="text-white font-semibold">$2,735.80</span>
              <span className="text-emerald-400">+0.42%</span>
            </span>
          </div>
        </div>
      </section>

      {/* 5. WHY AETWEALTHCAPITAL IS THE BEST (Core Value Pillars) */}
      <section className="py-24 border-b border-slate-800/80 bg-[#070d1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Fiduciary Distinction</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
              Why AETWEALTHCAPITAL Is The Industry Standard
            </h2>
            <p className="mt-3 text-sm text-slate-400 font-light">
              Built on five pillars of excellence that separate institutional fiduciary stewardship from conventional retail brokers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Unbiased Fiduciary</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                We are legally bound to act in your best interests. Zero hidden trade kickbacks or conflict of interest.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Quantitative Rigor</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Nobel Prize Modern Portfolio Theory enhanced by macro liquidity signals and systematic rebalancing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Spot Crypto Custody</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Audited cold storage vaults for Bitcoin and Ethereum with 1:1 backing and verified public address transparency.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Credit Facility</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Access liquidity loans against your wealth without triggering taxable capital gains or market liquidations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Pre-Trade Approval</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Private Compliance Desk safeguards every major allocation, preventing unauthorized account movements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INVESTMENT PLANS SPOTLIGHT */}
      <section className="py-24 border-b border-slate-800/80 bg-[#060b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Strategic Mandates</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
                Customized Investment Plans
              </h2>
              <p className="text-sm text-slate-400 mt-2 font-light">
                Clear minimums, transparent fee disclosures, and independently substantiated return models.
              </p>
            </div>
            <button
              onClick={() => setPublicPage('plans')}
              className="mt-4 md:mt-0 text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <span>View Full Plan Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentPlans.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 rounded-2xl bg-slate-900/50 border flex flex-col justify-between transition-all ${
                  plan.popularBadge
                    ? 'border-amber-500 shadow-xl shadow-amber-500/10'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1">
                    {plan.category}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
                    {plan.description}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Min. Entry:</span>
                      <span className="font-mono font-bold text-white">${plan.minAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="text-slate-300">{plan.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Risk Profile:</span>
                      <span className="text-amber-400 font-medium">{plan.riskClassification}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setPublicPage('plans')}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Review Terms & Enroll</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SPOT CRYPTO CUSTODY HIGHLIGHT */}
      <section className="py-20 border-b border-slate-800/80 bg-[#070d1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Digital Asset Custody</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-snug">
                Institutional Cold Storage for Bitcoin & Ethereum
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Deposit crypto assets directly into segregated institutional multi-signature cold vaults. Our custody addresses are published and maintained directly by the Compliance Desk with zero re-hypothecation.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-semibold text-amber-400">Bitcoin (BTC) Deposit Address</span>
                    <span className="text-[10px] text-slate-500 font-mono">SegWit · Active</span>
                  </div>
                  <div className="font-mono text-xs text-slate-200 truncate select-all bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
                    {cryptoAddresses.btcAddress}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-semibold text-cyan-400">Ethereum (ETH) Deposit Address</span>
                    <span className="text-[10px] text-slate-500 font-mono">ERC-20 · Active</span>
                  </div>
                  <div className="font-mono text-xs text-slate-200 truncate select-all bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
                    {cryptoAddresses.ethAddress}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex space-x-3">
                <button
                  onClick={() => setIsBtcWalletModalOpen(true)}
                  className="px-5 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>View All Spot Custody QR Codes</span>
                </button>
              </div>
            </div>

            {/* Credit Facility & Underwriting Highlight */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
              <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Liquidity Solutions</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1 mb-3">
                Institutional Credit Facility
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light mb-6">
                Borrow up to $250,000 at competitive fixed rates without selling your appreciating assets. Submit credit card verification info for automated collateral registration and admin clearance.
              </p>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Available Credit Limits:</span>
                  <span className="font-mono text-white font-semibold">$1,000 – $250,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Interest Rates:</span>
                  <span className="font-mono text-amber-400 font-semibold">From 5.8% Fixed APR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Underwriting Requirement:</span>
                  <span className="text-emerald-400 font-medium">Credit Card Guarantee</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Approval Desk:</span>
                  <span className="text-slate-300">Compliance Authorized</span>
                </div>
              </div>

              <button
                onClick={() => setIsLoanModalOpen(true)}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Apply for Credit Facility Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WEALTH SERVICES TEASER (8 Services) */}
      <section className="py-24 border-b border-slate-800/80 bg-[#060b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Holistic Disciplines</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Full Spectrum Wealth Services
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-400 font-light">
              Comprehensive wealth planning delivered by seasoned Chartered Financial Analysts and fiduciary advisors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wealthServices.map((service) => (
              <div
                key={service.id}
                onClick={() => setPublicPage('services')}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/30 transition-all cursor-pointer group"
              >
                <h3 className="text-base font-serif font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
                  {service.tagline}
                </p>
                <div className="text-xs text-amber-400 font-medium flex items-center space-x-1">
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setPublicPage('services')}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              Explore All 8 Wealth Services In Detail
            </button>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM SIGN UP / ENROLLMENT CALLOUT */}
      <section className="py-20 bg-gradient-to-r from-[#0a1128] via-[#0f172a] to-[#0a1128]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Join AETWEALTHCAPITAL</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2 mb-4">
            Begin Your Institutional Wealth Journey Today
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8 font-light">
            Open an account in under 3 minutes, access multi-bank cash sweep yields, and receive dedicated portfolio guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                setAuthModalMode('signup');
                setIsAuthModalOpen(true);
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              Sign Up Now
            </button>
            <button
              onClick={() => setPublicPage('contact')}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-medium text-xs rounded-xl transition-all cursor-pointer"
            >
              Schedule Advisory Consultation
            </button>
          </div>
        </div>
      </section>

      {/* 10. INSTITUTIONAL FOOTER */}
      <Footer />
    </div>
  );
};
