import { Button, Grid, Modal, Paper, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ShowBatches = () => {
  const [openAddAndUpdateModal, setOpenAddAndUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState(null);

  const columns = [
    {
      field: "action",
      width: 150,
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
      field: `batch`,
      width: 180,
      headerName: "Batch",
      align: "center",
    },
  ];

  return (
    <>
      <div className="mx-10">
        <h2 className="text-4xl my-2 font-semibold">Batches</h2>
        <Button
          variant="outlined"
          className=""
          onClick={() => setOpenAddAndUpdateModal(!openAddAndUpdateModal)}
        >
          <FaPlus className="mx-2" />
          Add
        </Button>

        <DataGrid
          className=""
          rows={[{ id: 1, batch: "12" }]}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          sx={{
            width: "100%",
            height: "35em",
            marginTop: 2,
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "blue",
              color: "black",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "semi-bold",
              fontSize: "20px",
            },
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
              <Button type="submit" variant="contained" sx={{ width: "100%" }}>
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

export default ShowBatches;
