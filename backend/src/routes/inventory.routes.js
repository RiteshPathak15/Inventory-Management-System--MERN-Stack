import express from 'express';
import { getInventory, addInventory, updateInventory, deleteInventory, getChartData } from '../controllers/inventory.controllers.js';

const router = express.Router();

router.get('/', getInventory);
router.post('/', addInventory);
router.put('/:id', updateInventory);
router.delete('/:id', deleteInventory);
router.get('/charts/data', getChartData); // Add this route for chart data

export default router;
