import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  // all of the passwords are 123456
  await knex('users').insert([
    {
      username: 'admin',
      email: 'admin@datenight.com',
      password: '$2b$10$Z5Wt2IbY1KEQbuEunfFlguWUIjsH4P.nlhpvzryrTatn8Oc9dildu',
      role: 'admin',
      id: '9bdac0a0-a682-43bc-865a-32b983f94f0a',
      partner: null,
      requestedAt: null,
    },
    {
      username: 'user1',
      email: 'user1@datenight.com',
      password: '$2b$10$7hkF9rSehP8E.2Aa3i0uFufBNaHp0W6MUwKUaHe3cI2/5.ZvzEQ5C',
      role: 'user',
      id: 'e259b4f7-00c8-4ce2-8dd0-c54e26b97dd5',
      partner: null,
      requestedAt: null,
    },
    {
      username: 'user2',
      email: 'user2@datenight.com',
      password: '$2b$10$i1M9HOtIbArQGPXp3gJiJudMPWQPQoiW7PLRIP6w9otEBrIRjAiNe',
      role: 'user',
      id: 'e7bee3e9-a5d2-4378-860e-3e7a85803e11',
      partner: null,
    },
    {
      username: 'user3',
      email: 'user3@datenight.com',
      password: '$2b$10$WVrEmVYFpDOMBHgVhTTwtOJ37O9Hu9EbRdEil2JnAeBl/L3BC1yde',
      role: 'user',
      id: 'fffd3b1e-bef8-404e-a15d-2586f79da920',
      partner: null,
    },
  ]);
}
