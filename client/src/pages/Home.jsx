import React, { useState, useEffect } from 'react'
import CTA from '../components/CTA'
import axios from 'axios'
import Card from '../components/Card'

const Home = () => {
    const [recentCars, setRecentCars] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/car/recent')
            .then(response => {
                console.log("Recent cars data:", response.data);
                if (Array.isArray(response.data)) {
                    setRecentCars(response.data);
                } else {
                    console.error("Received non-array data for recent cars");
                }
            })
            .catch(error => {
                console.error('Error fetching recent cars:', error)
            })
    }, [])

    return (
        <>
            <CTA />
            <div className="latest">
                <div className="title flex items-center justify-between mt-6 mx-10 text-3xl font-bold font-montserrat">
                    <h2>Recently Parked</h2>
                </div>
                {recentCars.length === 0 ? (
                    <div className="text-center text-gray-500 my-10">No recently added cars found.</div>
                ) : (
                    <div className="cars grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
                        {recentCars.map(car => (
                            <Card key={car._id} car={car} />
                        ))}
                    </div>
                )}
            </div>

            <div className="w-full bg-black px-4 md:px-10 py-6">
                <div className="
        flex flex-col md:flex-row 
        items-center justify-between 
        w-full
    ">
                    {/* LEFT VIDEO */}
                    <div className="w-full md:w-1/2">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-[40vh] md:h-[70vh] object-cover rounded-lg"
                        >
                            <source src="/videos/porsche.webm" type="video/webm" />
                        </video>
                    </div>

                    {/* RIGHT TEXT */}
                    <div className="
            w-full md:w-1/2 
            text-white flex flex-col 
            items-center justify-center 
            gap-4 py-6 md:py-0
            text-center
        ">
                        <h1 className="text-lg md:text-xl">LET'S KEEP IT SIMPLE.</h1>

                        <h1 className="text-xl md:text-3xl font-semibold font-montserrat leading-snug">
                            We are the best when it <br />comes to exotic cars.
                        </h1>

                        <button className="
                bg-white text-black px-6 py-2 rounded-full 
                font-semibold hover:bg-zinc-800 hover:text-white 
                transition
            ">
                            About Us
                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home