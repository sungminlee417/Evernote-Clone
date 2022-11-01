const { Tag } = require("../../db/models");
const express = require("express");
const router = express.Router();

// GET ALL CURRENT USER'S TAGS
router.get("/", async (req, res) => {
  const user = req.user;
  const tags = await Tag.findAll({
    where: { userId: user.id },
  });
  res.json({ tags });
});

// POST NEW TAG
router.post("/", async (req, res) => {
  const user = req.user;
  const { name } = req.body;
  const tag = await Tag.create({
    name,
    userId: user.id,
  });
  res.status(201).json(tag);
});

// UPDATE TAG
router.put("/:tagId", async (req, res) => {
  const user = req.user;
  const { name } = req.body;
  const { tagId } = req.params;
  const tag = await Tag.findByPk(tagId);
  await tag.update({ name: name });
  res.status(200).json(tag);
});

// DELETE TAG
router.delete("/:tagId", async (req, res) => {
  const user = req.user;
  const { tagId } = req.params;
  const tag = await Tag.findByPk(tagId);
  await tag.destroy();
  res.status().json({
    message: "Tag successfully deleted."
  });
});

module.exports = router;
