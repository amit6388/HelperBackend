const CustomerModel = require("../../Models/AuthModels/CustomerModel");
const CustomerID = require("../../Models/misc/customerId");
const OrderModel = require("../../Models/ordermodel/ordermodel");
const generateOrderNo = require("../misc/orderNoGenerator");

const GetOrderNow = async (req, res) => {
    const formdata = req.body
    const { id } = req.params;
    // find user with id  
    const isUser = await CustomerModel.findById(id)
    if (!isUser) return res.status(404).json({ error: true, message: "Invalid user" })
    // new order


    // generate the oder no 
    const order = new OrderModel({
        ...formdata,
        customerId: isUser.customerId,
        customerName: isUser.name,
        orderStatus: "Pending"
    })
    try {
        const isSubmit = await order.save()
        if (!isSubmit) return res.status(400).json({ error: true, message: "order not placed i! Try again" })

        // if order submit then generate order number and register it 
        const orderNumber = await generateOrderNo()
        isSubmit.orderNo = orderNumber
        isSubmit.save()

        // push the booking details on user bookings 
        isUser.bookings.push(isSubmit._id)
        isUser.save()

        res.status(200).json({ error: false, message: "successfully ordered", data: isSubmit })
    } catch (error) {
        res.status(500).json(error)
    }
}

// get the any field data filtered
const GetByField = async (req, res) => {
    const filter = {};

    // Loop through the keys in the req.query object
    for (const key in req.query) {
        // Only add filters for valid keys, you might want to add more checks here
        if (req.query.hasOwnProperty(key)) {
            filter[key] = { $regex: req.query[key], $options: 'i' };
        }
    }

    try {
        const result = await OrderModel.find(filter);

        if (result.length === 0) {
            return res.status(404).json({ error: true, message: "No data found" });
        }

        res.status(200).json({ error: false, message: "Data Fetched", data: result });
    } catch (error) {
        res.status(500).json({ error });
    }
}


// get  the order update 
const GetOrderUpdate = async (req, res) => {
    const orderID = req.params.id

    const order = await OrderModel.findById(orderID)

    try {
        const isUpdated = await OrderModel.findByIdAndUpdate(orderID, {
            ...req.body,
            orderNo: order.orderNo
        })
        if (!isUpdated) return res.status(400).json({ error: true, message: 'Updation Failed ! Try again' })
        res.status(200).json({ error: false, data: isUpdated })
    } catch (error) {
        res.status(200).json({ error })
    }
}

// Get Single Order
const GetSingleOrder = async (req, res) => {
    const id = req.params.id

    try {
        const isData = await OrderModel.findById(id)
        if (!isData) return res.status(404).json({ error: true, message: "No order Found with This" })

        res.status(200).json({ error: false, data: isData })

    } catch (error) {
        res.status(500).json({ error })
    }
}

// Delete Order
const GetDeleteByID = async (req, res) => {
    const orderId = req.params.id

    try {
        const isDeleted = await OrderModel.findByIdAndDelete(orderId)
        if (!isDeleted) return res.status(400).json({ error: true, message: "deletion faild ! Try again" })

        res.status(200).json({ error: false, message: 'deleted successfully' })
    } catch (error) {
        res.status(500).json({ error })
    }
}



module.exports = { GetOrderNow, GetByField, GetOrderUpdate, GetSingleOrder, GetDeleteByID }