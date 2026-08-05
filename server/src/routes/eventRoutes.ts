import { Router } from 'express';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventController';
import { verifyToken, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', verifyToken, requireRole('admin', 'organizer'), createEvent);
router.put('/:id', verifyToken, requireRole('admin', 'organizer'), updateEvent);
router.delete('/:id', verifyToken, requireRole('admin', 'organizer'), deleteEvent);

export default router;
