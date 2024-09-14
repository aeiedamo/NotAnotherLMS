const Course = require("../models/Course");

const createCourse = async (req, res) => {
  try {
    const { title, description, instructorID } = req.body;

    const course = await Course.create({
      title,
      description,
      instructorID,
    });

    res.status(201).send(course);
  } catch (error) {
    console.error("Error in createCourse:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.send(courses);
  } catch (error) {
    console.error("Error in getCourses:", error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course)
      return res.status(404).send({ message: "Course was not found" });

    res.send(course);
  } catch (error) {
    console.error("Error in getCourseById:", error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { title, description, instructorID } = req.body;

    const course = await Course.findByPk(req.params.id);

    if (!course)
      return res.status(404).send({ message: "Course was not found" });

    course.title = title || course.title;
    course.description = description || course.description;
    course.instructorID = instructorID || course.instructorID;

    await course.save();
    res.send(course);
  } catch (error) {
    console.error("Error in updateCourse:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course)
      return res.status(404).send({ message: "Course was not found" });

    await course.destroy();
    res.send({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCourse:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
