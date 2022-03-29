const { Client } = require('pg');

const eShop = (function () {

    let client = createClient();

    function createClient() {
        const connectionString = process.env.ESHOP_CONNECTION_STRING || 'postgres://postgres:postgres@127.0.0.1:5432/eshop';
        if (!connectionString) throw new Error("Please provide a valid connction string!");

        return new Client(connectionString);
    }

    async function execQuery(query, params = []) {
        try {
            if (!client) await createClient();
            if (!client?._connected) await client.connect();

            const result = await client.query(query, params);
            return result;
        } catch (error) {
            throw error;
        } finally {
            await client.end;
        }
    }

    return {
        getAllProducts: async function () {
            const result = await execQuery(`
                SELECT
                    products.*, 
                    colors.color_name,
                    colors.color_hex_code,
                    currencies.currency_symbol
                FROM tbl_products as products
                LEFT JOIN tbl_colors as colors on products.product_color_id = colors.color_id
                LEFT JOIN tbl_currencies as currencies on products.currency_id = currencies.currency_id
                WHERE products.is_deleted = false
            `);
            return result.rows;
        },
        getProduct: async function (productId) {
            const result = await execQuery(`
                SELECT
                    products.*, 
                    colors.color_name,
                    colors.color_hex_code,
                    currencies.currency_symbol
                FROM tbl_products as products
                LEFT JOIN tbl_colors as colors on products.product_color_id = colors.color_id
                LEFT JOIN tbl_currencies as currencies on products.currency_id = currencies.currency_id
                WHERE products.product_id = $1 AND products.is_deleted = false
                LIMIT 1
            `, [productId]);
            return result.rows.at(0);
        },
        getProductFullDetails: async function (productId) {
            const result = await execQuery(`
                SELECT
                    products.*, 
                    colors.color_name,
                    colors.color_hex_code,
                    currencies.currency_symbol
                FROM tbl_products as products
                LEFT JOIN tbl_colors as colors on products.product_color_id = colors.color_id
                LEFT JOIN tbl_currencies as currencies on products.currency_id = currencies.currency_id
                WHERE products.product_id = $1 AND products.is_deleted = false
                LIMIT 1
            `, [productId]);
            return result.rows.at(0);
        },
        createProduct: async function (product) {
            /*
            fetch('http://localhost:5000/api/products', { 
                method: 'POST',
                headers:{'Content-type': 'application/json' },
                body: JSON.stringify({
                    'name': 'Macbook Pro 14\" new',
                    'description': 'Macbook Pro 14\" Laptop new',
                    'quantity': 100,
                    'price': 5000,
                    'priceDiscount': 10,
                    'colorId': 1,
                    'sellerId': 1,
                    'currencyId': 1,
                    'categoryId': 4,
                })
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
            */

            const result = await execQuery(`
                INSERT INTO public.tbl_products (   
                    product_name,
                    product_description,
                    product_quantity,
                    product_price,
                    product_price_discount,
                    product_color_id,
                    seller_id,
                    currency_id,
                    category_id
                )
                VALUES(
                    $1, $2, $3, $4, $5, $6, $7, $8, $9
                )
                RETURNING product_id;
            `, [
                product.name,
                product.description,
                product.quantity,
                product.price,
                product.priceDiscount,
                product.colorId,
                product.sellerId,
                product.currencyId,
                product.categoryId,
            ])
            
            return result.rowCount > 0 ? result.rows.at(0).product_id : null;
        },
        updateProduct: async function (product) {
            /*
            fetch('http://localhost:5000/api/products', { 
                method: 'PUT',
                headers:{'Content-type': 'application/json' },
                body: JSON.stringify({
                    'id': 4,
                    'name': 'Macbook Pro 14\" modified',
                    'description': 'Macbook Pro 14\" Laptop modified',
                    'quantity': 100,
                    'price': 5000,
                    'priceDiscount': 10,
                    'colorId': 1,
                    'sellerId': 1,
                    'currencyId': 1,
                    'categoryId': 4,
                })
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
            */

            const result = await execQuery(`
                UPDATE public.tbl_products
                SET 
                    product_id = $1,
                    product_name = $2,
                    product_description = $3,
                    product_quantity = $4,
                    product_price = $5,
                    product_price_discount = $6,
                    product_color_id = $7,
                    seller_id = $8,
                    currency_id = $9,
                    category_id = $10,
                    update_date = now()
                WHERE product_id = $1
                RETURNING product_id;
            `, [
                product.id,
                product.name,
                product.description,
                product.quantity,
                product.price,
                product.priceDiscount,
                product.colorId,
                product.sellerId,
                product.currencyId,
                product.categoryId,
            ])
            
            return result.rowCount > 0 ? result.rows.at(0).product_id : null;
        },
        deleteProduct: async function (productId) {
            const result = await execQuery(`
                UPDATE public.tbl_products
                SET is_deleted = true
                WHERE product_id = $1
                RETURNING product_id;
            `, [productId]);
            return result.rowCount > 0 ? result.rows.at(0).product_id : null;
        },
        getAllCategories: async function () {
            const result = await execQuery(`
                SELECT *
                FROM tbl_categories
                WHERE is_deleted = false
            `);
            return (await result).rows;
        },
        getCategory: async function (id) {
            const result = await execQuery(`
                SELECT *
                FROM tbl_categories
                WHERE category_id = $1 AND is_deleted = false
            `, [id]);
            return result.rows.get(0);
        },
    }
})();

module.exports = eShop;