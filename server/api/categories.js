const { Router } = require('express');
const EShop = require('../databases/eshop');

const categoriesRouter = Router();

const eShop = new EShop();

categoriesRouter.get('/', async (req, res) => {
    const allCategories = await eShop.getAllCategories();
    console.info('[server]', 'allCategories', allCategories);
    res.json(allCategories);
});

categoriesRouter.get('/:id', async (req, res) => {
    const category = await eShop.getCategory(req.params.id);
    console.info('[server]', 'category', category);
    res.json(category);
});

module.exports = categoriesRouter;