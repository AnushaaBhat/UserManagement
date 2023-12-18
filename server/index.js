const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'thisisthetokenforrhenususermanagementsystem';

app.use(cors());
app.use(bodyParser.json());

// In-memory user array
let users = [];

app.post('/accessToken', (req, res) => {
  // Create a JWT without payload
  const token = jwt.sign({}, secretKey, { expiresIn: '20h' });

  res.json({ accessToken: token });
});

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token.replace('Bearer ', ''), secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    next();
  });
};

app.use(authenticateToken);

// Get all users
app.get('/users/get-list', (req, res) => {
  res.json(users);
});

// Add a new user
app.post('/users/create-and-get-list', (req, res) => {
  const { firstName, lastName, dob } = req.body;

  // Validate input
  if (!firstName || !lastName || !dob) {
    return res.status(400).json({ error: 'First name, last name, and date of birth are required fields' });
  }

  const newUser = {
    firstName,
    lastName,
    dob,
  };

  users.push(newUser);
  res.json(users);
});

//Delete user
app.post('/users/delete-and-get-list', (req, res) => {
  const { index } = req.body;

  users.splice(index, 1);
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});