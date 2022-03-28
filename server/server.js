const EShop = require('././databases/eshop');

async function main () {
    const eShop = new EShop('postgres://postgres:postgres@127.0.0.1:5432/eshop');
    
    const allCategories = await eShop.getAllCategories();
    console.info('allCategories', allCategories);

    const allProducts = await eShop.getAllProducts();
    console.info('allProducts', allProducts);
}

main();