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
  Button,
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

  const handleDownloadIDCard = () => {
    // Implement ID card download logic here
    alert('Download ID Card clicked');
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button variant="contained" color="primary" onClick={handleDownloadIDCard}>
          Download ID Card
        </Button>
      </Box>
      <StyledPaper elevation={3} sx={{ marginTop: 4, padding: 6 }}>
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
              <Typography variant="h5" component="h2" textAlign="center" sx={{ marginBottom: 2 }}>
                {/* Display student name */}
                {userData && userData.name}
              </Typography>
            </Box>
          </Grid>
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
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default StudentProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;
