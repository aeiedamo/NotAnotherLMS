import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Text, TextInput } from "@primer/react";
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
      <Link to="/dashboard" className="back-button">
        <Button className="btn-small">Back to Dashboard</Button>
      </Link>
      <Heading as="h1" className="assignments-header">
        Assignments
      </Heading>
      <Box className="assignments-panel">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <Box key={assignment.id} className="assignment-item">
              <Heading as="h3">{assignment.title}</Heading>
              <Text>{assignment.description}</Text>
              <a
                href={assignment.fileURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                File
              </a>
              <Text>Due Date: {new Date(assignment.dueDate).toLocaleString()}</Text>
              <Button
                className="btn-small delete-button"
                onClick={() => deleteAssignment(assignment.id)}
              >
                Delete
              </Button>
            </Box>
          ))
        ) : (
          <Text>No assignments available</Text>
        )}
      </Box>
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Assignment"}
      </Button>
      {showForm && (
        <Box className="add-assignment-form">
          <Heading as="h2">Add New Assignment</Heading>
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
          <Button onClick={addAssignment}>Add Assignment</Button>
        </Box>
      )}
    </Box>
  );
};

export default Assignments;
