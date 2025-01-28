import express from 'express';
import taskController from '../controllers/taskController.js';

const router = express.Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getTasksByStatus);

export default router; 