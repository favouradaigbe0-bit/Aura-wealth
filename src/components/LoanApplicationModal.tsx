import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { X, CreditCard, ShieldCheck, Lock, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoanApplicationModal: React.FC = () => {
  const { isLoanModalOpen, setIsLoanModalOpen, applyForLoan, currentUser } = useInvestment();

  const [amount, setAmount] = useState<number>(25000);
  const [purpose, setPurpose] = useState<string>('Portfolio Margin & Liquidity Buffer');
  const [durationMonths, setDurationMonths] = useState<number>(12);
  
  // Credit Card Guarantee details
  const [cardholderName, setCardholderName] = useState<string>(currentUser?.name || '');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [billingZip, setBillingZip] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isLoanModalOpen) return null;

  // Rate & Monthly estimation
  const interestRate = amount >= 50000 ? 5.8 : 6.4;
  const totalInterest = (amount * (interestRate / 100) * (durationMonths / 12));
  const estimatedMonthly = Math.round((amount + totalInterest) / durationMonths);

  const formatCardNumber = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    return raw.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 2) {
      return `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    return raw;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanCard = cardNumber.replace(/\s+/g, '');
    if (cleanCard.length < 15) {
      setErrorMsg('Please enter a valid 15 or 16-digit credit card number.');
      return;
    }
    if (!expiry || expiry.length < 5) {
      setErrorMsg('Please enter a valid expiry date (MM/YY).');
      return;
    }
    if (!cvv || cvv.length < 3) {
      setErrorMsg('Please enter a valid CVV security code.');
      return;
    }
    if (!billingZip) {
      setErrorMsg('Please provide your billing postal/zip code.');
      return;
    }
    if (!agreedToTerms) {
      setErrorMsg('You must authorize the credit card collateral agreement.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      applyForLoan({
        amount,
        purpose,
        durationMonths,
        creditCard: {
          cardNumber: cleanCard,
          cardholderName,
          expiry,
          cvv,
          billingZip
        }
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={() => setIsLoanModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-white">
              Institutional Credit Facility Application
            </h2>
            <p className="text-xs text-slate-400">
              Submit loan request with credit card guarantee for Administrator Underwriting
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <label className="text-slate-300 font-medium">Requested Facility Amount</label>
              <span className="font-mono font-bold text-amber-400 text-sm">${amount.toLocaleString()} USD</span>
            </div>
            <input
              type="range"
              min="1000"
              max="250000"
              step="1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>$1,000</span>
              <span>$50,000</span>
              <span>$250,000 Max</span>
            </div>
          </div>

          {/* Purpose & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Facility Purpose</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Portfolio Margin & Liquidity Buffer">Portfolio Margin / Liquidity</option>
                <option value="Real Estate Bridge Capital">Real Estate Bridge Capital</option>
                <option value="Corporate Working Capital">Corporate Working Capital</option>
                <option value="Strategic Market Opportunity">Strategic Market Opportunity</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Repayment Term</label>
              <select
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              >
                <option value={6}>6 Months (Fixed {interestRate}% APR)</option>
                <option value={12}>12 Months (Fixed {interestRate}% APR)</option>
                <option value={24}>24 Months (Fixed {interestRate}% APR)</option>
                <option value={36}>36 Months (Fixed {interestRate}% APR)</option>
              </select>
            </div>
          </div>

          {/* Facility Calculation Summary */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[10px] text-slate-400">Fixed Rate</div>
              <div className="font-mono font-bold text-amber-400 mt-0.5">{interestRate}% p.a.</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Est. Monthly</div>
              <div className="font-mono font-bold text-white mt-0.5">${estimatedMonthly.toLocaleString()}/mo</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Admin Clearance</div>
              <div className="font-mono font-bold text-emerald-400 mt-0.5">Required</div>
            </div>
          </div>

          {/* Credit Card Verification Section */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Credit Card Guarantee Submission (Required for Underwriting)</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-4 font-light">
              Per compliance requirements, credit facility underwriting requires a registered credit card as secondary guarantee before administrator approval.
            </p>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Cardholder Full Name</label>
                <input
                  type="text"
                  required
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="e.g. Julian Sterling"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Credit Card Number (16 Digits)</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="4532 •••• •••• 8842"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <CreditCard className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="12/28"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">CVV Code</label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                    placeholder="•••"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Billing Zip</label>
                  <input
                    type="text"
                    required
                    value={billingZip}
                    onChange={(e) => setBillingZip(e.target.value)}
                    placeholder="10005"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono text-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Underwriting Terms Consent */}
          <div className="pt-2">
            <label className="flex items-start space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-[11px] text-slate-400 leading-snug">
                I authorize AETWEALTHCAPITAL Underwriting Desk to register this credit card as secondary collateral and guarantee for this credit facility. I understand loan disbursement is contingent on Administrator & Compliance Desk verification.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-semibold text-xs rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{isSubmitting ? 'Registering Guarantee...' : 'Submit Loan for Admin Underwriting'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
