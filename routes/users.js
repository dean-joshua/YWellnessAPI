const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { body, validationResult } = require('express-validator');
const { requiresAuth } = require('express-openid-connect');

router.get('/', async (req, res) => {
  // #swagger.tags= ['Users']
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving blog posts', error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  // #swagger.tags= ['Users']
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId: userId });

    if (!user) {
      console.log('User not found');
      return res.status(200).status('This user has not set up an account yet');
    }

    res.json(user); // Send the user data as a JSON response
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.sendStatus(500);
  }
});

// Route to handle user creation
router.post(
  '/',
  [
    // Sanitize and validate the input data
    body('userId').trim().escape(),
    body('firstName').trim().escape(),
    body('lastName').trim().escape(),
    body('email').trim().escape().isEmail(),
    body('goal').trim().escape(),
    body('weight').trim().escape().isFloat(),
    body('height').trim().escape().isFloat(),
    body('age').trim().escape().isInt(),
    body('yourWhy').trim().escape(),
  ],
  async (req, res) => {
    // #swagger.tags= ['Users']

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      userId,
      firstName,
      lastName,
      email,
      goal,
      weight,
      height,
      age,
      yourWhy,
    } = req.body;

    try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ userId: userId });

      if (existingUser) {
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.email = email;
        existingUser.age = age;
        existingUser.weight = weight;
        existingUser.height = height;
        existingUser.goal = goal;
        existingUser.yourWhy = yourWhy;

        await existingUser.save();
        console.log('User already exists');
        return res.sendStatus(200); // Send a success response if the user already exists
      }

      // Create a new user
      const newUser = new User({
        userId,
        firstName,
        lastName,
        email,
        age,
        weight,
        height,
        goal,
        yourWhy,
      });
      await newUser.save();
      console.log('User created successfully');

      res.sendStatus(201); // Send a success response if the new user is created
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send({ message: 'error with user', err: error.message }); // Send an error response if an error occurs during user creation
    }
  }
);

module.exports = router;
