import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useParams } from "react-router-dom";

// Mapping brand → logo & description
const bodyTypeData = {
    suv: {
        name: "SUV",
        logo: "/images/body-categories/suv.png",
        desc: "Strong performance, higher ground clearance, and powerful road presence."
    },
    sedan: {
        name: "Sedan",
        logo: "/images/body-categories/sedan.png",
        desc: "A perfect blend of comfort, style, and luxury designed for smooth drives."
    },
    hatchback: {
        name: "Hatchback",
        logo: "/images/body-categories/hatchback.png",
        desc: "Compact, practical, and budget-friendly cars ideal for everyday efficiency."
    },
    sport: {
        name: "Sports",
        logo: "/images/body-categories/sport.png",
        desc: "Experience unmatched speed, precision handling, and thrilling performance."
    },
    coupe: {
        name: "Coupe",
        logo: "/images/body-categories/coupe.png",
        desc: "Elegant two-door design blended with premium styling and dynamic performance."
    }
};


const BodyTypePage = () => {
    const { type } = useParams();  // dynamic type from URL
    const [cars, setCars] = useState([]);
    const [sortedCars, setSortedCars] = useState([]);
    const [sortType, setSortType] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Set to 6 (or 15) for testing pagination

    // Pagination Calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedCars.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedCars.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchBodyTypeCars = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/category/${type}`);
                setCars(res.data);
                setSortedCars(res.data);
                setCurrentPage(1);
            } catch (error) {
                console.log("Error fetching cars:", error);
            }
        };
        if (type) fetchBodyTypeCars();
    }, [type]);

    const info = bodyTypeData[type?.toLowerCase()];

    if (!info) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-700">Category Not Found</h1>
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
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

            {/* Header Section */}
            <div
                className="flex flex-col items-center py-16"
            >
                <img src={info.logo} alt={info.name} className="w-36 h-auto mb-6 drop-shadow-lg" />

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 uppercase">
                    Explore {info.name} Cars
                </h1>

                <p className="text-gray-500 text-lg mt-3 max-w-xl text-center">
                    {info.desc}
                </p>

                <div className="mt-6 w-24 h-1 bg-gray-900 rounded-full"></div>
            </div>

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
            <div
                className="px-6 md:px-16 lg:px-20 pb-20 flex flex-wrap justify-center gap-10"
            >
                {currentItems.length > 0 ? (
                    currentItems.map((car) => (
                        <Card key={car._id} car={car} />
                    ))
                ) : (
                    <p className="text-center text-xl text-gray-600">No cars available.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12 pb-16 space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg transition ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-black text-white hover:bg-gray-800"}`}
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 rounded-lg transition ${currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg transition ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-black text-white hover:bg-gray-800"}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BodyTypePage;
