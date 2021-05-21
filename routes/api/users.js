const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');
var nodemailer = require('nodemailer');
const emailTemplateLoginConfirmation = require('./emailTemplate');
require('dotenv').config();

const User = require('../../models/User');

function sendEmailToNewUsers(name, email) {
  // console.log(name, email);
  // console.log(process.env.OUTLOOK_EMAIL_ID);
  var transport = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: process.env.OUTLOOK_EMAIL_ID,
      pass: process.env.OUTLOOK_PASSWORD,
    },
  });

  // console.log('in --------- ');

  var mailOptions = {
    from: 'kunaltiwari55@outlook.com',
    to: email,
    bcc: 'kunaltiwari55@outlook.com',
    subject: `Welcome ${name}`,
    html: emailTemplateLoginConfirmation(name),
  };

  // console.log('out ------------------');

  transport.sendMail(mailOptions, function (error, info) {
    console.log('inhere it is come');
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log('Email sent: ' + info.response);
      return true;
    }
  });
}

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, isAdmin } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ errors: [{ message: 'User already exists' }] });

      user = new User({ name, email, password, isAdmin });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (error, token) => {
          if (error) throw error;
          // SEND MAIL TO DIFFERENT PEOPLE NOW HERE
          sendEmailToNewUsers(name, email);
          // console.log('in here,,,,,,,,,,,,,,,,,');
          res.json({ token });
        }
      );

      // res.send('User Registered');
    } catch (err) {
      console.log(err.message);
      res.send(500).send('Server Error');
    }
  }
);

router.put(
  '/forgotPassword',
  [
    check('email', 'Please provide email address').isEmail(),
    check('password', 'Please enter valid password').isLength(6),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Invalid credentials' }] });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.status(200).json({ msg: 'Password changed' });
    } catch (err) {
      console.log(err.message);
      res.send(500).send('Server Error');
    }
  }
);

module.exports = router;
