const router = require("express").Router()
const { AddService, GetAllServices, DeleteServices, UpdateService, GetSingleServiceData, DeleteByID, GetTheService } = require("../../Controllers/Services/ServicesController")
 
router.get("/customer/enquiry", GetAllServices);

router.post('/customer/enquiry', AddService);

router.put("/customer/enquiry/:id", GetAllServices);

router.get("/customer/enquiry/:id", GetSingleServiceData);


router.post("/customer/enquiry/:id", DeleteServices);

module.exports = router 
