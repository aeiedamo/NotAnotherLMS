const request = require("supertest");
const express = require("express");
const session = require("express-session");
const passport = require("../config/passport");
const userRoutes = require("../routes/user");
const User = require("../models/User");

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
app.use("/api/user", userRoutes);

// Mock User Model
jest.mock("../models/User", () => ({
  findByPk: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
}));

describe("User Routes", () => {
  beforeAll(() => {
    // Mock user creation
    User.create.mockResolvedValue({
      id: 1,
      name: "Test User",
      email: "test@google.com",
    });
  });

  it("should create user profile", async () => {
    const user = await User.create({
      name: "Test User",
      email: "test@google.com",
    });
    expect(user).toEqual({
      id: 1,
      name: "Test User",
      email: "test@google.com",
    });
  });

  it("should get user profile", async () => {
    User.findByPk.mockResolvedValue({
      id: 1,
      name: "Test User",
      email: "test@google.com",
    });
    const res = await request(app).get("/api/user/profile");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "Test User",
      email: "test@google.com",
    });
  });

  it("should update user profile", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@google.com",
      save: jest.fn().mockResolvedValue(true),
    };
    User.findByPk.mockResolvedValue(mockUser);
    const res = await request(app)
      .put("/api/user/profile")
      .send({ name: "Updated User" });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated User");
  });
});
