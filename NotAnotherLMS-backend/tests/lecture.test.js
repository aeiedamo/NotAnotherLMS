const request = require("supertest");
const express = require("express");
const session = require("express-session");
const passport = require("../config/passport");
const lectureRoutes = require("../routes/lecture");
const Lecture = require("../models/Lecture");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "testsecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Mock Authentication Middleware
app.use((req, res, next) => {
  req.isAuthenticated = () => true;
  req.user = { id: 1 }; // Mock user ID
  next();
});

// Routes
app.use("/api/lectures", lectureRoutes);

// Mock Lecture Model
jest.mock("../models/Lecture", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  save: jest.fn(),
  destroy: jest.fn(),
}));

describe("Lecture Routes", () => {
  it("should create a new lecture", async () => {
    Lecture.create.mockResolvedValue({
      id: 1,
      title: "Test Lecture",
      content: "Test Content",
      courseID: 1,
    });
    const res = await request(app)
      .post("/api/lectures")
      .send({ title: "Test Lecture", content: "Test Content", courseID: 1 });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      title: "Test Lecture",
      content: "Test Content",
      courseID: 1,
    });
  });

  it("should get all lectures", async () => {
    Lecture.findAll.mockResolvedValue([
      { id: 1, title: "Test Lecture", content: "Test Content", courseID: 1 },
    ]);
    const res = await request(app).get("/api/lectures");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, title: "Test Lecture", content: "Test Content", courseID: 1 },
    ]);
  });

  it("should get a lecture by ID", async () => {
    Lecture.findByPk.mockResolvedValue({
      id: 1,
      title: "Test Lecture",
      content: "Test Content",
      courseID: 1,
    });
    const res = await request(app).get("/api/lectures/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      title: "Test Lecture",
      content: "Test Content",
      courseID: 1,
    });
  });

  it("should update a lecture", async () => {
    const mockLecture = {
      id: 1,
      title: "Test Lecture",
      content: "Test Content",
      courseID: 1,
      save: jest.fn().mockResolvedValue(true),
    };
    Lecture.findByPk.mockResolvedValue(mockLecture);
    const res = await request(app)
      .put("/api/lectures/1")
      .send({ title: "Updated Lecture" });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated Lecture");
  });

  it("should delete a lecture", async () => {
    const mockLecture = {
      id: 1,
      title: "Test Lecture",
      content: "Test Content",
      courseID: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };
    Lecture.findByPk.mockResolvedValue(mockLecture);
    const res = await request(app).delete("/api/lectures/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Lecture was deleted successfully" });
  });
});
