const router = require("express").Router();
const { AddAdminRoles, GetRoles, UpdateRoles } = require('../../Controllers/RolesAndPermission/RolesAndPermissionController')


// set the Admin Roles
router.post("/add", AddAdminRoles);
// get the roles 
router.get("/get/:role", GetRoles);

// update the role field 
router.get("/update/:role/:field/:value", UpdateRoles)






module.exports = router