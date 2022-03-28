const { Router } = require('express');
const EShop = require('../databases/eshop');

const productsRouter = Router();

const eShop = new EShop();

productsRouter.get('/', async (req, res) => {
    const allProducts = await eShop.getAllProducts();
    console.info('[server]', 'allProducts', allProducts);
    res.json(allProducts);
});

productsRouter.get('/:id', async (req, res) => {
    const product = await eShop.getProduct(req.params.id);
    console.info('[server]', 'product', product);
    res.json(product);
});

module.exports = productsRouter;