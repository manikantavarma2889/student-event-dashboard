import { Router } from 'express';
import { getMyNotifications, markNotificationRead } from '../controllers/notificationController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/my', verifyToken, getMyNotifications);
router.put('/:id/read', verifyToken, markNotificationRead);

export default router;
