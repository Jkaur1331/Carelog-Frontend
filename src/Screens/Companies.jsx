import React, { useState } from "react";
import Header from "../Reuseable/Header";
import company from "../images/company.png";
import SidebarAdmin from "../Reuseable/SidebarAdmin";
import user from "../images/user.svg";
import filter from "../images/filter.svg";
const Companies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openElips, setOpenElips] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 10);
  };
  const openFilter = () => {
    setShowFilterModal(true);
    setTimeout(() => {
      setIsFilterOpen(true);
    }, 10);
  };

  const openEditModal = () => {
    setShowModalEdit(true);
    setTimeout(() => {
      setIsModalEdit(true);
    }, 10);
  };

  const openEplipsis = () => setOpenElips(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setShowModal(false);
    }, 300);
  };
  const closeFilter = () => {
    setIsFilterOpen(false);
    setTimeout(() => {
      setShowFilterModal(false);
    }, 300);
  };
  const editCloseModal = () => {
    setIsModalEdit(false);
    setTimeout(() => {
      setShowModalEdit(false);
    }, 300);
  };
  const closeDelete = () => setOpenDelete(false);

  return (
    <div className="flex">
      <SidebarAdmin current={"Companies"} />
      <div className="body-area">
        <Header />
        <div className="main-body">
          <div className="participants-header">
            <nav className="breadcrumb-container">
              <ol className="breadcrumb-list">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item active">Companies</li>
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
                <img src={filter} alt="" />
              </button>
              <button className="btn-add-participant" onClick={openModal}>
                <img src={user} alt="" /> Add Participant
              </button>
            </div>
          </div>
          <div class="table-container">
            <table class="companies-table">
              <thead class="table-header">
                <tr>
                  <th class="cell-checkbox-header">
                    <input type="checkbox" class="header-checkbox" />
                  </th>
                  <th class="cell-company-header">Company</th>
                  <th class="cell-subscription-header">
                    Subscription <i class="fas fa-info-circle info-icon"></i>
                  </th>
                  <th class="cell-status-header">Status</th>
                  <th class="cell-forms-header">Number Of Forms</th>
                  <th class="cell-date-header">Start Date</th>
                  <th class="cell-actions-header">
                    <i class="fas fa-ellipsis-v"></i>
                  </th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr class="table-row">
                  <td className="checkbox-col">
                    <span className="row-number">1</span>
                    <input type="checkbox" className="row-checkbox" />
                  </td>
                  <td class="cell-company">
                    <img
                      src={company}
                      alt="Company Logo"
                      class="company-logo"
                    />
                    <div class="company-info">
                      <span class="company-name">CareNova</span>
                      <span class="company-email">Support@carenova.com</span>
                    </div>
                  </td>
                  <td class="cell-subscription">Basic</td>
                  <td class="cell-status">
                    <span class="status-badge status-active">Active</span>
                  </td>
                  <td class="cell-forms">
                    <span class="form-badge">
                      <i class="far fa-check-circle form-icon"></i> Daily Task
                      List
                    </span>
                    <span class="form-badge">
                      <i class="far fa-clipboard form-icon"></i> Bowel Chart
                    </span>
                    <span class="form-badge">
                      <i class="far fa-file-alt form-icon"></i> Blood Glucose..
                    </span>
                    <span class="form-count-badge">+3</span>
                  </td>
                  <td class="cell-date">12/03/2025</td>
                  <td class="cell-actions">
                    <button class="action-button" onClick={openEplipsis}>
                      <i class="fas fa-ellipsis-v action-icon"></i>
                    </button>
                  </td>
                  {openElips && (
                    <div className="openelips">
                      <ul>
                        <li
                          onClick={() => {
                            setOpenElips(false);
                            openEditModal();
                          }}
                        >
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
                          <h2 className="modal-title">Carenova</h2>
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
                            <i className="fas fa-trash-alt delete-icon"></i>{" "}
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </tr>
                <tr class="table-row">
                  <td class="cell-checkbox">
                    <input type="checkbox" class="row-checkbox" />
                  </td>
                  <td class="cell-company">
                    <img
                      src={company}
                      alt="Company Logo"
                      class="company-logo"
                    />
                    <div class="company-info">
                      <span class="company-name">CareNova</span>
                      <span class="company-email">Support@carenova.com</span>
                    </div>
                  </td>
                  <td class="cell-subscription">Pro</td>
                  <td class="cell-status">
                    <span class="status-badge status-active">Active</span>
                  </td>
                  <td class="cell-forms">
                    <span class="form-badge">
                      <i class="far fa-check-circle form-icon"></i> Daily Task
                      List
                    </span>
                    <span class="form-badge">
                      <i class="far fa-clipboard form-icon"></i> Bowel Chart
                    </span>
                    <span class="form-badge">
                      <i class="far fa-file-alt form-icon"></i> Blood Glucose..
                    </span>
                    <span class="form-count-badge">+3</span>
                  </td>
                  <td class="cell-date">14/03/2025</td>
                  <td class="cell-actions">
                    <button class="action-button">
                      <i class="fas fa-ellipsis-v action-icon"></i>
                    </button>
                  </td>
                </tr>
                <tr class="table-row">
                  <td class="cell-checkbox">
                    <input type="checkbox" class="row-checkbox" />
                  </td>
                  <td class="cell-company">
                    <img
                      src={company}
                      alt="Company Logo"
                      class="company-logo"
                    />
                    <div class="company-info">
                      <span class="company-name">CareNova</span>
                      <span class="company-email">Support@carenova.com</span>
                    </div>
                  </td>
                  <td class="cell-subscription">Pro</td>
                  <td class="cell-status">
                    <span class="status-badge status-trial">Trial</span>
                  </td>
                  <td class="cell-forms">
                    <span class="form-badge">
                      <i class="far fa-check-circle form-icon"></i> Daily Task
                      List
                    </span>
                    <span class="form-badge">
                      <i class="far fa-clipboard form-icon"></i> Bowel Chart
                    </span>
                    <span class="form-badge">
                      <i class="far fa-file-alt form-icon"></i> Blood Glucose..
                    </span>
                    <span class="form-count-badge">+3</span>
                  </td>
                  <td class="cell-date">14/03/2025</td>
                  <td class="cell-actions">
                    <button class="action-button">
                      <i class="fas fa-ellipsis-v action-icon"></i>
                    </button>
                  </td>
                </tr>
                <tr class="table-row">
                  <td class="cell-checkbox">
                    <input type="checkbox" class="row-checkbox" />
                  </td>
                  <td class="cell-company">
                    <img
                      src={company}
                      alt="Company Logo"
                      class="company-logo"
                    />
                    <div class="company-info">
                      <span class="company-name">CareNova</span>
                      <span class="company-email">Support@carenova.com</span>
                    </div>
                  </td>
                  <td class="cell-subscription">Pro</td>
                  <td class="cell-status">
                    <span class="status-badge status-suspended">Suspended</span>
                  </td>
                  <td class="cell-forms">
                    <span class="form-badge">
                      <i class="far fa-check-circle form-icon"></i> Daily Task
                      List
                    </span>
                    <span class="form-badge">
                      <i class="far fa-clipboard form-icon"></i> Bowel Chart
                    </span>
                    <span class="form-badge">
                      <i class="far fa-file-alt form-icon"></i> Blood Glucose..
                    </span>
                    <span class="form-count-badge">+3</span>
                  </td>
                  <td class="cell-date">14/03/2025</td>
                  <td class="cell-actions">
                    <button class="action-button">
                      <i class="fas fa-ellipsis-v action-icon"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <div className={`modal-overlay ${isModalOpen ? "visible" : ""}`}>
          <div
            className={`modal-panel ${isModalOpen ? "slide-in" : "slide-out"}`}
          >
            <div className="modal-header">
              <h2>Add New Company</h2>
              <button
                className="close-button"
                id="closeModalBtn"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form action="#" method="post" id="participantForm">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="CompanyName">
                      Company Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="CompanyName"
                      name="CompanyName"
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="CompanyId">
                      Company Id<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="CompanyId"
                      name="CompanyId"
                      placeholder="Enter company ID"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactInfo">Contact Person Name</label>
                    <input
                      type="text"
                      id="contactInfo"
                      name="contactInfo"
                      placeholder="Enter contact person's name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subsPlan">
                    Subscription Plan<span className="required">*</span>
                  </label>
                  <select name="subsPlan">
                    <option value="">Trial</option>
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">
                      Start Date<span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      placeholder="Select start date"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endDate">
                      End Date<span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      placeholder="Select end date"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="selectSubscription">
                    Select Forms<span className="required">*</span>
                  </label>
                  <div
                    className="select-forms-container"
                    id="selectSubscription"
                  >
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

      {showFilterModal && (
        <div className={`modal-overlay ${isFilterOpen ? "visible" : ""}`}>
          <div
            className={`modal-panel ${isFilterOpen ? "slide-in" : "slide-out"}`}
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
                  <label class="group-label">Company Status</label>
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
                      <label for="status-inactive">Trial</label>
                    </div>
                    <div class="checkbox-item">
                      <input
                        type="checkbox"
                        id="status-inactive"
                        name="status-inactive"
                        checked
                      />
                      <label for="status-inactive">Suspended</label>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="group-label">Subscription</label>
                  <div class="checkbox-group">
                    <div class="checkbox-item">
                      <input
                        type="checkbox"
                        id="status-active"
                        name="status-active"
                      />
                      <label for="status-active">Basic</label>
                    </div>
                    <div class="checkbox-item">
                      <input
                        type="checkbox"
                        id="status-inactive"
                        name="status-inactive"
                        checked
                      />
                      <label for="status-inactive">Pro</label>
                    </div>
                    <div class="checkbox-item">
                      <input
                        type="checkbox"
                        id="status-inactive"
                        name="status-inactive"
                        checked
                      />
                      <label for="status-inactive">Advance</label>
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
      {showModalEdit && (
        <div className={`modal-overlay ${isModalEdit ? "visible" : ""}`}>
          <div
            className={`modal-panel ${isModalEdit ? "slide-in" : "slide-out"}`}
          >
            <div className="modal-header">
              <h2>Edit Company</h2>
              <button
                className="close-button"
                id="closeModalBtn"
                aria-label="Close modal"
                onClick={editCloseModal}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form action="#" method="post">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="CompanyName">
                      Company Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="CompanyName"
                      name="CompanyName"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="CompanyId">
                      Company Id<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="CompanyId"
                      name="CompanyId"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactInfo">Contact Person Name</label>
                    <input
                      type="text"
                      id="contactInfo"
                      name="contactInfo"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subsPlan">
                    Subscription Plan<span className="required">*</span>
                  </label>
                  <select name="subsPlan" id="subsPlan">
                    <option value="">Trial</option>
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">
                      Start Date<span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endDate">
                      End Date<span className="required">*</span>
                    </label>
                    <input type="date" name="endDate" id="endDate" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="selectSubscription">
                    Select Forms<span className="required">*</span>
                  </label>
                  <div
                    className="select-forms-container"
                    id="selectSubscription"
                  >
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                id="cancelModalBtn"
                onClick={editCloseModal}
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
  );
};

export default Companies;
