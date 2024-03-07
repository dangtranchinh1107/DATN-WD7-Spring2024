import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
("react-router-dom");
import { Toaster } from "react-hot-toast";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import HomePage from "./components/page/HomePage";
import Header from "./components/layout/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
