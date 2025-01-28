import { Group, Task } from '../models/index.js';

const groupController = {
    // Створення нової групи
    createGroup: async (req, res) => {
        try {
            const group = await Group.create(req.body);
            res.status(201).json(group);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Отримання всіх груп
    getAllGroups: async (req, res) => {
        try {
            const groups = await Group.findAll({
                order: [['createdAt', 'DESC']]
            });
            res.json(groups);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Видалення групи
    deleteGroup: async (req, res) => {
        try {
            const { id } = req.params;
            await Group.destroy({ where: { id } });
            res.json({ message: 'Group deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Отримання вмісту групи
    getGroupContent: async (req, res) => {
        try {
            const { id } = req.params;
            const tasks = await Task.findAll({
                where: { groupId: id },
                order: [['createdAt', 'DESC']]
            });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default groupController; 