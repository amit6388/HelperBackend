const router = require("express").Router()
const { AddService, GetAllServices, DeleteServices, UpdateService, GetSingleServiceData, DeleteByID, GetTheService } = require("../../Controllers/Services/ServicesController")
 
router.get("/mangepage/addnewads", GetAllServices);

router.post('/mangepage/addnewads', AddService);

router.put("/mangepage/addnewads/:id", GetAllServices);

router.get("/mangepage/addnewads/:id", GetSingleServiceData);


router.post("/mangepage/addnewads/:id", DeleteServices);

module.exports = router 
