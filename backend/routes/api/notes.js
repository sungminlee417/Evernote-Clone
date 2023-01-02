const { Note, Notebook } = require("../../db/models");
const express = require("express");
const router = express.Router();

// GET ALL USER'S NOTES
router.get("/", async (req, res) => {
  const user = req.user;
  const notes = await Note.findAll({
    where: { userId: user.id },
  });
  res.json(notes);
});

// GET SINGLE NOTE
router.get("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByPk(noteId);
  res.json(note);
});

// POST NEW NOTE
router.post("/", async (req, res) => {
  const user = req.user;
  const notebook = await Notebook.findOne({
    where: {
      userId: user.id,
      firstNotebook: true,
    },
  });
  const note = await Note.create({
    userId: user.id,
    notebookId: notebook.id,
  });
  res.status(201).json(note);
});

// UPDATE NOTE
router.put("/:noteId", async (req, res) => {
  const { name, content } = req.body;
  const { noteId } = req.params;
  const note = await Note.findByPk(noteId);
  if (!name) {
    await note.update({ name: "Untitled", content: content });
  } else {
    await note.update({ name: name, content: content });
  }
  res.json(note);
});

// DELETE NOTE
router.delete("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByPk(noteId);
  await note.destroy();
  res.status(204).json({
    message: "Note successfully deleted.",
  });
});

module.exports = router;
