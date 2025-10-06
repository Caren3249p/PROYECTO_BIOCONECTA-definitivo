import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // 👈 carga .env

console.log('🔎 DataSource Config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS ? '***' : 'EMPTY',
  db: process.env.DB_NAME,
});

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'test',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});
