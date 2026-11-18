import express from 'express';
import { login, verifyToken } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', requireAuth, verifyToken);

export default router;
