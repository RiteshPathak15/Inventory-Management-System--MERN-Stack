import Inventory from '../models/Inventory.js';
import Sale from '../models/Sale.js';

// @desc    Sell a product
// @route   POST /api/sell
// @access  Private
const sellProduct = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    console.log('Request received:', { productId, quantity });

    const product = await Inventory.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Create sale record
    const sale = new Sale({
      product: productId,
      quantitySold: quantity,
      salePrice: product.price,
    });

    await sale.save();
    console.log('Sale record created:', sale);

    // Update product quantity
    product.quantity -= quantity;
    await product.save();
    console.log('Product updated:', product);

    res.status(201).json({ message: 'Product sold successfully' });
  } catch (error) {
    console.error('Error during sell product:', error);
    res.status(500).json({ message: 'Failed to sell product', error });
  }
};

export { sellProduct };
