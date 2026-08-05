import { Router } from 'express';
import { markAttendance, getEventAttendance } from '../controllers/attendanceController';
import { verifyToken, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/mark', verifyToken, requireRole('admin', 'organizer'), markAttendance);
router.get('/event/:event_id', verifyToken, requireRole('admin', 'organizer'), getEventAttendance);

export default router;
