import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Building2, Briefcase, FileText,
  Search, MessageSquare, ShieldCheck, GraduationCap,
  DollarSign, BookOpen, Home, LogOut
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

const roleNavItems = {
  STUDENT: [
    { path: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/student/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/student/housing', label: 'Housing', icon: Home },
    { path: '/student/documents', label: 'Documents', icon: FileText },
    { path: '/student/visa', label: 'Visa', icon: ShieldCheck },
    { path: '/student/books', label: 'Books', icon: BookOpen },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
  ],
  JOB_SEEKER: [
    { path: '/job-seeker', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/job-seeker/jobs', label: 'Job Matches', icon: Search },
    { path: '/job-seeker/applications', label: 'Applications', icon: FileText },
    { path: '/job-seeker/documents', label: 'Documents', icon: FileText },
    { path: '/job-seeker/visa', label: 'Visa', icon: ShieldCheck },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
  ],
  AGENT: [
    { path: '/agent', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/agent/candidates', label: 'Candidates', icon: Users },
    { path: '/agent/funnel', label: 'Funnel', icon: Briefcase },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
  ],
  BROKER: [
    { path: '/broker', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/broker/agents', label: 'Agents', icon: Users },
    { path: '/broker/clients', label: 'Clients', icon: Building2 },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
  ],
  EMPLOYER: [
    { path: '/employer', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/employer/vacancies', label: 'Vacancies', icon: Briefcase },
    { path: '/employer/applicants', label: 'Applicants', icon: Users },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
  ],
  ADMIN: [
    { path: '/admin', label: 'War Room', icon: LayoutDashboard },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/organizations', label: 'Organizations', icon: Building2 },
    { path: '/admin/audit', label: 'Audit Logs', icon: ShieldCheck },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
  ],
};

export default function Sidebar({ role = 'STUDENT' }) {
  const { user, logout } = useAuth();
  const navItems = roleNavItems[role] || roleNavItems.STUDENT;

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">AI Glue</h1>
            <p className="text-xs text-slate-400">{role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path.split('/').length === 2}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {(user?.full_name || user?.email || 'U')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.full_name || 'User'}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}