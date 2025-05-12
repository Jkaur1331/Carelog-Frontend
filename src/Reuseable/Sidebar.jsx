import React, { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { changePasswordPatient } from "../store/Services/AllApi/index.tsx";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "./Loader.jsx";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleOldPassword = () => setShowOldPassword((prev) => !prev);
  const toggleNewPassword = () => setShowNewPassword((prev) => !prev);

  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [showChange, setShowChange] = useState(false);
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

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .required("Old password is required")
      .min(6, "Minimum 6 characters"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Minimum 6 characters")
      .notOneOf([Yup.ref("oldPassword")], "New password must be different"),
  });

  const changePassword = async (values) => {
    setIsLoading(true);
    try {
      await changePasswordPatient({
        body: {
          id: localStorage.getItem("userId"),
          currentPassword: values.oldPassword,
          updatedPassword: values.newPassword,
        },
      });
      toast.success("Password Changed Sucessfully");
      setShowChange(false);
    } catch (error) {
      toast.error("Error in changing Password");
    } finally {
      setIsLoading(false);
    }
  };

  const tabChangeHandler = (val) => {
    if (val === "Dashboard") {
      navigate("/");
    } else if (val === "Participant Management") {
      navigate("/participant");
    } else if (val === "Forms") {
      navigate("/adminform");
    } else if (val === "Change Password") {
      setShowChange(true);
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
      {showChange && (
        <div className="login-overlay">
          <div className="loginModal">
            <div className="text-center">
              <h1>Reset Password</h1>
              <p className="subtitle">
                Create a new password to regain access to your account
              </p>
            </div>
            <Formik
              initialValues={{ oldPassword: "", newPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={changePassword}
            >
              {() => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="old-password">Old Password</label>
                    <div className="password-wrapper">
                      <Field
                        type={showOldPassword ? "text" : "password"}
                        id="old-password"
                        name="oldPassword"
                      />
                      <i
                        className={`fa-solid ${
                          showOldPassword ? "fa-eye" : "fa-eye-slash"
                        } password-icon`}
                        onClick={toggleOldPassword}
                        style={{ color: "#03989e", cursor: "pointer" }}
                      ></i>
                    </div>
                    <ErrorMessage
                      name="oldPassword"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="new-password">New Password</label>
                    <div className="password-wrapper">
                      <Field
                        type={showNewPassword ? "text" : "password"}
                        id="new-password"
                        name="newPassword"
                      />
                      <i
                        className={`fa-solid ${
                          showNewPassword ? "fa-eye" : "fa-eye-slash"
                        } password-icon`}
                        onClick={toggleNewPassword}
                        style={{ color: "#03989e", cursor: "pointer" }}
                      ></i>
                    </div>
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="error"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Save Password
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
