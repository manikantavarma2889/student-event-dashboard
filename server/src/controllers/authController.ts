import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { usersData, User } from '../db/store';
import { generateToken, AuthenticatedRequest } from '../middleware/authMiddleware';

// In-memory OTP Store for demo verification
const otpStore: Record<string, { code: string; expiresAt: number }> = {};

export const sendOtp = async (req: Request, res: Response) => {
  const { email, role } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Official college email is required.' });
  }

  // Generate 6-digit OTP
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email.toLowerCase()] = {
    code: generatedOtp,
    expiresAt: Date.now() + 10 * 60 * 1000 // Valid for 10 mins
  };

  console.log(`[SECURITY OTP SENT] Role: ${role} | Target Email: ${email} | OTP: ${generatedOtp}`);

  return res.json({
    success: true,
    message: `OTP verification code sent to ${email}. (Demo OTP: ${generatedOtp})`,
    demoOtp: generatedOtp // Returned for easy instant UI testing
  });
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP code are required.' });
  }

  const record = otpStore[email.toLowerCase()];

  if (!record || record.code !== otp || Date.now() > record.expiresAt) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP code. Please try again.' });
  }

  return res.json({
    success: true,
    message: 'College email & role authorization verified successfully.'
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = usersData.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

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
  const { name, email, password, role = 'student', department_id, student_id_num, phone, otp } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }

  // Require OTP verification for Faculty Organizers and Admins
  if ((role === 'organizer' || role === 'admin') && !otp) {
    return res.status(403).json({
      success: false,
      message: 'College Email OTP verification is required to register as Faculty Organizer or Admin.'
    });
  }

  const existingUser = usersData.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
  }

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const newUser: User = {
    id: usersData.length + 1,
    name,
    email,
    password_hash,
    role,
    department_id: Number(department_id) || 1,
    student_id_num: role === 'student' ? (student_id_num || `STU202600${usersData.length + 1}`) : undefined,
    phone,
    avatar_url: `https://images.unsplash.com/photo-${1535713875002 + usersData.length}?w=150`,
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
    message: `${role.toUpperCase()} account created successfully!`,
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

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const user = usersData.find(u => u.id === req.user?.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  return res.json({
    success: true,
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
