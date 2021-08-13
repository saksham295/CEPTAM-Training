const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Center = require("../models/Center");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// GET CENTER LIST
router.get("/", auth, async (req, res) => {
  try {
    const centers = await Center.find();
    res.json(centers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ADD A CENTER
router.post(
  "/",
  [
    auth,
    admin,
    [
      check("name", "Name is required").trim().not().isEmpty(),
      check("city", "Role is required").trim().not().isEmpty(),
      check("type", "Type is required").trim().not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, city, type, subtype } = req.body;

    try {
      let center = await Center.findOne({ name });
      if (center) {
        return res
          .status(400)
          .json({ errors: [{ message: "Center Already Exist" }] });
      }

      if(type==='Institute'){
        center = new Center({
          name,
          city,
          type,
          subtype,
        });
      } else {
        center = new Center({
          name,
          city,
          type,
          subtype: "N/A"
        });
      }

      await center.save();

      const newcenter = await Center.find();
      return res.json(newcenter);
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({ errors: [{ message: "Server Error" }] });
    }
  }
);

module.exports = router;
