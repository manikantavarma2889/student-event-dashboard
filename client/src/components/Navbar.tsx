import React, { useState } from 'react';
import { Bell, Sun, Moon, LogOut, LogIn, CheckCircle, Award } from 'lucide-react';
import { UserItem } from '../services/api.ts';

interface NavbarProps {
  currentUser: UserItem | null;
  onRoleSwitch: (role: 'student' | 'organizer' | 'admin') => void;
  onOpenLoginModal: () => void;
  onLogout: () => void;
  theme: string;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser, onRoleSwitch, onOpenLoginModal, onLogout, theme, toggleTheme }) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const notificationsCount = 2;

  return (
    <nav className="top-navbar" aria-label="Global navigation">
      <div>
        <h1 style={{ fontSize: '18px', fontWeight: 800 }}>CampusConnect Portal</h1>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Student Event Management & Analytics Platform
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={toggleTheme}
          style={{ padding: '8px 16px', borderRadius: 'var(--radius-full)', fontSize: '13px', fontWeight: 700 }}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={theme === 'light'}
        >
          {theme === 'dark' ? <><Sun size={16} aria-hidden="true" /> Light Mode</> : <><Moon size={16} aria-hidden="true" /> Dark Mode</>}
        </button>

        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowNotifs(!showNotifs)}
            style={{ padding: '9px 14px', borderRadius: 'var(--radius-full)', position: 'relative' }}
            aria-label={`Notifications, ${notificationsCount} unread`}
            aria-expanded={showNotifs}
            aria-controls="notification-panel"
          >
            <Bell size={18} aria-hidden="true" />
            {notificationsCount > 0 && <span aria-hidden="true" style={{ position: 'absolute', top: '2px', right: '2px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--danger-500)' }} />}
          </button>

          {showNotifs && (
            <section
              id="notification-panel"
              className="card"
              aria-labelledby="notification-heading"
              style={{ position: 'absolute', right: 0, top: '48px', width: '320px', zIndex: 50, padding: '16px', boxShadow: 'var(--shadow-lg)' }}
            >
              <h2 id="notification-heading" style={{ marginBottom: '12px', fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Event Notifications ({notificationsCount})
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', fontSize: '13px' }}>
                  <CheckCircle size={16} color="#10b981" aria-hidden="true" />
                  <div><strong>Registration Confirmed</strong><p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>AI Summit 2026 ticket active.</p></div>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '13px' }}>
                  <Award size={16} color="#6366f1" aria-hidden="true" />
                  <div><strong>Certificate Ready</strong><p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Ethical Hacking Bootcamp cert is now ready.</p></div>
                </div>
              </div>
            </section>
          )}
        </div>

        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 14px 6px 6px', borderRadius: 'var(--radius-full)', background: 'var(--card-hover)', border: '1px solid var(--border-color)' }}>
              <img
                src={currentUser.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                alt={`${currentUser.name} profile`}
                style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.2 }}>{currentUser.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--primary-500)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {currentUser.role} {currentUser.student_id_num ? `(${currentUser.student_id_num})` : ''}
                </div>
              </div>
            </div>

            <div role="group" aria-label="Portal role switcher" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--card-hover)', padding: '4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
              <button type="button" className={`btn ${currentUser.role === 'student' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => onRoleSwitch('student')} aria-pressed={currentUser.role === 'student'} style={{ padding: '4px 12px', fontSize: '11px', borderRadius: 'var(--radius-full)' }}>Student</button>
              <button type="button" className={`btn ${currentUser.role === 'organizer' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => onRoleSwitch('organizer')} aria-pressed={currentUser.role === 'organizer'} style={{ padding: '4px 12px', fontSize: '11px', borderRadius: 'var(--radius-full)' }}>Faculty Organizer</button>
              <button type="button" className={`btn ${currentUser.role === 'admin' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => onRoleSwitch('admin')} aria-pressed={currentUser.role === 'admin'} style={{ padding: '4px 12px', fontSize: '11px', borderRadius: 'var(--radius-full)' }}>Admin</button>
            </div>

            <button type="button" className="btn btn-secondary" onClick={onLogout} aria-label="Sign out of CampusConnect" style={{ padding: '8px 12px', fontSize: '12px', color: 'var(--danger-500)' }}>
              <LogOut size={16} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button type="button" className="btn btn-primary" onClick={onOpenLoginModal} style={{ borderRadius: 'var(--radius-full)' }}>
            <LogIn size={18} aria-hidden="true" /> Sign In / Register
          </button>
        )}
      </div>
    </nav>
  );
};
