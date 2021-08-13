module.exports = function (req, res, next) {
  if (
    req.user.role === "SystemAdmin" ||
    req.user.role === "InstAdmin" ||
    req.user.role === "CourseCoordinator"
  ) {
    next();
  } else {
    return res.status(403).json({ msg: "Request Forbidden" });
  }
};
