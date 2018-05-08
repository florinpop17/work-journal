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

// @route:  POST api/profile
// @desc:   Create or edit user profile
// @access: Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.user;

    // Get fields
    const profileFields = {};
    profileFields.user = id;

    const {
        handle,
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = req.body;

    if(handle) profileFields.handle = handle;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;

    // Skills
    if(skills !== 'undefined') profileFields.skills = skills.split(',');

    // Social
    profileFields.social = {};
    if(youtube) profileFields.youtube = youtube;
    if(twitter) profileFields.twitter = twitter;
    if(facebook) profileFields.facebook = facebook;
    if(linkedin) profileFields.linkedin = linkedin;
    if(instagram) profileFields.instagram = instagram;

    Profile.findOne({ user: id })
        .then(profile => {
            if(profile) {
                // Update profile
                Profile.findOneAndUpdate({ user: id }, { $set: profileFields }, { new: true })
                    .then(profile => res.json(profile));
            } else {
                // Create profile
                // Check if handle exists
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if(profile) {
                            errors.handle = 'That handle already exists!';
                            return res.status(400).json(errors);
                        }

                        // Save profile
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    });
            }
        });
});

module.exports = router;