import React from "react";
import Header from "../Reuseable/Header";
import SidebarAdmin from "../Reuseable/SidebarAdmin";
import daily from "../images/daily.svg";
import sleep from "../images/sleep.svg";
import behave from "../images/behave.svg";
import bowel from "../images/bowel.svg";
import hygiene from "../images/hygiene.svg";
import glucose from "../images/glucose.svg";
import { useNavigate } from "react-router-dom";
const Forms = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <SidebarAdmin current={"Forms"} />
      <div className="body-area">
        <Header />
        <div className="main-body">
          <div
            className="flex space-bw al-center"
            style={{
              marginBottom: "15px",
            }}
          >
            <nav className="breadcrumb-container">
              <ol className="breadcrumb-list">
                <li
                  className="breadcrumb-item"
                  onClick={() => navigate("/admin")}
                >
                  Home
                </li>
                <li className="breadcrumb-item active">Forms</li>
              </ol>
            </nav>
            <div className="search-bar">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <div className="table-forms">
            <table>
              <thead>
                <tr>
                  <th className="checkbox-col">
                    <input type="checkbox" className="header-checkbox" />
                  </th>
                  <th>Form Name</th>
                  <th>Companies Using</th>
                  <th>Created On</th>
                  <th className="actions-col">
                    <i className="fas fa-download"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="checkbox-col">
                    <span className="row-number">1</span>
                    <input type="checkbox" className="row-checkbox" />
                  </td>
                  <td className="flex al-center">
                    <img src={daily} alt="daily" />
                    Daily Task List
                  </td>
                  <td>12</td>
                  <td>12/03/2025</td>
                  <td className="actions-col">
                    <i className="fas fa-download"></i>
                  </td>
                </tr>
                <tr>
                  <td className="checkbox-col">
                    <span className="row-number">2</span>
                    <input type="checkbox" className="row-checkbox" />
                  </td>
                  <td className="flex al-center">
                    <img src={bowel} alt="bowel" /> Bowel Chart
                  </td>
                  <td>12</td>
                  <td>14/03/2025</td>
                  <td className="actions-col">
                    <i className="fas fa-download"></i>
                  </td>
                </tr>
                <tr>
                  <td className="checkbox-col">
                    <span className="row-number">3</span>
                    <input type="checkbox" className="row-checkbox" />
                  </td>
                  <td className="flex al-center">
                    <img src={glucose} alt="glucose" /> Blood Glucose Chart
                  </td>
                  <td>12</td>
                  <td>14/03/2025</td>
                  <td className="actions-col">
                    <i className="fas fa-download"></i>
                  </td>
                </tr>
                <tr>
                  <td className="checkbox-col">
                    <span className="row-number">4</span>
                    <input type="checkbox" className="row-checkbox" />
                  </td>
                  <td className="flex al-center">
                    <img src={behave} alt="behave" /> Behaviour Chart
                  </td>
                  <td>12</td>
                  <td>14/03/2025</td>
                  <td className="actions-col">
                    <i className="fas fa-download"></i>
                  </td>
                </tr>
                <tr>
                  <td className="checkbox-col">
                    <span className="row-number">5</span>
                    <input type="checkbox" className="row-checkbox" />
                  </td>
                  <td className="flex al-center">
                    <img src={sleep} alt="sleep" /> Sleep Chart
                  </td>
                  <td>12</td>
                  <td>14/03/2025</td>
                  <td className="actions-col">
                    <i className="fas fa-download"></i>
                  </td>
                </tr>
                <tr>
                  <td className="checkbox-col">
                    <span className="row-number">6</span>
                    <input type="checkbox" className="row-checkbox" />
                  </td>
                  <td className="flex al-center">
                    <img src={hygiene} alt="hygiene" /> Hygiene Chart
                  </td>
                  <td>12</td>
                  <td>14/03/2025</td>
                  <td className="actions-col">
                    <i className="fas fa-download"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
