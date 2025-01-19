import express from 'express';
import { getAllSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../controllers/supplier.controllers.js';
import { upload } from '../middlewares/multer.middlewares.js';

const router = express.Router();

router.get('/', getAllSuppliers);
router.post('/', upload.single('image'),createSupplier);
router.put('/:id', upload.single('image'),updateSupplier);
router.delete('/:id', deleteSupplier);

export default router;
