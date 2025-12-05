import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {

    const categories = [
        { name: "Sedan", img: "/images/body-categories/sedan.png", link: "/category/sedan" },
        { name: "Hatchback", img: "/images/body-categories/hatchback.png", link: "/category/hatchback" },
        { name: "SUV", img: "/images/body-categories/suv.png", link: "/category/suv" },
        { name: "Sport", img: "/images/body-categories/sport.png", link: "/category/sport" },
        { name: "Coupe", img: "/images/body-categories/coupe.png", link: "/category/coupe" },
    ];

    return (
        <div className="w-full px-4 py-6">

            <h2 className="text-2xl font-bold font-montserrat mb-6 text-center">
                Categories
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {categories.map((category, index) => (
                    <Link key={index} to={category.link}>
                        <div className="flex items-center justify-center bg-white p-3 rounded-lg shadow">
                            <img
                                src={category.img}
                                alt={category.name}
                                className="w-24 h-24 object-contain md:w-32 md:h-32"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
