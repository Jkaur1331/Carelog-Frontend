import React, { useState } from "react";
import Sidebar from "../Reuseable/Sidebar";
import Header from "../Reuseable/Header";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const closeDelete = () => setOpenDelete(false);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="body-area">
        <Header />
        <div className="main-body">
          <nav
            className="breadcrumb-container"
            style={{
              marginBottom: "10px",
            }}
          >
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Participant Management</li>
              <li className="breadcrumb-item active">John Doe</li>
            </ol>
          </nav>
          <section className="patient-header">
            <div className="patient-details">
              <h1>
                John Doe <span className="status-tag active">Active</span>
              </h1>
              <p className="phone-number">
                <i className="fa-solid fa-phone"></i> +91 7243788262
              </p>
            </div>
            <div className="patient-actions">
              <span className="forms-monitored-badge">Forms Monitored 4</span>
              <button>
                <i className="fas fa-edit"></i>
                Edit Details
              </button>
              <button className="delete" onClick={() => setOpenDelete(true)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
            {openDelete && (
              <div className="modal-overlay-pop">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title">Delete Participant</h2>
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
                      <span className="participant-name">John Doe</span>?
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
          <div className="content-tabs">
            <button
              className={`tab-button ${activeTab === 0 ? "active" : ""}`}
              onClick={() => handleTabClick(0)}
            >
              All
            </button>
            <button
              className={`tab-button ${activeTab === 1 ? "active" : ""}`}
              onClick={() => handleTabClick(1)}
            >
              Bowel Movement
            </button>
            <button
              className={`tab-button ${activeTab === 2 ? "active" : ""}`}
              onClick={() => handleTabClick(2)}
            >
              Hygiene Chart
            </button>
            <button
              className={`tab-button ${activeTab === 3 ? "active" : ""}`}
              onClick={() => handleTabClick(3)}
            >
              Daily Task List
            </button>
          </div>
          <section className="table-container">
            {activeTab === 0 && (
              <table>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" className="header-checkbox" />
                    </th>
                    <th>Form Name</th>
                    <th>Date</th>
                    <th>Monitored By</th>
                    <th>
                      <button className="btn-icon-header">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      Hygiene{" "}
                      <span className="tag tag-orange">Most Recent</span>
                    </td>
                    <td>Monday, 12/3/2025</td>
                    <td className="monitored-by">
                      <span className="person-tag">
                        <i className="fas fa-user"></i> John Doe
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Emily Taylor
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Sam Smith
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon-row">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Hygiene</td>
                    <td>Tuesday, 13/3/2025</td>
                    <td className="monitored-by">
                      <span className="person-tag">
                        <i className="fas fa-user"></i> John Doe
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Emily Taylor
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Sam Smith
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon-row">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </td>
                  </tr>
                  <tr className="shift-row">
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Hygiene</td>
                    <td>Tuesday, 13/3/2025</td>
                    <td className="monitored-by">
                      <span className="person-tag">
                        <i className="fas fa-user"></i> John Doe
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Emily Taylor
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Sam Smith
                      </span>
                      {/* <span className="shift-indicator">
                      12:00 AM To 8:00 AM Shift
                    </span> */}
                    </td>
                    <td>
                      <button className="btn-icon-row">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Hygiene</td>
                    <td>Tuesday, 13/3/2025</td>
                    <td className="monitored-by">
                      <span className="person-tag">
                        <i className="fas fa-user"></i> John Doe
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Emily Taylor
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Sam Smith
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon-row">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Hygiene</td>
                    <td>Tuesday, 13/3/2025</td>
                    <td className="monitored-by">
                      <span className="person-tag">
                        <i className="fas fa-user"></i> John Doe
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Emily Taylor
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Sam Smith
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon-row">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Hygiene</td>
                    <td>Tuesday, 13/3/2025</td>
                    <td className="monitored-by">
                      <span className="person-tag">
                        <i className="fas fa-user"></i> John Doe
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Emily Taylor
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Sam Smith
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon-row">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Hygiene</td>
                    <td>Tuesday, 13/3/2025</td>
                    <td className="monitored-by">
                      <span className="person-tag">
                        <i className="fas fa-user"></i> John Doe
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Emily Taylor
                      </span>
                      <span className="person-tag">
                        <i className="fas fa-user"></i> Sam Smith
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon-row">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
