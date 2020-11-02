const express = require('express');
const verify = require('./verifyToken');
const router = express.Router();
const Post = require('../Model/Post');

//Routes
router.get('/', verify, async(req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', verify, async(req, res) => {
    const post = new Post({
        title: req.body.title,
        complaint: req.body.complaint,
        description: req.body.description,
        system_detail: req.body.system_detail,
        phone_number: req.body.phone_number,
        // photo: req.body.photo,
        start_date: req.body.start_date
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({
            message: err
        });
    }

});

module.exports = router;