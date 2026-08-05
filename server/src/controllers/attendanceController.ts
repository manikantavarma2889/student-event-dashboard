import { Response } from 'express';
import { attendanceData, registrationsData, certificatesData, eventsData, usersData, Attendance, Certificate } from '../db/store';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const markAttendance = (req: AuthenticatedRequest, res: Response) => {
  const { event_id, student_id, qr_code_token, method = 'manual' } = req.body;
  const organizer_id = req.user!.id;

  let targetStudentId = student_id;
  let targetEventId = event_id;

  // Handle QR Code check-in
  if (qr_code_token) {
    const reg = registrationsData.find(r => r.qr_code_token === qr_code_token);
    if (!reg) {
      return res.status(404).json({ success: false, message: 'Invalid or unrecognized QR Code ticket.' });
    }
    targetStudentId = reg.student_id;
    targetEventId = reg.event_id;
  }

  if (!targetEventId || !targetStudentId) {
    return res.status(400).json({ success: false, message: 'Event ID and Student ID or QR Code token required.' });
  }

  // Verify student is registered
  const reg = registrationsData.find(r => r.event_id === Number(targetEventId) && r.student_id === Number(targetStudentId));
  if (!reg || reg.status === 'cancelled') {
    return res.status(400).json({ success: false, message: 'Student is not registered for this event.' });
  }

  // Update registration status to attended
  reg.status = 'attended';

  // Check if attendance already recorded
  const existingAtt = attendanceData.find(a => a.event_id === Number(targetEventId) && a.student_id === Number(targetStudentId));
  if (!existingAtt) {
    const newAtt: Attendance = {
      id: attendanceData.length + 1,
      event_id: Number(targetEventId),
      student_id: Number(targetStudentId),
      marked_by: organizer_id,
      marked_at: new Date().toISOString(),
      method: method === 'qr_scan' ? 'qr_scan' : 'manual'
    };
    attendanceData.push(newAtt);
  }

  // Auto-generate Certificate if not generated
  const existingCert = certificatesData.find(c => c.event_id === Number(targetEventId) && c.student_id === Number(targetStudentId));
  let certNumber = existingCert ? existingCert.certificate_number : '';
  
  if (!existingCert) {
    certNumber = `CERT-2026-EVT${targetEventId}-STU${targetStudentId}-${Math.floor(100 + Math.random() * 900)}`;
    const newCert: Certificate = {
      id: certificatesData.length + 1,
      event_id: Number(targetEventId),
      student_id: Number(targetStudentId),
      certificate_number: certNumber,
      issue_date: new Date().toISOString(),
      pdf_url: `/api/certificates/download/${certificatesData.length + 1}`
    };
    certificatesData.push(newCert);
  }

  const student = usersData.find(u => u.id === Number(targetStudentId));
  const evt = eventsData.find(e => e.id === Number(targetEventId));

  return res.json({
    success: true,
    message: `Attendance marked successfully for ${student ? student.name : 'Student'}.`,
    data: {
      student_name: student ? student.name : 'Student',
      event_title: evt ? evt.title : 'Event',
      certificate_number: certNumber
    }
  });
};

export const getEventAttendance = (req: AuthenticatedRequest, res: Response) => {
  const { event_id } = req.params;

  const attRecords = attendanceData.filter(a => a.event_id === Number(event_id));

  const enriched = attRecords.map(a => {
    const student = usersData.find(u => u.id === a.student_id);
    const cert = certificatesData.find(c => c.event_id === a.event_id && c.student_id === a.student_id);

    return {
      ...a,
      student_name: student ? student.name : 'Unknown Student',
      student_email: student ? student.email : '',
      student_id_num: student ? student.student_id_num : '',
      certificate_number: cert ? cert.certificate_number : null
    };
  });

  return res.json({ success: true, count: enriched.length, data: enriched });
};
