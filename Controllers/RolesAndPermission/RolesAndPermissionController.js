const AdminRolesModel = require("../../Models/RolesAndPermission/AdminRolesModel");
const BackofficeRoleModel = require("../../Models/RolesAndPermission/BackOfficeModel");
const ServiceProviderRolesModel = require("../../Models/RolesAndPermission/ServiceProviderModel");
const SuperAdminRolesModel = require("../../Models/RolesAndPermission/SuperAdminModel");
const SuperVisorRolesModel = require("../../Models/RolesAndPermission/SupervisorModel");
const { roles } = require("../../config");

// add the admin roles 


const AddAdminRoles = async (req, res) => {
    const Allroles = req.body;

    try {
        const result = await new ServiceProviderRolesModel(req.body).save()
        if (!result) return res.status(400).json({ error: true, message: "Roles not Added" })
        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json({ error })
    }
}



// get the roles  
const GetRoles = async (req, res) => {
    const reqRole = req.params.role
    try {
        let result;
        if (reqRole === roles.super) {
            result = await SuperAdminRolesModel.findOne({})
        } else if (reqRole === roles.admin) {
            result = await AdminRolesModel.findOne({})
        } else if (reqRole === roles.office) {
            result = await BackofficeRoleModel.findOne({})
        } else if (reqRole === roles.service) {
            result = await ServiceProviderRolesModel.findOne({})
        } else if (reqRole === roles.supervisor) {
            result = await SuperVisorRolesModel.findOne({})
        } else {
            result = result
        }

        if (!result) return res.status(404).json({ error: true, message: "Not Found data" })
        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json(error)
    }
}


const UpdateRoles = async (req, res) => {
    let role = req.params.role
    let field = req.params.field
    let value = req.params.value
    try {
        let result;
        if (role === roles.super) {
            result = await SuperAdminRolesModel.findOne({})
        } else if (role === roles.admin) {
            result = await AdminRolesModel.findOne({})
        } else if (role === roles.office) {
            result = await BackofficeRoleModel.findOne({})
        } else if (role === roles.service) {
            result = await ServiceProviderRolesModel.findOne({})
        } else if (role === roles.supervisor) {
            result = await SuperVisorRolesModel.findOne({})
        } else {
            result = result
        }

        if (!result) return res.status(404).json({ error: true, message: "Not Found data" })

        // update the field of that data
        result[field] = value
        result.save()

        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = { AddAdminRoles, GetRoles, UpdateRoles }