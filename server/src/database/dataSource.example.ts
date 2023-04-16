import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  username: 'postgres',
  password: 'postgres123',
  database: 'postgres',
  port: 5432,
  host: 'localhost',
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
