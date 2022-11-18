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
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// SIGN UP USER
router.post("/", 
  validateSignup,
  checkDuplicateCredential,
  async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  setTokenCookie(res, user);

  return res.json({
    user,
  });
});

module.exports = router;
