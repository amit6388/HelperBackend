const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    serviceProvider: {
        type: String,
        required: true,
    },
    serviceName: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    expenseType: {
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
        type: String,
        required: true,
    },
    timeIn: {
        type: String,
        required: true,
    },
    timeOut: {
        type: String,
        required: true,
    },
    orderNo: {
        type: String,
        required: true,
    },
    remark: String,
}, {
    timestamps: true
})

const AddCollectionModel = mongoose.model("collections", schema);

module.exports = AddCollectionModel;