import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { GreenButton } from "../components/buttonStyles.jsx";

const Homepage = () => {
  const currentUser =  (JSON.parse(localStorage.getItem("user")) || {}) || null;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={Logo} alt="Logo" />
      <div className="flex items-center max-w-4xl gap-4">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-4xl text-center font-bold text-gray-900">
            Attendance Management System
          </h1>
          <p className="text-2xl">
          Introducing our cutting-edge Attendance Management System, designed to make attendance tracking effortless and reliable. Whether you're online or offline, our system ensures seamless operation, allowing you to mark attendance anytime, anywhere.  
          </p>
          <div className="flex my-4 items-center gap-4">
            <Link to="/choose" className="w-full">
              <GreenButton variant="contained">Login</GreenButton>
            </Link>
          </div>
          <p>
            Don't have an account?{" "}
            <Link to="/Adminregister" className="text-[#0a73be]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
