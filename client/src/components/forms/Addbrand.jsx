import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Sidebar from "../Sidebar";

const AddBrand = () => {
    const { register, handleSubmit, reset } = useForm();
    const [preview, setPreview] = useState(null);
    const [brands, setBrands] = useState([]); // NEW STATE

    // 🔹 Fetch all brands
    const fetchBrands = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/admin/getbrand");
            setBrands(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("image", data.image[0]);

        try {
            const res = await axios.post(
                "http://localhost:8080/api/admin/addbrand",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            alert("Brand Added Successfully!");
            reset();
            setPreview(null);

            fetchBrands(); // 🔹 Refresh brands grid
        } catch (error) {
            console.error(error);
            alert("Error adding brand");
        }

    };

    return (
        <div className="flex relative">
            <Sidebar />

            <div className="ml-0 md:ml-64 p-6 w-full bg-gray-100 min-h-screen">

                {/* ⭐ ADD BRAND FORM */}
                <div className="flex justify-center items-center">
                    <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            Add New Brand
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                            {/* Brand Name */}
                            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                <label className="w-32 text-gray-700 font-medium">
                                    Brand Name
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    placeholder="Enter brand name"
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col md:flex-row md:items-start md:gap-4">
                                <label className="w-32 text-gray-700 font-medium mt-1">
                                    Description
                                </label>
                                <textarea
                                    {...register("description", { required: true })}
                                    placeholder="Enter description"
                                    rows="3"
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                                ></textarea>
                            </div>

                            {/* File Upload */}
                            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                <label className="w-32 text-gray-700 font-medium">
                                    Brand Logo
                                </label>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    {...register("image", { required: true })}
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-white"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setPreview(URL.createObjectURL(file));
                                    }}
                                />
                            </div>

                            {/* Image Preview */}
                            {preview && (
                                <div className="flex justify-center">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-32 h-32 object-contain border rounded-lg shadow"
                                    />
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
                            >
                                Add Brand
                            </button>
                        </form>

                    </div>
                </div>

                {/* ⭐ BRAND GRID SECTION */}
                <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                    All Brands
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                    {brands.map((brand) => (
                        <div
                            key={brand._id}
                            className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition"
                        >
                            <img
                                src={`http://localhost:8080/uploads/${brand.image[0]}`}
                                alt={brand.name}
                                className="h-20 object-contain mb-3"
                            />
                            <p className="text-lg font-medium">{brand.name}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AddBrand;
