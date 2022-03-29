class ProductModel {
    constructor(
        id, 
        name,
        description,
        colorName,
        colorHexCode,
        price,
        priceDisscount,
        currencySymbol,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.colorName = colorName;
        this.colorHexCode = colorHexCode;
        this.price = price;
        this.priceDisscount = priceDisscount;
        this.currencySymbol = currencySymbol;
    }
}

module.exports = ProductModel;