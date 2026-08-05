import { Response } from 'express';
import { registrationsData, eventsData, usersData, notificationsData, Registration } from '../db/store';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const registerForEvent = (req: AuthenticatedRequest, res: Response) => {
  const { event_id } = req.body;
  const student_id = req.user!.id;

  if (!event_id) {
    return res.status(400).json({ success: false, message: 'Event ID is required.' });
  }

  const evt = eventsData.find(e => e.id === Number(event_id));
  if (!evt) {
    return res.status(404).json({ success: false, message: 'Event not found.' });
  }

  if (evt.status === 'cancelled' || evt.status === 'completed') {
    return res.status(400).json({ success: false, message: `Cannot register for a ${evt.status} event.` });
  }

  const activeRegistrations = registrationsData.filter(r => r.event_id === evt.id && r.status !== 'cancelled');
  if (activeRegistrations.length >= evt.capacity) {
    return res.status(400).json({ success: false, message: 'Event has reached maximum capacity.' });
  }

  const existingReg = registrationsData.find(r => r.event_id === evt.id && r.student_id === student_id);
  if (existingReg && existingReg.status !== 'cancelled') {
    return res.status(400).json({ success: false, message: 'You are already registered for this event.' });
  }

  const qr_token = `QR_EVT${evt.id}_STU${student_id}_${Math.floor(10000 + Math.random() * 90000)}`;

  if (existingReg && existingReg.status === 'cancelled') {
    existingReg.status = 'registered';
    existingReg.registered_at = new Date().toISOString();
    existingReg.qr_code_token = qr_token;
  } else {
    const newReg: Registration = {
      id: registrationsData.length + 1,
      event_id: evt.id,
      student_id,
      registered_at: new Date().toISOString(),
      status: 'registered',
      qr_code_token: qr_token
    };
    registrationsData.push(newReg);
  }

  // Push student notification
  notificationsData.push({
    id: notificationsData.length + 1,
    user_id: student_id,
    title: 'Registration Confirmed 🎉',
    message: `You are registered for "${evt.title}". View your ticket QR code in your dashboard.`,
    type: 'success',
    is_read: false,
    created_at: new Date().toISOString()
  });

  return res.status(201).json({
    success: true,
    message: 'Registered successfully!',
    data: {
      event_title: evt.title,
      qr_code_token: qr_token
    }
  });
};

export const cancelRegistration = (req: AuthenticatedRequest, res: Response) => {
  const { event_id } = req.params;
  const student_id = req.user!.id;

  const reg = registrationsData.find(r => r.event_id === Number(event_id) && r.student_id === student_id);
  if (!reg || reg.status === 'cancelled') {
    return res.status(404).json({ success: false, message: 'Active registration not found.' });
  }

  reg.status = 'cancelled';

  return res.json({ success: true, message: 'Registration cancelled successfully.' });
};

export const getMyRegistrations = (req: AuthenticatedRequest, res: Response) => {
  const student_id = req.user!.id;
  const myRegs = registrationsData.filter(r => r.student_id === student_id);

  const enriched = myRegs.map(r => {
    const evt = eventsData.find(e => e.id === r.event_id);
    return {
      ...r,
      event: evt || null
    };
  });

  return res.json({ success: true, count: enriched.length, data: enriched });
};

export const getEventRegistrations = (req: AuthenticatedRequest, res: Response) => {
  const { event_id } = req.params;
  const evtRegs = registrationsData.filter(r => r.event_id === Number(event_id));

  const enriched = evtRegs.map(r => {
    const student = usersData.find(u => u.id === r.student_id);
    return {
      ...r,
      student_name: student ? student.name : 'Unknown Student',
      student_email: student ? student.email : '',
      student_id_num: student ? student.student_id_num : '',
      avatar_url: student ? student.avatar_url : ''
    };
  });

  return res.json({ success: true, count: enriched.length, data: enriched });
};
