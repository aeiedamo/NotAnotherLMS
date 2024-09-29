import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../style/AboutPage.css";
import { ThemeProvider, BaseStyles, Button, Heading, Box } from "@primer/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AboutPage = () => {
  return (
    <ThemeProvider colorMode="auto">
      <BaseStyles>
        <div className="about-page">
          <Helmet>
            <title>About - NotAnotherLMS</title>
          </Helmet>
          <Box className="header-container">
            <Link to="/" className="icon-link">
              <FontAwesomeIcon icon={faArrowLeft} size="2x" />
            </Link>
            <Heading className="header">About</Heading>
            <Box className="buttons-container">
              <Link to="/auth" className="link">
                <Button className="btn-primary">Get Started</Button>
              </Link>
              <Link to="/dashboard" className="link">
                <Button className="btn-primary">Dashboard</Button>
              </Link>
            </Box>
          </Box>
          <Box className="content">
            <Heading as="h2">What is NotAnotherLMS?</Heading>
            <p>
              NotAnotherLMS is a simple yet capable Learning Management System
              designed to ease the process of learning for students and teaching
              for instructors.
            </p>
            <Heading as="h2">
              Why should I be interested in NotAnotherLMS?
            </Heading>
            <p>
              If you are a part of the learning community, NotAnotherLMS offers
              a streamlined and efficient way to manage courses, assignments,
              and lectures.
            </p>
            <Heading>Why is this LMS different?</Heading>
            <p>Since most students make use of telegram for their studying why not build the LMS around it to make it easier for them to keep up with the work :)</p>
          </Box>
        </div>
      </BaseStyles>
    </ThemeProvider>
  );
};

export default AboutPage;
