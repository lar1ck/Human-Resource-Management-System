import React, { useState } from "react";
import type { SignupData } from "../../../types/types";
import axios from "axios";


const SignupForm: React.FC = () => {
  const [form, setForm] = useState<SignupData>({
    Username: "",
    Password: "",
    EmployeeID: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5656/api/users/signup", form);
      setForm({
        Username: "",
        Password: "",
        EmployeeID: 0,
      })
      alert("Signup successful!");
    } catch (error) {
      alert("Signup failed");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto p-2">
      <input
        name="Username"
        type="text"
        value={form.Username}
        onChange={handleChange}
        placeholder="Username"
        className="border p-2 w-full"
        required
      />
      <input
        name="Password"
        type="password"
        value={form.Password}
        onChange={handleChange}
        placeholder="Password"
        className="border p-2 w-full"
        required
      />
      <input
        name="EmployeeID"
        type="number"
        value={form.EmployeeID}
        onChange={handleChange}
        placeholder="Employee ID"
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
