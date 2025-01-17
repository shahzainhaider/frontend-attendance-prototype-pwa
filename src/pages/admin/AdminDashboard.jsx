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
import { Navigate, Route, Routes } from "react-router-dom";
import { AppBar, Drawer } from "../../components/styles";
import SideBar from "./SideBar";
import AdminHomePage from "./AdminHomePage";
import AccountMenu from "../../components/AccountMenu";
import ShowBatches from "./batchRelated/ShowBatches";
import ShowCourses from "./CourseRelated/ShowCourse";
import ShowTeachers from "./teacherRelated/ShowTeacher";
import ShowStudents from "./studentRelated/ShowStudent";
import ViewAttendance from "./studentRelated/ViewAttendance";
import ShowClass from "./ClassRelated/ShowClass"


const AdminDashboard = ({setRole}) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          open={open}
          position="absolute"
          className="!bg-transparent !shadow-none "
        >
          <Toolbar sx={{ pr: "24px" }} className="flex justify-between">
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
              Admin Dashboard
            </Typography>
            <AccountMenu setRole={setRole} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          //   sx={{display:open? 'flex':'flex'}}
          className={`${open ? "flex" : "flex md:none"}`}
        >
          <Toolbar sx={styles.toolBarStyled}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <SideBar />
          </List>
        </Drawer>
        <Box component="main" className="" sx={styles.boxStyled}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<AdminHomePage />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
            <Route path="/Admin/dashboard" element={<AdminHomePage />} />
            {/* <Route path="/Admin/profile" element={<AdminProfile />} /> */}
            {/* <Route path="/Admin/complains" element={<SeeComplains />} /> */}

            {/* Notice */}
            {/* <Route path="/Admin/addnotice" element={<AddNotice />} /> */}
            {/* <Route path="/Admin/notices" element={<ShowNotices />} /> */}

            {/* Subject */}
            <Route path="/Admin/subjects" element={<ShowCourses />} />


            <Route path="/Admin/classes" element={<ShowClass />} />

            {/* <Route
              path="/Admin/subjects/subject/:classID/:subjectID"
              element={<ViewSubject />}
            /> */}
            {/* <Route
              path="/Admin/subjects/chooseclass"
              element={<ChooseClass situation="Subject" />}
            /> */}

            {/* <Route path="/Admin/addsubject/:id" element={<SubjectForm />} /> */}
            {/* <Route
              path="/Admin/class/subject/:classID/:subjectID"
              element={<ViewSubject />}
            />

            <Route
              path="/Admin/subject/student/attendance/:studentID/:subjectID"
              element={<StudentAttendance situation="Subject" />}
            />
            <Route
              path="/Admin/subject/student/marks/:studentID/:subjectID"
              element={<StudentExamMarks situation="Subject" />}
            /> */}

            {/* Class */}
            {/* <Route path="/Admin/addclass" element={<AddClass />} /> */}
            <Route path="/Admin/batches" element={<ShowBatches />} />
            {/* <Route path="/Admin/classes/class/:id" element={<ClassDetails />} /> */}
            {/* <Route
              path="/Admin/class/addstudents/:id"
              element={<AddStudent situation="Class" />}
            /> */}

            {/* Student */}
            {/* <Route
              path="/Admin/addstudents"
              element={<AddStudent situation="Student" />}
            /> */}
            <Route path="/Admin/students" element={<ShowStudents />} />
            <Route path="/Admin/students/attendance/:studentId" element={<ViewAttendance/>} />
            {/* <Route
              path="/Admin/students/student/:id"
              element={<ViewStudent />}
            /> */}
            {/* <Route
              path="/Admin/students/student/attendance/:id"
              element={<StudentAttendance situation="Student" />}
            />
            <Route
              path="/Admin/students/student/marks/:id"
              element={<StudentExamMarks situation="Student" />}
            /> */}

            {/* Teacher */}
            <Route path="/Admin/teachers" element={<ShowTeachers />} />
            {/* <Route
              path="/Admin/teachers/teacher/:id"
              element={<TeacherDetails />}
            />
            <Route
              path="/Admin/teachers/chooseclass"
              element={<ChooseClass situation="Teacher" />}
            />
            <Route
              path="/Admin/teachers/choosesubject/:id"
              element={<ChooseSubject situation="Norm" />}
            /> */}
            {/* <Route
              path="/Admin/teachers/choosesubject/:classID/:teacherID"
              element={<ChooseSubject situation="Teacher" />}
            />
            <Route
              path="/Admin/teachers/addteacher/:id"
              element={<AddTeacher />}
            /> */}

            {/* <Route path="/logout" element={<Logout />} /> */}
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;

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
