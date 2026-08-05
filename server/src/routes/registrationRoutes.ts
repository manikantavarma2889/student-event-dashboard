import { Router } from 'express';
import { registerForEvent, cancelRegistration, getMyRegistrations, getEventRegistrations } from '../controllers/registrationController';
import { verifyToken, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/', verifyToken, requireRole('student', 'admin'), registerForEvent);
router.delete('/:event_id', verifyToken, requireRole('student', 'admin'), cancelRegistration);
router.get('/my', verifyToken, getMyRegistrations);
router.get('/event/:event_id', verifyToken, requireRole('admin', 'organizer'), getEventRegistrations);

export default router;
