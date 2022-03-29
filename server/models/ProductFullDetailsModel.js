const productsHelper = require('../helpers/products');

class ProductFullDetailsModel {
    constructor(product) {
        this.product = {
            ...product,
            price: productsHelper.fixPrice(product.price),
            totalPrice: productsHelper.fixPrice(product.price, product.priceDiscount),
        }
    }
}

module.exports = ProductFullDetailsModel;