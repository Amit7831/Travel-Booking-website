import React, { useEffect, useState } from "react";
import CreateCarModal from "../../components/car/CreateCarModal";
import ViewCarModal from "../../components/car/ViewCarModal";
import api from "../../components/services/api";

const AdminCar = () => {
    const [cars, setCars] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchCars = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/cars`);

            if (res.data?.success) {
                setCars(res.data.data || []);
            } else if (Array.isArray(res.data)) {
                setCars(res.data);
            } else {
                setCars([]);
            }
        } catch (err) {
            console.log(err);
            setCars([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    // DELETE CAR
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this car?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/cars/${id}`);
            fetchCars();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-6 fon bg-gray-100 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                    Car Management
                </h2>

                <button
                    onClick={() => {
                        setEditMode(false);
                        setSelectedCar(null);
                        setOpenModal(true);
                    }}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    + Add Car
                </button>
            </div>

            {/* Cars Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-10">
                        Loading...
                    </div>
                ) : cars.map((car) => (
                    <div
                        key={car._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                    >
                        <div className="relative">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-48 object-cover"
                            />

                            <span className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full font-semibold
                                ${car.status === "available"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                            >
                                {car.status}
                            </span>
                        </div>

                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{car.name}</h3>
                            <p className="text-sm text-gray-500">{car.brand}</p>
                            <p className="text-blue-600 font-bold mt-2">
                                ₹{car.pricePerDay}/day
                            </p>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => {
                                        setSelectedCar(car);
                                        setViewModal(true);
                                    }}
                                    className="flex-1 bg-gray-600 text-white py-2 rounded-lg text-sm"
                                >
                                    View
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedCar(car);
                                        setEditMode(true);
                                        setOpenModal(true);
                                    }}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(car._id)}
                                    className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create / Edit Modal */}
            {openModal && (
                <CreateCarModal
                    closeModal={() => setOpenModal(false)}
                    refreshCars={fetchCars}
                    editMode={editMode}
                    carData={selectedCar}
                />
            )}

            {/* View Modal */}
            {viewModal && (
                <ViewCarModal
                    car={selectedCar}
                    closeModal={() => setViewModal(false)}
                />
            )}
        </div>
    );
};

export default AdminCar;
