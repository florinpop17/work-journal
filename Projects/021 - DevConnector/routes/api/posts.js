const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

// Load Input Validation
const validatePostInput = require('../../validation/post');

// Load Post model
const Post = require('../../models/Post');

// @route:  GET api/posts/test
// @desc:   Tests posts route
// @access: Public
router.get('/test', (req, res) => res.json({ msg: 'Posts is working!' }));

// @route:  POST api/posts
// @desc:   Create post
// @access: Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const { text, name, avatar } = req.body;
    const { id } = req.user;

    const newPost = { text, name, avatar, user: id };

    new Post(newPost).save().then(post => res.json(post));
});

module.exports = router;