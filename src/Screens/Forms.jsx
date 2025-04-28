import React from "react";
import Header from "../Reuseable/Header";
import SidebarAdmin from "../Reuseable/SidebarAdmin";

const Forms = () => {
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
                <li className="breadcrumb-item">Home</li>
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
                    <i className="fas fa-ellipsis-v"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="checkbox-col">
                    <input type="checkbox" />
                  </td>
                  <td>
                    <i className="fas fa-clipboard-list icon-form"></i> Daily
                    Task List
                  </td>
                  <td>12</td>
                  <td>12/03/2025</td>
                  <td className="actions-col">
                    <i className="fas fa-ellipsis-v"></i>
                  </td>
                </tr>
                <tr>
                  <td className="checkbox-col">
                    <input type="checkbox" />
                  </td>
                  <td>
                    <i className="fas fa-chart-bar icon-form"></i> Bowel Chart
                  </td>
                  <td>12</td>
                  <td>14/03/2025</td>
                  <td className="actions-col">
                    <i className="fas fa-ellipsis-v"></i>
                  </td>
                </tr>
                <tr>
                  <td className="checkbox-col">
                    <input type="checkbox" />
                  </td>
                  <td>
                    <i className="fas fa-tint icon-form"></i> Blood Glucose
                    Chart
                  </td>
                  <td>12</td>
                  <td>14/03/2025</td>
                  <td className="actions-col">
                    <i className="fas fa-ellipsis-v"></i>
                  </td>
                </tr>
                <tr>
                  <td className="number-col">4</td>
                  <td>
                    <i className="fas fa-brain icon-form"></i> Behaviour Chart
                  </td>
                  <td>12</td>
                  <td>14/03/2025</td>
                  <td className="actions-col">
                    <i className="fas fa-ellipsis-v"></i>
                  </td>
                </tr>
                <tr>
                  <td className="number-col">5</td>
                  <td>
                    <i className="fas fa-bed icon-form"></i> Sleep Chart
                  </td>
                  <td>12</td>
                  <td>14/03/2025</td>
                  <td className="actions-col">
                    <i className="fas fa-ellipsis-v"></i>
                  </td>
                </tr>
                <tr>
                  <td className="number-col">6</td>
                  <td>
                    <i className="fas fa-pump-soap icon-form"></i> Hygiene Chart
                  </td>
                  <td>12</td>
                  <td>14/03/2025</td>
                  <td className="actions-col">
                    <i className="fas fa-ellipsis-v"></i>
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
