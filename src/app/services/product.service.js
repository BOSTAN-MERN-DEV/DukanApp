const ProductRepository = require('../repositories/product.repository')
class ProductService {

    // SHOW ALL PRODUCTS SERVICE FUNCTION
    static getAllProducts = async () => {
        const getAllProducts = await ProductRepository.getAllProducts();
        return getAllProducts;
    }

    // SHOW SINGLE PRODUCT SERVICE FUNCTION
    static getProductById = async (p_id) => {
        const getProductById = await ProductRepository.getProductById(p_id);
        return getProductById;
    }

    // GET ALL PRODUCTS LISTED BY SELLER SERVICE FUNCTION
    static getProductsAgainstSeller = async (s_id) => {
        const getProductsAgainstSeller = await ProductRepository.getProductsAgainstSeller(s_id);
        return getProductsAgainstSeller;
    }

    // DELETE ALL PRODUCTS OF A SPECIFIC SELLER SERVICE FUNCTION
    static deleteAllProducts = async (s_id) => {
        const deleteAllProducts = await ProductRepository.deleteAllProducts(s_id);
        return deleteAllProducts;
    }

    // DELETE SINGLE PRODUCT SERVICE FUNCTION
    static deleteProductById = async (p_id) => {
        const deleteProductById = await ProductRepository.deleteProductById(p_id);
        return deleteProductById;
    }

    // EDIT PRODUCT SERVICE FUNCTION
    static editProduct = async (product_data) => {
        const editProduct = await ProductRepository.editProduct(product_data);

        return editProduct;
    }
}

module.exports = ProductService;