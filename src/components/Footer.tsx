import React from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { ShieldCheck, Lock, Award, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPublicPage, setIsLegalModalOpen, setLegalModalTab, setViewMode } = useInvestment();

  const openLegal = (tab: 'terms' | 'privacy' | 'risk' | 'disclaimer') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const navigateTo = (page: 'home' | 'about' | 'plans' | 'services' | 'markets' | 'contact') => {
    if (page === 'markets') {
      setViewMode('app');
    } else {
      setViewMode('landing');
      setPublicPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#040813] text-slate-400 text-xs font-sans">
      {/* Top Institutional Trust Bar */}
      <div className="border-b border-slate-800/60 bg-[#060b18] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-white">FDIC Cash Sweep & SIPC Custody</div>
                <div className="text-[11px] text-slate-400">Cash insured up to $2.5M across participating program banks.</div>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-white">Segregated Cold Storage Custody</div>
                <div className="text-[11px] text-slate-400">Bitcoin & Ethereum spot custody with zero lending exposure.</div>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-white">Strict Fiduciary Standard</div>
                <div className="text-[11px] text-slate-400">Unbundled fee clarity. No third-party sales commissions.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 p-0.5 shadow-md shadow-amber-500/20">
                <div className="w-full h-full bg-[#060b18] rounded-[6px] flex items-center justify-center">
                  <span className="font-serif font-black text-amber-400 text-xs">AET</span>
                </div>
              </div>
              <span className="font-serif font-bold text-lg text-white tracking-tight">
                AETWEALTHCAPITAL
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-light">
              A premier international wealth management and investment planning firm. Dedicated to capital preservation, disciplined market compounding, and fiduciary excellence across global financial regimes.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div>Global HQ: 100 Wall Street, 28th Fl, New York, NY 10005</div>
              <div>Toll-Free Client Desk: +1 (800) 482-AETW</div>
              <div>Email: contact@aetwealthcapital.com</div>
            </div>
          </div>

          {/* Column: Company Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('plans')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Investment Plans
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Wealth Services
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('markets')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Markets Terminal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Investment Plans */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Investment Mandates
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigateTo('plans')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Beginner Investment ($500+)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('plans')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Growth Investment ($5,000+)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('plans')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Premium Wealth ($50,000+)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('plans')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Long-Term Sovereign ($100,000+)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Fiduciary Advisory
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Governance & Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Governance & Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => openLegal('terms')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('privacy')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('risk')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Risk Disclosure
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('disclaimer')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Investment Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Client Support & FAQ
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimers & Audit Notice */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 space-y-3 text-[11px] text-slate-400 leading-relaxed font-light">
          <p>
            <strong className="text-slate-300">Regulatory & Investment Disclaimer:</strong> AETWEALTHCAPITAL provides institutional wealth management and investment advisory services. Past market performance is no guarantee of future returns. Securities and digital assets fluctuate in value, and investments involve the potential loss of principal. We do not provide or guarantee fixed speculative returns.
          </p>
          <p>
            Cash sweep balances are deposited with program banks and eligible for up to $2,500,000 in aggregate FDIC insurance. Digital asset spot custody is secured in cold storage multi-signature architectures. Credit facility disbursements are subject to affirmative underwriting and administrator approval.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs">
            <div>
              &copy; {new Date().getFullYear()} AETWEALTHCAPITAL Management LLC. All rights reserved.
            </div>
            <div className="mt-2 sm:mt-0 flex space-x-4">
              <span className="text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>System Operational · 256-Bit SSL Enforced</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
