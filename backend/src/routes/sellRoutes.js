import { Router } from 'express';
import { sellProduct } from '../controllers/sell.controllers.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.post('/', verifyJWT, sellProduct);

export default router;
