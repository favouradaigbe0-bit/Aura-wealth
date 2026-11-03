import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { RecurringPlan, InvestmentGoal, Frequency, GoalCategory, RiskProfile } from '../types/investment';
import { 
  Target, 
  Repeat, 
  Plus, 
  Check, 
  Trash2, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  X
} from 'lucide-react';

export const GoalsAndDCAView: React.FC = () => {
  const { 
    recurringPlans, 
    toggleRecurringPlan, 
    deleteRecurringPlan, 
    addRecurringPlan,
    goals, 
    addGoal,
    assets 
  } = useInvestment();

  const [isDcaModalOpen, setIsDcaModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  // New DCA state
  const [newDcaSymbol, setNewDcaSymbol] = useState('VOO');
  const [newDcaAmount, setNewDcaAmount] = useState('100');
  const [newDcaFrequency, setNewDcaFrequency] = useState<Frequency>('Weekly');

  // New Goal state
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('50000');
  const [newGoalYear, setNewGoalYear] = useState('2030');
  const [newGoalCategory, setNewGoalCategory] = useState<GoalCategory>('Wealth Creation');
  const [newGoalMonthly, setNewGoalMonthly] = useState('500');
  const [newGoalRisk, setNewGoalRisk] = useState<RiskProfile>('Moderate');

  const handleCreateDca = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = assets.find(a => a.symbol === newDcaSymbol);
    if (!asset) return;

    addRecurringPlan({
      symbol: newDcaSymbol,
      assetName: asset.name,
      amount: parseFloat(newDcaAmount) || 50,
      frequency: newDcaFrequency
    });

    setIsDcaModalOpen(false);
    setNewDcaAmount('100');
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const colors = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addGoal({
      title: newGoalTitle,
      targetAmount: parseFloat(newGoalTarget) || 25000,
      targetYear: parseInt(newGoalYear) || 2030,
      category: newGoalCategory,
      monthlyContribution: parseFloat(newGoalMonthly) || 250,
      riskProfile: newGoalRisk,
      color: randomColor
    });

    setIsGoalModalOpen(false);
    setNewGoalTitle('');
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: Dollar-Cost Averaging (DCA) Rules */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Repeat className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Automated Recurring Investments (DCA)</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Disciplined algorithmic accumulation. Neutralizes market timing risk through automated recurring purchases.
            </p>
          </div>

          <button
            onClick={() => setIsDcaModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Auto-Invest Plan</span>
          </button>
        </div>

        {/* DCA List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recurringPlans.map((plan) => (
            <div
              key={plan.id}
              className={`p-4 rounded-xl border transition-all ${
                plan.active
                  ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/30 border-slate-900 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-white">
                    {plan.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <span className="font-mono font-bold text-sm text-white block">{plan.symbol}</span>
                    <span className="text-[11px] text-slate-400 truncate max-w-[130px] block">{plan.assetName}</span>
                  </div>
                </div>

                {/* Status Toggle */}
                <button
                  onClick={() => toggleRecurringPlan(plan.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                    plan.active
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {plan.active ? 'Active' : 'Paused'}
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-baseline justify-between font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Frequency & Cadence</span>
                  <span className="text-xs font-semibold text-slate-200 mt-0.5 block">{plan.frequency}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase block">Recurring Amount</span>
                  <span className="text-base font-black text-emerald-400 block">${plan.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/50">
                <span className="truncate">{plan.nextExecution}</span>
                <button
                  onClick={() => deleteRecurringPlan(plan.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                  title="Remove Plan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Wealth Goals & Milestones */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Target Wealth Goals & Horizons</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Track progress toward major life milestones with compound interest runway analysis.
            </p>
          </div>

          <button
            onClick={() => setIsGoalModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition-all flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add New Goal</span>
          </button>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {goals.map((goal) => {
            const pct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));

            return (
              <div key={goal.id} className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {goal.category}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Target {goal.targetYear}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-2.5 line-clamp-1">{goal.title}</h3>

                  <div className="mt-4 flex items-baseline justify-between font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Accumulated</span>
                      <span className="text-lg font-black text-white">${goal.currentAmount.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase">Target Goal</span>
                      <span className="text-sm font-bold text-slate-300">${goal.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span>{pct}% funded</span>
                      <span>${(goal.targetAmount - goal.currentAmount).toLocaleString()} remaining</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${pct}%`, backgroundColor: goal.color }}
                        className="h-full rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Contrib: <strong className="text-white">${goal.monthlyContribution}/mo</strong></span>
                  <span className="text-[11px] text-emerald-400 font-sans font-medium">{goal.riskProfile} Allocation</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL: New DCA Auto-Invest Plan */}
      {isDcaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Repeat className="w-4 h-4 text-emerald-400" />
                <span>Create Auto-Invest Plan</span>
              </h3>
              <button onClick={() => setIsDcaModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDca} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Select Asset</label>
                <select
                  value={newDcaSymbol}
                  onChange={(e) => setNewDcaSymbol(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                >
                  {assets.map(a => (
                    <option key={a.id} value={a.symbol}>{a.symbol} — {a.name} (${a.price.toFixed(2)})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Recurring Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono font-bold">$</span>
                  <input
                    type="number"
                    min="10"
                    step="5"
                    value={newDcaAmount}
                    onChange={(e) => setNewDcaAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-white font-mono font-bold text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Frequency</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['Daily', 'Weekly', 'Bi-Weekly', 'Monthly'] as Frequency[]).map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setNewDcaFrequency(f)}
                      className={`py-2 rounded-xl text-center font-mono transition-all cursor-pointer ${
                        newDcaFrequency === f ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 active:scale-98 cursor-pointer mt-2"
              >
                Activate Recurring DCA Plan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: New Goal */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <span>Define New Wealth Milestone</span>
              </h3>
              <button onClick={() => setIsGoalModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Milestone Title</label>
                <input
                  type="text"
                  placeholder="e.g. Dream Home Fund, College Savings"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Target Goal ($)</label>
                  <input
                    type="number"
                    value={newGoalTarget}
                    onChange={(e) => setNewGoalTarget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Target Year</label>
                  <input
                    type="number"
                    min="2026"
                    max="2060"
                    value={newGoalYear}
                    onChange={(e) => setNewGoalYear(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Category</label>
                  <select
                    value={newGoalCategory}
                    onChange={(e) => setNewGoalCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="Retirement">Retirement</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Education">Education</option>
                    <option value="Wealth Creation">Wealth Creation</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Monthly Contrib ($)</label>
                  <input
                    type="number"
                    value={newGoalMonthly}
                    onChange={(e) => setNewGoalMonthly(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-cyan-500/20 active:scale-98 cursor-pointer mt-2"
              >
                Track Investment Goal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
