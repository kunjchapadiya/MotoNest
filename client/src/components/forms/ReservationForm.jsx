import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ReservationForm = ({ setOpen }) => {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:8080/api/enquiry", data);

            if (res.status === 200) {
                toast.success("Reservation Successful");
                setOpen(false); // Close popup after success
                navigate("/");
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

            <div className="bg-white p-8 rounded-lg w-[90%] max-w-md shadow-xl relative">

                {/* Close Button */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center">Reserve Car</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                    <div>
                        <label>Name</label>
                        <input
                            {...register("name", { required: true })}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    <div>
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            {...register("phoneNo", { required: true })}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    <div>
                        <label>Message</label>
                        <textarea
                            {...register("enquiryMessage", { required: true })}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-black text-white py-2 rounded hover:bg-gray-800"
                    >
                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ReservationForm;
