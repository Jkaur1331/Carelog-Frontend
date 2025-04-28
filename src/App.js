import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Dashboard from "./Screens/Dashboard";
import Participant from "./Screens/Participant";
import Profile from "./Screens/Profile";
import AdminDashboard from "./Screens/AdminDashboard";
import Companies from "./Screens/Companies";
import CompanyProfile from "./Screens/CompanyProfile";
import Forms from "./Screens/Forms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/participant" element={<Participant />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/forms" element={<Forms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
