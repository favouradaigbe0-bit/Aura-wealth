import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { 
  Coins, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Sparkles, 
  Percent, 
  Building2,
  Lock,
  Calculator,
  ArrowRight
} from 'lucide-react';

export const CashSweepView: React.FC = () => {
  const { 
    cashBalance, 
    hysaApy, 
    accruedInterest, 
    setIsTransferModalOpen,
    setIsBtcWalletModalOpen,
    orders
  } = useInvestment();

  const [calcInitial, setCalcInitial] = useState<number>(cashBalance || 15000);
  const [calcMonthly, setCalcMonthly] = useState<number>(500);
  const [calcYears, setCalcYears] = useState<number>(5);

  // Future value calculation with monthly compounding
  const calculateCompoundInterest = () => {
    const r = hysaApy / 100 / 12;
    const n = calcYears * 12;
    let total = calcInitial * Math.pow(1 + r, n);
    for (let i = 1; i <= n; i++) {
      total += calcMonthly * Math.pow(1 + r, n - i);
    }
    const totalDeposited = calcInitial + (calcMonthly * n);
    const interestEarned = Math.max(0, total - totalDeposited);
    return {
      finalValue: Math.round(total),
      interestEarned: Math.round(interestEarned),
      totalDeposited: Math.round(totalDeposited)
    };
  };

  const projection = calculateCompoundInterest();

  const cashTransactions = orders.filter(o => o.symbol === 'USD' || o.id.startsWith('dep-crypto') || o.assetName.includes('Deposit') || o.assetName.includes('Withdrawal'));

  return (
    <div className="space-y-6">
      {/* High-Yield Cash Sweep Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-900 border border-cyan-800/40 p-6 backdrop-blur-md relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>High-Yield Cash Sweep Program</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">FDIC Insured to $2.5M • Crypto Gateway</span>
            </div>

            <div className="mt-2 flex items-baseline space-x-3">
              <h1 className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                ${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h1>
              <span className="text-lg font-bold text-cyan-400 font-mono">
                {hysaApy}% APY
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-2 max-w-xl leading-relaxed">
              Uninvested cash is automatically swept into partner program banks earning institutional risk-free interest compounded daily with zero lockups. Fund instantly via Cryptocurrency (USDC, USDT, BTC, ETH, SOL) or Traditional Bank Wire.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => setIsBtcWalletModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm shadow-amber-500/10 active:scale-95"
              title="View dedicated Bitcoin wallet address & QR code"
            >
              <span className="font-mono text-xs font-black">₿</span>
              <span>BTC Address</span>
            </button>
            <button
              onClick={() => setIsTransferModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Coins className="w-4 h-4" />
              <span>Deposit with Crypto</span>
            </button>
            <button
              onClick={() => setIsTransferModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Bank ACH / Wire</span>
            </button>
          </div>
        </div>

        {/* Live compounding ticker row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block">Live Accrued Interest</span>
            <div className="text-lg font-bold text-cyan-300 font-mono mt-1 flex items-center space-x-2">
              <span>+${accruedInterest.toFixed(2)}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Compounding</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block">Estimated Annual Return</span>
            <div className="text-lg font-bold text-white font-mono mt-1">
              +${(cashBalance * (hysaApy / 100)).toFixed(2)} / yr
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block">Regulatory Protection</span>
            <div className="text-sm font-semibold text-emerald-400 mt-1 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>$2,500,000 FDIC Coverage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Compound Growth Simulation Tool */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 backdrop-blur-md">
        <div className="flex items-center space-x-2 mb-4">
          <Calculator className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold text-white">
            High-Yield Cash Compound Wealth Calculator
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sliders */}
          <div className="lg:col-span-2 space-y-5">
            {/* Initial Cash */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-mono">
                <span className="text-slate-400">Initial Deposit</span>
                <span className="text-white font-bold">${calcInitial.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={calcInitial}
                onChange={(e) => setCalcInitial(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Monthly Addition */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-mono">
                <span className="text-slate-400">Monthly Deposit (Auto-Save)</span>
                <span className="text-white font-bold">${calcMonthly.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={calcMonthly}
                onChange={(e) => setCalcMonthly(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Time Horizon */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-mono">
                <span className="text-slate-400">Compounding Horizon</span>
                <span className="text-white font-bold">{calcYears} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={calcYears}
                onChange={(e) => setCalcYears(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Projected Growth Card */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                Projected Balance in {calcYears} Yrs
              </span>
              <div className="text-3xl font-black text-white font-mono mt-1">
                ${projection.finalValue.toLocaleString()}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Total Capital Saved:</span>
                  <span className="text-slate-200">${projection.totalDeposited.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-cyan-400 font-bold">
                  <span>Interest Generated:</span>
                  <span>+${projection.interestEarned.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-800/30 text-[11px] text-cyan-200">
              💡 Zero equity market risk with complete liquidity anytime.
            </div>
          </div>
        </div>
      </div>

      {/* Cash Transfer History */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 backdrop-blur-md">
        <h3 className="text-sm font-bold text-white mb-3">Cash Activity & Transfers</h3>
        {cashTransactions.length === 0 ? (
          <p className="text-xs text-slate-500 font-mono py-4 text-center">No cash deposits or withdrawals recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {cashTransactions.map(tx => (
              <div key={tx.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    tx.side === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tx.side === 'BUY' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{tx.assetName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{tx.timestamp}</div>
                  </div>
                </div>

                <div className={`font-mono font-bold ${tx.side === 'BUY' ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {tx.side === 'BUY' ? '+' : '-'}${tx.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
