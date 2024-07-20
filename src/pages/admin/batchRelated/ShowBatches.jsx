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
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });

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
        <Grid columnSpacing={{ xs: 5, sm: 5, md: 5 }}>
          <Button
            color="error"
            onClick={() => {
              setId(params.row.id);
              setOpenDeleteModal(true);
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
              getSingleBatch(params.row.id);
            }}
          >
            <FaRegEdit />
          </Button>
        </Grid>
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
      setBatches(res.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const updateBatch = async () => {
    try {
      const updated = await axios.patch(`/updateBatch/${id}`, data);
      getAllBatches();
      setAlert({
        open: true,
        type: "success",
        message: "Successfully updated",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBatch = async () => {
    try {
      setOpenDeleteModal(false);
      const updated = await axios.delete(`/deleteBatch/${id}`);
      getAllBatches();
      setAlert({ open: true, type: "error", message: "Successfully deleted" });
    } catch (error) {
      console.log(error);
    }
  };

  const addBatch = async () => {
    try {
      let a = await axios.post("/api/addBatch", data);
      setBatches([a.data.data, ...batches]);
      setAlert({ open: true, type: "success", message: "Successfully added" });
    } catch (error) {
      console.log(error.response);
    }
  };

  const getSingleBatch = async (id) => {
    try {
      let res = await axios.get(`/getSingleBatch/${id}`);
      setData({ ...data, name: res.data.name });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alert.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.message}
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
