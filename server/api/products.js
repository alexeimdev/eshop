const { Router } = require('express');
const productsService = require('../services/productsService');

const router = Router();

router.get('/', async (req, res) => {
    const productsModel = await productsService.getAllProducts();
    res.json(productsModel);
});

router.get('/:id', async (req, res) => {
    const productModel = await productsService.getProduct(req.params.id);
    res.json(productModel);
});

router.get('/:id/full-details', async (req, res) => {
    const productFullDetailsModel = await productsService.getProductFullDetails(req.params.id);
    res.json(productFullDetailsModel);
});

router.put('/', async (req, res) => {
    const result = await productsService.updateProduct(req.body);
    res.json(result);
});

router.delete('/:id', async (req, res) => {
    const result = await productsService.deleteProduct(req.params.id);
    res.json(result);
});

module.exports = router;