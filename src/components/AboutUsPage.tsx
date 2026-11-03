import React from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { LEADERSHIP_TEAM, COMPANY_VALUES } from '../data/mockData';
import { ShieldCheck, Target, Eye, Lock, ArrowRight, Award, CheckCircle2, TrendingUp, Scale, Building2, BookOpen } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { setPublicPage, setIsAuthModalOpen, setAuthModalMode } = useInvestment();

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100">
      {/* Editorial Header / Hero Banner */}
      <section className="relative pt-24 pb-20 border-b border-slate-800/80 bg-gradient-to-b from-[#0a1128] via-[#070d1e] to-[#060b18] overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-3 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
              <span className="w-8 h-px bg-amber-400"></span>
              <span>About AETWEALTHCAPITAL</span>
              <span className="w-8 h-px bg-amber-400"></span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Institutional Rigor. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                Enduring Stewardship.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed font-light">
              Founded on the bedrock of uncompromising fiduciary duty and quantitative risk architecture, AETWEALTHCAPITAL provides institutional wealth management, strategic portfolio governance, and multi-asset capital allocation for forward-thinking individuals, family offices, and corporations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setPublicPage('plans')}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>View Investment Plans</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium rounded-lg transition-all cursor-pointer"
              >
                Open an Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 border-b border-slate-800/80 bg-[#070d1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all relative">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                To engineer mathematically disciplined, resilient wealth strategies that safeguard client purchasing power against inflation, capture global market innovation, and provide transparent fiduciary stewardship without conflict of interest.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-slate-400 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Strict Fiduciary Standard · Client Interests Above All</span>
              </div>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all relative">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">Our Vision</h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                To establish the benchmark in digital wealth governance by seamlessly bridging traditional capital markets with next-generation algorithmic execution and institutional custody solutions—empowering clients to build generational prosperity.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-slate-400 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Decade-Horizon Compounding · Modern Digital Infrastructure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="py-20 border-b border-slate-800/80 bg-[#060b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Strategic Tenets</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
              Our Investment Philosophy
            </h2>
            <p className="mt-4 text-slate-400 text-base">
              We reject market noise, high-frequency speculation, and opaque fee models. Our capital allocation thesis is built upon four immutable tenets proven across decades of market regimes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="text-amber-400 text-lg font-mono font-bold mb-3">01</div>
              <h3 className="text-lg font-semibold text-white mb-2">Evidence-Based Allocation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Portfolios are rooted in Nobel Prize-winning Modern Portfolio Theory, enhanced by empirical macro liquidity and volatility regime detection.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="text-amber-400 text-lg font-mono font-bold mb-3">02</div>
              <h3 className="text-lg font-semibold text-white mb-2">Asymmetric Risk Buffering</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Preserving capital during drawdowns is mathematical priority. We deploy defensive cash sweeps, floating debt, and protective hedging layers.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="text-amber-400 text-lg font-mono font-bold mb-3">03</div>
              <h3 className="text-lg font-semibold text-white mb-2">Systematic Compounding</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated dollar-cost averaging and disciplined dividend reinvestment remove emotional bias and harness exponential compound interest.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="text-amber-400 text-lg font-mono font-bold mb-3">04</div>
              <h3 className="text-lg font-semibold text-white mb-2">Unbiased Custody</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your assets are held in segregated, audited accounts. We do not engage in re-hypothecation or unauthorized lending of client reserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach to Risk & Transparency */}
      <section className="py-20 border-b border-slate-800/80 bg-[#070d1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Fiduciary Architecture</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2 leading-snug">
                Our Commitment to Transparency & Risk Management
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                In an industry historically clouded by opaque commission kickbacks and hidden revenue-sharing, AETWEALTHCAPITAL operates with complete structural clarity.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Unbundled, Transparent Fee Structure</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      No hidden custody surcharges, zero front-load commissions. Every basis point is published upfront and audited monthly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Daily Algorithmic Stress Testing</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Portfolios are tested against 1970s stagflation, 2008 liquidity freezes, and 2020 pandemic shocks to confirm solvency thresholds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Segregated Cold Custody for Digital Assets</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Bitcoin and Ethereum holdings are maintained in multi-signature cold storage vaults, never co-mingled with trading liquidity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Pillar Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0a1128] border border-amber-500/30 shadow-2xl relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-amber-400/80 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                AUDITED GOVERNANCE
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-6">
                Responsible Wealth Stewardship
              </h3>
              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="font-semibold text-white mb-1">Fiduciary Priority</div>
                  <div>All advisors and portfolio directors hold strict fiduciary status, legally requiring recommendations to align solely with client success.</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="font-semibold text-white mb-1">Pre-Trade Compliance Desk</div>
                  <div>Every trade above threshold limits and all institutional loan underwriting requires authorized dual-control approval on our private desk.</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="font-semibold text-white mb-1">Fair & Substantiated Disclosures</div>
                  <div>We do not advertise speculative fixed gains. All historical benchmarks and projected yields reflect independently verifiable macro indices.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team (Editable Placeholders, Honest & Professional) */}
      <section className="py-20 border-b border-slate-800/80 bg-[#060b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Governance</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
              Executive Leadership & Advisory Council
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Our senior committee brings decades of combined experience across institutional asset management, regulatory compliance, and quantitative finance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP_TEAM.map((member, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/20 to-slate-800 border border-amber-500/40 flex items-center justify-center text-amber-300 font-serif font-bold text-xl mb-4">
                    {member.imagePlaceholder}
                  </div>
                  <h3 className="text-base font-bold text-white">{member.name}</h3>
                  <div className="text-amber-400 text-xs font-medium mt-0.5">{member.role}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">{member.credentials}</div>
                  <p className="mt-3 text-xs text-slate-300 leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Authorized Fiduciary</span>
                  <span className="text-emerald-400">● Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Company Values */}
      <section className="py-20 border-b border-slate-800/80 bg-[#070d1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Our Core Standard</span>
            <h2 className="text-3xl font-serif font-bold text-white mt-2">The AETWEALTHCAPITAL Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_VALUES.map((val, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{val.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-[#0a1128] via-[#0f172a] to-[#0a1128]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Ready to Build and Secure Your Financial Legacy?
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl mx-auto font-light">
            Engage with an AETWEALTHCAPITAL portfolio director today or explore our curated investment categories tailored to your timeline.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setPublicPage('plans')}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold rounded-lg shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Explore Investment Plans
            </button>
            <button
              onClick={() => setPublicPage('contact')}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium rounded-lg cursor-pointer"
            >
              Request Advisory Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
