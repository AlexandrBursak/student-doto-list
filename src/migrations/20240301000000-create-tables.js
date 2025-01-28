'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        // Створення таблиці груп
        await queryInterface.createTable('groups', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });

        // Створення enum типу для статусів
        await queryInterface.sequelize.query(
            'CREATE TYPE enum_tasks_status AS ENUM (\'active\', \'completed\')'
        );

        // Створення таблиці завдань
        await queryInterface.createTable('tasks', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            group_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'groups',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            title: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            status: {
                type: 'enum_tasks_status',
                defaultValue: 'active',
                allowNull: false
            },
            due_date: {
                type: Sequelize.DATE,
                allowNull: true
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });

        // Створення індексів
        await queryInterface.addIndex('tasks', ['group_id']);
        await queryInterface.addIndex('tasks', ['status']);
        await queryInterface.addIndex('tasks', ['due_date']);
    },

    async down(queryInterface, Sequelize) {
        // Видалення таблиць
        await queryInterface.dropTable('tasks');
        await queryInterface.dropTable('groups');
        
        // Видалення enum типу
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_tasks_status');
    }
}; 