const AdminService = require("../app/services/admin.service");
const { verifyToken } = require("../utils/validators/authMiddleware")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { API_STATUS_CODES, RESPONSE_MESSAGES } = require("../constants/constant");



class AdminController {
    // ADD NEW SELLER BUSINESS REGISTRATION

    static addNewSeller = async (req, res) => {
        try {

            const { seller_name, seller_email, seller_password, seller_address, seller_city, seller_postalcode, seller_phone, business_name, is_approved } = req.body;
            const addedseller = await AdminService.addNewSeller({ seller_name, seller_email, seller_password, seller_address, seller_city, seller_postalcode, seller_phone, business_name, is_approved });
            return res.json({ status: API_STATUS_CODES.SUCCESS, message: "Seller added successfully", Data: addedseller })
        } catch (error) {
            if (error.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.json({ message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }
            throw error;
        }
    }
    // DELETE SELLER  RECORD
    static deleteSeller = async (verifyToken, req, res) => {
        try {
            jwt.verify(req.token, process.env.MY_SECRET, (err, authData) => {
                if (err) {
                    res.send({ result: "Invalid Token" })
                } else {
                    res.json({
                        message: "seller deleted",
                        authData
                    })
                }
            })

            const { id } = req.params;
            const data = await AdminService.getProductsAgainstSeller(id);
            if (data.length > 0) {
                res.json({ message: `There are products listed against this seller with id: ${id}` });
            }
            else {
                const data2 = await AdminService.deleteSeller(id);
                return res.json({ message: "Seller deleted succesfully" });
            }
        } catch (err) {
            console.log(err);
            res.json({ message: "Error while deleting seller." });
        }
    }

    // DELETE CUSTOMER RECORD
    static deleteCustomer = async (req, res) => {
        try {
            const id = req.params.id;
            const data = await AdminService.getOrdersAgainstCustomers(id);
            if (data.length > 0) {
                res.json({ message: `There are orders  against this customer with id: ${id}` });
            }
            else {
                const data2 = await AdminService.deleteCustomer(id);
                return res.json({ message: "customer deleted succesfully" });
            }
        } catch (error) {
            if (error.code === API_STATUS_CODES.NOT_FOUND) {
                return res.json({ message: "customer does not exist" })
            }
        }
    }
    //  VIEW all sellers THAT ARE REGISTERED IN OUR STORE
    static viewallSellers = async (req, res) => {
        try {
            const data = await AdminService.viewallSellers();
            return res.json({ message: RESPONSE_MESSAGES.SUCCESS, data });
        } catch (error) {
            if (error.code === API_STATUS_CODES.INTERNAL_SERVER_ERROR) {
                return res.json({ STATUS: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.AUTHORIZATION_FAILED })
            }
        }
    }
    //  view all Customers THAT ARE REGISTERED IN OUR STORE
    static viewallCustomers = async (req, res) => {
        try {
            const data = await AdminService.viewallCustomers();
            return res.json({ message: RESPONSE_MESSAGES.SUCCESS, data });
        } catch (error) {
            if (error.code === API_STATUS_CODES.INTERNAL_SERVER_ERROR) {
                return res.json({ STATUS: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.AUTHORIZATION_FAILED })
            }
        }
    }
    //  VIEW all Orders AGAINST EACH SELLER
    static viewallOrders = async (req, res) => {
        try {
            const data = await AdminService.viewallOrders();
            return res.json({ message: RESPONSE_MESSAGES.SUCCESS, data });
        } catch (error) {
            if (error.code === API_STATUS_CODES.INTERNAL_SERVER_ERROR) {
                return res.json({ STATUS: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.AUTHORIZATION_FAILED })
            }
        }
    }
    // approval request for new product List
    static approvalProductRequest = async (req, res) => {
        try {
            const getPendingApproval = await AdminService.approvalProductRequest();
            return res.json({ message: "pending products list", getPendingApproval })
        } catch (error) {
            throw error;
        }
    }
    // approval request for new seller business registrations  
    static approvalSellerRequest = async (req, res) => {
        try {
            const getPendingSellerApproval = await AdminService.approvalSellerRequest();
            return res.json({ message: "pending seller registration list", getPendingSellerApproval })
        } catch (error) {
            throw error;
        }
    }





}


module.exports = AdminController;