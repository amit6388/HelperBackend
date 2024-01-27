const router = require("express").Router()
const { AddHeadExpense, UpadateHeadExpense, DeleteById, DeletaAll, GetAll } = require('../../Controllers/ExpensesControllers/ExpenseHeadControllers')
const { AddCollection, GetAllCollections, DeleteCollectionByID, DeletaAllCollections, UpdateCollectionData } = require('../../Controllers/ExpensesControllers/ExpenseCollectionControllers')
const { AddExpense, GetAllExpense, DeleteExpById, DeleteAllExpenses, UpdateExpenseById } = require('../../Controllers/ExpensesControllers/AddExpenseController')

// add the Expense Head 
router.post("/add", AddHeadExpense);
// get all the expenses 
router.get('/getall', GetAll);
// update the head data 
router.patch("/updateheadexpense", UpadateHeadExpense)
// delete the expense head
router.get('/delete/:id', DeleteById);
// delte all the expense head 
router.delete("/deleteall", DeletaAll);





// collection Operation Apis 
router.post("/addcollection", AddCollection);
// getAll the collection 
router.get("/getallcollection", GetAllCollections);
// update the collection data
router.patch("/updatecollection", UpdateCollectionData);
// delete the collection by id 
router.get("/deletecollection/:id", DeleteCollectionByID);
// delete all the collections
router.delete("/deleteallcollection", DeletaAllCollections)





// Add Expenses Apis 
router.post("/addexpense", AddExpense);
// get the Expenses
router.get('/getallexpenses', GetAllExpense);
// delete by id 
router.get("/deleteexpense/:id", DeleteExpById);
// delete all
router.get("/deleteallexpense", DeleteAllExpenses);
// update the expense 
router.patch("/updateexpense", UpdateExpenseById);



module.exports = router 
