import { Router } from 'express';
import { getActivityLogs } from '../controllers/activityController.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.get('/', verifyJWT, getActivityLogs);

export default router;
