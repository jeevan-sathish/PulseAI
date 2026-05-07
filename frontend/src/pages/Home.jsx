import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBolt,
  FaBrain,
  FaChartLine,
  FaHeartbeat,
  FaShieldAlt,
  FaCircle,
} from "react-icons/fa";

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 2;
      setCount(i);
      if (i >= 98) clearInterval(t);
    }, 30);

    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 font-semibold">
          <FaHeartbeat className="text-red-400" />
          PulseAI
        </div>

        <div className="flex items-center gap-2 text-xs text-green-400">
          <FaCircle className="text-[8px]" />
          system running
        </div>
      </div>

      {/* HERO */}
      <div className="max-w-5xl mx-auto px-6 pt-20 text-center">
        <div className="inline-flex items-center gap-2 text-xs px-3 py-1 border border-white/10 rounded-full text-gray-300">
          <FaShieldAlt />
          Heart Disease Prediction System
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
          Simple heart risk prediction using
          <span className="text-blue-400"> machine learning</span>
        </h1>

        <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
          Enter basic medical details and get a quick risk estimate. The system
          is trained on cardiovascular data to assist analysis, not replace
          medical advice.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link to="/login">
            <button className="px-5 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition">
              Get Started
            </button>
          </Link>

          <Link to="/prediction">
            <button className="px-5 py-2 border border-white/20 rounded-lg hover:border-blue-400">
              Try Prediction
            </button>
          </Link>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mt-14 max-w-2xl mx-auto">
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <p className="text-xl font-semibold text-blue-400">{count}%</p>
            <p className="text-xs text-gray-400">Accuracy</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <p className="text-xl font-semibold text-green-400">Fast</p>
            <p className="text-xs text-gray-400">Response</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <p className="text-xl font-semibold text-purple-400">AI</p>
            <p className="text-xs text-gray-400">Powered</p>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-lg font-medium text-gray-300 mb-8">
          What this system does
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          <Card
            icon={<FaBolt />}
            title="Quick prediction"
            desc="Returns risk result in seconds."
          />

          <Card
            icon={<FaBrain />}
            title="ML based"
            desc="Trained on real heart disease dataset."
          />

          <Card
            icon={<FaChartLine />}
            title="History tracking"
            desc="Stores previous predictions per user."
          />

          <Card
            icon={<FaShieldAlt />}
            title="User based data"
            desc="Each user has isolated history."
          />

          <Card
            icon={<FaHeartbeat />}
            title="Medical focus"
            desc="Designed for analysis support."
          />

          <Card
            icon={<FaBrain />}
            title="Simple UI"
            desc="Easy form-based input system."
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-gray-500">
        PulseAI • Heart Risk Prediction Tool
      </div>
    </div>
  );
};

const Card = ({ icon, title, desc }) => (
  <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
    <div className="text-blue-400 text-lg">{icon}</div>
    <h3 className="mt-3 font-medium">{title}</h3>
    <p className="text-sm text-gray-400 mt-1">{desc}</p>
  </div>
);

export default Home;
