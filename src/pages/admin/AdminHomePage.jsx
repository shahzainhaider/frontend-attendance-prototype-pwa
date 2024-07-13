import { Button, CircularProgress, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useSpeechSynthesis } from "react-speech-kit";
import { FaRegEdit } from "react-icons/fa";
import moment from 'moment-timezone';
import { MdDelete } from "react-icons/md";
import axios from "axios";

const AdminHomePage = () => {
  const { speak } = useSpeechSynthesis();
  const [showScanner, setShowScanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dailyAttendance, setDailyAttendance] = useState([]);

  useEffect(() => {
    getDailyAttendance();
  }, []);

  const columns = [
    {
      field: "action",
      width: 200,
      headerName: "Action",
      align: "center",
      renderCell: (params) => (
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Button
              color="error"
              onClick={() => {
                // setId(params.row.id);
                // setOpenDeleteModal(!openDeleteModal);
              }}
            >
              <MdDelete style={{ fontSize: "larger" }} />
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="success"
              onClick={() => {
                // setOpenAddAndUpdateModal(true);
                // setUpdate(true);
                // setId(params.row.id);
                let id = params.row.id;
                // getSingleBatch(id);
              }}
            >
              <FaRegEdit />
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      field: "rollNum",
      width: 180,
      headerName: "Roll Number",
      align: "center",
    },
    {
      field: "name",
      width: 180,
      headerName: "Name",
      align: "center",
    },
    {
      field: "batch",
      width: 180,
      headerName: "Batch",
      align: "center",
    },
    {
      field: "course",
      width: 180,
      headerName: "Course",
      align: "center",
    },
    {
      field: "time",
      width: 180,
      headerName: "Time",
      align: "center",
    },
    {
      field: "attendance",
      width: 180,
      headerName: "Attendance",
      align: "center",
    },
  ];

  useEffect(() => {
    if (showScanner) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        /* verbose= */ false
      );

      scanner.render(
        (decodedText, decodedResult) => {
          handleApiCall(decodedText);
          scanner.clear();
          setShowScanner(false);
          console.log(`QR Code Data: ${decodedText}`);
        },
        (errorMessage) => {
          console.log(`QR Code no match: ${errorMessage}`);
        }
      );

      return () => {
        scanner.clear();
      };
    }
  }, [showScanner]);

  const getDailyAttendance = async () => {
    try {
      setLoading(true)
      let res = await axios.get("/getDailyAttendance");
      setDailyAttendance(res.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };

  const handleScan = () => {
    setShowScanner(true);
  };

  const handleApiCall = (decodedText) => {
    let data = JSON.parse(decodedText);
    const currentDate = moment().tz("Asia/Karachi").format(); // Get current date in PST
    console.log('date:', currentDate);

    axios
      .post(`/addDailyAttendance`, {
        ...data,
        date: currentDate,
        attendanceStatus: "Present",
      })
      .then((response) => {
        speak({ text: response.data.message });
        getDailyAttendance();
      })
      .catch((error) => {
        console.error("API error:", error.response.data.message);
      });
  };

  return (
    <div className="mx-10">
      <div className="flex justify-between">
        <h1 className="text-5xl font-semibold mx-4">Daily Attendance</h1>
        <Button variant="contained" color="primary" onClick={handleScan}>
          Open QR Code Scanner
        </Button>
      </div>
      {showScanner && <div id="reader" className="w-96" />}
      {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <DataGrid
            className="bg-white"
            rows={dailyAttendance}
            columns={columns}
            pageSize={5}
            slots={{ toolbar: GridToolbar }}
            getRowClassName={(params)=>
              params.row.attendance === "Present" ? 'bg-green-100':'bg-red-100'
            }
            rowsPerPageOptions={[5, 10, 20]}
            // autoHeight
            sx={{
              marginTop:'30px',
              height:'40rem'
            }}
          />
        )}
    </div>
  );
};

export default AdminHomePage;
