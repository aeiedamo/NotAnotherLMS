import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Text, TextInput } from "@primer/react";
import axios from "axios";
import "../style/Lectures.css";

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [courseID, setCourseID] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/lectures");
      setLectures(response.data);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  const addLecture = async () => {
    try {
      const newLecture = { title, description, videoURL, courseID };
      await axios.post("http://localhost:3000/api/lectures", newLecture);
      fetchLectures(); // Refresh the list of lectures
      setTitle("");
      setDescription("");
      setVideoURL("");
      setCourseID("");
      setShowForm(false);
    } catch (error) {
      console.error("Error adding lecture:", error);
    }
  };

  const deleteLecture = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/lectures/${id}`);
      fetchLectures(); // Refresh the list of lectures
    } catch (error) {
      console.error("Error deleting lecture:", error);
    }
  };

  return (
    <Box className="lectures-page">
      <Link to="/dashboard" className="back-button">
        <Button className="btn-small">Back to Dashboard</Button>
      </Link>
      <Heading as="h1" className="lectures-header">
        Lectures
      </Heading>
      <Box className="lectures-panel">
        {lectures.length > 0 ? (
          lectures.map((lecture) => (
            <Box key={lecture.id} className="lecture-item">
              <Heading as="h3">{lecture.title}</Heading>
              <Text>{lecture.description}</Text>
              <a
                href={lecture.videoURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Video
              </a>
              <Button
                className="btn-small delete-button"
                onClick={() => deleteLecture(lecture.id)}
              >
                Delete
              </Button>
            </Box>
          ))
        ) : (
          <Text>No lectures available</Text>
        )}
      </Box>
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Lecture"}
      </Button>
      {showForm && (
        <Box className="add-lecture-form">
          <Heading as="h2">Add New Lecture</Heading>
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
            placeholder="Video URL"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <TextInput
            placeholder="Course ID"
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
          />
          <Button onClick={addLecture}>Add Lecture</Button>
        </Box>
      )}
    </Box>
  );
};

export default Lectures;
