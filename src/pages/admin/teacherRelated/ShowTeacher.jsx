import {
  Button,
  Grid,
  MenuItem,
  Modal,
  Paper,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ShowTeacher = () => {
  const campusId = JSON.parse(localStorage.getItem("user"))._id;
  const [openAddAndUpdateModal, setOpenAddAndUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    batchId: "",
    courseId: "",
    campusId,
  });
  const [update, setUpdate] = useState(false);
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [addAlertOpen, setAddAlertOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [updateAlertOpen, setUpdateAlertOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [id, setId] = useState(null);

  useEffect(() => {
    getAllTeachers();
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
        <>
          <Grid columnSpacing={{ xs: 5, sm: 5, md: 5 }}>
            <Button
              color="error"
              onClick={() => {
                setId(params.row.id);
                setOpenDeleteModal(!openDeleteModal);
              }}
            >
              <MdDelete style={{ fontSize: "larger" }} />
            </Button>
            <Button
              color="success"
              onClick={() => {
                setOpenAddAndUpdateModal(true);
                setUpdate(true);
                setId(params.row.id);
                getSingleTeacher(params.row.id);
              }}
            >
              <FaRegEdit />
            </Button>
          </Grid>
        </>
      ),
    },
    {
      field: "batch",
      width: 180,
      headerName: "Batch",
      align: "left",
    },
    {
      field: "course",
      width: 180,
      headerName: "Course",
      align: "left",
    },
    {
      field: "name",
      width: 180,
      headerName: "Name",
      align: "left",
    },
  ];

  const getAllBatches = async () => {
    try {
      let res = await axios.get(`/getAllBatch/${campusId}`);
      setBatches(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCourses = async () => {
    try {
      let res = await axios.get(`/getAllCourse/${campusId}`);
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTeachers = async () => {
    try {
      let res = await axios.get(`/getAllTeachers/${campusId}`);
      setTeachers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTeacher = async () => {
    setUpdateAlertOpen(true); // Show update alert
    try {
      await axios.patch(`/updateTeacher/${id}`, data);
      getAllTeachers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeacher = async () => {
    try {
      setDeleteAlertOpen(true); // Show delete alert
      setOpenDeleteModal(false);
      await axios.delete(`/api/deleteTeacher/${id}`);
      getAllTeachers();
    } catch (error) {
      console.log(error);
    }
  };

  const addTeacher = async () => {
    try {
      setAddAlertOpen(true); // Show add alert
      await axios.post("/TeacherReg", data);
      getAllTeachers();
     
      setOpenAddAndUpdateModal(false); // Close the modal after adding a teacher
      setData({
        name: "",
        email: "",
        password: "",
        batchId: "",
        courseId: "",
        campusId,
      }); // Clear the form
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleTeacher = async (id) => {
    try {
      let res = await axios.get(`/getSingleTeacher/${id}`);
      setData({
        name: res.data.name,
        email: res.data.email,
        password: res.data.password,
        batchId: res.data.batchId,
        courseId: res.data.courseId,
        campusId: res.data.campusId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddButtonClick = () => {
    if (batches.length === 0 || courses.length === 0) {
      setAlertMessage("Please create batches and courses first.");
      setAlertSeverity("warning");
      setAlertOpen(true);
    } else {
      setOpenAddAndUpdateModal(true);
    }
  };

  return (
    <>
      <Snackbar
        open={addAlertOpen}
        autoHideDuration={2000}
        onClose={() => setAddAlertOpen(false)}
      >
        <Alert
          onClose={() => setAddAlertOpen(false)}
          severity={"success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successfully added
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteAlertOpen}
        autoHideDuration={2000}
        onClose={() => setDeleteAlertOpen(false)}
      >
        <Alert
          onClose={() => setDeleteAlertOpen(false)}
          severity={"error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successfully deleted
        </Alert>
      </Snackbar>
      <Snackbar
        open={updateAlertOpen}
        autoHideDuration={2000}
        onClose={() => setUpdateAlertOpen(false)}
      >
        <Alert
          onClose={() => setUpdateAlertOpen(false)}
          severity={"info"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successfully updated
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <div className="mx-10">
        <h2 className="text-4xl my-2 font-semibold">Teachers</h2>
        <Button
          variant="outlined"
          onClick={handleAddButtonClick}
        >
          <FaPlus className="mx-2" />
          Add
        </Button>

        <DataGrid
          className="bg-white"
          rows={teachers}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          sx={{
            width: "100%",
            height: "35em",
            marginTop: 2,
          }}
        />

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
              width: "30%",
              p: 5,
              display: "grid",
              justifyContent: "center",
              border: "3px solid",
              borderColor: "primary.main",
              borderRadius: "50px 0% 50px 0%",
            }}
          >
            <h2 className="text-4xl">
              {update ? "Update Teacher" : "Add Teacher"}
            </h2>

            <div className="flex flex-col gap-10 mb-6">
              <TextField
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                fullWidth
                id="outlined-basic"
                label="Enter name"
                variant="outlined"
              />
              <TextField
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                fullWidth
                id="outlined-basic"
                label="Enter email"
                variant="outlined"
              />
              <TextField
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                fullWidth
                id="outlined-basic"
                label="Enter password"
                variant="outlined"
              />
              <TextField
                fullWidth
                select
                label="Select batch"
                value={data.batchId}
                onChange={(e) => setData({ ...data, batchId: e.target.value })}
              >
                {batches.map((batch) => (
                  <MenuItem key={batch._id} value={batch._id}>
                    {batch.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                label="Select course"
                value={data.courseId}
                onChange={(e) => setData({ ...data, courseId: e.target.value })}
              >
                {courses.map((course) => (
                  <MenuItem key={course._id} value={course._id}>
                    {course.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Button
                onClick={() => {
                  if (update) {
                    updateTeacher();
                  } else {
                    addTeacher();
                  }
                  setOpenAddAndUpdateModal(false);
                }}
                variant="contained"
                sx={{ width: "100%" }}
              >
                {update ? "UPDATE" : "ADD"}
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
              width: "60%",
              p: 5,
              display: "grid",
              justifyContent: "center",
              border: "3px solid",
              borderColor: "primary.main",
              borderRadius: "50px 0% 50px 0%",
            }}
          >
            <h2>Do you want to delete this teacher?</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Button onClick={deleteTeacher} variant="contained">
                YES
              </Button>
              <Button
                color="error"
                onClick={() => {
                  setOpenDeleteModal(false);
                }}
              >
                cancel
              </Button>
            </div>
          </Paper>
        </Modal>
      </div>
    </>
  );
};

export default ShowTeacher;
