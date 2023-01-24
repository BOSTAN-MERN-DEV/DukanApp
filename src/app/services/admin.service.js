const AdminRepository = require("../repositories/admin.repository")




class AdminService {
    // ADD NEW SELLER BUSINESS REGISTRATION SERVICE FUNCTION
    static addNewSeller = async (data) => {
        try {
            const addNewSeller = await AdminRepository.addNewSeller(data);
            return addNewSeller;
        } catch (error) {
            throw error;
        }
    }
    // DELETE SELLER  RECORD SERVICE FUNCTION
    static deleteSeller = async (S_id) => {
        try {
            const deleteSeller = await AdminRepository.deleteSeller(S_id);
            return deleteSeller;
        } catch (error) {
            throw error;
        }
    }
    // GET PRODUCTS RECORD AGAINST SELLER TO CHECK FIRST BEFORE DELETE ANY SELLER PROFILE
    static getProductsAgainstSeller = async (S_id) => {
        try {
            const getProductsAgainstSeller = await AdminRepository.getProductsAgainstSeller(S_id);
            return getProductsAgainstSeller;
        } catch (err) {
            throw err;
        }

    }

    // DELETE CUSTOMER RECORD SERVICE FUNCTION
    static deleteCustomer = async (C_id) => {
        try {
            const deleteCustomer = await AdminRepository.deleteCustomer(C_id);
            return deleteCustomer;
        } catch (error) {
            throw error;
        }
    }
     // GET ORDERS RECORD AGAINST CUSTOMER TO CHECK FIRST BEFORE DELETE ANY CUSTOMER PROFILE
    static getOrdersAgainstCustomers = async (C_id) => {
        try {
            const getOrdersAgainstCustomers = await AdminRepository.getOrdersAgainstCustomers(C_id);
            return getOrdersAgainstCustomers;
        } catch (err) {
            throw err;
        }
    }
    //  VIEW all sellers THAT ARE REGISTERED IN OUR STORE SERVICE FUNCTION
    static viewallSellers = async () => {
        try {
            const viewallSellers = await AdminRepository.viewallSellers();
            return viewallSellers;
        } catch (error) {
            throw error;
        }
    }
     //  view all Customers THAT ARE REGISTERED IN OUR STORE SERVICE FUNCTION
    static viewallCustomers = async () => {
        try {
            const viewallCustomers = await AdminRepository.viewallCustomers();
            return viewallCustomers;
        } catch (error) {
            throw error;
        }
    }
    //  VIEW all Orders AGAINST EACH SELLER SERVICE FUNCTION
    static viewallOrders = async () => {
        try {
            const viewallOrders = await AdminRepository.viewallOrders();
            return viewallOrders;
        } catch (error) {
            throw error;
        }
    }
    // approval request for new product List SERVICE FUNCTION
    static approvalProductRequest = async () => {
        try {
            const approvalProductRequest = await AdminRepository.approvalProductRequest();
            return approvalProductRequest;
        } catch (error) {
            throw error;
        }
    }
    // approval request for new seller business registrations  SERVICE FUNCTION
    static approvalSellerRequest = async () => {
        try {
            const approvalSellerRequest = await AdminRepository.approvalSellerRequest();
            return approvalSellerRequest;
        } catch (error) {
            throw error;
        }
    }



}

module.exports = AdminService;