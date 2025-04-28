import React, { useState } from "react";
import Sidebar from "../Reuseable/Sidebar";
import Header from "../Reuseable/Header";
import total from "../images/total.svg";
import active from "../images/active.svg";
import filled from "../images/filled.svg";
import shift from "../images/shift.svg";
import filter from "../images/filter.svg";
import download from "../images/download.svg";

const Dashboard = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const openFilter = () => {
    setShowFilterModal(true);
    setTimeout(() => {
      setIsFilterOpen(true);
    }, 10);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
    setTimeout(() => {
      setShowFilterModal(false);
    }, 300);
  };

  return (
    <div className="flex">
      <Sidebar current={"Dashboard"} />
      <div className="body-area">
        <Header />
        <div className="main-body">
          <section class="overview-section">
            <h2>Overview</h2>
            <div class="overview-cards">
              <div class="card card-total-participants">
                <div class="card-content">
                  <span class="card-title">Total Participants</span>
                  <span class="card-value">200</span>
                </div>
                <div class="card-icon-wrapper bg-blue-light">
                  <img src={total} alt="" />
                </div>
              </div>
              <div class="card card-active-participants">
                <div class="card-content">
                  <span class="card-title">Active Participants</span>
                  <span class="card-value">12</span>
                </div>
                <div class="card-icon-wrapper bg-teal-light">
                  <img src={active} alt="" />
                </div>
              </div>
              <div class="card card-forms-filled">
                <div class="card-content">
                  <span class="card-title">Forms Filled Yesterday</span>
                  <span class="card-value">12</span>
                </div>
                <div class="card-icon-wrapper bg-orange-light">
                  <img src={filled} alt="" />
                </div>
              </div>
              <div class="card card-active-shifts">
                <div class="card-content">
                  <span class="card-title">Active Shifts</span>
                  <span class="card-value">12</span>
                </div>
                <div class="card-icon-wrapper bg-yellow-light">
                  <img src={shift} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section class="participants-section">
            <div class="participants-header">
              <h2>Recent Participants</h2>
              <div class="participants-controls">
                <div class="search-bar">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <input type="text" placeholder="Search" />
                </div>
                <button
                  className="btn-filter"
                  onClick={openFilter}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <img src={filter} alt="" />
                </button>
              </div>
            </div>
            <div class="participants-table-wrapper">
              <table class="participants-table">
                <thead>
                  <tr>
                    <th class="checkbox-col">
                      <input type="checkbox" class="header-checkbox" />
                    </th>
                    <th>Patient Name</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Number Of Forms</th>
                    <th>Added On</th>
                    <th class="icon-col">QR Code</th>
                    <th class="icon-col actions-col">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="checkbox-col">
                      <span className="row-number">1</span>
                      <input type="checkbox" className="row-checkbox" />
                    </td>
                    <td>
                      <span class="patient-name">John Doe</span>
                      <span class="patient-id">P001</span>
                    </td>
                    <td>1234 Elm Street, SA</td>
                    <td>
                      <span class="status-badge status-active">Active</span>
                    </td>
                    <td>3</td>
                    <td>12/03/2025</td>
                    <td class="icon-col">
                      <button class="btn-icon btn-download">
                        <img src={download} alt="" />
                      </button>
                    </td>
                    <td class="icon-col actions-col">
                      <button class="btn-icon btn-more">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        {showFilterModal && (
          <div className={`modal-overlay ${isFilterOpen ? "visible" : ""}`}>
            <div
              className={`modal-panel ${
                isFilterOpen ? "slide-in" : "slide-out"
              }`}
            >
              <div className="modal-header">
                <h2>Filter By</h2>
                <button
                  className="close-button"
                  id="closeModalBtn"
                  aria-label="Close modal"
                  onClick={closeFilter}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div class="form-group">
                    <label class="group-label">Participant Status</label>
                    <div class="checkbox-group">
                      <div class="checkbox-item">
                        <input
                          type="checkbox"
                          id="status-active"
                          name="status-active"
                        />
                        <label for="status-active">Active</label>
                      </div>
                      <div class="checkbox-item">
                        <input
                          type="checkbox"
                          id="status-inactive"
                          name="status-inactive"
                          checked
                        />
                        <label for="status-inactive">Inactive</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="group-label">Forms</label>
                    <div class="multi-select-input">
                      <div class="pills-container">
                        <span class="pill">
                          Hygiene <span class="close-icon">×</span>
                        </span>
                        <span class="pill">
                          Bowel Movement <span class="close-icon">×</span>
                        </span>
                      </div>
                      <span class="dropdown-arrow">▾</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="group-label">Addition Date</label>
                    <div class="date-input-container">
                      <input type="date" />
                      <span class="calendar-icon"></span>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  id="cancelModalBtn"
                  onClick={closeFilter}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="participantForm"
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
