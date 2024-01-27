const router = require("express").Router()
const { AddService, GetAllServices, DeleteServices, UpdateService, GetSingleServiceData, DeleteByID, GetTheService } = require("../../Controllers/Services/ServicesController")
 
router.get("/mange/postdetail", GetAllServices);

router.post('/mange/postdetail', AddService);

router.put("/mange/postdetail/:id", GetAllServices);

router.get("/mange/postdetail/:id", GetSingleServiceData);


router.post("/mange/postdetail/:id", DeleteServices);

module.exports = router 
