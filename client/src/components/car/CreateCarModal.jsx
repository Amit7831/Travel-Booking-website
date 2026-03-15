import React, { useState, useEffect } from "react";
import api from "../services/api";
import { X } from "lucide-react";

const CreateCarModal = ({
    closeModal,
    refreshCars,
    editMode = false,
    carData,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        model: "",
        type: "sedan",
        seatingCapacity: "",
        fuelType: "petrol",
        transmission: "manual",
        pricePerDay: "",
        location: "",
        description: "",
        image: "", // ✅ image URL added
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // 🔥 Update form when editing
    useEffect(() => {
        if (editMode && carData) {
            setFormData({
                name: carData.name || "",
                brand: carData.brand || "",
                model: carData.model || "",
                type: carData.type || "sedan",
                seatingCapacity: carData.seatingCapacity || "",
                fuelType: carData.fuelType || "petrol",
                transmission: carData.transmission || "manual",
                pricePerDay: carData.pricePerDay || "",
                location: carData.location || "",
                description: carData.description || "",
                image: carData.image || "", // ✅ load image
            });

            setPreview(carData.image || null);
        }
    }, [editMode, carData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        // 🔥 Auto preview when image URL changes
        if (name === "image") {
            setPreview(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editMode) {
                await api.put(`/cars/${carData._id}`, formData);
            } else {
                await api.post(`/cars`, formData);
            }

            refreshCars();
            closeModal();
        } catch (err) {
            console.log(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center border-b p-6">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        {editMode ? "Edit Car" : "Create New Car"}
                    </h3>
                    <button onClick={closeModal}>
                        <X size={22} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Car Name"
                            className="input-style"
                        />

                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                            placeholder="Brand"
                            className="input-style"
                        />

                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            required
                            placeholder="Model"
                            className="input-style"
                        />

                        <input
                            type="number"
                            name="seatingCapacity"
                            value={formData.seatingCapacity}
                            onChange={handleChange}
                            required
                            placeholder="Seating Capacity"
                            className="input-style"
                        />
                    </div>

                    {/* Select Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select name="type" value={formData.type} onChange={handleChange} className="input-style">
                            <option value="sedan">Sedan</option>
                            <option value="suv">SUV</option>
                            <option value="hatchback">Hatchback</option>
                            <option value="luxury">Luxury</option>
                            <option value="van">Van</option>
                        </select>

                        <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="input-style">
                            <option value="petrol">Petrol</option>
                            <option value="diesel">Diesel</option>
                            <option value="electric">Electric</option>
                            <option value="hybrid">Hybrid</option>
                        </select>

                        <select name="transmission" value={formData.transmission} onChange={handleChange} className="input-style">
                            <option value="manual">Manual</option>
                            <option value="automatic">Automatic</option>
                        </select>
                    </div>

                    {/* Pricing & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="number"
                            name="pricePerDay"
                            value={formData.pricePerDay}
                            onChange={handleChange}
                            required
                            placeholder="Price Per Day"
                            className="input-style"
                        />

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            placeholder="Location"
                            className="input-style"
                        />
                    </div>

                    {/* Description */}
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Car Description"
                        className="input-style"
                    />

                    {/* Image URL Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Image URL
                        </label>

                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            placeholder="Paste image URL here"
                            className="input-style"
                        />

                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="mt-4 w-full h-52 object-cover rounded-lg shadow"
                                onError={() => setPreview(null)} // hide if invalid URL
                            />
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            {loading
                                ? editMode
                                    ? "Updating..."
                                    : "Creating..."
                                : editMode
                                    ? "Update Car"
                                    : "Create Car"}
                        </button>
                    </div>
                </form>
            </div>

            <style>
                {`
          .input-style {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #d1d5db;
            border-radius: 10px;
            outline: none;
            transition: 0.2s;
          }
          .input-style:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
          }
        `}
            </style>
        </div>
    );
};

export default CreateCarModal;