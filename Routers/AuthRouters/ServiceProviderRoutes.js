const router = require("express").Router();
const { AddServiceProvider, LoginServiceProvider, UpdateTheServiceProvider, DeleteTheServiceProvider, DeleteAllServiceVendor, GetAllTheServiceProvider, GetDataById } = require("../../Controllers/AuthControllers/ServiceProviderController")

// add serviceProvier Route
router.post("/add", AddServiceProvider);
// Login In service provider
router.post("/login", LoginServiceProvider)
// update the service provider 
router.patch("/update/:id", UpdateTheServiceProvider);
// Delete The service PRovider 
router.get("/delete/:id", DeleteTheServiceProvider);
// delete all the service provider 
router.delete("/deleteall", DeleteAllServiceVendor);
// get all the service provider 
router.get("/getall", GetAllTheServiceProvider);
// get the single service provider 
router.get("/get/:id", GetDataById);
// send notification on mobile number 
// router.get("/send-notification/:number")




module.exports = router