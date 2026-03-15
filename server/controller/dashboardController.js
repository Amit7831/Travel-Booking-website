const Contact = require("../model/Contact");
const Vehicle = require("../model/Car");
const Booking = require("../model/Booking");


const DashboardCount = async (req, res) => {
    try {
        const [totalContacts, totalVehicle, totalBookings] =
            await Promise.all([
                Contact.countDocuments(),
                Vehicle.countDocuments(),
                Booking.countDocuments(),
            ]);
        
        return res.json({
            status: true,
            data: {
                totalContacts,
                totalVehicle,
                totalBookings,
            },
        });
    } catch (err) {
        console.log(err);
        return res.json({
            status: false,
            message: "Error fetching dashboard status",
        });
    }
};

module.exports = { DashboardCount };