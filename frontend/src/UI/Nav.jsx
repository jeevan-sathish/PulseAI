import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg transition-all duration-300 ${
      location.pathname === path
        ? "bg-white text-black font-semibold"
        : "hover:bg-white/20"
    }`;

  return (
    <div className="w-full h-[10vh] bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg flex items-center justify-between px-8 text-white">
      {/* BRAND */}
      <div className="text-2xl font-bold tracking-wide">⚡ PulseAI</div>

      {/* LINKS */}
      <div className="flex gap-6 text-lg items-center">
        <Link to="/" className={linkStyle("/")}>
          Home
        </Link>

        <Link to="/prediction" className={linkStyle("/prediction")}>
          Prediction
        </Link>
      </div>
    </div>
  );
};

export default Nav;
