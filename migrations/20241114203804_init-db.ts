import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("chunkers", (table) => {
    table.string("id", 25).primary();
    table.string("slug", 25).unique();
    table.timestamp("createdAt").defaultTo(knex.fn.now()).index();
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table.boolean("published").defaultTo(false);
    table.string("yt_channel_name", 50);
    table.string("yt_channel_id", 25);
    table.integer("yt_subscriber_count");
    table.string("osrs_username", 25);
    table.string("ruleset", 25);
    table.string("starting_chunk", 50);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("chunkers");
}

// await knex.raw(`
//   select *
//   from INFORMATION_SCHEMA.COLUMNS
//   where TABLE_NAME='chunkers'
// `);

// export async function down(knex: Knex): Promise<void> {
//   await knex.schema.dropTable("chunkers");
// }

// export async function down(knex: Knex): Promise<void> {
//   await knex.raw(`
//   DROP TABLE chunkers;
// `);
// }

//   await knex.raw(`
//   select *
//   from INFORMATION_SCHEMA.COLUMNS
//   where TABLE_NAME='chunkers'
// `);

// select *
// from INFORMATION_SCHEMA.COLUMNS
// where TABLE_NAME='tableName'

// const down = knex =>
//   knex.raw(`
//   DROP TABLE users;
// `);
