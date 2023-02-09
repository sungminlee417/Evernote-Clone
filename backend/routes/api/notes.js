const { Note, Notebook, NoteTag, Tag } = require("../../db/models");
const express = require("express");
const router = express.Router();

// GET ALL USER'S NOTES
router.get("/", async (req, res) => {
  const user = req.user;
  const { tags } = req.query;
  let notes = [];
  if (tags) {
    const tagsIdArr = tags.split(" ");
    const numsTagsIdArr = tagsIdArr.map(Number);
    for (let i = 0; i < numsTagsIdArr.length; i++) {
      const tagId = numsTagsIdArr[i];
      const tag = await Tag.findByPk(tagId, {
        include: [{ model: Note }],
      });
      notes.push(...tag.Notes);
    }
    res.json(notes);
  } else {
    notes = await Note.findAll({
      where: { userId: user.id },
      include: [{ model: Tag }],
    });
    res.json(notes);
  }
});

// GET SINGLE NOTE
router.get("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByPk(noteId, {
    include: Tag,
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

// ASSOCIATE NOTE WITH TAG
router.post("/:noteId/tags", async (req, res) => {
  const { tags } = req.body;
  const tagData = { ...tags };
  const { noteId } = req.params;
  const note = await Note.findByPk(noteId);
  const noteTags = await NoteTag.findAll({
    where: { noteId: note.id },
  });

  noteTags.forEach(async (noteTag) => {
    if (!(noteTag.tagId in tagData)) {
      const tag = await Tag.findByPk(noteTag.tagId);
      await note.removeTag(tag);
    } else {
      delete tagData[noteTag.tagId];
    }
  });

  Object.keys(tagData).forEach(async (tagId) => {
    await NoteTag.create({
      noteId: noteId,
      tagId: tagId,
    });
  });
  res.status(201).json({ message: "successful" });
});

// GET ALL TAGS ASSOCIATED WITH A CERTAIN NOTE
router.get("/:noteId/tags", async (req, res) => {
  const { noteId } = req.params;
  const tags = Tag.findAll({
    where: { noteId: noteId },
    include: Note,
  });
  res.json(tags);
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
  const noteTag = await NoteTag.findOne({ where: { noteId: noteId } });
  await noteTag.destroy();
  await note.destroy();
  res.status(204).json({
    message: "Note successfully deleted.",
  });
});

module.exports = router;
