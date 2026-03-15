const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post(
    "/create",
    protect,
    bookingController.createBooking
);

// ✅ Logged-in user bookings
router.get("/my-bookings", protect, bookingController.getMyBookings);

// ✅ Admin: get all bookings
router.get("/all", protect, adminOnly, bookingController.getAllBookings);

router.put(
    "/cancel/:id",
    protect,
    bookingController.cancelBooking
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    bookingController.deleteBooking
);


module.exports = router;
