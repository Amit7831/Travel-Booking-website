const router = require("express").Router();

const {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
  updateCarStatus,
  getAvailableCars,
} = require("../controller/carController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// ================================
// PUBLIC ROUTES
// ================================

router.get("/", getAllCars);
router.get("/available", getAvailableCars);
router.get("/:id", getSingleCar);

// ================================
// ADMIN ROUTES
// ================================

// Create new car
router.post("/", protect, adminOnly, createCar);

// Update car
router.put("/:id", protect, adminOnly, updateCar);

router.patch("/:id/status", protect, adminOnly, updateCarStatus);

router.delete("/:id", protect, adminOnly, deleteCar);

module.exports = router;