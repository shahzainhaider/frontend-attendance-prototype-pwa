import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ShowClass = () => {
  const navigate = useNavigate();
  const campusId = JSON.parse(localStorage.getItem("user"))._id;
  const [openAddAndUpdateModal, setOpenAddAndUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [data, setData] = useState({
    days: [],
    timing: [],
    batchId: "",
    courseId: "",
    campusId,
  });
  const [update, setUpdate] = useState(false);
  const [batches, setBatches] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [Classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllClasses();
    getAllBatches();
    getAllCourses();
  }, []);

  const columns = [
    {
      field: "action",
      width: 200,
      headerName: "Action",
      align: "center",
      renderCell: (params) => (
        <Grid container spacing={1}>
          <Grid item>
            <Button
              color="error"
              onClick={() => {
                setId(params.row.id);
                setOpenDeleteModal(true);
              }}
            >
              <MdDelete style={{ fontSize: "larger" }} />
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="success"
              onClick={() => {
                setOpenAddAndUpdateModal(true);
                setUpdate(true);
                setId(params.row.id);
              }}
            >
              <FaRegEdit />
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      field: "batch",
      width: 180,
      headerName: "batch",
      align: "left",
    },
    {
      field: "course",
      width: 180,
      headerName: "Course",
      align: "left",
    },
    {
      field: "days",
      headerName: "Days",
      flex: 1,
      // width: 180,
      align: "left",
      renderCell: (params) => (
        <p >
        {params.row.days.join(", ")}
      </p>
      ),
    },
    {
      field: "timing",
      headerName: "Timing",
      width: 180,
      flex:1,
      align: "left",
      renderCell: (params) => (
        <p>{params.row.timing.join(" To ")}</p>
      ),
    },
  ];

  const getAllBatches = async () => {
    try {
      let res = await axios.get(`/getAllBatch/${campusId}`);
      setBatches(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCourses = async () => {
    try {
      let res = await axios.get(`/getAllCourse/${campusId}`);
      setCourses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllClasses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/getClasses/${campusId}`);
      console.log(res.data)
      setClasses(res.data.reverse());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const convertTo12HourFormat = (time24hr) => {
    const [hours, minutes] = time24hr.split(':');
    let period = 'AM';
    let hours12 = parseInt(hours, 10);
  
    if (hours12 > 12) {
      hours12 -= 12;
      period = 'PM';
    } else if (hours12 === 12) {
      period = 'PM';
    } else if (hours12 === 0) {
      hours12 = 12; // 12 AM
    }
  
    return `${hours12}:${minutes} ${period}`;
  };

  const handleAddClass = async () => {
  const startTime12hr = convertTo12HourFormat(startTime);
  const endTime12hr = convertTo12HourFormat(endTime);

  console.log(startTime12hr , endTime12hr)

  try {
    await axios.post(`/addClass`, { ...data, timing: [startTime12hr, endTime12hr] });
      setData({
        days: [],
        timing: [],
        batchId: "",
        courseId: "",
        campusId,
      });
      getAllClasses();
      setAlertMessage("Class added successfully!");
      setAlertSeverity("success");
      setAlertOpen(true);
    } catch (error) {
      setAlertMessage("Error adding class!");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleDeleteClass = async () => {
    try {
      await axios.delete(`/deleteClass/${id}`);
      getAllClasses();
      setAlertMessage("Class deleted successfully!");
      setAlertSeverity("success");
      setAlertOpen(true);
    } catch (error) {
      setAlertMessage("Error deleting class!");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const options = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];


  return (
    <>
      <div className="mx-10">
        <h2 className="text-4xl my-2 font-semibold">Classes</h2>
        <Button
          variant="outlined"
          onClick={() => setOpenAddAndUpdateModal(true)}
        >
          <FaPlus className="mx-2" />
          Add
        </Button>

        <DataGrid
          className="bg-white"
          rows={Classes}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          loading={loading}
          sx={{
            width: "100%",
            height: "35em",
            marginTop: 2,
          }}
        />

        {/* ADDING CLASS MODAL */}
        <Modal
          open={openAddAndUpdateModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              width: "50%",
              p: 5,
              display: "grid",
              justifyContent: "center",
              border: "3px solid",
              borderColor: "primary.main",
              borderRadius: "50px 0% 50px 0%",
              gridTemplateRows: "2fr 2fr",
            }}
          >
            <Typography variant="h4" component="h2">
              {update ? "Update Class" : "Add Class"}
            </Typography>

            {/* Form Inputs */}
            <div className="flex gap-20">{/* Add more fields as needed */}</div>
            <div className="flex gap-10 mb-6">

              <FormControl fullWidth >
                <InputLabel id="mutiple-checkbox-label">Select Days</InputLabel>
                <Select
                  labelId="mutiple-checkbox-label"
                  id="mutiple-checkbox"
                  multiple
                  value={data.days}
                  onChange={(e) => setData({ ...data, days: e.target.value })}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={data.days.indexOf(option) > -1} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="flex mb-6 gap-6">
              {/*  */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker  onChange={(e)=>setStartTime(`${e.hour()}:${e.minute()}`)} label="Start Time" />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker onChange={(e)=>setEndTime(`${e.hour()}:${e.minute()}`)} label="End Time" />
              </LocalizationProvider>
            </div>

            <div className="flex gap-6">
              <TextField
                fullWidth
                select
                label="Select Batch"
                value={data.batchId}
                onChange={(e) => setData({ ...data, batchId: e.target.value })}
              >
                {batches.map((batch) => (
                  <MenuItem key={batch.id} value={batch.id}>
                    {batch.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                label="Select Course"
                value={data.courseId}
                onChange={(e) => setData({ ...data, courseId: e.target.value })}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            

            {/* Buttons */}
            <div
              className="mt-6"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Button
                onClick={handleAddClass}
                variant="contained"
                sx={{ width: "100%" }}
              >
                ADD
              </Button>
              <Button
                sx={{ width: "100%" }}
                color="error"
                onClick={() => {
                  setUpdate(false);
                  setOpenAddAndUpdateModal(false);
                }}
              >
                cancel
              </Button>
            </div>
          </Paper>
        </Modal>

        {/* DELETE CONFIRMATION MODAL */}
        <Modal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              width: "30%",
              p: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "3px solid",
              borderColor: "error.main",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h6" component="h2">
              Are you sure you want to delete this class?
            </Typography>
            <div className="flex justify-end mt-4 gap-4">
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteClass}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Paper>
        </Modal>

        {/* ALERT SNACKBAR */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={() => setAlertOpen(false)}
        >
          <Alert
            onClose={() => setAlertOpen(false)}
            severity={alertSeverity}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default ShowClass;
