import React from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { X, ShieldAlert, FileText, Lock, AlertTriangle } from 'lucide-react';

export const LegalModal: React.FC = () => {
  const { isLegalModalOpen, setIsLegalModalOpen, legalModalTab, setLegalModalTab } = useInvestment();

  if (!isLegalModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col text-slate-100 overflow-hidden">
        {/* Top Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
              Regulatory Disclosures & Legal Framework
            </span>
            <h2 className="text-xl font-serif font-bold text-white mt-0.5">
              AETWEALTHCAPITAL Compliance & Governance
            </h2>
          </div>
          <button
            onClick={() => setIsLegalModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 gap-2 overflow-x-auto text-xs">
          {[
            { id: 'terms', label: 'Terms & Conditions', icon: FileText },
            { id: 'privacy', label: 'Privacy Policy', icon: Lock },
            { id: 'risk', label: 'Risk Disclosure', icon: AlertTriangle },
            { id: 'disclaimer', label: 'Investment Disclaimer', icon: ShieldAlert }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = legalModalTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setLegalModalTab(tab.id as any)}
                className={`py-3 px-4 border-b-2 font-medium flex items-center space-x-2 whitespace-nowrap cursor-pointer transition-colors ${
                  isActive
                    ? 'border-amber-400 text-amber-400 bg-amber-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed font-light">
          {legalModalTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">1. Master Client Agreement & Governance</h3>
              <p>
                By creating an account or accessing the services of AETWEALTHCAPITAL (&quot;the Firm&quot;), you acknowledge and agree to be bound by these Master Terms. The Firm acts under fiduciary standards for discretionary advisory services while non-discretionary brokerage execution remains subject to client confirmation.
              </p>
              <h3 className="text-sm font-bold text-white">2. Dual-Control Trade Authorization</h3>
              <p>
                To maintain institutional market integrity and comply with international anti-money laundering (AML) directives, specific trade orders exceeding risk thresholds, digital asset custody movements, and all institutional credit facilities require affirmative authorization by the Firm&apos;s Compliance Desk prior to exchange execution.
              </p>
              <h3 className="text-sm font-bold text-white">3. Credit Facility & Collateral Covenants</h3>
              <p>
                Borrowers utilizing the Institutional Credit Facility agree to submit verified credit card credentials as secondary recourse collateral. Pre-authorization does not guarantee loan approval; all credit facility disbursements remain subject to underwriter review and identity verification.
              </p>
            </div>
          )}

          {legalModalTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">1. Information We Collect</h3>
              <p>
                AETWEALTHCAPITAL collects information necessary to satisfy Know-Your-Customer (KYC), anti-money laundering regulations, and financial underwriting standards. This includes full legal name, contact email, telephone, country of tax residence, and payment credentials.
              </p>
              <h3 className="text-sm font-bold text-white">2. Encryption & Data Retention</h3>
              <p>
                All sensitive data, including credit card and banking details, are encrypted in transit via TLS 1.3 and stored in partitioned, access-controlled cryptographic databases. Client records are retained in compliance with financial auditing mandates and never monetized or sold to third parties.
              </p>
            </div>
          )}

          {legalModalTab === 'risk' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium text-xs">
                Capital at Risk: Securities, digital assets, and investment strategies carry inherent market risks. Values fluctuate and past performance is not indicative of future returns.
              </div>
              <h3 className="text-sm font-bold text-white">1. Market Volatility & Liquidity</h3>
              <p>
                Investments in equities, exchange-traded funds, bonds, and cryptocurrencies are subject to macroeconomic cycles, interest rate variations, geopolitical events, and market liquidity shortages. Portfolio allocations are constructed to mitigate downside risk, but no strategy can eliminate volatility entirely.
              </p>
              <h3 className="text-sm font-bold text-white">2. Digital Asset Volatility</h3>
              <p>
                Cryptocurrency assets such as Bitcoin (BTC) and Ethereum (ETH) experience elevated price volatility. Although held in audited cold-storage vaults, digital assets are subject to technological and network-level risks beyond the control of the Firm.
              </p>
            </div>
          )}

          {legalModalTab === 'disclaimer' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">1. No Guaranteed Profits or Returns</h3>
              <p>
                AETWEALTHCAPITAL strictly refrains from guaranteeing fixed returns or speculative yields. All expected return benchmarks referenced in investment plans represent historical indices (such as the S&P 500 or US Treasury rates) and are presented solely for illustrative modeling.
              </p>
              <h3 className="text-sm font-bold text-white">2. Custodial Protection & Clearing</h3>
              <p>
                Cash balances swept into participating partner banks are insured by the FDIC up to $2,500,000 in aggregate across institutions. Securities are cleared through registered institutional custodian clearinghouses. Digital asset custody is maintained in cold storage vaults with independent verification logs.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={() => setIsLegalModalOpen(false)}
            className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
