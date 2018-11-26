const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// database's data structure
const DataSchema = new Schema(
    {
        id: Number,
        message: String
    },
    { timestamps: true}
);

// Export schema
module.exports = mongoose.model("Data", DataSchema);