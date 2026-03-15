const Car = require("../model/Car");

// =======================================
// CREATE CAR
// =======================================
const createCar = async (req, res) => {
  try {
    const car = await Car.create({
      ...req.body,   // image will come from req.body.image
    });

    res.status(201).json({
      success: true,
      message: "Car created successfully",
      data: car,
    });
  } catch (error) {
    console.error("Create Car Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create car",
    });
  }
};


// =======================================
// UPDATE CAR
// =======================================
const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    Object.assign(car, req.body);

    await car.save();

    res.status(200).json({
      success: true,
      message: "Car updated successfully",
      data: car,
    });
  } catch (error) {
    console.error("Update Car Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update car",
    });
  }
};


// =======================================
// DELETE CAR
// =======================================
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    await car.deleteOne();

    res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    console.error("Delete Car Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete car",
    });
  }
};


// =======================================
// OTHER CONTROLLERS
// =======================================

const getAllCars = async (req, res) => {
  const cars = await Car.find({ isActive: true });
  res.json({ success: true, data: cars });
};

const getAvailableCars = async (req, res) => {
  const cars = await Car.find({
    status: "available",
    isActive: true,
  });
  res.json({ success: true, data: cars });
};

const getSingleCar = async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.json({ success: true, data: car });
};

const updateCarStatus = async (req, res) => {
  const car = await Car.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json({ success: true, data: car });
};

module.exports = {
  createCar,
  getAllCars,
  getAvailableCars,
  getSingleCar,
  updateCar,
  updateCarStatus,
  deleteCar,
};