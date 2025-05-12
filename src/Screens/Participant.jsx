import React, { useEffect, useRef, useState } from "react";
import Header from "../Reuseable/Header";
import Sidebar from "../Reuseable/Sidebar";
import user from "../images/user.svg";
import filter from "../images/filter.svg";
import download from "../images/download.svg";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import pana from "../images/pana.png";
import {
  addParticipant,
  addPatients,
  deletePatient,
  editPatients,
  getParticipants,
} from "../store/Services/AllApi/index.tsx";
import { toast } from "react-toastify";
import Loader from "../Reuseable/Loader.jsx";
import { Select, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Participant = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [openElips, setOpenElips] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const options = ["Hygiene", "Bowel Movement", "Medication", "Nutrition"];
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPatients, setTotalPatients] = useState(0);
  const [patientData, setPatientData] = useState([]);
  const [openElipsIndex, setOpenElipsIndex] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [editUserData, setEditUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [participantId, setParticipantId] = useState("");
  const [nametoSend, setNametoSend] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenElipsIndex(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    setSelectedOptions([]);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Fetch data using debounced search
  useEffect(() => {
    setIsLoading(true);
    getParticipants({
      pathParams: {
        id: localStorage.getItem("userId"),
      },
      query: {
        page: currentPage,
        limit: pageSize,
        searchParam: debouncedSearch,
      },
    })
      .then((res) => {
        setTotalPatients(res.Data.totalParticipants);
        setPatientData(res.Data.participants);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, pageSize, debouncedSearch]);

  const handlegetParticipant = () => {
    setIsLoading(true);
    getParticipants({
      pathParams: {
        id: localStorage.getItem("userId"),
      },
      query: {
        page: currentPage,
        limit: pageSize,
        searchParam: search,
      },
    })
      .then((res) => {
        setTotalPatients(res.Data.totalParticipants);
        setPatientData(res.Data.participants);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        const res = await addPatients({
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
        handlegetParticipant();
      } catch (error) {
        toast.error("Failed to add participant");
        console.error(error);
      } finally {
        setIsLoading(false);
      }

      console.log(values);
    },
  });

  const [initialValuesEdit, setInitialValuesEdit] = useState({
    participantName: "",
    participantId: "",
    address: "",
    contactInfo: "",
    gender: "",
    selectedForms: [],
  });
  useEffect(() => {
    if (editUserData) {
      const forms = editUserData.selectForms || [];
      setInitialValuesEdit({
        participantName: editUserData.name,
        participantId: editUserData.patientId,
        address: editUserData.address,
        contactInfo: editUserData.phone,
        gender: editUserData.gender,
        selectedForms: forms,
      });
    }
  }, [editUserData]);

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
  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
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
    if (value && !selectedOptions.includes(value)) {
      const updatedOptions = [...selectedOptions, value];
      setSelectedOptions(updatedOptions);
      formik.setFieldValue("selectedForms", updatedOptions);
    }
    e.target.value = "";
  };

  const removeOption = (value) => {
    const updatedOptions = selectedOptions.filter((opt) => opt !== value);
    setSelectedOptions(updatedOptions);
    formik.setFieldValue("selectedForms", updatedOptions);
  };

  const openEditModal = () => {
    setShowModalEdit(true);
    setTimeout(() => {
      setIsModalEdit(true);
    }, 10);
  };

  const editCloseModal = () => {
    setIsModalEdit(false);
    setTimeout(() => {
      setShowModalEdit(false);
    }, 300);
  };

  const handleEditPatient = (values) => {
    setIsLoading(true);
    console.log("Selected Forms to Send:", values.selectedForms);
    editPatients({
      pathParams: {
        id: editUserData.id,
      },
      body: {
        name: values.participantName,
        phone: values.contactInfo,
        patientId: values.participantId,
        gender: values.gender,
        selectForms: values.selectedForms,
        address: values.address,
        adminId: localStorage.getItem("userId"),
      },
    })
      .then((res) => {
        toast.success("Edited Patient");
        setShowModalEdit(false);
        clearvalue();
        handlegetParticipant();
      })
      .catch((error) => toast.error("Failed to edit"))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const deletePatientFinal = async () => {
    setIsLoading(true);
    try {
      await deletePatient({
        query: {
          participantId: participantId,
        },
      });
      toast.success("Deleted Successfully");
      setOpenDelete(false);
      handlegetParticipant();
    } catch (error) {
      toast.error("Failed to Delete");
    } finally {
      setIsLoading(false);
    }
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
                <li className="breadcrumb-item" onClick={() => navigate("/")}>
                  Home
                </li>
                <li className="breadcrumb-item active">
                  Participant Management
                </li>
              </ol>
            </nav>
            <div className="participants-controls">
              <div className="search-bar">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearch}
                />
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
                {patientData.length > 0 ? (
                  patientData.map((itm, index) => (
                    <tr key={itm.id}>
                      <td className="checkbox-col">
                        <span className="row-number">{index + 1}</span>
                        <input type="checkbox" className="row-checkbox" />
                      </td>
                      <td>
                        <span className="patient-name">{itm.name}</span>
                        <span className="patient-id">{itm.patientId}</span>
                      </td>
                      <td>{itm.address}</td>
                      <td>
                        <span className="status-badge status-active">
                          Active
                        </span>
                      </td>
                      <td>{itm.selectForms.length}</td>
                      <td>{formatDateToDDMMYYYY(itm.createdAt)}</td>
                      <td className="icon-col">
                        <button className="btn-icon btn-download">
                          <img src={download} alt="" />
                        </button>
                      </td>
                      <td className="icon-col actions-col">
                        <button
                          className="btn-icon btn-more"
                          onClick={() => setOpenElipsIndex(index)}
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        {openElipsIndex === index && (
                          <div className="openelips" ref={menuRef}>
                            <ul>
                              <li
                                onClick={() => {
                                  setOpenElipsIndex(null);
                                  openEditModal();
                                  setEditUserData(itm);
                                }}
                              >
                                <i className="fa-solid fa-pencil"></i> Edit
                              </li>

                              <li
                                className="green"
                                onClick={() => setOpenElipsIndex(null)}
                              >
                                <i className="fa-solid fa-arrow-right-arrow-left"></i>{" "}
                                Change Status
                              </li>
                              <li
                                className="red"
                                onClick={() => {
                                  setOpenDelete(true);
                                  setOpenElipsIndex(null);
                                  setParticipantId(itm.id);
                                  setNametoSend(itm.name);
                                }}
                              >
                                <i className="fa-solid fa-trash"></i> Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data-cell">
                      <div className="no-data-content">
                        <img src={pana} alt="No data" />
                        <p>
                          <b>No result found</b>
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
                      <span className="participant-name">{nametoSend}</span>?
                    </p>
                  </div>
                  <div className="footer">
                    <button
                      className="modal-button cancel-button"
                      onClick={closeDelete}
                    >
                      Cancel
                    </button>
                    <button
                      className="modal-button delete-button"
                      onClick={deletePatientFinal}
                    >
                      <i className="fas fa-trash-alt delete-icon"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="custom-pagination-container">
            <div className="custom-pagination-left">
              <span className="custom-pagination-label">View</span>
              <Select
                className="custom-pagination-select"
                defaultValue={10}
                onChange={handlePageSizeChange}
              >
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={50}>50</Option>
              </Select>
              <span className="custom-pagination-text">
                Applicants per page
              </span>
            </div>

            <div className="custom-pagination-right">
              <Pagination
                className="custom-pagination-control"
                current={currentPage}
                pageSize={pageSize}
                total={totalPatients}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
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
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="participantName">
                        Participant Name<span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="participantName"
                        name="participantName"
                        placeholder="Enter full name"
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
                        placeholder="Enter unique ID"
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
                      placeholder="Enter full address"
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
                        placeholder="Enter phone number"
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
                    <label>
                      Click to Generate QR Code
                      <span className="required">*</span>
                    </label>
                    <p className="qr-description">
                      Generate a scannable QR code for instant access to
                      participant's details and forms
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Generate QR Code
                    </button>
                  </div>
                </form>
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
        {showModalEdit && (
          <div className={`modal-overlay ${isModalEdit ? "visible" : ""}`}>
            <div
              className={`modal-panel ${
                isModalEdit ? "slide-in" : "slide-out"
              }`}
            >
              <div className="modal-header">
                <h2>Edit Participant</h2>
                <button
                  className="close-button"
                  onClick={editCloseModal}
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={initialValuesEdit}
                  validationSchema={validationSchema}
                  onSubmit={handleEditPatient}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    touched,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="participantName">
                            Participant Name<span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="participantName"
                            name="participantName"
                            value={values.participantName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                          />
                          {touched.participantName &&
                            errors.participantName && (
                              <div className="error">
                                {errors.participantName}
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
                            value={values.participantId}
                            onChange={handleChange}
                            placeholder="Enter unique ID"
                          />
                          {touched.participantId && errors.participantId && (
                            <div className="error">{errors.participantId}</div>
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
                          value={values.address}
                          onChange={handleChange}
                          placeholder="Enter full address"
                        />
                        {touched.address && errors.address && (
                          <div className="error">{errors.address}</div>
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
                            value={values.contactInfo}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                          />
                          {touched.contactInfo && errors.contactInfo && (
                            <div className="error">{errors.contactInfo}</div>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="gender">
                            Gender<span className="required">*</span>
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                          >
                            <option value="" disabled hidden>
                              Select gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          {touched.gender && errors.gender && (
                            <div className="error">{errors.gender}</div>
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="group-label">
                          Forms<span className="required">*</span>{" "}
                          {/* Assuming forms are required in edit too */}
                        </label>
                        <div className="multi-select-input">
                          <select
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              // Ensure values.selectedForms is treated as an array
                              const currentSelectedForms = Array.isArray(
                                values.selectedForms
                              )
                                ? values.selectedForms
                                : [];
                              if (
                                selectedValue &&
                                !currentSelectedForms.includes(selectedValue)
                              ) {
                                setFieldValue("selectedForms", [
                                  ...currentSelectedForms,
                                  selectedValue,
                                ]);
                              }
                              e.target.value = ""; // Reset select dropdown
                            }}
                            defaultValue=""
                          >
                            <option value="" disabled hidden>
                              Select form...
                            </option>
                            {options.map((option, index) => {
                              const currentSelectedForms = Array.isArray(
                                values.selectedForms
                              )
                                ? values.selectedForms
                                : [];
                              return (
                                !currentSelectedForms.includes(option) && (
                                  <option key={index} value={option}>
                                    {option}
                                  </option>
                                )
                              );
                            })}
                          </select>

                          {/* Display validation error for selectedForms */}
                          {touched.selectedForms && errors.selectedForms && (
                            <div className="error">{errors.selectedForms}</div>
                          )}

                          <div className="pills-container">
                            {(Array.isArray(values.selectedForms)
                              ? values.selectedForms
                              : []
                            ).map((option, index) => (
                              <span className="pill" key={index}>
                                {option}
                                <span
                                  className="close-icon"
                                  onClick={() => {
                                    const currentSelectedForms = Array.isArray(
                                      values.selectedForms
                                    )
                                      ? values.selectedForms
                                      : [];
                                    setFieldValue(
                                      "selectedForms",
                                      currentSelectedForms.filter(
                                        (item) => item !== option
                                      )
                                    );
                                  }}
                                >
                                  ×
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="form-group qr-section flex space-bw">
                        <label>
                          Click to Generate QR Code
                          <span className="required">*</span>
                        </label>
                        <p className="qr-description">
                          Generate a scannable QR code for instant access to
                          participant's details and forms
                        </p>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={editCloseModal}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          <i className="fas fa-qrcode"></i> Generate QR Code
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Participant;
