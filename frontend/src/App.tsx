import "./App.css";

<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast"
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
=======



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
("react-router-dom");
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./components/page/HomePage";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/product/ProductDetails";

>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c

function App() {
  return (
    <Router>
<<<<<<< HEAD


      <div className="App">
        <Toaster position="top-center" />
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
=======
      <div className="App">

        <Toaster position="top-center" />
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </div>

      <Footer />

>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
    </Router>
  );
}

export default App;
