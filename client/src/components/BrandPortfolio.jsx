import React from 'react';
import { Link } from 'react-router-dom';

const brands = [
    { name: 'BMW', logo: '/images/logos/bmw.png', link: '/brand/bmw' },
    { name: 'Audi', logo: '/images/logos/audi.png', link: '/brand/audi' },
    { name: 'Mercedes', logo: '/images/logos/mercedes.png', link: '/brand/mercedes' },
    { name: 'Land Rover', logo: '/images/logos/lr.png', link: '/brand/land-rover' },
    { name: 'Bentley', logo: '/images/logos/bentley.png', link: '/brand/bentley' },
    { name: 'Porsche', logo: '/images/logos/porsche.png', link: '/brand/porsche' },
    { name: 'Lamborghini', logo: '/images/logos/lamborghini.png', link: '/brand/lamborghini' },
    { name: 'Ferrari', logo: '/images/logos/ferrari.png', link: '/brand/ferrari' },
    { name: 'Rolls Royce', logo: '/images/logos/rolls-royce.png', link: '/brand/rolls-royce' },
    { name: 'Volvo', logo: '/images/logos/volvo.png', link: '/volvo' },
];

const BrandPortfolio = () => {
    return (
        <div className="w-full px-10 py-16 bg-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-4xl font-bold font-montserrat text-black">Our Portfolio</h2>
                <Link to="/brands" className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-zinc-800 transition mt-4 md:mt-0">
                    View All Brands
                </Link>
            </div>

            {/* Brands Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y divide-gray-200 border border-gray-200">
                {brands.map((brand, index) => (
                    <Link
                        to={brand.link}
                        key={index}
                        className="flex items-center justify-center p-8 hover:bg-gray-50 transition group h-40"
                    >
                        <img
                            src={brand.logo}
                            alt={brand.name}
                            className="max-h-16 max-w-full object-contain grayscale group-hover:grayscale-0 transition duration-300 opacity-80 group-hover:opacity-100"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BrandPortfolio;
