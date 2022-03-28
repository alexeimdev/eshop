const { Client } = require('pg')

class EShop {

    constructor() {
        const connectionString = process.env.ESHOP_CONNECTION_STRING || 'postgres://postgres:postgres@127.0.0.1:5432/eshop';
        if (!connectionString) {
            throw new Error("Please provide a valid connction string!");
        }
        this.client = new Client(connectionString);
    }

    #execQuery = async (query) => {
        try {
            if (!this.client?._connected) {
                await this.client.connect();
            }
            const result = await this.client.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            await this.client.end;
        }
    }

    getAllCategories = async () => {
        return this.#execQuery(`
            select *
            from tbl_categories
        `)
    }

    getCategory = async (id) => {
        return this.#execQuery(`
            select *
            from tbl_categories
            where category_id = ${id}
        `)
    }

    getAllProducts() {
        return this.#execQuery(`
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
    }

    getProduct(productId) {
        return this.#execQuery(`
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
            where products.product_id = ${productId}
        `)
    }

}

module.exports = EShop;