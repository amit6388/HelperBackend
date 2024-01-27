const router = require('express').Router()
const { AddEmployee, LoginEmployee, UpdateTheEmployeeData, DeleteTheEmployeeData, DeleteAllEmployeeData, GetAllEmployeeData, GetEmployeeById } = require('../../Controllers/AuthControllers/OfficeControllers')

// add serviceProvier Route
router.post("/add", AddEmployee);
// Login In service provider
router.post("/login/:logger", LoginEmployee)
// update the service provider 
router.patch("/update/:id", UpdateTheEmployeeData);
// Delete The service PRovider 
router.get("/delete/:id", DeleteTheEmployeeData);
// delete all the service provider 
router.delete("/deleteall", DeleteAllEmployeeData);
// get all the service provider 
router.get("/getall", GetAllEmployeeData);
// get the single service provider 
router.get("/get/:id", GetEmployeeById);
// send notification on mobile number 
// router.get("/send-notification/:number")







module.exports = router