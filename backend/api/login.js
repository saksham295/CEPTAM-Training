const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// USER LOGIN
router.post(
  "/login",
  [
    check("email", "E-mail Address Required").trim().isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //  check if the user is exist
      let user = await User.findOne({ email });
      if (!user || user.status === 'Inactive') {
        return res
          .status(400)
          .json({ errors: [{ message: "User Does Not Exists" }] });
      }

      //  check for valid password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid Credentials" }] });
      }

      const userDetail = {
        _id: user._id,
        name: user.name,
        status: user.status,
        phone: user.phone,
        email: user.email,
        center: user.center,
        centerName: user.centerName,
        role: user.role,
      };

      jwt.sign(
        { user: userDetail },
        config.get("jwtsecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user: userDetail });
        }
      );
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({ errors: [{ message: "Server Error" }] });
    }
  }
);

module.exports = router;
