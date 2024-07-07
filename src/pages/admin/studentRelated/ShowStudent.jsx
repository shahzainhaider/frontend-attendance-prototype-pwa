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
  const [openAddAndUpdateModal, setOpenAddAndUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [data, setData] = useState({ name: "" });
  const [update, setUpdate] = useState(false);
  const [batches, setBatches] = useState([]);
  const [id, setId] = useState(null);
  const imgFileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const initialValues = { studentImg : "default-image-url"};



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
                getSingleQualification(id);
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

  const getAllBatches = async () => {
    try {
      let res = axios.get("/getAllBatches");
    } catch (error) {
      console.log(error);
    }
  };

  const addBatch = async () => {
    try {
      await axios.post("/addBatches");
      getAllBatches();
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleBatch = async () => {
    try {
    } catch (error) {
      console.log(error);
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
                      onChange={(e) => setData({ name: e.target.value })}
                      fullWidth
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                    />
                  </div>
                  <div className="flex gap-10 mb-6">
                    <TextField
                      value={data.contact}
                      onChange={(e) => setData({ contact: e.target.value })}
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
                    onChange={(e) => setData({ email: e.target.value })}
                    fullWidth
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                  />
                </div>
                <div className="flex gap-10 mb-6">
                  <TextField
                    value={data.password}
                    onChange={(e) => setData({ password: e.target.value })}
                    fullWidth
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                  />
                </div>
                <div className="flex gap-6">
                  <div className="flex gap-10 mb-6 w-full">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Course ID
                      </InputLabel>
                      <Select
                        sx={{
                          // marginTop: 35,
                          width: 250,
                          // height: 50,
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Age"
                        // onChange={handleChange}
                      >
                        <MenuItem>Batch 1</MenuItem>
                        <MenuItem>Batch 2</MenuItem>
                        <MenuItem>Batch 3</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="flex gap-10 mb-6 w-full">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Batch ID
                      </InputLabel>
                      <Select
                        sx={{
                          // marginTop: 35,
                          width: 250,
                          // height: 50,
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Age"
                        // onChange={handleChange}
                      >
                        <MenuItem>Batch 1</MenuItem>
                        <MenuItem>Batch 2</MenuItem>
                        <MenuItem>Batch 3</MenuItem>
                      </Select>
                    </FormControl>
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
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          setUrl(null);
                        }}
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
                        {image || initialValues.studentImg ? (
                          <img
                            name="studentImg"
                            className="  w-full h-full object-cover"
                            src={
                              image
                                ? URL.createObjectURL(image)
                                : initialValues && initialValues.studentImg
                                ? initialValues.studentImg
                                : ""
                            }
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

export default ShowStudents;
