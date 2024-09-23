import React from "react";
import SidePanel from "../components/SidePanel";
import "./styles/MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <SidePanel />
      <div className="content">
        <header>
          <h1>Welcome to NotAnotherLMS</h1>
        </header>
        <main>
          <section>
            <h2>About the Project</h2>
            <p>
              NotAnotherLMS is a simple yet capable LMS to easen the learning experience for the students and instructors!
            </p>
          </section>
          <section>
            <h2>Features</h2>
            <ul>
              <li>Course Management.</li>
              <li>Assignment Tracking.</li>
              <li>Lecture Scheduling.</li>
              <li>User Authentication with Google Sign-In.</li>
              <li>Get Notifications via Telegram!</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
