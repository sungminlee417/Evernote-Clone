const express = require("express");
const { route } = require("../app");
const router = express.Router();
const apiRouter = require("./api");
const { User } = require("../db/models");

// router.use("/", async (req, res) => {
//   const users = await User.findAll();
//   res.json(users);
// });

router.use("/api", apiRouter);

router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
