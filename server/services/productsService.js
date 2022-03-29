const eShop = require('../databases/eshop');
const ProductModel = require('../models/Product');

const productsService = {
    getAllProducts: async function () {
        const allProducts = await eShop.getAllProducts();
        const allProductsModel = allProducts.map(product => new ProductModel(
            product["product_id"],
            product["product_name"],
            product["product_description"],
            product["color_name"],
            product["color_hex_code"],
            product["product_price"],
            product["product_price_disscount"],
            product["currency_symbol"],
        ));
        return allProductsModel;
    },
    getProduct: async function (productId) {
        const product = await eShop.getProduct(productId);
        const productsModel = new ProductModel(
            product["product_id"],
            product["product_name"],
            product["product_description"],
            product["color_name"],
            product["color_hex_code"],
            product["product_price"],
            product["product_price_disscount"],
            product["currency_symbol"],
        );
        return productsModel;
    },
    updateProduct: async function (product) {
        const productId = await eShop.updateProduct(productId);
        return productId;
    },
    deleteProduct: async function (productId) {
        const productId = await eShop.deleteProduct(productId);
        return productId;
    },
}

module.exports = productsService;