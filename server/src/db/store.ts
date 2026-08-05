// Database Access Layer with Supabase / PostgreSQL Ready Interfaces and Local Fallback Store

export interface Department {
  id: number;
  name: string;
  code: string;
  created_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'organizer' | 'student';
  department_id?: number | null;
  student_id_num?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  created_at: string;
}

export interface EventItem {
  id: number;
  title: string;
  description: string;
  category: string;
  department_id?: number | null;
  organizer_id: number;
  location: string;
  start_time: string;
  end_time: string;
  capacity: number;
  poster_url: string;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  registration_deadline?: string | null;
  created_at: string;
}

export interface Registration {
  id: number;
  event_id: number;
  student_id: number;
  registered_at: string;
  status: 'registered' | 'attended' | 'cancelled';
  qr_code_token: string;
}

export interface Attendance {
  id: number;
  event_id: number;
  student_id: number;
  marked_by?: number | null;
  marked_at: string;
  method: 'manual' | 'qr_scan';
}

export interface Certificate {
  id: number;
  event_id: number;
  student_id: number;
  certificate_number: string;
  issue_date: string;
  pdf_url: string;
}

export interface NotificationItem {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

// In-Memory Data Store (Initialized with Seed Data)
export const departmentsData: Department[] = [
  { id: 1, name: 'Computer Science & Engineering', code: 'CSE', created_at: new Date().toISOString() },
  { id: 2, name: 'Information Technology', code: 'IT', created_at: new Date().toISOString() },
  { id: 3, name: 'Electronics & Communication', code: 'ECE', created_at: new Date().toISOString() },
  { id: 4, name: 'Mechanical Engineering', code: 'MECH', created_at: new Date().toISOString() },
  { id: 5, name: 'School of Management Studies', code: 'SMS', created_at: new Date().toISOString() }
];

export const usersData: User[] = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    email: 'admin@college.edu',
    password_hash: '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f', // Password123
    role: 'admin',
    department_id: 1,
    phone: '+1-555-0101',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Prof. Alex Rivera',
    email: 'alex.rivera@college.edu',
    password_hash: '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f',
    role: 'organizer',
    department_id: 1,
    phone: '+1-555-0102',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Dr. Marcus Vance',
    email: 'marcus.vance@college.edu',
    password_hash: '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f',
    role: 'organizer',
    department_id: 3,
    phone: '+1-555-0103',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Prof. Elena Rostova',
    email: 'elena.rostova@college.edu',
    password_hash: '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f',
    role: 'organizer',
    department_id: 5,
    phone: '+1-555-0104',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Liam Chen',
    email: 'liam.chen@student.college.edu',
    password_hash: '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f',
    role: 'student',
    department_id: 1,
    student_id_num: 'STU2024001',
    phone: '+1-555-0201',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    name: 'Sophia Martinez',
    email: 'sophia.m@student.college.edu',
    password_hash: '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f',
    role: 'student',
    department_id: 2,
    student_id_num: 'STU2024002',
    phone: '+1-555-0202',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    created_at: new Date().toISOString()
  },
  {
    id: 7,
    name: 'Ethan Wright',
    email: 'ethan.w@student.college.edu',
    password_hash: '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f',
    role: 'student',
    department_id: 3,
    student_id_num: 'STU2024003',
    phone: '+1-555-0203',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    created_at: new Date().toISOString()
  },
  {
    id: 8,
    name: 'Mia Patel',
    email: 'mia.patel@student.college.edu',
    password_hash: '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f',
    role: 'student',
    department_id: 1,
    student_id_num: 'STU2024004',
    phone: '+1-555-0204',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    created_at: new Date().toISOString()
  },
  {
    id: 9,
    name: 'Noah Taylor',
    email: 'noah.t@student.college.edu',
    password_hash: '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f',
    role: 'student',
    department_id: 4,
    student_id_num: 'STU2024005',
    phone: '+1-555-0205',
    avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    created_at: new Date().toISOString()
  }
];

export const eventsData: EventItem[] = [
  {
    id: 1,
    title: 'AI & Machine Learning Innovation Summit 2026',
    description: 'A 2-day hands-on hackathon and workshop covering generative AI, neural networks, and real-world deployment.',
    category: 'Hackathon',
    department_id: 1,
    organizer_id: 2,
    location: 'Main Auditorium & CS Lab 3',
    start_time: '2026-08-15T09:00:00Z',
    end_time: '2026-08-16T17:00:00Z',
    capacity: 120,
    poster_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    status: 'published',
    registration_deadline: '2026-08-14T23:59:59Z',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Robotics & IoT Prototyping Workshop',
    description: 'Build smart embedded devices using Arduino and Raspberry Pi with live demo competitions.',
    category: 'Workshop',
    department_id: 3,
    organizer_id: 3,
    location: 'ECE Advanced Research Lab',
    start_time: '2026-08-20T10:00:00Z',
    end_time: '2026-08-20T16:00:00Z',
    capacity: 60,
    poster_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    status: 'published',
    registration_deadline: '2026-08-19T18:00:00Z',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Annual Inter-College Tech Fest: Technovate 2026',
    description: 'The largest college fest featuring coding battles, project expos, quiz competitions, and keynote talks.',
    category: 'Cultural',
    department_id: 1,
    organizer_id: 2,
    location: 'College Campus Ground',
    start_time: '2026-09-01T08:30:00Z',
    end_time: '2026-09-03T20:00:00Z',
    capacity: 500,
    poster_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    status: 'published',
    registration_deadline: '2026-08-30T23:59:59Z',
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    title: 'Entrepreneurship & Startup Pitch Day',
    description: 'Present innovative business ideas to venture capitalists and industry mentors for seed funding.',
    category: 'Seminar',
    department_id: 5,
    organizer_id: 4,
    location: 'Management Seminar Hall B',
    start_time: '2026-07-10T09:30:00Z',
    end_time: '2026-07-10T15:30:00Z',
    capacity: 80,
    poster_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
    status: 'completed',
    registration_deadline: '2026-07-09T23:59:59Z',
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    title: 'Cybersecurity & Ethical Hacking Bootcamp',
    description: 'Learn penetration testing, network defense, and zero-trust security concepts with certified trainers.',
    category: 'Workshop',
    department_id: 2,
    organizer_id: 2,
    location: 'IT Cyber Security Lab',
    start_time: '2026-07-22T09:00:00Z',
    end_time: '2026-07-22T17:00:00Z',
    capacity: 75,
    poster_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    status: 'completed',
    registration_deadline: '2026-07-21T23:59:59Z',
    created_at: new Date().toISOString()
  }
];

export const registrationsData: Registration[] = [
  { id: 1, event_id: 1, student_id: 5, registered_at: '2026-08-01T10:00:00Z', status: 'registered', qr_code_token: 'QR_EVT1_STU5_88329' },
  { id: 2, event_id: 1, student_id: 6, registered_at: '2026-08-02T11:30:00Z', status: 'registered', qr_code_token: 'QR_EVT1_STU6_99482' },
  { id: 3, event_id: 1, student_id: 7, registered_at: '2026-08-03T14:15:00Z', status: 'registered', qr_code_token: 'QR_EVT1_STU7_12048' },
  { id: 4, event_id: 2, student_id: 5, registered_at: '2026-08-02T09:20:00Z', status: 'registered', qr_code_token: 'QR_EVT2_STU5_33910' },
  { id: 5, event_id: 2, student_id: 8, registered_at: '2026-08-04T16:00:00Z', status: 'registered', qr_code_token: 'QR_EVT2_STU8_55492' },
  { id: 6, event_id: 4, student_id: 5, registered_at: '2026-07-05T10:00:00Z', status: 'attended', qr_code_token: 'QR_EVT4_STU5_44810' },
  { id: 7, event_id: 4, student_id: 6, registered_at: '2026-07-06T12:00:00Z', status: 'attended', qr_code_token: 'QR_EVT4_STU6_66201' },
  { id: 8, event_id: 4, student_id: 8, registered_at: '2026-07-07T15:00:00Z', status: 'attended', qr_code_token: 'QR_EVT4_STU8_77491' },
  { id: 9, event_id: 5, student_id: 5, registered_at: '2026-07-15T09:00:00Z', status: 'attended', qr_code_token: 'QR_EVT5_STU5_11928' },
  { id: 10, event_id: 5, student_id: 7, registered_at: '2026-07-16T11:00:00Z', status: 'attended', qr_code_token: 'QR_EVT5_STU7_22910' },
  { id: 11, event_id: 5, student_id: 9, registered_at: '2026-07-18T14:00:00Z', status: 'attended', qr_code_token: 'QR_EVT5_STU9_33819' }
];

export const attendanceData: Attendance[] = [
  { id: 1, event_id: 4, student_id: 5, marked_by: 4, marked_at: '2026-07-10T09:35:00Z', method: 'qr_scan' },
  { id: 2, event_id: 4, student_id: 6, marked_by: 4, marked_at: '2026-07-10T09:40:00Z', method: 'manual' },
  { id: 3, event_id: 4, student_id: 8, marked_by: 4, marked_at: '2026-07-10T09:45:00Z', method: 'manual' },
  { id: 4, event_id: 5, student_id: 5, marked_by: 2, marked_at: '2026-07-22T09:05:00Z', method: 'qr_scan' },
  { id: 5, event_id: 5, student_id: 7, marked_by: 2, marked_at: '2026-07-22T09:12:00Z', method: 'manual' },
  { id: 6, event_id: 5, student_id: 9, marked_by: 2, marked_at: '2026-07-22T09:15:00Z', method: 'qr_scan' }
];

export const certificatesData: Certificate[] = [
  { id: 1, event_id: 4, student_id: 5, certificate_number: 'CERT-2026-EVT4-STU5-001', issue_date: '2026-07-11T10:00:00Z', pdf_url: '/api/certificates/download/1' },
  { id: 2, event_id: 4, student_id: 6, certificate_number: 'CERT-2026-EVT4-STU6-002', issue_date: '2026-07-11T10:00:00Z', pdf_url: '/api/certificates/download/2' },
  { id: 3, event_id: 4, student_id: 8, certificate_number: 'CERT-2026-EVT4-STU8-003', issue_date: '2026-07-11T10:00:00Z', pdf_url: '/api/certificates/download/3' },
  { id: 4, event_id: 5, student_id: 5, certificate_number: 'CERT-2026-EVT5-STU5-004', issue_date: '2026-07-23T10:00:00Z', pdf_url: '/api/certificates/download/4' },
  { id: 5, event_id: 5, student_id: 7, certificate_number: 'CERT-2026-EVT5-STU7-005', issue_date: '2026-07-23T10:00:00Z', pdf_url: '/api/certificates/download/5' },
  { id: 6, event_id: 5, student_id: 9, certificate_number: 'CERT-2026-EVT5-STU9-006', issue_date: '2026-07-23T10:00:00Z', pdf_url: '/api/certificates/download/6' }
];

export const notificationsData: NotificationItem[] = [
  { id: 1, user_id: 5, title: 'Registration Confirmed!', message: 'You have successfully registered for AI & Machine Learning Innovation Summit 2026.', type: 'success', is_read: false, created_at: new Date().toISOString() },
  { id: 2, user_id: 5, title: 'Certificate Issued', message: 'Your certificate for Cybersecurity & Ethical Hacking Bootcamp is ready.', type: 'info', is_read: false, created_at: new Date().toISOString() },
  { id: 3, user_id: 2, title: 'New Registrations', message: 'Liam Chen registered for AI & Machine Learning Summit.', type: 'event', is_read: true, created_at: new Date().toISOString() }
];
