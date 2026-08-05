import React, { useState } from 'react';
import { 
  Bell, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  LogIn, 
  CheckCircle,
  Award,
  Shield
} from 'lucide-react';
import { UserItem } from '../services/api.ts';

interface NavbarProps {
  currentUser: UserItem | null;
  onRoleSwitch: (role: 'student' | 'organizer' | 'admin') => void;
  onOpenLoginModal: () => void;
  onLogout: () => void;
  theme: string;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onRoleSwitch,
  onOpenLoginModal,
  onLogout,
  theme,
  toggleTheme
}) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const notificationsCount = 2;

  return (
    <>
      <nav className="top-navbar">
        {/* Page Context Branding Title */}
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800 }}>CampusConnect Portal</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Student Event Management & Analytics Platform
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* High-Contrast White / Black Theme Toggle */}
          <button
            className="btn btn-secondary"
            onClick={toggleTheme}
            style={{ padding: '8px 16px', borderRadius: 'var(--radius-full)', fontSize: '13px', fontWeight: 700 }}
            title="Toggle Dark / Light Mode"
          >
            {theme === 'dark' ? (
              <><Sun size={16} color="#f59e0b" /> Light Mode</>
            ) : (
              <><Moon size={16} /> Dark Mode</>
            )}
          </button>

          {/* Notifications Dropdown Toggle */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setShowNotifs(!showNotifs)}
              style={{ padding: '9px 14px', borderRadius: 'var(--radius-full)', position: 'relative' }}
              title="Notifications"
            >
              <Bell size={18} />
              {notificationsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'var(--danger-500)'
                  }}
                />
              )}
            </button>

            {/* Notification Drawer Popover */}
            {showNotifs && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '48px',
                  width: '320px',
                  zIndex: 50,
                  padding: '16px',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <h4 style={{ marginBottom: '12px', fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  Event Notifications ({notificationsCount})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '13px' }}>
                    <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>Registration Confirmed</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>AI Summit 2026 ticket active.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '13px' }}>
                    <Award size={16} color="#6366f1" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>Certificate Ready</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Ethical Hacking Bootcamp cert is now ready.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill & Role Switcher */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '6px 14px 6px 6px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--card-hover)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <img
                  src={currentUser.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                  alt={currentUser.name}
                  style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.2 }}>{currentUser.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--primary-500)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {currentUser.role} {currentUser.student_id_num ? `(${currentUser.student_id_num})` : ''}
                  </div>
                </div>
              </div>

              {/* Quick Role Portal Switcher Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--card-hover)', padding: '4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                <button
                  className={`btn ${currentUser.role === 'student' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => onRoleSwitch('student')}
                  style={{ padding: '4px 12px', fontSize: '11px', borderRadius: 'var(--radius-full)' }}
                  title="Switch to Student Portal"
                >
                  Student
                </button>
                <button
                  className={`btn ${currentUser.role === 'organizer' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => onRoleSwitch('organizer')}
                  style={{ padding: '4px 12px', fontSize: '11px', borderRadius: 'var(--radius-full)' }}
                  title="Switch to Faculty Organizer Portal"
                >
                  Faculty Organizer
                </button>
                <button
                  className={`btn ${currentUser.role === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => onRoleSwitch('admin')}
                  style={{ padding: '4px 12px', fontSize: '11px', borderRadius: 'var(--radius-full)' }}
                  title="Switch to Admin Portal"
                >
                  Admin
                </button>
              </div>

              <button
                className="btn btn-secondary"
                onClick={onLogout}
                style={{ padding: '8px 12px', fontSize: '12px', color: 'var(--danger-500)' }}
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={onOpenLoginModal} style={{ borderRadius: 'var(--radius-full)' }}>
              <LogIn size={18} /> Sign In / Register
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
