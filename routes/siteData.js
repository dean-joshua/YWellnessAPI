const express = require('express');
const router = express.Router();
const {
  getSiteData,
  getPageData,
  addPageData,
} = require('../controllers/siteData');

router.get('/', getSiteData);
router.get('/:id', getPageData);
router.post('/', addPageData);
// router.put('/:id', updatePageData);
// router.delete('/:id', removePageData);

module.exports = router;
