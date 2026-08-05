import React from 'react';
import { UserItem } from '../services/api.ts';
import { Settings, Shield, Bell, Moon, User } from 'lucide-react';

interface SettingsViewProps {
  currentUser: UserItem | null;
  theme: string;
  toggleTheme: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ currentUser, theme, toggleTheme }) => {
  return (
    <div style={{ padding: '28px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>Platform & Account Settings</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Manage your account profile, notification preferences, and system theme.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* User Profile Card */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="var(--primary-500)" /> User Profile Credentials
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Name:</span>
              <div style={{ fontWeight: 700 }}>{currentUser?.name || 'Guest User'}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Email:</span>
              <div style={{ fontWeight: 600 }}>{currentUser?.email || 'N/A'}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Role:</span>
              <div style={{ fontWeight: 700, color: 'var(--primary-500)', textTransform: 'uppercase' }}>
                {currentUser?.role || 'Guest'}
              </div>
            </div>
            {currentUser?.student_id_num && (
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Student Roll No:</span>
                <div style={{ fontWeight: 600 }}>{currentUser.student_id_num}</div>
              </div>
            )}
          </div>
        </div>

        {/* System Preferences */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={18} color="var(--primary-500)" /> Interface & Theme
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <strong style={{ fontSize: '14px' }}>Dark / Light Theme Mode</strong>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Current theme: {theme.toUpperCase()}</p>
            </div>
            <button className="btn btn-secondary" onClick={toggleTheme}>
              <Moon size={16} /> Toggle Theme
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <strong style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>Event Notifications</strong>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Email and in-app alerts are active for event signups.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
