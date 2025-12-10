import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FaTimes } from 'react-icons/fa';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios from 'axios';

const PaymentSuccess = ({ onClose }) => {
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams(); // Get car ID from URL if needed, or just use it to trigger effect

    const handleClose = () => {
        if (onClose) onClose();
        navigate('/');
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // The ID param is ignored by backend but required by route definition
                const response = await axios.get(`http://localhost:8080/api/payment/getpayment/${id || 'latest'}`, { withCredentials: true });
                if (response.data.success) {
                    setPaymentData(response.data.payment);
                }
            } catch (error) {
                console.error("Error fetching payment details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) return null; // Or a loading spinner

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div
                className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center m-4"
            >
                {/* Close Button (X) */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                    <FaTimes size={20} />
                </button>

                {/* Success Animation */}
                <div
                    className="flex justify-center mb-6 h-32"
                >
                    <DotLottieReact
                        src="/Lottie/success.lottie" // Using a public URL for reliability
                        autoplay
                        loop={false}
                    />
                </div>

                {/* Content */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment Successful!</h2>

                {paymentData && (
                    <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left space-y-3 border border-gray-100">
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">Payment ID</span>
                            <span className="font-mono text-sm font-medium text-gray-800">{paymentData.paymentId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">Car</span>
                            <span className="font-medium text-gray-800">
                                {paymentData.carId?.brand} {paymentData.carId?.model}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">Date</span>
                            <span className="font-medium text-gray-800">
                                {new Date(paymentData.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-gray-200">
                            <span className="text-gray-500 font-medium">Amount Paid</span>
                            <span className="text-xl font-bold text-green-600">
                                ₹ {new Intl.NumberFormat('en-IN').format(paymentData.amount / 100)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <button
                    onClick={handleClose}
                    className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;