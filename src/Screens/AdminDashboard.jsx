import React from "react";
import SidebarAdmin from "../Reuseable/SidebarAdmin";
import Header from "../Reuseable/Header";
import company from "../images/company.png";

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
                  <i className="fa-solid fa-users icon-blue"></i>
                </div>
              </div>
              <div className="card card-active-participants">
                <div className="card-content">
                  <span className="card-title">Total Admins</span>
                  <span className="card-value">12</span>
                </div>
                <div className="card-icon-wrapper bg-teal-light">
                  <i className="fa-solid fa-user-check icon-teal"></i>
                </div>
              </div>
              <div className="card card-forms-filled">
                <div className="card-content">
                  <span className="card-title">Forms</span>
                  <span className="card-value">12</span>
                </div>
                <div className="card-icon-wrapper bg-orange-light">
                  <i className="fa-solid fa-pen-to-square icon-orange"></i>
                </div>
              </div>
              <div className="card card-active-shifts">
                <div className="card-content">
                  <span className="card-title">New Signups</span>
                  <span className="card-value">12</span>
                </div>
                <div className="card-icon-wrapper bg-yellow-light">
                  <i className="fa-solid fa-shield-halved icon-yellow"></i>
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
                  <button className="add-button" aria-label="Add Company">
                    <span>+</span>
                  </button>
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
                  <p className="view-all-link">View All</p>
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
