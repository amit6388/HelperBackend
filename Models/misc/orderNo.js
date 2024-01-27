const { Schema, model } = require('mongoose');


const schema = new Schema({
    id: String,
    seq: Number,
}, {
    timestamps: true
})


const OrderNo = model('orderNo', schema);

module.exports = OrderNo;