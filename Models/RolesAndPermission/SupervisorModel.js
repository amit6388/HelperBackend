
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    role: String,
    Dashboard: Boolean,
    // Attendences
    Attendence: Boolean,
    AttendenceEmployee: Boolean,
    AttendenceServiceProvider: Boolean,
    AttendenceReport: Boolean,
    AttendenceModify: Boolean,

    // Expenses
    Expenses: Boolean,
    AddHeadExpence: Boolean,
    AddExpense: Boolean,
    AddCollections: Boolean,
    TodaysReport: Boolean,
    AllTransactionReport: Boolean,

    // Manage Hr 
    ManageHR: Boolean,
    ManageEmployee: Boolean,
    ManageServiceProvider: Boolean,

    // Manage Service
    ManageService: Boolean,

    // Manage Page 
    ManagePage: Boolean,
    ManageTestimonial: Boolean,
    ManageOffer: Boolean,
    ManagePost: Boolean,
    ManageAdvertisement: Boolean,
    // Customer
    Customer: Boolean,
    ManageCustomer: Boolean,
    ManageHistory: Boolean,
    MonthlyMembers: Boolean,
    ManageEnquiry: Boolean,

    // Roles and permission
    RolesAndPermission: Boolean,

    // Profile
    Profile: String
})

const SuperVisorRolesModel = mongoose.model("supervisor-roles", schema)

module.exports = SuperVisorRolesModel;
