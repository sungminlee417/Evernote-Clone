const router = require("express").Router();
const sessionRouter = require("./session");
const usersRouter = require("./users");
const notebookRouter = require("./notebooks");
const noteRouter = require("./notes")
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/notebooks", notebookRouter);
router.use("/notes", noteRouter)


router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
