const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { requiresAuth } = require('express-openid-connect');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId: userId });

    if (!user) {
      console.log('User not found');
      return res.sendStatus(404);
    }

    res.json(user); // Send the user data as a JSON response
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.sendStatus(500);
  }
});

// Route to handle user creation
router.post('/', async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    birthDate,
    email,
    phone,
    age,
    weight,
    height,
    goal,
    yourWhy,
  } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ userId: userId });

    if (existingUser) {
      existingUser.firstName = firstName;
      existingUser.lastName = lastName;
      existingUser.birthDate = birthDate;
      existingUser.email = email;
      existingUser.phone = phone;
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
      birthDate,
      email,
      phone,
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
    res.sendStatus(500); // Send an error response if an error occurs during user creation
  }
});

module.exports = router;
