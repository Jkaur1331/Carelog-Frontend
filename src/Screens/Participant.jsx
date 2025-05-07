import React, { useState } from "react";
import Header from "../Reuseable/Header";
import Sidebar from "../Reuseable/Sidebar";
import user from "../images/user.svg";
import filter from "../images/filter.svg";
import download from "../images/download.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addParticipant } from "../store/Services/AllApi/index.tsx";
import { toast } from "react-toastify";
import Loader from "../Reuseable/Loader.jsx";

const Participant = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [openElips, setOpenElips] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const options = ["Hygiene", "Bowel Movement", "Medication", "Nutrition"];

  const validationSchema = Yup.object({
    participantName: Yup.string().required("Participant name is required"),
    participantId: Yup.string().required("Participant ID is required"),
    address: Yup.string().required("Address is required"),
    contactInfo: Yup.string().required("Contact number is required"),
    gender: Yup.string().required("Gender is required"),
    selectedForms: Yup.array()
      .min(1, "At least one form must be selected")
      .required("Form selection is required"),
  });

  const clearvalue = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      participantName: "",
      participantId: "",
      address: "",
      contactInfo: "",
      gender: "",
      selectedForms: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await addParticipant({
          body: {
            name: values.participantName,
            phone: values.contactInfo,
            patientId: values.participantId,
            gender: values.gender,
            selectForms: values.selectedForms,
            address: values.address,
            adminId: localStorage.getItem("userId"),
          },
        });
        toast.success(res.message);
        closeModal();
        clearvalue();
      } catch (err) {
        toast.error("Failed to create participant");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
  });

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
  const closeDelete = () => setOpenDelete(false);
  const handleSelect = (e) => {
    const value = e.target.value;
    if (value && !formik.values.selectedForms.includes(value)) {
      const updated = [...formik.values.selectedForms, value];

      formik.setFieldValue("selectedForms", updated);
    }
  };

  const removeOption = (value) => {
    const updated = formik.values.selectedForms.filter((opt) => opt !== value);

    formik.setFieldValue("selectedForms", updated);
  };

  return (
    <div className="flex">
      <Loader loading={isLoading} />
      <Sidebar current={"Participant Management"} />
      <div className="body-area">
        <Header />
        <div className="main-body">
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
                <img src={filter} alt="" />
              </button>
              <button className="btn-add-participant" onClick={openModal}>
                <img src={user} alt="" /> Add Participant
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
                    <span className="row-number">1</span>
                    <input type="checkbox" className="row-checkbox" />
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
                    <button class="btn-icon btn-download">
                      <img src={download} alt="" />
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
                              <span className="participant-name">John Doe</span>
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
              </tbody>
            </table>
          </div>
        </div>
        {showModal && (
          <div className={`modal-overlay ${isModalOpen ? "visible" : ""}`}>
            <div
              className={`modal-panel ${
                isModalOpen ? "slide-in" : "slide-out"
              }`}
            >
              <div className="modal-header">
                <h2>Add New Participant</h2>
                <button className="close-button" onClick={closeModal}>
                  ×
                </button>
              </div>

              <div className="modal-body">
                <form id="participantForm" onSubmit={formik.handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="participantName">
                        Participant Name<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="participantName"
                        name="participantName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.participantName}
                      />
                      {formik.touched.participantName &&
                        formik.errors.participantName && (
                          <div className="error">
                            {formik.errors.participantName}
                          </div>
                        )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="participantId">
                        Participant ID<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="participantId"
                        name="participantId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.participantId}
                      />
                      {formik.touched.participantId &&
                        formik.errors.participantId && (
                          <div className="error">
                            {formik.errors.participantId}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">
                      Address<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <div className="error">{formik.errors.address}</div>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contactInfo">
                        Contact Info<span className="required">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contactInfo"
                        name="contactInfo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contactInfo}
                      />
                      {formik.touched.contactInfo &&
                        formik.errors.contactInfo && (
                          <div className="error">
                            {formik.errors.contactInfo}
                          </div>
                        )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="gender">
                        Gender<span className="required">*</span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="" label="Select gender" disabled />
                        <option value="Male" label="Male" />
                        <option value="Female" label="Female" />
                        <option value="Other" label="Other" />
                      </select>
                      {formik.touched.gender && formik.errors.gender && (
                        <div className="error">{formik.errors.gender}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="group-label">
                      Select Forms<span className="required">*</span>
                    </label>
                    <div className="multi-select-input">
                      <select onChange={handleSelect} defaultValue="">
                        <option value="" disabled hidden>
                          Select form...
                        </option>
                        {options.map(
                          (option, index) =>
                            !formik.values.selectedForms.includes(option) && (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            )
                        )}
                      </select>

                      {formik.touched.selectedForms &&
                        formik.errors.selectedForms && (
                          <div className="error">
                            {formik.errors.selectedForms}
                          </div>
                        )}

                      <div className="pills-container">
                        {formik.values.selectedForms.map((option, index) => (
                          <span className="pill" key={index}>
                            {option}
                            <span
                              className="close-icon"
                              onClick={() => removeOption(option)}
                            >
                              ×
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-group qr-section flex space-bw">
                    <div className="col-60">
                      <label>
                        Click to Generate QR Code
                        <span className="required">*</span>
                      </label>
                      <p className="qr-description">
                        Generate a scannable QR code for instant access to
                        participant's details and forms
                      </p>
                    </div>
                    <div className="col-40">
                      {/* <button type="button" className="btn btn-generate-qr">
                        <i className="fas fa-qrcode"></i> Generate QR Code
                      </button> */}
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="participantForm"
                  className="btn btn-primary"
                >
                  <i className="fas fa-qrcode"></i> Generate QR Code
                </button>
              </div>
            </div>
          </div>
        )}

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

export default Participant;
