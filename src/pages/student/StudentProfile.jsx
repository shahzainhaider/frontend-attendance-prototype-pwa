import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  Container,
  Paper,
} from "@mui/material";

const StudentProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = localStorage.getItem('user');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData); // Store the entire user data object
    }
  }, []);

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                {/* Display avatar image */}
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="h5" component="h2" textAlign="center">
                {/* Display student name */}
                {userData && userData.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography
                variant="subtitle1"
                component="p"
                textAlign="center"
              >
                Student Roll No:
                {/* Display student roll number */}
                {userData && userData.rollNum}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography
                variant="subtitle1"
                component="p"
                textAlign="center"
              >
                Class:
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Batch No:</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Gender:</strong> Male
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Email:</strong> 
                {userData && userData.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Phone:</strong> (123) 456-7890
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Roll No:</strong>
                {userData && userData.rollNum}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StudentProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;
