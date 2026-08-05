import { Router } from 'express';
import { getMyCertificates, verifyCertificate, downloadCertificatePayload } from '../controllers/certificateController';
import { verifyToken, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/my', verifyToken, getMyCertificates);
router.get('/verify/:cert_number', verifyCertificate);
router.get('/download/:id', downloadCertificatePayload);

export default router;
