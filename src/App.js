import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Dashboard from "./Screens/Dashboard";
import Participant from "./Screens/Participant";
import Profile from "./Screens/Profile";
import AdminDashboard from "./Screens/AdminDashboard";
import Companies from "./Screens/Companies";
import CompanyProfile from "./Screens/CompanyProfile";
import Forms from "./Screens/Forms";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import FormsAdmin from "./Screens/FormsAdmin";
import { useAtom } from "jotai";
import { globalUserType } from "./JotaiStore";
import ForgotPassword from "./Screens/ForgotPassword";
import ResetPassword from "./Screens/ResetPassword";

function App() {
  const [globalUserTypeAtom] = useAtom(globalUserType);
  const userType = localStorage.getItem("userType") || globalUserTypeAtom;
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          className="custom-toast-container"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route
            path="/login"
            element={
              userType === "Admin" ? (
                <Navigate to="/" replace />
              ) : userType === "Super Admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Login />
              )
            }
          />
          {userType === "Admin" && (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/participant" element={<Participant />} />
              <Route path="/adminform" element={<FormsAdmin />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}

          {userType === "Super Admin" && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/company-profile" element={<CompanyProfile />} />
            </>
          )}
          {userType == null && (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
