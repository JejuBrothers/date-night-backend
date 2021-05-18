import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'date_night_dev',
    },
    migrations: {
      extension: 'ts',
      directory: './src/db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
    debug: true,
    useNullAsDefault: true,
    ...knexSnakeCaseMappers(),
  },
  staging: {},
  production: {},
};
