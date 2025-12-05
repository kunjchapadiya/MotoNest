import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";

const ManageUser = () => {

    const [users, setUsers] = useState([]);

    // EDIT POPUP STATE
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        role: ""
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/users");
                setUsers(response.data);
            } catch (error) {
                toast.error("Failed to load users");
            }
        };
        fetchUsers();
    }, []);

    // DELETE USER
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/users/deleteUser/${id}`);
            setUsers(users.filter((u) => u._id !== id));
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    // OPEN EDIT POPUP
    const openEditPopup = (user) => {
        setEditUserId(user._id);
        setEditForm({
            name: user.name,
            email: user.email,
            role: user.role
        });
        setShowEditPopup(true);
    };

    // HANDLE UPDATE
    const updateUser = async () => {
        try {
            await axios.put(
                `http://localhost:8080/api/admin/users/updateUser/${editUserId}`,
                editForm
            );

            // UPDATE UI
            setUsers((prev) =>
                prev.map((u) =>
                    u._id === editUserId ? { ...u, ...editForm } : u
                )
            );

            toast.success("User updated successfully");
            setShowEditPopup(false);

        } catch (error) {
            toast.error("Update failed");
        }
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="ml-0 md:ml-64 p-6 w-full bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-semibold text-gray-800">Manage Users</h1>

                <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden mt-6">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-3 text-left">Name</th>
                            <th className="border p-3 text-left">Email</th>
                            <th className="border p-3 text-left">Role</th>
                            <th className="border p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition">
                                <td className="border p-3">{user.name}</td>
                                <td className="border p-3">{user.email}</td>
                                <td className="border p-3 capital">{user.role}</td>

                                <td className="border p-3 flex gap-4 justify-center">
                                    <button
                                        onClick={() => openEditPopup(user)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Pencil size={20} />
                                    </button>

                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* ------------------- EDIT POPUP ------------------- */}
                {showEditPopup && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white w-96 p-6 rounded-xl shadow-lg">

                            <h2 className="text-xl font-semibold mb-4 text-center">Edit User</h2>

                            {/* Name */}
                            <div className="mb-4">
                                <label className="font-medium">Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md mt-1"
                                    value={editForm.name}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, name: e.target.value })
                                    }
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="font-medium">Email</label>
                                <input
                                    type="email"
                                    className="w-full p-2 border rounded-md mt-1"
                                    value={editForm.email}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, email: e.target.value })
                                    }
                                />
                            </div>

                            {/* Role */}
                            <div className="mb-4">
                                <label className="font-medium">Role</label>
                                <select
                                    className="w-full p-2 border rounded-md mt-1"
                                    value={editForm.role}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, role: e.target.value })
                                    }
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-5">
                                <button
                                    onClick={() => setShowEditPopup(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={updateUser}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ManageUser;
