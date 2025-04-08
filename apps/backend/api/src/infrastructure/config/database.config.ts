import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Database configuration factory that supports multiple database types
 * Supports: PostgreSQL, MySQL/MariaDB, SQLite
 * 
 * Environment variables:
 * - DATABASE_TYPE: 'postgres', 'mysql', 'mariadb', or 'sqlite'
 * - DATABASE_HOST: Database host (not needed for SQLite)
 * - DATABASE_PORT: Database port (not needed for SQLite)
 * - DATABASE_USERNAME: Database username (not needed for SQLite)
 * - DATABASE_PASSWORD: Database password (not needed for SQLite)
 * - DATABASE_NAME: Database name or path to SQLite file
 */
export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  const dbType = process.env.DATABASE_TYPE || 'postgres';
  
  const baseConfig = {
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsRun: process.env.RUN_MIGRATIONS === 'true',
  };
  
  switch(dbType) {
    case 'sqlite':
      return {
        ...baseConfig,
        type: 'sqlite',
        database: process.env.DATABASE_NAME || 'db.sqlite',
        autoLoadEntities: true,
      } as TypeOrmModuleOptions;
    case 'mysql':
    case 'mariadb':
      return {
        ...baseConfig,
        type: dbType,
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '3306', 10),
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_NAME || 'poetry_saas',
        autoLoadEntities: true,
      } as TypeOrmModuleOptions;
    case 'postgres':
    default:
      return {
        ...baseConfig,
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'poetry_saas',
        autoLoadEntities: true,
      } as TypeOrmModuleOptions;
  }
};
