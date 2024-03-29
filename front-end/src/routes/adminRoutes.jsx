import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ListUsers from "../components/admin/ListUsers";
import UpdateUser from "../components/admin/UpdateUser";
import ListOrders from "../components/admin/ListOrders";
import ProcessOrder from "../components/admin/ProcessOrder";
const adminRoutes = () => {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute admin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute admin={true}>
            <ListUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute admin={true}>
            <ListOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders/:id"
        element={
          <ProtectedRoute admin={true}>
            <ProcessOrder />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default adminRoutes;
