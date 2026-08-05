import React, { useState } from 'react';
import { Plus, QrCode, CheckCircle, Users, Calendar, Edit, Trash2, Download, Search } from 'lucide-react';
import { EventItem, UserItem, AttendanceRecord } from '../services/api';

interface OrganizerDashboardViewProps {
  events: EventItem[];
  currentUser: UserItem | null;
  onOpenCreateModal: () => void;
  onMarkAttendance: (eventId: number, qrToken?: string) => void;
  attendanceRecords: AttendanceRecord[];
}

export const OrganizerDashboardView: React.FC<OrganizerDashboardViewProps> = ({
  events,
  currentUser,
  onOpenCreateModal,
  onMarkAttendance,
  attendanceRecords
}) => {
  const [selectedEventId, setSelectedEventId] = useState<number>(events[0]?.id || 1);
  const [qrInputToken, setQrInputToken] = useState<string>('');
  const [manualStudentId, setManualStudentId] = useState<string>('');

  const myEvents = events.filter(e => currentUser?.role === 'admin' || e.organizer_id === currentUser?.id);
  const currentEvent = events.find(e => e.id === selectedEventId);
  const eventAttendance = attendanceRecords.filter(a => a.event_id === selectedEventId);

  const handleQrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qrInputToken.trim()) return;
    onMarkAttendance(selectedEventId, qrInputToken.trim());
    setQrInputToken('');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualStudentId.trim()) return;
    // Manual mark simulation
    onMarkAttendance(selectedEventId, `QR_EVT${selectedEventId}_STU${manualStudentId}_88329`);
    setManualStudentId('');
  };

  const handleExportCSV = () => {
    let csv = 'Student Name,Email,Student ID,Marked Time,Method\n';
    eventAttendance.forEach(a => {
      csv += `"${a.student_name || 'Student'}","${a.student_email || ''}","${a.student_id_num || ''}","${new Date(a.marked_at).toLocaleString()}","${a.method}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Attendance_Report_Event_${selectedEventId}.csv`;
    a.click();
  };

  return (
    <div style={{ padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>Organizer Event & Attendance Hub</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Manage event listings, mark real-time attendee check-ins, and export reports.
          </p>
        </div>
        <button className="btn btn-primary" onClick={onOpenCreateModal}>
          <Plus size={18} /> Create New Event
        </button>
      </div>

      {/* Grid: Events Table & Live QR Marker */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', marginBottom: '32px' }}>
        {/* Managed Events List */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>My Managed Events</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px' }}>Event Title</th>
                  <th style={{ padding: '10px' }}>Category</th>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>Registrations</th>
                  <th style={{ padding: '10px' }}>Status</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myEvents.map(evt => (
                  <tr
                    key={evt.id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      background: selectedEventId === evt.id ? 'var(--card-hover)' : 'transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedEventId(evt.id)}
                  >
                    <td style={{ padding: '12px 10px', fontWeight: 600 }}>{evt.title}</td>
                    <td style={{ padding: '12px 10px' }}>{evt.category}</td>
                    <td style={{ padding: '12px 10px' }}>{new Date(evt.start_time).toLocaleDateString()}</td>
                    <td style={{ padding: '12px 10px' }}>{evt.registered_count || 0}/{evt.capacity}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <span className={`badge badge-${evt.status}`}>{evt.status}</span>
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                      <button
                        className="btn btn-secondary"
                        onClick={(e) => { e.stopPropagation(); setSelectedEventId(evt.id); }}
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Attendance QR Scanner Box */}
        <div className="card" style={{ background: 'var(--card-bg)' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <QrCode color="var(--primary-500)" /> Attendance Check-In
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Selected: <strong>{currentEvent?.title || 'Select Event'}</strong>
          </p>

          <form onSubmit={handleQrSubmit} style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Scan / Enter QR Ticket Token:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. QR_EVT1_STU5_88329"
                value={qrInputToken}
                onChange={e => setQrInputToken(e.target.value)}
                style={{ fontSize: '12px' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '8px 12px' }}>
                Scan
              </button>
            </div>
          </form>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Or Manual Mark by Student ID:
            </label>
            <form onSubmit={handleManualSubmit} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Student ID (e.g. 5)"
                value={manualStudentId}
                onChange={e => setManualStudentId(e.target.value)}
                style={{ fontSize: '12px' }}
              />
              <button type="submit" className="btn btn-secondary" style={{ padding: '8px 12px' }}>
                Mark
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '17px' }}>
              Attendance Roster: {currentEvent?.title} ({eventAttendance.length} Checked-In)
            </h3>
          </div>
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <Download size={16} /> Export Attendance CSV
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px' }}>Student Name</th>
                <th style={{ padding: '10px' }}>Email</th>
                <th style={{ padding: '10px' }}>Student Roll No</th>
                <th style={{ padding: '10px' }}>Check-In Time</th>
                <th style={{ padding: '10px' }}>Verification Method</th>
                <th style={{ padding: '10px' }}>Certificate Issued</th>
              </tr>
            </thead>
            <tbody>
              {eventAttendance.map(att => (
                <tr key={att.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 600 }}>{att.student_name || `Student #${att.student_id}`}</td>
                  <td style={{ padding: '12px 10px' }}>{att.student_email}</td>
                  <td style={{ padding: '12px 10px' }}>{att.student_id_num || 'STU202400' + att.student_id}</td>
                  <td style={{ padding: '12px 10px' }}>{new Date(att.marked_at).toLocaleTimeString()}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge badge-success">{att.method.toUpperCase()}</span>
                  </td>
                  <td style={{ padding: '12px 10px', color: 'var(--primary-500)', fontWeight: 600 }}>
                    {att.certificate_number || 'Generated'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
