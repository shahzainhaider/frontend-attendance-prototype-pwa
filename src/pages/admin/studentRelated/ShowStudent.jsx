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
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ShowStudents = () => {
  const campusId = JSON.parse(localStorage.getItem("user"))._id;
  const [openAddAndUpdateModal, setOpenAddAndUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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

  useEffect(() => {
    getAllStudents()
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
                let id = params.row.id;
                // getSingleQualification(id);
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
    // {
    //   field: `batch`,
    //   width: 180,
    //   headerName: "Batch",
    //   align: "center",
    // },
    // {
    //   field: `batch`,
    //   width: 180,
    //   headerName: "Batch",
    //   align: "center",
    // },
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

  const getAllStudents = async ()=>{
    try {
      const res = await axios.get(`/getStudents/${campusId}`)
      setStudents(res.data)
      
    } catch (error) {
      console.log(error.response)
      
    }
  }





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

  return (
    <>
      <div className="mx-10">
        <h2 className="text-4xl my-2 font-semibold">Students</h2>
        <Button
          variant="outlined"
          className=""
          onClick={() => setOpenAddAndUpdateModal(!openAddAndUpdateModal)}
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

        {/* ADDING QUALIFICATION MODAL */}

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
            <h2 className="text-4xl">
              {update ? "Update Student" : "Add Student"}
            </h2>

            {/* Inputs start here */}
            <div className="flex gap-20">
              <div className="flex gap-10 mb-6">
                <TextField
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  fullWidth
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                />
              </div>
              <div className="flex gap-10 mb-6">
                <TextField
                  value={data.contact}
                  onChange={(e) =>
                    setData({ ...data, contact: e.target.value })
                  }
                  fullWidth
                  id="outlined-basic"
                  label="Contact no"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="flex gap-10 mb-6">
              <TextField
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
            </div>
            <div className="flex gap-10 mb-6">
              <TextField
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                fullWidth
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
            </div>
            <div className="flex gap-6">
              <div className="flex gap-10 mb-6 w-full">
                <TextField
                  fullWidth
                  select
                  label="Select Batch"
                  value={data.batchId}
                  onChange={(e) =>
                    setData({ ...data, batchId: e.target.value })
                  }
                >
                  {batches.map((batch) => (
                    <MenuItem key={batch.id} value={batch.id}>
                      {batch.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="flex gap-10 mb-6 w-full">
                <TextField
                  fullWidth
                  select
                  label="Select Course"
                  value={data.courseId}
                  onChange={(e) =>
                    setData({ ...data, courseId: e.target.value })
                  }
                >
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            {/* Inputs end here */}

            <div
              style={{
                overflow: "hidden",
                width: "160px",
                height: "160px",
                gridTemplateColumns: "1fr",
                placeContent: "center",
                borderRadius: "0.375rem",
                border: "1px dashed #a0a0a0",
                position: "relative",
                marginBottom: "1.5rem",
              }}
            >
              <input
                ref={imgFileRef}
                style={{ display: "none" }}
                type="file"
                id="imgFile"
                onChange={handleFileChange}
              />
              <label
                style={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                htmlFor="imgFile"
              >
                {data.image ? (
                  <img
                    name="studentImg"
                    className="  w-full h-full object-cover"
                    src={data.image}
                    alt="img"
                  />
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
                    className="h-20 w-20"
                  />
                )}
              </label>
            </div>

            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Button
                onClick={handleAddStudent}
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

        {/* DELETE MODAL */}
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
              gridTemplateRows: "2fr 2fr",
            }}
          >
            <h2>Do you want to delete this Qualification type?</h2>
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Button
                onClick={"deleteQualification"}
                variant="contained"
                // sx={{ width: "50%"}}
              >
                YES
              </Button>
              <Button
                // sx={{ width: "50%" }}
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

export default ShowStudents;
