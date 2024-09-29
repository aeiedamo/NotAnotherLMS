import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../style/Dashboard.css";
import { ThemeProvider, BaseStyles, Button, Heading, Box } from "@primer/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChalkboardTeacher,
  faTasks,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <ThemeProvider colorMode="auto">
      <BaseStyles>
        <div className="dashboard-page">
          <Helmet>
            <title>Dashboard - NotAnotherLMS</title>
            <link rel="icon" href="/dashboard-icon.png" />
          </Helmet>
          <Box className="header-container">
            <Link to="/" className="icon-link">
              <FontAwesomeIcon icon={faArrowLeft} size="2x" />
            </Link>
            <Heading className="header">Dashboard</Heading>
          </Box>
          <Box className="content">
            <Link to="/courses" className="box-link">
              <Box className="box">
                <FontAwesomeIcon icon={faBook} size="2x" />
                <h2>Courses</h2>
              </Box>
            </Link>
            <Link to="/lectures" className="box-link">
              <Box className="box">
                <FontAwesomeIcon icon={faChalkboardTeacher} size="2x" />
                <h2>Lectures</h2>
              </Box>
            </Link>
            <Link to="/assignments" className="box-link">
              <Box className="box">
                <FontAwesomeIcon icon={faTasks} size="2x" />
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

