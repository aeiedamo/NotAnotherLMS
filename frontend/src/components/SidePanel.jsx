import React, { useState } from "react";
import { Link } from "react-router-dom";
import homeIcon from "../images/icons/HomePage.png";
import authIcon from "../images/icons/Login-Register.png";
import coursesIcon from "../images/icons/Courses.png";
import assignmentsIcon from "../images/icons/Assignments.png";
import lecturesIcon from "../images/icons/Lectures.png";
import dashboardIcon from "../images/icons/Dashboard.png";
import menuIcon from "../images/icons/Menu.png";
import "./styles/SidePanel.css";

const SidePanel = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`side-panel ${isMinimized ? "minimized" : ""}`}>
      <button className="toggle-button" onClick={toggleMinimize}>
        <img src={menuIcon} alt="Menu" />
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img src={homeIcon} alt="Home" className="icon" />
              {!isMinimized && <span>Home</span>}
            </Link>
          </li>
          <li>
            <Link to="/auth">
              <img src={authIcon} alt="Login/Register" className="icon" />
              {!isMinimized && <span>Login/Register</span>}
            </Link>
          </li>
          <li>
            <Link to="/courses">
              <img src={coursesIcon} alt="Courses" className="icon" />
              {!isMinimized && <span>Courses</span>}
            </Link>
          </li>
          <li>
            <Link to="/assignments">
              <img src={assignmentsIcon} alt="Assignments" className="icon" />
              {!isMinimized && <span>Assignments</span>}
            </Link>
          </li>
          <li>
            <Link to="/lectures">
              <img src={lecturesIcon} alt="Lectures" className="icon" />
              {!isMinimized && <span>Lectures</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <img src={dashboardIcon} alt="Dashboard" className="icon" />
              {!isMinimized && <span>Dashboard</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidePanel;
