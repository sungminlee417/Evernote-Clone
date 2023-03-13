const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors, checkValidUserLogin } = require("../../utils/validation");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .withMessage("Enter valid username or email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Incorrect password."),
  checkValidUserLogin
];

// GET CURRENT USER
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

// LOG IN ROUTE
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

  setTokenCookie(res, user);

  return res.json(user);
});

// LOG OUT
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
