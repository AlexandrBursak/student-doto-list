import sequelize from '../config/database.js';
import Group from './group.js';
import Task from './task.js';

// Визначаємо зв'язки між моделями
Task.belongsTo(Group, { foreignKey: 'groupId', as: 'group' });
Group.hasMany(Task, { foreignKey: 'groupId', as: 'tasks' });

// Перевіряємо з'єднання з базою даних
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

export {
    sequelize,
    Group,
    Task
}; 