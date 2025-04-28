import React, { useState } from "react";
import Header from "../Reuseable/Header";
import Sidebar from "../Reuseable/Sidebar";

const Participant = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [openElips, setOpenElips] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const openModal = () => setModalOpen(true);
  const openFilter = () => setFilterOpen(true);
  const openEplipsis = () => setOpenElips(true);
  const closeModal = () => setModalOpen(false);
  const closeFilter = () => setFilterOpen(false);
  const closeDelete = () => setOpenDelete(false);

  console.log("first", openDelete);
  return (
    <div className="flex">
      <Sidebar current={"Participant Management"} />
      <div className="body-area">
        <Header />
        <div className="main-body">
          <section className="participants-section">
            <div className="participants-header">
              <nav className="breadcrumb-container">
                <ol className="breadcrumb-list">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item active">
                    Participant Management
                  </li>
                </ol>
              </nav>
              <div className="participants-controls">
                <div className="search-bar">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input type="text" placeholder="Search" />
                </div>
                <button
                  className="btn-filter"
                  onClick={openFilter}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <i className="fa-solid fa-sliders"></i>
                </button>
                <button className="btn-add-participant" onClick={openModal}>
                  <i className="fa-solid fa-plus"></i> Add Participant
                </button>
              </div>
            </div>
            <div className="participants-table-wrapper">
              <table className="participants-table">
                <thead>
                  <tr>
                    <th className="checkbox-col">
                      <input type="checkbox" className="header-checkbox" />
                    </th>
                    <th>Patient Name</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Number Of Forms</th>
                    <th>Added On</th>
                    <th className="icon-col">QR Code</th>
                    <th className="icon-col actions-col">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="checkbox-col">
                      <input type="checkbox" />
                    </td>
                    <td>
                      <span className="patient-name">John Doe</span>
                      <span className="patient-id">P001</span>
                    </td>
                    <td>1234 Elm Street, SA</td>
                    <td>
                      <span className="status-badge status-active">Active</span>
                    </td>
                    <td>3</td>
                    <td>12/03/2025</td>
                    <td className="icon-col">
                      <button className="btn-icon btn-download">
                        <i className="fa-solid fa-download"></i>
                      </button>
                    </td>
                    <td className="icon-col actions-col">
                      <button
                        className="btn-icon btn-more"
                        onClick={openEplipsis}
                      >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      {openElips && (
                        <div className="openelips">
                          <ul>
                            <li onClick={() => setOpenElips(false)}>
                              <i className="fa-solid fa-pencil"></i>
                              Edit
                            </li>
                            <li
                              className="green"
                              onClick={() => setOpenElips(false)}
                            >
                              <i className="fa-solid fa-arrow-right-arrow-left"></i>
                              Change Status
                            </li>
                            <li
                              className="red"
                              onClick={() => {
                                setOpenDelete(true);
                                setOpenElips(false);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                              Delete
                            </li>
                          </ul>
                        </div>
                      )}
                      {openDelete && (
                        <div className="modal-overlay-pop">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h2 className="modal-title">
                                Delete Participant
                              </h2>
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
                                <span className="participant-name">
                                  John Doe
                                </span>
                                ?
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
                                <i className="fas fa-trash-alt delete-icon"></i>{" "}
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-col">
                      <input type="checkbox" />
                    </td>
                    <td>
                      <span className="patient-name">Sarah Smith</span>
                      <span className="patient-id">P003</span>
                    </td>
                    <td>5678 Oak Avenue, SA</td>
                    <td>
                      <span className="status-badge status-active">Active</span>
                    </td>
                    <td>4</td>
                    <td>14/03/2025</td>
                    <td className="icon-col">
                      <button className="btn-icon btn-download">
                        <i className="fa-solid fa-download"></i>
                      </button>
                    </td>
                    <td className="icon-col actions-col">
                      <button className="btn-icon btn-more">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-col">
                      <input type="checkbox" />
                    </td>
                    <td>
                      <span className="patient-name">Sarah Smith</span>
                      <span className="patient-id">P003</span>
                    </td>
                    <td>5678 Oak Avenue, SA</td>
                    <td>
                      <span className="status-badge status-active">Active</span>
                    </td>
                    <td>4</td>
                    <td>14/03/2025</td>
                    <td className="icon-col">
                      <button className="btn-icon btn-download">
                        <i className="fa-solid fa-download"></i>
                      </button>
                    </td>
                    <td className="icon-col actions-col">
                      <button className="btn-icon btn-more">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-col">
                      <input type="checkbox" />
                    </td>
                    <td>
                      <span className="patient-name">Sarah Smith</span>
                      <span className="patient-id">P003</span>
                    </td>
                    <td>5678 Oak Avenue, SA</td>
                    <td>
                      <span className="status-badge status-active">Active</span>
                    </td>
                    <td>4</td>
                    <td>14/03/2025</td>
                    <td className="icon-col">
                      <button className="btn-icon btn-download">
                        <i className="fa-solid fa-download"></i>
                      </button>
                    </td>
                    <td className="icon-col actions-col">
                      <button className="btn-icon btn-more">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-col">
                      <input type="checkbox" />
                    </td>
                    <td>
                      <span className="patient-name">Sarah Smith</span>
                      <span className="patient-id">P003</span>
                    </td>
                    <td>5678 Oak Avenue, SA</td>
                    <td>
                      <span className="status-badge status-inactive">
                        Inactive
                      </span>
                    </td>
                    <td>4</td>
                    <td>14/03/2025</td>
                    <td className="icon-col">
                      <button className="btn-icon btn-download">
                        <i className="fa-solid fa-download"></i>
                      </button>
                    </td>
                    <td className="icon-col actions-col">
                      <button className="btn-icon btn-more">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-col">
                      <input type="checkbox" />
                    </td>
                    <td>
                      <span className="patient-name">Sarah Smith</span>
                      <span className="patient-id">P003</span>
                    </td>
                    <td>5678 Oak Avenue, SA</td>
                    <td>
                      <span className="status-badge status-inactive">
                        Inactive
                      </span>
                    </td>
                    <td>4</td>
                    <td>14/03/2025</td>
                    <td className="icon-col">
                      <button className="btn-icon btn-download">
                        <i className="fa-solid fa-download"></i>
                      </button>
                    </td>
                    <td className="icon-col actions-col">
                      <button className="btn-icon btn-more">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        {isModalOpen && (
          <div className={`modal-overlay ${isModalOpen ? "visible" : ""}`}>
            <div className="modal-panel">
              <div className="modal-header">
                <h2>Add New Participant</h2>
                <button
                  className="close-button"
                  id="closeModalBtn"
                  aria-label="Close modal"
                  onClick={closeModal}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <form action="#" method="post" id="participantForm">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="participantName">
                        Participant Name<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="participantName"
                        name="participantName"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="participantId">
                        Participant Id<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="participantId"
                        name="participantId"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contactInfo">
                        Contact Information<span className="required">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contactInfo"
                        name="contactInfo"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <input type="text" id="gender" name="gender" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="selectForms">
                      Select Forms<span className="required">*</span>
                    </label>
                    <div className="select-forms-container" id="selectForms">
                      <div className="selected-pills">
                        <span className="form-pill">
                          Hygiene{" "}
                          <button
                            type="button"
                            className="pill-close"
                            aria-label="Remove Hygiene"
                          >
                            ×
                          </button>
                        </span>
                        <span className="form-pill">
                          Bowel Movement{" "}
                          <button
                            type="button"
                            className="pill-close"
                            aria-label="Remove Bowel Movement"
                          >
                            ×
                          </button>
                        </span>
                      </div>
                      <span className="dropdown-arrow">▾</span>
                    </div>
                  </div>
                  <div className="form-group qr-section">
                    <label>
                      Click to Generate QR Code
                      <span className="required">*</span>
                    </label>
                    <p className="qr-description">
                      Generate a scannable QR code for instant access to
                      participant's details and forms
                    </p>
                    <button type="button" className="btn btn-generate-qr">
                      <i className="fas fa-qrcode"></i> Generate QR Code
                    </button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  id="cancelModalBtn"
                  onClick={closeModal}
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
        {isFilterOpen && (
          <div className={`modal-overlay ${isFilterOpen ? "visible" : ""}`}>
            <div className="modal-panel">
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

export default Participant;
