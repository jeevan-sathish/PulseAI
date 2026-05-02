import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.user_id) {
        setUser(data);
        navigate("/prediction");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl w-full max-w-md text-white shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back ⚡</h2>

        <p className="text-center text-gray-300 mb-6 text-sm">
          Login to access PulseAI dashboard
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm text-gray-300">Email</label>
          <input
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-black/30 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-black/30 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER LINK */}
        <p className="text-center text-sm text-gray-300 mt-5">
          New user?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline font-medium"
          >
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
