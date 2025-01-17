import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress, // Import CircularProgress for the loader
} from "@mui/material";
import axios from 'axios';

const ViewAttendance = () => {
    const {studentId} = useParams()
    console.log(studentId)
    const month = new Date().getMonth()
    console.log(month)
    const [attendance, setAttendance] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(month +1);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (selectedMonth !== "") {
        getStudentMonthlyAttendance(studentId, selectedMonth);
      }
    }, [selectedMonth, studentId]);
  
    const getStudentMonthlyAttendance = async (studentId, monthIndex) => {
      setLoading(true); 
      try {
        const response = await axios.get('/attendance/student-monthly-attendance', {
          params: {
            studentId,
            monthIndex
          }
        });
        
        if (response.status === 200) {
          setAttendance(response.data);
        } else {
          console.error('Error fetching attendance:', response.data.message);
          setAttendance([]);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
        setAttendance([]);
      } finally {
        setLoading(false); 
      }
    };
  
    const handleMonthChange = (event) => {
      const monthIndex = event.target.value;
      setSelectedMonth(monthIndex);
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
  
    const columns = [
      { field: "date", width: 150, headerName: "Date", align: "left" },
      { field: "time", width: 150, headerName: "Time", align: "left" },
      { field: "attendance", width: 200, headerName: "Attendance Status", align: "left" },
    ];
  return (
    <>
    <div className="text-5xl font-semibold my-5">
      Monthly Attendance
    </div>
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="month-label">Month</InputLabel>
          <Select
            labelId="month-label"
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Month"
            fullWidth
          >
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <DataGrid
            className="bg-white"
            rows={attendance}
            columns={columns}
            pageSize={5}
            slots={{ toolbar: GridToolbar }}
            rowsPerPageOptions={[5, 10, 20]}
            autoHeight
          />
        )}
      </Grid>
    </Grid>
    </>
  )
}

export default ViewAttendance
