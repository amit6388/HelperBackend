const AdminModel = require("../../Models/AuthModels/AdminModel");
const jwt = require("jsonwebtoken")
const { isEmail, isMobileNumber } = require("../utils");
require('dotenv').config();



// add the admin 
const CreateTheAdmin = async (req, res) => {
    const formdata = req.body;

    try {
        // check the super admin is register or not 
        const isReg = await AdminModel.findOne({})
        if (isReg) return res.status(409).json({ error: true, message: "Admin is Already Registered" })


        // create the admin 
        const NewCreated = await new AdminModel(formdata).save()
        if (!NewCreated) return res.status(400).json({ error: true, message: "Not registered ! Try Again " })

        res.status(200).json({ error: false, data: NewCreated })
    } catch (error) {
        res.status(500).json(error)
    }
}


// Login the Admin 
const LoginAdmin = async (req, res) => {
    const formdata = req.body;
    try {
        // find the data type user email or mobile no
        const dataType = isEmail(formdata.email) === true ? "email" : isMobileNumber(formdata.email) === true ? "mobileNo" : "Invalid Credential";
        if (dataType === "Invalid Credential") {
            return res.status(400).json({ error: true, message: "Please Enter the Valid Email Or Mobile Number" });
        }

        const CheckField = { [dataType]: formdata.email }; // <-- Use formdata.email instead of email

        // find the user
        const isUser = await AdminModel.findOne(CheckField);
        if (!isUser) {
            return res.status(404).json({ error: true, message: "No user found" });
        }

        // compare the password
        const compare = isUser.password === formdata.password;
        if (!compare) {
            return res.status(404).json({ error: true, message: "Invalid Password" });
        }

        // Convert the Mongoose document to a plain JavaScript object
        const userWithoutPassword = isUser.toObject();
        delete userWithoutPassword.password; // Remove the password from the object

        // generate the jwt token
        const token = jwt.sign(userWithoutPassword, process.env.SECRET_CODE);
        res.header("access-token", token);
        res.status(200).json(userWithoutPassword); // <-- Send the user object without the password

    } catch (error) {
        res.status(500).json(error);
    }
}



// Update the Admin Details 

const UpdateAdmin = async (req, res) => {
    const id = req.params.id

    try {
        const isUpdated = await AdminModel.findByIdAndUpdate(id, {
            ...req.body,
        }, { new: true })

        if (!isUpdated) return res.status(400).json({ error: true, message: "No updated " })

        res.status(200).json({ error: false, data: isUpdated })
    } catch (error) {
        res.status(500).json({ error })
    }
}


module.exports = { CreateTheAdmin, LoginAdmin, UpdateAdmin }
