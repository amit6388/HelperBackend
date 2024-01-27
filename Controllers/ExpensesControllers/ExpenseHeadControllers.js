const HeadExpModel = require("../../Models/ExpenseModels/AddHeadExpenseModel")






const AddHeadExpense = async (req, res) => {
    const formData = req.body
    try {
        // check in the db 
        const isAdded = await HeadExpModel.findOne({ expName: formData.expName });
        if (isAdded) return res.status(409).json({ error: true, message: "Already Registered" });
        // save the data on the dp 
        const result = await new HeadExpModel(formData).save()
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
const GetAll = async (req, res) => {
    try {
        const result = await HeadExpModel.find({})
        if (!result) return res.status(404).json({ error: true, message: "No Data Found" })

        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const UpadateHeadExpense = async (req, res) => {
    try {
        const id = req.body._id
        const result = await HeadExpModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!result) return res.status(400).json({ error: true, message: "NO Data Found" })

        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}



// delete by id 
const DeleteById = async (req, res) => {
    const id = req.params.id
    // delete the data 

    HeadExpModel.findByIdAndDelete(id).then(() => {
        res.status(200).json({ error: false, message: "Deleted Successfully" })
    }).catch((error) => {
        res.status(500).json({ error: true, error })
    })
}

// delete all the expenses head
const DeletaAll = async (req, res) => {
    // delete the data 

    HeadExpModel.deleteMany({}).then(() => {
        res.status(200).json({ error: false, message: "Deleted Successfully" })
    }).catch((error) => {
        res.status(500).json({ error: true, error })
    })
}



module.exports = { AddHeadExpense, DeleteById, DeletaAll, GetAll, UpadateHeadExpense }