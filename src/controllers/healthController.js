import { sequelize } from '../models/index.js';

const healthController = {
    check: async (req, res) => {
        try {
            await sequelize.authenticate();
            res.json({
                status: 'healthy',
                timestamp: new Date(),
                database: 'connected'
            });
        } catch (error) {
            res.status(503).json({
                status: 'unhealthy',
                timestamp: new Date(),
                database: 'disconnected',
                error: error.message
            });
        }
    }
};

export default healthController; 