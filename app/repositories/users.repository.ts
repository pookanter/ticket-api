import { USERS_TABLE, UsersAttributes, UsersEntity } from "app/entities";
import * as knexConfig from "../../knexfile";
import { knex } from "knex";

export class UsersRepository {
  db = knex(knexConfig).table(USERS_TABLE);

  findUserByEmail(email: string): Promise<UsersEntity[]> {
    return this.db.select("*").where({ email }).limit(1);
  }
  createUser({
    email,
    name,
    lastname,
    password,
  }: {
    email: string;
    name: string;
    lastname: string;
    password: string;
  }): Promise<number[]> {
    return this.db.insert({
      [UsersAttributes.Email]: email,
      [UsersAttributes.Name]: name,
      [UsersAttributes.Lastname]: lastname,
      [UsersAttributes.Password]: password,
    });
  }
  getUserById(id: number): Promise<UsersEntity[]> {
    return this.db.select("*").where({ id }).limit(1);
  }
}
