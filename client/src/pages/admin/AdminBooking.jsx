import React, { useEffect, useState } from "react";
import api from "../../components/services/api";

const AdminBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const res = await api.get("/booking/all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setBookings(res.data.bookings);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteBooking = async (id) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) return;

        try {
            await api.delete(`/booking/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            fetchBookings(); // refresh list

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    if (loading)
        return <div className="text-center py-20">Loading bookings...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-3xl font-bold mb-8">
                All Bookings
            </h1>

            {bookings.length === 0 ? (
                <div className="text-gray-500">
                    No bookings found.
                </div>
            ) : (
                <div className="overflow-x-auto bg-white shadow rounded-xl">

                    <table className="min-w-full text-sm text-left">

                        <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Car</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.map((booking) => (
                                <tr
                                    key={booking._id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold">
                                                {booking.user?.name}
                                            </p>
                                            <p className="text-gray-500 text-xs">
                                                {booking.user?.email}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={booking.car?.image || "https://via.placeholder.com/150"}
                                                alt={booking.car?.name}
                                                className="w-12 h-12 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/150";
                                                }}
                                            />
                                            <div>
                                                <p className="font-semibold">
                                                    {booking.car?.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {booking.car?.brand} • {booking.car?.model}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-indigo-600">
                                        ₹{booking.totalAmount}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full font-semibold
                        ${booking.status === "confirmed"
                                                    ? "bg-green-100 text-green-700"
                                                    : booking.status === "cancelled"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-gray-500 text-sm">
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => deleteBooking(booking._id)}
                                            className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminBooking;
