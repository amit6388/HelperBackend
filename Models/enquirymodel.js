const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: String,
    email: String,
    refName: String,
    mobileNo: Number,
    message: String,
    address: String,
}, {
    timestamps: true
})


const EnquiryModel = model('enquiry', schema)

module.exports = EnquiryModel;