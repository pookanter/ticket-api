import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.bigIncrements('id').unsigned().notNullable();
    table.string('name', 50);
    table.string('lastname', 50);
    table.string('email', 255);
    table.string('password', 255);
    table.dateTime('created_at');
    table.dateTime('updated_at');
  })
  .createTable('boards', (table) => {
    table.increments('id').unsigned().notNullable();
    table.bigInteger('user_id').unsigned().notNullable();
    table.string('title', 100);
    table.integer('sort_order').unsigned().notNullable();
    table.dateTime('created_at');
    table.dateTime('updated_at');
    table.foreign('user_id').references('users.id');
  })
  .createTable('statuses', (table) => {
    table.increments('id').unsigned().notNullable();
    table.integer('board_id').unsigned().notNullable();
    table.string('title', 50);
    table.integer('sort_order').unsigned().notNullable();
    table.dateTime('created_at');
    table.dateTime('updated_at');
    table.foreign('board_id').references('boards.id');
  })
  .createTable('tickets', (table) => {
    table.bigInteger('id').unsigned().notNullable();
    table.integer('status_id').unsigned().notNullable();
    table.string('title', 100);
    table.text('description');
    table.string('contact', 100);
    table.integer('sort_order').unsigned().notNullable();
    table.dateTime('created_at');
    table.dateTime('updated_at');
    table.foreign('status_id').references('statuses.id');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tickets')
    .dropTable('statuses')
    .dropTable('boards')
    .dropTable('users');
}

