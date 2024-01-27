const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    custname: String, 
    service: String, 
     tservice: String, 
     tmbill:String,
     lastpay:String, 
     remark: String,
}, {
    timestamps: true
})

const AddMothlyMemberModel = mongoose.model("AddMothlyMember_tbl", schema); 
module.exports = AddMothlyMemberModel;
//AddEnquiry
 