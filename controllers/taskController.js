// controllers/taskController.js
const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, owner: req.user.id });
  if (!project) return res.status(403).json({ error: 'Unauthorized' });

  const task = await Task.create({ ...req.body, project: project._id });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, owner: req.user.id });
  if (!project) return res.status(403).json({ error: 'Unauthorized' });

  const tasks = await Task.find({ project: project._id });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, owner: req.user.id });
  if (!project) return res.status(403).json({ error: 'Unauthorized' });

  const task = await Task.findOneAndUpdate(
    { _id: req.params.taskId, project: project._id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, owner: req.user.id });
  if (!project) return res.status(403).json({ error: 'Unauthorized' });

  const task = await Task.findOneAndDelete({ _id: req.params.taskId, project: project._id });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ message: 'Task deleted' });
};