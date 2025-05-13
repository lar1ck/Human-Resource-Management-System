import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Staff } from "../../types/types";

const initialForm: Omit<Staff, "EmployeeID"> = {
    PostID: 1,
    FirstName: "",
    LastName: "",
    Gender: "Male",
    DOB: new Date(),
    Email: "",
    Phone: "",
    Address: "",
    DepID: 1,
};

const StaffManager: React.FC = () => {
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [formData, setFormData] = useState(initialForm);
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchStaff = async () => {
        try {
            const res = await axios.get("http://localhost:5656/api/staff");
            setStaffList(res.data.map((staff: Staff) => ({
                ...staff,
                DOB: new Date(staff.DOB) 
            })));
        } catch (err) {
            console.error("Failed to fetch staff:", err);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "DepID" || name === "PostID" ? Number(value) : value,
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = new Date(e.target.value);
        if (!isNaN(dateValue.getTime())) {
            setFormData(prev => ({ ...prev, DOB: dateValue }));
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:5656/api/staff/update/${editingId}`, formData);
            } else {
                await axios.post("http://localhost:5656/api/staff/create", formData);
            }
            setFormData(initialForm);
            setEditingId(null);
            fetchStaff();
        } catch (err) {
            console.error("Failed to submit staff:", err);
        }
    };

    const handleEdit = (staff: Staff) => {
        const { EmployeeID, ...rest } = staff;
        setEditingId(EmployeeID);
        setFormData({ ...rest });
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5656/api/staff/delete/${id}`);
            fetchStaff();
        } catch (err) {
            console.error("Failed to delete staff:", err);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData(initialForm);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <h2 className="text-2xl font-bold">
                {editingId ? "Edit Staff" : "Add Staff Member"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="FirstName" placeholder="First Name" value={formData.FirstName} onChange={handleChange} className="border p-2" required />
                <input name="LastName" placeholder="Last Name" value={formData.LastName} onChange={handleChange} className="border p-2" required />
                <select name="Gender" value={formData.Gender} onChange={handleChange} className="border p-2">
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <input
                    type="date"
                    name="DOB"
                    value={formData.DOB instanceof Date && !isNaN(formData.DOB.getTime()) 
                        ? formData.DOB.toISOString().split('T')[0] 
                        : ''}
                    onChange={handleDateChange}
                    className="border p-2"
                    required
                />
                <input name="Email" placeholder="Email" type="email" value={formData.Email} onChange={handleChange} className="border p-2" required />
                <input name="Phone" placeholder="Phone" value={formData.Phone} onChange={handleChange} className="border p-2" required />
                <input name="Address" placeholder="Address" value={formData.Address} onChange={handleChange} className="border p-2" required />
                <input name="PostID" placeholder="Post ID" type="number" value={formData.PostID} onChange={handleChange} className="border p-2" />
                <input name="DepID" placeholder="Department ID" type="number" value={formData.DepID} onChange={handleChange} className="border p-2" />

                <div className="col-span-full flex gap-2">
                    <button type="submit" className={`px-4 py-2 rounded text-white ${editingId ? "bg-green-600" : "bg-blue-600"}`}>
                        {editingId ? "Update" : "Add"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div>
                <h3 className="text-xl font-semibold">Staff List</h3>
                <table className="w-full border mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-2 py-1">Name</th>
                            <th className="border px-2 py-1">Gender</th>
                            <th className="border px-2 py-1">DOB</th>
                            <th className="border px-2 py-1">Email</th>
                            <th className="border px-2 py-1">Phone</th>
                            <th className="border px-2 py-1">Address</th>
                            <th className="border px-2 py-1">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffList.map((s) => (
                            <tr key={s.EmployeeID}>
                                <td className="border px-2 py-1">{s.FirstName} {s.LastName}</td>
                                <td className="border px-2 py-1">{s.Gender}</td>
                                <td className="border px-2 py-1">{s.DOB instanceof Date && !isNaN(s.DOB.getTime()) 
                                ? s.DOB.toISOString().split("T")[0] 
                                : 'Invalid Date'}</td>
                                <td className="border px-2 py-1">{s.Email}</td>
                                <td className="border px-2 py-1">{s.Phone}</td>
                                <td className="border px-2 py-1">{s.Address}</td>
                                <td className="border px-2 py-1 space-x-2">
                                    <button onClick={() => handleEdit(s)} className="text-blue-600 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(s.EmployeeID)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffManager;
