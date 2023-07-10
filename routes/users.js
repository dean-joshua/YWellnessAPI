const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { requiresAuth } = require('express-openid-connect');

router.get('/login', (req, res) => {
  res.oidc.login({ returnTo: '/user/callback' });
});

router.get('/callback', async (req, res) => {
  try {
    console.log(req.oidc.user);
    const user = req.oidc.user;
    const { sub, given_name, name, email, picture } = user;

    // Check if the user already exists in the database
    let existingUser = await User.findOne({ userId: sub });

    if (existingUser) {
      // Update the existing user data
      existingUser.given_name = given_name;
      existingUser.name = name;
      existingUser.email = email;
      existingUser.picture = picture;

      await existingUser.save();
    } else {
      // Create a new user in the database
      await User.create({
        userId: sub,
        given_name,
        name,
        email,
        picture,
      });
    }
    res.redirect(`http://localhost:3000/profile/${email}`);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Server error' });
  }
});

router.get('/profile/:email', async (req, res) => {
  try {
    console.log('Hi!');
    const userId = req.oidc.user.sub;
    const userEmail = req.body.email;
    console.log(req.oidc.user);
    const user = await User.findOne({ userEmail });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Server error' });
  }
});

module.exports = router;
