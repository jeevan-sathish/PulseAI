import { Route, Routes } from "react-router-dom";
import Prediction from "./pages/Prediction";
import Nav from "./UI/Nav";
import Footer from "./UI/Footer";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prediction" element={<Prediction />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
