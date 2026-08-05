import React from 'react';
import { 
  Home,
  Calendar, 
  Target, 
  Trophy, 
  Award, 
  Settings,
  Users, 
  GraduationCap,
  PlusSquare,
  CheckSquare,
  BarChart3,
  LogIn
} from 'lucide-react';
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

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="brand-logo">
        <div className="brand-icon">
          <GraduationCap size={22} />
        </div>
        <div>
          <h2 style={{ fontSize: '19px', color: 'var(--text-primary)', lineHeight: 1.1 }}>CampusConnect</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
            STUDENT EVENT PORTAL
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '12px', paddingLeft: '12px' }}>
            {isLoggedIn ? `PORTAL (${role.toUpperCase()})` : 'PUBLIC GUEST ACCESS'}
          </div>

          {/* Main Dashboard (Always Visible) */}
          <div
            className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <Home size={18} />
            <span>Main Dashboard</span>
          </div>

          {/* AFTER LOGIN ONLY: SHOW ALL EXTRA SECTIONS */}
          {isLoggedIn && (
            <>
              {/* Events & Hackathons */}
              <div
                className={`nav-item ${activeTab === 'events-list' ? 'active' : ''}`}
                onClick={() => setActiveTab('events')}
              >
                <Calendar size={18} />
                <span>Events & Hackathons</span>
              </div>

              {/* Clubs & Announcements */}
              <div
                className={`nav-item ${activeTab === 'clubs' ? 'active' : ''}`}
                onClick={() => setActiveTab('clubs')}
              >
                <Target size={18} />
                <span>Clubs & Announcements</span>
              </div>

              {/* Competitions */}
              <div
                className={`nav-item ${activeTab === 'competitions' ? 'active' : ''}`}
                onClick={() => setActiveTab('competitions')}
              >
                <Trophy size={18} />
                <span>Competitions</span>
              </div>

              {/* Certificates Vault */}
              <div
                className={`nav-item ${activeTab === 'certificates' || activeTab === 'my-registrations' ? 'active' : ''}`}
                onClick={() => setActiveTab('certificates')}
              >
                <Award size={18} />
                <span>Certificates Vault</span>
              </div>

              {/* Role Specific Control Tabs */}
              {role === 'organizer' && (
                <>
                  <div
                    className={`nav-item ${activeTab === 'manage-events' ? 'active' : ''}`}
                    onClick={() => setActiveTab('manage-events')}
                  >
                    <PlusSquare size={18} />
                    <span>Manage Events</span>
                  </div>
                  <div
                    className={`nav-item ${activeTab === 'attendance' ? 'active' : ''}`}
                    onClick={() => setActiveTab('attendance')}
                  >
                    <CheckSquare size={18} />
                    <span>QR Check-In Roster</span>
                  </div>
                </>
              )}

              {role === 'admin' && (
                <>
                  <div
                    className={`nav-item ${activeTab === 'admin-analytics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('admin-analytics')}
                  >
                    <BarChart3 size={18} />
                    <span>Executive Analytics</span>
                  </div>
                  <div
                    className={`nav-item ${activeTab === 'user-management' ? 'active' : ''}`}
                    onClick={() => setActiveTab('user-management')}
                  >
                    <Users size={18} />
                    <span>User Controls</span>
                  </div>
                </>
              )}

              {/* Settings */}
              <div
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={18} />
                <span>Platform Settings</span>
              </div>
            </>
          )}
        </div>

        {/* Footer Prompt */}
        {!isLoggedIn ? (
          <div className="card" style={{ padding: '16px', background: 'var(--card-hover)', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Sign in to register for events and claim certificates.
            </p>
            <button className="btn btn-primary" onClick={onOpenLoginModal} style={{ width: '100%', fontSize: '13px' }}>
              <LogIn size={16} /> Sign In / Register
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
