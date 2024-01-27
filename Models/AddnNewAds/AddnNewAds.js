const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    company: String, 
    gstno: String, 
     payment: String, 
     contact:Number,
     fromdate:String, 
     enddate: String, 
     image: String, 
     block: String, 
    
}, {
    timestamps: true
})

const AddnNewAdsModel = mongoose.model("AddnNewAds_tbl", schema); 
module.exports = AddnNewAdsModel;
//AddMothlyMember
