import { Route, Routes } from "react-router-dom";
import Prediction from "./pages/Prediction";
import Nav from "./UI/Nav";
import Footer from "./UI/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";

const App = () => {
  return (
    <div>
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
