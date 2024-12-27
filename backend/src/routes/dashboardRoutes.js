import express from 'express';
import { getDashboardData,getChartData } from '../controllers/dashboard.controllers.js'

const router = express.Router();

router.get('/', getDashboardData);
router.get('/chart-data', getChartData);

export default router;
