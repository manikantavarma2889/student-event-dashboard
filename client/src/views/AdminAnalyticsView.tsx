import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, Users, Calendar, Award, TrendingUp, ShieldCheck, UserCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AnalyticsData, api } from '../services/api';
import { StatCard } from '../components/StatCard.tsx';

interface AdminAnalyticsViewProps {
  analytics: AnalyticsData | null;
}

const PIE_COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const AdminAnalyticsView: React.FC<AdminAnalyticsViewProps> = ({ analytics }) => {
  const { data: queryAnalytics } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await api.getAnalytics();
      return response?.success ? response.data as AnalyticsData : null;
    },
    enabled: !analytics && Boolean(localStorage.getItem('token'))
  });

  const resolvedAnalytics = analytics || queryAnalytics;
  const metrics = resolvedAnalytics?.metrics || {
    total_events: 5,
    total_registrations: 11,
    total_attended: 6,
    attendance_rate: 55,
    total_certificates: 6,
    total_students: 5
  };

  const departmentStats = resolvedAnalytics?.department_stats || [
    { department: 'CSE', name: 'Computer Science', events: 2, registrations: 5, attendance: 3 },
    { department: 'IT', name: 'Information Tech', events: 1, registrations: 3, attendance: 2 },
    { department: 'ECE', name: 'Electronics', events: 1, registrations: 2, attendance: 1 },
    { department: 'SMS', name: 'Management', events: 1, registrations: 1, attendance: 1 }
  ];

  const monthlyTrends = resolvedAnalytics?.monthly_trends || [
    { month: 'Jan', registrations: 120, attendance: 105 },
    { month: 'Feb', registrations: 180, attendance: 160 },
    { month: 'Mar', registrations: 290, attendance: 260 },
    { month: 'Apr', registrations: 240, attendance: 210 },
    { month: 'May', registrations: 200, attendance: 185 },
    { month: 'Jun', registrations: 350, attendance: 310 },
    { month: 'Jul', registrations: 280, attendance: 250 },
    { month: 'Aug', registrations: 310, attendance: 275 }
  ];

  const leaderboard = resolvedAnalytics?.organizer_leaderboard || [
    { id: 2, name: 'Prof. Alex Rivera', email: 'alex.rivera@college.edu', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', events_hosted: 3, total_registrations: 7, total_attendees: 4, avg_attendance_rate: 57 },
    { id: 3, name: 'Dr. Marcus Vance', email: 'marcus.vance@college.edu', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', events_hosted: 1, total_registrations: 2, total_attendees: 1, avg_attendance_rate: 50 },
    { id: 4, name: 'Prof. Elena Rostova', email: 'elena.rostova@college.edu', avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', events_hosted: 1, total_registrations: 2, total_attendees: 2, avg_attendance_rate: 100 }
  ];

  return (
    <div style={{ padding: '28px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>Executive Analytics & Platform Control</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Real-time metrics on student participation, department performance, and organizer efficiency.</p>
      </div>

      <div className="grid-stats">
        <StatCard title="Total Events Hosted" value={metrics.total_events} subtitle="Across all departments" icon={<Calendar size={24} />} color="linear-gradient(135deg, #6366f1, #4f46e5)" glowColor="rgba(99, 102, 241, 0.3)" />
        <StatCard title="Total Registrations" value={metrics.total_registrations} subtitle="Student event signups" icon={<Users size={24} />} color="linear-gradient(135deg, #3b82f6, #2563eb)" glowColor="rgba(59, 130, 246, 0.3)" />
        <StatCard title="Overall Attendance Rate" value={`${metrics.attendance_rate}%`} subtitle="Checked-in vs Registered" icon={<TrendingUp size={24} />} color="linear-gradient(135deg, #10b981, #059669)" glowColor="rgba(16, 185, 129, 0.3)" />
        <StatCard title="Certificates Issued" value={metrics.total_certificates} subtitle="Digital verifiable credentials" icon={<Award size={24} />} color="linear-gradient(135deg, #8b5cf6, #7c3aed)" glowColor="rgba(139, 92, 246, 0.3)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart3 color="var(--primary-500)" /> Monthly Registration & Attendance Trends</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>Comparative monthly breakdown of student event participation</p>
          <div style={{ width: '100%', height: 300 }} aria-label="Monthly registration and attendance chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrends} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="registrations" name="Registrations" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="attendance" name="Attendance" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck color="#10b981" /> Department Participation</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Registration distribution by department</p>
          <div style={{ width: '100%', height: 300 }} aria-label="Department participation chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={departmentStats} dataKey="registrations" nameKey="department" cx="50%" cy="48%" outerRadius={95} label>
                  {departmentStats.map((entry, index) => <Cell key={entry.department} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '17px', marginBottom: '16px' }}>Department Engagement Details</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {departmentStats.map((dept) => (
            <div key={dept.department}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}><span>{dept.name} ({dept.department})</span><span>{dept.registrations} Signups ({dept.attendance} Attended)</span></div>
              <div style={{ height: '8px', background: 'var(--border-color)', borderRadius: '99px', overflow: 'hidden' }}><div style={{ height: '100%', width: `${Math.min(dept.registrations * 18, 100)}%`, background: 'linear-gradient(90deg, #6366f1, #10b981)', borderRadius: '99px' }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '17px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><UserCheck color="#f59e0b" /> Faculty Organizer Performance Leaderboard</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead><tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}><th style={{ padding: '10px' }}>Organizer Name</th><th style={{ padding: '10px' }}>Email</th><th style={{ padding: '10px' }}>Events Hosted</th><th style={{ padding: '10px' }}>Total Signups</th><th style={{ padding: '10px' }}>Total Attendees</th><th style={{ padding: '10px' }}>Avg Attendance Rate</th></tr></thead>
            <tbody>{leaderboard.map(org => <tr key={org.id} style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '12px 10px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}><img src={org.avatar_url} alt={org.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />{org.name}</td><td style={{ padding: '12px 10px' }}>{org.email}</td><td style={{ padding: '12px 10px', fontWeight: 700 }}>{org.events_hosted}</td><td style={{ padding: '12px 10px' }}>{org.total_registrations}</td><td style={{ padding: '12px 10px' }}>{org.total_attendees}</td><td style={{ padding: '12px 10px' }}><span className="badge badge-success">{org.avg_attendance_rate}%</span></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
