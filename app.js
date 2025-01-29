const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const turnRouter = require("./routes/turn");
const timesRouter = require("./routes/times");

const app = express();

// Get req.body
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/turn", turnRouter);
app.use("/times", timesRouter);

// Not Found Page
app.use((req, res) => {
  return res.status(404).json({
    error: {
      type: "Not Found",
      message: "Page Not Found",
    },
  });
});

module.exports = app;
