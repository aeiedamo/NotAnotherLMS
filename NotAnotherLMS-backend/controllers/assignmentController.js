const Assignment = require("../models/Assignment");
const { bot } = require("../services/telegramService");

const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, courseID } = req.body;
    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      courseID,
    });
    var message = `New Assignment Created: ${title}\nDescription: ${description}\nDue Date: ${dueDate}`;
    bot.notify(message);
    res.status(201).send(assignment);
  } catch (error) {
    console.error("Error in createAssignment:", error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll();
    res.send(assignments);
  } catch (error) {
    console.error("Server Error in getAssignments:", error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);

    if (!assignment)
      return res.status(404).send({ message: "Assignment not found" });

    res.send(assignment);
  } catch (error) {
    console.error("Server Error in getAssignmentById:", error);

    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, courseID } = req.body;
    const assignment = await Assignment.findByPk(req.params.id);

    if (!assignment)
      return res.status(404).send({ message: "Assignment not found" });

    assignment.title = title || assignment.title;
    assignment.description = description || assignment.description;
    assignment.dueDate = dueDate || assignment.dueDate;
    assignment.courseID = courseID || assignment.courseID;

    await assignment.save();
    res.send(assignment);
  } catch (error) {
    console.error("Error in updateAssignment:", error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment)
      return res.status(404).send({ message: "Assignment not found" });

    await assignment.destroy();
    res.send({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.error("Server Error in deleteCourse", error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
