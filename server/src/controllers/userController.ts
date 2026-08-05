import { Response } from 'express';
import { usersData, departmentsData, User } from '../db/store';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import bcrypt from 'bcryptjs';

export const getAllUsers = (req: AuthenticatedRequest, res: Response) => {
  const { role, search, department_id } = req.query;

  let filtered = [...usersData];

  if (role) {
    filtered = filtered.filter(u => u.role === role);
  }

  if (department_id) {
    filtered = filtered.filter(u => u.department_id === Number(department_id));
  }

  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(u => 
      u.name.toLowerCase().includes(q) || 
      u.email.toLowerCase().includes(q) || 
      (u.student_id_num && u.student_id_num.toLowerCase().includes(q))
    );
  }

  const safeUsers = filtered.map(u => {
    const { password_hash, ...safe } = u;
    const dept = departmentsData.find(d => d.id === u.department_id);
    return {
      ...safe,
      department_name: dept ? dept.name : 'Unassigned'
    };
  });

  return res.json({ success: true, count: safeUsers.length, data: safeUsers });
};

export const updateUserRole = (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { role, department_id } = req.body;

  const user = usersData.find(u => u.id === Number(id));
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  if (role && ['admin', 'organizer', 'student'].includes(role)) {
    user.role = role;
  }

  if (department_id !== undefined) {
    user.department_id = Number(department_id);
  }

  const { password_hash, ...safe } = user;

  return res.json({ success: true, message: 'User role updated successfully.', data: safe });
};

export const createUser = async (req: AuthenticatedRequest, res: Response) => {
  const { name, email, password, role = 'student', department_id, student_id_num, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password required.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: usersData.length + 1,
    name,
    email,
    password_hash: hashedPassword,
    role,
    department_id: department_id ? Number(department_id) : 1,
    student_id_num: student_id_num || null,
    phone: phone || null,
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    created_at: new Date().toISOString()
  };

  usersData.push(newUser);
  const { password_hash, ...safe } = newUser;

  return res.status(201).json({ success: true, message: 'User created.', data: safe });
};
