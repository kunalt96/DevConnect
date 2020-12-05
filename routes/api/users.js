const express = require('express');
const router = express.Router();
// Calling express validations to do validations
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @route POST api/users
// @desc  Register user route
// @acess Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide email address').isEmail(),
    check('password', 'Please enter valid password').isLength(6),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user)
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });

      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.send('User Registered');
    } catch (err) {
      console.log(err.message);
      res.send(500).send('Server Error');
    }
  }
);

module.exports = router;
