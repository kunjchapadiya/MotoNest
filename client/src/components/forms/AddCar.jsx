import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";

const BRANDS = [
    "Audi", "BMW", "Mercedes-Benz", "Porsche", "Ferrari",
    "Lamborghini", "Land Rover", "Bentley", "Rolls-Royce", "Volvo"
];

const STATES = [
    "AP", "AR", "AS", "BR", "CG", "GA", "GJ", "HR", "HP", "JH", "KA", "KL",
    "MP", "MH", "MN", "ML", "MZ", "NL", "OD", "PB", "RJ", "SK", "TN", "TS",
    "TR", "UP", "UK", "WB", "AN", "CH", "DN", "DL", "JK", "LA", "LD", "PY"
];

const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];
const TRANSMISSION = ["Manual", "Automatic"];
const OWNERS = ["First", "Second", "Third"];
const BODY_TYPES = ["Sedan", "Hatchback", "SUV", "Sport", "Coupe"];

const AddCar = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => formData.append(key, data[key]));
            images.forEach((file) => formData.append("image", file));

            const res = await axios.post("http://localhost:8080/api/admin/cars/addcar", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success("Car Added Successfully!");
            reset();
            setImages([]);
            navigate("/admin/managecar");

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex">
            <Sidebar />

            {/* Main Content Panel */}
            <div className="ml-0 md:ml-64 p-6 w-full bg-gray-50 min-h-screen flex flex-col items-center justify-center">

                <h1 className="text-3xl font-semibold text-gray-900 mb-8 self-start md:self-center">Add New Car</h1>

                <div className="w-full max-w-4xl">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >

                        {/* Model */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Car Model *</label>
                            <input
                                type="text"
                                {...register("model", { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="e.g., Portofino"
                            />
                            {errors.model && <p className="text-red-500 text-sm mt-1">Model is required</p>}
                        </div>

                        {/* Brand */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Brand *</label>
                            <select {...register("brand", { required: true })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white">
                                <option value="">Select Brand</option>
                                {BRANDS.map((brand) => (<option key={brand} value={brand}>{brand}</option>))}
                            </select>
                            {errors.brand && <p className="text-red-500 text-sm mt-1">Brand is required</p>}
                        </div>

                        {/* Registration State */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Registration State *</label>
                            <select {...register("registrationState", { required: true })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white">
                                <option value="">Select State</option>
                                {STATES.map((st) => (<option key={st} value={st}>{st}</option>))}
                            </select>
                        </div>

                        {/* Year */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Year *</label>
                            <input
                                type="number"
                                {...register("year", { required: true, min: 2000, max: 2025 })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="2020"
                            />
                        </div>

                        {/* Price */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Price (₹) *</label>
                            <input
                                type="number"
                                {...register("price", { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="2500000"
                            />
                        </div>

                        {/* KM Driven */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">KM Driven *</label>
                            <input
                                type="number"
                                {...register("kmDriven", { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="15000"
                            />
                        </div>

                        {/* Fuel Type */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Fuel Type *</label>
                            <select {...register("fuelType", { required: true })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white">
                                <option value="">Select Fuel</option>
                                {FUEL_TYPES.map((fuel) => (<option key={fuel} value={fuel}>{fuel}</option>))}
                            </select>
                        </div>

                        {/* Transmission */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Transmission *</label>
                            <select {...register("transmission", { required: true })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white">
                                <option value="">Select</option>
                                {TRANSMISSION.map((t) => (<option key={t} value={t}>{t}</option>))}
                            </select>
                        </div>

                        {/* Owner */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Owner *</label>
                            <select {...register("owner", { required: true })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white">
                                <option value="">Select Owner</option>
                                {OWNERS.map((o) => (<option key={o} value={o}>{o}</option>))}
                            </select>
                        </div>

                        {/* Body Type */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Body Type *</label>
                            <select {...register("bodyType", { required: true })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white">
                                <option value="">Select Body Type</option>
                                {BODY_TYPES.map((type) => (<option key={type} value={type.toLowerCase()}>{type}</option>))}
                            </select>
                            {errors.bodyType && <p className="text-red-500 text-sm mt-1">Body Type is required</p>}
                        </div>

                        {/* Color */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Color *</label>
                            <input
                                type="text"
                                {...register("color", { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Red, Black, White..."
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Description *</label>
                            <textarea
                                {...register("description", { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                rows="4"
                                placeholder="Write about car condition..."
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="md:col-span-2 flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Car Images *</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                            />

                            {/* Preview */}
                            <div className="flex gap-4 mt-4 flex-wrap">
                                {images.map((img, i) => (
                                    <img key={i} src={URL.createObjectURL(img)} alt="" className="h-24 w-24 object-cover rounded-lg border border-gray-300 shadow-sm" />
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 flex justify-center mt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 px-8 py-3 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-500/30 w-full md:w-auto"
                            >
                                Add Car
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default AddCar;
