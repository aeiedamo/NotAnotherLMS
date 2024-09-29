import React, { useState } from "react";
import { Box, Button, Heading, TextInput, Select, Text } from "@primer/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../style/AuthPage.css";

const AuthPage = () => {
  const [telegram, setTelegram] = useState("");
  const [role, setRole] = useState("student");

  const handleGoogleLogin = () => {
    localStorage.setItem("telegram", telegram);
    localStorage.setItem("role", role);
    window.location.href = `http://localhost:3000/api/auth/google`;
  };

  return (
    <Box className="auth-page">
      <Box className="auth-header-container">
        <Link to="/" className="auth-icon-link">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>
        <Heading className="auth-header">Login</Heading>
      </Box>
      <Box className="auth-form-container">
        <Box className="auth-form">
          <Box className="form-group">
            <Text className="form-label">Telegram Phone Number:</Text>
            <TextInput
              placeholder="Telegram Phone Number"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              className="form-input"
            />
          </Box>
          <Box className="form-group">
            <Text className="form-label">Role:</Text>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
            >
              <Select.Option value="student">Student</Select.Option>
              <Select.Option value="instructor">Instructor</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Box>
          <Button onClick={handleGoogleLogin} className="form-button">
            Login with Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;

