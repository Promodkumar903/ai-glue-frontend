import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth-context';
import AIInsights from '../components/shared/AIInsights';
import { Users, GraduationCap, TrendingUp, HandCoins } from 'lucide-react';
import apiClient from '../lib/api-client';

export default function AgentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ students: 0, jobSeekers: 0, placements: 0, commission: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get('/agent/funnel').catch(() => ({ data: null }));
        if (res.data) {
          setStats({
            students: res.data.students || 0,
            jobSeekers: res.data.job_seekers || 0,
            placements: res.data.placements || 0,
            commission: res.data.commission || 0,
          });
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">👥 Agent Pipeline, {user?.name || 'Agent'}</h1>
        <p className="text-gray-500 text-sm">Manage Students + Job Seekers</p>
      </div>

      <AIInsights insights={[
        { title: '4 candidates need attention today', action: 'View', priority: 'high' },
        { title: '12 applications pending review', action: 'Review', priority: 'medium' },
      ]} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<GraduationCap />} label="Students" value={stats.students} color="blue" />
        <StatCard icon={<Users />} label="Job Seekers" value={stats.jobSeekers} color="green" />
        <StatCard icon={<TrendingUp />} label="Placements" value={stats.placements} color="orange" />
        <StatCard icon={<HandCoins />} label="Commission" value={`$${stats.commission}`} color="purple" />
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