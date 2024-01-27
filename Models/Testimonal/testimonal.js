const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: String, 
    email: String, 
    mobileNo: Number, 
    occupation:String,
    approval:String,
    block:String
}, {
    timestamps: true
})

const TestimoalModel = mongoose.model("testimoal_tbl", schema); 
module.exports = TestimoalModel;
//AddNewOffer
