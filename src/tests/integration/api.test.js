import request from 'supertest';
import app from '../../app.js';
import { sequelize } from '../../models/index.js';

describe('API Integration Tests', () => {
    beforeEach(async () => {
        // Очищаємо базу даних перед кожним тестом
        await sequelize.query('DELETE FROM tasks');
        await sequelize.query('DELETE FROM groups');
    });

    describe('Groups API', () => {
        test('should create a new group', async () => {
            const response = await request(app)
                .post('/api/groups')
                .send({ name: 'Test Group' });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('name', 'Test Group');
        });

        test('should get all groups', async () => {
            // Спочатку створюємо групу
            await request(app)
                .post('/api/groups')
                .send({ name: 'Test Group' });

            const response = await request(app)
                .get('/api/groups');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        // Додайте більше інтеграційних тестів
    });
}); 