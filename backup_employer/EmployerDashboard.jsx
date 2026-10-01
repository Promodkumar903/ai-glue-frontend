import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth-context';
import AIInsights from '../components/shared/AIInsights';
import { Briefcase, Users, Calendar, Award } from 'lucide-react';
import apiClient from '../lib/api-client';

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ vacancies: 0, applicants: 0, interviews: 0, offers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get('/company/vacancy').catch(() => ({ data: [] }));
        const vacancies = Array.isArray(res.data) ? res.data : [];
        setStats({
          vacancies: vacancies.length,
          applicants: vacancies.reduce((sum, v) => sum + (v.applicants_count || 0), 0),
          interviews: vacancies.reduce((sum, v) => sum + (v.interviews_count || 0), 0),
          offers: vacancies.reduce((sum, v) => sum + (v.offers_count || 0), 0),
        });
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">🏭 HR Dashboard, {user?.name || 'Employer'}</h1>
        <p className="text-gray-500 text-sm">Hiring Funnel, ATS, Talent Pipeline</p>
      </div>

      <AIInsights insights={[
        { title: 'Top 5 candidates available for AI Engineer', action: 'View', priority: 'high' },
        { title: '3 offers pending acceptance', action: 'Follow Up', priority: 'medium' },
      ]} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Briefcase />} label="Open Positions" value={stats.vacancies} color="blue" />
        <StatCard icon={<Users />} label="Applicants" value={stats.applicants} color="green" />
        <StatCard icon={<Calendar />} label="Interviews" value={stats.interviews} color="orange" />
        <StatCard icon={<Award />} label="Offers" value={stats.offers} color="purple" />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-2">📊 Hiring Funnel</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Applied</span>
          <span className="text-gray-300">→</span>
          <span>Screening</span>
          <span className="text-gray-300">→</span>
          <span>Shortlisted</span>
          <span className="text-gray-300">→</span>
          <span>Interview</span>
          <span className="text-gray-300">→</span>
          <span>Offer</span>
          <span className="text-gray-300">→</span>
          <span>Joined</span>
        </div>
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