import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {

    // const navigate = useNavigate();
    const [message, setMessage] = useState([]);

    useEffect(() => {
        const fetchQuery = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/contact/", {
                    headers: {
                        withCredentials: true,
                    },
                });
                setMessage(response.data);
            } catch (error) {
                toast.error("Failed to load users");
            }
        };
        fetchQuery();
    }, []);

    return (
        <div className="flex">
            <Sidebar />

            <div className="ml-0 md:ml-64 p-6 w-full bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-semibold text-gray-800 font-montserrat">Recieve Message </h1>

                <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden mt-6">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-3 text-left">Date</th>
                            <th className="border p-3 text-left">Name</th>
                            <th className="border p-3 text-left">Email</th>
                            <th className="border p-3 text-left">Subject</th>
                            <th className="border p-3 text-center">Message</th>
                        </tr>
                    </thead>

                    <tbody>
                        {message.map((message) => (
                            <tr key={message._id} className="hover:bg-gray-50 transition">
                                <td className="border p-3">{new Date(message.date).toLocaleDateString()}</td>
                                <td className="border p-3">{message.name}</td>
                                <td className="border p-3 capital">{message.email}</td>
                                <td className="border p-3 capital">{message.subject}</td>
                                <td className="border p-3 capital">{message.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>
        </div>
    );
};

export default ManageUser;
