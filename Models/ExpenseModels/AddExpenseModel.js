const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    expHead: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    personName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    remark: {
        type: String,
    }

}, {
    timestamps: true
})


const AddExpenseModel = mongoose.model("expenses", schema);

module.exports = AddExpenseModel