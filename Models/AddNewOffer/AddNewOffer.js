const mongoose = require('mongoose');
const { route } = require('../../Routers/AddNewOffer/AddNewOffer');
const schema = new mongoose.Schema({
    date: String, 
    des: String, 
     image: String, 
     status:String,
     block:String, 
}, {
    timestamps: true
})

const AddnewOfferModel = mongoose.model("AddnewOffer_tbl", schema); 
module.exports = AddnewOfferModel;
// //PostDetails
//create a sprate file for  controller ,express-validator, route  with  post ,delete ,put, get ,single get methods  also multer code in controller file for image uploading   . write full code without skipping anything else