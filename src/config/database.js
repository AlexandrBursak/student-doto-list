import { Sequelize } from 'sequelize';
import config from './config.js';

const environment = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[environment]);

export default sequelize; 