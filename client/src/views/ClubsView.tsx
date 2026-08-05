import React from 'react';
import { Target, Users, Calendar, Sparkles, Award } from 'lucide-react';

export const ClubsView: React.FC = () => {
  const clubs = [
    {
      id: 1,
      name: 'AI & Neural Networks Club',
      department: 'Computer Science & Engineering',
      members: 340,
      lead: 'Prof. Alex Rivera',
      description: 'Researching generative AI models, PyTorch deep learning, and hosting monthly AI hackathons.',
      badge: 'Featured'
    },
    {
      id: 2,
      name: 'Robotics & Embedded Systems Society',
      department: 'Electronics & Communication',
      members: 210,
      lead: 'Dr. Marcus Vance',
      description: 'Hands-on IoT prototyping, microcontrollers, autonomous drones, and robotics warfare competitions.',
      badge: 'Active'
    },
    {
      id: 3,
      name: 'CyberSecurity & Defense Guild',
      department: 'Information Technology',
      members: 185,
      lead: 'Dr. Sarah Jenkins',
      description: 'CTF battles, penetration testing ethical hacking, network defense labs, and security audits.',
      badge: 'Active'
    },
    {
      id: 4,
      name: 'E-Cell Startup & Venture Club',
      department: 'School of Management Studies',
      members: 290,
      lead: 'Prof. Elena Rostova',
      description: 'Incubating student startup ideas, venture capital pitch days, and financial modeling workshops.',
      badge: 'Popular'
    }
  ];

  return (
    <div style={{ padding: '28px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>College Student Clubs & Announcements</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Join student organizations, collaborate on technical projects, and participate in club hackathons.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {clubs.map(club => (
          <div key={club.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-info">{club.badge}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{club.members} Members</span>
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{club.name}</h3>
              <p style={{ fontSize: '12px', color: 'var(--primary-500)', fontWeight: 600, marginBottom: '12px' }}>
                {club.department}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                {club.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Lead: {club.lead}</span>
              <button className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                Join Club
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
