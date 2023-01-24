

class CategoryFactory {
    constructor(data) {
        this.category_name = data.category_name;
        this.category_id = data.category_id;
    
    }


    static async createCategory(data){
        const category = new CategoryFactory(data[0]);

        return category;
    }
}

module.exports = CategoryFactory;