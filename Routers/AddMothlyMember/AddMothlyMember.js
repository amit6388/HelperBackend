const router = require("express").Router()
const { AddService, GetAllServices, DeleteServices, UpdateService, GetSingleServiceData, DeleteByID, GetTheService } = require("../../Controllers/Services/ServicesController")
 
router.get("/customer/addmonthlymember", GetAllServices);

router.post('/customer/addmonthlymember', AddService);

router.put("/customer/addmonthlymember/:id", GetAllServices);

router.get("/customer/addmonthlymember/:id", GetSingleServiceData);


router.post("/customer/addmonthlymember/:id", DeleteServices);

module.exports = router 
