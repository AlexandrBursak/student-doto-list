import express from 'express';
import groupController from '../controllers/groupController.js';

const router = express.Router();

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Group created successfully
 */
router.post('/', groupController.createGroup);

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: List of all groups
 */
router.get('/', groupController.getAllGroups);

router.delete('/:id', groupController.deleteGroup);
router.get('/:id/tasks', groupController.getGroupContent);

export default router; 