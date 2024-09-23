import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../style/Dashboard.css";
import { ThemeProvider, BaseStyles, Button, Heading, Box } from "@primer/react";

const Dashboard = () => {
  return (
    <ThemeProvider colorMode="auto">
      <BaseStyles>
        <div className="dashboard-page">
          <Helmet>
            <title>Dashboard - NotAnotherLMS</title>
          </Helmet>
          <Link to="/" className="back-button">
            <Button className="btn-small">Back to Landing Page</Button>
          </Link>
          <Heading className="header">
            <h1>Dashboard</h1>
          </Heading>
          <Box className="content">
            <Link to="/courses" className="box-link">
              <Box className="box">
                <h2>Courses</h2>
              </Box>
            </Link>
            <Link to="/lectures" className="box-link">
              <Box className="box">
                <h2>Lectures</h2>
              </Box>
            </Link>
            <Link to="/assignments" className="box-link">
              <Box className="box">
                <h2>Assignments</h2>
              </Box>
            </Link>
          </Box>
        </div>
      </BaseStyles>
    </ThemeProvider>
  );
};

export default Dashboard;
