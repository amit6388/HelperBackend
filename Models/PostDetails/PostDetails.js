const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    today: String, 
    enddate: String, 
     type: Number, 
     name:String,
     mobile:Number, 
     image: String, 
     address: String, 
     desc: String, 
     custid: String, 
     approve: String, 
     block: String  
}, {
    timestamps: true
})

const postDetailModel = mongoose.model("postDetails_tbl", schema); 
module.exports = postDetailModel;
//PostDetails
//create a sprate file for  controller ,express-validator, route  with  post ,delete ,put, get ,single get methods  also multer code in controller file for image uploading   . write full code without skipping anything else