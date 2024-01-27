
const CustomerModel = require("../../Models/AuthModels/CustomerModel")
const jwt = require("jsonwebtoken")
const { isEmail, isMobileNumber } = require("../utils");
const generateCustomerID = require("../misc/customeridgenerator");
const generateOrderNo = require("../misc/orderNoGenerator");
require('dotenv').config



// signup 
const SignupUser = async (req, res) => {

    try {
        // lets validate the data
        // const { error, value } = SingupValidate(req.body);
        // if (error) return res.status(400).json(error.details[0].message);


        // username avialability check
        const isUserFound = await CustomerModel.findOne({ mobileNo: req.body.mobileNo })
        if (isUserFound) return res.status(409).json("You Are Already Our Customer Please Login In")

        const isUserEmail = await CustomerModel.findOne({ email: req.body.email });
        if (isUserEmail) return res.status(409).json("This Email Address is already Registered")

        // // make the password as a hash password 
        // const salt = await bycrypt.genSalt(10)
        // const hashPassword = await bycrypt.hash(req.body.password, salt)
        const customerid = await generateCustomerID()
        // my formdata
        const formdata = new CustomerModel({
            ...req.body,
            customerId: customerid
        })

        const saveData = await formdata.save()
        res.status(200).json(saveData);

    } catch (error) {
        res.status(500).json(error)
    }
}





// Login Controller 
const LoginUser = async (req, res) => {


    try {
        // find the data type user email or mobile no 
        const dataType = isEmail(req.body.email) === true ? "email" : isMobileNumber(req.body.email) === true ? "mobileNo" : "Invalid Credential"
        if (dataType === "Invalid Credential") return res.status(400).json({ error: true, message: "Please Enter the Valid Email Or Mobile Number", })
        // // validate the data  
        // const { error, value } = LoginValidate(req.body);
        // if (error) return res.status(400).json(error.details[0].message)
        const CheckField = { [dataType]: req.body.email }
        // find the user 
        const User = await CustomerModel.findOne(CheckField);
        if (!User) return res.status(404).json({ message: `${dataType} Incorrect` });
        const { password, ...rest } = User

        // compare the password 
        const compare = User.password === req.body.password ? true : false
        // const compare = bycrypt.compare(req.body.password, User.password)
        if (!compare) return res.status(404).json({ message: "Password Incorrect" })

        //  jenerate the jwt token  
        const token = jwt.sign(rest, process.env.SECRET_CODE)
        res.header("access-token", token)
        res.status(200).json(User)
    } catch (error) {
        res.status(500).json(error)
    }

}





const DeleteUsers = (req, res) => {
    try {
        CustomerModel.deleteMany({}).then(() => {
            res.status(200).json("All User Deleted ")
        })

    } catch (error) {
        res.status(500).json(error)
    }
}


const AllCustomer = async (req, res) => {
    try {

        // check the user 
        const isUser = await CustomerModel.find(req.body)
        if (!isUser) return res.status(404).json({
            error: true,
            message: "No user found",
        })

        res.status(200).json({
            error: false,
            data: isUser
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
const GetCustomer = async (req, res) => {
    try { 
        const id = req.params.id
        // check the user 
        const isUser = await CustomerModel.findById(id)
        if (!isUser) return res.status(404).json({
            error: true,
            message: "No user found",
        })

        res.status(200).json({
            error: false,
            data: isUser
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const GetDeleteCustomerById = async (req, res) => {
    const { id } = req.params

    try {
        const response = await CustomerModel.findByIdAndDelete(id)
        if (!response) return res.status(400).json({ error: true, message: 'no data found with this id ' })
        res.status(200).json({ error: false, message: 'deleted successfully' })
    } catch (error) {
        res.status(500).json({ error })
    }
}


// update the customer data
const GetUpdateTheCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const isUpdated = await CustomerModel.findByIdAndUpdate(id, {
            ...req.body
        }, { new: true })
        if (isUpdated) return res.status(404).json({ error: true, message: 'Updation failed ! Try again' })
        res.status(200).json({ error: false, data: isUpdated, message: 'updated successfully' })
    } catch (error) {
        res.status(500).json({ error })
    }
}



module.exports = { SignupUser, LoginUser, DeleteUsers, AllCustomer, GetCustomer, GetDeleteCustomerById, GetUpdateTheCustomer }