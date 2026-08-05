import React from 'react';
import { Award, QrCode, CheckCircle, Clock, Calendar, Download, Trash2 } from 'lucide-react';
import { RegistrationItem, CertificateItem } from '../services/api';
import { StatCard } from '../components/StatCard.tsx';

interface StudentDashboardViewProps {
  registrations: RegistrationItem[];
  certificates: CertificateItem[];
  onOpenCertificateModal: (cert: CertificateItem) => void;
  onCancelRegistration: (eventId: number) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  registrations,
  certificates,
  onOpenCertificateModal,
  onCancelRegistration
}) => {
  const activeRegistrations = registrations.filter(r => r.status !== 'cancelled');
  const attendedCount = registrations.filter(r => r.status === 'attended').length;
  const attendanceRate = activeRegistrations.length > 0 ? Math.round((attendedCount / activeRegistrations.length) * 100) : 100;

  return (
    <div style={{ padding: '28px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '6px' }}>Student Participation Hub</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '14px' }}>
        Track your event passes, attendance history, and download official credentials.
      </p>

      {/* Stats Summary */}
      <div className="grid-stats">
        <StatCard
          title="Active Registrations"
          value={activeRegistrations.length}
          subtitle="Upcoming events on calendar"
          icon={<Calendar size={24} />}
          color="linear-gradient(135deg, #6366f1, #4f46e5)"
          glowColor="rgba(99, 102, 241, 0.3)"
        />
        <StatCard
          title="Attended Events"
          value={attendedCount}
          subtitle="Verified attendance passes"
          icon={<CheckCircle size={24} />}
          color="linear-gradient(135deg, #10b981, #059669)"
          glowColor="rgba(16, 185, 129, 0.3)"
        />
        <StatCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          subtitle="Participation reliability score"
          icon={<Clock size={24} />}
          color="linear-gradient(135deg, #f59e0b, #d97706)"
          glowColor="rgba(245, 158, 11, 0.3)"
        />
        <StatCard
          title="Certificates Earned"
          value={certificates.length}
          subtitle="Ready for PDF export"
          icon={<Award size={24} />}
          color="linear-gradient(135deg, #8b5cf6, #7c3aed)"
          glowColor="rgba(139, 92, 246, 0.3)"
        />
      </div>

      {/* Registrations & Tickets Section */}
      <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>My Active Event Tickets</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        {activeRegistrations.map(reg => (
          <div key={reg.id} className="card" style={{ padding: '20px', borderLeft: '4px solid var(--primary-500)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-info" style={{ marginBottom: '6px', fontSize: '11px' }}>
                  {reg.event?.category || 'Event'}
                </span>
                <h4 style={{ fontSize: '16px' }}>{reg.event?.title || 'Registered Event'}</h4>
              </div>
              <span className={`badge badge-${reg.status}`}>{reg.status}</span>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              📍 {reg.event?.location} • 🕒 {reg.event ? new Date(reg.event.start_time).toLocaleDateString() : ''}
            </p>

            <div
              style={{
                background: 'var(--card-hover)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                <QrCode size={20} color="var(--primary-500)" />
                <span>Ticket Token:</span>
              </div>
              <code style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-500)' }}>
                {reg.qr_code_token}
              </code>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-secondary"
                onClick={() => onCancelRegistration(reg.event_id)}
                style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--danger-500)' }}
              >
                <Trash2 size={14} /> Cancel Ticket
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificates Vault */}
      <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Award color="#8b5cf6" /> Certificates Vault ({certificates.length})
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {certificates.map(cert => (
          <div key={cert.id} className="card" style={{ padding: '20px', background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(139, 92, 246, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8b5cf6'
                }}
              >
                <Award size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px' }}>{cert.event_title || 'Certificate of Completion'}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  ID: {cert.certificate_number}
                </p>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Issued on {new Date(cert.issue_date).toLocaleDateString()}
            </div>

            <button
              className="btn btn-primary"
              onClick={() => onOpenCertificateModal(cert)}
              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
            >
              <Download size={16} /> View & Download PDF Certificate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
