import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';
import { 
  GraduationCap, Briefcase, Users, Landmark, Building2, ShieldCheck, 
  Sparkles, ArrowRight, CheckCircle2 
} from 'lucide-react';

const roles = [
  { 
    id: 'STUDENT', 
    label: 'Student', 
    icon: GraduationCap, 
    desc: 'Study Abroad Journey',
    gradient: 'from-sky-500 to-blue-600',
    bgLight: 'bg-sky-500/10',
    borderLight: 'border-sky-400/30',
    glow: 'shadow-sky-500/40',
    text: 'text-sky-300',
    selectedText: 'text-white'
  },
  { 
    id: 'JOB_SEEKER', 
    label: 'Job Seeker', 
    icon: Briefcase, 
    desc: 'Career & Placement',
    gradient: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-500/10',
    borderLight: 'border-emerald-400/30',
    glow: 'shadow-emerald-500/40',
    text: 'text-emerald-300',
    selectedText: 'text-white'
  },
  { 
    id: 'AGENT', 
    label: 'Agent', 
    icon: Users, 
    desc: 'Manage Students + Seekers',
    gradient: 'from-purple-500 to-fuchsia-600',
    bgLight: 'bg-purple-500/10',
    borderLight: 'border-purple-400/30',
    glow: 'shadow-purple-500/40',
    text: 'text-purple-300',
    selectedText: 'text-white'
  },
  { 
    id: 'BROKER', 
    label: 'Broker', 
    icon: Landmark, 
    desc: 'Manage Agents + Revenue',
    gradient: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-500/10',
    borderLight: 'border-amber-400/30',
    glow: 'shadow-amber-500/40',
    text: 'text-amber-300',
    selectedText: 'text-white'
  },
  { 
    id: 'EMPLOYER', 
    label: 'Employer / HR', 
    icon: Building2, 
    desc: 'Hiring & Recruitment',
    gradient: 'from-rose-500 to-red-600',
    bgLight: 'bg-rose-500/10',
    borderLight: 'border-rose-400/30',
    glow: 'shadow-rose-500/40',
    text: 'text-rose-300',
    selectedText: 'text-white'
  },
  { 
    id: 'ADMIN', 
    label: 'Admin', 
    icon: ShieldCheck, 
    desc: 'Platform Governance',
    gradient: 'from-indigo-500 to-slate-600',
    bgLight: 'bg-indigo-500/10',
    borderLight: 'border-indigo-400/30',
    glow: 'shadow-indigo-500/40',
    text: 'text-indigo-300',
    selectedText: 'text-white'
  },
];

export default function Login() {
  const [email, setEmail] = useState('demo@aiglue.com');
  const [password, setPassword] = useState('password');
  const [selectedRole, setSelectedRole] = useState('STUDENT');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ⚠️ ध्यान दें: login को सिर्फ email और password दें — यदि Backend role नहीं लेता
      await login(email, password, selectedRole);   // role हटाया
      const path = `/${selectedRole.toLowerCase().replace('_', '-')}`;
      navigate(path);
    } catch (error) {
      alert('Login failed. Check console.');
    } finally {
      setLoading(false);
    }
  };

  const currentRole = roles.find(r => r.id === selectedRole);

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Orbs (same as before) */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-800 rounded-full filter blur-[120px] opacity-30"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-8 md:p-12 overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">AI Glue</h1>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1 text-xs font-mono text-gray-300 backdrop-blur-sm">
            v8.1 <span className="w-1 h-1 rounded-full bg-blue-400"></span> Enterprise
          </div>
          <p className="text-gray-400 text-sm mt-3">Manpower + Education Unified Platform</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Role Selection */}
          <div className="lg:col-span-3">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span> 
              Select Your Ecosystem
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {roles.map((role) => {
                const isSelected = selectedRole === role.id;
                const Icon = role.icon;
                let cardClasses = `relative group flex flex-col items-start p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-left`;
                if (isSelected) {
                  cardClasses += ` bg-gradient-to-br ${role.gradient} border-transparent shadow-lg ${role.glow} scale-[1.02]`;
                } else {
                  cardClasses += ` bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01]`;
                }
                const iconColor = isSelected ? 'text-white' : `text-gray-500 group-hover:${role.text}`;
                const textColor = isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white';
                const descColor = isSelected ? 'text-white/70' : 'text-gray-500';

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={cardClasses}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-5 h-5 text-white drop-shadow-lg" />
                      </div>
                    )}
                    <div className={`mb-3 p-2 rounded-xl ${isSelected ? 'bg-white/20 backdrop-blur-sm' : 'bg-slate-800/50'} transition-all`}>
                      <Icon className={`w-6 h-6 ${iconColor} transition-colors`} />
                    </div>
                    <span className={`text-sm font-semibold ${textColor} transition-colors`}>
                      {role.label}
                    </span>
                    <span className={`text-[10px] ${descColor} font-normal mt-1 leading-tight max-w-[120px] transition-colors`}>
                      {role.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Login Form */}
          <div className="lg:col-span-2 bg-slate-800/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-sm font-medium text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span> 
              Secure Access
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full group relative overflow-hidden bg-gradient-to-r ${currentRole?.gradient || 'from-blue-600 to-indigo-600'} hover:opacity-90 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg ${currentRole?.glow || 'shadow-blue-600/20'} flex items-center justify-center gap-2 disabled:opacity-50`}
                >
                  <span>{loading ? 'Authenticating...' : `Continue as ${currentRole?.label}`}</span>
                  {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>

              {/* ✅ Forgot Password Link Added Here */}
              <div className="text-center mt-2">
                <Link to="/forgot-password" className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <p className="text-center text-[10px] text-gray-500 mt-4 flex items-center justify-center gap-2">
                <span className="w-1 h-1 rounded-full bg-green-400 inline-block"></span>
                Secure • End-to-End Encrypted • RBAC Enabled
              </p>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-600 border-t border-white/5 pt-6">
          © 2026 AI Glue Systems • Deployed with ❤️ for Manpower & Education
        </div>
      </div>
    </div>
  );
}