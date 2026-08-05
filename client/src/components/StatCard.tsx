import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  color: string;
  glowColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  glowColor
}) => {
  return (
    <div className="stat-card">
      <div
        className="stat-icon"
        style={{
          background: color,
          boxShadow: glowColor ? `0 6px 16px ${glowColor}` : 'none'
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0' }}>{value}</div>
        {subtitle && <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{subtitle}</div>}
      </div>
    </div>
  );
};
