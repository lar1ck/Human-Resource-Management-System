import React, { useState } from "react";
import axios from "axios";
import type { LoginData } from "../../../types/types";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<LoginData>({
    Username: "",
    Password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5656/api/users/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
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
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
