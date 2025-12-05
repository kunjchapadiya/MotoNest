import React, { useState } from "react";
import { Menu, X, Gauge, Car, Users, CreditCard, MessageCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";


const Sidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="md:hidden p-3 fixed top-4 left-4 z-50 bg-white shadow-md rounded-lg border"
                onClick={() => setOpen(!open)}
            >
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-sm p-5 
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
            >
                {/* Logo */}
                <h1 className="text-2xl font-bold mb-10 text-gray-800">Admin Panel</h1>

                <nav className="flex flex-col gap-3">

                    <Link
                        to="/admin"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition"
                    >
                        <Gauge size={20} />
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/managecar"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition"
                    >
                        <Car size={20} />
                        Manage Cars
                    </Link>

                    <Link
                        to="/admin/manageuser"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition"
                    >
                        <Users size={20} />
                        Manage Users
                    </Link>

                    <Link
                        to="/admin/paymentdetail"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition"
                    >
                        <CreditCard size={20} />
                        Payment Details
                    </Link>

                    <Link
                        to="/admin/managequery"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-700 text-gray-700 transition"
                    >
                        <MessageCircle size={20} />
                        Manage Query
                    </Link>

                    <button
                        className="flex items-center gap-3 p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white mt-10 transition"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>

                </nav>
            </div>
        </>
    );
};

export default Sidebar;
