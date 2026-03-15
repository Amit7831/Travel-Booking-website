const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["sedan", "suv", "hatchback", "luxury", "van"],
      required: true,
    },

    seatingCapacity: {
      type: Number,
      required: true,
      min: 1,
    },

    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid"],
      required: true,
    },

    transmission: {
      type: String,
      enum: ["manual", "automatic"],
      required: true,
    },

    pricePerDay: {
      type: Number,
      required: true,
    },

    pricePerKm: {
      type: Number,
    },

    ac: {
      type: Boolean,
      default: true,
    },

    image: {
      type: String, // store image URL
    },

    description: {
      type: String,
    },

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "booked", "maintenance"],
      default: "available",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
