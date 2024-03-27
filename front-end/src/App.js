import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header";
import useUserRoutes from "./routes/userRoutes";
import useAdminRoutes from "./routes/adminRoutes";
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";
import Invoice from "./components/invoice/Invoice";

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
