const { Note } = require("../../db/models");
const express = require('express')
const router = express.Router()

// GET ALL USER'S NOTES
router.get("/", async (req, res) => {
  const user = req.user;
  const notes = await Note.findAll({
    where: {userId: user.id}
  })
  res.json(notes)
})

// POST NEW NOTE
router.post("/",
  async (req, res) => {
    const user = req.user;
    const note = await Note.create({
      userId: user.id
    })
    res.status(201).json(note);
  })

// UPDATE NOTE
router.put("/:noteId", async (req, res) => {
    const user = req.user;
    const { name, content } = req.body;
    const { noteId } = req.params;
    const note = await Note.findByPk(noteId);
    await note.update({ name: name, content: content })
    res.status(200).json(note);
  });

// DELETE NOTE
router.delete("/:noteId", async (req, res) => {
    const user = req.user;
    const { notebookId } = req.params;
    const {noteId} = req.params
    const note = await Notebook.findByPk(noteId);
    await note.destroy();
    res.status().json({
      message: "Note successfully deleted."
    });
  });

module.exports = router;
