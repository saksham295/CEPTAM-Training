const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Center = require("../models/Center");
const Course = require("../models/Course");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const checkObjectId = require("../middleware/checkObjectId");

// GET COURSES
router.get("/", auth, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET COURSE BY ID
router.get(
  "/:id",
  auth,
  admin,
  checkObjectId("id"),
  async ({ params: { id } }, res) => {
    try {
      const course = await Course.findOne({
        _id: id,
      })
        .populate({ path: "center" })
        .populate({ path: "participants.user" });

      if (!course) return res.status(400).json({ msg: "Course not found" });

      return res.json(course);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

// ADD COURSE
router.post(
  "/",
  [
    auth,
    admin,
    [
      check("title", "Name is required").trim().not().isEmpty(),
      check("venue", "Venue is required").trim().not().isEmpty(),
      check("from", "A valid date is required").trim().not().isDate(),
      check("to", "A valid date is required").trim().not().isDate(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, venue, from, to, schedule } = req.body;

    try {
      let agency = await Center.findOne({ _id: venue });
      if (!agency) {
        return res
          .status(400)
          .json({ errors: [{ message: "Center does not exist" }] });
      }

      course = new Course({
        title,
        center: agency._id,
        centerName: agency.name,
        from,
        to,
        schedule,
      });

      await course.save();

      const newcourse = await Course.find();
      return res.json(newcourse);
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({ errors: [{ message: "Server Error" }] });
    }
  }
);

module.exports = router;
