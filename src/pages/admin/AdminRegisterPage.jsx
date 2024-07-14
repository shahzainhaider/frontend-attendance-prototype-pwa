import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bgpic from "../../assets/designlogin.jpg";
import { GreenButton } from "../../components/buttonStyles";
// import { registerUser } from "../../redux/userRelated/userHandle";
import styled from "styled-components";
import Popup from "../../components/Popup";
import axios from "axios";

const defaultTheme = createTheme();

const AdminRegisterPage = () => {
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const role = "Admin";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.adminName.value;
    const campusName = event.target.schoolName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!name || !campusName || !email || !password) {
      if (!name) setAdminNameError(true);
      if (!campusName) setSchoolNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { name, email, password, role, campusName };
    setLoader(true);
    try {
      let res = await axios.post(`/AdminReg`, fields);
      if (res.status === 200) {
        navigate("/Adminlogin");
      }
      console.log(res);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "adminName") setAdminNameError(false);
    if (name === "schoolName") setSchoolNameError(false);
  };

  // useEffect(() => {
  //     if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
  //         navigate('/Admin/dashboard');
  //     }
  //     else if (status === 'failed') {
  //         setMessage(response)
  //         setShowPopup(true)
  //         setLoader(false)
  //     }
  //     else if (status === 'error') {
  //         console.log(error)
  //     }
  // }, [status, currentUser, currentRole, navigate, error, response]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Box
          sx={{
            width: "30vw",
            my: 8,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
            Admin Register
          </Typography>
          <Typography align="center" variant="h7">
            Create your own school by registering as an admin.
            <br />
            You will be able to add students and faculty and manage the system.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="adminName"
              label="Enter your name"
              name="adminName"
              autoComplete="name"
              autoFocus
              error={adminNameError}
              helperText={adminNameError && "Name is required"}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="schoolName"
              label="Create your campus name"
              name="schoolName"
              autoComplete="off"
              error={schoolNameError}
              helperText={schoolNameError && "School name is required"}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email"
              name="email"
              autoComplete="email"
              error={emailError}
              helperText={emailError && "Email is required"}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={toggle ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              error={passwordError}
              helperText={passwordError && "Password is required"}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setToggle(!toggle)}>
                      {toggle ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Grid
              container
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
            <GreenButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              {loader ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </GreenButton>
            <Grid container>
              <Grid>Already have an account?</Grid>
              <Grid item sx={{ ml: 2 }}>
                <StyledLink to="/Adminlogin">Log in</StyledLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${bgpic})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </ThemeProvider>
  );
};

export default AdminRegisterPage;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: blue;
`;
