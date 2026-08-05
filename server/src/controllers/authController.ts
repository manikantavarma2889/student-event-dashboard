import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { usersData, User } from '../db/store';
import { generateToken, AuthenticatedRequest } from '../middleware/authMiddleware';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = usersData.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  // Password comparison (accepts Password123 or hashed comparison)
  const isValidPassword = password === 'Password123' || await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const tokenPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    department_id: user.department_id
  };

  const token = generateToken(tokenPayload);

  return res.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department_id: user.department_id,
      student_id_num: user.student_id_num,
      phone: user.phone,
      avatar_url: user.avatar_url
    }
  });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role = 'student', department_id, student_id_num, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }

  const existingUser = usersData.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User with this email already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: usersData.length + 1,
    name,
    email,
    password_hash: hashedPassword,
    role,
    department_id: department_id ? Number(department_id) : 1,
    student_id_num: student_id_num || `STU202600${usersData.length + 1}`,
    phone: phone || null,
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    created_at: new Date().toISOString()
  };

  usersData.push(newUser);

  const tokenPayload = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    department_id: newUser.department_id
  };

  const token = generateToken(tokenPayload);

  return res.status(201).json({
    success: true,
    message: 'User registered successfully.',
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department_id: newUser.department_id,
      student_id_num: newUser.student_id_num,
      phone: newUser.phone,
      avatar_url: newUser.avatar_url
    }
  });
};

export const getMe = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const user = usersData.find(u => u.id === req.user?.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User profile not found.' });
  }

  const { password_hash, ...safeUser } = user;
  return res.json({ success: true, user: safeUser });
};
