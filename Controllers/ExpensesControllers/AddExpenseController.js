const AddExpenseModel = require("../../Models/ExpenseModels/AddExpenseModel");



const AddExpense = async (req, res) => {
    const formData = req.body
    try {
        // check in the db 
        // const isAdded = await AddExpenseModel.find({ expName: formData.expName });
        // if (isAdded) return res.status(409).json({ error: true, message: "Already Registered" });
        // save the data on the dp 
        const result = await new AddExpenseModel(formData).save()
        if (!result) return res.status(400).json({ error: true, message: "Not Added Facing Issue Try Again" })

        // else return the dat 
        res.status(200).json({
            error: false,
            data: result
        })

    } catch (error) {
        res.status(500).json(error)
    }
}
// get all 
const GetAllExpense = async (req, res) => {
    try {
        const result = await AddExpenseModel.find({})
        if (!result) return res.status(404).json({ error: true, message: "No Data Found" })

        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const UpdateExpenseById = async (req, res) => {
    try {
        const id = req.body._id
        const result = await AddExpenseModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!result) return res.status(400).json({ error: true, message: "Not Update Please Try Again" })

        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}


// delete by id 
const DeleteExpById = async (req, res) => {
    const id = req.params.id
    // delete the data 

    AddExpenseModel.findByIdAndDelete(id).then(() => {
        res.status(200).json({ error: false, message: "Deleted Successfully" })
    }).catch((error) => {
        res.status(500).json({ error: true, error })
    })
}

// delete all the expenses head
const DeleteAllExpenses = (req, res) => {
    // delete the data 

    AddExpenseModel.deleteMany({}).then(() => {
        res.status(200).json({ error: false, message: "Deleted Successfully" })
    }).catch((error) => {
        res.status(500).json({ error: true, error })
    })
}



module.exports = { AddExpense, GetAllExpense, DeleteExpById, DeleteAllExpenses, UpdateExpenseById }