const express = require("express");
const AdminController = require("../controllers/admin.controller");
const router = express.Router();
const authMiddleware = require("../utils/validators/authMiddleware")

router.post("/addseller", AdminController.addNewSeller)
router.delete("/seller/:id", AdminController.deleteSeller)
router.delete("/customer/:id", AdminController.deleteCustomer)
router.get("/allsellers",  authMiddleware.verifyToken, AdminController.viewallSellers)
router.get("/allcustomer", AdminController.viewallCustomers)
router.get("/allorders", AdminController.viewallOrders)
router.get("/approval", AdminController.approvalProductRequest)
router.get("/sellerapproval", AdminController.approvalSellerRequest)





module.exports = router;
