import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-950 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-3">⚡ PulseAI</h2>
          <p className="text-gray-400 text-sm">
            AI-powered Heart Disease Prediction System built using Machine
            Learning and FastAPI.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Built by <span className="text-white font-semibold">Jeevan</span>
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>

          <p className="text-gray-400 text-sm">📞 7892652247</p>

          <p className="text-gray-400 text-sm mt-2">
            📧 jeevansathish2004@gmail.com
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>

          <div className="flex flex-col gap-2 text-sm">
            <Link
              to="/register"
              className="text-gray-400 hover:text-white transition"
            >
              Register
            </Link>

            <Link
              to="/login"
              className="text-gray-400 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/prediction"
              className="text-gray-400 hover:text-white transition"
            >
              Prediction
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM LINE */}
      <div className="text-center text-gray-600 text-sm mt-10 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} PulseAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
