const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys = require('../../config/keys');

const router = express.Router();

// Load Input Validation
const validateReqisterInput = require('../../validation/register');

// Load User model
const User = require('../../models/User');

// @route:  GET api/users/test
// @desc:   Tests users route
// @access: Public
router.get('/test', (req, res) => res.json({ msg: 'Users is working!' }));

// @route:  GET api/users/register
// @desc:   Register user
// @access: Public
router.post('/register', (req, res) => {
    const { email } = req.body;
    const { errors, isValid } = validateReqisterInput(req.body);

    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email })
        .then(user => {
            // User/Email is in the database
            if(user) {
                errors.email = 'Email already exists!'
                return res.status(400).json(errors);
            } else {
                const { name, password } = req.body;
                const avatar = gravatar.url(email, {
                    s: '200', // the size of the image
                    r: 'pg', // the rating
                    d: 'mm' // default image
                });
                const newUser = new User({
                    name,
                    email,
                    password,
                    avatar
                });

                // Hashing the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if(err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(e => console.error(e));
                    });
                });
            }
        });
});

// @route:  GET api/users/login
// @desc:   Login user / Returning JWT Token
// @access: Public
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    User.findOne({ email })
        .then(user => {
            // Check for user
            if(!user) {
                return res.status(404).json({ email: 'User not found!' });
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // Create payload
                        const { id, name, avatar } = user;
                        const payload = {
                            id,
                            name,
                            avatar
                        }
                        // Sign token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            });
                        });
                    } else {
                        return res.status(400).json({ password: 'Incorrect password!' });
                    }
                });
        });
});

// @route:  GET api/users/current
// @desc:   Return the current user
// @access: Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id, name, email, avatar } = req.user;
    res.json({
        id,
        name,
        email
    });
});

module.exports = router;