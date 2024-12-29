import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Authenticated Routes */}
      <Route
        path="/"
        element={
          <AuthLayout type="authenticated">
            <AddProduct />
          </AuthLayout>
        }
      />

      {/* Unauthenticated Routes */}
      <Route
        path="/register"
        element={
          <AuthLayout type="unauthenticated">
            <Register />
          </AuthLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AuthLayout type="unauthenticated">
            <Login />
          </AuthLayout>
        }
      />
    </Routes>
  );
};

export default App;
