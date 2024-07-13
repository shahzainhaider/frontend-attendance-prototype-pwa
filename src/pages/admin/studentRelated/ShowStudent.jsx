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
  CircularProgress, // Import CircularProgress for the loader
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FaPlus, FaRegEdit, FaUser } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ShowStudents = () => {
  const navigate = useNavigate()
  const campusId = JSON.parse(localStorage.getItem("user"))._id;
  const [openAddAndUpdateModal, setOpenAddAndUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false); // State to toggle attendance table
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    batchId: "",
    courseId: "",
    contact: null,
    image: null,
    campusId,
  });
  const [update, setUpdate] = useState(false);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [id, setId] = useState(null);
  const imgFileRef = useRef(null);
  const [attendance, setAttendance] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading status
  const studentId = JSON.parse(localStorage.getItem("user")).id;
  
  useEffect(() => {
    getAllStudents();
    getAllBatches();
    getAllCourses();
  }, []);


  useEffect(() => {
    if (selectedMonth !== "") {
      getStudentMonthlyAttendance(studentId, selectedMonth);
    }
  }, [selectedMonth, studentId]);

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
                let id = params.row.id;
              }}
            >
              <FaRegEdit />
            </Button>
          </Grid>
        </>
      ),
    },
    {
      field: `rollNum`,
      width: 180,
      headerName: "Roll Number",
      align: "center",
    },
    {
      field: `name`,
      width: 180,
      headerName: "Name",
      align: "center",
    },
    {
      field: 'details',
      headerName: 'Details',
      width: 180,
      align: 'left',
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CgMenuGridO />}
          onClick={() =>{
            navigate(`/Admin/students/attendance/${params.row.id}`)
          }}
        >
          Attendance
        </Button>
      )
    }
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

  const getAllStudents = async () => {
    try {
      const res = await axios.get(`/getStudents/${campusId}`);
      setStudents(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleAddStudent = async () => {
    console.log(data);
    try {
      await axios.post(`/StudentReg`, data);
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
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  return (
    <div className="mx-10">
      <h2 className="text-4xl my-2 font-semibold">Students</h2>
      <Button
        variant="outlined"
        onClick={() => setOpenAddAndUpdateModal(!openAddAndUpdateModal)}
        style={{ marginRight: "8px" }}
      >
        <FaPlus className="mx-2" />
        Add
      </Button>

      <DataGrid
        className="bg-white"
        rows={students}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        sx={{
          width: "100%",
          height: "35em",
          marginTop: 2,
        }}
      />


      {/* ADDING STUDENT MODAL */}
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
      <h2 className="text-3xl text-center font-semibold">
        {update ? "Update Student" : "Add Student"}
      </h2>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Name"
              fullWidth
              value={data.name}
              onChange={(e) =>
                setData({ ...data, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              fullWidth
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Contact"
              fullWidth
              value={data.contact}
              onChange={(e) =>
                setData({ ...data, contact: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="batch-label">Batch</InputLabel>
              <Select
                labelId="batch-label"
                value={data.batchId}
                onChange={(e) =>
                  setData({ ...data, batchId: e.target.value })
                }
              >
                {batches.map((batch) => (
                  <MenuItem key={batch._id} value={batch._id}>
                    {batch.batchName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="course-label">Course</InputLabel>
              <Select
                labelId="course-label"
                value={data.courseId}
                onChange={(e) =>
                  setData({ ...data, courseId: e.target.value })
                }
              >
                {courses.map((course) => (
                  <MenuItem key={course._id} value={course._id}>
                    {course.courseName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => imgFileRef.current.click()}
            >
              Upload Image
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={imgFileRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          marginTop={2}
          gap={2}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddStudent}
          >
            {update ? "Update" : "Add"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenAddAndUpdateModal(false)}
          >
            Cancel
          </Button>
        </Grid>
      </form>
    </Paper>
  </Modal>

  {/* DELETE STUDENT MODAL */}
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
        width: "30%",
        p: 5,
        display: "grid",
        justifyContent: "center",
        border: "3px solid",
        borderColor: "primary.main",
        borderRadius: "50px 0% 50px 0%",
        gridTemplateRows: "2fr 2fr",
      }}
    >
      <h2 className="text-2xl text-center font-semibold">
        Confirm Delete
      </h2>
      <Grid
        container
        justifyContent="center"
        marginTop={2}
        gap={2}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            console.log(`Deleting student with id ${id}`);
            setOpenDeleteModal(false);
          }}
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
      </Grid>
    </Paper>
  </Modal>
</div>
);
};

export default ShowStudents;