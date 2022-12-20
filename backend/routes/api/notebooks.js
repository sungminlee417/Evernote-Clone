const { Notebook, Note } = require("../../db/models");
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  handleValidationErrors,
  checkFirstNotebook,
} = require("../../utils/validation");

const validateNotebook = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Your notebook name must contain at least one character"),
  handleValidationErrors,
];

// GET ALL CURRENT USER'S NOTEBOOK
router.get("/", async (req, res) => {
  const user = req.user;
  const notebooks = await Notebook.findAll({
    where: { userId: user.id },
  });
  res.json(notebooks);
});

// POST NEW NOTEBOOK
router.post("/", validateNotebook, async (req, res) => {
  console.log(req.body.name);
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
  const { name } = req.body;
  const { notebookId } = req.params;
  const notebook = await Notebook.findByPk(notebookId);
  await notebook.update({ name: name });
  res.status(200).json(notebook);
});

// DELETE NOTEBOOK
router.delete("/:notebookId", checkFirstNotebook, async (req, res) => {
  const { notebookId } = req.params;
  const notebook = await Notebook.findByPk(notebookId);
  await notebook.destroy();
  res.status(204).json({
    message: "Notebook successfully deleted.",
  });
});

// GET CURRENT USER'S NOTES IN CERTAIN NOTEBOOK
router.get("/:notebookId/notes", async (req, res) => {
  const user = req.user;
  const { notebookId } = req.params;
  const notes = await Note.findAll({
    where: { notebookId: notebookId },
  });
  res.json({ notes });
});

// POST NEW NOTE IN CURRENT NOTEBOOK
router.post("/:notebookId/notes", async (req, res) => {
  const user = req.user;
  const { notebookId } = req.params;
  const { name, content } = req.body;
  const note = await Note.create({
    name: name,
    userId: user.id,
    content: content,
    notebookId: notebookId,
  });
  res.status(201).json(note);
});

module.exports = router;
