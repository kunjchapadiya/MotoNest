import React, { useState, useEffect } from "react";

const EMICalculator = ({ price }) => {
    const [downPayment, setDownPayment] = useState(0);
    const [rate, setRate] = useState(10);
    const [months, setMonths] = useState(60);

    useEffect(() => {
        if (price) {
            setDownPayment(price * 0.2); // Default 20% down payment
        }
    }, [price]);

    const calculateEMI = () => {
        if (!price) return 0;
        const loanAmount = price - downPayment;
        const r = rate / 12 / 100;
        if (r === 0) return loanAmount / months;
        const emi = loanAmount * r * (Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1));
        return Math.round(emi);
    };

    return (
        <div className="w-full max-w-lg text-white font-sans">
            <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-light mb-1">Get Your Ride</h2>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Financed Today!</h2>
                <p className="text-gray-400 text-sm">Easy and hassle free EMI options available.</p>
            </div>

            {/* EMI Display Box */}
            <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-4 mb-10 text-center w-fit">
                <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">EMI Starts @</p>
                <p className="text-2xl font-bold text-white">
                    ₹ {calculateEMI().toLocaleString("en-IN")}/- <span className="text-sm font-normal text-gray-400">Per Month</span>
                </p>
            </div>

            {/* Down Payment Slider */}
            <div className="mb-8">
                <div className="flex justify-between text-sm mb-4 font-medium">
                    <span className="text-gray-300">Down Payment</span>
                    <span className="text-white">₹ {downPayment.toLocaleString("en-IN")}</span>
                </div>
                <input
                    type="range"
                    min={price * 0.1}
                    max={price * 0.8}
                    step={price * 0.05}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-[2px] bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-2 px-1 font-medium">
                    <span>10%</span>
                    <span>20%</span>
                    <span>30%</span>
                    <span>40%</span>
                    <span>50%</span>
                    <span>60%</span>
                    <span>70%</span>
                    <span>80%</span>
                </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="mb-8">
                <div className="flex justify-between text-sm mb-4 font-medium">
                    <span className="text-gray-300">Annual Interest Rate (%)</span>
                    <span className="text-white">{rate}</span>
                </div>
                <input
                    type="range"
                    min={5}
                    max={20}
                    step={0.5}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-[2px] bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
            </div>

            {/* Term Slider */}
            <div className="mb-12">
                <div className="flex justify-between text-sm mb-4 font-medium">
                    <span className="text-gray-300">Term/Period (Month)</span>
                    <span className="text-white">{months}</span>
                </div>
                <input
                    type="range"
                    min={12}
                    max={84}
                    step={6}
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full h-[2px] bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
            </div>

            {/* Button */}
            <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition text-sm">
                Get More Details
            </button>
        </div>
    );
};

export default EMICalculator;
