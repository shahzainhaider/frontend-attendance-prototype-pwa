import { useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import StudentSideBar from "./StudentSideBar";
import { Route, Routes } from "react-router-dom";
import StudentHomePage from "./StudentHomePage";
import StudentProfile from "./StudentProfile";
import StudentSubjects from "./StudentSubjects"; // Uncomment if needed
import ViewStdAttendance from "./ViewStdAttendance"; // Uncomment if needed
// import StudentComplain from "./StudentComplain";
// import Logout from "../Logout";
import AccountMenu from "../../components/AccountMenu";
import { AppBar, Drawer } from "../../components/styles";

const StudentDashboard = ({setRole}) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar open={open} position="absolute" className="!bg-transparent !shadow-none">
          <Toolbar sx={{ pr: "24px" }}  className="flex bg-blue-200/70 -z-40 justify-between">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
              className="!bg-[#98cc3b]"
            >
              <MenuIcon />
            </IconButton>
            {open && <div></div>}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              //   noWrap
              //   sx={{ flexGrow: 1 }}
              className=" inline bg-[#0a73be] py-2 px-6 rounded-3xl mt-2"
            >
              Student Dashboard
            </Typography>
            <AccountMenu setRole={setRole} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={open ? styles.drawerStyled : styles.hideDrawer}
        >
          <Toolbar sx={styles.toolBarStyled}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <StudentSideBar />
          </List>
        </Drawer>
        <Box component="main" sx={styles.boxStyled}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<StudentHomePage />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
            <Route path="/Student/dashboard" element={<StudentHomePage />} />
            <Route path="/Student/profile" element={<StudentProfile />} />
            <Route path="/Student/subjects" element={<StudentSubjects />} /> {/* Uncomment if needed */}
            <Route path="/Student/attendance" element={<ViewStdAttendance />} /> {/* Uncomment if needed */}
            {/* <Route path="/Student/complain" element={<StudentComplain />} /> */}
            {/* <Route path="/logout" element={<Logout />} /> */}
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default StudentDashboard;

const styles = {
  boxStyled: {
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  toolBarStyled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    px: [1],
  },
  drawerStyled: {
    display: "flex",
  },
  hideDrawer: {
    display: "flex",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
};
