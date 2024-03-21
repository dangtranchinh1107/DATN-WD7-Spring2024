import "./App.css";
<<<<<<< HEAD
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

function App() {
=======
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";
import useUserRoutes from "../src//components/routes/userRoutes.jsx";
import useAdminRoutes from "../src//components/routes/adminRoutes.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import Profile from "./components/user/Profile.jsx";
import UpdateProfile from "./components/user/UpdateProfile.jsx";
import UploadAvatar from "./components/user/UploadAvatar.jsx";
import ForgotPassword from "./components/user/ForgotPassword.jsx";
import ResetPassword from "./components/user/ResetPassword.jsx";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";
import Invoice from "./components/invoice/Invoice";

function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <div className="container">
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/shipping"
              element={
                <protectedRoute>
                  <Shipping />
=======
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />

            <Route
              path="/me/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/update_profile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/upload_avatar"
              element={
                <ProtectedRoute>
                  <UploadAvatar />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/update_password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me/orders"
              element={
                <protectedRoute>
                  <MyOrders />
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
                </protectedRoute>
              }
            />
            <Route
<<<<<<< HEAD
              path="/confirm_order"
              element={
                <protectedRoute>
                  <ConfirmOrder />
=======
              path="/me/order/:id"
              element={
                <protectedRoute>
                  <OrderDetails />
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
                </protectedRoute>
              }
            />
            <Route
<<<<<<< HEAD
              path="/payment_method"
              element={
                <protectedRoute>
                  <PaymentMethod />
                </protectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
=======
              path="/invoice/order/:id"
              element={
                <protectedRoute>
                  <Invoice />
                </protectedRoute>
              }
            />
            {userRoutes}
            {adminRoutes}
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
