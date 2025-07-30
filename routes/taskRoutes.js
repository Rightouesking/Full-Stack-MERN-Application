// routes/taskRoutes.js
const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  createTask, getTasks, updateTask, deleteTask
} = require('../controllers/taskController');

router.route('/')
  .post(createTask)
  .get(getTasks);

router.route('/:taskId')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;