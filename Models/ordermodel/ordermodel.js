const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    // order info
    orderNo: String,
    serviceType: String,
    customerId: String,
    customerName: String,
    type: String,
    bookTime: Date,
    serviceName: String,
    serviceDetails: String,
    // supervisor 
    supervisor: String,
    supervisorId: String,
    // service provider
    serviceProvider: String,
    servicePRovderId: String,

    // vehicle info 
    vehicleUse: String,
    vehicleId: String,
    // billing information
    transactionId: String,
    billAmt: Object,
    paidAmt: Number,
    balanceAmt: Number,
    paymentMethod: String,
    // remarks
    backOfficeRemark: String,
    adminRemark: String,
    providerRatings: String,
    superAdminRemark: String,
    serviceProviderRemark: String,
    orderStatus: String,
    // action 
    cancelReason: String,
    status: String,
    action: String
}, {
    timestamps: true
})



const OrderModel = mongoose.model('orders', schema)

module.exports = OrderModel