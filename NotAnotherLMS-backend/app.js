const express = require("express");
const authRoutes = require("./routes/auth");
const LectureRoutes = require('./routes/lecture');
const sequelize = require("./config/config");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/lectures', LectureRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing database: ", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listenning at port ${PORT}`);
});
