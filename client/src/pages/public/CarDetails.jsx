import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../components/services/api";

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await api.get(`/cars/${id}`);
                setCar(res.data?.data || res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!car) return <div className="text-center py-20">Car not found</div>;

    const handleBooking = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("⚠️ You must login first!");
                return;
            }

            await api.post(
                "/booking/create",
                { carId: car._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("🎉 Booking Confirmed Successfully!");

        } catch (err) {
            console.log(err);

            if (err.response) {
                // Server responded with error
                const status = err.response.status;

                if (status === 401) {
                    alert("❌ Unauthorized! Please login again.");
                } else if (status === 403) {
                    alert("❌ You are not allowed to perform this action.");
                } else if (status === 400) {
                    alert(err.response.data.message);
                } else {
                    alert("❌ Something went wrong!");
                }
            } else {
                alert("❌ Network error. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 py-40 px-4 ">

            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2  ">

                {/* Image */}
                <div>
                    <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Details */}
                <div className="p-10 flex flex-col justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {car.name}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {car.brand} • {car.model}
                        </p>

                        <div className="mt-6 space-y-3 text-gray-600">

                            <p><strong>Fuel Type:</strong> {car.fuelType}</p>
                            <p><strong>Transmission:</strong> {car.transmission}</p>
                            <p><strong>Seating Capacity:</strong> {car.seatingCapacity}</p>
                            <p><strong>Status:</strong> {car.status}</p>

                            <p className="text-indigo-600 text-2xl font-bold mt-4">
                                ₹{car.pricePerDay} / day
                            </p>

                        </div>
                    </div>

                    {/* Confirm Booking Button */}
                    <button
                        onClick={handleBooking}
                        className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
                    >
                        Confirm Booking
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CarDetails;
