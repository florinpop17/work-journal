const express = require('express');
const router = express.Router();

// @route:  GET api/profiles
// @desc:   Tests profiles route
// @access: Public
router.get('/test', (req, res) => res.json({ msg: 'Profiles is working!' }));

module.exports = router;