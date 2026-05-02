import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="w-full h-[10vh] bg-blue-400 flex items-center justify-around text-white text-xl">
      <Link to="/">Home</Link>
      <Link to="/prediction">Prediction</Link>
    </div>
  );
};

export default Nav;
