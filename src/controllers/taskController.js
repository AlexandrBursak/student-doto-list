import { Task } from '../models/index.js';

const taskController = {
    // Додавання нового завдання в групу
    createTask: async (req, res) => {
        try {
            const task = await Task.create(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Отримання завдань за статусом
    getTasksByStatus: async (req, res) => {
        try {
            const { group_id, status } = req.query;
            const tasks = await Task.findAll({
                where: { groupId: group_id, status },
                order: [['createdAt', 'DESC']]
            });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default taskController; 