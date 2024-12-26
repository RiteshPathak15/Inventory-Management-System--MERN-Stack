import express from 'express';
import { getSuppliers, addSupplier } from '../controllers/supplierController.js';

const router = express.Router();

router.get('/', getSuppliers);
router.post('/', addSupplier);

export default router;
