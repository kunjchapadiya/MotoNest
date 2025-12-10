import React from "react";
import { useForm } from "react-hook-form";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const ContactUs = () => {
    // react-hook-form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Submit handler
    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:8080/api/contact/addcontact", data);
            toast.success(res.data.message || "Message sent successfully!");
            reset();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to send message.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Hero Section */}
            <div className="relative w-full h-[40vh] bg-black overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-70 bg-gradient-to-r from-gray-900 via-gray-800 to-black z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2128&auto=format&fit=crop"
                    alt="Contact Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-lg md:text-xl font-light text-gray-300">
                        We'd love to hear from you.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-gray-900">
                            Contact Information
                        </h2>
                        <p className="text-gray-600 mb-10 leading-relaxed">
                            Have questions about a car? Need help with financing? Or just want
                            to say hello?
                            Fill out the form or reach us directly using the information
                            below.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-6">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
                                    <FaPhoneAlt size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">Phone</h3>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                    <p className="text-gray-600">+1 (555) 987-6543</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">Email</h3>
                                    <p className="text-gray-600">support@motonest.com</p>
                                    <p className="text-gray-600">sales@motonest.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                                    <FaMapMarkerAlt size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Location
                                    </h3>
                                    <p className="text-gray-600">123 Auto Drive, Motor City</p>
                                    <p className="text-gray-600">CA 90210, United States</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Follow Us
                            </h3>
                            <div className="flex space-x-4">
                                <a className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    <FaFacebookF />
                                </a>
                                <a className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-400 hover:text-white transition-all duration-300">
                                    <FaTwitter />
                                </a>
                                <a className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition-all duration-300">
                                    <FaInstagram />
                                </a>
                                <a className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white transition-all duration-300">
                                    <FaLinkedinIn />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (react-hook-form) */}
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">Send a Message</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Name + Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register("name", { required: true })}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 
                    focus:border-red-500 focus:bg-white focus:ring-0 transition-colors outline-none"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", { required: true })}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 
                    focus:border-red-500 focus:bg-white focus:ring-0 transition-colors outline-none"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    {...register("subject", { required: true })}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 
                  focus:border-red-500 focus:bg-white focus:ring-0 transition-colors outline-none"
                                    placeholder="Inquiry about..."
                                />
                                {errors.subject && <p className="text-red-500 text-sm">Subject is required</p>}
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    {...register("message", { required: true })}
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 
                  focus:border-red-500 focus:bg-white focus:ring-0 outline-none resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm">Message is required</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white font-bold py-4 rounded-lg hover:bg-red-700 
                transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Send Message
                            </button>

                        </form>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="w-full h-96 bg-gray-200">
                <iframe
                    src="https://www.google.com/maps/embed?...etc"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactUs;
