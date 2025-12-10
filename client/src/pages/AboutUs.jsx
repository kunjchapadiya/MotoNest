import React from 'react';


const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Hero Section */}
            <div className="relative w-full h-[60vh] bg-black overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-60 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury Car"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 text-center text-white px-4">
                    <h1
                        className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
                    >
                        Driving Dreams
                    </h1>
                    <p
                        className="text-xl md:text-2xl font-light text-gray-200 max-w-2xl mx-auto"
                    >
                        Redefining the premium pre-owned car buying experience.
                    </p>
                </div>
            </div>

            {/* Our Mission Section */}
            <div className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Mission</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            At MotoNest, we believe that buying a pre-owned luxury car should be as exciting and premium as buying a new one. We are dedicated to providing a curated selection of top-tier vehicles that meet the highest standards of quality and performance.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our team of experts meticulously inspects every vehicle to ensure transparency and trust. We are not just selling cars; we are delivering a lifestyle of elegance and power.
                        </p>
                    </div>
                    <div
                        className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1697179162923-9ea45f98092c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Showroom"
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
            </div>

            {/* Stats / Features Section */}
            <div className="bg-gray-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div
                            className="p-8 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
                        >
                            <div className="text-5xl font-bold text-red-500 mb-4">500+</div>
                            <h3 className="text-xl font-semibold mb-2">Cars Sold</h3>
                            <p className="text-gray-400">Trusted by hundreds of happy customers across the country.</p>
                        </div>
                        <div
                            className="p-8 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
                        >
                            <div className="text-5xl font-bold text-red-500 mb-4">150+</div>
                            <h3 className="text-xl font-semibold mb-2">Quality Checks</h3>
                            <p className="text-gray-400">Every car undergoes a rigorous inspection process.</p>
                        </div>
                        <div
                            className="p-8 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
                        >
                            <div className="text-5xl font-bold text-red-500 mb-4">24/7</div>
                            <h3 className="text-xl font-semibold mb-2">Support</h3>
                            <p className="text-gray-400">We are here to assist you at every step of your journey.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section (Optional but good for UI) */}
            <div className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Meet The Experts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { name: "Alex Morgan", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" },
                        { name: "Sarah Jenkins", role: "Head of Sales", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" },
                        { name: "Michael Ross", role: "Lead Mechanic", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop" },
                        { name: "Emily Chen", role: "Customer Relations", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" }
                    ].map((member, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl shadow-lg"
                        >
                            <img src={member.img} alt={member.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-0 left-0 p-6 text-white">
                                <h3 className="text-xl font-bold">{member.name}</h3>
                                <p className="text-sm text-gray-300">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
