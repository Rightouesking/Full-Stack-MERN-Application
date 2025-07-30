// controllers/projectController.js
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, owner: req.user.id });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: 'Could not create project' });
  }
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user.id });
  res.json(projects);
};

exports.getProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, owner: req.user.id });
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
};

exports.updateProject = async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );
  if (!project) return res.status(404).json({ error: 'Not authorized or not found' });
  res.json(project);
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!project) return res.status(404).json({ error: 'Not authorized or not found' });
  res.json({ message: 'Project deleted' });
};