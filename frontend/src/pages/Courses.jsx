import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Text, TextInput } from "@primer/react";
import axios from "axios";
import "../style/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [playlistURL, setPlaylistURL] = useState("");
  const [instructorID, setinstructorID] = useState("");

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
      setinstructorID("");
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
      <Link to="/dashboard" className="back-button">
        <Button className="btn-small">Back to Dashboard</Button>
      </Link>
      <Heading as="h1" className="courses-header">
        Courses
      </Heading>
      <Box className="courses-panel">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Box key={course.id} className="course-item">
              <Heading as="h3">{course.title}</Heading>
              <Text>{course.description}</Text>
              <a
                href={course.playlistURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Playlist
              </a>
              <Button
                className="btn-small delete-button"
                onClick={() => deleteCourse(course.id)}
              >
                Delete
              </Button>
            </Box>
          ))
        ) : (
          <Text>No courses available</Text>
        )}
      </Box>
      <Box className="add-course-form">
        <Heading as="h2">Add New Course</Heading>
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
          placeholder="instructor ID"
          value={instructorID}
          onChange={(e) => setinstructorID(e.target.value)}
        />
        <Button onClick={addCourse}>Add Course</Button>
      </Box>
    </Box>
  );
};

export default Courses;
