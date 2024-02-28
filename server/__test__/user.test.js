const request = require('supertest');
const app = require('../app'); // Import your express app
const { User } = require('../models/index');
const { hashPassword, comparePassword, signToken, verifyToken } = require('../helpers');

jest.mock('../models/index', () => ({
  User: {
    create: jest.fn(),
    findOne: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock('../helpers/hashedPassword', () => ({
  hashPassword: jest.fn(),
  comparePassword: jest.fn().mockReturnValue(true), // Assume password comparison is always successful for simplicity
}));

jest.mock('../helpers/jwt', () => ({
  signToken: jest.fn().mockReturnValue('fake_token'),
  verifyToken: jest.fn(),
}));

describe('UserController', () => {
  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      const newUser = {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'john.doe@example.com',
        Password: 'password123',
        PhoneNumber: '1234567890',
        ImageURL: 'http://example.com/image.jpg',
      };
      User.create.mockResolvedValue(newUser);

      const response = await request(app)
        .post('/users/register')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toContain(newUser.Email);
    });

    // Add more tests to cover error cases
  });

  describe('userLogin', () => {
    it('should login user successfully', async () => {
      const userCredentials = {
        Email: 'john.doe@example.com',
        Password: 'password123',
      };
      const user = {
        id: 1,
        Email: userCredentials.Email,
        Password: userCredentials.Password,
      };
      User.findOne.mockResolvedValue(user);

      const response = await request(app)
        .post('/users/login')
        .send(userCredentials);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('access_token');
      expect(response.body.access_token).toBe('fake_token');
    });

    // Add more tests to cover cases like invalid login, missing email/password
  });

  // Continue with tests for getUserById and editDataUser
});

