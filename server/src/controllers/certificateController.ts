import { Request, Response } from 'express';
import { certificatesData, eventsData, usersData, departmentsData } from '../db/store';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getMyCertificates = (req: AuthenticatedRequest, res: Response) => {
  const student_id = req.user!.id;
  const myCerts = certificatesData.filter(c => c.student_id === student_id);

  const enriched = myCerts.map(c => {
    const evt = eventsData.find(e => e.id === c.event_id);
    const dept = evt ? departmentsData.find(d => d.id === evt.department_id) : null;
    const student = usersData.find(u => u.id === c.student_id);

    return {
      ...c,
      event_title: evt ? evt.title : 'Event',
      event_category: evt ? evt.category : 'General',
      event_date: evt ? evt.start_time : '',
      department_name: dept ? dept.name : 'College',
      student_name: student ? student.name : 'Student'
    };
  });

  return res.json({ success: true, count: enriched.length, data: enriched });
};

export const verifyCertificate = (req: Request, res: Response) => {
  const { cert_number } = req.params;
  const cert = certificatesData.find(c => c.certificate_number === cert_number);

  if (!cert) {
    return res.status(404).json({ success: false, message: 'Invalid or unverified certificate number.' });
  }

  const evt = eventsData.find(e => e.id === cert.event_id);
  const student = usersData.find(u => u.id === cert.student_id);
  const dept = evt ? departmentsData.find(d => d.id === evt.department_id) : null;

  return res.json({
    success: true,
    verified: true,
    data: {
      certificate_number: cert.certificate_number,
      issue_date: cert.issue_date,
      student_name: student ? student.name : 'Student',
      event_title: evt ? evt.title : 'Event',
      event_category: evt ? evt.category : 'General',
      department: dept ? dept.name : 'College'
    }
  });
};

export const downloadCertificatePayload = (req: Request, res: Response) => {
  const { id } = req.params;
  const cert = certificatesData.find(c => c.id === Number(id));

  if (!cert) {
    return res.status(404).json({ success: false, message: 'Certificate not found.' });
  }

  const evt = eventsData.find(e => e.id === cert.event_id);
  const student = usersData.find(u => u.id === cert.student_id);
  const dept = evt ? departmentsData.find(d => d.id === evt.department_id) : null;

  return res.json({
    success: true,
    data: {
      certificate_number: cert.certificate_number,
      issue_date: cert.issue_date,
      student_name: student ? student.name : 'Student',
      student_id_num: student ? student.student_id_num : '',
      event_title: evt ? evt.title : 'Event',
      event_category: evt ? evt.category : 'Workshop',
      event_location: evt ? evt.location : 'Campus Auditorium',
      department: dept ? dept.name : 'College',
      authorized_signatory: 'Dr. Sarah Jenkins (Dean of Student Affairs)'
    }
  });
};
