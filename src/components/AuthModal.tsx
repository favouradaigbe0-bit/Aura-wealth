import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { 
  X, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Globe, 
  ShieldCheck, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode, 
    loginUser, 
    registerUser 
  } = useInvestment();

  // Registration form state
  const [fullName, setFullName] = useState('Favour Adaigbe');
  const [email, setEmail] = useState('favouradaigbe0@gmail.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [country, setCountry] = useState('United States');
  const [password, setPassword] = useState('AetCapital#2026');
  const [confirmPassword, setConfirmPassword] = useState('AetCapital#2026');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('favouradaigbe0@gmail.com');
  const [loginPassword, setLoginPassword] = useState('AetCapital#2026');
  const [rememberMe, setRememberMe] = useState(true);

  // MFA & Forgot Password flow
  const [showMfaChallenge, setShowMfaChallenge] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false);
  const [forgotEmailSent, setForgotEmailSent] = useState(false);

  // UI state
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const isSignUp = authModalMode === 'signup';

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !email || !phone || !country || !password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your entries.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters with numbers and symbols.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('Please agree to the Master Client Terms and Regulatory Disclosures.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      registerUser({
        fullName,
        email,
        phone,
        country,
        password
      });
      setIsSubmitting(false);
    }, 700);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginEmail || !loginPassword) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Prompt MFA security step for high net worth account
      setShowMfaChallenge(true);
    }, 500);
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode.length < 4) {
      setErrorMsg('Please enter a valid verification code (e.g. 849201).');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowMfaChallenge(false);
      loginUser(loginEmail, fullName || 'Client');
    }, 400);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setForgotEmailSent(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden relative text-slate-100 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-[#070d1e]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-[#060b18] rounded-[10px] flex items-center justify-center">
                <span className="font-serif font-black text-amber-400 text-xs">AET</span>
              </div>
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                {showMfaChallenge 
                  ? 'Two-Factor Authentication' 
                  : forgotPasswordActive 
                    ? 'Reset Access Password' 
                    : isSignUp 
                      ? 'Create AETWEALTHCAPITAL Account' 
                      : 'Secure Client Login'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {showMfaChallenge
                  ? 'Enter 6-digit cryptographic security code'
                  : isSignUp 
                    ? 'Fiduciary wealth account registration' 
                    : 'Access active trading and portfolio management desk'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsAuthModalOpen(false);
              setShowMfaChallenge(false);
              setForgotPasswordActive(false);
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switch (Only when not in MFA or Forgot Password) */}
        {!showMfaChallenge && !forgotPasswordActive && (
          <div className="grid grid-cols-2 p-1 bg-slate-950 border-b border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('signup');
                setErrorMsg('');
              }}
              className={`py-2.5 rounded-lg transition-all cursor-pointer ${
                isSignUp 
                  ? 'bg-amber-500 text-slate-950 font-bold shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('signin');
                setErrorMsg('');
              }}
              className={`py-2.5 rounded-lg transition-all cursor-pointer ${
                !isSignUp 
                  ? 'bg-amber-500 text-slate-950 font-bold shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Error notification */}
        {errorMsg && (
          <div className="m-4 mb-0 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Body Container */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* MFA CHALLENGE FLOW */}
          {showMfaChallenge ? (
            <form onSubmit={handleMfaSubmit} className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 text-center">
                <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto" />
                <div className="font-semibold text-white">Multi-Factor Authentication Required</div>
                <div className="text-[11px] text-slate-400">
                  A 6-digit confirmation token has been generated for your registered email: <span className="text-amber-300 font-mono">{loginEmail}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 text-center">
                  Verification Code (Simulated default: 849201)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="849201"
                  className="w-full text-center tracking-[0.5em] font-mono text-lg font-bold py-3 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                {isSubmitting ? 'Verifying Credentials...' : 'Authenticate & Open Terminal'}
              </button>

              <button
                type="button"
                onClick={() => setShowMfaChallenge(false)}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-300 pt-1 cursor-pointer"
              >
                Back to Login Form
              </button>
            </form>
          ) : forgotPasswordActive ? (
            /* FORGOT PASSWORD FLOW */
            <form onSubmit={handleForgotPassword} className="space-y-4">
              {forgotEmailSent ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Recovery Link Dispatched</h4>
                  <p className="text-xs text-slate-300">
                    If an account exists under {loginEmail}, instructions to securely reset your credentials have been sent.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotPasswordActive(false);
                      setForgotEmailSent(false);
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate-400">
                    Enter your account email. We will dispatch a single-use authorization token to reset your password.
                  </p>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow cursor-pointer"
                  >
                    {isSubmitting ? 'Dispatching Link...' : 'Send Password Reset Link'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordActive(false)}
                    className="w-full text-center text-xs text-slate-400 hover:text-slate-300 pt-1 cursor-pointer"
                  >
                    Back to Login
                  </button>
                </>
              )}
            </form>
          ) : isSignUp ? (
            /* REGISTRATION FORM (Full Name, Email, Phone, Country, Password, Confirm Password) */
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Favour Adaigbe"
                    className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@aetwealthcapital.com"
                      className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 234-5678"
                      className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Country of Tax Residence *</label>
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                  </select>
                  <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Password *</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-[11px] text-slate-400 leading-snug">
                    I agree to the <span className="text-amber-400">Master Terms of Service</span>, <span className="text-amber-400">Privacy Policy</span>, and acknowledge the <span className="text-amber-400">Risk Disclosure</span> statement.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Opening Account...' : 'Complete Registration & Open Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* LOGIN FORM (Email, Password, Forgot Password, Remember Me) */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="client@aetwealthcapital.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotPasswordActive(true);
                      setErrorMsg('');
                    }}
                    className="text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 cursor-pointer text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Remember session for 30 days</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Client Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    loginUser('favouradaigbe0@gmail.com', 'Favour Adaigbe');
                  }}
                  className="text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  ⚡ Instant Verified Demo Access (Favour Adaigbe)
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
