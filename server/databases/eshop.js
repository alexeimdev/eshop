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
        updateProduct: async function (product) {
            const result = await execQuery(`
                UPDATE tbl_products products
                SET 
                VALUES
                WHERE products.product_id = $1
            `, [product.productId])
            //return result
        },
        deleteProduct: async function (productId) {
            const result = await execQuery(`
                UPDATE public.tbl_products
                SET is_deleted = true
                WHERE product_id = $1
            `, [productId]);
            return result.rowCount > 0 ? productId : null;
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