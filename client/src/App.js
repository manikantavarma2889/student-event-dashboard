import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { EventBrowserView } from './views/EventBrowserView.tsx';
import { StudentDashboardView } from './views/StudentDashboardView.tsx';
import { OrganizerDashboardView } from './views/OrganizerDashboardView.tsx';
import { AdminAnalyticsView } from './views/AdminAnalyticsView.tsx';
import { UserManagementView } from './views/UserManagementView.tsx';
import { ClubsView } from './views/ClubsView.tsx';
import { CompetitionsView } from './views/CompetitionsView.tsx';
import { SettingsView } from './views/SettingsView.tsx';
import { EventModal } from './components/EventModal.tsx';
import { CreateEventModal } from './components/CreateEventModal.tsx';
import { CertificateModal } from './components/CertificateModal.tsx';
import { LoginModal } from './components/LoginModal.tsx';

import { api } from './services/api.ts';
import { GraduationCap } from 'lucide-react';

const SEED_EVENTS = [
  {
    id: 1,
    title: 'AI & Machine Learning Innovation Summit 2026',
    description: 'A 2-day hands-on hackathon and workshop covering generative AI, neural networks, and real-world deployment.',
    category: 'Hackathon',
    department_id: 1,
    department_name: 'Computer Science & Engineering',
    organizer_id: 2,
    organizer_name: 'Faculty Organizer',
    location: 'Main Auditorium & CS Lab 3',
    start_time: '2026-08-15T09:00:00Z',
    end_time: '2026-08-16T17:00:00Z',
    capacity: 120,
    registered_count: 3,
    poster_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    status: 'published'
  },
  {
    id: 2,
    title: 'Robotics & IoT Prototyping Workshop',
    description: 'Build smart embedded devices using Arduino and Raspberry Pi with live demo competitions.',
    category: 'Workshop',
    department_id: 3,
    department_name: 'Electronics & Communication',
    organizer_id: 3,
    organizer_name: 'Faculty Organizer',
    location: 'ECE Advanced Research Lab',
    start_time: '2026-08-20T10:00:00Z',
    end_time: '2026-08-20T16:00:00Z',
    capacity: 60,
    registered_count: 2,
    poster_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    status: 'published'
  },
  {
    id: 3,
    title: 'Annual Inter-College Tech Fest: Technovate 2026',
    description: 'The largest college fest featuring coding battles, project expos, quiz competitions, and keynote talks.',
    category: 'Cultural',
    department_id: 1,
    department_name: 'Computer Science & Engineering',
    organizer_id: 2,
    organizer_name: 'Faculty Organizer',
    location: 'College Campus Ground',
    start_time: '2026-09-01T08:30:00Z',
    end_time: '2026-09-03T20:00:00Z',
    capacity: 500,
    registered_count: 0,
    poster_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    status: 'published'
  }
];

const SAMPLE_ALL_CERTS = [
  {
    id: 1,
    event_id: 4,
    student_id: 101,
    certificate_number: 'CERT-2026-EVT4-STU101-001',
    issue_date: '2026-07-11T10:00:00Z',
    pdf_url: '/api/certificates/download/1',
    event_title: 'Entrepreneurship & Startup Pitch Day',
    department_name: 'School of Management Studies',
    student_name: 'Student Scholar'
  },
  {
    id: 2,
    event_id: 5,
    student_id: 102,
    certificate_number: 'CERT-2026-EVT5-STU102-002',
    issue_date: '2026-07-23T10:00:00Z',
    pdf_url: '/api/certificates/download/2',
    event_title: 'Cybersecurity & Ethical Hacking Bootcamp',
    department_name: 'Information Technology',
    student_name: 'Student Scholar'
  }
];

export function App() {
  const [theme, setTheme] = useState('dark');
  const [currentUser, setCurrentUser] = useState(null); // Guest mode initially
  const [activeTab, setActiveTab] = useState('events');

  // SPLASH SCREEN TRANSITION STATE (2 Seconds)
  const [isLoadingSplash, setIsLoadingSplash] = useState(true);

  // Data States
  const [events, setEvents] = useState(SEED_EVENTS);
  const [registrations, setRegistrations] = useState([]);
  const [certificates, setCertificates] = useState(SAMPLE_ALL_CERTS);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [usersList, setUsersList] = useState([]);

  // Modal Control States
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Apply Theme Attribute to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 1. 2-SECOND CAMPUSPULSE SPLASH SCREEN TRANSITION
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsLoadingSplash(false);
    }, 2000);

    return () => clearTimeout(splashTimer);
  }, []);

  // 2. 3-SECOND AUTOMATIC LOGIN PROMPT AFTER MAIN PAGE CARRIES OVER
  useEffect(() => {
    if (!isLoadingSplash && !currentUser) {
      const loginPromptTimer = setTimeout(() => {
        setShowLoginModal(true);
      }, 3000);

      return () => clearTimeout(loginPromptTimer);
    }
  }, [isLoadingSplash, currentUser]);

  // Load Data from API
  const loadData = async () => {
    if (!currentUser) return;
    try {
      const evtRes = await api.getEvents();
      if (evtRes && evtRes.success && evtRes.data && evtRes.data.length > 0) {
        setEvents(evtRes.data);
      }

      const regRes = await api.getMyRegistrations();
      if (regRes && regRes.success && regRes.data) {
        setRegistrations(regRes.data);
      }

      const certRes = await api.getMyCertificates();
      if (certRes && certRes.success && certRes.data && certRes.data.length > 0) {
        setCertificates(certRes.data);
      }

      const analyticsRes = await api.getAnalytics();
      if (analyticsRes && analyticsRes.success) {
        setAnalytics(analyticsRes.data);
      }

      const usersRes = await api.getUsers();
      if (usersRes && usersRes.success && usersRes.data) {
        setUsersList(usersRes.data);
      }
    } catch (err) {
      console.warn('Backend API offline or initializing, running with local state.', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  // Auth Handler for Login & Registration
  const handleAuthSuccess = (user, token) => {
    if (token) localStorage.setItem('token', token);
    setCurrentUser(user);
    setShowLoginModal(false);

    if (user.role === 'student') setActiveTab('events');
    if (user.role === 'organizer') setActiveTab('manage-events');
    if (user.role === 'admin') setActiveTab('admin-analytics');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const handleRoleSwitch = (newRole) => {
    const roleUser = {
      id: Math.floor(100 + Math.random() * 900),
      role: newRole,
      name: newRole === 'admin' ? 'Administrator' : newRole === 'organizer' ? 'Faculty Organizer' : 'Student Account',
      email: `${newRole}@college.edu`,
      department_id: 1,
      student_id_num: newRole === 'student' ? 'STU2026101' : null
    };
    setCurrentUser(roleUser);
    setShowLoginModal(false);

    if (newRole === 'student') setActiveTab('events');
    if (newRole === 'organizer') setActiveTab('manage-events');
    if (newRole === 'admin') setActiveTab('admin-analytics');
  };

  // Student Event Registration Handler
  const handleRegisterForEvent = async (eventId) => {
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }

    const targetEvt = events.find(e => e.id === eventId);
    setRegistrations(prev => [
      ...prev,
      {
        id: prev.length + 1,
        event_id: eventId,
        student_id: currentUser.id,
        registered_at: new Date().toISOString(),
        status: 'registered',
        qr_code_token: `QR_EVT${eventId}_STU${currentUser.id}_${Math.floor(10000 + Math.random() * 90000)}`,
        event: targetEvt
      }
    ]);

    // Issue Sample Certificate upon registration completion for demo evaluation
    const newCert = {
      id: certificates.length + 1,
      event_id: eventId,
      student_id: currentUser.id,
      certificate_number: `CERT-2026-EVT${eventId}-STU${currentUser.id}-00${certificates.length + 1}`,
      issue_date: new Date().toISOString(),
      pdf_url: `/api/certificates/download/${certificates.length + 1}`,
      event_title: targetEvt ? targetEvt.title : 'Campus Event',
      department_name: targetEvt ? targetEvt.department_name : 'College',
      student_name: currentUser.name
    };
    setCertificates(prev => [newCert, ...prev]);

    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registered_count: (e.registered_count || 0) + 1 } : e));
    setSelectedEvent(null);
  };

  // Student Cancel Registration Handler
  const handleCancelRegistration = async (eventId) => {
    if (!currentUser) return;
    setRegistrations(prev => prev.filter(r => !(r.event_id === eventId && r.student_id === currentUser.id)));
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registered_count: Math.max((e.registered_count || 1) - 1, 0) } : e));
    setSelectedEvent(null);
  };

  // Event Creation Handler
  const handleCreateEvent = async (eventData) => {
    const newEvt = {
      id: events.length + 1,
      title: eventData.title || 'New Event',
      description: eventData.description || '',
      category: eventData.category || 'Workshop',
      department_id: eventData.department_id || 1,
      department_name: 'Computer Science & Engineering',
      organizer_id: currentUser?.id || 101,
      organizer_name: currentUser?.name || 'Faculty Organizer',
      location: eventData.location || 'Campus Center',
      start_time: eventData.start_time || new Date().toISOString(),
      end_time: eventData.end_time || new Date().toISOString(),
      capacity: eventData.capacity || 100,
      registered_count: 0,
      poster_url: eventData.poster_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      status: 'published'
    };

    setEvents(prev => [newEvt, ...prev]);
  };

  // Attendance Marking Handler
  const handleMarkAttendance = async (eventId, qrToken) => {
    const newRecord = {
      id: attendanceRecords.length + 1,
      event_id: eventId,
      student_id: currentUser?.id || 101,
      marked_at: new Date().toISOString(),
      method: qrToken ? 'qr_scan' : 'manual',
      student_name: currentUser?.name || 'Student Account',
      student_email: currentUser?.email || 'student@college.edu',
      student_id_num: currentUser?.student_id_num || 'STU2026101',
      certificate_number: `CERT-2026-EVT${eventId}-STU${currentUser?.id || 101}-${Math.floor(100 + Math.random() * 900)}`
    };

    setAttendanceRecords(prev => [newRecord, ...prev]);
  };

  // User Role Update Handler
  const handleUpdateUserRole = (userId, newRole) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  // Registrations & Certificates for active view
  const displayRegistrations = currentUser
    ? registrations.filter(r => r.student_id === currentUser.id)
    : registrations;

  const displayCertificates = certificates.map(c => ({
    ...c,
    student_name: currentUser ? currentUser.name : c.student_name
  }));

  const userRegIds = displayRegistrations.filter(r => r.status !== 'cancelled').map(r => r.event_id);

  // 1. RENDER 2-SECOND CAMPUSPULSE ANIMATED SPLASH SCREEN
  if (isLoadingSplash) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(135deg, #0b0f19, #111827, #1e1b4b)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          color: 'white'
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #4f46e5, #a855f7, #10b981)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            marginBottom: '20px',
            boxShadow: '0 0 50px rgba(79, 70, 229, 0.6)',
            animation: 'pulse 1.5s infinite ease-in-out'
          }}
        >
          <GraduationCap size={44} />
        </div>

        <h1
          style={{
            fontSize: '38px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff, #a5b4fc, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
            marginBottom: '8px'
          }}
        >
          CampusConnect
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '15px', fontWeight: 500, marginBottom: '32px' }}>
          Every Event. Every Student. One Platform.
        </p>

        <div style={{ width: '180px', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '99px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: '100%',
              background: 'linear-gradient(90deg, #4f46e5, #a855f7, #10b981)',
              animation: 'progress 2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </div>
    );
  }

  // 2. MAIN APPLICATION PAGE VIEW WITH FULL ROUTING
  return (
    <div className="app-container">
      {/* Abstract Background Blobs */}
      <div className="blob-container">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
      </div>

      {/* Sidebar Navigation */}
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLoginModal={() => setShowLoginModal(true)}
      />

      {/* Main View Area */}
      <div className="main-content">
        <Navbar
          currentUser={currentUser}
          onRoleSwitch={handleRoleSwitch}
          onOpenLoginModal={() => setShowLoginModal(true)}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />

        {/* View Switcher Routing */}
        {activeTab === 'events' && (
          <EventBrowserView
            events={events}
            currentUser={currentUser}
            onSelectEvent={setSelectedEvent}
            onOpenCreateModal={() => setShowCreateModal(true)}
            userRegistrations={userRegIds}
          />
        )}

        {(activeTab === 'my-registrations' || activeTab === 'certificates') && (
          <StudentDashboardView
            registrations={displayRegistrations}
            certificates={displayCertificates}
            onOpenCertificateModal={setSelectedCert}
            onCancelRegistration={handleCancelRegistration}
          />
        )}

        {activeTab === 'clubs' && <ClubsView />}

        {activeTab === 'competitions' && <CompetitionsView />}

        {activeTab === 'settings' && (
          <SettingsView
            currentUser={currentUser}
            theme={theme}
            toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
        )}

        {(activeTab === 'manage-events' || activeTab === 'attendance') && (
          <OrganizerDashboardView
            events={events}
            currentUser={currentUser}
            onOpenCreateModal={() => setShowCreateModal(true)}
            onMarkAttendance={handleMarkAttendance}
            attendanceRecords={attendanceRecords}
          />
        )}

        {(activeTab === 'admin-analytics' || activeTab === 'departments') && (
          <AdminAnalyticsView analytics={analytics} />
        )}

        {activeTab === 'user-management' && (
          <UserManagementView
            users={usersList}
            onUpdateRole={handleUpdateUserRole}
          />
        )}
      </div>

      {/* Interactive Modals */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          currentUser={currentUser}
          onClose={() => setSelectedEvent(null)}
          onRegister={handleRegisterForEvent}
          onCancel={handleCancelRegistration}
          isRegistered={userRegIds.includes(selectedEvent.id)}
        />
      )}

      {showCreateModal && (
        <CreateEventModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateEvent}
        />
      )}

      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}

export default App;