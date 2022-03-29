const productsHelper = {
    fixPrice: function (price) {
        Number(price).toFixed(2);
    },
    calculateTotolPrice: function (price, discount) {
        return (Number(price) - (Number(price) * Number(discount)/100)).toFixed(2);
    }
}

module.exports = productsHelper;