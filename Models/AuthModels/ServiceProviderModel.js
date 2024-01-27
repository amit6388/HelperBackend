const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    username: String,
    role: String,
    name: String,
    image: String,
    mobileNo: Number,
    aadharNo: Number,
    panNo: Number,
    email: String,
    dateofjoining: Date,
    password: String,
    parmanentAddress: String,
    currentAddress: String,
    // reference details 
    referenceName: String,
    referenceAddress: String,
    referenceAadharNo: Number,
    referenceMobileNo: Number,
    referenceCity: String,
    referenceArea: String,
    referenceLocationArea: String,
    // service list
    services: Array,
    // Document information
    documentOne: String,
    documentOneImg: String,
    documentTwo: String,
    documentTwoImg: String,
    documentThree: String,
    documentThreeImg: String,
    // service provider info
    serviceProviderType: String,
    about: String
})

const ServiceProviderModel = mongoose.model("service-providers", schema)

module.exports = ServiceProviderModel;