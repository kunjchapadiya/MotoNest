import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    const brands = [
        { name: "Audi", link: "/brand/audi" },
        { name: "Bentley", link: "/brand/bentley" },
        { name: "BMW", link: "/brand/bmw" },
        { name: "Ferrari", link: "/brand/ferrari" },
        { name: "Lamborghini", link: "/brand/lamborghini" },
        { name: "Land Rover", link: "/brand/land-rover" },
        { name: "Mercedes-Benz", link: "/brand/mercedes" },
        { name: "Porsche", link: "/brand/porsche" },
        { name: "Rolls-Royce", link: "/brand/rolls-royce" },
        { name: "Volvo", link: "/brand/volvo" },
    ];

    const categories = [
        { name: "Sedan", link: "/category/sedan" },
        { name: "Hatchback", link: "/category/hatchback" },
        { name: "SUV", link: "/category/suv" },
        { name: "Sport", link: "/category/sport" },
        { name: "Coupe", link: "/category/coupe" },
    ];

    return (
        <footer className="w-full bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800 font-sans">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Top Section: Main Info & Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Column 1: About MotoNest */}
                    <div>
                        <Link to="/" className="text-3xl font-bold text-white flex items-center gap-2 mb-4">
                            <span className="text-red-600">Moto</span>Nest
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400 mb-6">
                            Your premier destination for buying and selling premium pre-owned vehicles.
                            We ensure quality, transparency, and the best deals on luxury cars.
                            Drive your dream car today with MotoNest.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"><FaFacebookF /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"><FaTwitter /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"><FaInstagram /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"><FaLinkedinIn /></a>
                        </div>
                    </div>

                    {/* Column 2: Important Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6 border-b-2 border-red-600 inline-block pb-1">Important Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="hover:text-red-500 transition-colors duration-200 flex items-center gap-2">Home</Link></li>
                            <li><Link to="/about" className="hover:text-red-500 transition-colors duration-200 flex items-center gap-2">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-red-500 transition-colors duration-200 flex items-center gap-2">Contact Us</Link></li>
                            <li><Link to="/profile" className="hover:text-red-500 transition-colors duration-200 flex items-center gap-2">My Profile</Link></li>
                            <li><Link to="/login" className="hover:text-red-500 transition-colors duration-200 flex items-center gap-2">Login / Sign Up</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6 border-b-2 border-red-600 inline-block pb-1">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-red-500" />
                                <span>123 Auto Drive, Motor City,<br />CA 90210, United States</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-red-500" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-red-500" />
                                <span>support@motonest.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6 border-b-2 border-red-600 inline-block pb-1">Newsletter</h3>
                        <p className="text-sm text-gray-400 mb-4">Subscribe to get the latest updates on new arrivals and special offers.</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
                            />
                            <button className="bg-red-600 text-white px-4 py-3 rounded font-semibold hover:bg-red-700 transition-colors duration-300">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <hr className="border-gray-800 my-8" />

                {/* Row 1: Body Categories */}
                <div className="mb-8">
                    <h3 className="text-white text-lg font-semibold mb-4">Shop By Category</h3>
                    <div className="flex flex-wrap gap-4">
                        {categories.map((cat, index) => (
                            <Link
                                key={index}
                                to={cat.link}
                                className="bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm transition-all duration-300"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Row 2: Popular Brands */}
                <div className="mb-12">
                    <h3 className="text-white text-lg font-semibold mb-4">Popular Brands</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {brands.map((brand, index) => (
                            <Link
                                key={index}
                                to={brand.link}
                                className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-sm"
                            >
                                {brand.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; 2025 MotoNest. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="#" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
