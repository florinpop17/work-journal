const express = require('express');
const router = express.Router();

// @route:  GET api/users
// @desc:   Tests users route
// @access: Public
router.get('/test', (req, res) => res.json({ msg: 'Users is working!' }));

module.exports = router;