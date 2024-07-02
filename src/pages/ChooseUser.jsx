import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Backdrop, Snackbar } from "@mui/material";
import { AccountCircle, School, Group } from "@mui/icons-material";
import Popup from "../components/Popup";

const ChooseUser = ({ visitor }) => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  return (
    <div className="bg-gradient-to-b from-[#0364b0] to-[#98cc3b] h-screen flex justify-center p-8 ">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        color="#0364b0"
        autoHideDuration={2000}
        onClose={() => setAlert(false)}
        message="To be added in future"
        // key={vertical + horizontal}
      />
      <div className="container flex justify-center items-center max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 text-white p-6 text-center rounded-2xl cursor-pointer hover:bg-[#0364b0]  duration-300">
            <AccountCircle fontSize="large" />
            <h2 className="my-2 text-xl font-bold">Admin</h2>
            Login as an administrator to access the dashboard to manage app
            data.
          </div>
          <div className="bg-gray-800 text-white p-6 text-center rounded-2xl cursor-pointer hover:bg-[#0364b0] duration-300">
            <School fontSize="large" />
            <h2 className="my-2 text-xl font-bold">Student</h2>
            Login as a student to explore course materials and assignments.
          </div>
          <div className="bg-gray-800 text-white p-6 text-center rounded-2xl cursor-pointer h hover:bg-[#0364b0] duration-300">
            <Group fontSize="large" />
            <h2 className="my-2 text-xl font-bold">Teacher</h2>
            Login as a teacher to create courses, assignments, and track student
            progress.
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup />
    </div>
  );
};

export default ChooseUser;
