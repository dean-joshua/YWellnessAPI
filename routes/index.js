const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/blogposts', require('./blogposts'));
router.use('/products', require('./products'));
router.use('/siteData', require('./siteData'));

module.exports = router;
