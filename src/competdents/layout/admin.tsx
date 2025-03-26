import React from "react";
import Sidebar from "./admin/sidebar";
import { Outlet, Navigate } from "react-router-dom";
import Heaferadmin from "./admin/heafer";
import Footeradmin from "./admin/footer";
import "./style.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🛑 Chặn người không có quyền admin
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-layout flex">
      <Heaferadmin />
      <div className="admin-container ">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
