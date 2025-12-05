import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

// Mapping brand → logo & description
const brandInfo = {
    audi: {
        name: "Audi",
        logo: "/images/logos/audi.png",
        desc: "Discover luxury, performance, and engineering excellence crafted by Audi."
    },
    ferrari: {
        name: "Ferrari",
        logo: "/images/logos/ferrari.png",
        desc: "Experience Italian craftsmanship and legendary performance with Ferrari."
    },
    volvo: {
        name: "Volvo",
        logo: "/images/logos/volvo.png",
        desc: "Explore Volvo’s world-renowned comfort, safety, and Scandinavian design."
    },
    bmw: {
        name: "BMW",
        logo: "/images/logos/bmw.png",
        desc: "Sheer driving pleasure—BMW offers power, precision, and innovation."
    },
    porsche: {
        name: "Porsche",
        logo: "/images/logos/porsche.png",
        desc: "Timeless design and exhilarating performance crafted by Porsche."
    },
    mercedes: {
        name: "Mercedes-Benz",
        logo: "/images/logos/mercedes.png",
        desc: "The peak of luxury, technology, and performance from Mercedes-Benz."
    },
    bentley: {
        name: "Bentley",
        logo: "/images/logos/bentley.png",
        desc: "Unrivaled craftsmanship and luxury, Bentley defines the grand touring experience."
    },
    lamborghini: {
        name: "Lamborghini",
        logo: "/images/logos/lamborghini.png",
        desc: "Extreme performance and sharp design, Lamborghini is the essence of the super sports car."
    },
    "land-rover": {
        name: "Land Rover",
        logo: "/images/logos/lr.png",
        desc: "Go anywhere in luxury with Land Rover, the ultimate in all-terrain capability."
    },
    "rolls-royce": {
        name: "Rolls-Royce",
        logo: "/images/logos/rolls-royce.png",
        desc: "The standard of the world, Rolls-Royce offers the ultimate in bespoke luxury and comfort."
    }
};

const BrandPage = () => {
    const { brand } = useParams();  // dynamic brand from URL
    const [cars, setCars] = useState([]);
    const [sortedCars, setSortedCars] = useState([]);
    const [sortType, setSortType] = useState("");

    useEffect(() => {
        const fetchBrandCars = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/brand/${brand}`);
                setCars(res.data);
                setSortedCars(res.data);
            } catch (error) {
                console.log("Error fetching cars:", error);
            }
        };
        fetchBrandCars();
    }, [brand]);

    const info = brandInfo[brand.toLowerCase()];

    if (!info) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-700">Brand Not Found</h1>
            </div>
        );
    }

    const handleSort = (type) => {
        setSortType(type);
        let sorted = [...cars];

        switch (type) {
            case "km_low_high":
                sorted.sort((a, b) => a.kmDriven - b.kmDriven);
                break;
            case "km_high_low":
                sorted.sort((a, b) => b.kmDriven - a.kmDriven);
                break;
            case "price_low_high":
                sorted.sort((a, b) => a.price - b.price);
                break;
            case "price_high_low":
                sorted.sort((a, b) => b.price - a.price);
                break;
            default:
                sorted = cars;
        }

        setSortedCars(sorted);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

            {/* Header Section */}
            <motion.div
                className="flex flex-col items-center py-16"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <img src={info.logo} alt={info.name} className="w-36 h-auto mb-6 drop-shadow-lg" />

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 uppercase">
                    Explore {info.name} Cars
                </h1>

                <p className="text-gray-500 text-lg mt-3 max-w-xl text-center">
                    {info.desc}
                </p>

                <div className="mt-6 w-24 h-1 bg-gray-900 rounded-full"></div>
            </motion.div>

            {/* Sort Dropdown */}
            <div className="flex justify-center mb-10 align-center h-10">
                <p className="text-gray-700 font-medium mr-2 text-lg">Sort by:</p>
                <select
                    className="px-4 py-2 border border-gray-300 rounded-full shadow-sm bg-white text-gray-700 font-medium"
                    value={sortType}
                    onChange={(e) => handleSort(e.target.value)}
                >
                    <option value="">Sort Cars</option>
                    <option value="km_low_high">KM: Low to High</option>
                    <option value="km_high_low">KM: High to Low</option>
                    <option value="price_low_high">Price: Low to High</option>
                    <option value="price_high_low">Price: High to Low</option>
                </select>
            </div>

            {/* Car Listing */}
            <motion.div
                className="px-6 md:px-16 lg:px-20 pb-20 flex flex-wrap justify-center gap-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {sortedCars.length > 0 ? (
                    sortedCars.map((car) => (
                        <Card key={car._id} car={car} />
                    ))
                ) : (
                    <p className="text-center text-xl text-gray-600">No cars available.</p>
                )}
            </motion.div>
        </div>
    );
};

export default BrandPage;
