import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';

const StudentHomePage = () => {
  // Static data for monthly attendance
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];
  const attendanceData = [20, 10, 30, 20, 40, 30, 25, 60, 0, 22, 32, 12];

  // Prepare xAxis and series arrays in the expected format
  const xAxis = [{ data: months, scaleType: 'band' }];
  const series = [{ data: attendanceData }];

  // Calculate max value for scaling
  const maxAttendance = Math.max(...attendanceData);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1 className="text-5xl font-semibold ">Monthly Attendance</h1>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 20px' }}>
        <BarChart
          xAxis={xAxis}
          series={series}
          width={1200}
          height={500}
          // yAxis={{ tickInterval: maxAttendance / 5 }} // Adjust tick interval dynamically
          padding={{ left: 100, right: 100 }} // Add padding for better display
          // legend={{ position: 'bottom' }} // Position legend at the bottom
        />
      </div>
    </div>
  );
};

export default StudentHomePage;
