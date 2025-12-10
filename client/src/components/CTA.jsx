import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowRight, X } from 'lucide-react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Card from './Card';
const CTA = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onSubmit = (data) => {
        handleSearch(data.searchQuery);
        setIsModalOpen(true);
    };

    const handleSearch = async (query) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/search/getinfo/${query}`);
            setResult(res.data);
            reset();
        } catch (err) {
            console.log(err);
            setResult([]);
        }
    };

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
                <div className="flex justify-center w-full max-w-2xl mx-auto">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-row items-center gap-4 w-full"
                    >

                        {/* Search Bar */}
                        <div className="flex items-center bg-transparent border border-gray-600 rounded-full px-6 py-4 w-full backdrop-blur-sm">
                            <Search className="text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search Your Dream Car Here..."
                                className="bg-transparent border-none outline-none text-white ml-4 w-full placeholder-gray-400 text-sm md:text-base"
                                {...register("searchQuery")}
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="bg-white text-black rounded-full pl-6 pr-2 py-3 font-semibold flex items-center gap-4 hover:bg-gray-200 transition whitespace-nowrap"
                        >
                            Discover
                            <div className="bg-black text-white rounded-full p-2 flex items-center justify-center">
                                <ArrowRight size={16} />
                            </div>
                        </button>
                    </form>
                </div>
            </div>

            {/* Search Results Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                    <div className="relative w-full max-w-7xl h-[90vh] flex flex-col">

                        <div className="flex justify-end p-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                            >
                                <X size={32} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
                            {result.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center pb-10">
                                    {result.map((car) => (
                                        <Card key={car._id} car={car} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-white">
                                    <h2 className="text-2xl font-light">No supercars found matching "{searchQuery}"</h2>
                                    <p className="text-gray-400 mt-2">Try searching for a different brand or model.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CTA;
