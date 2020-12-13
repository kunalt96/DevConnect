const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
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

module.exports = router;
