const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      console.error("User not found");
      return res.status(404).send({ message: "User not found" });
    }

    res.send(user);
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).send({
      message: "Server error within user controller",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      console.error("User not found");
      return res.status(404).send({ message: "User not found" });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.send(user);
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).send({
      message: "Server error within user controller",
      error: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
