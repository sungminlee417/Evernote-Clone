const { Note } = require("../../db/models");
const express = require("express");
const router = express.Router();

// GET CURRENT USER'S NOTES IN CURRENT NOTEBOOK
router.get("/:notebookId/notes", async (req, res) => {
    const user = req.user;
    const {notebookId} = req.params;
    const notes = await Note.findAll({
      where: { notebookId: notebookId },
    });
    res.json({notes});
  });

// POST NEW NOTE IN CURRENT NOTEBOOK
router.post("/:notebookId/notes", async (req,res) => {
    const user = req.user;
    const {notebookId} = req.params;
    const {name} = req.body;
    const note = await Note.create({
        name,
        notebookId: notebookId,
        userId: user.id,
    })
    res.status(201).json(note);
})
// UPDATE NOTE
router.put("/:notebookId/notes/noteId", async (req, res) => {
    const user = req.user;
    const { name } = req.body;
    const {noteId} = req.params;
    const note = await Note.findByPk(noteId);
    //await note.update({ name: name }) update content?
    res.status(200).json(note);
  });

// DELETE NOTE
router.delete("/:notebookId/notes/noteId", async (req, res) => {
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