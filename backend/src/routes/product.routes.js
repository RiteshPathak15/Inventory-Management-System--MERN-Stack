import express from 'express';
import { getProducts, addProduct } from '../controllers/product.controllers.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);

export default router;
