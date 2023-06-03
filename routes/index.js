const router = require('express').Router();
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'TqfwiNrRB7w4Sj0PF5exjMQ8bOF87UKw',
  issuerBaseURL: 'https://dev-ympdmkgrv4tdk8hr.us.auth0.com',
};

router.use(auth(config));

router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
router.use('/', require('./swagger'));
router.use('/blogposts', require('./blogposts'));
router.use('/products', require('./products'));

module.exports = router;
