import express from 'express';
import { getInventory, addInventory, updateInventory, deleteInventory, getChartData,getLowStockItems } from '../controllers/inventory.controllers.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.get('/', getInventory);
router.post('/', addInventory);
router.put('/:id', updateInventory);
router.delete('/:id', deleteInventory);
router.get('/charts/data', getChartData); // Add this route for chart data
router.get('/low-stock', verifyJWT ,getLowStockItems);

export default router;
