const db = require("../../config/config");

class AdminRepository {
  // INSERT NEW SELLER BUSINESS INFORMATION
  static addNewSeller = async (data) => {
    try {
      const { seller_name, seller_email, seller_password, seller_address, seller_city, seller_postalcode, seller_phone, business_name, is_approved } = data;
      const result = await db.query("insert into seller(seller_name,seller_email,seller_password,seller_address,seller_city,seller_postalcode,seller_phone,business_name, is_approved) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
        [seller_name, seller_email, seller_password, seller_address, seller_city, seller_postalcode, seller_phone, business_name, is_approved])
      return result.rows;

    } catch (error) {
      throw error;
    }
  }
// GET PRODUCTS AGAINST EACH SELLER 
  static getProductsAgainstSeller = async (S_id) => {
    try {
      const seller_Id = S_id;
      const data = await db.query("SELECT seller_id FROM products WHERE seller_id = $1",
        [seller_Id])
      return data.rows;

    } catch (err) {
      throw err;
    }
  }
// DELETE SELLER PROFILE
  static deleteSeller = async (S_id) => {
    try {
      const seller_Id = S_id;
      const result = await db.query("DELETE FROM seller WHERE seller_id=$1",
        [seller_Id]);
      console.log("record deleted")
      return result.rows;

    } catch (err) {
      throw err;
    }
  }
// GET ORDERS AGAINST EACH CUSTOMER
  static getOrdersAgainstCustomers = async (C_id) => {
    try {
      const customer_Id = C_id;
      const data = await db.query("SELECT customer_id FROM orders WHERE customer_id = $1",
        [customer_Id])
      return data.rows;

    } catch (err) {
      throw err;
    }
  }
// DELETE CUSTOMER PROFILE 
  static deleteCustomer = async (C_id) => {
    try {
      const customer_id = C_id;
      const result = await db.query("DELETE FROM customer WHERE customer_id=$1", [customer_id]);
      return result.rows;

    } catch (error) {
      throw error;
    }
  }
//  VIEW ALL SELLERS ARE REGSITERED IN OUR STORE
  static viewallSellers = async () => {
    try {
      const viewallSellers = await db.query("select * from seller");
      return viewallSellers.rows;
    } catch (error) {
      throw error;
    }
  }
//  VIEW ALL CUSTOMERS ARE REGSITERED IN OUR STORE
  static viewallCustomers = async () => {
    try {
      const viewallCustomers = await db.query("select * from customer");
      return viewallCustomers.rows;
    } catch (error) {
      throw error;
    }
  }
// VIEW ALL ORDERS AGAINST EACH SELLER
  static viewallOrders = async () => {
    try {
      const viewallOrders = await db.query("select * from orders");
      return viewallOrders.rows;
    } catch (error) {
      throw error;
    }
  }
// GET APPROVAL PRODCUTS REQUEST
    static approvalProductRequest = async()=>{
    try {
       const approvalProductRequest = await db.query("select * from products where is_approved = false")
       return approvalProductRequest.rows;
    } catch (error) {
      throw error;
    }
}
// GET APPROVAL SELLER REQUESTS
    static approvalSellerRequest = async()=>{
       try {
         
            const approvalSellerRequest = await db.query("select * from seller where is_approved = false")
            return approvalSellerRequest.rows;
       } catch (error) {
         throw error;
       }
 }
}

module.exports = AdminRepository;