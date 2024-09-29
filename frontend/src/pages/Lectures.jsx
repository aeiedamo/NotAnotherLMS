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
      <Box className="lectures-header-container">
        <Link to="/dashboard" className="lectures-icon-link">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>
        <Heading className="lectures-header">Lectures</Heading>
        <Button
          className="lectures-icon-link"
          onClick={() => setShowForm(!showForm)}
        >
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </Button>
      </Box>
      <Box className="lectures-content">
        {lectures.length > 0 ? (
          <Box className="lectures-list">
            {lectures.map((lecture) => (
              <Box key={lecture.id} className="lecture-item">
                <Heading as="h3" className="lecture-title">
                  {lecture.title}
                </Heading>
                <Text className="lecture-description">
                  {lecture.description}
                </Text>
                <a
                  href={lecture.videoURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lecture-link"
                >
                  View Video
                </a>
                <Button
                  className="lectures-btn-small lectures-delete-button"
                  onClick={() => deleteLecture(lecture.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Box>
            ))}
          </Box>
        ) : (
          <Text className="no-lectures-text">No lectures available</Text>
        )}
      </Box>
      {showForm && (
        <Box className="add-lecture-popup">
          <Button
            className="add-lecture-close-button"
            onClick={() => setShowForm(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <Heading as="h2" className="add-lecture-heading">
            Add New Lecture
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
            placeholder="Video URL"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <TextInput
            placeholder="Course ID"
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
          />
          <Button className="done-button" onClick={addLecture}>
            Done
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Lectures;

