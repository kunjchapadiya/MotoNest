import { Navigation, Fuel, MapPin, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const Card = ({ car }) => {
    const navigate = useNavigate();

    const handleWhatsAppEnquiry = (car) => {
        const phoneNumber = "916352023799";
        const message = `Hello, I want to enquire about ${car.brand} ${car.model} priced at ₹${car.price}.`;
        const text = encodeURIComponent(message);
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const whatsappUrl = isMobile
            ? `whatsapp://send?phone=${phoneNumber}&text=${text}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${text}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl w-full max-w-sm hover:shadow-2xl transition-shadow duration-300 my-10">

            <div className="p-6">
                <div className="inline-block bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold mb-3">
                    Reg.Year : {car.year}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 leading-tight">{car.brand} {car.model}</h2>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    ₹ {new Intl.NumberFormat('en-IN').format(car.price)}
                </h3>

                <div className="flex justify-between mt-6 pt-2">

                    <div className="flex flex-col gap-1 pr-4 border-r border-gray-200 w-1/3">
                        <Navigation size={16} className="text-black mb-1" />
                        <p className="text-[10px] text-gray-500 uppercase font-medium">Kilometers</p>
                        <p className="text-sm font-bold text-gray-900">{car.kmDriven} km</p>
                    </div>

                    <div className="flex flex-col gap-1 px-4 border-r border-gray-200 w-1/3">
                        <Fuel size={16} className="text-black mb-1" />
                        <p className="text-[10px] text-gray-500 uppercase font-medium">Fuel Type</p>
                        <p className="text-sm font-bold text-gray-900">{car.fuelType}</p>
                    </div>

                    <div className="flex flex-col gap-1 pl-4 w-1/3">
                        <MapPin size={16} className="text-black mb-1" />
                        <p className="text-[10px] text-gray-500 uppercase font-medium">Reg. State</p>
                        <p className="text-sm font-bold text-gray-900">{car.registrationState}</p>
                    </div>

                </div>
            </div>

            <div className="relative">
                <img
                    src={car.image && car.image.length > 0 ? `http://localhost:8080/${car.image[0].replace(/\\/g, "/")}` : "/images/cta/cta1.png"}
                    alt={car.model}
                    className="w-full h-64 object-contain   "
                />

                {/* <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white">
                    <Bookmark size={20} className="text-gray-900" />
                </button> */}
            </div>

            <div className="viewbtn flex justify-center my-5 gap-5">
                <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800" onClick={() => navigate(`/car/${car._id}`)}>
                    View Details
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-zinc-800 transition flex items-center gap-2" onClick={() => handleWhatsAppEnquiry(car)}>
                    Enquire on
                    <FaWhatsapp size={20} color="white" />
                </button>
            </div>
        </div>
    );
};

export default Card;
