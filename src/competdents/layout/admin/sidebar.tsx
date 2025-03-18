import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css"; // Nếu có CSS bổ sung

const Sidebar = () => {
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!isAccountMenuOpen);
  };

  return (
    <aside className="sidebar bg-gray-200 p-4"> {/* Sử dụng bg-gray-200 và không đặt text-white */}
      <h2 className="sidebar-title text-xl font-bold mb-4 text-gray-800 text-center">
        ADMIN
      </h2>
      <nav>
        <ul className="sidebar-menu space-y-4">
          <li>
            <Link to="/dashboard/list" className="block px-4 py-2 hover:bg-gray-300 rounded">
              Sản Phẩm
            </Link>
          </li>
          <li>
            <Link to="/dashboard/category/list" className="block px-4 py-2 hover:bg-gray-300 rounded">
              Danh Mục
            </Link>
          </li>
          <li className="relative">
            <a 
              onClick={toggleAccountMenu}
              className="w-full text-left px-4 py-2 rounded focus:outline-none text-gray-800"
            >
              Tài Khoản{" "}
              <span className="ml-2">{isAccountMenuOpen ? "▲" : "▼"}</span>
            </a>
            {isAccountMenuOpen && (
              <ul className="absolute left-full top-0 mt-1 w-48 bg-gray-300 rounded shadow-lg">
                <li>
                  <Link
                    to="/dashboard/admin"
                    className="block px-4 py-2 hover:bg-gray-400 rounded text-gray-800"
                  >
                    Quản lý Admin
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/customer"
                    className="block px-4 py-2 hover:bg-gray-400 rounded text-gray-800"
                  >
                    Quản lý Khách Hàng
                  </Link>
                </li>
              </ul>
              
            )}
            
            
          </li>
          <li>
            <Link to="/dashboard/list" className="block px-4 py-2 hover:bg-gray-300 rounded">
              ORDER
            </Link>
          </li>
          
          
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
