const Lecture = require("../models/Lecture");
const { bot } = require("../services/telegramService");

const createLecture = async (req, res) => {
  try {
    const { title, description, courseID, videoURL } = req.body;
    const lecture = await Lecture.create({
      title,
      description,
      courseID,
      videoURL,
      notified: false,
    });

    var message = `New Lecture Created: ${title}\nDescription: ${description}\nVideo: ${videoURL}`;

    bot.notify(message, lecture);
    res.status(201).send(lecture);
  } catch (error) {
    console.error("Error in createLecture", error);
    res.status(500).send({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.findAll();
    res.send(lectures);
  } catch (error) {
    console.error("Error in getLectures:", error);

    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

const getLectureById = async (req, res) => {
  try {
    const lecture = await Lecture.findByPk(req.params.id);

    if (!lecture)
      return res.status(404).send({ message: "Lecture was not found" });
    res.send(lecture);
  } catch (error) {
    console.error("Error in getLectureById:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const updateLecture = async (req, res) => {
  try {
    const { title, content, courseID } = req.body;
    const lecture = await Lecture.findByPk(req.params.id);

    if (!lecture)
      return res.status(404).send({ message: "Lecture was not found" });

    lecture.title = title || lecture.title;
    lecture.content = content || lecture.content;
    lecture.courseID = courseID || lecture.courseID;

    await lecture.save();
    res.send(lecture);
  } catch (error) {
    console.error("Error in updateLecture:", error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByPk(req.params.id);

    if (!lecture)
      return res.status(404).send({ message: "Lecture was not found" });

    await lecture.destroy();
    res.send({ message: "Lecture was deleted successfully" });
  } catch (error) {
    console.error("Error in deleteLecture:", error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createLecture,
  getLectures,
  getLectureById,
  updateLecture,
  deleteLecture,
};
