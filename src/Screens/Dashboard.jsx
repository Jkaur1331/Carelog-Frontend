import React from "react";
import Sidebar from "../Reuseable/Sidebar";
import Header from "../Reuseable/Header";

const Dashboard = () => {
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
                  <i class="fa-solid fa-users icon-blue"></i>
                </div>
              </div>
              <div class="card card-active-participants">
                <div class="card-content">
                  <span class="card-title">Active Participants</span>
                  <span class="card-value">12</span>
                </div>
                <div class="card-icon-wrapper bg-teal-light">
                  <i class="fa-solid fa-user-check icon-teal"></i>
                </div>
              </div>
              <div class="card card-forms-filled">
                <div class="card-content">
                  <span class="card-title">Forms Filled Yesterday</span>
                  <span class="card-value">12</span>
                </div>
                <div class="card-icon-wrapper bg-orange-light">
                  <i class="fa-solid fa-pen-to-square icon-orange"></i>
                </div>
              </div>
              <div class="card card-active-shifts">
                <div class="card-content">
                  <span class="card-title">Active Shifts</span>
                  <span class="card-value">12</span>
                </div>
                <div class="card-icon-wrapper bg-yellow-light">
                  <i class="fa-solid fa-shield-halved icon-yellow"></i>
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
                <button class="btn-filter">
                  <i class="fa-solid fa-sliders"></i>
                </button>
                <button class="btn-add-participant">
                  <i class="fa-solid fa-plus"></i> Add Participant
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
                    <td class="checkbox-col">
                      <input type="checkbox" />
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
                        <i class="fa-solid fa-download"></i>
                      </button>
                    </td>
                    <td class="icon-col actions-col">
                      <button class="btn-icon btn-more">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td class="checkbox-col">
                      <input type="checkbox" />
                    </td>
                    <td>
                      <span class="patient-name">Sarah Smith</span>
                      <span class="patient-id">P003</span>
                    </td>
                    <td>5678 Oak Avenue, SA</td>
                    <td>
                      <span class="status-badge status-active">Active</span>
                    </td>
                    <td>4</td>
                    <td>14/03/2025</td>
                    <td class="icon-col">
                      <button class="btn-icon btn-download">
                        <i class="fa-solid fa-download"></i>
                      </button>
                    </td>
                    <td class="icon-col actions-col">
                      <button class="btn-icon btn-more">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td class="checkbox-col">
                      <input type="checkbox" />
                    </td>
                    <td>
                      <span class="patient-name">Sarah Smith</span>
                      <span class="patient-id">P003</span>
                    </td>
                    <td>5678 Oak Avenue, SA</td>
                    <td>
                      <span class="status-badge status-active">Active</span>
                    </td>
                    <td>4</td>
                    <td>14/03/2025</td>
                    <td class="icon-col">
                      <button class="btn-icon btn-download">
                        <i class="fa-solid fa-download"></i>
                      </button>
                    </td>
                    <td class="icon-col actions-col">
                      <button class="btn-icon btn-more">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td class="checkbox-col">
                      <input type="checkbox" />
                    </td>
                    <td>
                      <span class="patient-name">Sarah Smith</span>
                      <span class="patient-id">P003</span>
                    </td>
                    <td>5678 Oak Avenue, SA</td>
                    <td>
                      <span class="status-badge status-active">Active</span>
                    </td>
                    <td>4</td>
                    <td>14/03/2025</td>
                    <td class="icon-col">
                      <button class="btn-icon btn-download">
                        <i class="fa-solid fa-download"></i>
                      </button>
                    </td>
                    <td class="icon-col actions-col">
                      <button class="btn-icon btn-more">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td class="checkbox-col">
                      <input type="checkbox" />
                    </td>
                    <td>
                      <span class="patient-name">Sarah Smith</span>
                      <span class="patient-id">P003</span>
                    </td>
                    <td>5678 Oak Avenue, SA</td>
                    <td>
                      <span class="status-badge status-inactive">Inactive</span>
                    </td>
                    <td>4</td>
                    <td>14/03/2025</td>
                    <td class="icon-col">
                      <button class="btn-icon btn-download">
                        <i class="fa-solid fa-download"></i>
                      </button>
                    </td>
                    <td class="icon-col actions-col">
                      <button class="btn-icon btn-more">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td class="checkbox-col">
                      <input type="checkbox" />
                    </td>
                    <td>
                      <span class="patient-name">Sarah Smith</span>
                      <span class="patient-id">P003</span>
                    </td>
                    <td>5678 Oak Avenue, SA</td>
                    <td>
                      <span class="status-badge status-inactive">Inactive</span>
                    </td>
                    <td>4</td>
                    <td>14/03/2025</td>
                    <td class="icon-col">
                      <button class="btn-icon btn-download">
                        <i class="fa-solid fa-download"></i>
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
      </div>
    </div>
  );
};

export default Dashboard;
