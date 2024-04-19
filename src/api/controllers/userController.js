import database from "../../config/db.js";
import bcrypt from "bcrypt";
import axios from "axios";

const { NODE_ENV } = process.env;

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (req.userExists) {
    return res.status(409).json({ message: "The email is already in use." });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    await database.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", 
      [name, email, hash]);
    return res.status(201).json({ message: "User was created successfully." });
  } catch (error) {
    return NODE_ENV === 'development'
      ? console.log({ message: `${error}` })
      : res
          .status(500)
          .json({ message: 'Something went wrong getting the user.' });
  }
};

const getUser = async (req, res) => {
  if (!req.userExists) {
    return res.status(404).json({ message: "User does not exist." });
  }

  const { email } = req.query;
  try {
    const userResult = await database.query("SELECT role FROM users WHERE email = $1", [email]);
    const userRole = userResult.rows[0].role;

    const apiUrls = {
      // admin: 'https://ghibliapi.vercel.app/admin', La url no es correcta
      films: 'https://ghibliapi.vercel.app/films',
      people: 'https://ghibliapi.vercel.app/people',
      locations: 'https://ghibliapi.vercel.app/locations',
      species: 'https://ghibliapi.vercel.app/species',
      vehicles: 'https://ghibliapi.vercel.app/vehicles',
    };

    if (!apiUrls[userRole]) {
      return res.status(400).json({ message: "Invalid role or role does not have access to any data." });
    }

    const response = await axios.get(apiUrls[userRole]);
    return res.status(200).json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const users = await database.query(
      "SELECT * FROM users LIMIT $1 OFFSET $2", 
      [limit, offset]);
    return res.status(200).json({ users: users.rows });
  } catch (error) {
    return NODE_ENV === 'development'
      ? console.log({ message: `${error}` })
      : res
          .status(500)
          .json({ message: 'Internal server error. Getting users.' });
  }
};

const updateUser = async (req, res) => {
  const { name, password, role } = req.body;
  const { email } = req.query;
  if (!req.userExists) {
    return res.status(404).json({ message: "User does not exist." });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    await database.query(
      "UPDATE users SET name = $1, password = $2, role = $3 WHERE email = $4", [name, hash, role, email]);
    return res.status(200).json({ 
      message: `User: ${email} was updated successfully.` 
    });
  } catch (error) {
    return NODE_ENV === 'development'
      ? console.log({ message: `${error}` })
      : res
          .status(500)
          .json({ message: 'Internal server error. Updating user.' });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.query;
  if (!req.userExists) {
    return res.status(404).json({ message: "User does not exist." });
  }
  try {
    await database.query("DELETE FROM users WHERE email = $1", [email]);
    return res.status(200).json({ message: `User: ${email} was deleted successfully.` });
  } catch (error) {
    return NODE_ENV === 'development'
      ? console.log({ message: `${error}` })
      : res
          .status(500)
          .json({ message: 'Internal server error. Deleting user.' });
  }
};

export default { createUser, getUser, updateUser, deleteUser, getUsers };