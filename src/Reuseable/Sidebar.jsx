import React from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const menuTab = [
  {
    name: "Dashboard",
    icon: "fa-solid fa-house fa-fw",
  },
  {
    name: "Participant Management",
    icon: "fa-solid fa-users fa-fw",
  },
  {
    name: "Forms",
    icon: "fa-regular fa-file-lines fa-fw",
  },
];
const menuTab1 = [
  {
    name: "Change Password",
    icon: "fa-solid fa-gear fa-fw",
  },
  {
    name: "Log Out",
    icon: "fa-solid fa-arrow-right-from-bracket fa-fw",
  },
];
const Sidebar = ({ current }) => {
  const navigate = useNavigate();
  const tabChangeHandler = (val) => {
    if (val === "Dashboard") {
      navigate("/");
    } else if (val === "Participant Management") {
      navigate("/participant");
    } else if (val === "Forms") {
      navigate("/adminform");
    } else if (val === "Change Password") {
      navigate("/");
    } else if (val === "Log Out") {
      navigate("/");
    }
  };
  return (
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
  );
};

export default Sidebar;
