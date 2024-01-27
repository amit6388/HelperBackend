
const EmployeeModel = require("../../Models/AuthModels/EmployeeModel");
const jwt = require("jsonwebtoken");
const { isEmail, isMobileNumber } = require("../utils");
const generateEmployeeId = require("../misc/employeeIdGenerator");
require("dotenv").config();


// Add the Service Provider
const AddEmployee = async (req, res) => {

    const formdata = req.body
    // check the service provider is already register or not 
    const isUser = await EmployeeModel.findOne({ mobileNo: formdata.mobileNo })
    if (isUser) return res.status(409).json({ error: true, message: "User Already Registered with this Mobile No." })

    // Employee Id Generate

    const EmployeeID = await generateEmployeeId()

    try {
        // register the service provider 
        const isReg = await new EmployeeModel({
            ...formdata,
            empId: EmployeeID
        }).save()
        if (!isReg) return res.status(400).json({ error: true, message: "Not Register Please Try Again" })

        res.status(200).json({ error: false, data: isReg })
    } catch (error) {
        res.status(500).json(error)
    }
}


const roles = {
    admin: "Admin",
    office: "Back Office",
    supervisor: "supervisor"
}

// Login THe service provder 

const LoginEmployee = async (req, res) => {
    const { email, password } = req.body;
    const { logger } = req.params;
    try {
        // find the data type user email or mobile no 
        const dataType = isEmail(email) === true ? "email" : isMobileNumber(email) === true ? "mobileNo" : "Invalid Credential"
        if (dataType === "Invalid Credential") return res.status(400).json({ error: true, message: "Please Enter the Valid Email Or Mobile Number", })


        const CheckField = { [dataType]: email }

        // find the uer 
        const isUser = await EmployeeModel.findOne(CheckField)
        if (!isUser) return res.status(404).json({ error: true, message: "No user found" })

        if (isUser.role !== roles[`${logger}`]) return res.status(404).json({ error: true, message: `Please Login In As per your Post ` }); console.log("Login as per your role")
        // compare the password 

        const compare = isUser.password === password
        if (!compare) return res.status(404).json({ error: true, message: "Invalid Password" })

        // Convert the Mongoose document to a plain JavaScript object
        const userWithoutPassword = isUser.toObject();
        delete userWithoutPassword.password; // Remove the password from the object

        //  generate the jwt token  
        const token = jwt.sign(userWithoutPassword, process.env.SECRET_CODE)
        res.header("access-token", token)
        res.status(200).json(userWithoutPassword)

    } catch (error) {
        res.status(500).json({ error })
    }
}



// Update the data 
const UpdateTheEmployeeData = async (req, res) => {
    const updatedData = req.body;
    const id = req.params.id

    try {
        const isUpdated = await EmployeeModel.findByIdAndUpdate(id, updatedData, { new: true })
        if (!isUpdated) return res.status(400).json({ error: true, message: "Updation Failed Retry" })

        res.status(200).json({ error: false, data: isUpdated })
    } catch (error) {
        res.status(500).json({ error })
    }
}


// delete the data by id 
const DeleteTheEmployeeData = async (req, res) => {
    const id = req.params.id

    try {
        // find the user and delete 
        const isDeleted = await EmployeeModel.findByIdAndDelete(id)
        if (!isDeleted) return res.status(400).json({ error: true, message: "Not deleted try Again" })

        res.status(200).json({ error: false, message: "Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ error })
    }
}



// Delete all 
const DeleteAllEmployeeData = async (req, res) => {

    try {
        const isDeleted = await EmployeeModel.deleteMany({})
        if (isDeleted) {
            res.status(200).json({ error: false, message: "Deleted Successfully" })
        } else {
            res.status(400).json({ error: true, message: "Not deleted" })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}



// get all the service provider

const GetAllEmployeeData = async (req, res) => {
    try {
        const result = await EmployeeModel.find({})
        if (!result) return res.status(400).json({ error: true, message: "No Data Found" })

        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json({ error })
    }
}


// get data by id 
const GetEmployeeById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await EmployeeModel.findById(id)
        if (!result) return res.status(404).json({ error: true, message: "No User Found" })

        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json({ error })
    }
}


module.exports = { AddEmployee, LoginEmployee, UpdateTheEmployeeData, DeleteTheEmployeeData, DeleteAllEmployeeData, GetAllEmployeeData, GetEmployeeById }