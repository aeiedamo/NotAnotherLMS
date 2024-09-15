const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const passport = require('./config/passport');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const lectureRoutes = require("./routes/lecture");
const assignmentRoutes = require('./routes/assignment');
const notificationsRoutes = require('../routes/notification');
const sequelize = require('./config/config');
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/notifications", notificationsRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing database: ", err);
  });

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send({ message: "An error occurred within Middleware!", error: error.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listenning at port ${PORT}`);
});
