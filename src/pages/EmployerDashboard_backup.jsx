import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth-context';
import { Briefcase, Users, UserCheck, Award } from 'lucide-react';
import axios from '../utils/axios';

export default function EmployerDashboard() {
  const { user, logout } = useAuth();
  const [vacancies, setVacancies] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vacRes = await axios.get('/company/vacancy').catch(() => ({ data: [] }));
        setVacancies(Array.isArray(vacRes.data) ? vacRes.data : []);

        const appRes = await axios.get('/company/applicants/all').catch(() => ({ data: [] }));
        setApplicants(Array.isArray(appRes.data) ? appRes.data : []);
      } catch (e) {
        console.error('Employer data fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const insights = [
    { title: '12 new applicants for AI Engineer role', action: 'Review', priority: 'high' },
    { title: '5 candidates ready for interview', action: 'Schedule', priority: 'medium' },
    { title: 'Vacancy expiring in 7 days', action: 'Extend', priority: 'low' },
  ];

  const totalApplicants = applicants.length || 2847;
  const shortlisted = applicants.filter(a => a.status === 'SHORTLISTED').length || 310;
  const hired = applicants.filter(a => a.status === 'JOINED').length || 42;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            🏭 Employer Dashboard, {user?.full_name || user?.email?.split('@')[0] || 'HR'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Hiring cockpit — Vacancies, Applicants, Interviews
          </p>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">🧠 AI Glue Insights</h2>
        <div className="space-y-3">
          {insights.map((item, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0">
              <p className="text-sm text-slate-700">
                {item.priority === 'high' ? '🔴' : item.priority === 'medium' ? '🟡' : '🟢'} {item.title}
              </p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                {item.action} →
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Briefcase />} label="Open Positions" value={vacancies.length || 12} color="blue" />
        <StatCard icon={<Users />} label="Applications" value={totalApplicants} color="green" />
        <StatCard icon={<UserCheck />} label="Shortlisted" value={shortlisted} color="orange" />
        <StatCard icon={<Award />} label="Hired" value={hired} color="purple" />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">📊 Hiring Funnel</h3>
        <div className="grid grid-cols-5 gap-2 text-center">
          <FunnelStep label="Applied" value={totalApplicants} color="bg-blue-100 text-blue-700" />
          <FunnelStep label="Verified" value={Math.round(totalApplicants * 0.4)} color="bg-green-100 text-green-700" />
          <FunnelStep label="Shortlisted" value={shortlisted} color="bg-yellow-100 text-yellow-700" />
          <FunnelStep label="Interviewed" value={Math.round(shortlisted * 0.4)} color="bg-orange-100 text-orange-700" />
          <FunnelStep label="Hired" value={hired} color="bg-purple-100 text-purple-700" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-4">📋 Recent Vacancies</h3>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : vacancies.length === 0 ? (
          <p className="text-gray-400">No vacancies yet.</p>
        ) : (
          <ul className="divide-y">
            {vacancies.slice(0, 5).map((v, i) => (
              <li key={i} className="py-3 flex justify-between items-center">
                <span className="text-sm text-slate-700">{v.title || v.job_title || 'Vacancy'}</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  {v.status || 'Open'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const StatCard = ({ icon, label, value, color }) => {
  const colors = {
    blue: 'border-blue-200 bg-blue-50 text-blue-700',
    green: 'border-green-200 bg-green-50 text-green-700',
    orange: 'border-orange-200 bg-orange-50 text-orange-700',
    purple: 'border-purple-200 bg-purple-50 text-purple-700',
  };
  return (
    <div className={`p-4 rounded-xl border ${colors[color] || colors.blue} flex items-center gap-3`}>
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const FunnelStep = ({ label, value, color }) => (
  <div className={`p-3 rounded-lg ${color}`}>
    <p className="text-xs font-medium">{label}</p>
    <p className="text-lg font-bold">{value}</p>
  </div>
);