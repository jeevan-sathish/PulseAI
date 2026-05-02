import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [isRegistered, setIsRegistered] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.message === "User registered") {
        setIsRegistered(true);
        navigate("/login");
      } else {
        setIsRegistered(false);
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server not reachable");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
