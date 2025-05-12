import React, { useEffect, useRef, useState } from "react";
import Header from "../Reuseable/Header";
import SidebarAdmin from "../Reuseable/SidebarAdmin";
import filter from "../images/filter.svg";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Select, Pagination } from "antd";
import pana from "../images/pana.png";
import {
  addCompany,
  deleteCompany,
  editParticipant,
  getAllParticipant,
} from "../store/Services/AllApi/index.tsx";
import { toast } from "react-toastify";
import Loader from "../Reuseable/Loader.jsx";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;
const Companies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openElips, setOpenElips] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const options = ["Hygiene", "Bowel Movement", "Medication", "Nutrition"];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allParaticipantData, setAllParticipantData] = useState([]);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeElipsRow, setActiveElipsRow] = useState(null);
  const [editUserData, setEditUserData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [companyIdTo, setCompanyIdTo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  console.log("lola", companyName);
  console.log("lola1", companyIdTo);

  const getAllParticipantFunction = () => {
    setLoading(true);
    getAllParticipant({
      query: {
        page: currentPage,
        limit: pageSize,
        searchParam: search,
      },
    })
      .then((res) => {
        setAllParticipantData(res.Data.admins);
        setTotalAdmins(res.Data.totalAdmins);
      })
      .catch((err) => {
        console.error("Error fetching participants", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };
  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const validationSchema1 = Yup.object({
    CompanyName: Yup.string().required("Company Name is required"),
    CompanyId: Yup.string().required("CompanyId is required"),
    contactInfo: Yup.string().required("Contact Info is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    subsPlan: Yup.string().required("Subscription plan is Required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date must be after start date")
      .required("End date is required"),
    selectedForms: Yup.array()
      .min(1, "At least one form must be selected")
      .required("Form selection is required"),
    logo: Yup.mixed().required("Logo is Required"),
  });

  const formik = useFormik({
    initialValues: {
      CompanyName: "",
      CompanyId: "",
      contactInfo: "",
      phoneNumber: "",
      logo: null,
      subsPlan: "",
      startDate: "",
      endDate: "",
      selectedForms: [],
    },
    validationSchema: Yup.object({
      CompanyName: Yup.string().required("Company Name is required"),
      CompanyId: Yup.string().required("CompanyId is required"),
      contactInfo: Yup.string().required("Contact Info is required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      subsPlan: Yup.string().required("Subscription plan is Required"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date must be after start date")
        .required("End date is required"),
      selectedForms: Yup.array()
        .min(1, "At least one form must be selected")
        .required("Form selection is required"),
      logo: Yup.mixed().required("Logo is Required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      const formData = new FormData();
      formData.append("superAdminId", localStorage.getItem("userId"));
      formData.append("companyId", values.CompanyId);
      formData.append("companyName", values.CompanyName);
      formData.append("logo", values.logo); // If logo is a File object
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("subscriptionPlan", values.subsPlan);
      formData.append("contactPersonName", values.contactInfo);
      formData.append("phoneNumber", values.phoneNumber);
      // If selectedForms is an array, stringify it
      formData.append("selectedFroms", JSON.stringify(values.selectedForms));
      setLoading(true);
      addCompany({ body: formData })
        .then((res) => {
          toast.success("Company Added Successfully");
          setShowModal(false);
          getAllParticipantFunction();
          clearvalue();
        })
        .catch((error) => toast.error(error?.message || "Something went wrong"))
        .finally(() => {
          setLoading(false);
        });
    },
  });
  const elipsRef = useRef(null);
  const [initialValuesEdit, setInitialValuesEdit] = useState({
    CompanyName: "",
    CompanyId: "",
    contactInfo: "",
    phoneNumber: "",
    logo: null,
    subsPlan: "",
    startDate: "",
    endDate: "",
    selectedForms: [],
  });
  useEffect(() => {
    if (editUserData) {
      let formsArray = [];
      if (editUserData.selectedFroms) {
        if (typeof editUserData.selectedFroms === "string") {
          try {
            formsArray = JSON.parse(editUserData.selectedFroms);
          } catch (e) {
            console.error("Failed to parse selectedFroms:", e);
            formsArray = []; // Fallback to empty if parsing fails
          }
        } else if (Array.isArray(editUserData.selectedFroms)) {
          formsArray = editUserData.selectedFroms;
        }
      }

      setInitialValuesEdit({
        CompanyName: editUserData.companyName || "", // Good practice to add fallbacks
        CompanyId: editUserData.companyId || "",
        contactInfo: editUserData.contactPersonName || "",
        phoneNumber: editUserData.phoneNumber || "",
        logo: editUserData.logo || null, // Assuming logo is a URL string or null
        subsPlan: editUserData.subscriptionPlan || "",
        startDate: editUserData.startDate?.split("T")[0] || "",
        endDate: editUserData.endDate?.split("T")[0] || "",
        selectedForms: formsArray, // Use the potentially parsed array
      });
    }
  }, [editUserData]);

  const editSubmit = (values) => {
    const formData = new FormData();
    setLoading(true);

    formData.append("logo", values.logo);

    formData.append("companyId", values.CompanyId);
    formData.append("companyName", values.CompanyName);
    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);
    formData.append("subscriptionPlan", values.subsPlan);
    formData.append("contactPersonName", values.contactInfo);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("selectedFroms", JSON.stringify(values.selectedForms));

    // Submit the form data
    editParticipant({
      query: {
        id: editUserData.id,
      },
      body: formData,
    })
      .then(() => {
        toast.success("Company Updated Successfully");
        setShowModalEdit(false);
        getAllParticipantFunction();
      })
      .catch((err) => {
        toast.error(err?.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const openDropdown = document.querySelector(".openelips");
      if (openDropdown && !openDropdown.contains(event.target)) {
        setActiveElipsRow(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
  const clearvalue = () => {
    formik.resetForm();
    setSelectedOptions([]);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  useEffect(() => {
    let isActive = true;
    setLoading(true);

    getAllParticipant({
      query: {
        page: currentPage,
        limit: pageSize,
        searchParam: debouncedSearch,
      },
    })
      .then((res) => {
        if (isActive) {
          setAllParticipantData(res?.Data?.admins || []);
          setTotalAdmins(res?.Data?.totalAdmins || 0);
        }
      })
      .catch((err) => {
        if (isActive) {
          console.error("Error fetching participants", err);
          toast.error("Failed to fetch companies.");
          setAllParticipantData([]);
          setTotalAdmins(0);
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [currentPage, pageSize, debouncedSearch]);

  const deleteCompanyFinal = async () => {
    setLoading(true);
    try {
      await deleteCompany({
        query: {
          id: companyIdTo,
        },
      });
      toast.success("Deleted Successfully");
      getAllParticipantFunction();
      setOpenDelete(false);
    } catch (error) {
      toast.error("Failed to delete company");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Loader loading={loading} />
      <SidebarAdmin current={"Companies"} />
      <div className="body-area">
        <Header />
        <div className="main-body">
          <div className="participants-header">
            <nav className="breadcrumb-container">
              <ol className="breadcrumb-list">
                <li
                  className="breadcrumb-item"
                  onClick={() => navigate("/admin")}
                >
                  Home
                </li>
                <li className="breadcrumb-item active">Companies</li>
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
                <i className="fa-solid fa-plus"></i> Add Company
              </button>
            </div>
          </div>
          <div className="table-container">
            <table className="companies-table">
              <thead className="table-header">
                <tr>
                  <th className="cell-checkbox-header">
                    <input type="checkbox" className="header-checkbox" />
                  </th>
                  <th className="cell-company-header">Company</th>
                  <th className="cell-subscription-header">
                    Subscription
                    <div className="info-icon-wrapper">
                      <i className="fas fa-info-circle info-icon"></i>
                      <div className="pricing-table">
                        <table>
                          <thead>
                            <tr>
                              <th>Feature</th>
                              <th>Basic</th>
                              <th>Pro</th>
                              <th>Advance</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Participants</td>
                              <td>25</td>
                              <td>50</td>
                              <td>Unlimited</td>
                            </tr>
                            <tr>
                              <td>Forms Available</td>
                              <td>5</td>
                              <td>Unlimited</td>
                              <td>Unlimited</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </th>

                  <th className="cell-status-header">Status</th>
                  <th className="cell-forms-header">Number Of Forms</th>
                  <th className="cell-date-header">Start Date</th>
                  <th className="cell-actions-header">
                    <i className="fas fa-ellipsis-v"></i>
                  </th>
                </tr>
              </thead>
              <tbody className="table-body">
                {allParaticipantData.length > 0 ? (
                  allParaticipantData.map((itm, index) => (
                    <tr className="table-row" key={itm.id}>
                      <td className="checkbox-col">
                        <span className="row-number">{index + 1}</span>
                        <input type="checkbox" className="row-checkbox" />
                      </td>
                      <td className="cell-company">
                        <img
                          src={itm.logo}
                          alt="Company Logo"
                          className="company-logo"
                        />
                        <div className="company-info">
                          <span className="company-name">
                            {itm.companyName}
                          </span>
                          <span className="company-email">{itm.companyId}</span>
                        </div>
                      </td>
                      <td className="cell-subscription">
                        {itm.subscriptionPlan}
                      </td>
                      <td className="cell-status">
                        <span className="status-badge status-active">
                          Active
                        </span>
                      </td>
                      <td className="cell-forms">
                        {/* Show first 3 items */}
                        {itm.selectedFroms.slice(0, 3).map((pop, i) => (
                          <span key={i} className="form-badge">
                            {pop}
                          </span>
                        ))}

                        {/* Show +N and dropdown only if more than 3 */}
                        {itm.selectedFroms.length > 3 && (
                          <div className="badge-wrapper">
                            <span className="form-count-badge">
                              +{itm.selectedFroms.length - 3}
                            </span>
                            <div className="badge-dropdown">
                              {itm.selectedFroms.slice(3).map((pop, i) => (
                                <span key={i} className="form-badge">
                                  {pop}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="cell-date">
                        {formatDateToDDMMYYYY(itm.startDate)}
                      </td>
                      <td className="cell-actions">
                        <button
                          className="action-button"
                          onClick={() => setActiveElipsRow(itm.id)}
                        >
                          <i className="fas fa-ellipsis-v action-icon"></i>
                        </button>
                      </td>
                      {activeElipsRow === itm.id && (
                        <div className="openelips" ref={elipsRef}>
                          <ul>
                            <li
                              onClick={() => {
                                setActiveElipsRow(null);
                                openEditModal();
                                setEditUserData(itm);
                              }}
                            >
                              <i className="fa-solid fa-pencil"></i> Edit
                            </li>
                            <li
                              className="green"
                              onClick={() => setActiveElipsRow(null)}
                            >
                              <i className="fa-solid fa-arrow-right-arrow-left"></i>{" "}
                              Change Status
                            </li>
                            <li
                              className="red"
                              onClick={() => {
                                setOpenDelete(true);
                                setActiveElipsRow(null);
                                setCompanyIdTo(itm.id);
                                setCompanyName(itm.companyName);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i> Delete
                            </li>
                          </ul>
                        </div>
                      )}
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
                {openDelete && (
                  <div className="modal-overlay-pop">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h2 className="modal-title">{companyName}</h2>
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
                            {companyName}
                          </span>
                          ?
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
                          onClick={deleteCompanyFinal}
                        >
                          <i className="fas fa-trash-alt delete-icon"></i>{" "}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </tbody>
            </table>
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
                total={totalAdmins}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
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
              <button className="close-button" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
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
                      {...formik.getFieldProps("CompanyName")}
                    />
                    {formik.touched.CompanyName &&
                      formik.errors.CompanyName && (
                        <div className="error">{formik.errors.CompanyName}</div>
                      )}
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
                      {...formik.getFieldProps("CompanyId")}
                    />
                    {formik.touched.CompanyId && formik.errors.CompanyId && (
                      <div className="error">{formik.errors.CompanyId}</div>
                    )}
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
                      {...formik.getFieldProps("contactInfo")}
                    />
                    {formik.touched.contactInfo &&
                      formik.errors.contactInfo && (
                        <div className="error">{formik.errors.contactInfo}</div>
                      )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter phone number"
                      {...formik.getFieldProps("phoneNumber")}
                    />
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <div className="error">{formik.errors.phoneNumber}</div>
                      )}
                  </div>
                </div>

                <div className="file-upload-wrapper">
                  <label htmlFor="logo" className="file-label">
                    Logo
                  </label>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    className="file-input"
                    onChange={(event) =>
                      formik.setFieldValue("logo", event.currentTarget.files[0])
                    }
                  />
                  {formik.touched.logo && formik.errors.logo && (
                    <div className="error">{formik.errors.logo}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="subsPlan">
                    Subscription Plan<span className="required">*</span>
                  </label>
                  <select name="subsPlan" {...formik.getFieldProps("subsPlan")}>
                    <option value="">Select an Option</option>
                    <option value="Basic">Basic</option>
                    <option value="Pro">Pro</option>
                    <option value="Advance">Advance</option>
                  </select>
                  {formik.touched.subsPlan && formik.errors.subsPlan && (
                    <div className="error">{formik.errors.subsPlan}</div>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">
                      Start Date<span className="required">*</span>
                    </label>
                    <DatePicker
                      id="startDate"
                      name="startDate"
                      value={
                        formik.values.startDate
                          ? dayjs(formik.values.startDate)
                          : null
                      }
                      onChange={(date, dateString) =>
                        formik.setFieldValue("startDate", dateString)
                      }
                      onBlur={() => formik.setFieldTouched("startDate", true)}
                      style={{ width: "100%" }}
                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                      <div className="error">{formik.errors.startDate}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="endDate">
                      End Date<span className="required">*</span>
                    </label>
                    <DatePicker
                      id="endDate"
                      name="endDate"
                      value={
                        formik.values.endDate
                          ? dayjs(formik.values.endDate)
                          : null
                      }
                      onChange={(date, dateString) =>
                        formik.setFieldValue("endDate", dateString)
                      }
                      onBlur={() => formik.setFieldTouched("endDate", true)}
                      style={{ width: "100%" }}
                    />
                    {formik.touched.endDate && formik.errors.endDate && (
                      <div className="error">{formik.errors.endDate}</div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="group-label">Forms</label>
                  <div className="multi-select-input">
                    <select onChange={handleSelect} defaultValue="">
                      <option value="" disabled hidden>
                        Select form...
                      </option>
                      {options.map(
                        (option, index) =>
                          !selectedOptions.includes(option) && (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          )
                      )}
                      {formik.touched.selectedForms &&
                        formik.errors.selectedForms && (
                          <div className="error">
                            {formik.errors.selectedForms}
                          </div>
                        )}
                    </select>
                    <div className="pills-container">
                      {selectedOptions.map((option, index) => (
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

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
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
                <div className="form-group">
                  <label className="group-label">Company Status</label>
                  <div className="checkbox-group">
                    <div className="checkbox-item">
                      <input type="checkbox" id="status-active" name="status" />
                      <label for="status-active">Active</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="status-trial" name="status" />
                      <label for="status-trial">Trial</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="status-suspended"
                        name="status"
                      />
                      <label for="status-suspended">Suspended</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="group-label">Subscription</label>
                  <div className="checkbox-group">
                    <div className="checkbox-item">
                      <input type="checkbox" id="status-active" name="status" />
                      <label for="status-active">Basic</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="status-trial" name="status" />
                      <label for="status-trial">Pro</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="status-suspended"
                        name="status"
                      />
                      <label for="status-suspended">Advance</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="group-label">Forms</label>
                  <div className="multi-select-input">
                    <select onChange={handleSelect} defaultValue="">
                      <option value="" disabled hidden>
                        Select form...
                      </option>
                      {options.map(
                        (option, index) =>
                          !selectedOptions.includes(option) && (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          )
                      )}
                    </select>
                    <div className="pills-container">
                      {selectedOptions.map((option, index) => (
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
                <div className="form-group">
                  <label className="group-label">Addition Date</label>
                  <div className="date-input-container">
                    <DatePicker
                      name="someDate"
                      // value={someDate ? dayjs(someDate) : null}
                      // onChange={(date, dateString) => setSomeDate(dateString)}
                      style={{ width: "100%", padding: "10px" }}
                    />
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
              <Formik
                initialValues={initialValuesEdit}
                validationSchema={validationSchema1}
                onSubmit={editSubmit}
                enableReinitialize={true}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  touched,
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="CompanyName">
                          Company Name<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="CompanyName"
                          name="CompanyName"
                          value={values.CompanyName}
                          onChange={handleChange}
                        />
                        {errors.CompanyName && (
                          <div className="error">{errors.CompanyName}</div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="CompanyId">
                          Company Id<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="CompanyId"
                          name="CompanyId"
                          value={values.CompanyId}
                          onChange={handleChange}
                        />
                        {errors.CompanyId && (
                          <div className="error">{errors.CompanyId}</div>
                        )}
                      </div>
                    </div>

                    {/* Continue for other fields the same way... */}

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contactInfo">Contact Person Name</label>
                        <input
                          type="text"
                          id="contactInfo"
                          name="contactInfo"
                          value={values.contactInfo}
                          onChange={handleChange}
                        />
                        {errors.contactInfo && (
                          <div className="error">{errors.contactInfo}</div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={values.phoneNumber}
                          onChange={handleChange}
                        />
                        {errors.phoneNumber && (
                          <div className="error">{errors.phoneNumber}</div>
                        )}
                      </div>
                    </div>

                    {/* Logo upload (using setFieldValue) */}
                    <div className="file-upload-wrapper">
                      <label htmlFor="logo" className="file-label">
                        Logo
                      </label>
                      <input
                        type="file"
                        id="logo"
                        className="file-input"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          console.log(file);
                          setFieldValue("logo", file);
                        }}
                      />

                      {values.logo && (
                        <div className="logo-preview">
                          {typeof values.logo === "string" ? (
                            <img src={values.logo} alt="Logo Preview" />
                          ) : (
                            <img
                              src={URL.createObjectURL(values.logo)}
                              alt="Logo Preview"
                            />
                          )}
                        </div>
                      )}
                      {errors.logo && (
                        <div className="error">{errors.logo}</div>
                      )}
                    </div>

                    {/* Subscription Plan */}
                    <div className="form-group">
                      <label htmlFor="subsPlan">
                        Subscription Plan<span className="required">*</span>
                      </label>
                      <select
                        name="subsPlan"
                        id="subsPlan"
                        value={values.subsPlan}
                        onChange={handleChange}
                      >
                        <option value="">Select an Option</option>
                        <option value="Basic">Basic</option>
                        <option value="Pro">Pro</option>
                        <option value="Advance">Advance</option>
                      </select>
                      {errors.subsPlan && (
                        <div className="error">{errors.subsPlan}</div>
                      )}
                    </div>

                    {/* Dates */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="startDate">
                          Start Date<span className="required">*</span>
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          id="startDate"
                          value={values.startDate}
                          onChange={handleChange}
                        />
                        {errors.startDate && (
                          <div className="error">{errors.startDate}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="endDate">
                          End Date<span className="required">*</span>
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          id="endDate"
                          value={values.endDate}
                          onChange={handleChange}
                        />
                        {errors.endDate && (
                          <div className="error">{errors.endDate}</div>
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

                    {/* Submit Button */}
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        id="cancelModalBtn"
                        onClick={editCloseModal}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save
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
  );
};

export default Companies;
