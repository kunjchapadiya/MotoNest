import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {

    const navigate = useNavigate();
    const [query, setQuery] = useState([]);

    useEffect(() => {
        const fetchQuery = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/enquiry");
                setQuery(response.data);
            } catch (error) {
                toast.error("Failed to load users");
            }
        };
        fetchQuery();
    }, []);


    const handleStatusChange = async (e, id) => {
        try {
            await axios.post(`http://localhost:8080/api/enquiry/${id}`,
                { enquiryStatus: e.target.value },
                { withCredentials: true }
            );
            toast.success("Status updated successfully");
            navigate("/admin/managequery");
        } catch (error) {
            toast.error("Failed to update status");
        }
    };
    return (
        <div className="flex">
            <Sidebar />

            <div className="ml-0 md:ml-64 p-6 w-full bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-semibold text-gray-800 font-montserrat">Manage Query</h1>

                <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden mt-6">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-3 text-left">Date</th>
                            <th className="border p-3 text-left">Name</th>
                            <th className="border p-3 text-left">Email</th>
                            <th className="border p-3 text-left">Phone No</th>
                            <th className="border p-3 text-center">Enquiry Message</th>
                            <th className="border p-3 text-center">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {query.map((enquiry) => (
                            <tr key={enquiry._id} className="hover:bg-gray-50 transition">
                                <td className="border p-3">{new Date(enquiry.enquiryDate).toLocaleDateString()}</td>
                                <td className="border p-3">{enquiry.name}</td>
                                <td className="border p-3 capital">{enquiry.email}</td>
                                <td className="border p-3 capital">{enquiry.phoneNo}</td>
                                <td className="border p-3 capital">{enquiry.enquiryMessage}</td>
                                <td className="border p-3 capital"><select name="status" id="" value={enquiry.enquiryStatus} onChange={(e) => handleStatusChange(e, enquiry._id)}>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select></td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>
        </div>
    );
};

export default ManageUser;
