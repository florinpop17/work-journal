const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

// Load Profile model
const Profile = require('../../models/Profile');
// Load User model
const User = require('../../models/User');

// @route:  GET api/profile/test
// @desc:   Tests profile route
// @access: Public
router.get('/test', (req, res) => res.json({ msg: 'Profiles is working!' }));

// @route:  GET api/profile
// @desc:   Get current user profile
// @access: Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    const { id } = req.user;

    Profile.findOne({ user: id })
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user!';
                return res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(e => res.status(404).json(e));
});

module.exports = router;