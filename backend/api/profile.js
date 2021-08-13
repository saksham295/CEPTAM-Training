const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require("express-validator");

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// MY PROFILE
router.get('/me', [auth], async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user._id}).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// MY COURSES
router.get('/me/courses', [auth], async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user._id});
    res.json(user.courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET USER PROFILE BY ID
router.get('/user/:id', [auth, admin], async ({ params: { id } }, res) => {
  try {
    const user = await User.findOne({_id: id}).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// CHANGE USER STATUS
router.post(
  '/changestatus',
  [
    auth,
    admin,
    [
      check('userid', 'User ID is required').trim().not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userid, newstatus } = req.body;

    try {
      let user = await User.findOne({ _id: userid });
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ message: "User Not Found" }] });
      }

      user.status = newstatus;

      await user.save();
      const newuser = await User.find().populate("user", ["name"]);
      return res.json(newuser);
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({ errors: [{ message: 'Server Error' }] });
    }
  }
);


// EDIT PROFILE
router.put(
  '/editprofile',
  [
    auth,
    admin,
    [
      check('id', 'User ID is required').trim().not().isEmpty(),
      check("name", "Name is required").trim().not().isEmpty(),
      check("email", "Include a valid email").trim().isEmail(),
      check("phone", "10 digit mobile number required")
        .trim()
        .isNumeric()
        .isLength(10),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, phone, email } = req.body;

    try {
      let user = await User.findOne({ _id: id });
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ message: "User Not Found" }] });
      }

      user.name = name;
      user.email = email;
      user.phone = phone;

      await user.save();
      return res.json(user);
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({ errors: [{ message: 'Server Error' }] });
    }
  }
);

module.exports = router;