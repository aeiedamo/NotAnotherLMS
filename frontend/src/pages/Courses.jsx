import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Text, TextInput } from "@primer/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlus,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../style/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [playlistURL, setPlaylistURL] = useState("");
  const [instructorID, setInstructorID] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const addCourse = async () => {
    try {
      const newCourse = { title, description, playlistURL, instructorID };
      await axios.post("http://localhost:3000/api/courses", newCourse);
      fetchCourses(); // Refresh the list of courses
      setTitle("");
      setDescription("");
      setPlaylistURL("");
      setInstructorID("");
      setShowForm(false);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/courses/${id}`);
      fetchCourses(); // Refresh the list of courses
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <Box className="courses-page">
      <Box className="header-container">
        <Link to="/dashboard" className="icon-link">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>
        <Heading className="header">Courses</Heading>
        <Button className="icon-link" onClick={() => setShowForm(!showForm)}>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </Button>
      </Box>
      <Box className="content">
        {courses.length > 0 ? (
          <Box className="courses-list">
            {courses.map((course) => (
              <Box key={course.id} className="course-item">
                <Heading as="h3" className="course-title">
                  {course.title}
                </Heading>
                <Text className="course-description">{course.description}</Text>
                <a
                  href={course.playlistURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="course-link"
                >
                  View Playlist
                </a>
                <Button
                  className="btn-small delete-button"
                  onClick={() => deleteCourse(course.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Box>
            ))}
          </Box>
        ) : (
          <Text className="no-courses-text">No courses available</Text>
        )}
      </Box>
      {showForm && (
        <Box className="add-course-popup">
          <Button className="close-button" onClick={() => setShowForm(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <Heading as="h2" className="add-course-heading">
            Add New Course
          </Heading>
          <TextInput
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextInput
            placeholder="Playlist URL"
            value={playlistURL}
            onChange={(e) => setPlaylistURL(e.target.value)}
          />
          <TextInput
            placeholder="Instructor ID"
            value={instructorID}
            onChange={(e) => setInstructorID(e.target.value)}
          />
          <Button className="done-button" onClick={addCourse}>
            Done
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Courses;

