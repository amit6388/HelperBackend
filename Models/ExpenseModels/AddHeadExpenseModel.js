const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    expName: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

const HeadExpModel = mongoose.model("Heading-Expenses", schema);

module.exports = HeadExpModel