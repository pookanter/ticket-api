import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: any } = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'randomrootpassword',
    database: 'ticket_dev',
  },
  // development: {
  //   client: "mysql2",
  //   connection: {
  //     database: "ticket_dev",
  //     host: "127.0.0.1",
  //     port: 3306,
  //     user: "root",
  //     password: "randomrootpassword"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // },
  // production: {
  //   client: "mysql2",
  //   connection: {
  //     database: "ticket_dev",
  //     host: "127.0.0.1",
  //     port: 3306,
  //     user: "root",
  //     password: "randomrootpassword"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // }

};

module.exports = config;
