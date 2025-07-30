// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createProject, getProjects, getProject, updateProject, deleteProject
} = require('../controllers/projectController');

const taskRoutes = require('./taskRoutes');

// Project CRUD
router.use(auth); // protect all below routes
router.route('/')
  .post(createProject)
  .get(getProjects);

router.route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

// Mount nested task routes
router.use('/:projectId/tasks', taskRoutes);

module.exports = router;