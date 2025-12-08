import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentDetail = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8080/api/payment/getpayment",
                    { withCredentials: true }
                );

                console.log("PAYMENT DATA:", res.data.payment);
                setPayments(res.data.payment || []);

            } catch (error) {
                console.error(error);
                toast.error("Failed to load payments");
            }
        };

        fetchPayments();
    }, []);

    return (
        <div className="flex">
            <Sidebar />

            <div className="ml-0 md:ml-64 p-6 w-full bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-semibold text-gray-800">Manage Payments</h1>

                <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden mt-6">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-3 text-left">Payment ID</th>
                            <th className="border p-3 text-left">Name</th>
                            <th className="border p-3 text-left">Email</th>
                            <th className="border p-3 text-left">Car Model</th>
                            <th className="border p-3 text-left">Brand</th>
                            <th className="border p-3 text-left">Price</th>
                            <th className="border p-3 text-left">Payment Date</th>
                            <th className="border p-3 text-left">Payment Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((p) => (
                            <tr key={p._id} className="hover:bg-gray-50 transition">
                                <td className="border p-3">{p.paymentId}</td>
                                <td className="border p-3">{p.userId?.name}</td>
                                <td className="border p-3">{p.userId?.email}</td>
                                <td className="border p-3">{p.carId?.model}</td>
                                <td className="border p-3">{p.carId?.brand}</td>
                                <td className="border p-3">₹{p.carId?.price}</td>
                                <td className="border p-3">{new Date(p.createdAt).toLocaleDateString()}</td>
                                <td className="border p-3">
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                        {p.paymentStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default PaymentDetail;
