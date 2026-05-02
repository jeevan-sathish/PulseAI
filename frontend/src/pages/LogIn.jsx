import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const LogIn = () => {
  const navigate = useNavigate();

  // Zustand store
  const setUser = useUserStore((state) => state.setUser);

  // local form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data.message === "Login successful") {
        // ✅ store user in zustand
        setUser({
          user_id: data.user_id,
          name: data.name,
          email: formData.email,
        });

        alert("Login successful");

        navigate("/prediction");
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server not reachable");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LogIn;
