import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';

function StudentHomePage() {
  return(
  <>
     <BarChart
      xAxis={[{ scaleType: 'band', data: ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] }]}
      series={[{ data: [20, 10, 30, 20, 40, 30, 25, 60, 0, 22, 32, 12] }]}
      width={1200}
      height={700} />
  </>
)
}

export default StudentHomePage;
