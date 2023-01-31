const { Note, Notebook, NoteTag, Tag } = require("../../db/models");
const express = require("express");
const notetag = require("../../db/models/notetag");
const router = express.Router();

// GET ALL USER'S NOTES
router.get("/", async (req, res) => {
  const user = req.user;
  const notes = await Note.findAll({
    where: { userId: user.id },
    include: Tag
  });
  res.json(notes);
});

// GET SINGLE NOTE
router.get("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByPk(noteId, {
    include: Tag
  });
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
  const noteData = await Note.findByPk(note.id, {
    include: Tag,
  });
  res.status(201).json(noteData);
});

router.post("/:noteId/tags", async(req,res) => {
  const { tags } = req.body;
  const { noteId } = req.params;
  console.log(noteId)
  const noteTags = await NoteTag.findAll({
    where: {noteId: noteId}
  })
  console.log(tags)
  noteTags.forEach(async(noteTag) => {
    console.log(noteTag.tagId)
    if(!(noteTag.tagId in tags)) {
      console.log(noteTag)
      // await noteTag.destroy()
      console.log("anything")
    } 
    else {
      delete tags[noteTag.tagId]
    }
  })
  Object.keys(tags).forEach( async(tagId) => {
    await NoteTag.create({
      noteId: noteId,
      tagId: tagId
    })
  })
  res.status(201).json({message: "successful"});
});

// UPDATE NOTE
router.put("/:noteId", async (req, res) => {
  const { name, content, notebookId } = req.body;
  const { noteId } = req.params;
  const note = await Note.findByPk(noteId, {
    include: Tag,
  });
  if (name) {
    if (!name) {
      await note.update({ name: "Untitled", content: content });
    } else {
      await note.update({ name: name, content: content });
    }
  } else if (notebookId) {
    await note.update({ notebookId: notebookId });
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
