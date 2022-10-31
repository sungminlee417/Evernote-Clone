const {Task} = require("../../db/models");
const express = require("express");
const router = express.Router();

// GET ALL CURRENT USER'S TASKS
router.get("/", async (req, res) => {
  const user = req.user;
  const tasks = await Task.findAll({
    where: { userId: user.id },
  });
  res.json({ tasks });
});

// POST NEW TASK
router.post("/", async (req, res) => {
  const user = req.user;
  const { name } = req.body;
  const tasks = await Task.create({
    name,
    userId: user.id,
  });
  res.status(201).json(tasks);
});

// UPDATE TASK
router.put("/:taskId", async (req, res) => {
  const user = req.user;
  const { name } = req.body;
  const { taskId } = req.params;
  const task = await Tasks.findByPk(taskId);
  await task.update({ name: name });
  res.status(200).json(task);
});

// DELETE TASK
router.delete("/:taskId", async (req, res) => {
  const user = req.user;
  const { taskId } = req.params;
  const task = await Task.findByPk(taskId);
  await task.destroy();
  res.status().json({
    message: "Task successfully deleted."
  });
});

module.exports = router;
