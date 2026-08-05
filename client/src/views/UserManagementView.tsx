import React, { useState } from 'react';
import { Users, Shield, Plus, Edit } from 'lucide-react';
import { UserItem } from '../services/api';

interface UserManagementViewProps {
  users: UserItem[];
  onUpdateRole: (userId: number, role: string, deptId?: number) => void;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({ users, onUpdateRole }) => {
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const filteredUsers = users.filter(u => selectedRole === 'all' || u.role === selectedRole);

  return (
    <div style={{ padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>User & Access Control Center</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Manage platform accounts, assign faculty roles, and update student department access.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'admin', 'organizer', 'student'].map(r => (
            <button
              key={r}
              className={`btn ${selectedRole === r ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedRole(r)}
              style={{ borderRadius: 'var(--radius-full)', padding: '6px 16px', fontSize: '12px', textTransform: 'capitalize' }}
            >
              {r} ({users.filter(u => r === 'all' || u.role === r).length})
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>User Name</th>
                <th style={{ padding: '12px' }}>Email</th>
                <th style={{ padding: '12px' }}>System Role</th>
                <th style={{ padding: '12px' }}>Department</th>
                <th style={{ padding: '12px' }}>Student Roll No</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Role Assignment</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 12px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
                    <img src={user.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} alt={user.name} style={{ width: '34px', height: '34px', borderRadius: '50%' }} />
                    {user.name}
                  </td>
                  <td style={{ padding: '14px 12px' }}>{user.email}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <span className={`badge badge-${user.role === 'admin' ? 'danger' : user.role === 'organizer' ? 'warning' : 'info'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px' }}>{user.department_name || 'CSE'}</td>
                  <td style={{ padding: '14px 12px' }}>{user.student_id_num || 'N/A'}</td>
                  <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                    <select
                      className="input-field"
                      value={user.role}
                      onChange={e => onUpdateRole(user.id, e.target.value)}
                      style={{ width: 'auto', padding: '4px 10px', fontSize: '12px' }}
                    >
                      <option value="student">Student</option>
                      <option value="organizer">Organizer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
