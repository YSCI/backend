module.exports = {
  type: process.env.POSTGRES_CONNECTION ?? 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: +process.env.POSTGRES_PORT ?? 5432,
  username: process.env.POSTGRES_USERNAME ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? '',
  database: process.env.POSTGRES_DATABASE ?? 'postgres',
  maxQueryExecutionTime: process.env.MAX_QUERY_EXECUTION_TIME ?? 1000,
  migrationsTableName: 'typeorm_migrations',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/*.migration{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};
