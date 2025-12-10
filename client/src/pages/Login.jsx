import React, { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Submit Handler
    const onSubmit = async (data) => {
        axios.post('http://localhost:8080/api/auth/login', data, { withCredentials: true })
            .then((res) => {
                console.log("ROLE FROM BACKEND:", res.data.role); // 🔥 TEST HERE

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);

                toast.success("User logged in successfully");

                if (res.data.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Something went wrong");
            });
        reset();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-3xl shadow-xl flex w-full max-w-5xl overflow-hidden">

                {/* Left Image Section */}
                <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center p-6 rounded-l-3xl border-r border-gray-200">
                    <div className="w-full h-full flex items-center justify-center">
                        <DotLottieReact
                            src="./Lottie/login.lottie"
                            loop
                            autoplay
                        />
                    </div>
                </div>

                {/* Right Form Section */}
                <div className="w-full md:w-1/2 p-10">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-500">Welcome Back!</h1>
                        <div className="link flex flex-row gap-2 items-center justify-center">

                            <p className="text-gray-600">Create your new account</p>
                            <Link to="/signup" className="text-blue-400 hover:underline">
                                Signup
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>

                        {/* Email */}
                        <div>
                            <label className="text-sm text-gray-700">Email</label>
                            <div className="relative mt-1">
                                <input
                                    type="email"
                                    className="w-full border border-gray-300 bg-gray-50 text-gray-900 rounded-xl px-8 py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                    placeholder="yourname@example.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Enter a valid email",
                                        },
                                    })}
                                />
                                <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm text-gray-700">Your password</label>
                            <div className="relative mt-1">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full border border-gray-300 bg-gray-50 text-gray-900 rounded-xl px-8 py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                    placeholder="••••••••"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                />
                                <Lock className="absolute left-3 top-3 text-gray-500" size={20} />

                                {showPassword ? (
                                    <EyeOff
                                        onClick={() => setShowPassword(false)}
                                        className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                        size={22}
                                    />
                                ) : (
                                    <Eye
                                        onClick={() => setShowPassword(true)}
                                        className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                        size={22}
                                    />
                                )}
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                                <input type="checkbox" className="accent-blue-500" />
                                Remember me
                            </label>

                            <Link className="text-blue-400 hover:underline">
                                Recover Password
                            </Link>
                        </div>

                        {/* Button */}
                        <button type="submit" className="bg-blue-600 text-white w-full py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                            Login
                        </button>
                    </form>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
