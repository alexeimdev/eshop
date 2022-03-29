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
            if (!client) {
                await createClient();
            }

            if (!client?._connected) {
                await client.connect();
            }

            const result = await client.query(query, params);
            if (result.rows > 1) {
                return result.rows;
            } else {
                return result.rows.at(0);
            }
        } catch (error) {
            throw error;
        } finally {
            await client.end;
        }
    }

    return {
        getAllProducts: function () {
            return execQuery(`
                SELECT
                    products.*, 
                    colors.color_name,
                    colors.color_hex_code,
                    currencies.currency_symbol
                FROM tbl_products as products
                LEFT JOIN tbl_colors as colors on products.product_color_id = colors.color_id
                LEFT JOIN tbl_currencies as currencies on products.currency_id = currencies.currency_id
            `)
        },
        getProduct: function (productId) {
            return execQuery(`
                SELECT
                    products.*, 
                    colors.color_name,
                    colors.color_hex_code,
                    currencies.currency_symbol
                FROM tbl_products as products
                LEFT JOIN tbl_colors as colors on products.product_color_id = colors.color_id
                LEFT JOIN tbl_currencies as currencies on products.currency_id = currencies.currency_id
                WHERE products.product_id = $1 
                LIMIT 1
            `, [productId])
        },
        updateProduct: function (product) {
            return execQuery(`
                UPDATE TABLE tbl_products products
                SET 
                VALUES
                WHERE products.product_id = $1
            `, [product.productId])
        },
        deleteProduct: function (productId) {
            return execQuery(`
                DELETE FROM TABLE tbl_products
                WHERE product_id = $1
            `, [productId])
        },
        getAllCategories: function () {
            return execQuery(`
                SELECT *
                FROM tbl_categories
            `)
        },
        getCategory: function (id) {
            return execQuery(`
                SELECT *
                FROM tbl_categories
                WHERE category_id = $1
            `, [id])
        },
    }
})();

module.exports = eShop;