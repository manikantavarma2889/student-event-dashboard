import { Response } from 'express';
import { eventsData, registrationsData, usersData, departmentsData, EventItem } from '../db/store';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getAllEvents = (req: AuthenticatedRequest, res: Response) => {
  const { search, category, department_id, status, organizer_id } = req.query;

  let filtered = [...eventsData];

  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(e => 
      e.title.toLowerCase().includes(q) || 
      e.description.toLowerCase().includes(q) || 
      e.location.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'All') {
    filtered = filtered.filter(e => e.category.toLowerCase() === String(category).toLowerCase());
  }

  if (department_id) {
    filtered = filtered.filter(e => e.department_id === Number(department_id));
  }

  if (status) {
    filtered = filtered.filter(e => e.status === status);
  }

  if (organizer_id) {
    filtered = filtered.filter(e => e.organizer_id === Number(organizer_id));
  }

  // Enrich event items with registered count, department name, organizer name
  const enriched = filtered.map(evt => {
    const regCount = registrationsData.filter(r => r.event_id === evt.id && r.status !== 'cancelled').length;
    const dept = departmentsData.find(d => d.id === evt.department_id);
    const org = usersData.find(u => u.id === evt.organizer_id);

    return {
      ...evt,
      registered_count: regCount,
      department_name: dept ? dept.name : 'General',
      department_code: dept ? dept.code : 'GEN',
      organizer_name: org ? org.name : 'Faculty Organizer'
    };
  });

  return res.json({ success: true, count: enriched.length, data: enriched });
};

export const getEventById = (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const evt = eventsData.find(e => e.id === Number(id));

  if (!evt) {
    return res.status(404).json({ success: false, message: 'Event not found.' });
  }

  const regCount = registrationsData.filter(r => r.event_id === evt.id && r.status !== 'cancelled').length;
  const dept = departmentsData.find(d => d.id === evt.department_id);
  const org = usersData.find(u => u.id === evt.organizer_id);

  return res.json({
    success: true,
    data: {
      ...evt,
      registered_count: regCount,
      department_name: dept ? dept.name : 'General',
      organizer_name: org ? org.name : 'Faculty Organizer'
    }
  });
};

export const createEvent = (req: AuthenticatedRequest, res: Response) => {
  const { title, description, category, department_id, location, start_time, end_time, capacity, poster_url, registration_deadline } = req.body;

  if (!title || !description || !category || !location || !start_time || !end_time) {
    return res.status(400).json({ success: false, message: 'Required fields missing.' });
  }

  const newEvt: EventItem = {
    id: eventsData.length + 1,
    title,
    description,
    category,
    department_id: department_id ? Number(department_id) : req.user?.department_id || 1,
    organizer_id: req.user!.id,
    location,
    start_time,
    end_time,
    capacity: capacity ? Number(capacity) : 100,
    poster_url: poster_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    status: 'published',
    registration_deadline: registration_deadline || end_time,
    created_at: new Date().toISOString()
  };

  eventsData.push(newEvt);

  return res.status(201).json({ success: true, message: 'Event created successfully.', data: newEvt });
};

export const updateEvent = (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const evtIndex = eventsData.findIndex(e => e.id === Number(id));

  if (evtIndex === -1) {
    return res.status(404).json({ success: false, message: 'Event not found.' });
  }

  const evt = eventsData[evtIndex];

  // Authorization check: Admin or the owner organizer
  if (req.user?.role !== 'admin' && evt.organizer_id !== req.user?.id) {
    return res.status(403).json({ success: false, message: 'Forbidden. You can only update events you organized.' });
  }

  const updatedEvt = {
    ...evt,
    ...req.body,
    id: evt.id // maintain ID
  };

  eventsData[evtIndex] = updatedEvt;

  return res.json({ success: true, message: 'Event updated successfully.', data: updatedEvt });
};

export const deleteEvent = (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const evtIndex = eventsData.findIndex(e => e.id === Number(id));

  if (evtIndex === -1) {
    return res.status(404).json({ success: false, message: 'Event not found.' });
  }

  const evt = eventsData[evtIndex];

  if (req.user?.role !== 'admin' && evt.organizer_id !== req.user?.id) {
    return res.status(403).json({ success: false, message: 'Forbidden. You can only delete events you organized.' });
  }

  eventsData.splice(evtIndex, 1);

  return res.json({ success: true, message: 'Event deleted successfully.' });
};
