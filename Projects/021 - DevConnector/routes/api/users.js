const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();

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

    User.findOne({ email })
        .then(user => {
            // User/Email is in the database
            if(user) {
                return res.status(400).json({
                    email: 'Email already exists'
                });
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

module.exports = router;