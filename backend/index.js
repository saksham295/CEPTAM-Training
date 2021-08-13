const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = 3000;

app.use(express.json({ extended: false }));
connectDB();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Api Server");
});

app.use("/user", require("./api/register"));
app.use("/auth", require("./api/login"));
app.use("/auth", require("./api/profile"));
app.use("/course", require("./api/course"));
app.use("/center", require("./api/center"));
app.use("/enroll", require("./api/enroll"));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
