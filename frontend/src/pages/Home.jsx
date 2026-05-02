import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <button>
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
};

export default Home;
