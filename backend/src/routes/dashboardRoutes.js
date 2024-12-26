import express from 'express';
import { getDashboardData } from '../controllers/dashboardController.js';
import { getChartData } from '../controllers/chartController.js';

const router = express.Router();

router.get('/', getDashboardData);
router.get('/chart-data', getChartData);

export default router;
