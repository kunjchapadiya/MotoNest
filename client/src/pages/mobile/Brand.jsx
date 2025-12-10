import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Brand = () => {

    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/getbrand");
                const formattedBrands = response.data.map((brand) => ({
                    name: brand.name,
                    img: `http://localhost:8080/uploads/${brand.image[0]}`, // Assuming first image is the logo
                    link: `/brand/${brand.name.toLowerCase().replace(/\s+/g, '-')}`
                }));
                setBrands(formattedBrands);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };
        fetchBrands();
    }, []);

    return (
        <div className="w-full px-4 py-6">

            <h2 className="text-2xl font-bold font-montserrat mb-6 text-center">
                Brands
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {brands.map((brand, index) => (
                    <Link key={index} to={brand.link}>
                        <div className="flex items-center justify-center bg-white p-3 rounded-lg shadow">
                            <img
                                src={brand.img}
                                alt={brand.name}
                                className="w-24 h-24 object-contain md:w-32 md:h-32"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Brand;
