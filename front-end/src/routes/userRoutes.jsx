import React from "react";
import { Route } from "react-router-dom";

import HomePage from "../components/page/HomePage";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ProductDetails from "../components/product/ProductDetails";
import Cart from "../components/cart/Cart";
import Shipping from "../components/cart/Shipping";
import ConfirmOrder from "../components/cart/ConfirmOrder";
import PaymentMethod from "../components/cart/PaymentMethod";

const userRoutes = () => {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/confirm_order" element={<ConfirmOrder />} />
      <Route path="/payment_method" element={<PaymentMethod />} />
    </>
  );
};

export default userRoutes;
