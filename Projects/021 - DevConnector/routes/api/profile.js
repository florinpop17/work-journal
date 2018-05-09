const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

// Load Input Validation
const validateProfileInput = require('../../validation/profile');

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
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user!';
                return res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(e => res.status(404).json(e));
});

// @route:  GET api/profile/all
// @desc:   Get all profiles
// @access: Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if(!profiles) {
                errors.noprofile = 'There are no profiles!';
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(e => res.status(404).json(e));
});

// @route:  GET api/profile/handle/:handle
// @desc:   Get profile by handle
// @access: Public
router.get('/handle/:handle', (req, res) => {
    const { handle } = req.params;
    const errors = {};

    Profile.findOne({ handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user!';
                return res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(e => res.status(404).json(e));
});

// @route:  GET api/profile/user/:user_id
// @desc:   Get profile by user ID
// @access: Public
router.get('/user/:user_id', (req, res) => {
    const user = req.params.user_id;
    const errors = {};
    
    Profile.findOne({ user })
        .populate('user', ['name', 'avatar'])
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
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

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
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

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