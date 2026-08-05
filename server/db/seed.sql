-- Seed Data for Student Event Management & Analytics Platform

-- 1. Insert Departments
INSERT INTO departments (id, name, code) VALUES
(1, 'Computer Science & Engineering', 'CSE'),
(2, 'Information Technology', 'IT'),
(3, 'Electronics & Communication', 'ECE'),
(4, 'Mechanical Engineering', 'MECH'),
(5, 'School of Management Studies', 'SMS')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Users (Password for all seed users: Password123 hashed via bcrypt)
-- Hash: $2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f
INSERT INTO users (id, name, email, password_hash, role, department_id, student_id_num, phone, avatar_url) VALUES
-- Admin
(1, 'Dr. Sarah Jenkins', 'admin@college.edu', '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f', 'admin', 1, NULL, '+1-555-0101', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'),

-- Organizers
(2, 'Prof. Alex Rivera', 'alex.rivera@college.edu', '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f', 'organizer', 1, NULL, '+1-555-0102', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
(3, 'Dr. Marcus Vance', 'marcus.vance@college.edu', '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f', 'organizer', 3, NULL, '+1-555-0103', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
(4, 'Prof. Elena Rostova', 'elena.rostova@college.edu', '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f', 'organizer', 5, NULL, '+1-555-0104', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150'),

-- Students
(5, 'Liam Chen', 'liam.chen@student.college.edu', '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f', 'student', 1, 'STU2024001', '+1-555-0201', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'),
(6, 'Sophia Martinez', 'sophia.m@student.college.edu', '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f', 'student', 2, 'STU2024002', '+1-555-0202', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'),
(7, 'Ethan Wright', 'ethan.w@student.college.edu', '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f', 'student', 3, 'STU2024003', '+1-555-0203', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'),
(8, 'Mia Patel', 'mia.patel@student.college.edu', '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f', 'student', 1, 'STU2024004', '+1-555-0204', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'),
(9, 'Noah Taylor', 'noah.t@student.college.edu', '$2a$10$wN9i07f0wF35F1HqJ0aLteL9yqD0d1D6RkC4U5a5w7b9b1c3d5e7f', 'student', 4, 'STU2024005', '+1-555-0205', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Events
INSERT INTO events (id, title, description, category, department_id, organizer_id, location, start_time, end_time, capacity, poster_url, status, registration_deadline) VALUES
(1, 'AI & Machine Learning Innovation Summit 2026', 'A 2-day hands-on hackathon and workshop covering generative AI, neural networks, and real-world deployment.', 'Hackathon', 1, 2, 'Main Auditorium & CS Lab 3', '2026-08-15 09:00:00+00', '2026-08-16 17:00:00+00', 120, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800', 'published', '2026-08-14 23:59:59+00'),
(2, 'Robotics & IoT Prototyping Workshop', 'Build smart embedded devices using Arduino and Raspberry Pi with live demo competitions.', 'Workshop', 3, 3, 'ECE Advanced Research Lab', '2026-08-20 10:00:00+00', '2026-08-20 16:00:00+00', 60, 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', 'published', '2026-08-19 18:00:00+00'),
(3, 'Annual Inter-College Tech Fest: Technovate 2026', 'The largest college fest featuring coding battles, project expos, quiz competitions, and keynote talks.', 'Cultural', 1, 2, 'College Campus Ground', '2026-09-01 08:30:00+00', '2026-09-03 20:00:00+00', 500, 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 'published', '2026-08-30 23:59:59+00'),
(4, 'Entrepreneurship & Startup Pitch Day', 'Present innovative business ideas to venture capitalists and industry mentors for seed funding.', 'Seminar', 5, 4, 'Management Seminar Hall B', '2026-07-10 09:30:00+00', '2026-07-10 15:30:00+00', 80, 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', 'completed', '2026-07-09 23:59:59+00'),
(5, 'Cybersecurity & Ethical Hacking Bootcamp', 'Learn penetration testing, network defense, and zero-trust security concepts with certified trainers.', 'Workshop', 2, 2, 'IT Cyber Security Lab', '2026-07-22 09:00:00+00', '2026-07-22 17:00:00+00', 75, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', 'completed', '2026-07-21 23:59:59+00')
ON CONFLICT (id) DO NOTHING;

-- 4. Registrations
INSERT INTO registrations (id, event_id, student_id, status, qr_code_token) VALUES
(1, 1, 5, 'registered', 'QR_EVT1_STU5_88329'),
(2, 1, 6, 'registered', 'QR_EVT1_STU6_99482'),
(3, 1, 7, 'registered', 'QR_EVT1_STU7_12048'),
(4, 2, 5, 'registered', 'QR_EVT2_STU5_33910'),
(5, 2, 8, 'registered', 'QR_EVT2_STU8_55492'),
(6, 4, 5, 'attended', 'QR_EVT4_STU5_44810'),
(7, 4, 6, 'attended', 'QR_EVT4_STU6_66201'),
(8, 4, 8, 'attended', 'QR_EVT4_STU8_77491'),
(9, 5, 5, 'attended', 'QR_EVT5_STU5_11928'),
(10, 5, 7, 'attended', 'QR_EVT5_STU7_22910'),
(11, 5, 9, 'attended', 'QR_EVT5_STU9_33819')
ON CONFLICT (id) DO NOTHING;

-- 5. Attendance Records
INSERT INTO attendance (id, event_id, student_id, marked_by, method) VALUES
(1, 4, 5, 4, 'qr_scan'),
(2, 4, 6, 4, 'manual'),
(3, 4, 8, 4, 'manual'),
(4, 5, 5, 2, 'qr_scan'),
(5, 5, 7, 2, 'manual'),
(6, 5, 9, 2, 'qr_scan')
ON CONFLICT (id) DO NOTHING;

-- 6. Certificates
INSERT INTO certificates (id, event_id, student_id, certificate_number, pdf_url) VALUES
(1, 4, 5, 'CERT-2026-EVT4-STU5-001', '/api/certificates/download/1'),
(2, 4, 6, 'CERT-2026-EVT4-STU6-002', '/api/certificates/download/2'),
(3, 4, 8, 'CERT-2026-EVT4-STU8-003', '/api/certificates/download/3'),
(4, 5, 5, 'CERT-2026-EVT5-STU5-004', '/api/certificates/download/4'),
(5, 5, 7, 'CERT-2026-EVT5-STU7-005', '/api/certificates/download/5'),
(6, 5, 9, 'CERT-2026-EVT5-STU9-006', '/api/certificates/download/6')
ON CONFLICT (id) DO NOTHING;

-- 7. Notifications
INSERT INTO notifications (id, user_id, title, message, type, is_read) VALUES
(1, 5, 'Registration Confirmed!', 'You have successfully registered for AI & Machine Learning Innovation Summit 2026.', 'success', false),
(2, 5, 'Certificate Issued', 'Your certificate for Cybersecurity & Ethical Hacking Bootcamp is now available for download.', 'info', false),
(3, 2, 'New Registrations', 'Liam Chen registered for your upcoming event AI & Machine Learning Summit.', 'event', true)
ON CONFLICT (id) DO NOTHING;
