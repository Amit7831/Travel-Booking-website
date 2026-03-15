import React, { useEffect, useState } from "react";
import api from "../../components/services/api";
import { useNavigate } from "react-router-dom";

const Services = () => {

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchCars = async () => {
        try {
            const res = await api.get(`/cars/available`);
            setCars(res.data?.data || res.data || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#f6f4eb] via-[#91c8e4] to-[#749bc2] py-20 px-4">

            {/* Title */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">
                    Explore Our Premium Cars
                </h1>
                <p className="text-gray-600 mt-3">
                    Choose your perfect ride and book instantly 🚗
                </p>
            </div>

            {loading ? (
                <div className="text-center text-gray-500 text-lg">
                    Loading cars...
                </div>
            ) : cars.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">
                    No cars available right now
                </div>
            ) : (

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                    {cars.map((car) => (
                        <div
                            key={car._id}
                            className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group"
                        >

                            {/* Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                                />

                                {/* Status Badge */}
                                <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
                                    {car.status}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-6">

                                <h3 className="text-xl font-semibold text-gray-800">
                                    {car.name}
                                </h3>

                                <p className="text-gray-500 text-sm mt-1">
                                    {car.brand} • {car.model}
                                </p>

                                <div className="flex justify-between items-center mt-4">

                                    <span className="text-indigo-600 text-lg font-bold">
                                        ₹{car.pricePerDay}
                                        <span className="text-sm text-gray-500"> /day</span>
                                    </span>

                                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                                        {car.fuelType}
                                    </span>
                                </div>

                                {/* Extra Details */}
                                <div className="flex justify-between text-sm text-gray-500 mt-3">
                                    <span>{car.transmission}</span>
                                    <span>{car.seatingCapacity} Seats</span>
                                </div>

                                {/* Book Button */}
                                <button
                                    onClick={() => navigate(`/cars/${car._id}`)}
                                    className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-xl font-medium hover:scale-105 transition duration-300 shadow-md"
                                >
                                    Book Now
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default Services;
