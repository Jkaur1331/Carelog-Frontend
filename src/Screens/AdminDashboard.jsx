import React from "react";
import SidebarAdmin from "../Reuseable/SidebarAdmin";
import Header from "../Reuseable/Header";
import company from "../images/company.png";
import users from "../images/users.svg";
import filled from "../images/filled.svg";
import shift from "../images/shift.svg";
import companies from "../images/company.svg";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <SidebarAdmin current={"Dashboard"} />
      <div className="body-area">
        <Header />
        <div className="main-body">
          <section className="overview-section">
            <h2>Overview</h2>
            <div className="overview-cards">
              <div className="card card-total-participants">
                <div className="card-content">
                  <span className="card-title">Total Companies</span>
                  <span className="card-value">200</span>
                </div>
                <div className="card-icon-wrapper bg-blue-light">
                  <img src={companies} alt="" />
                </div>
              </div>
              <div className="card card-active-participants">
                <div className="card-content">
                  <span className="card-title">Total Admins</span>
                  <span className="card-value">12</span>
                </div>
                <div className="card-icon-wrapper bg-teal-light">
                  <img src={users} alt="" />
                </div>
              </div>
              <div className="card card-forms-filled">
                <div className="card-content">
                  <span className="card-title">Forms</span>
                  <span className="card-value">12</span>
                </div>
                <div className="card-icon-wrapper bg-orange-light">
                  <img src={filled} alt="" />
                </div>
              </div>
              <div className="card card-active-shifts">
                <div className="card-content">
                  <span className="card-title">New Signups</span>
                  <span className="card-value">12</span>
                </div>
                <div className="card-icon-wrapper bg-yellow-light">
                  <img src={shift} alt="" />
                </div>
              </div>
            </div>
          </section>
          <div className="flex space-bw">
            <div className="col-70 participants-section">
              <div className="participants-header">
                <h2>Recent Participants</h2>
              </div>
            </div>
            <div className="col-30">
              <div className="companies-widget">
                <div className="companies-header">
                  <h2>Companies</h2>
                </div>
                <ul className="companies-list">
                  <li className="company-item">
                    <div className="company-logo-container">
                      <img
                        src={company}
                        alt="Heelroot Services Logo"
                        className="company-logo"
                      />
                    </div>
                    <div className="company-info">
                      <div className="company-details-top">
                        <span className="company-name">Heelroot Services</span>
                        <span className="company-status active">Active</span>
                      </div>
                      <p className="company-forms">
                        Enabled Forms <span className="form-count">5</span>
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="companies-footer">
                  <p className="view-all-link">view all</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
