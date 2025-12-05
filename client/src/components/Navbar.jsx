import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// Brands
const brands = [
    { name: "Audi", img: "/images/logos/audi.png", link: "/brand/audi" },
    { name: "Bentley", img: "/images/logos/bentley.png", link: "/brand/bentley" },
    { name: "BMW", img: "/images/logos/bmw.png", link: "/brand/bmw" },
    { name: "Ferrari", img: "/images/logos/ferrari.png", link: "/brand/ferrari" },
    { name: "Lamborghini", img: "/images/logos/lamborghini.png", link: "/brand/lamborghini" },
    { name: "Land Rover", img: "/images/logos/lr.png", link: "/brand/land-rover" },
    { name: "Mercedes-Benz", img: "/images/logos/mercedes.png", link: "/brand/mercedes" },
    { name: "Porsche", img: "/images/logos/porsche.png", link: "/brand/porsche" },
    { name: "Rolls-Royce", img: "/images/logos/rolls-royce.png", link: "/brand/rolls-royce" },
    { name: "Volvo", img: "/images/logos/volvo.png", link: "/brand/volvo" },
];

// Categories
const categories = [
    { name: "Sedan", img: "/images/body-categories/sedan.png", link: "/category/sedan" },
    { name: "Hatchback", img: "/images/body-categories/hatchback.png", link: "/category/hatchback" },
    { name: "SUV", img: "/images/body-categories/suv.png", link: "/category/suv" },
    { name: "Sport", img: "/images/body-categories/sport.png", link: "/category/sport" },
    { name: "Coupe", img: "/images/body-categories/coupe.png", link: "/category/coupe" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === "/";

    // Read Cookie Function
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    };

    // Detect login based on token cookie
    useEffect(() => {
        const token = getCookie("token");
        setIsLoggedIn(!!token);
    }, [location.pathname]);

    // Logout function
    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/auth/logout",
                {},
                { withCredentials: true }
            );

            toast.success("Logged out successfully");
            setIsLoggedIn(false);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
            toast.error("Logout failed: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <nav
            className={`${isHome
                ? "absolute top-0 left-0 w-full z-50 bg-transparent text-white"
                : "bg-white shadow-md sticky top-0 z-50 text-gray-800"
                }`}
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className={`text-3xl font-bold tracking-wide ${isHome ? "text-white" : "text-blue-500"
                        }`}
                >
                    MotoNest
                </Link>

                {/* Desktop Menu */}
                <ul
                    className={`hidden lg:flex items-center space-x-6 font-medium ${isHome ? "text-gray-200" : "text-gray-600"
                        }`}
                >
                    <li>
                        <Link to="/" className="hover:text-blue-400 transition">
                            Home
                        </Link>
                    </li>

                    {/* Category Dropdown */}
                    <li className="group">
                        <span className="cursor-pointer hover:text-blue-400 transition py-4">
                            Category
                        </span>

                        <div className="fixed left-0 top-[72px] w-full hidden group-hover:block bg-white shadow-xl border-t border-gray-200 z-40">
                            <div className="container mx-auto p-8">
                                <div className="grid grid-cols-5 gap-6">
                                    {categories.map((cat) => (
                                        <Link to={cat.link} key={cat.name}>
                                            <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center gap-3 hover:bg-gray-100 hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 shadow-sm">
                                                <img src={cat.img} alt={cat.name} className="h-20 w-40 object-contain" />
                                                <span className="text-sm font-bold text-gray-800">{cat.name}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </li>

                    {/* Brands Dropdown */}
                    <li className="group">
                        <span className="cursor-pointer hover:text-blue-400 transition py-4">
                            Brands
                        </span>

                        <div className="fixed left-0 top-[72px] w-full hidden group-hover:block bg-white shadow-xl border-t border-gray-200 z-40">
                            <div className="container mx-auto p-8">
                                <div className="grid grid-cols-5 gap-6">
                                    {brands.map((brand) => (
                                        <Link to={brand.link} key={brand.name}>
                                            <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center gap-3 hover:bg-gray-100 hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 shadow-sm">
                                                <img src={brand.img} alt={brand.name} className="h-20 w-20 object-contain" />
                                                <span className="text-sm font-bold text-gray-800">{brand.name}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </li>

                    <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>
                    <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
                    <li><Link to="/profile" className="hover:text-blue-400 transition">Profile</Link></li>

                    {/* Login / Logout Button */}
                    <li>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition shadow-md"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
                            >
                                Login
                            </Link>
                        )}
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className={`lg:hidden text-2xl ${isHome ? "text-white" : "text-gray-600"
                        }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "X" : "≡"}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-6 flex flex-col space-y-4 shadow-lg text-gray-600">
                    <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-400">Home</Link>
                    <Link to="/buy-cars" onClick={() => setIsOpen(false)} className="hover:text-blue-400">Category</Link>
                    <Link to="/brands" onClick={() => setIsOpen(false)} className="hover:text-blue-400">Brands</Link>
                    <Link to="/wishlist" onClick={() => setIsOpen(false)} className="hover:text-blue-400">Wishlist</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-400">About</Link>
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-400">Contact</Link>
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="hover:text-blue-400">Profile</Link>

                    {isLoggedIn ? (
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsOpen(false);
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg w-fit"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-fit"
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
