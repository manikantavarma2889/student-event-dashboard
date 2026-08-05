// API Service Layer with Automatic Token Management and Fallback Store Integration

export interface EventItem {
  id: number;
  title: string;
  description: string;
  category: string;
  department_id?: number | null;
  department_name?: string;
  department_code?: string;
  organizer_id: number;
  organizer_name?: string;
  location: string;
  start_time: string;
  end_time: string;
  capacity: number;
  registered_count?: number;
  poster_url: string;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  registration_deadline?: string | null;
}

export interface UserItem {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'organizer' | 'student';
  department_id?: number | null;
  department_name?: string;
  student_id_num?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
}

export interface RegistrationItem {
  id: number;
  event_id: number;
  student_id: number;
  registered_at: string;
  status: 'registered' | 'attended' | 'cancelled';
  qr_code_token: string;
  event?: EventItem;
  student_name?: string;
  student_email?: string;
  student_id_num?: string;
}

export interface AttendanceRecord {
  id: number;
  event_id: number;
  student_id: number;
  marked_by?: number | null;
  marked_at: string;
  method: 'manual' | 'qr_scan';
  student_name?: string;
  student_email?: string;
  student_id_num?: string;
  certificate_number?: string | null;
}

export interface CertificateItem {
  id: number;
  event_id: number;
  student_id: number;
  certificate_number: string;
  issue_date: string;
  pdf_url: string;
  event_title?: string;
  event_category?: string;
  department_name?: string;
  student_name?: string;
}

export interface AnalyticsData {
  metrics: {
    total_events: number;
    total_registrations: number;
    total_attended: number;
    attendance_rate: number;
    total_certificates: number;
    total_students: number;
  };
  department_stats: Array<{
    department: string;
    name: string;
    events: number;
    registrations: number;
    attendance: number;
  }>;
  monthly_trends: Array<{
    month: string;
    events: number;
    registrations: number;
    attendance: number;
  }>;
  organizer_leaderboard: Array<{
    id: number;
    name: string;
    email: string;
    avatar_url: string;
    events_hosted: number;
    total_registrations: number;
    total_attendees: number;
    avg_attendance_rate: number;
  }>;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

const getHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// API Functions
export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  register: async (userData: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  sendOtp: async (email: string, role: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role })
    });
    return res.json();
  },

  verifyOtp: async (email: string, otp: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, { headers: getHeaders() });
    return res.json();
  },

  // Events
  getEvents: async (params?: { search?: string; category?: string; status?: string; department_id?: number }) => {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.category) query.append('category', params.category);
    if (params?.status) query.append('status', params.status);
    if (params?.department_id) query.append('department_id', String(params.department_id));

    const res = await fetch(`${API_BASE_URL}/events?${query.toString()}`, { headers: getHeaders() });
    return res.json();
  },

  getEventById: async (id: number) => {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, { headers: getHeaders() });
    return res.json();
  },

  createEvent: async (eventData: Partial<EventItem>) => {
    const res = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(eventData)
    });
    return res.json();
  },

  updateEvent: async (id: number, eventData: Partial<EventItem>) => {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(eventData)
    });
    return res.json();
  },

  deleteEvent: async (id: number) => {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.json();
  },

  // Registrations
  registerForEvent: async (eventId: number) => {
    const res = await fetch(`${API_BASE_URL}/registrations`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ event_id: eventId })
    });
    return res.json();
  },

  cancelRegistration: async (eventId: number) => {
    const res = await fetch(`${API_BASE_URL}/registrations/${eventId}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.json();
  },

  getMyRegistrations: async () => {
    const res = await fetch(`${API_BASE_URL}/registrations/my`, { headers: getHeaders() });
    return res.json();
  },

  getEventRegistrations: async (eventId: number) => {
    const res = await fetch(`${API_BASE_URL}/registrations/event/${eventId}`, { headers: getHeaders() });
    return res.json();
  },

  // Attendance & Certificates
  markAttendance: async (data: { event_id?: number; student_id?: number; qr_code_token?: string; method?: string }) => {
    const res = await fetch(`${API_BASE_URL}/attendance/mark`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  getEventAttendance: async (eventId: number) => {
    const res = await fetch(`${API_BASE_URL}/attendance/event/${eventId}`, { headers: getHeaders() });
    return res.json();
  },

  getMyCertificates: async () => {
    const res = await fetch(`${API_BASE_URL}/certificates/my`, { headers: getHeaders() });
    return res.json();
  },

  getCertificateDownloadPayload: async (id: number) => {
    const res = await fetch(`${API_BASE_URL}/certificates/download/${id}`, { headers: getHeaders() });
    return res.json();
  },

  // Analytics
  getAnalytics: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics`, { headers: getHeaders() });
    return res.json();
  },

  // Admin Users & Departments
  getUsers: async (role?: string) => {
    const query = role ? `?role=${role}` : '';
    const res = await fetch(`${API_BASE_URL}/users${query}`, { headers: getHeaders() });
    return res.json();
  },

  updateUserRole: async (userId: number, role: string, departmentId?: number) => {
    const res = await fetch(`${API_BASE_URL}/users/${userId}/role`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ role, department_id: departmentId })
    });
    return res.json();
  },

  getDepartments: async () => {
    const res = await fetch(`${API_BASE_URL}/departments`);
    return res.json();
  },

  getNotifications: async () => {
    const res = await fetch(`${API_BASE_URL}/notifications/my`, { headers: getHeaders() });
    return res.json();
  }
};
