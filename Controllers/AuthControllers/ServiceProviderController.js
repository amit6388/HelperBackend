const ServiceProviderModel = require("../../Models/AuthModels/ServiceProviderModel")
const { isEmail, isMobileNumber } = require("../utils")
const jwt = require("jsonwebtoken");
require("dotenv").config();



// Add the Service Provider
const AddServiceProvider = async (req, res) => {
    const formdata = req.body

    // check the service provider is already register or not 
    const isUser = await ServiceProviderModel.findOne({ mobileNo: formdata.mobileNo })
    if (isUser) return res.status(409).json({ error: true, message: "User Already Registered with this Mobile No." })

    try {
        // register the service provider 
        const isReg = await new ServiceProviderModel(formdata).save()
        if (!isReg) return res.status(400).json({ error: true, message: "Not Register Please Try Again" })

        res.status(200).json({ error: false, data: isReg })
    } catch (error) {
        res.status(500).json(error)
    }
}


// Login THe service provder 

const LoginServiceProvider = async (req, res) => {
    const { email, password } = req.body; // Use req.body instead of req.params
    try {
        // find the data type user email or mobile no 
        const dataType = isEmail(email) === true ? "email" : isMobileNumber(email) === true ? "mobileNo" : "Invalid Credential";
        if (dataType === "Invalid Credential") {
            return res.status(400).json({ error: true, message: "Please Enter the Valid Email Or Mobile Number" });
        }

        const CheckField = { [dataType]: email };

        // find the user 
        const isUser = await ServiceProviderModel.findOne(CheckField);
        if (!isUser) {
            return res.status(404).json({ error: true, message: "No user found" });
        }

        const compare = isUser.password === password;
        if (!compare) {
            return res.status(404).json({ error: true, message: "Invalid Password" });
        }

        // Convert the Mongoose document to a plain JavaScript object
        const userWithoutPassword = isUser.toObject();
        delete userWithoutPassword.password; // Remove the password from the object

        // generate the jwt token  
        const token = jwt.sign(userWithoutPassword, process.env.SECRET_CODE);
        res.header("access-token", token);
        res.status(200).json(userWithoutPassword);

    } catch (error) {
        res.status(500).json({ error });
    }
}
``


// Update the data 
const UpdateTheServiceProvider = async (req, res) => {
    const updatedData = req.body;
    const id = req.params.id

    try {
        const isUpdated = await ServiceProviderModel.findByIdAndUpdate(id, updatedData, { new: true })
        if (!isUpdated) return res.status(400).json({ error: true, message: "Updation Failed Retry" })

        res.status(200).json({ error: false, data: isUpdated })
    } catch (error) {
        res.status(500).json({ error })
    }
}


// delete the data by id 
const DeleteTheServiceProvider = async (req, res) => {
    const id = req.params.id

    try {
        // find the user and delete 
        const isDeleted = await ServiceProviderModel.findByIdAndDelete(id)
        if (!isDeleted) return res.status(400).json({ error: true, message: "Not deleted try Again" })

        res.status(200).json({ error: false, message: "Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ error })
    }
}



// Delete all 
const DeleteAllServiceVendor = async (req, res) => {

    try {
        const isDeleted = await ServiceProviderModel.deleteMany({})
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

const GetAllTheServiceProvider = async (req, res) => {
    try {
        const result = await ServiceProviderModel.find({})
        if (!result) return res.status(400).json({ error: true, message: "No Data Found" })

        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json({ error })
    }
}


// get data by id 
const GetDataById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await ServiceProviderModel.findById(id)
        if (!result) return res.status(404).json({ error: true, message: "No User Found" })

        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json({ error })
    }
}


module.exports = { AddServiceProvider, LoginServiceProvider, UpdateTheServiceProvider, DeleteTheServiceProvider, DeleteAllServiceVendor, GetAllTheServiceProvider, GetDataById }