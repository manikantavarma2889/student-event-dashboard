import { Router } from 'express';
import { getAllUsers, updateUserRole, createUser } from '../controllers/userController';
import { verifyToken, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', verifyToken, requireRole('admin'), getAllUsers);
router.post('/', verifyToken, requireRole('admin'), createUser);
router.put('/:id/role', verifyToken, requireRole('admin'), updateUserRole);

export default router;
