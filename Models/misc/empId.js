const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    id: String,
    seq: Number
}, {
    timestamps: true
})


const EmpID = mongoose.model('empid', schema)


module.exports = EmpID;