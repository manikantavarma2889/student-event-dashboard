import React, { useState } from 'react';
import { Calendar, MapPin, Users, Filter, Plus, CheckCircle, Tag, Trophy, Sparkles, Award } from 'lucide-react';
import { EventItem, UserItem } from '../services/api.ts';

interface EventBrowserViewProps {
  events: EventItem[];
  currentUser: UserItem | null;
  onSelectEvent: (evt: EventItem) => void;
  onOpenCreateModal?: () => void;
  userRegistrations?: number[];
}

export const EventBrowserView: React.FC<EventBrowserViewProps> = ({
  events,
  currentUser,
  onSelectEvent,
  onOpenCreateModal,
  userRegistrations = []
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const categories = ['All', 'Hackathon', 'Workshop', 'Cultural', 'Seminar'];

  const filteredEvents = events.filter(e => {
    const catMatch = selectedCategory === 'All' || e.category === selectedCategory;
    const deptMatch = selectedDept === 'All' || String(e.department_id) === selectedDept;
    return catMatch && deptMatch;
  });

  return (
    <div style={{ padding: '28px' }}>
      {/* SaaS Hero Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.94), rgba(15, 23, 42, 0.96)), url("https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '44px',
          marginBottom: '32px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 'var(--shadow-glow)',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        <div style={{ maxWidth: '680px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: 700, marginBottom: '14px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Sparkles size={14} color="#f59e0b" />
            Connecting Students Beyond Classrooms
          </div>
          
          <h1 style={{ fontSize: '34px', color: 'white', marginBottom: '10px', lineHeight: 1.2 }}>
            Manage Campus Events • Track Participation • Earn Certificates
          </h1>
          <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: 1.5 }}>
            Every Event. Every Student. One Platform. Discover competitions, technical hackathons, workshops, and verified completion credentials.
          </p>
        </div>

        {(currentUser?.role === 'organizer' || currentUser?.role === 'admin') && (
          <button className="btn btn-primary" onClick={onOpenCreateModal} style={{ background: 'white', color: '#4f46e5', fontWeight: 700, boxShadow: '0 8px 24px rgba(255,255,255,0.25)' }}>
            <Plus size={18} />
            Create Event
          </button>
        )}
      </div>

      {/* SaaS Feature Stat Cards (Cleaned of Emoji Symbols) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(79, 70, 229, 0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={20} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Upcoming Events</div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>{events.length} Active</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Registered Students</div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>1,240+ Signups</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={20} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Certificates Earned</div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>890 Issued</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy size={20} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Competitions</div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>12 Live Battles</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory(cat)}
              style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px', fontSize: '13px' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Filter size={16} color="var(--text-muted)" />
          <select
            className="input-field"
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            style={{ width: 'auto', padding: '8px 16px' }}
          >
            <option value="All">All Departments</option>
            <option value="1">Computer Science & Engineering</option>
            <option value="2">Information Technology</option>
            <option value="3">Electronics & Communication</option>
            <option value="5">School of Management</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredEvents.map(evt => {
          const isRegistered = userRegistrations.includes(evt.id);

          return (
            <div
              key={evt.id}
              className="card"
              onClick={() => onSelectEvent(evt)}
              style={{
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <div style={{ position: 'relative', height: '180px' }}>
                <img
                  src={evt.poster_url}
                  alt={evt.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.75) 100%)'
                  }}
                />
                <span
                  className={`badge badge-${evt.status}`}
                  style={{ position: 'absolute', top: '12px', right: '12px' }}
                >
                  {evt.status}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Tag size={14} color="#818cf8" />
                  {evt.category}
                </span>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '17px', marginBottom: '8px', lineHeight: 1.3 }}>{evt.title}</h3>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '13px',
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {evt.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} />
                      {new Date(evt.start_time).toLocaleDateString()}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} />
                      {evt.location}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <Users size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      {evt.registered_count || 0}/{evt.capacity} registered
                    </span>

                    {isRegistered && (
                      <span className="badge badge-success" style={{ fontSize: '11px' }}>
                        <CheckCircle size={12} /> Registered
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
