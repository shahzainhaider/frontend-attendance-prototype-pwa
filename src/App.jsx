import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import ChooseUser from "./pages/ChooseUser.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminRegisterPage from "./pages/admin/AdminRegisterPage.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import axios from "axios";

axios.defaults.baseURL = 'https://api-attendance-management-system.vercel.app'
// axios.defaults.baseURL = 'http://localhost:5000'
const App = () => {
  const [role , setRole] = useState(JSON.parse(localStorage.getItem("user"))?.role || null)
  return (
    <>
      <Router>
        {!role  && (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/choose" element={<ChooseUser visitor="normal" />} />
            <Route
              path="/chooseasguest"
              element={<ChooseUser visitor="guest" />}
            />

            <Route path="/Adminlogin" element={<LoginPage role="Admin" setRole={setRole} />} />
            <Route
              path="/Studentlogin"
              element={<LoginPage role="Student" />}
            />
            <Route
              path="/Teacherlogin"
              element={<LoginPage role="Teacher" />}
            />

            <Route path="/Adminregister" element={<AdminRegisterPage />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}

        {role === "Admin" && (
          <>
            <AdminDashboard />
          </>
        )}

        {/* {currentRole === "Student" &&
        <>
          <StudentDashboard />
        </>
      }

      {currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        </>
      } */}
      </Router>
    </>
  );
};

export default App;
