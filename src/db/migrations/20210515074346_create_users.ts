import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('users', (table) => {
          table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
          table.string('username').notNullable().unique();
          table.string('email').notNullable().unique();
          table.string('password').notNullable();
          table
            .enu('role', ['admin', 'user', 'guest'], {
              useNative: true,
              enumName: 'user_role',
            })
            .defaultTo('guest')
            .notNullable();
          table.timestamps(true, true);
          table.timestamp('requested_at').nullable();
          table.uuid('partner').nullable();
        });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users').raw('DROP TYPE user_role');
}
