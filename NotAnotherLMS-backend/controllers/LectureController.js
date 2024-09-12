const Lecture = require('../models/Lecture');

const createLecture = async (req, res) => {
    try {
        const { title, description, videoURL } = req.body;

        const lecture = new Lecture.create({
            title, description, videoURL, instructorID: req.user.id
        });

        return res.status(201).json({ message: 'Lecture added successfully', lecture });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to add lecture' });
    }
};

const getLectures = async (req, res) => {
    try {
        const lectures = await Lecture.findAll();
        return res.status(200).json({ lectures });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch lectures" });
    }
};

module.exports = { createLecture, getLectures };
