const { Router } = require('express');
const eShop = require('../databases/eshop');
const Category = require('../models/Category');

const router = Router();

router.get('/', async (req, res) => {
    const allCategories = await eShop.getAllCategories();
    const allCategoriesModel = allCategories.map(category => new Category(
        category["category_id"], 
        category["category_name"]));

    res.json(allCategoriesModel);
});

router.get('/:id', async (req, res) => {
    const category = await eShop.getCategory(req.params.id);
    const categoryModel = new Category(
        category[0]["category_id"], 
        category[0]["category_name"]);
        
    res.json(categoryModel);
});

module.exports = router;