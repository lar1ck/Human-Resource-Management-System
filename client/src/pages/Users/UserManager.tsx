import { useEffect, useState } from "react";
import axios from "axios";
import type { User, Staff } from "../../types/types";

const initialForm: Omit<User, "UserID"> = {
  EmployeeID: 0,
  Username: "",
  Password: "",
};

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [employees, setEmployees] = useState<Staff[]>([]);
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchEmployees();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5656/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5656/api/staff");
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "EmployeeID" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId !== null) {
        await axios.put(`http://localhost:5656/api/users/update/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5656/api/users/signup", formData);
      }
      setFormData(initialForm);
      setEditId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user: User) => {
    setFormData({
      EmployeeID: user.EmployeeID,
      Username: user.Username,
      Password: "",
    });
    setEditId(user.UserID);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5656/api/users/delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const getEmployeeName = (id: number) =>
    employees.find((emp) => emp.EmployeeID === id)?.FirstName || "Unknown";

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{editId ? "Edit User" : "Add User"}</h1>
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
        <select
          name="EmployeeID"
          value={formData.EmployeeID}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.EmployeeID} value={emp.EmployeeID}>
              {emp.FirstName}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="Username"
          value={formData.Username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update User" : "Add User"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setFormData(initialForm);
              setEditId(null);
            }}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-2">User List</h2>
      <table className="w-full bg-white rounded shadow text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2">Employee</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.UserID} className="border-t">
              <td className="px-4 py-2">{getEmployeeName(user.EmployeeID)}</td>
              <td className="px-4 py-2">{user.Username}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.UserID)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
