import React from 'react';
import { Link } from 'react-router-dom';

const Brand = () => {

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
