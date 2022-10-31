const { Notebook } = require("../../db/models");
const noteRouter = require("./notes")
const express = require("express");
const router = express.Router();

router.use("/", noteRouter)

// GET ALL CURRENT USER'S NOTEBOOK
router.get("/", async (req, res) => {
  const user = req.user;
  const notebooks = await Notebook.findAll({
    where: { userId: user.id },
  });
  res.json({ notebooks });
});

// POST NEW NOTEBOOK
router.post("/", async (req, res) => {
  const user = req.user;
  const { name } = req.body;
  const notebook = await Notebook.create({
    name,
    userId: user.id,
  });
  res.status(201).json(notebook);
});

// UPDATE NOTEBOOK
router.put("/:notebookId", async (req, res) => {
  const user = req.user;
  const { name } = req.body;
  const { notebookId } = req.params;
  const notebook = await Notebook.findByPk(notebookId);
  await notebook.update({ name: name });
  res.status(200).json(notebook);
});

// DELETE NOTEBOOK
router.delete("/:notebookId", async (req, res) => {
  const user = req.user;
  const { notebookId } = req.params;
  const notebook = await Notebook.findByPk(notebookId);
  await notebook.destroy();
  res.status().json({
    message: "Notebook successfully deleted."
  });
});

module.exports = router;
