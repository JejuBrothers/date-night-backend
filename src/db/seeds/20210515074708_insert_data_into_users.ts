import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  await knex('users').insert([
    {
      id: 'cd9b25dd-131d-4d91-a08c-5a944a92830e',
      username: 'admin',
      email: 'admin@datenight.com',
      password: '123456',
      role: 'admin',
    },
    {
      id: '64725cd5-ae0c-4fe3-81ac-286ec6e97fba',
      username: 'user1',
      email: 'user1@datenight.com',
      password: '123456',
      role: 'user',
    },
    {
      id: 'c1ecdce4-98e7-4379-bc21-101dd043c430',
      username: 'user2',
      email: 'user2@datenight.com',
      password: '123456',
      role: 'user',
    },
    {
      id: '8aeb6874-82c4-4f0c-94de-b527196b36cf',
      username: 'user3',
      email: 'user3@datenight.com',
      password: '123456',
      role: 'user',
    },
  ]);
}
