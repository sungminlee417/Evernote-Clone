const router = require("express").Router();
const sessionRouter = require("./session");
const usersRouter = require("./users");
const notebookRouter = require("./notebooks");
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/me/notebooks", notebookRouter);


router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
