const router = require('express').Router();
const dotenv = require('dotenv'); // Using dotenv to get our mongodb uri
dotenv.config();
const User = require('../models/users');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

router.use(auth(config));

router.get('/', (req, res) => {
  // #swagger.tags= ['Auth']
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.use('/', require('./swagger'));
router.use('/blogposts', require('./blogposts'));
router.use('/products', require('./products'));
router.use('/user', require('./users'));

module.exports = router;
