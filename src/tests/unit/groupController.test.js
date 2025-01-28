import groupController from '../../controllers/groupController.js';
import { sequelize } from '../../models/index.js';

// Mock the database pool
jest.mock('../../models/index.js', () => ({
    Group: {
        create: jest.fn(),
        findAll: jest.fn(),
        destroy: jest.fn()
    },
    Task: {
        findAll: jest.fn()
    },
    sequelize: {
        authenticate: jest.fn()
    }
}));

describe('Group Controller Unit Tests', () => {
    let mockRequest;
    let mockResponse;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn(() => mockResponse)
        };
    });

    test('createGroup should create a new group', async () => {
        const mockGroup = { id: 1, name: 'Test Group' };
        mockRequest.body = { name: 'Test Group' };
        
        sequelize.authenticate.mockResolvedValueOnce();
        sequelize.query.mockResolvedValueOnce({ rows: [mockGroup] });

        await groupController.createGroup(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockGroup);
    });

    // Додайте більше unit тестів для інших методів
}); 