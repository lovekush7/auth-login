const express = require('express');
const router = express.Router();
const Post = require('../Model/Post');

//Routes

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  }
  catch (err) {
    res.json({ message: err });
  }
});



router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    project_type: req.body.project_type,
    description: req.body.description,
    pending_work: req.body.pending_work,
    team: req.body.team,
    start_date: req.body.start_date,
    end_date: req.body.end_date

  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  }
  catch (err) {
    res.json({
      message: err
    });
  }

});



module.exports = router;