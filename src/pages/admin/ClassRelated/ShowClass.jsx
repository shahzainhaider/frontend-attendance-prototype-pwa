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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
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
    timing: "",
    batchId: "",
    courseId: "",
    campusId,
  });
  const [update, setUpdate] = useState(false);
  const [batches, setBatches] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [Classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [id, setId] = useState(null);
  const imgFileRef = useRef(null);
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
      field: "details",
      headerName: "Details",
      width: 180,
      align: "left",
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CgMenuGridO />}
          onClick={() => {
            navigate(`/Admin/Classes/attendance/${params.row.id}`);
          }}
        >
          Attendance
        </Button>
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
      setClasses(res.data.reverse());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const handleAddClass = async () => {
    console.log(data);
    return;
    try {
      await axios.post(`/ClassReg`, data);
      setData({
        name: "",
        email: "",
        password: "",
        batchId: "",
        courseId: "",
        contact: null,
        image: null,
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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
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

  // const [selectedOptions, setSelectedOptions] = useState([]);

  // const handleChange = (event) => {
  // console.log(event.target.value)

  //   const {
  //     target: { value },
  //   } = event;
  //   setSelectedOptions(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  //   console.log(selectedOptions)
  // };

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

        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            className="bg-white"
            rows={Classes}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            sx={{
              width: "100%",
              height: "35em",
              marginTop: 2,
            }}
          />
        )}

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
              {/* <TextField
                value={data.days}
                onChange={(e) => setData({ ...data, days: e.target.value })}
                fullWidth
                id="outlined-basic"
                label="Days"
                variant="outlined"
              /> */}

              <FormControl fullWidth >
                <InputLabel id="mutiple-checkbox-label">Select Days</InputLabel>
                <Select
                  labelId="mutiple-checkbox-label"
                  id="mutiple-checkbox"
                  multiple
                  value={data.days}
                  onChange={(e) => setData({ ...data, days: e.target.value })}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
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
                  <TimePicker value={startTime} onChange={(e)=>setStartTime(e.target.value)} label="Basic time picker" />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker value={endTime} onChange={(e)=>setEndTime(e.target.value)} label="Basic time picker" />
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

        {/* DELETE CLASS MODAL */}
        <Modal
          open={openDeleteModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              width: "40%",
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
              Are you sure you want to delete this class?
            </Typography>
            <div className="flex justify-self-center self-center my-3">
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteClass}
              >
                Delete
              </Button>
              <Button
                className="ml-2"
                variant="contained"
                color="primary"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Paper>
        </Modal>

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
