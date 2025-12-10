import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";

const LoginPopup = ({ onClose, onSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', data, { withCredentials: true });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            toast.success("Logged in successfully");

            if (onSuccess) onSuccess(res.data);
            if (onClose) onClose();

        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
        reset();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in-up">

                {/* Close Button - Optional if you want to force login, remove this */}
                {/* <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button> */}

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Admin Login Required</h2>
                    <p className="text-gray-500 text-sm mt-1">Please login to access the dashboard</p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="relative mt-1">
                            <input
                                type="email"
                                className="w-full border border-gray-300 bg-gray-50 text-gray-900 rounded-lg px-4 py-2.5 pl-10 outline-none focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="admin@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                })}
                            />
                            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="relative mt-1">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full border border-gray-300 bg-gray-50 text-gray-900 rounded-lg px-4 py-2.5 pl-10 outline-none focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 characters" }
                                })}
                            />
                            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all transform hover:scale-[1.02]"
                    >
                        Login to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPopup;
