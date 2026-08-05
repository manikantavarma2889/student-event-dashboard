import { Router } from 'express';
import { getDashboardAnalytics } from '../controllers/analyticsController';
import { verifyToken, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', verifyToken, getDashboardAnalytics);

export default router;
