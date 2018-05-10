const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

// Load Input Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

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
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};
        const { id } = req.user;

        Profile.findOne({ user: id })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user!';
                    return res.status(404).json(errors);
                }

                res.json(profile);
            })
            .catch(e => res.status(404).json(e));
    }
);

// @route:  GET api/profile/all
// @desc:   Get all profiles
// @access: Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
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
            if (!profile) {
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
            if (!profile) {
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
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.user;
        const { errors, isValid } = validateProfileInput(req.body);

        // Check validation
        if (!isValid) {
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

        if (handle) profileFields.handle = handle;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;

        // Skills
        if (skills !== 'undefined') profileFields.skills = skills.split(',');

        // Social
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        Profile.findOne({ user: id }).then(profile => {
            if (profile) {
                // Update profile
                Profile.findOneAndUpdate(
                    { user: id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile));
            } else {
                // Create profile
                // Check if handle exists
                Profile.findOne({ handle: profileFields.handle }).then(
                    profile => {
                        if (profile) {
                            errors.handle = 'That handle already exists!';
                            return res.status(400).json(errors);
                        }

                        // Save profile
                        new Profile(profileFields)
                            .save()
                            .then(profile => res.json(profile));
                    }
                );
            }
        });
    }
);

// @route:  POST api/profile/experience
// @desc:   Add experience to profile
// @access: Private
router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.user;
        const { errors, isValid } = validateExperienceInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: id }).then(profile => {
            const {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            } = req.body;
            const newExp = {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            };

            // Add to experience array
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        });
    }
);

// @route:  POST api/profile/education
// @desc:   Add education to profile
// @access: Private
router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.user;
        const { errors, isValid } = validateEducationInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: id }).then(profile => {
            const {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            } = req.body;
            const newEdu = {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            };

            // Add to education array
            profile.education.unshift(newEdu);

            profile.save().then(profile => res.json(profile));
        });
    }
);

// @route:  DELETE api/profile
// @desc:   Delete user and profile
// @access: Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.user;
        Profile.findOneAndRemove({ user: id }).then(() => {
            User.findOneAndRemove({ _id: id }).then(() => {
                res.json({ success: true });
            });
        });
    }
);

// @route:  DELETE api/experience/:exp_id
// @desc:   Delete experience from profile
// @access: Private
router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.user;
        const { exp_id } = req.params;

        Profile.findOne({ user: id }).then(profile => {
            // Get remove index
            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(exp_id);

            // If the index was found
            if (removeIndex > -1) {
                // Splice out of array
                profile.experience.splice(removeIndex, 1);

                // Resave it
                profile.save().then(profile => res.json(profile));
            } else {
                return res.status(404).json({
                    error: 'No experience found with the id provided!'
                });
            }
        });
    }
);

// @route:  DELETE api/education/:edu_id
// @desc:   Delete education from profile
// @access: Private
router.delete(
    '/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.user;
        const { edu_id } = req.params;

        Profile.findOne({ user: id }).then(profile => {
            // Get remove index
            const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(edu_id);

            // If the index was found
            if (removeIndex > -1) {
                // Splice out of array
                profile.education.splice(removeIndex, 1);

                // Resave it
                profile.save().then(profile => res.json(profile));
            } else {
                return res.status(404).json({
                    error: 'No education found with the id provided!'
                });
            }
        });
    }
);

module.exports = router;
