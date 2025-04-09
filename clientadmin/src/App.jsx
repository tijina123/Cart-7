import { useState } from "react";
// import "./App.css";
import Login from "./pages/register-login/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register-login/Register";
// import UserProtectedRoute from "./components/protected-route/UserProtectedRoute";
import AdminProtectedRoute from "./components/protected-route/AdminProtectedRoute";
// import Home from "./pages/user/Home";
// import Product from "./pages/user/Product";
// import Dashboard from "./pages/admin/Dashboard";
// import ProductTable from "./pages/admin/ProductTable";
import AddProduct from "./pages/admin/AddProduct";
// import NewAddProduct from "./pages/admin/NewAddProduct";
import DisplayProductTable from "./pages/admin/DisplayProductTable";
import CategoryTable from "./pages/admin/CategoryTable";

import Coupons from "./pages/admin/Coupons";
import Dashboard from "./pages/admin/Dashboard";
import Offers from "./pages/admin/Offer";
import User from "./pages/admin/User";
import Orders from "./pages/admin/Orders";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import LoginProtectedRoute from "./components/protected-route/LoginProtectedRoute";

function App() {


  return (
    <>
      <Routes>
        
      <Route element={<LoginProtectedRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/" element={<ProductTable />} /> */}
          <Route path="/add-product" element={<AddProduct />} />
          {/* <Route path="/" element={<NewAddProduct />} /> */}
          <Route path="/" element={<DisplayProductTable />} />
          <Route path="/category" element={<CategoryTable />} />
          <Route path="/Coupons" element={<Coupons />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/user" element={<User />} />
          <Route path="/product-table" element={<DisplayProductTable />} />
          <Route path="/order-admin" element={<Orders />} />
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
