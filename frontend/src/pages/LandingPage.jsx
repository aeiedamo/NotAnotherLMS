import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../style/LandingPage.css";
import { ThemeProvider, BaseStyles, Button, Heading, Box } from "@primer/react";

const LandingPage = () => {
  return (
    <ThemeProvider colorMode="auto">
      <BaseStyles>
        <div className="landing-page">
          <Helmet>
            <title>Welcome to NotAnotherLMS</title>
          </Helmet>
          <Heading className="header">
            <h1>Welcome to NotAnotherLMS</h1>
            <p>Simple yet capable Learning Management System</p>
            <Link to="/auth" className="link">
              <Button className="btn-primary">Get Started</Button>
            </Link>
            <Link to="/dashboard" className="link">
              <Button className="btn-primary">Go to Dashboard</Button>
            </Link>
          </Heading>
          <Box className="features">
            <h2>Features</h2>
            <ul>
              <li>
                Feature 1: Simple to use for the student and the instructor!
              </li>
              <li>
                Feature 2: All you have to do is to sign-in with your Google
                account!
              </li>
              <li>
                Feature 3: Telegram notifications to keep up with the work!
              </li>
            </ul>
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
