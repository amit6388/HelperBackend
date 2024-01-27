const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    date: String, 
    name: String, 
     mob: Number, 
     ref:String,
     refby:String, 
     status: String,
     block: String,
}, {
    timestamps: true
})

const AddEnquiryModel = mongoose.model("AddEnquiry_tbl", schema); 
module.exports = AddEnquiryModel;
//AddEnquiry
 