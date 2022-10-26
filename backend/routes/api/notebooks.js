const { Notebook } = require("../../db/models");

const express = require("express");
const router = express.Router();

// GET ALL CURRENT USER'S NOTEBOOK
router.get("/", async (req, res) => {
  const user = req.user;
  const notebooks = await Notebook.findAll({
    where: { userId: user.id },
  });
  res.json({ notebooks });
});

router.post("/");

router.put("/:notebookId");

router.delete("/:notebookId");

module.exports = router;
