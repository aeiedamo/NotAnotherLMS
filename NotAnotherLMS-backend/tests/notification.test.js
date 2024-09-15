const request = require('supertest');
const express = require('express');
const session = require('express-session');
const passport = require('../config/passport');
const notificationRoutes = require('../routes/notification');
const { sendTelegramMessage } = require('../services/telegramService');

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
app.use('/api/notifications', notificationRoutes);

// Mock Telegram Service
jest.mock('../services/telegramService', () => ({
  sendTelegramMessage: jest.fn(),
}));

describe('Notification Routes', () => {
  it('should send a notification via Telegram', async () => {
    sendTelegramMessage.mockResolvedValue(true);
    const res = await request(app)
      .post('/api/notifications/send')
      .send({ chatId: '123456789', message: 'Test Notification' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Notification sent successfully' });
  });
});
