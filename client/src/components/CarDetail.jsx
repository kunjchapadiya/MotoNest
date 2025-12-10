import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EMICalculator from './EMI';
import BrandPortfolio from './BrandPortfolio';
import ShopByCategory from './ShopByCategory';
import CarImageCarousel from './Carousel';
import ReservationForm from './forms/ReservationForm';
import PaymentSuccess from './PaymentSuccess';

const CarDetail = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [open, setOpen] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/admin/cars/${id}`);
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };
        fetchCar();
    }, [id]);

    const handleBookNow = async () => {
        try {
            // 1. Create Order
            const { data: { order } } = await axios.post(
                "http://localhost:8080/api/payment/create-order",
                {
                    carId: car._id,
                    amount: car.price,
                },
                { withCredentials: true }
            );

            // 2. Initialize Razorpay
            const options = {
                key: "rzp_test_Rn7aiUnlCQAvmD", // Replace with your actual Key ID
                amount: order.amount,
                currency: order.currency,
                name: "MotoNest",
                description: `Booking for ${car.brand} ${car.model}`,
                image: "https://example.com/your_logo", // Optional
                order_id: order.id,
                handler: async function (response) {
                    try {
                        // 3. Verify Payment
                        await axios.post(
                            "http://localhost:8080/api/payment/verify-payment",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                carId: car._id,
                                amount: car.price,
                            },
                            { withCredentials: true }
                        );

                        // alert(verifyRes.data.message);
                        setPaymentSuccess(true);
                    } catch (error) {
                        console.error("Verification Error:", error);
                        alert("Payment verification failed");
                    }
                },
                prefill: {
                    name: "User Name", // You can fetch this from user context
                    email: "user@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#000000",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error("Booking Error:", error);
            if (error.response && error.response.status === 401) {
                alert("Please login to book a car.");
            } else {
                alert(error.response?.data?.message || "Booking failed");
            }
        }
    };

    if (!car) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    const carImages = car.image && car.image.length > 0
        ? car.image.map(path => `http://localhost:8080/${path.replace(/\\/g, "/")}`)
        : ["/images/cta/cta1.png"];

    return (
        <>
            {/* Header Section */}
            <div className="header flex flex-row justify-between items-center w-full h-[20vh] px-10">
                <div className="title flex flex-col justify-center items-start w-[30vw] h-full gap-2">
                    <p className='bg-zinc-900 text-sm text-white rounded-3xl w-fit px-3 py-1'>Registarion year: {car.year}</p>
                    <h2 className='font-montserrat font-bold text-3xl'>{car.model}</h2>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                        ₹ {new Intl.NumberFormat('en-IN').format(car.price)}
                    </h3>
                </div>

                <div className="specs flex flex-row justify-between items-center w-[30vw]">
                    <div className="spec1 flex flex-col items-center gap-1">
                        <img src="/images/icon/compass.png" alt="" className="w-6 h-6" />
                        <p>KM Driven</p>
                        <p className="font-semibold">{car.kmDriven}</p>
                    </div>
                    <div className="spec2 flex flex-col items-center gap-1">
                        <img src="/images/icon/gas-station.png" alt="" className="w-6 h-6" />
                        <p className="font-semibold">Fuel Type</p>
                        <p className="font-semibold">{car.fuelType}</p>
                    </div>
                    <div className="spec3 flex flex-col items-center gap-1">
                        <img src="/images/icon/office.png" alt="" className="w-6 h-6" />
                        <p className="font-semibold">Registration State</p>
                        <p className="font-semibold">{car.registrationState}</p>
                    </div>
                </div>
                <div className="btns flex justify-center items-center w-[30vw] h-full gap-2">
                    <button
                        className={`px-6 py-3 rounded-full font-semibold transition ${car.status === "sold" ? "bg-red-600 text-white cursor-not-allowed" : "bg-black text-white hover:bg-zinc-800"}`}
                        onClick={handleBookNow}
                        disabled={car.status === "sold"}
                    >
                        {car.status === "sold" ? "Sold Out" : "Book Now"}
                    </button>

                    <button
                        className={`border-2 border-black px-6 py-3 rounded-full font-semibold transition ${car.status === "sold" ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300" : "bg-white text-black hover:bg-gray-100"}`}
                        onClick={() => setOpen(true)}
                        disabled={car.status === "sold"}
                    >
                        Reserve a car
                    </button>

                    {open && <ReservationForm setOpen={setOpen} />}
                    {paymentSuccess && <PaymentSuccess onClose={() => setPaymentSuccess(false)} />}
                </div>
            </div>

            <CarImageCarousel images={carImages} />

            <div className="feature-title flex flex-col items-center justify-start font-montserrat font-semibold text-4xl my-5">
                <h1>Car Summary</h1>
            </div>
            <div className="features grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 px-10 py-10 w-full justify-items-center">
                <div className="feature flex flex-col items-center text-center gap-2">
                    <img src="/images/icon/calender.png" alt="" className="w-10 h-10 object-contain" />
                    <p className="text-gray-500 text-sm">Registration Year</p>
                    <p className="font-semibold text-lg">{car.year}</p>
                </div>
                <div className="feature flex flex-col items-center text-center gap-2">
                    <img src="/images/icon/body.png" alt="" className="w-10 h-10 object-contain" />
                    <p className="text-gray-500 text-sm">Body Type</p>
                    <p className="font-semibold text-lg">{car.bodyType}</p>
                </div>
                <div className="feature flex flex-col items-center text-center gap-2">
                    <img src="/images/icon/door.png" alt="" className="w-10 h-10 object-contain" />
                    <p className="text-gray-500 text-sm">Doors</p>
                    <p className="font-semibold text-lg">4</p>
                </div>
                <div className="feature flex flex-col items-center text-center gap-2">
                    <img src="/images/icon/car-engine.png" alt="" className="w-10 h-10 object-contain" />
                    <p className="text-gray-500 text-sm">Engine</p>
                    <p className="font-semibold text-lg">2.0L</p>
                </div>
                <div className="feature flex flex-col items-center text-center gap-2">
                    <img src="/images/icon/gearbox.png" alt="" className="w-10 h-10 object-contain" />
                    <p className="text-gray-500 text-sm">Transmission</p>
                    <p className="font-semibold text-lg">{car.transmission}</p>
                </div>
                <div className="feature flex flex-col items-center text-center gap-2">
                    <img src="/images/icon/gas-station (1).png" alt="" className="w-10 h-10 object-contain" />
                    <p className="text-gray-500 text-sm">Fuel Type</p>
                    <p className="font-semibold text-lg">{car.fuelType}</p>
                </div>
                <div className="feature flex flex-col items-center text-center gap-2">
                    <img src="/images/icon/manager.png" alt="" className="w-10 h-10 object-contain" />
                    <p className="text-gray-500 text-sm">Owner</p>
                    <p className="font-semibold text-lg">{car.owner}</p>
                </div>
            </div>

            {/* EMI Calculator */}
            <div className="emi w-full min-h-screen flex flex-col md:flex-row bg-black text-white">
                <div className="left w-full md:w-1/2 h-[50vh] md:h-auto relative">
                    <img
                        src={car.image && car.image.length > 0 ? `http://localhost:8080/${car.image[0].replace(/\\/g, "/")}` : "/images/cta/cta1.png"}
                        alt="Car Image"
                        className="w-full h-full object-contain"
                    />
                    {car.status === "sold" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-65 z-10 transition-all duration-300">
                            <div className="border-4 border-white px-8 py-4 transform -rotate-12 bg-white/10 backdrop-blur-sm shadow-2xl">
                                <span className="text-white text-4xl md:text-6xl font-black tracking-wider uppercase drop-shadow-md">
                                    SOLD OUT
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-50 md:opacity-100 md:from-transparent md:via-transparent md:to-black"></div>
                </div>
                <div className="right w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center bg-black">
                    <EMICalculator price={car.price} />
                </div>
            </div>

            <ShopByCategory />
            <BrandPortfolio />
        </>
    )
}

export default CarDetail
