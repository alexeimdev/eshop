const productsHelper = require('../helpers/products');

class ProductModel {
    constructor(
        id, 
        name,
        description,
        colorName,
        colorHexCode,
        price,
        priceDiscount,
        currencySymbol,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.colorName = colorName;
        this.colorHexCode = colorHexCode;
        this.price = productsHelper.fixPrice(price);
        this.priceDiscount = priceDiscount;
        this.totalPrice = productsHelper.calculateTotolPrice(price, priceDiscount);
        this.currencySymbol = currencySymbol;
    }
}

module.exports = ProductModel;