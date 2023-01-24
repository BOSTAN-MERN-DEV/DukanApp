const CategoryFactory = require("../factories/category.factory");
const CategoryRepository = require("../repositories/category.repository");
// const CategoryService = require("../app/services/category.service.js");


class CategoryService {
    static async getCategory(){
        try {
            const getCategory = await CategoryRepository.getCategory();
            return getCategory;
        } catch (error) {
            
        }
    }

    static async getCategoryByID(id){
        try {
            const getCategoryByID = await CategoryRepository.getCategoryByID(id);
            return getCategoryByID;
        } catch (err) {
            
        }
    }

    static async createCategory(data) {
        try {
            const creatCategory = await CategoryRepository.createCategory(data);
            const categoryFormate = await CategoryFactory.createCategory(creatCategory);
            return categoryFormate;
        } catch (err) {
            
        }
    }

    static async updateCategory(updateData) {
        try {
            const data = await CategoryRepository.updateCategory(updateData);
            return data;
        } catch (err) {
            
        }
    }

    static async deleteCategory({id}) {
        try {
            const data = await CategoryRepository.deleteCategory({id});
        return data;
        } catch (err) {
            
        }
        
    }   
}

module.exports = CategoryService;