const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Center = require("../models/Center");
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const checkObjectId = require("../middleware/checkObjectId");

// GET USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("user", ["name"]);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET FACULTY LIST
router.get("/faculty", async (req, res) => {
  try {
    const users = await User.find({ role: "Faculty" }).populate("user", [
      "name",
    ]);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// REGISTER USER
router.post(
  "/register",
  [
    auth,
    admin,
    [
      check("name", "Name is required").trim().not().isEmpty(),
      check("phone", "10 digit mobile number required")
        .trim()
        .isNumeric()
        .isLength(10),
      check("center", "Center Name is required").trim().not().isEmpty(),
      check("email", "Include a valid email").trim().isEmail(),
      check("password", "Password should be alteast 6 character").isLength({
        min: 6,
      }),
      check("role", "Role is required").trim().not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, password, center, role } = req.body;

    try {
      //  check if the user is exist
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: "E-Mail Already in Use" }] });
      }

      let workCenter = await Center.findOne({ _id: center });
      if (!workCenter) {
        return res
          .status(400)
          .json({ errors: [{ message: "Work Center not available" }] });
      }

      const salt = await bcrypt.genSalt(10);
      user = new User({
        name,
        phone,
        email,
        password: await bcrypt.hash(password, salt),
        center: workCenter._id,
        centerName: workCenter.name,
        role,
      });

      await user.save();

      const newuser = await User.find().populate("user", ["name"]).select('-password');
      return res.json(newuser);
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({ errors: [{ message: "Server Error" }] });
    }
  }
);

// EDIT USER DETAILS
router.put(
  '/edit',
  [
    auth,
    admin,
    [
      check("id", "User ID is required").trim().not().isEmpty(),
      check("name", "Name is required").trim().not().isEmpty(),
      check("email", "Include a valid email").trim().isEmail(),
      check("phone", "10 digit mobile number required")
        .trim()
        .isNumeric()
        .isLength(10),
      check("center", "Center Name is required").trim().not().isEmpty(),
      check("role", "Role is required").trim().not().isEmpty(),
    ],
  ],
  async ( req , res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, phone, email, center, role } = req.body;

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
      user.center = center;
      user.role = role;

      await user.save();
      return res.json(user);
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({ errors: [{ message: 'Server Error' }] });
    }
  }
);

module.exports = router;
