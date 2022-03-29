const { Router } = require('express');
const eShop = require('../databases/eshop');

const router = Router();

router.get('/', async (req, res) => {
    const allProducts = await eShop.getAllProducts();
    console.info('[server]', 'allProducts', allProducts);
    res.json(allProducts);
});

router.get('/:id', async (req, res) => {
    const product = await eShop.getProduct(req.params.id);
    console.info('[server]', 'product', product);
    res.json(product);
});

module.exports = router;