import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ShieldCheck, 
  Clock, 
  HelpCircle,
  Building,
  Globe
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitInquiry } = useInvestment();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('General Wealth Planning');
  const [intendedAmount, setIntendedAmount] = useState('25000');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    submitInquiry({
      clientName: fullName,
      email,
      phone,
      planName: topic,
      intendedAmount: Number(intendedAmount) || 25000,
      message: message || 'General inquiry regarding AETWEALTHCAPITAL services.'
    });

    setSubmitted(true);
  };

  const FAQS = [
    {
      q: 'What is the minimum capital required to open an account with AETWEALTHCAPITAL?',
      a: 'Our entry tier (Beginner Investment Portfolio) starts at $500, enabling emerging investors to access institutional cash sweep and index strategies. Our Growth tier begins at $5,000, while bespoke Private Wealth and Sovereign Mandates begin at $50,000 and $100,000 respectively.'
    },
    {
      q: 'How does AETWEALTHCAPITAL handle crypto spot custody and Bitcoin wallet addresses?',
      a: 'We operate an audited cold-storage custodial structure. Bitcoin (BTC) and Ethereum (ETH) assets are held in segregated multi-signature offline vaults with 1:1 backing. Clients can view our authorized spot custody addresses directly within their secure deposit portal. Custodial addresses are managed and verified exclusively by our Compliance Desk.'
    },
    {
      q: 'How does the Loan Option and credit facility approval work?',
      a: 'Clients seeking liquidity without liquidating long-term equity or crypto holdings can apply for our Institutional Credit Facility. Borrowers submit loan parameters along with verified credit card details for collateral pre-authorization. Once submitted, our Compliance & Administrator Underwriting Desk reviews the application and authorizes disbursement directly into liquid cash.'
    },
    {
      q: 'How do you safeguard client funds and what are your fiduciary duties?',
      a: 'All client cash balances are held with multi-bank partner programs carrying up to $2.5M in aggregate FDIC insurance coverage. Investment securities are held by regulated independent clearing custodians under SIPC protection. AETWEALTHCAPITAL advisors operate as strict legal fiduciaries, meaning our recommendations are legally required to put your interests first.'
    },
    {
      q: 'What is your fee structure and are there any hidden commissions?',
      a: 'We maintain 100% unbundled fee transparency. We charge an annualized advisory and management fee ranging between 0.25% and 0.65% depending on your asset tier. We do not charge trade execution surcharges, nor do we accept third-party distributor kickbacks.'
    },
    {
      q: 'What is the turnaround time for withdrawals and trade settlements?',
      a: 'Liquid cash withdrawals submitted via domestic ACH typically settle within 1–2 business days. Same-day Fedwire withdrawals are supported for institutional accounts. Digital asset spot withdrawals undergo multi-signature security checks and settle within 2–4 hours.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100">
      {/* Header */}
      <section className="relative pt-24 pb-16 border-b border-slate-800/80 bg-gradient-to-b from-[#0a1128] via-[#070d1e] to-[#060b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <span className="w-6 h-px bg-amber-400"></span>
            <span>Direct Client Desk</span>
            <span className="w-6 h-px bg-amber-400"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Connect with AETWEALTHCAPITAL
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light">
            Whether inquiring about personalized wealth management, our credit facility, or institutional digital asset custody, our fiduciary directors are here to assist.
          </p>
        </div>
      </section>

      {/* Main Form and Direct Contact Cards */}
      <section className="py-20 border-b border-slate-800/80 bg-[#060b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800">
              <h2 className="text-2xl font-serif font-bold text-white mb-2">
                Submit an Advisory Enquiry
              </h2>
              <p className="text-xs text-slate-400 mb-8">
                Complete the mandate brief below. A senior portfolio manager will review your submission within one business day.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Enquiry Successfully Dispatched</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you, {fullName}. Our Fiduciary Advisory Council has received your request and will contact you at {email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Julian Sterling"
                        className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="j.sterling@aetwealthcapital.com"
                        className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Primary Interest</label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="General Wealth Planning">General Wealth Planning</option>
                        <option value="Beginner Investment Portfolio">Beginner Investment Portfolio ($500+)</option>
                        <option value="Growth Investment Strategy">Growth Investment Strategy ($5k+)</option>
                        <option value="Premium Private Wealth">Premium Private Wealth ($50k+)</option>
                        <option value="Long-Term Sovereign Wealth">Long-Term Sovereign Wealth ($100k+)</option>
                        <option value="Institutional Loan Facility">Institutional Loan Facility</option>
                        <option value="Digital Asset & Crypto Custody">Digital Asset & Crypto Custody</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Capital Allocation ($ USD)</label>
                    <input
                      type="number"
                      value={intendedAmount}
                      onChange={(e) => setIntendedAmount(e.target.value)}
                      placeholder="25000"
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Specific Objectives or Notes</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your liquidity timeline, risk tolerance, or tax considerations..."
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    ></textarea>
                  </div>

                  <div className="text-[11px] text-slate-500 leading-relaxed">
                    By submitting this form, you authorize AETWEALTHCAPITAL to process your information under our strict confidentiality charter. We never sell client data.
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch Mandate Brief</span>
                  </button>
                </form>
              )}
            </div>

            {/* Direct Office & Department Directory */}
            <div className="lg:col-span-5 space-y-6">
              {/* Department Emails */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Institutional Desks</span>
                </h3>
                <div className="space-y-3.5 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <div className="text-slate-400 font-medium">General Client Enquiries</div>
                    <div className="text-white font-mono mt-0.5">contact@aetwealthcapital.com</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <div className="text-slate-400 font-medium">Fiduciary & Portfolio Advisory</div>
                    <div className="text-white font-mono mt-0.5">advisory@aetwealthcapital.com</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <div className="text-slate-400 font-medium">Compliance & Trade Verification</div>
                    <div className="text-white font-mono mt-0.5">compliance@aetwealthcapital.com</div>
                  </div>
                </div>
              </div>

              {/* Telephone & Secure Lines */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Direct Telephone Support</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Toll-Free (US & Canada):</span>
                    <span className="text-white font-mono font-medium">+1 (800) 482-AETW</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">New York Institutional Trading:</span>
                    <span className="text-white font-mono font-medium">+1 (212) 555-0149</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-400">Desk Operating Hours:</span>
                    <span className="text-emerald-400 font-medium">24/5 Global Markets Coverage</span>
                  </div>
                </div>
              </div>

              {/* Office Locations (Editable Placeholders) */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Global Office Centers</span>
                </h3>
                <div className="space-y-3.5 text-xs text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <div className="font-semibold text-white">Global Headquarters · New York</div>
                    <div className="text-slate-400 mt-1 font-light">100 Wall Street, 28th Floor, Financial District, New York, NY 10005, United States</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <div className="font-semibold text-white">Asia-Pacific Hub · Singapore</div>
                    <div className="text-slate-400 mt-1 font-light">8 Marina Boulevard, Marina Bay Financial Centre Tower 1, Singapore 018981</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                    <div className="font-semibold text-white">European Fiduciary Hub · London</div>
                    <div className="text-slate-400 mt-1 font-light">1 Canada Square, Canary Wharf, London E14 5AA, United Kingdom</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <section className="py-20 border-b border-slate-800/80 bg-[#070d1e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Clarity & Answers</span>
            <h2 className="text-3xl font-serif font-bold text-white mt-1">Frequently Asked Questions</h2>
            <p className="mt-2 text-xs text-slate-400">Everything you need to know about our fiduciary stewardship, deposits, and compliance.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center hover:bg-slate-800/40 transition-all cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed font-light border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
