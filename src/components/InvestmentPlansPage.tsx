import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { InvestmentPlan } from '../types/investment';
import { Check, ShieldCheck, ArrowRight, HelpCircle, Calculator, Info, Clock, AlertTriangle, Layers } from 'lucide-react';

export const InvestmentPlansPage: React.FC = () => {
  const { investmentPlans, setSelectedPlanForInquiry, setIsInquiryModalOpen, setIsAuthModalOpen, setAuthModalMode } = useInvestment();

  // Interactive Compound Growth Simulator State
  const [initialCapital, setInitialCapital] = useState<number>(25000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000);
  const [timeHorizonYears, setTimeHorizonYears] = useState<number>(5);
  const [selectedBenchmarkRate, setSelectedBenchmarkRate] = useState<number>(10.5); // 10.5% historical diversified equity benchmark

  // Calculate projected outcome
  const calculateCompoundFuture = () => {
    const monthlyRate = selectedBenchmarkRate / 100 / 12;
    const totalMonths = timeHorizonYears * 12;
    let balance = initialCapital;
    for (let i = 0; i < totalMonths; i++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
    }
    const totalContributions = initialCapital + monthlyContribution * totalMonths;
    const projectedGain = Math.max(0, balance - totalContributions);
    return {
      futureValue: Math.round(balance),
      totalContributions: Math.round(totalContributions),
      projectedGain: Math.round(projectedGain)
    };
  };

  const simulation = calculateCompoundFuture();

  const handleInquirePlan = (plan: InvestmentPlan) => {
    setSelectedPlanForInquiry(plan);
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100">
      {/* Page Header */}
      <section className="relative pt-24 pb-16 border-b border-slate-800/80 bg-gradient-to-b from-[#0a1128] via-[#070d1e] to-[#060b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <span className="w-6 h-px bg-amber-400"></span>
            <span>Disciplined Capital Allocation</span>
            <span className="w-6 h-px bg-amber-400"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Institutional Investment Plans
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-light">
            Engineered across distinct liquidity horizons, risk thresholds, and capital objectives. All plans operate under strict fiduciary custody with unbundled fee transparency.
          </p>

          <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-slate-400">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent Custodian Segregation</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-amber-400" />
              <span>No Fabricated Guaranteed Returns</span>
            </span>
          </div>
        </div>
      </section>

      {/* 4 Investment Plans Grid */}
      <section className="py-20 border-b border-slate-800/80 bg-[#060b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentPlans.map((plan) => {
              const isPopular = plan.popularBadge;
              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl transition-all flex flex-col justify-between relative bg-slate-900/60 border ${
                    isPopular
                      ? 'border-amber-500 shadow-xl shadow-amber-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  } p-6 sm:p-7`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[11px] font-bold tracking-wider uppercase px-3 py-0.5 rounded-full shadow">
                      Most Popular Mandate
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
                      {plan.category}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white mb-2 leading-snug">
                      {plan.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light mb-6">
                      {plan.description}
                    </p>

                    {/* Minimum & Key Metrics */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-6 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Min. Entry Capital:</span>
                        <span className="font-bold text-white font-mono text-sm">${plan.minAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Target Duration:</span>
                        <span className="font-medium text-slate-200">{plan.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Risk Profile:</span>
                        <span className={`font-semibold ${
                          plan.riskClassification === 'Low' ? 'text-emerald-400' :
                          plan.riskClassification === 'Moderate' ? 'text-blue-400' :
                          plan.riskClassification === 'Balanced Growth' ? 'text-amber-400' : 'text-purple-400'
                        }`}>
                          {plan.riskClassification}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                        <span className="text-slate-400">Management Fee:</span>
                        <span className="text-[11px] text-slate-300 text-right font-mono">{plan.applicableFees.split('(')[0]}</span>
                      </div>
                    </div>

                    {/* Benchmark & Expected Return Disclosure */}
                    <div className="mb-6 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300">
                      <div className="flex items-center space-x-1.5 text-amber-400 font-semibold mb-1">
                        <Info className="w-3.5 h-3.5" />
                        <span>Expected Return Context</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-normal font-light">
                        {plan.expectedReturnInfo}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Features Included</div>
                      {plan.highlights.map((h, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Terms */}
                    <div className="text-[11px] text-slate-400 leading-relaxed pt-4 border-t border-slate-800/80 mb-6">
                      <span className="font-semibold text-slate-300">Terms & Liquidity: </span>
                      {plan.terms}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => handleInquirePlan(plan)}
                      className={`w-full py-3 px-4 rounded-lg font-semibold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                        isPopular
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      }`}
                    >
                      <span>Request Plan Details / Enroll</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <div className="text-center text-[10px] text-slate-500">
                      Recommended for: {plan.recommendedFor}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Compound Growth Modeler */}
      <section className="py-20 border-b border-slate-800/80 bg-[#070d1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Calculator className="w-4 h-4" />
              <span>Capital Planning Tool</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">
              Model Your Long-Term Compounding Potential
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Simulate prospective capital accumulation based on initial deployment, recurring contributions, and historical asset class benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              {/* Initial Capital Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-slate-300 font-medium">Initial Capital Deployment</span>
                  <span className="text-amber-400 font-mono font-bold text-sm">${initialCapital.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="250000"
                  step="500"
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>$500 (Beginner)</span>
                  <span>$50,000 (Premium)</span>
                  <span>$250,000+ (Institutional)</span>
                </div>
              </div>

              {/* Monthly Contribution Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-slate-300 font-medium">Monthly Systematic Contribution (DCA)</span>
                  <span className="text-amber-400 font-mono font-bold text-sm">${monthlyContribution.toLocaleString()}/mo</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Time Horizon */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-slate-300 font-medium">Investment Horizon</span>
                  <span className="text-white font-mono font-bold">{timeHorizonYears} Years</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 5, 10].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setTimeHorizonYears(yr)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        timeHorizonYears === yr
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {yr} {yr === 1 ? 'Year' : 'Years'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Benchmark Reference */}
              <div>
                <span className="text-xs text-slate-300 font-medium block mb-2">Historical Benchmark Index Reference</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Treasury / Cash (5.0%)', rate: 5.0 },
                    { label: 'Balanced (8.5%)', rate: 8.5 },
                    { label: 'Global Growth (11.0%)', rate: 11.0 }
                  ].map((bench) => (
                    <button
                      key={bench.rate}
                      onClick={() => setSelectedBenchmarkRate(bench.rate)}
                      className={`p-2 text-[11px] font-medium rounded-lg border text-center transition-all cursor-pointer ${
                        selectedBenchmarkRate === bench.rate
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {bench.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-6 p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a1128] to-slate-950 border border-amber-500/30 shadow-2xl">
              <div className="text-xs uppercase font-mono tracking-wider text-amber-400 mb-2">
                Simulated Outcome ({timeHorizonYears} Years @ {selectedBenchmarkRate}% p.a.)
              </div>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-white mb-6">
                ${simulation.futureValue.toLocaleString()}
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Capital Contributed:</span>
                  <span className="font-mono text-slate-200 font-semibold">${simulation.totalContributions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Compound Growth Component:</span>
                  <span className="font-mono text-emerald-400 font-bold">+${simulation.projectedGain.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Fiduciary Fee Drag:</span>
                  <span className="font-mono text-slate-400">0.25% – 0.65% (Already modeled)</span>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
                <div className="flex items-center space-x-1.5 text-amber-400 font-semibold mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Important Regulatory & Investment Disclaimer</span>
                </div>
                Simulations are provided solely for educational and illustrative modeling. Past performance and index benchmarks do not guarantee future returns. Actual performance will fluctuate with global market volatility.
              </div>

              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="mt-6 w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                Open an Account & Deploy Capital
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Feature Comparison Table */}
      <section className="py-20 border-b border-slate-800/80 bg-[#060b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Direct Matrix</span>
            <h2 className="text-3xl font-serif font-bold text-white mt-1">Plan Specification Comparison</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900/90 text-slate-300 font-semibold border-b border-slate-800 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-4 px-6">Specification</th>
                  <th className="py-4 px-4 text-center">Beginner Investment</th>
                  <th className="py-4 px-4 text-center bg-amber-500/5 text-amber-300 border-x border-amber-500/20">Growth Investment</th>
                  <th className="py-4 px-4 text-center">Premium Wealth</th>
                  <th className="py-4 px-4 text-center">Long-Term Sovereign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 text-slate-300">
                <tr>
                  <td className="py-3.5 px-6 font-medium text-white">Minimum Capital</td>
                  <td className="py-3.5 px-4 text-center font-mono">$500</td>
                  <td className="py-3.5 px-4 text-center font-mono bg-amber-500/5 font-semibold text-amber-300 border-x border-amber-500/20">$5,000</td>
                  <td className="py-3.5 px-4 text-center font-mono">$50,000</td>
                  <td className="py-3.5 px-4 text-center font-mono">$100,000</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-white">Advisory Level</td>
                  <td className="py-3.5 px-4 text-center">Automated / Digital</td>
                  <td className="py-3.5 px-4 text-center bg-amber-500/5 border-x border-amber-500/20">Robo + Quarterly Review</td>
                  <td className="py-3.5 px-4 text-center">Dedicated CFA Director</td>
                  <td className="py-3.5 px-4 text-center">Private Advisory Council</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-white">Liquidity Window</td>
                  <td className="py-3.5 px-4 text-center">Daily (after 30 days)</td>
                  <td className="py-3.5 px-4 text-center bg-amber-500/5 border-x border-amber-500/20">Quarterly Rebalancing</td>
                  <td className="py-3.5 px-4 text-center">Monthly Redemption</td>
                  <td className="py-3.5 px-4 text-center">Annual Institutional Window</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-white">Digital Asset (Crypto) Custody</td>
                  <td className="py-3.5 px-4 text-center text-slate-500">—</td>
                  <td className="py-3.5 px-4 text-center bg-amber-500/5 text-emerald-400 border-x border-amber-500/20">Spot BTC/ETH (Optional)</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">Segregated Cold Storage</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">Multi-Sig Cold Custody</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-white">Credit Facility / Margin Loan Eligibility</td>
                  <td className="py-3.5 px-4 text-center text-slate-500">—</td>
                  <td className="py-3.5 px-4 text-center bg-amber-500/5 text-slate-300 border-x border-amber-500/20">Up to $25,000 (Card Collateral)</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">Up to $100,000</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">Bespoke Institutional Credit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
