const CategoryService = require("../app/services/category.service.js");
// const categoryService = require("../app/services/category.service.js");
const { API_STATUS_CODES, RESPONSE_MESSAGES } = require("../constants/constant")

class CategoryController {
      /* ? Get Category Details */
    static async getCategory(req, res) {
        try {
            const allCategory = await CategoryService.getCategory();
            return res.json({staus: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: allCategory })
        } catch (err) {
            if (err.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.json({ staus: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }
            throw err
        }
    }
    /* ? Get Category By Id */

    static async getCategoryByID(req, res) {
        try {
            const id = parseInt(req.params.id);
            const singleCategory = await CategoryService.getCategoryByID(id);
            return res.json({statu:  API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: singleCategory})
        } catch (err) {
            if (err.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.json({ staus: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }

            throw err;
        }
    }

     /* ? Create a Category */
    static async createCategory(req, res) {
        try {
            const { category_name } = req.body;
            const createdCategory = await CategoryService.createCategory({ category_name });

            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: createdCategory })
        } catch (err) {
            if (err.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.json({ staus: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }

            throw err;
        }
    }

    /*? Update Category Detail */
    static async updateCategory(req, res) {
        try {
            const {category_id} = req.params;
            const {category_name} = req.body;

            const data = await CategoryService.updateCategory({category_id, category_name});
            return res.json({status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: data});
        } catch (err) {
            if (err.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.json({ staus: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }
            throw err;
        }
    }
    /* ? Delete Category Detail */
    static async deleteCategory(req, res) {
        try {
            const {id} = req.params
            const data = await CategoryService.deleteCategory({id});
            return res.json({status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: data});
        } catch (err) {
            if (err.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.json({ staus: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }
            throw err;
        }
    }
}

module.exports = CategoryController;