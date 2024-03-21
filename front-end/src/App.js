import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./components/page/HomePage";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import PaymentMethod from "./components/cart/PaymentMethod";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";
import Invoice from "./components/invoice/Invoice";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/shipping"
              element={
                <protectedRoute>
                  <Shipping />
                </protectedRoute>
              }
            />
            <Route
              path="/confirm_order"
              element={
                <protectedRoute>
                  <ConfirmOrder />
                </protectedRoute>
              }
            />
            <Route
              path="/payment_method"
              element={
                <protectedRoute>
                  <PaymentMethod />
                </protectedRoute>
              }
            />
            <Route
              path="/me/orders"
              element={
                <protectedRoute>
                  <MyOrders />
                </protectedRoute>
              }
            />
            <Route
              path="/me/order/:id"
              element={
                <protectedRoute>
                  <OrderDetails />
                </protectedRoute>
              }
            />
            <Route
              path="/invoice/order/:id"
              element={
                <protectedRoute>
                  <Invoice />
                </protectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
