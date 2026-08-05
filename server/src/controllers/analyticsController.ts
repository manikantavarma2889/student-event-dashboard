import { Response } from 'express';
import { eventsData, registrationsData, attendanceData, certificatesData, usersData, departmentsData } from '../db/store';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getDashboardAnalytics = (req: AuthenticatedRequest, res: Response) => {
  const totalEvents = eventsData.length;
  const totalRegistrations = registrationsData.filter(r => r.status !== 'cancelled').length;
  const totalAttended = attendanceData.length;
  const attendanceRate = totalRegistrations > 0 ? Math.round((totalAttended / totalRegistrations) * 100) : 0;
  const totalCertificates = certificatesData.length;
  const totalStudents = usersData.filter(u => u.role === 'student').length;

  // Department-wise Participation
  const departmentStats = departmentsData.map(dept => {
    const deptEvents = eventsData.filter(e => e.department_id === dept.id);
    const deptEventIds = deptEvents.map(e => e.id);
    const deptRegistrations = registrationsData.filter(r => deptEventIds.includes(r.event_id) && r.status !== 'cancelled').length;
    const deptAttendance = attendanceData.filter(a => deptEventIds.includes(a.event_id)).length;

    return {
      department: dept.code,
      name: dept.name,
      events: deptEvents.length,
      registrations: deptRegistrations,
      attendance: deptAttendance
    };
  });

  // Monthly Trends (Mock aggregated metrics over months)
  const monthlyTrends = [
    { month: 'Jan 2026', events: 3, registrations: 120, attendance: 105 },
    { month: 'Feb 2026', events: 4, registrations: 180, attendance: 160 },
    { month: 'Mar 2026', events: 6, registrations: 290, attendance: 260 },
    { month: 'Apr 2026', events: 5, registrations: 240, attendance: 210 },
    { month: 'May 2026', events: 4, registrations: 200, attendance: 185 },
    { month: 'Jun 2026', events: 7, registrations: 350, attendance: 310 },
    { month: 'Jul 2026', events: 5, registrations: 280, attendance: 250 },
    { month: 'Aug 2026', events: totalEvents, registrations: totalRegistrations, attendance: totalAttended }
  ];

  // Organizer Performance Leaderboard
  const organizers = usersData.filter(u => u.role === 'organizer');
  const organizerLeaderboard = organizers.map(org => {
    const orgEvents = eventsData.filter(e => e.organizer_id === org.id);
    const orgEventIds = orgEvents.map(e => e.id);
    const orgRegs = registrationsData.filter(r => orgEventIds.includes(r.event_id) && r.status !== 'cancelled').length;
    const orgAtt = attendanceData.filter(a => orgEventIds.includes(a.event_id)).length;

    return {
      id: org.id,
      name: org.name,
      email: org.email,
      avatar_url: org.avatar_url,
      events_hosted: orgEvents.length,
      total_registrations: orgRegs,
      total_attendees: orgAtt,
      avg_attendance_rate: orgRegs > 0 ? Math.round((orgAtt / orgRegs) * 100) : 0
    };
  });

  return res.json({
    success: true,
    data: {
      metrics: {
        total_events: totalEvents,
        total_registrations: totalRegistrations,
        total_attended: totalAttended,
        attendance_rate: attendanceRate,
        total_certificates: totalCertificates,
        total_students: totalStudents
      },
      department_stats: departmentStats,
      monthly_trends: monthlyTrends,
      organizer_leaderboard: organizerLeaderboard
    }
  });
};
