import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Grid, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const CustomToolbar = ({ selectedMonth, handleMonthChange }) => (
  <Grid container justifyContent="flex-end" spacing={2} alignItems="center">
    <Grid item>
      <FormControl variant="outlined" size="small" sx={{ width: 100, margin: 2, }}>
        <InputLabel>Month</InputLabel>
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          label="Month"
          sx={{ backgroundColor: 'white' }}
        >
          <MenuItem value="January">January</MenuItem>
          <MenuItem value="February">February</MenuItem>
          <MenuItem value="March">March</MenuItem>
          <MenuItem value="April">April</MenuItem>
          <MenuItem value="May">May</MenuItem>
          <MenuItem value="June">June</MenuItem>
          <MenuItem value="July">July</MenuItem>
          <MenuItem value="August">August</MenuItem>
          <MenuItem value="September">September</MenuItem>
          <MenuItem value="October">October</MenuItem>
          <MenuItem value="November">November</MenuItem>
          <MenuItem value="December">December</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);

const ViewStdAttendance = () => {
  const [batches, setBatches] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Filter batches based on the selected month
    const filteredBatches = originalBatches.filter(batch => {
      const batchDate = new Date(batch.date);
      return batchDate.toLocaleString('default', { month: 'long' }) === event.target.value;
    });
    setBatches(filteredBatches);
  };

  const columns = [
    {
      field: "date",
      width: 150,
      headerName: "Date",
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
      field: "time",
      width: 150,
      headerName: "Time",
      align: "center",
    },
    {
      field: "attendanceStatus",
      width: 150,
      headerName: "Attendance Status",
      align: "center",
    },
    {
      field: "entryStatus",
      width: 150,
      headerName: "Entry Status",
      align: "center",
    },
  ];

  return (
    <>
      <CustomToolbar selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
      <DataGrid
        className="bg-white"
        rows={batches}
        columns={columns}
        sx={{
          width: "96%",
          height: "35em",
          margin: 2,
        }}
      />
    </>
  );
};

export default ViewStdAttendance;
