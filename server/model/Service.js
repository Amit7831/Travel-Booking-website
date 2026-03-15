const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        packageName: {
            type: String,
        },
        place: {
            type: String
        },
        duration: {
            type: String
        },
        pricePerPersion: {
            type: String
        },
        availableBookingSeat: {
            type: String
        },
        dateDeadline: {
            type: String
        },
        accommodation: {
            type: String
        },
        transport: {
            type: String
        },
        image: {
            type: String
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);