// src/routes/inventory.routes.js
import express from 'express';
import { upload } from '../middlewares/multer.middlewares.js';
import * as inventoryController from '../controllers/inventory.controllers.js';

const router = express.Router();

// Route to add new inventory item (with image upload)
router.post('/', upload.single('image'), inventoryController.addInventoryItem);

// Route to get all inventory items
router.get('/', inventoryController.getAllInventoryItems);

// Route to update inventory item (with image upload)
router.put('/:id', upload.single('image'), inventoryController.updateInventoryItem);

// Route to delete an inventory item
router.delete('/:id', inventoryController.deleteInventoryItem);

export default router;
