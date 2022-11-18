const { validationResult } = require("express-validator");
const { User } = require("../db/models")
const { Op } = require("sequelize");

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {}
    validationErrors.errors.forEach(error => errors[error.param] = error.msg)
    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const checkValidUserLogin = async (req, res, next) => {
  const validationErrors = validationResult(req);
  const errors = {}
  const err = new Error("Bad request.");
  err.status = 400;
  err.title = "Bad request.";
  if (!validationErrors.isEmpty()) {
    validationErrors.errors.forEach(error => errors[error.param] = error.msg)
    
  }
  err.errors = errors;
  const {credential} = req.body;
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: credential },
        { username: credential }
      ]
    }
  })
  

  if (!user && !err.errors.credential) {
    err.errors.credential = "There is no account for the username or email you entered.";
  }
  console.log(err.errors)

  if (Object.values(err.errors).length) {
    return next(err);
  }
  next();
};

const checkDuplicateCredential = async (req, res, next) => {
  const validationErrors = validationResult(req);
  const errors = {}
  const err = new Error("Bad request.");
  err.status = 400;
  err.title = "Bad request.";
  if (!validationErrors.isEmpty()) {
    validationErrors.errors.forEach(error => errors[error.param] = error.msg)
    
  }
  err.errors = errors;
  const {username, email} = req.body;
  const userName = await User.findOne({
    where: { 
      username: username
    }
  });
  const userEmail = await User.findOne({
    where: {
      email: email
    }
  })
  console.log(userName)
  if (userName && !err.errors.username) {
    err.errors.username = "The username is already in use.";
  }
  if (userEmail && !err.errors.email) {
    err.errors.email = "The email is already in use.";
  }

  if (Object.values(err.errors).length) {
    return next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
  checkDuplicateCredential,
  checkValidUserLogin
};
