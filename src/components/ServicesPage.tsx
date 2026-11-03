import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { 
  ShieldCheck, 
  PieChart, 
  Target, 
  Users, 
  Layers, 
  Clock, 
  ShieldAlert, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  PhoneCall,
  Briefcase
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { wealthServices, setPublicPage, setIsInquiryModalOpen, setSelectedPlanForInquiry } = useInvestment();
  const [activeServiceId, setActiveServiceId] = useState<string>(wealthServices[0]?.id || 'srv-wealth-mgmt');

  const selectedService = wealthServices.find(s => s.id === activeServiceId) || wealthServices[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-amber-400" />;
      case 'PieChart': return <PieChart className="w-6 h-6 text-amber-400" />;
      case 'Target': return <Target className="w-6 h-6 text-amber-400" />;
      case 'Users': return <Users className="w-6 h-6 text-amber-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-amber-400" />;
      case 'Clock': return <Clock className="w-6 h-6 text-amber-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-amber-400" />;
      default: return <Briefcase className="w-6 h-6 text-amber-400" />;
    }
  };

  const handleConsultService = (serviceTitle: string) => {
    setSelectedPlanForInquiry({
      id: `service-inq-${activeServiceId}`,
      title: `${serviceTitle} Advisory Mandate`,
      category: 'Premium Wealth Management',
      minAmount: 5000,
      duration: 'Ongoing',
      riskClassification: 'Balanced Growth',
      applicableFees: 'Unbundled Fiduciary Advisory',
      expectedReturnInfo: 'Customized based on strategic mandate objectives.',
      terms: 'Formal advisory engagement agreement.',
      description: `Inquiry regarding ${serviceTitle} institutional engagement.`,
      highlights: [],
      recommendedFor: 'Private Clients and Institutional Entities'
    });
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100">
      {/* Editorial Header */}
      <section className="relative pt-24 pb-16 border-b border-slate-800/80 bg-gradient-to-b from-[#0a1128] via-[#070d1e] to-[#060b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <span className="w-6 h-px bg-amber-400"></span>
            <span>Comprehensive Solutions</span>
            <span className="w-6 h-px bg-amber-400"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Institutional Wealth Services
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-light">
            Eight specialized financial disciplines managed under a unified fiduciary governance model. Designed for private clients, high-net-worth families, and corporate executives.
          </p>
        </div>
      </section>

      {/* Services Grid (8 Services) */}
      <section className="py-20 border-b border-slate-800/80 bg-[#060b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wealthServices.map((service) => (
              <div
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeServiceId === service.id
                    ? 'bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
                    {service.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className={`font-semibold ${activeServiceId === service.id ? 'text-amber-400' : 'text-slate-400'}`}>
                    {activeServiceId === service.id ? 'Active Mandate' : 'Explore Brief'}
                  </span>
                  <ChevronRight className={`w-4 h-4 ${activeServiceId === service.id ? 'text-amber-400' : 'text-slate-500'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Depth Service Specification Panel */}
      <section className="py-20 border-b border-slate-800/80 bg-[#070d1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    {getServiceIcon(selectedService.iconName)}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">Service Specification</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      {selectedService.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  {selectedService.description}
                </p>

                {/* Key Deliverables */}
                <div>
                  <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                    Institutional Deliverables Included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.keyDeliverables.map((del, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engagement Process */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-200 mb-1">Engagement Methodology:</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{selectedService.engagementProcess}</div>
                </div>
              </div>

              {/* Consultation Card */}
              <div className="lg:col-span-5 p-8 rounded-2xl bg-gradient-to-br from-slate-950 to-[#0a1128] border border-amber-500/30 text-center">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  Engage {selectedService.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 font-light">
                  Speak directly with a senior fiduciary director regarding implementation parameters, mandate sizing, and tax considerations.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => handleConsultService(selectedService.title)}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Request Consultation for this Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPublicPage('contact')}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-xs rounded-lg transition-all cursor-pointer"
                  >
                    General Enquiry / Contact Desk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
