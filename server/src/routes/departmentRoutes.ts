import { Router } from 'express';
import { getAllDepartments, createDepartment } from '../controllers/departmentController';
import { verifyToken, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAllDepartments);
router.post('/', verifyToken, requireRole('admin'), createDepartment);

export default router;
