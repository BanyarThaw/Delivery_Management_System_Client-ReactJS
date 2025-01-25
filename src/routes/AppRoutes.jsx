import React from "react";
import { Route, Routes } from "react-router-dom";
import ShipmentsPage from "../pages/ShipmentsPage";
import ClientsPage from "../pages/ClientsPage";
import UsersPage from "../pages/UsersPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ShipmentsPage />} />
    <Route path="/shipments" element={<ShipmentsPage />} />
    <Route path="/clients" element={<ClientsPage />} />
    <Route path="/users" element={<UsersPage />} />
  </Routes>
);

export default AppRoutes;
