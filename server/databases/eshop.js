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
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            await client.end;
        }
    }

    return {
        getAllCategories: function () {
            return execQuery(`
                select *
                from tbl_categories
            `)
        },
        getCategory: function(id) {
            return execQuery(`
                select *
                from tbl_categories
                where category_id = $1
            `, [id])
        },
        getAllProducts: function () {
            return execQuery(`
                select
                    products.product_id, 
                    colors.color,
                    colors.color_hex_code,
                    sellers.seller_company_name,
                    categories.category_name,
                    currencies.currency_symbol
                from tbl_products as products
                left join tbl_products_colors as products_colors on products.product_id = products_colors.product_id
                left join tbl_colors as colors on products_colors.color_id = colors.color_id
                left join tbl_sellers as sellers on products.seller_id = sellers.seller_id
                left join tbl_categories as categories on products.category_id = categories.category_id
                left join tbl_currencies as currencies on products.currency_id = currencies.currency_id
            `)
        },
        getProduct(productId) {
            return execQuery(`
                select
                    products.product_id, 
                    colors.color,
                    colors.color_hex_code,
                    sellers.seller_company_name,
                    categories.category_name,
                    currencies.currency_symbol
                from tbl_products as products
                left join tbl_products_colors as products_colors on products.product_id = products_colors.product_id
                left join tbl_colors as colors on products_colors.color_id = colors.color_id
                left join tbl_sellers as sellers on products.seller_id = sellers.seller_id
                left join tbl_categories as categories on products.category_id = categories.category_id
                left join tbl_currencies as currencies on products.currency_id = currencies.currency_id
                where products.product_id = $1
            `, [productId])
        }
    }
})();

module.exports = eShop;