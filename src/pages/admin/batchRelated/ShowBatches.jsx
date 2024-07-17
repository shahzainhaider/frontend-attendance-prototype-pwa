import {
  Button,
  Grid,
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

const ShowBatches = () => {
  const campusId = JSON.parse(localStorage.getItem("user"))._id;
  const [openAddAndUpdateModal, setOpenAddAndUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [data, setData] = useState({ name: "", campusId });
  const [update, setUpdate] = useState(false);
  const [batches, setBatches] = useState([]);
  const [id, setId] = useState(null);
  const [addAlertOpen, setAddAlertOpen] = useState(false);
  const [updateAlertOpen, setUpdateAlertOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  useEffect(() => {
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
                getSingleBatch(id);
              }}
            >
              <FaRegEdit />
            </Button>
          </Grid>
        </>
      ),
    },
    {
      field: "name",
      width: 180,
      headerName: "Batch",
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

  const updateBatch = async () => {
    try {
      const updated = await axios.patch(`/updateBatch/${id}`, data);
      getAllBatches();
      setUpdateAlertOpen(true); // Show update alert
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBatch = async () => {
    try {
      setOpenDeleteModal(false);
      const updated = await axios.delete(`/deleteBatch/${id}`);
      getAllBatches();
      setDeleteAlertOpen(true); // Show delete alert
    } catch (error) {
      console.log(error);
    }
  };

  const addBatch = async () => {
    setAddAlertOpen(true); // Show add alert
    try {
      let a = await axios.post("/api/addBatch", data);
      console.log(data);
      getAllBatches();
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleBatch = async (id) => {
    try {
      let res = await axios.get(`/getSingleBatch/${id}`);
      console.log(res);
      setData({ ...data, name: res.data.name });
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
          onClose={() => setUpdateAlertOpen(false)}
          severity={"success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successfully updated
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
        <h2 className="text-4xl my-2 font-semibold">Batches </h2>
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
          rows={batches}
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
              {update ? "Update Batch" : "Add Batch"}
            </h2>

            <div className="flex gap-10 mb-6">
              <TextField
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                fullWidth
                id="outlined-basic"
                label="Enter batch name"
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
                    updateBatch();
                    setOpenAddAndUpdateModal(false);
                  } else {
                    addBatch();
                    setOpenAddAndUpdateModal(false);
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
              <Button onClick={deleteBatch} variant="contained">
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

export default ShowBatches;
