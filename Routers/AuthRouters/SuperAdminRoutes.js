

const router = require("express").Router();
const { CreateTheAdmin, LoginAdmin, UpdateAdmin } = require("../../Controllers/AuthControllers/AdminAuthController")


// make admin 
router.post("/add", CreateTheAdmin);

// update admin
router.post("/update/:id", UpdateAdmin);

// login Admin
router.post("/login", LoginAdmin);






module.exports = router