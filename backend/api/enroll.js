const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Course = require("../models/Course");

const auth = require("../middleware/auth");
const courseAdmin = require("../middleware/courseAdmin");

// ENROLL USER TO A COURSE
router.post(
  "/",
  [
    auth,
    courseAdmin,
    [
      check("courseid", "CourseID is required").trim().not().isEmpty(),
      check("userid", "UserID is required").trim().not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { courseid, userid } = req.body;

    try {
      const course = await Course.findOne({
        _id: courseid,
      }).populate({ path: "center" });
      if (!course) {
        return res
          .status(400)
          .json({ errors: [{ message: "Course does not exist" }] });
      }

      const user = await User.findOne({
        _id: userid,
      }).populate({ path: "center" });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ message: "User does not exist" }] });
      }

      course.participants.unshift({ user: user._id, userName: user.name });
      user.courses.unshift({
        course: course._id,
        courseTitle: course.title,
        courseCenter: course.centerName,
        From: course.from,
        To: course.to,
      });
      await user.save();
      await course.save();
      const newcourse = await Course.findOne({
        _id: course._id,
      })
        .populate({ path: "center" })
        .populate({ path: "participants.user" });
      return res.json(newcourse);
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({ errors: [{ message: "Server Error" }] });
    }
  }
);

// ADD SCHEDULE
router.put(
  "/schedule",
  [
    auth,
    courseAdmin,
    [
      check("cid", "CourseID is required").trim().not().isEmpty(),
      check("topic", "Topic is required").not().isEmpty(),
      check("from", "From date/time is required")
        .not()
        .isEmpty()
        .custom((value, { req }) => value < req.body.to),
      check("to", "To date/time is required")
        .not()
        .isEmpty()
        .custom((value, { req }) => value > req.body.from),
      check("faculty", "faculty is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cid, topic, from, to, faculty } = req.body;

    try {
      const course = await Course.findOne({ _id: cid });
      if (!course) {
        return res
          .status(404)
          .json({ errors: [{ message: "Course Not Found" }] });
      }
      let user = await User.findOne({ _id: faculty });
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ message: "Faculty Not Found" }] });
      }

      const newSchedule = {
        topic,
        from,
        to,
        faculty,
        facultyName: user.name + ", " + user.centerName,
      };

      course.schedule.unshift(newSchedule);
      await course.save();

      const newcourse = await Course.findOne({
        _id: course._id,
      })
        .populate({ path: "schedule" })
        .populate({ path: "participants.user" });

      return res.json(newcourse);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
