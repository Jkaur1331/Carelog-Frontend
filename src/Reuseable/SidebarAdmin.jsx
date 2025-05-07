import React, { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";

const menuTab = [
  {
    name: "Dashboard",
    icon: "fa-solid fa-house fa-fw",
  },
  {
    name: "Companies",
    icon: "fa-solid fa-users fa-fw",
  },
  {
    name: "Forms",
    icon: "fa-regular fa-file-lines fa-fw",
  },
];
const menuTab1 = [
  {
    name: "Log Out",
    icon: "fa-solid fa-arrow-right-from-bracket fa-fw",
  },
];

const SidebarAdmin = ({ current }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const handleLogout = () => {
    setIsLoading(true);
    localStorage.clear();
    setShowLogout(false);
    setTimeout(() => {
      setIsLoading(false);
      setShowLogout(false);
      if (!window.location.pathname.includes("login")) {
        window.location.reload();
      }
    }, 300);
  };

  const tabChangeHandler = (val) => {
    if (val === "Dashboard") {
      navigate("/admin");
    } else if (val === "Companies") {
      navigate("/companies");
    } else if (val === "Forms") {
      navigate("/forms");
    } else if (val === "Log Out") {
      setShowLogout(true);
    }
  };
  return (
    <>
      <Loader loading={isLoading} />
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="" />
        </div>
        <nav className="sidebar-nav">
          <div className="nav-wrapper">
            <ul className="top-nav">
              {menuTab.map((item) => (
                <li
                  className={`${current === item.name ? "active" : ""}`}
                  key={item.name}
                  onClick={() => tabChangeHandler(item.name)}
                >
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </li>
              ))}

              {/* <li>
              <i className="fa-solid fa-users fa-fw"></i>
              <span>Companies</span>
            </li>
            <li>
              <i className="fa-regular fa-file-lines fa-fw"></i>
              <span>Forms</span>
            </li> */}
            </ul>
            <ul className="bottom-nav">
              {menuTab1.map((item) => (
                <li
                  className={`${current === item.name ? "active" : ""}`}
                  key={item.name}
                  onClick={() => tabChangeHandler(item.name)}
                >
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      {showLogout && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-container">
            <div className="delete-modal-header">
              <h2 className="delete-modal-title">Logout</h2>
              <button
                className="delete-modal-close"
                onClick={() => setShowLogout(false)}
              >
                &times;
              </button>
            </div>
            <p className="delete-modal-message">
              Are you sure you want to Logout ?
            </p>
            <div className="delete-modal-actions">
              <button
                className="delete-modal-btn delete-modal-cancel"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>
              <button
                className="delete-modal-btn delete-modal-delete"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarAdmin;
