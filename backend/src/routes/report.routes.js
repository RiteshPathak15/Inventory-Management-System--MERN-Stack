import express from 'express';
import { getSalesReport, getOrdersReport, getInventoryReport } from '../controllers/report.controllers.js';

const router = express.Router();

router.get('/sales', getSalesReport);
router.get('/orders', getOrdersReport);
router.get('/inventory', getInventoryReport);

export default router;
