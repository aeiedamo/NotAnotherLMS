import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider, BaseStyles } from "@primer/react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
            </Routes>
          </Router>
        </GoogleOAuthProvider>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;

