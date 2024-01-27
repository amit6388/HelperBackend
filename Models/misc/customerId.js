const { model, Schema } = require('mongoose')

const schema = new Schema({
    id: String,
    seq: Number
}, {
    timestamps: true
})


const CustomerID = model('customerId', schema)

module.exports = CustomerID