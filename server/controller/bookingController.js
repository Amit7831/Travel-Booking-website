const Car = require("../model/Car");
const Booking = require("../model/Booking");

exports.createBooking = async (req, res) => {
    try {
        const { carId } = req.body;

        if (!carId) {
            return res.status(400).json({ message: "Car ID is required" });
        }

        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // ✅ Prevent double booking
        if (car.status !== "available") {
            return res.status(400).json({
                message: "Car is not available for booking",
            });
        }

        // ✅ Create booking
        const booking = await Booking.create({
            user: req.user.id,
            car: carId,
            totalAmount: car.pricePerDay,
            status: "confirmed",
        });

        // ✅ Update car status (lowercase!)
        car.status = "booked";
        await car.save();

        res.status(201).json({
            success: true,
            message: "Booking confirmed successfully",
            booking,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate("car")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("user", "name email")
            .populate("car")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Only owner can cancel
        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        booking.status = "cancelled";
        await booking.save();

        // Make car available again
        const car = await Car.findById(booking.car);
        if (car) {
            car.status = "available";
            await car.save();
        }

        res.json({ success: true, message: "Booking cancelled" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        // Make car available again
        const car = await Car.findById(booking.car);
        if (car) {
            car.status = "available";
            await car.save();
        }

        await booking.deleteOne();

        res.json({
            success: true,
            message: "Booking deleted successfully",
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

