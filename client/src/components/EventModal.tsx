import React from 'react';
import { Calendar, MapPin, Users, Award, Clock, X, QrCode, CheckCircle } from 'lucide-react';
import { EventItem, UserItem } from '../services/api';

interface EventModalProps {
  event: EventItem | null;
  currentUser: UserItem | null;
  onClose: () => void;
  onRegister?: (eventId: number) => void;
  onCancel?: (eventId: number) => void;
  isRegistered?: boolean;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  currentUser,
  onClose,
  onRegister,
  onCancel,
  isRegistered = false
}) => {
  if (!event) return null;

  const isCapacityFull = (event.registered_count || 0) >= event.capacity;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={e => e.stopPropagation()}>
        {/* Header Poster Image */}
        <div style={{ position: 'relative', height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '20px' }}>
          <img
            src={event.poster_url}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              color: 'white',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
          <span
            className={`badge badge-${event.status}`}
            style={{ position: 'absolute', bottom: '12px', left: '12px', padding: '6px 14px', fontSize: '13px' }}
          >
            {event.category} • {event.status.toUpperCase()}
          </span>
        </div>

        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{event.title}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px', fontSize: '14px' }}>
          {event.description}
        </p>

        {/* Event Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <Calendar size={18} color="var(--primary-500)" />
            <div>
              <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Date & Time</strong>
              {new Date(event.start_time).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <MapPin size={18} color="var(--primary-500)" />
            <div>
              <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Venue</strong>
              {event.location}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <Users size={18} color="var(--primary-500)" />
            <div>
              <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Registrations</strong>
              {event.registered_count || 0} / {event.capacity} seats filled
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <Award size={18} color="var(--primary-500)" />
            <div>
              <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Department</strong>
              {event.department_name || 'General College'}
            </div>
          </div>
        </div>

        {/* Student Ticket QR Section if registered */}
        {isRegistered && (
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05))',
              borderColor: 'var(--primary-500)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ background: 'white', padding: '10px', borderRadius: 'var(--radius-md)', color: '#0f172a' }}>
                <QrCode size={48} />
              </div>
              <div>
                <h4 style={{ color: 'var(--primary-500)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={16} /> Registration Ticket Active
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Show this QR token to the organizer at venue entry:
                </p>
                <code style={{ fontSize: '12px', background: 'var(--card-bg)', padding: '2px 6px', borderRadius: '4px' }}>
                  QR_EVT{event.id}_STU{currentUser?.id}_88329
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>

          {currentUser?.role === 'student' && (
            <>
              {isRegistered ? (
                <button className="btn btn-danger" onClick={() => onCancel && onCancel(event.id)}>
                  Cancel Registration
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={isCapacityFull || event.status === 'completed'}
                  onClick={() => onRegister && onRegister(event.id)}
                >
                  {isCapacityFull ? 'Capacity Full' : 'Register Now'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
