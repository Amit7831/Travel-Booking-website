import React from "react";
import { X } from "lucide-react";

const ViewCarModal = ({ car, closeModal }) => {
    if (!car) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">

                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Car Details</h2>
                    <button onClick={closeModal}>
                        <X />
                    </button>
                </div>

                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-60 object-cover"
                />

                <div className="p-6 space-y-3">
                    <p><strong>Name:</strong> {car.name}</p>
                    <p><strong>Brand:</strong> {car.brand}</p>
                    <p><strong>Model:</strong> {car.model}</p>
                    <p><strong>Type:</strong> {car.type}</p>
                    <p><strong>Fuel:</strong> {car.fuelType}</p>
                    <p><strong>Transmission:</strong> {car.transmission}</p>
                    <p><strong>Seating:</strong> {car.seatingCapacity}</p>
                    <p><strong>Location:</strong> {car.location}</p>
                    <p><strong>Price:</strong> ₹{car.pricePerDay}/day</p>
                    <p><strong>Description:</strong> {car.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewCarModal;
