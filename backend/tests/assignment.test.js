const request = require('supertest');
const express = require('express');
const session = require('express-session');
const passport = require('../config/passport');
const assignmentRoutes = require('../routes/assignment');
const Assignment = require('../models/Assignment');

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
app.use('/api/assignments', assignmentRoutes);

// Mock Assignment Model
jest.mock('../models/Assignment', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  save: jest.fn(),
  destroy: jest.fn(),
}));

describe('Assignment Routes', () => {
  it('should create a new assignment', async () => {
    Assignment.create.mockResolvedValue({
      id: 1,
      title: 'Test Assignment',
      description: 'Test Description',
      dueDate: '2023-12-31T23:59:59.999Z',
      courseID: 1,
    });
    const res = await request(app)
      .post('/api/assignments')
      .send({ title: 'Test Assignment', description: 'Test Description', dueDate: '2023-12-31T23:59:59.999Z', courseID: 1 });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      title: 'Test Assignment',
      description: 'Test Description',
      dueDate: '2023-12-31T23:59:59.999Z',
      courseID: 1,
    });
  });

  it('should get all assignments', async () => {
    Assignment.findAll.mockResolvedValue([
      { id: 1, title: 'Test Assignment', description: 'Test Description', dueDate: '2023-12-31T23:59:59.999Z', courseID: 1 },
    ]);
    const res = await request(app).get('/api/assignments');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, title: 'Test Assignment', description: 'Test Description', dueDate: '2023-12-31T23:59:59.999Z', courseID: 1 },
    ]);
  });

  it('should get an assignment by ID', async () => {
    Assignment.findByPk.mockResolvedValue({
      id: 1,
      title: 'Test Assignment',
      description: 'Test Description',
      dueDate: '2023-12-31T23:59:59.999Z',
      courseID: 1,
    });
    const res = await request(app).get('/api/assignments/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      title: 'Test Assignment',
      description: 'Test Description',
      dueDate: '2023-12-31T23:59:59.999Z',
      courseID: 1,
    });
  });

  it('should update an assignment', async () => {
    const mockAssignment = {
      id: 1,
      title: 'Test Assignment',
      description: 'Test Description',
      dueDate: '2023-12-31T23:59:59.999Z',
      courseID: 1,
      save: jest.fn().mockResolvedValue(true),
    };
    Assignment.findByPk.mockResolvedValue(mockAssignment);
    const res = await request(app)
      .put('/api/assignments/1')
      .send({ title: 'Updated Assignment' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Assignment');
  });

  it('should delete an assignment', async () => {
    const mockAssignment = {
      id: 1,
      title: 'Test Assignment',
      description: 'Test Description',
      dueDate: '2023-12-31T23:59:59.999Z',
      courseID: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };
    Assignment.findByPk.mockResolvedValue(mockAssignment);
    const res = await request(app).delete('/api/assignments/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Assignment deleted successfully' });
  });
});
