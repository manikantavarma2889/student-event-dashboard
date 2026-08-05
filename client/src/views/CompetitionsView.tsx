import React from 'react';
import { Trophy, Award, Users, Calendar, ArrowRight } from 'lucide-react';

export const CompetitionsView: React.FC = () => {
  const competitions = [
    {
      id: 1,
      title: 'Technovate 24-Hour CodeSprint 2026',
      prize: '$5,000 Cash Prize Pool',
      deadline: '2026-08-30',
      teamsCount: 42,
      category: 'Coding Battle',
      status: 'Registration Open'
    },
    {
      id: 2,
      title: 'Autonomous Robotics Obstacle Challenge',
      prize: '$3,500 Innovation Grant',
      deadline: '2026-08-28',
      teamsCount: 28,
      category: 'Robotics',
      status: 'Live'
    },
    {
      id: 3,
      title: 'Venture Capital Startup Pitch Contest',
      prize: '$10,000 Seed Funding',
      deadline: '2026-09-05',
      teamsCount: 35,
      category: 'Entrepreneurship',
      status: 'Upcoming'
    }
  ];

  return (
    <div style={{ padding: '28px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>Inter-College Competitions & Hackathons</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Compete in technical battles, win grant funding, and rank on college leaderboards.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {competitions.map(comp => (
          <div key={comp.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-success">{comp.status}</span>
                <span style={{ fontSize: '12px', color: 'var(--warning-500)', fontWeight: 700 }}>{comp.prize}</span>
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{comp.title}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Category: {comp.category} • Teams Joined: {comp.teamsCount}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Deadline: {comp.deadline}</span>
              <button className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                Enter Competition <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
