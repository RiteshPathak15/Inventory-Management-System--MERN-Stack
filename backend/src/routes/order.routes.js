import express from 'express';
import { getOrders, addOrder } from '../controllers/order.controllers.js';

const router = express.Router();

router.get('/', getOrders);
router.post('/', addOrder);

export default router;