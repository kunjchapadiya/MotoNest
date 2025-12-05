import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Slide } from "react-toastify";
import { SiAdobeacrobatreader } from "react-icons/si";
import { IoIosMail } from "react-icons/io";

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState("info");
    const { register, handleSubmit, reset } = useForm();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchOrders = async (userId) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/order/myorders/${userId}`, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to fetch orders", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            }
        };

        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/profile/getprofile", {
                    withCredentials: true,
                });
                reset(response.data);
                if (response.data._id) {
                    fetchOrders(response.data._id);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                if (error.response && error.response.status === 401) {
                    alert("Session expired. Please login again.");
                    navigate("/login");
                }
            }
        };
        fetchProfile();
    }, [reset, navigate]);

    const editProfile = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/api/profile/editprofile", data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success(response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    };

    const changePassword = async (data) => {
        if (data.newPassword !== data.confirmNewPassword) {
            toast.error("Passwords do not match", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/api/auth/changepassword", data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success(response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            reset();
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error(error.response?.data?.message || "Failed to change password", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    };

    const handleLogout = async () => {

        try {
            const fetch = "http://localhost:8080/api/auth/logout";
            const response = await axios.post(fetch, {
                withCredentials: true,
            });
            navigate("/login");
            toast.success(response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Failed to log out", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    }
    const deleteAccount = async () => {
        try {
            const response = await axios.delete("http://localhost:8080/api/profile/deleteaccount", {
                withCredentials: true,
            });
            toast.success(response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            navigate("/login");
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error(error.response?.data?.message || "Failed to delete account", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    };
    const handleSendInvoice = async (paymentId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/mail/sendinvoice/${paymentId}`, {
                withCredentials: true,
            });
            toast.success(response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } catch (error) {
            console.error("Error sending invoice:", error);
            toast.error(error.response?.data?.message || "Failed to send invoice", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg p-6 space-y-4">
                <h1 className="text-2xl font-bold mb-6">Profile Menu</h1>

                <button
                    onClick={() => setActiveSection("info")}
                    className={`w-full text-left px-3 py-2 rounded-lg 
            ${activeSection === "info" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}
          `}
                >
                    Edit Information
                </button>

                <button
                    onClick={() => setActiveSection("password")}
                    className={`w-full text-left px-3 py-2 rounded-lg 
            ${activeSection === "password" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}
          `}
                >
                    Change Password
                </button>

                <button
                    onClick={() => setActiveSection("favorites")}
                    className={`w-full text-left px-3 py-2 rounded-lg 
            ${activeSection === "favorites" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}
          `}
                >
                    Favorites
                </button>

                <button
                    onClick={() => setActiveSection("delete")}
                    className={`w-full text-left px-3 py-2 rounded-lg 
            ${activeSection === "delete" ? "bg-red-600 text-white" : "hover:bg-gray-200"}
          `}
                >
                    Delete Account
                </button>

                <button
                    className="w-full text-left px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {/* Right Side Content */}
            <div className="flex-1 p-10">

                {/* SECTION 1: Edit Info */}
                {activeSection === "info" && (
                    <div className="bg-white p-8 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-4">Edit Basic Information</h2>

                        <form action="" onSubmit={handleSubmit(editProfile)} method="post">

                            <div className="space-y-4">
                                <input
                                    {...register("name")}
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full p-3 border rounded-lg"
                                />
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-3 border rounded-lg"
                                />
                            </div>

                            <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                                Save Changes
                            </button>
                        </form>
                    </div>
                )}

                {/* SECTION 2: Change Password */}
                {activeSection === "password" && (
                    <div className="bg-white p-8 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

                        <form onSubmit={handleSubmit(changePassword)}>
                            <div className="space-y-4">
                                <input
                                    {...register("oldPassword")}
                                    type="password"
                                    placeholder="Old Password"
                                    className="w-full p-3 border rounded-lg"
                                />
                                <input
                                    {...register("newPassword")}
                                    type="password"
                                    placeholder="New Password"
                                    className="w-full p-3 border rounded-lg"
                                />
                                <input
                                    {...register("confirmNewPassword")}
                                    type="password"
                                    placeholder="Confirm New Password"
                                    className="w-full p-3 border rounded-lg"
                                />
                            </div>

                            <button className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
                                Update Password
                            </button>
                        </form>
                    </div>
                )}

                {/* favorites */}
                {activeSection === "favorites" && (
                    <div className="bg-white p-8 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-4">My Orders</h2>
                        <div className="space-y-4">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <div key={order._id} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                                        <div className="left">
                                            <img src={`http://localhost:8080/${order.carId.image[0].replace(/\\/g, "/")}`} alt="" srcset="" className="w-60 h-60 object-contain rounded-lg" />
                                        </div>
                                        <div className="middle">
                                            <p>Order ID: {order.paymentId}</p>

                                            <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                            <p>Order Status: {order.paymentStatus}</p>
                                            {order.carId && (
                                                <p>Car: {order.carId.brand} {order.carId.model}</p>
                                            )}
                                            <p>Amount: ₹{order.amount.toLocaleString("en-In")}</p>
                                        </div>
                                        <div className="right flex flex-col gap-2">

                                            <button
                                                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                                                onClick={() => handleSendInvoice(order._id)}
                                            >
                                                <IoIosMail />
                                                Send Invoice to Email
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No orders found</p>
                            )}
                        </div>
                    </div>
                )}

                {/* SECTION 3: Delete Account */}
                {activeSection === "delete" && (
                    <div className="bg-white p-8 rounded-xl shadow">
                        <h2 className="text-xl font-semibold text-red-600 mb-3">Delete Account</h2>

                        <p className="text-gray-600 mb-4">
                            Once deleted, your account cannot be recovered. Please confirm your decision.
                        </p>

                        <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700" onClick={deleteAccount}>
                            Permanently Delete My Account
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProfilePage;
