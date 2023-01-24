const express = require("express");
const AdminController = require("../controllers/admin.controller");
const router = express.Router();

router.post("/addseller",AdminController.addNewSeller)
router.delete("/seller/:id",AdminController.deleteSeller)
router.delete("/customer/:id",AdminController.deleteCustomer)
router.get("/allsellers",AdminController.viewallSellers)
router.get("/allcustomer",AdminController.viewallCustomers)
router.get("/allorders",AdminController.viewallOrders)
router.get("/approval",AdminController.approvalProductRequest)
router.get("/sellerapproval",AdminController.approvalSellerRequest)





module.exports = router;
