const { GetOrderNow, GetByField, GetOrderUpdate, GetSingleOrder, GetDeleteByID } = require("../../Controllers/ordercontroller/ordercontrollers");

const router = require("express").Router();

// book order

router.post('/order/:id', GetOrderNow);
// get order by specificdata
router.get('/getorder', GetByField);
// get order update
router.patch("/update/order/:id", GetOrderUpdate)
// get single order details 
router.get("/get/order/:id", GetSingleOrder);
// Delete order by id
router.get("/delete/order/:id", GetDeleteByID)




module.exports = router;