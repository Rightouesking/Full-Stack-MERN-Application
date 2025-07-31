// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import User from '../models/User.js';

const router = express.Router();

// Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new user
router.post('/', async (req, res) => {
  const { username, email } = req.body;

  try {
    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
