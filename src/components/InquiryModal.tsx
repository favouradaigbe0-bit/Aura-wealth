import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { X, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const { isInquiryModalOpen, setIsInquiryModalOpen, selectedPlanForInquiry, submitInquiry, currentUser } = useInvestment();

  const [fullName, setFullName] = useState<string>(currentUser?.name || '');
  const [email, setEmail] = useState<string>(currentUser?.email || '');
  const [phone, setPhone] = useState<string>('');
  const [intendedAmount, setIntendedAmount] = useState<number>(selectedPlanForInquiry?.minAmount || 25000);
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isInquiryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitInquiry({
        planId: selectedPlanForInquiry?.id,
        planName: selectedPlanForInquiry?.title || 'Custom Wealth Mandate',
        clientName: fullName,
        email,
        phone,
        intendedAmount: Number(intendedAmount) || 25000,
        message: message || `Client expressed interest in ${selectedPlanForInquiry?.title || 'wealth planning'}.`
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100">
        <button
          onClick={() => setIsInquiryModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
            Advisory Consultation Request
          </span>
          <h2 className="text-xl font-serif font-bold text-white mt-1">
            {selectedPlanForInquiry?.title || 'Investment Plan Consultation'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Min. Allocation: ${selectedPlanForInquiry?.minAmount.toLocaleString() || '5,000'} · Fiduciary Governance
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Julian Sterling"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@aetwealthcapital.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Intended Capital Deployment ($ USD)</label>
            <input
              type="number"
              value={intendedAmount}
              onChange={(e) => setIntendedAmount(Number(e.target.value))}
              placeholder="50000"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Notes / Desired Allocation Horizon</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell our advisory council about your timeline, risk parameters, or questions..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
            ></textarea>
          </div>

          <div className="text-[11px] text-slate-500 leading-normal flex items-center space-x-1.5 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Underwritten under strict fiduciary standards · Confidential review</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Transmitting...' : 'Submit Mandate Inquiry'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
