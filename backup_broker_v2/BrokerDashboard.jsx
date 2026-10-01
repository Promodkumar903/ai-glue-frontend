import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth-context';
import { Users, UserCheck, TrendingUp, DollarSign } from 'lucide-react';
import axios from '../utils/axios';

export default function BrokerDashboard() {
  const { user, logout } = useAuth();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/broker/agents/performance').catch(() => ({ data: [] }));
        setAgents(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const insights = [
    { title: 'Agent Ravi outperforming by 34%', action: 'View', priority: 'high' },
    { title: 'Revenue up 12% this month', action: 'Details', priority: 'medium' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            🏢 Broker Dashboard, {user?.full_name || user?.email?.split('@')[0] || 'Broker'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Agency Health, Revenue, Agent Performance
          </p>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* AI Insights */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">🧠 AI Glue Insights</h2>
        <div className="space-y-3">
          {insights.map((item, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0">
              <p className="text-sm text-slate-700">
                {item.priority === 'high' ? '🔴' : '🟡'} {item.title}
              </p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                {item.action} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Users />} label="Agents" value="0" color="blue" />
        <StatCard icon={<UserCheck />} label="Candidates" value="0" color="green" />
        <StatCard icon={<TrendingUp />} label="Revenue" value="$0" color="orange" />
        <StatCard icon={<DollarSign />} label="Commission" value="$0" color="purple" />
      </div>

      {/* Agent Performance */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-4">👥 Agent Performance</h3>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : agents.length === 0 ? (
          <p className="text-gray-400">No agents yet.</p>
        ) : (
          <ul className="divide-y">
            {agents.slice(0, 5).map((a, i) => (
              <li key={i} className="py-3 flex justify-between items-center">
                <span className="text-sm text-slate-700">
                  {a.name || a.full_name || 'Agent'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  {a.performance || 'Active'}
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