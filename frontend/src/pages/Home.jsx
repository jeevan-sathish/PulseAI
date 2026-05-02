import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#312e81] text-white">
      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">⚡ PulseAI</h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
          AI-powered Heart Disease Prediction System using Machine Learning. Get
          instant risk analysis with clinical accuracy.
        </p>

        <div className="mt-8 flex gap-4">
          <Link to="/login">
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:scale-105 transition">
              Get Started
            </button>
          </Link>

          <Link to="/prediction">
            <button className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-black transition">
              Try Demo
            </button>
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-10 pb-20">
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
          <h3 className="text-xl font-bold mb-2">⚡ Instant Prediction</h3>
          <p className="text-gray-300">
            Get real-time ML-based results in seconds.
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
          <h3 className="text-xl font-bold mb-2">🧠 AI Model</h3>
          <p className="text-gray-300">
            Trained on real cardiovascular datasets.
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
          <h3 className="text-xl font-bold mb-2">📊 History Tracking</h3>
          <p className="text-gray-300">
            Store and analyze previous predictions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
