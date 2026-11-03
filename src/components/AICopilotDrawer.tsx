import React, { useState, useEffect, useRef } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight,
  TrendingUp,
  Sliders,
  AlertCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AICopilotDrawer: React.FC = () => {
  const { 
    isAICopilotOpen, 
    setIsAICopilotOpen, 
    sendAIChatMessage, 
    totalNetWorth, 
    cashBalance,
    setIsAuditModalOpen
  } = useInvestment();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I'm Aura Copilot, your dedicated investment and quantitative wealth intelligence partner. I have direct context on your $142,837 portfolio and cash sweep holdings. How can I assist your financial strategy today?",
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAICopilotOpen) {
      scrollToBottom();
    }
  }, [messages, isAICopilotOpen]);

  if (!isAICopilotOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const reply = await sendAIChatMessage(text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const suggestedPrompts = [
    "Run comprehensive Portfolio Health Audit",
    "Should I rebalance any unrealized gains into bonds?",
    "What is the mathematical benefit of weekly DCA?",
    "How does 4.85% APY compound over 5 years?"
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-md shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-white text-sm">Aura Copilot</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-semibold">
                  Gemini 3.8
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Institutional Wealth Analyst</p>
            </div>
          </div>

          <button
            onClick={() => setIsAICopilotOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Action Banner */}
        <div className="p-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Health Score: <strong className="text-white font-mono">88/100 (Balanced Growth)</strong></span>
          </div>
          <button
            onClick={() => {
              setIsAICopilotOpen(false);
              setIsAuditModalOpen(true);
            }}
            className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer underline underline-offset-2"
          >
            View Audit Report →
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-slate-800' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] text-white">
                  You
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-slate-400 py-2">
              <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
              <span className="text-xs">Analyzing portfolio & macroeconomic metrics...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 space-y-1.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Suggested Questions</span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer text-left truncate max-w-full"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about your portfolio or stocks..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
