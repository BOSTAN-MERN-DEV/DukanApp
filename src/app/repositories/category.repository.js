const { response } = require("express");
const db = require("../../config/config")

class CategoryRepository {
    static async getCategory(){
        try {
            const result = await db.query(
                "SELECT * FROM categories"
            )
            return result.rows;
        } catch (error) {
            throw err;
        }
    }

    static async getCategoryByID(id){
        try {
            const result = await db.query(
                "SELECT * FROM categories WHERE category_id = $1",
                [id])
            return result.rows;
        } catch (err) {
            
        }
    }

    static async createCategory(data) {
        try {
            let { category_name } = data;
            const result = await db.query(
                "INSERT INTO categories (category_name) VALUES ($1) RETURNING *",
                [category_name])
            return result.rows;
        } catch (err) {
            throw err;
        }
    }

    static async updateCategory(category) {
        try {
            let {category_id, category_name} = category;
            const result = await db.query("UPDATE categories SET category_name = $1 WHERE category_id=$2 RETURNING *", 
            [category_name, category_id])
            return result.rows;
        } catch (err) {
            
        }
    }

    static async deleteCategory({id}) {
        try {
            const result  = await db.query( "DELETE FROM categories WHERE category_id = $1",
            [id]);
            return result.rows;
        } catch (err) {
            
        }
    }

}

module.exports = CategoryRepository;