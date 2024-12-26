import express from 'express';
import { logInventoryMovement, getInventoryMovements } from '../controllers/inventoryMovementController.js';

const router = express.Router();

router.post('/', logInventoryMovement);
router.get('/', getInventoryMovements);

export default router;
