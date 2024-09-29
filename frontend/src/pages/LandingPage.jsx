import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../style/LandingPage.css";
import { ThemeProvider, BaseStyles, Button, Heading, Box } from "@primer/react";
import telegramImage from "../assets/telegram.avif"; // Correct image path

const LandingPage = () => {
  return (
    <ThemeProvider colorMode="auto">
      <BaseStyles>
        <div className="landing-page">
          <Helmet>
            <title>Welcome to NotAnotherLMS</title>
          </Helmet>
          <Box className="header-container">
            <Heading className="header">NotAnotherLMS</Heading>
            <Box className="buttons-container">
              <Link to="/about" className="link">
                <Button className="btn-primary">About</Button>
              </Link>
              <Link to="/features" className="link">
                <Button className="btn-primary">Features</Button>
              </Link>
              <Link to="/auth" className="link">
                <Button className="btn-primary">Get Started</Button>
              </Link>
              <Link to="/dashboard" className="link">
                <Button className="btn-primary">Dashboard</Button>
              </Link>
            </Box>
          </Box>
          <Box className="content">
            <Box className="text-and-image">
              <Box className="text-content">
                <Heading as="h1">Welcome to NotAnotherLMS</Heading>
                <p>
                  Simple yet capable Learning Management System to easen the
                  process of learning for the student and the teaching for the
                  instructor
                </p>
                <Link to="/about" className="link">
                  <Button className="learn-more-button">Learn more :)</Button>
                </Link>
              </Box>
              <img
                src={telegramImage}
                alt="Telegram"
                className="telegram-image"
              />
            </Box>
          </Box>
          <footer className="footer">
            <p>NotAnotherLMS</p>
          </footer>
        </div>
      </BaseStyles>
    </ThemeProvider>
  );
};

export default LandingPage;

