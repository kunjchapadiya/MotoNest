import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Pencil, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageCar = () => {
    const navigate = useNavigate();

    const [cars, setCars] = useState([]);

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // EDIT POPUP STATE
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editCarId, setEditCarId] = useState(null);
    const [editForm, setEditForm] = useState({
        model: "",
        brand: "",
        year: "",
        price: "",
        kmDriven: "",
        fuelType: "",
        transmission: "",
        owner: "",
        color: "",
        registrationState: "",
        description: ""
    });

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/admin/cars/");
                setCars(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCars();
    }, []);

    // DELETE WITH TOAST + POPUP
    const deleteCar = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/cars/deleteCar/${deleteId}`);

            setCars((prev) => prev.filter((car) => car._id !== deleteId));
            toast.success("Car deleted successfully!");

            setShowDeletePopup(false);
            setDeleteId(null);

        } catch (error) {
            console.log(error);
            toast.error("Failed to delete car");
        }
    };

    // OPEN EDIT POPUP
    const openEditPopup = (car) => {
        setEditCarId(car._id);
        setEditForm({
            model: car.model,
            brand: car.brand,
            year: car.year,
            price: car.price,
            kmDriven: car.kmDriven,
            fuelType: car.fuelType,
            transmission: car.transmission,
            owner: car.owner,
            color: car.color,
            registrationState: car.registrationState,
            description: car.description
        });
        setShowEditPopup(true);
    };

    // HANDLE UPDATE
    const updateCar = async () => {
        try {
            await axios.put(
                `http://localhost:8080/api/admin/cars/updateCar/${editCarId}`,
                editForm
            );

            // UPDATE UI
            setCars((prev) =>
                prev.map((c) =>
                    c._id === editCarId ? { ...c, ...editForm } : c
                )
            );

            toast.success("Car updated successfully");
            setShowEditPopup(false);

        } catch (error) {
            console.log(error);
            toast.error("Update failed");
        }
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="ml-0 md:ml-64 p-6 w-full bg-gray-50 min-h-screen">

                <div className="text-3xl font-semibold text-gray-900 mb-5">
                    Manage Cars
                </div>

                <div className="mb-10">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        onClick={() => navigate("/admin/addcar")}
                    >
                        + Add New Car
                    </button>
                </div>

                <div className="carlist overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-3">Car Name</th>
                                <th className="border border-gray-300 p-3">Company</th>
                                <th className="border border-gray-300 p-3">Year</th>
                                <th className="border border-gray-300 p-3">Registration</th>
                                <th className="border border-gray-300 p-3">Status</th>
                                <th className="border border-gray-300 p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cars.map((car) => (
                                <tr key={car._id} className="hover:bg-gray-50 transition">
                                    <td className="border border-gray-300 p-3">{car.model}</td>
                                    <td className="border border-gray-300 p-3">{car.brand}</td>
                                    <td className="border border-gray-300 p-3">{car.year}</td>
                                    <td className="border border-gray-300 p-3">{car.registrationState}</td>
                                    <td className="border border-gray-300 p-3">{car.status}</td>
                                    <td className="border border-gray-300 p-3">
                                        <div className="flex gap-3 justify-center">
                                            <Pencil
                                                size={20}
                                                className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                onClick={() => openEditPopup(car)}
                                            />

                                            <Trash
                                                size={20}
                                                className="cursor-pointer text-red-600 hover:text-red-800"
                                                onClick={() => {
                                                    setDeleteId(car._id);
                                                    setShowDeletePopup(true);
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* DELETE POPUP */}
                {showDeletePopup && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">

                            <h3 className="text-xl font-semibold mb-3">Confirm Delete</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this car?
                            </p>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setShowDeletePopup(false)}
                                    className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={deleteCar}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                {/* EDIT POPUP */}
                {showEditPopup && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto py-10">
                        <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg m-4">

                            <h2 className="text-2xl font-semibold mb-6 text-center">Edit Car Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Model */}
                                <div>
                                    <label className="font-medium text-sm">Model</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md mt-1"
                                        value={editForm.model}
                                        onChange={(e) => setEditForm({ ...editForm, model: e.target.value })}
                                    />
                                </div>

                                {/* Brand */}
                                <div>
                                    <label className="font-medium text-sm">Brand</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md mt-1"
                                        value={editForm.brand}
                                        onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                                    />
                                </div>

                                {/* Year */}
                                <div>
                                    <label className="font-medium text-sm">Year</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded-md mt-1"
                                        value={editForm.year}
                                        onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="font-medium text-sm">Price</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded-md mt-1"
                                        value={editForm.price}
                                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                    />
                                </div>

                                {/* KM Driven */}
                                <div>
                                    <label className="font-medium text-sm">KM Driven</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded-md mt-1"
                                        value={editForm.kmDriven}
                                        onChange={(e) => setEditForm({ ...editForm, kmDriven: e.target.value })}
                                    />
                                </div>

                                {/* Fuel Type */}
                                <div>
                                    <label className="font-medium text-sm">Fuel Type</label>
                                    <select
                                        className="w-full p-2 border rounded-md mt-1"
                                        value={editForm.fuelType}
                                        onChange={(e) => setEditForm({ ...editForm, fuelType: e.target.value })}
                                    >
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>

                                {/* Transmission */}
                                <div>
                                    <label className="font-medium text-sm">Transmission</label>
                                    <select
                                        className="w-full p-2 border rounded-md mt-1"
                                        value={editForm.transmission}
                                        onChange={(e) => setEditForm({ ...editForm, transmission: e.target.value })}
                                    >
                                        <option value="Manual">Manual</option>
                                        <option value="Automatic">Automatic</option>
                                    </select>
                                </div>

                                {/* Owner */}
                                <div>
                                    <label className="font-medium text-sm">Owner</label>
                                    <select
                                        className="w-full p-2 border rounded-md mt-1"
                                        value={editForm.owner}
                                        onChange={(e) => setEditForm({ ...editForm, owner: e.target.value })}
                                    >
                                        <option value="First">First</option>
                                        <option value="Second">Second</option>
                                        <option value="Third">Third</option>
                                    </select>
                                </div>

                                {/* Color */}
                                <div>
                                    <label className="font-medium text-sm">Color</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md mt-1"
                                        value={editForm.color}
                                        onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                                    />
                                </div>

                                {/* Body Type */}
                                <div>
                                    <label className="font-medium text-sm">Body Type</label>
                                    <select
                                        className="w-full p-2 border rounded-md mt-1"
                                        value={editForm.bodyType}
                                        onChange={(e) => setEditForm({ ...editForm, bodyType: e.target.value })}
                                    >
                                        <option value="sedan">Sedan</option>
                                        <option value="hatchback">Hatchback</option>
                                        <option value="suv">SUV</option>
                                        <option value="sport">Sport</option>
                                        <option value="coupe">Coupe</option>
                                    </select>
                                </div>

                                {/* Registration State */}
                                <div>
                                    <label className="font-medium text-sm">Registration State</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md mt-1"
                                        value={editForm.registrationState}
                                        onChange={(e) => setEditForm({ ...editForm, registrationState: e.target.value })}
                                    />
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="font-medium text-sm">Description</label>
                                    <textarea
                                        className="w-full p-2 border rounded-md mt-1"
                                        rows="3"
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    onClick={() => setShowEditPopup(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={updateCar}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Update Car
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ManageCar;
