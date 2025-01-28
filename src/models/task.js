import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Task extends Model {}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    groupId: {
        type: DataTypes.INTEGER,
        field: 'group_id',
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'completed'),
        defaultValue: 'active',
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATE,
        field: 'due_date',
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
    indexes: [
        { fields: ['group_id'] },
        { fields: ['status'] },
        { fields: ['due_date'] }
    ]
});

export default Task; 