import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Coupe', image: '/images/body-categories/coupe.png', link: '/category/coupe' },
    { name: 'Hatchback', image: '/images/body-categories/hatchback.png', link: '/category/hatchback' },
    { name: 'SUV', image: '/images/body-categories/suv.png', link: '/category/suv' },
    { name: 'Sedan', image: '/images/body-categories/sedan.png', link: '/category/sedan' },
    { name: 'Sports', image: '/images/body-categories/sport.png', link: '/category/sport' },
];

const ShopByCategory = () => {
    return (
        <div className="w-full px-10 py-10 bg-white">
            {/* Header */}
            <div className="flex items-center mb-10">
                <h2 className="text-3xl font-bold font-montserrat text-black whitespace-nowrap mr-6">Shop By Car Style</h2>
                <div className="h-[1px] bg-gray-300 w-full mt-2"></div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {categories.map((cat, index) => (
                    <Link
                        to={cat.link}
                        key={index}
                        className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white group cursor-pointer"
                    >
                        <div className="h-24 w-full flex items-center justify-center mb-6">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="h-full w-auto object-contain grayscale group-hover:grayscale-0 transition duration-300"
                            />
                        </div>
                        <span className="font-bold text-lg text-gray-700 group-hover:text-black font-montserrat">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ShopByCategory;
