import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './lib/auth-context';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import StudentDashboard from './pages/StudentDashboard';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import AgentDashboard from './pages/AgentDashboard';
import BrokerDashboard from './pages/BrokerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const { user } = useAuth();

  const rolePath = user?.role?.toLowerCase().replace('_', '-') || 'student';

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={`/${rolePath}`} /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={`/${rolePath}`} /> : <Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/student/*" element={user?.role === 'STUDENT' ? <StudentDashboard /> : <Navigate to="/login" />} />
      <Route path="/job-seeker/*" element={user?.role === 'JOB_SEEKER' ? <JobSeekerDashboard /> : <Navigate to="/login" />} />
      <Route path="/agent/*" element={user?.role === 'AGENT' ? <AgentDashboard /> : <Navigate to="/login" />} />
      <Route path="/broker/*" element={user?.role === 'BROKER' ? <BrokerDashboard /> : <Navigate to="/login" />} />
      <Route path="/employer/*" element={user?.role === 'EMPLOYER' ? <EmployerDashboard /> : <Navigate to="/login" />} />
      <Route path="/admin/*" element={user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} />

      <Route path="/" element={<Navigate to={user ? `/${rolePath}` : '/login'} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;