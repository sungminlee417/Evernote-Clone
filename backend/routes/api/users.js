const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { checkDuplicateCredential, handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Email address appears to be invalid."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Username appears to be invalid."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  checkDuplicateCredential
];

// SIGN UP USER
router.post("/", 
  validateSignup,
  async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ username, email, password });

  setTokenCookie(res, user);

  return res.json({
    user,
  });
});

module.exports = router;
