import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth-context';
import AIInsights from '../components/shared/AIInsights';
import { Users, UserCheck, BarChart, DollarSign } from 'lucide-react';
import apiClient from '../lib/api-client';

export default function BrokerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ agents: 0, candidates: 0, revenue: 0, commission: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get('/broker/agents/performance').catch(() => ({ data: null }));
        if (res.data) {
          setStats({
            agents: res.data.total_agents || 0,
            candidates: res.data.total_candidates || 0,
            revenue: res.data.total_revenue || 0,
            commission: res.data.total_commission || 0,
          });
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">🏢 Broker Dashboard, {user?.name || 'Broker'}</h1>
        <p className="text-gray-500 text-sm">Agency Health, Revenue, Agent Performance</p>
      </div>

      <AIInsights insights={[
        { title: 'Agent Ravi outperforming by 34%', action: 'View', priority: 'high' },
        { title: 'Revenue up 12% this month', action: 'Details', priority: 'medium' },
      ]} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Users />} label="Agents" value={stats.agents} color="blue" />
        <StatCard icon={<UserCheck />} label="Candidates" value={stats.candidates} color="green" />
        <StatCard icon={<DollarSign />} label="Revenue" value={`$${stats.revenue}`} color="orange" />
        <StatCard icon={<BarChart />} label="Commission" value={`$${stats.commission}`} color="purple" />
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