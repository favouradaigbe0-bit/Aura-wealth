import React, { useState, useMemo } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { Order, OrderSide } from '../types/investment';
import { 
  History, 
  Search, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle,
  Clock,
  XCircle,
  FileSpreadsheet
} from 'lucide-react';

export const OrderHistoryView: React.FC = () => {
  const { orders } = useInvestment();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'BUY' | 'SELL' | 'TRANSFER' | 'CRYPTO'>('ALL');

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = 
        o.symbol.toLowerCase().includes(search.toLowerCase()) ||
        o.assetName.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase());

      let matchesType = true;
      if (selectedFilter === 'BUY') matchesType = o.side === 'BUY' && o.symbol !== 'USD' && !o.id.startsWith('dep-crypto');
      if (selectedFilter === 'SELL') matchesType = o.side === 'SELL' && o.symbol !== 'USD';
      if (selectedFilter === 'TRANSFER') matchesType = o.symbol === 'USD' || o.id.startsWith('dep-crypto') || o.assetName.includes('Deposit');
      if (selectedFilter === 'CRYPTO') matchesType = o.assetClass === 'Crypto' || o.id.startsWith('dep-crypto');

      return matchesSearch && matchesType;
    });
  }, [orders, search, selectedFilter]);

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Timestamp', 'Symbol', 'Asset Name', 'Side', 'Type', 'Shares', 'Price', 'Total Amount', 'Status'];
    const rows = filteredOrders.map(o => [
      o.id,
      `"${o.timestamp}"`,
      o.symbol,
      `"${o.assetName}"`,
      o.side,
      o.orderType,
      o.shares,
      o.price.toFixed(2),
      o.totalAmount.toFixed(2),
      o.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aura_wealth_trade_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 backdrop-blur-md shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Activity Ledger & Tax Statements</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Immutable institutional execution logs, lot-level cost accounting, and tax-loss tracking.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV Statement</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ticker, order ID..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs gap-1">
            {(['ALL', 'BUY', 'SELL', 'TRANSFER', 'CRYPTO'] as const).map(f => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedFilter === f
                    ? 'bg-slate-800 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f === 'ALL' ? 'All Activity' : f === 'TRANSFER' ? 'Cash Transfers' : f === 'CRYPTO' ? '🪙 Crypto Payments' : `${f} Orders`}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="pb-3 pl-2">Timestamp & ID</th>
                <th className="pb-3">Asset</th>
                <th className="pb-3">Action</th>
                <th className="pb-3 text-right">Shares</th>
                <th className="pb-3 text-right">Price</th>
                <th className="pb-3 text-right">Total Amount</th>
                <th className="pb-3 text-center pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 font-mono">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-sans">
                    No transactions match your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => {
                  const isBuy = order.side === 'BUY';
                  const isUSD = order.symbol === 'USD';
                  const isCryptoDeposit = order.id.startsWith('dep-crypto') || order.assetName.includes('Crypto Deposit');

                  return (
                    <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                      {/* Timestamp & ID */}
                      <td className="py-3 pl-2 text-slate-300">
                        <div>{order.timestamp}</div>
                        <div className="text-[10px] text-slate-500 uppercase">{order.id}</div>
                      </td>

                      {/* Asset */}
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-xs">{order.symbol}</span>
                          <span className="text-slate-400 font-sans text-[11px] truncate max-w-[140px] block">
                            {order.assetName}
                          </span>
                        </div>
                      </td>

                      {/* Side & Type */}
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          isCryptoDeposit
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : isUSD
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                            : isBuy
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {isCryptoDeposit ? 'Crypto Deposit' : isUSD ? (isBuy ? 'Deposit' : 'Withdrawal') : `${order.side} ${order.orderType}`}
                        </span>
                      </td>

                      {/* Shares */}
                      <td className="py-3 text-right text-slate-300">
                        {isUSD ? '-' : order.shares < 1 ? order.shares.toFixed(4) : order.shares.toLocaleString()}
                      </td>

                      {/* Price */}
                      <td className="py-3 text-right text-slate-300">
                        {isUSD ? '-' : `$${order.price.toFixed(2)}`}
                      </td>

                      {/* Total Amount */}
                      <td className="py-3 text-right font-bold text-white">
                        ${order.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>

                      {/* Status */}
                      <td className="py-3 text-center pr-2">
                        {order.status === 'PENDING_APPROVAL' ? (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-sans font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full animate-pulse">
                            <Clock className="w-3 h-3" />
                            <span>Pending Review</span>
                          </span>
                        ) : order.status === 'REJECTED' ? (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-sans font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full" title={order.approvalDetails?.rejectionReason}>
                            <XCircle className="w-3 h-3" />
                            <span>Rejected</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-sans font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            <span>Filled</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
