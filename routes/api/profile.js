const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile
// @desc  Test route
// @acess Public
router.get('/', (req, res) => {
  res.send('From ROutess....PROFILE');
});

router.get('/me', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name']
    );
    if (!profile)
      return res.status(400).json({ message: 'No profile for the user' });
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
