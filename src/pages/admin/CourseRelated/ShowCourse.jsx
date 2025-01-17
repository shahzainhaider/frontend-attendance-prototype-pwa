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
import CheckIcon from "@mui/icons-material/Check";
import { MdDelete } from "react-icons/md";

const ShowCourses = () => {
  const campusId = JSON.parse(localStorage.getItem("user"))._id;
  const [openAddAndUpdateModal, setOpenAddAndUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [data, setData] = useState({ name: "", batchId: "", campusId });
  const [update, setUpdate] = useState(false);
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [addAlertOpen, setAddAlertOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [updateAlertOpen, setUpdateAlertOpen] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    getAllCourse();
    getAllBatches();
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
                getSingleCourse(id);
              }}
            >
              <FaRegEdit />
            </Button>
          </Grid>
        </>
      ),
    },
    {
      field: `batch`,
      width: 180,
      headerName: "Batch",
      align: "center",
    },
    {
      field: `name`,
      width: 180,
      headerName: "Course",
      align: "center",
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

  const getAllCourse = async () => {
    try {
      let res = await axios.get(`/getAllCourse/${campusId}`);
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCourse = async () => {
    try {
      await axios.post("/addCourse", data);
      await getAllCourse();
      setAddAlertOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleCourse = async (id) => {
    try {
      let res = await axios.get(`/getSingleCourse/${id}`);
      setData({ ...data, name: res.data.name, batchId: res.data.batchId });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCourse = async () => {
    try {
      await axios.patch(`/updateCourse/${id}`, data);
      await getAllCourse();
      setUpdateAlertOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async () => {
    try {
      await axios.delete(`/deleteCourse/${id}`);
      await getAllCourse();
      setDeleteAlertOpen(true);
      setOpenDeleteModal(false);
    } catch (error) {
      console.log(error);
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
        open={updateAlertOpen}
        autoHideDuration={2000}
        onClose={() => setUpdateAlertOpen(false)}
      >
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          onClose={() => setUpdateAlertOpen(false)}
          severity={"success"}
          sx={{ width: "100%" }}
        >
          Updated Successfully
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
      <div className="mx-10">
        <h2 className="text-4xl my-2 font-semibold">Courses</h2>
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
          rows={courses}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
          sx={{
            width: "100%",
            height: "35em",
            marginTop: 2,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "green",
              color: "black",
            },
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
              gridTemplateRows: "2fr 2fr",
            }}
          >
            <h2 className="text-4xl">
              {update ? "Update Course" : "Add Course"}
            </h2>

            <div className="flex gap-10 mb-6">
              <TextField
                fullWidth
                select
                label="Select batch"
                value={data.batchId}
                onChange={(e) => setData({ ...data, batchId: e.target.value })}
              >
                {batches.map((e, id) => (
                  <MenuItem key={id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="flex gap-10 mb-6 w-full">
              <TextField
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                fullWidth
                id="outlined-basic"
                label="Enter course name"
                variant="outlined"
              />
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
                onClick={() => {
                  if (update) {
                    updateCourse().then(() => {
                      setOpenAddAndUpdateModal(false);
                      setUpdateAlertOpen(true);
                    });
                  } else {
                    addCourse().then(() => {
                      setOpenAddAndUpdateModal(false);
                      setAddAlertOpen(true);
                    });
                  }
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
              gridTemplateRows: "2fr 2fr",
            }}
          >
            <h2>Do you want to delete this course?</h2>
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Button onClick={deleteCourse} variant="contained">
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

export default ShowCourses;
