import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ManufacturerDashboardLayout from "../pages/Dashboard/ManufacturerDashboard";
import VendorDashboardLayout from "../pages/Dashboard/VendorDashboard";
import CustomerDashboardLayout from "../pages/Dashboard/CustomerDashboard";
import ManufacturerProfile from "../pages/Profile/ManufacturerProfile";
import VendorProfile from "../pages/Profile/VendorProfile";
import CustomerProfile from "../pages/Profile/CustomerProfile";
import Home from "../pages/Home/Home";
import ManufacturerOverview from "../pages/Overview/ManufacturerOverview";
import VendorOverview from "../pages/Overview/VendorOverview";
import CustomerOverview from "../pages/Overview/CustomerOverview";
import ManufacturerProducts from "../pages/Dashboard/ManufacturerProducts";
import VendorProducts from "../pages/Dashboard/VendorProducts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/manufacturer" element={<ManufacturerDashboardLayout />}>
        <Route index element={<ManufacturerOverview />} />
        <Route path="product-catalog" element={<ManufacturerProducts />} />
        <Route path="profile" element={<ManufacturerProfile />} />
      </Route>

      <Route path="/vendor" element={<VendorDashboardLayout />}>
        <Route index element={<VendorOverview />} />
        <Route path="product-catalog" element={<VendorProducts />} />
        <Route path="profile" element={<VendorProfile />} />
      </Route>

      <Route path="/customer" element={<CustomerDashboardLayout />}>
        <Route index element={<CustomerOverview />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
