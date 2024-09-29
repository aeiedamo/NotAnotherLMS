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
import "../style/Assignments.css";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [courseID, setCourseID] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/assignments");
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const addAssignment = async () => {
    try {
      const newAssignment = { title, description, fileURL, dueDate, courseID };
      await axios.post("http://localhost:3000/api/assignments", newAssignment);
      fetchAssignments(); // Refresh the list of assignments
      setTitle("");
      setDescription("");
      setFileURL("");
      setDueDate("");
      setCourseID("");
      setShowForm(false);
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  const deleteAssignment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/assignments/${id}`);
      fetchAssignments(); // Refresh the list of assignments
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  return (
    <Box className="assignments-page">
      <Box className="header-container">
        <Link to="/dashboard" className="icon-link">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Link>
        <Heading className="header">Assignments</Heading>
        <Button className="icon-link" onClick={() => setShowForm(!showForm)}>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </Button>
      </Box>
      <Box className="content">
        {assignments.length > 0 ? (
          <Box className="assignments-list">
            {assignments.map((assignment) => (
              <Box key={assignment.id} className="assignment-item">
                <Heading as="h3" className="assignment-title">
                  {assignment.title}
                </Heading>
                <Text className="assignment-description">
                  {assignment.description}
                </Text>
                <a
                  href={assignment.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="assignment-link"
                >
                  View Assignment
                </a>
                <Text className="assignment-due-date">
                  Due Date: {new Date(assignment.dueDate).toLocaleString()}
                </Text>
                <Button
                  className="btn-small delete-button"
                  onClick={() => deleteAssignment(assignment.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Box>
            ))}
          </Box>
        ) : (
          <Text className="no-assignments-text">No assignments available</Text>
        )}
      </Box>
      {showForm && (
        <Box className="add-assignment-popup">
          <Button className="close-button" onClick={() => setShowForm(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <Heading as="h2" className="add-assignment-heading">
            Add New Assignment
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
            placeholder="File URL"
            value={fileURL}
            onChange={(e) => setFileURL(e.target.value)}
          />
          <TextInput
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <TextInput
            placeholder="Course ID"
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
          />
          <Button className="done-button" onClick={addAssignment}>
            Done
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Assignments;

