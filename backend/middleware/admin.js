module.exports = function (req, res, next) {
  if (req.user.role === "SystemAdmin") {
    next();
  } else {
    return res.status(403).json({ msg: "Request Forbidden" });
  }
};
