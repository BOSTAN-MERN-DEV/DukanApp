const ProductService = require('../app/services/product.service')
const { API_STATUS_CODES, RESPONSE_MESSAGES } = require('../constants/constant')

class ProductController {

    // ADD PRODUCTS METHOD 
    static addProducts = async (req, res) => {
        try {
            const { product_title, product_sku, product_price, product_quantity, product_description, image, brand_name, category_id, seller_id } = req.body;
            const data = await ProductService.addProducts({ product_title, product_sku, product_price, product_quantity, product_image: image, product_description, brand_name, category_id, seller_id });
            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, data })
        } catch (error) {
            throw error;
        }
    }

    //GET ALL PRODUCTS
    static getAllProducts = async (req, res) => {
        try {
            const data = await ProductService.getAllProducts();
            res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, data });
        } catch (err) {
            if (err.ERROR_CODE == API_STATUS_CODES.INTERNAL_SERVER_ERROR) {
                return res.json({ status: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.AUTHORIZATION_FAILED })
            }
        }

    }

    //GET PRODUCT BY ID
    static getProductById = async (req, res) => {
        try {
            const { product_id } = req.params;
            const data = await ProductService.getProductById(product_id);
            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, data });
        } catch (err) {
            throw err;
        }

    }

    //DELETE ALL PRODUCTS
    static deleteAllProducts = async (req, res) => {
        try {
            // CHECK IF PRODUCTS EXIST AGAINST THIS SELLER
            const seller_id = req.params.id;
            const data = await ProductService.getProductsAgainstSeller({ seller_id });
            console.log(data)
            if (data.length === 0) {
                res.json({ status: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.AUTHORIZATION_FAILED, message: "No products exists in database against this seller.", data: data });
            }
            // DELETE ALL PRODUCTS OF SPEIFIC SELLER
            else {
                const data = await ProductService.deleteAllProducts(seller_id);
                res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, message: "product deleted succesfully against seller", data: data });
            }

        } catch (err) {
            console.log(err)
            res.json({ status: API_STATUS_CODES.INTERNAL_SERVER_ERROR, message: "An error occured while deleting all products." })
        }

    }

    //DELETE PRODUCT BY ID
    static deleteProductById = async (req, res) => {
        try {
            // CHECK IF PRODUCT EXITS OR NOT
            const product_id = req.params.id;
            const data = await ProductService.getProductById(product_id);
            if (data.length === 0) {
                return res.json({ status: API_STATUS_CODES.NOT_FOUND, message: `Product with id ${product_id} does not exist.` })
            }
            else {
                // REMOVE PRODUCT
                const data = await ProductService.deleteProductById(product_id);
                return res.json({ status: API_STATUS_CODES.SUCCESS, message: `Product with id: ${product_id} is deleted.`, data })
            }

        } catch (err) {
            console.log(err);
            return res.json({ status: API_STATUS_CODES.INTERNAL_SERVER_ERROR, message: "An error occured while deleting product." })
        }

    }
    // EDIT PRODUCT
    static editProduct = async (req, res) => {
        try {
            const { product_id } = req.params;
            const { category_id, product_sku, product_title, product_price, product_quantity, product_image, product_description, brand_name } = req.body;

            const data = await ProductService.editProduct({ product_sku, product_title, product_price, product_quantity, product_image, product_description, brand_name, category_id, product_id })
            return res.json({ status: API_STATUS_CODES.SUCCESS, message: "Record updated succesfully.", data });
        } catch (err) {
            console.log(err);
            return res.json({ status: API_STATUS_CODES.INTERNAL_SERVER_ERROR, message: "An error occured while updating product." })
        }

    }

}

module.exports = ProductController;
