import React from 'react';
import { Home, Calendar, Target, Trophy, Award, Settings, Users, GraduationCap, PlusSquare, CheckSquare, BarChart3, LogIn } from 'lucide-react';
import { UserItem } from '../services/api.ts';

interface SidebarProps {
  currentUser: UserItem | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLoginModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentUser, activeTab, setActiveTab, onOpenLoginModal }) => {
  const isLoggedIn = !!currentUser;
  const role = currentUser?.role || 'guest';

  const navButton = (label: string, tab: string, Icon: React.ElementType, current = activeTab === tab) => (
    <button
      type="button"
      className={`nav-item ${current ? 'active' : ''}`}
      onClick={() => setActiveTab(tab)}
      aria-current={current ? 'page' : undefined}
    >
      <Icon size={18} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );

  return (
    <aside className="sidebar" aria-label="CampusConnect portal navigation">
      <div className="brand-logo">
        <div className="brand-icon" aria-hidden="true"><GraduationCap size={22} /></div>
        <div>
          <h2 style={{ fontSize: '19px', color: 'var(--text-primary)', lineHeight: 1.1 }}>CampusConnect</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
            STUDENT EVENT PORTAL
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <div>
          <p id="portal-nav-label" style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '12px', paddingLeft: '12px' }}>
            {isLoggedIn ? `PORTAL (${role.toUpperCase()})` : 'PUBLIC GUEST ACCESS'}
          </p>

          <nav aria-labelledby="portal-nav-label">
            {navButton('Main Dashboard', 'events', Home)}

            {isLoggedIn && (
              <>
                {navButton('Events & Hackathons', 'events', Calendar)}
                {navButton('Clubs & Announcements', 'clubs', Target)}
                {navButton('Competitions', 'competitions', Trophy)}
                {navButton('Certificates Vault', 'certificates', Award, activeTab === 'certificates' || activeTab === 'my-registrations')}

                {role === 'organizer' && (
                  <>
                    {navButton('Manage Events', 'manage-events', PlusSquare)}
                    {navButton('QR Check-In Roster', 'attendance', CheckSquare)}
                  </>
                )}

                {role === 'admin' && (
                  <>
                    {navButton('Executive Analytics', 'admin-analytics', BarChart3)}
                    {navButton('User Controls', 'user-management', Users)}
                  </>
                )}

                {navButton('Platform Settings', 'settings', Settings)}
              </>
            )}
          </nav>
        </div>

        {!isLoggedIn ? (
          <div className="card" style={{ padding: '16px', background: 'var(--card-hover)', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Sign in to register for events and claim certificates.
            </p>
            <button type="button" className="btn btn-primary" onClick={onOpenLoginModal} style={{ width: '100%', fontSize: '13px' }}>
              <LogIn size={16} aria-hidden="true" /> Sign In / Register
            </button>
          </div>
        ) : (
          <div className="card" style={{ padding: '14px', background: 'var(--card-hover)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Connecting Students Beyond Classrooms • Every Event. Every Student.
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
