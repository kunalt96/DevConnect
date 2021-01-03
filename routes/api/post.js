const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
// const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');

// @route GET api/posts
// @desc  Test route
// @acess Public
router.post(
  '/',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      console.log('Hey');
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };
      const post = await Post.create(newPost);
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    console.log('YIPEE', post);
    if (post.length < 1) return res.status(404).send('Post not found');
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) return res.json(post);
    res.status(404).send('Post Not available');
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      res.status(404).send('Post Not available');
    }
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();
    res.json('Post removed');
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      res.status(404).send('Post Not available');
    }
    res.status(500).send('Server error');
  }
});

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => {
        return like.user.toString() === req.user.id;
      }).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => {
        return like.user.toString() === req.user.id;
      }).length === 0
    ) {
      return res.status(400).json({ msg: 'Post is not liked' });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

router.post(
  '/comment/:id',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    console.log('Kunal');
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      post.save();
      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.delete('/comments/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).send('Post not found');

    let commentIndexRemove = post.comments
      .map((comment) => {
        return comment._id;
      })
      .indexOf(req.params.comment_id);
    if (post.comments[commentIndexRemove].user.toString() === req.user.id) {
      post.comments.splice(commentIndexRemove, 1);
      post.save();
      res.send(post.comments);
    } else {
      return res
        .status(404)
        .json({ msg: 'Either comment not found or not authorized to do' });
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      res.status(404).send('Post or Comment Not available');
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
