import React from "react";
import Sidebar from "./admin/sidebar";
import { Outlet } from "react-router-dom";
import Heaferadmin from "./admin/heafer";
import Footeradmin from "./admin/footer";
import "./style.css"


const AdminLayout = () => {
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
