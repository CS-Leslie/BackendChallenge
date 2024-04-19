import request from "supertest";
import express from "express";
import bcrypt from "bcrypt";
import axios from "axios";

import userMiddleware from '../../src/api/middlewares/userMiddleware.js';
import userController from '../../src/api/controllers/userController.js';

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

jest.mock('axios');
const database = { query: jest.fn() };
const app = express();
app.use(express.json());

app.use(userMiddleware.checkUserExists);

app.post("/challenge/users", (req, res) => userController.createUser(req, res));
app.get("/challenge/user", (req, res) => userController.getUser(req, res));

describe("POST /challenge/users", () => {
  beforeEach(() => {
    database.query.mockClear();
    bcrypt.hash.mockClear();
  });

  it("should create a new user if email not in use", async () => {
    bcrypt.hash.mockResolvedValue("hashedpassword");
    database.query.mockResolvedValue({ rows: [] });

    const response = await request(app)
      .post("/challenge/users")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User was created successfully.");
  });

  it("should return 409 if the email is already in use", async () => {
  
    const user = {
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    };

    await request(app)
      .post("/challenge/users")
      .send(user);
  
    const response = await request(app)
      .post("/challenge/users")
      .send(user);
  
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("The email is already in use.");
  });
});
 

// TEST de GET 
// TEST de UPDATE
// TEST de DELETE