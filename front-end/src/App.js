import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header";
import useUserRoutes from "./routes/userRoutes";
import useAdminRoutes from "./routes/adminRoutes";

function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <div className="container">
          <Routes>
            {userRoutes} {adminRoutes}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
