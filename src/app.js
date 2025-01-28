import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import groupRoutes from './routes/groupRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

const app = express();
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TODO List API',
            version: '1.0.0',
            description: 'A simple TODO List API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        tags: [
            {
                name: 'Health',
                description: 'API Health check endpoints'
            },
            {
                name: 'Groups',
                description: 'Task groups management'
            },
            {
                name: 'Tasks',
                description: 'Tasks management'
            }
        ],
    },
    apis: ['./src/routes/*.js', './src/swagger/*.js'], // шляхи до файлів з роутами
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/health', healthRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app; 