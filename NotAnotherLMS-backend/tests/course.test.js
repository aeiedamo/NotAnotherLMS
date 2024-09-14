const request = require('supertest');
const express = require('express');
const session = require('express-session');
const passport = require('../config/passport');
const courseRoutes = require('../routes/course');
const Course = require('../models/Course');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'testsecret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Mock Authentication Middleware
app.use((req, res, next) => {
  req.isAuthenticated = () => true;
  req.user = { id: 1 }; // Mock user ID
  next();
});

// Routes
app.use('/api/courses', courseRoutes);

// Mock Course Model
jest.mock('../models/Course', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  save: jest.fn(),
  destroy: jest.fn(),
}));

describe('Course Routes', () => {
  it('should create a new course', async () => {
    Course.create.mockResolvedValue({
      id: 1,
      title: 'Test Course',
      description: 'Test Description',
      instructorId: 1,
    });
    const res = await request(app)
      .post('/api/courses')
      .send({ title: 'Test Course', description: 'Test Description', instructorId: 1 });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      title: 'Test Course',
      description: 'Test Description',
      instructorId: 1,
    });
  });

  it('should get all courses', async () => {
    Course.findAll.mockResolvedValue([
      { id: 1, title: 'Test Course', description: 'Test Description', instructorId: 1 },
    ]);
    const res = await request(app).get('/api/courses');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, title: 'Test Course', description: 'Test Description', instructorId: 1 },
    ]);
  });

  it('should get a course by ID', async () => {
    Course.findByPk.mockResolvedValue({
      id: 1,
      title: 'Test Course',
      description: 'Test Description',
      instructorId: 1,
    });
    const res = await request(app).get('/api/courses/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      title: 'Test Course',
      description: 'Test Description',
      instructorId: 1,
    });
  });

  it('should update a course', async () => {
    const mockCourse = {
      id: 1,
      title: 'Test Course',
      description: 'Test Description',
      instructorId: 1,
      save: jest.fn().mockResolvedValue(true),
    };
    Course.findByPk.mockResolvedValue(mockCourse);
    const res = await request(app)
      .put('/api/courses/1')
      .send({ title: 'Updated Course' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Course');
  });

  it('should delete a course', async () => {
    const mockCourse = {
      id: 1,
      title: 'Test Course',
      description: 'Test Description',
      instructorId: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };
    Course.findByPk.mockResolvedValue(mockCourse);
    const res = await request(app).delete('/api/courses/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Course deleted successfully' });
  });
});
