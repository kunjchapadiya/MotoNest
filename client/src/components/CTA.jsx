import React from 'react';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';

const CTA = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-32 relative overflow-hidden px-4">

            {/* Full Screen Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="/videos/bg.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay (optional) */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            {/* Text Content */}
            <div className="z-10 text-center max-w-4xl mx-auto">
                <p className="text-gray-300 text-sm md:text-base tracking-wide mb-4">
                    Welcome to the Dream Destination for Supercar Lovers.
                </p>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                    Supercars <span className="font-light text-gray-200">for Superstars</span>
                </h1>

                {/* Search + Button */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-2xl mx-auto">

                    {/* Search Bar */}
                    <div className="flex items-center bg-transparent border border-gray-600 rounded-full px-6 py-4 w-full md:flex-1 backdrop-blur-sm">
                        <Search className="text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search Your Dream Car Here..."
                            className="bg-transparent border-none outline-none text-white ml-4 w-full placeholder-gray-400 text-sm md:text-base"
                        />
                        <SlidersHorizontal className="text-gray-400 cursor-pointer" size={20} />
                    </div>

                    {/* Button */}
                    <button className="bg-white text-black rounded-full pl-6 pr-2 py-3 font-semibold flex items-center gap-4 hover:bg-gray-200 transition whitespace-nowrap">
                        Discover Collection
                        <div className="bg-black text-white rounded-full p-2 flex items-center justify-center">
                            <ArrowRight size={16} />
                        </div>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default CTA;
