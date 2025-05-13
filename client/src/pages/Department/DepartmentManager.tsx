import React, { useState, useEffect } from "react";
import axios from "axios";
import type { Department } from "../../types/types";

const DepartmentManager: React.FC = () => {
  const [depName, setDepName] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingDepName, setEditingDepName] = useState("");

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:5656/api/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5656/api/departments/create", {
        DepName: depName,
      });
      setDepName("");
      fetchDepartments();
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      alert('Are you sure you want to delete this department?');
      await axios.delete(`http://localhost:5656/api/departments/delete/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await axios.put(`http://localhost:5656/api/departments/update/${id}`, {
        DepName: editingDepName,
      });
      setEditingId(null);
      setEditingDepName("");
      fetchDepartments();
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold">Manage Departments</h2>

      {/* Create Form */}
      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          type="text"
          value={depName}
          onChange={(e) => setDepName(e.target.value)}
          placeholder="New Department Name"
          className="flex-1 border p-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      {/* List Departments */}
      <ul className="space-y-2">
        {departments.map((department) => (
          <li key={department.DepId} className="border p-3 flex justify-between items-center">
            {editingId === department.DepId ? (
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={editingDepName}
                  onChange={(e) => setEditingDepName(e.target.value)}
                  className="flex-1 border p-1"
                />
                <button
                  onClick={() => handleUpdate(department.DepId)}
                  className="bg-green-600 text-white px-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditingDepName("");
                  }}
                  className="bg-gray-500 text-white px-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span>{department.DepName}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(department.DepId);
                      setEditingDepName(department.DepName);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(department.DepId)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentManager;