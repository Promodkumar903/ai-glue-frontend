import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth-context';
import apiClient from '../lib/api-client';
import AIInsights from '../components/shared/AIInsights';
import { Home, Briefcase, BookOpen, FileText, MapPin, TrendingUp } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [journeyRes] = await Promise.all([
          apiClient.get('/journey/me').catch(() => ({ data: null })),
        ]);
        setJourney(journeyRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const journeyStatus = journey?.display_status || 'India → Germany → TUM';
  const progress = journey?.progress || 65;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">
          🎯 Welcome back, {user?.name || 'Student'}
        </h1>
        {loading ? (
          <p className="text-gray-400 text-sm mt-2">Loading your journey...</p>
        ) : (
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-4 py-2 rounded-lg">
              <MapPin className="w-4 h-4" />
              {journeyStatus}
            </span>
            <span className="text-gray-500">Progress: {progress}%</span>
            <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* AI Insights */}
      <AIInsights insights={[
        { title: 'Your residence permit expires in 42 days.', action: 'Renew Now', priority: 'high' },
        { title: 'New housing available near TUM campus', action: 'View', priority: 'medium' },
        { title: 'Data Science 101 book required next semester', action: 'Buy', priority: 'low' },
      ]} />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionCard icon={<Home className="w-5 h-5" />} label="Housing" href="/student/housing" />
        <ActionCard icon={<Briefcase className="w-5 h-5" />} label="Part Time Jobs" href="/student/jobs" />
        <ActionCard icon={<BookOpen className="w-5 h-5" />} label="Books" href="/student/books" />
        <ActionCard icon={<FileText className="w-5 h-5" />} label="Documents" href="/student/documents" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Housing" value="2 Available" color="blue" />
        <StatCard label="Jobs" value="12 Matches" color="green" />
        <StatCard label="Documents" value="5/8 Uploaded" color="orange" />
        <StatCard label="Visa Status" value="In Progress" color="purple" />
      </div>
    </div>
  );
}

const ActionCard = ({ icon, label, href }) => (
  <a href={href} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group">
    <div className="text-blue-600 group-hover:scale-105 transition">{icon}</div>
    <p className="font-medium text-gray-700 text-sm mt-2">{label}</p>
  </a>
);

const StatCard = ({ label, value, color }) => {
  const colors = {
    blue: 'border-blue-200 bg-blue-50 text-blue-700',
    green: 'border-green-200 bg-green-50 text-green-700',
    orange: 'border-orange-200 bg-orange-50 text-orange-700',
    purple: 'border-purple-200 bg-purple-50 text-purple-700',
  };
  return (
    <div className={`p-4 rounded-xl border ${colors[color] || colors.blue}`}>
      <p className="text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};