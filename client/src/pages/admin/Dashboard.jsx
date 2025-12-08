import { React, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { User, Car, Info } from "lucide-react";
import axios from "axios";
const App = () => {

    const [totalUser, setTotalUser] = useState(0);
    const [totalCar, setTotalCar] = useState(0);
    const [totalEnquiry, setTotalEnquiry] = useState(0);
    const [recentCar, setRecentCar] = useState([]);
    const [recentEnquiry, setRecentEnquiry] = useState([]);

    useEffect(() => {
        try {

            const fetchData = async () => {

                const users = await axios.get("http://localhost:8080/api/dashboard/totaluser", { withCredentials: true });
                setTotalUser(users.data.totalUser);

                const cars = await axios.get("http://localhost:8080/api/dashboard/totalcar", { withCredentials: true });
                setTotalCar(cars.data.totalCar);

                const enquiries = await axios.get("http://localhost:8080/api/dashboard/pendingquery", { withCredentials: true });
                setTotalEnquiry(enquiries.data.totalEnquiry);

                const recentCar = await axios.get("http://localhost:8080/api/dashboard/recentcar", { withCredentials: true });
                setRecentCar(recentCar.data.recentCar);

                const recentEnquiry = await axios.get("http://localhost:8080/api/dashboard/recentenquiry", { withCredentials: true });
                setRecentEnquiry(recentEnquiry.data.recentEnquiry);
            }
            fetchData();
        } catch (error) {
            console.log(error);
        }
    })
    return (
        <div className="flex">
            <Sidebar />

            <div className="ml-0 md:ml-64 p-6 w-full bg-gray-100 min-h-screen">

                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-800 font-montserrat mb-6">
                    Dashboard Overview
                </h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5 hover:shadow-xl transition">
                        <div className="bg-red-100 p-4 rounded-xl">
                            <User size={40} className="text-red-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Users</p>
                            <h2 className="text-3xl font-bold text-gray-800">{totalUser}</h2>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5 hover:shadow-xl transition">
                        <div className="bg-green-100 p-4 rounded-xl">
                            <Car size={40} className="text-green-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Available Cars</p>
                            <h2 className="text-3xl font-bold text-gray-800">{totalCar}</h2>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5 hover:shadow-xl transition">
                        <div className="bg-blue-100 p-4 rounded-xl">
                            <Info size={40} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Pending Enquiries</p>
                            <h2 className="text-3xl font-bold text-gray-800">{totalEnquiry}</h2>
                        </div>
                    </div>

                </div>

                {/* Recent Enquiries Section */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Enquiries</h2>

                    <table className="w-full border-collapse overflow-hidden rounded-lg">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Phone</th>
                                <th className="px-4 py-3 text-left">Message</th>
                                <th className="px-4 py-3 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentEnquiry.map((query) => (
                                <tr
                                    key={query._id}
                                    className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition"
                                >
                                    <td className="px-4 py-3">
                                        {new Date(query.enquiryDate).toLocaleDateString("en-GB")}
                                    </td>
                                    <td className="px-4 py-3 capitalize">{query.name}</td>
                                    <td className="px-4 py-3">{query.email}</td>
                                    <td className="px-4 py-3">{query.phoneNo}</td>
                                    <td className="px-4 py-3">{query.enquiryMessage}</td>
                                    <td
                                        className={`px-4 py-3 font-semibold
                  ${query.enquiryStatus === "Pending" ? "text-orange-600" : ""}
                  ${query.enquiryStatus === "Resolved" ? "text-green-700" : ""}
                  ${query.enquiryStatus === "Cancelled" ? "text-red-600" : ""}
                `}
                                    >
                                        {query.enquiryStatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Recent Cars Section */}
                <div className="bg-white p-6 rounded-2xl shadow-lg my-10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Added Cars</h2>

                    <table className="w-full border-collapse overflow-hidden rounded-lg">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left">Model</th>
                                <th className="px-4 py-3 text-left">Brand</th>
                                <th className="px-4 py-3 text-left">Body Type</th>
                                <th className="px-4 py-3 text-left">State</th>
                                <th className="px-4 py-3 text-left">Year</th>
                                <th className="px-4 py-3 text-left">Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentCar.map((car) => (
                                <tr
                                    key={car._id}
                                    className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition"
                                >
                                    <td className="px-4 py-3 capitalize">{car.model}</td>
                                    <td className="px-4 py-3 capitalize">{car.brand}</td>
                                    <td className="px-4 py-3 capitalize">{car.bodyType}</td>
                                    <td className="px-4 py-3 capitalize">{car.registrationState}</td>
                                    <td className="px-4 py-3">{car.year}</td>
                                    <td className="px-4 py-3 font-semibold">₹{car.price.toLocaleString("en-IN")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



            </div>
        </div>

    );
};

export default App;
