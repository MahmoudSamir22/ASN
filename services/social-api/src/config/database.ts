import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  dialect: 'postgres',
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Database connected');
  } catch (error) {
    console.error('🔴 Unable to connect to the database:', error);
    process.exit(1);
  }
};
