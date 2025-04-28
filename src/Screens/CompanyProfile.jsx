import React, { useState } from "react";
import SidebarAdmin from "../Reuseable/SidebarAdmin";
import Header from "../Reuseable/Header";
import company from "../images/company.png";

const CompanyProfile = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const closeDelete = () => setOpenDelete(false);
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="body-area">
        <Header />
        <div className="main-body">
          <div
            className="flex space-bw al-center"
            style={{ marginBottom: "15px" }}
          >
            <nav className="breadcrumb-container">
              <ol className="breadcrumb-list">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Companies</li>
                <li className="breadcrumb-item active">Carenova</li>
              </ol>
            </nav>
            <div className="patient-actions">
              <button>
                <i className="fas fa-edit"></i>
                Edit Details
              </button>
              <button className="delete" onClick={() => setOpenDelete(true)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <section className="patient-header">
            <div className="patient-details flex">
              <img src={company} alt="" />
              <div>
                <h1>
                  Carenova <span className="status-tag active">Active</span>
                </h1>
                <p className="phone-number">
                  <i className="fa-solid fa-envelope"></i> support@carenova.com
                </p>
              </div>
            </div>
            <div className="patient-actions">
              <span className="forms-monitored-badge">Forms Enabled 4</span>
            </div>
            {openDelete && (
              <div className="modal-overlay-pop">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title">Delete Company</h2>
                    <button
                      className="modal-close-button"
                      onClick={closeDelete}
                    >
                      ×
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Are you sure you want to delete{" "}
                      <span className="participant-name">Carenova</span>?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="modal-button cancel-button"
                      onClick={closeDelete}
                    >
                      Cancel
                    </button>
                    <button className="modal-button delete-button">
                      <i className="fas fa-trash-alt delete-icon"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
          <section className="flex space-bw" style={{ marginBottom: "15px" }}>
            <div class="subscription-card col-50">
              <div class="section-header">
                <span>Subscription Details</span>
                <span class="badge">Pro</span>
              </div>

              <div class="row">
                <div class="column">
                  <div class="label">Start Date</div>
                  <div class="value">24/04/2025</div>
                </div>
                <div class="column text-right">
                  <div class="label">End Date</div>
                  <div class="value">17/04/2025</div>
                </div>
              </div>

              <div class="section-header top-spacing">Contact Details</div>

              <div class="row">
                <div class="column">
                  <div class="label">Contact Person</div>
                  <div class="value">John Doe</div>
                </div>
                <div class="column text-right">
                  <div class="label">Phone Number</div>
                  <div class="value">+91 7233493022</div>
                </div>
              </div>
            </div>
            <div className="col-50 company-progress">
              <div class="card-company">
                <div class="card-header">
                  <div>
                    <h3>Participant Utilization Limit</h3>
                    <p class="card-description">
                      This organization is currently managing{" "}
                      <span class="highlight">18</span> out of 50 allowed
                      participants under their plan
                    </p>
                  </div>
                  <div class="progress-circle">
                    <svg width="48" height="48">
                      <circle class="bg" cx="24" cy="24" r="20" />
                      <circle class="progress" cx="24" cy="24" r="20" />
                    </svg>
                    <div class="progress-text">80%</div>
                  </div>
                </div>
              </div>

              <div class="card-company">
                <h3>Form Access Overview</h3>
                <p class="card-description">
                  This organization is currently using{" "}
                  <span class="highlight">3</span> out of the 5 forms allowed in
                  their subscription plan
                </p>
              </div>
            </div>
          </section>
          <section>
            <div class="forms-card">
              <h4>Forms</h4>
              <div class="forms-list">
                <span class="form-pill">
                  <i class="fas fa-check-circle"></i> Daily Task List
                </span>
                <span class="form-pill">
                  <i class="fas fa-toilet"></i> Bowel Chart
                </span>
                <span class="form-pill">
                  <i class="fas fa-notes-medical"></i> Blood Glucose Chart
                </span>
                <span class="form-pill">
                  <i class="fas fa-notes-medical"></i> Blood Glucose Chart
                </span>
                <span class="form-pill">
                  <i class="fas fa-notes-medical"></i> Blood Glucose Chart
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
