const db = require('../../config/config')
class ProductRepository {

    // ADD PRODUCTS Repo
    static addProducts = async (data) => {
        try {
            const { product_title, product_sku, product_price, product_quantity, product_image, product_description, brand_name, category_id, seller_id } = data;
            const addProducts = await db.query("INSERT INTO products(product_title,product_sku,product_price,product_quantity,product_image,product_description,brand_name,category_id, seller_id) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
                [product_title, product_sku, product_price, product_quantity, product_image, product_description, brand_name, category_id, seller_id])
            return addProducts.rows;

        } catch (error) {
            throw error;
        }
    }

    // SHOW ALL PRODUCTS
    static async getAllProducts() {
        try {
            const getAllProducts = await db.query("SELECT * FROM products");
            return getAllProducts.rows;
        } catch (err) {
            throw err;
        }
    }

    // SHOW SINGLE PRODUCT
    static getProductById = async (p_id) => {
        try {
            const getProductById = await db.query("SELECT * FROM products WHERE product_id = $1",
                [p_id])
            return getProductById.rows;
        } catch (err) {
            throw err;
        }

    }

    // GET ALL PRODUCTS LISTED BY SELLER
    static getProductsAgainstSeller = async (s_id) => {
        try {
            const { seller_id } = s_id;
            const getProductsAgainstSeller = await db.query("SELECT * FROM products WHERE seller_id = $1",
                [seller_id])
            return getProductsAgainstSeller.rows;
        } catch (err) {
            throw err;
        }
    }

    // DELETE ALL PRODUCTS OF A SPECIFIC SELLER
    static deleteAllProducts = async (s_id) => {
        try {
            const { seller_id } = s_id;
            const deleteAllProducts = await db.query("DELETE FROM products WHERE seller_id = $1",
                [seller_id])
            return deleteAllProducts.rows;
        } catch (err) {
            throw err;
        }
    }

    // DELETE SINGLE PRODUCT
    static deleteProductById = async (p_id) => {
        try {
            const product_id = p_id;
            const deleteProductById = await db.query("DELETE FROM products WHERE product_id = $1",
                [product_id])
            return deleteProductById;
        } catch (err) {
            console.log(err);
        }
    }

    // EDIT PRODUCT
    static editProduct = async (product_data) => {
        try {
            const { product_id } = product_data;

            let query = "UPDATE products SET ";

            let fields = [];
            let values = [];

            // check which fields are present in the request body
            if (product_data.product_title) {
                fields.push("product_title = $" + (fields.length + 1));
                values.push(product_data.product_title);
            }
            if (product_data.product_quantity) {
                fields.push("product_quantity = $" + (fields.length + 1));
                values.push(product_data.product_quantity);
            }
            if (product_data.product_price) {
                fields.push("product_price = $" + (fields.length + 1));
                values.push(product_data.product_price);
            }
            if (product_data.category_id) {
                fields.push("category_id = $" + (fields.length + 1));
                values.push(product_data.category_id);
            }
            if (product_data.product_image) {
                fields.push("product_image = $" + (fields.length + 1));
                values.push(product_data.product_image);
            }
            if (product_data.product_description) {
                fields.push("product_description = $" + (fields.length + 1));
                values.push(product_data.product_description);
            }
            if (product_data.brand_name) {
                fields.push("brand_name = $" + (fields.length + 1));
                values.push(product_data.brand_name);
            }

            // if no fieldss are present in request body
            if (fields.length === 0) {
                return { message: "No fields to update" }
            }
            // join the fieldss array
            query += fields.join(", ");
            query += " WHERE product_id = $" + (fields.length + 1) + " RETURNING *";
            values.push(product_id);

            const editProduct = await db.query(query, values);
            return editProduct.rows;

        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = ProductRepository;
