const AddCollectionModel = require("../../Models/ExpenseModels/AddCollection");


const AddCollection = async (req, res) => {
    const formData = req.body
    try {
        // check in the db 
        const isAdded = await AddCollectionModel.findOne({ orderNo: formData.orderNo });
        if (isAdded) return res.status(409).json({ error: true, message: "Already Registered" });
        // save the data on the dp 
        const result = await new AddCollectionModel(formData).save()
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
const GetAllCollections = async (req, res) => {
    try {
        const result = await AddCollectionModel.find({})
        if (!result) return res.status(404).json({ error: true, message: "No Data Found" })

        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
// update the collection data
const UpdateCollectionData = async (req, res) => {
    try {
        const id = req.body._id
        const result = await AddCollectionModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!result) return res.status(404).json({ error: true, message: "NO Data Found" })

        res.status(200).json({ error: false, data: result })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

// delete by id 
const DeleteCollectionByID = async (req, res) => {
    const id = req.params.id
    // delete the data 

    AddCollectionModel.findByIdAndDelete(id).then(() => {
        res.status(200).json({ error: false, message: "Deleted Successfully" })
    }).catch((error) => {
        res.status(500).json({ error: true, error })
    })
}

// delete all the expenses head
const DeletaAllCollections = async (req, res) => {
    // delete the data 

    AddCollectionModel.deleteMany({}).then(() => {
        res.status(200).json({ error: false, message: "Deleted Successfully" })
    }).catch((error) => {
        res.status(500).json({ error: true, error })
    })
}



module.exports = { AddCollection, GetAllCollections, DeleteCollectionByID, DeletaAllCollections, UpdateCollectionData }