import express from 'express';
import { getProducts, addProduct ,updateProduct,deleteProduct} from '../controllers/product.controllers.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.put('/:id',updateProduct); // Update product
router.delete('/:id',deleteProduct); // Delete product

export default router;
