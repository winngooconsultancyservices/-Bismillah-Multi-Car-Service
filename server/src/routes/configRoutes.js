import express from 'express';
import { getConfig, updateConfig } from '../controllers/configController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getConfig);
router.put('/', requireAuth, updateConfig);

export default router;
