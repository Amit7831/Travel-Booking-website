import React, { useEffect, useState } from "react";
import api from "../../components/services/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/booking/my-bookings", {
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

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await api.put(`/booking/cancel/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchBookings(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  if (loading)
    return <div className="text-center py-20">Loading bookings...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-4">

      <h1 className="text-3xl font-bold text-center mb-10">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500">
          No bookings yet 🚗
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={booking.car?.image}
                alt={booking.car?.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">

                <h2 className="text-xl font-semibold">
                  {booking.car?.name}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {booking.car?.brand} • {booking.car?.model}
                </p>

                <div className="mt-4 space-y-1 text-sm text-gray-600">
                  <p><strong>Price:</strong> ₹{booking.totalAmount}</p>
                  <p><strong>Status:</strong>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full 
                      ${booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {booking.status}
                    </span>
                  </p>
                </div>

                {booking.status === "confirmed" && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel Booking
                  </button>
                )}

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyBookings;
