import { USERS_TABLE, UsersAttributes, UsersEntity } from "app/entities";
import * as knexConfig from "../../knexfile";
import { knex } from "knex";
import { Service } from "typedi";

export interface IUsersRepository {
  users: UsersEntity[];
  findUserByEmail(email: string): Promise<UsersEntity[]>;
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
  }): Promise<number[]>;
  getUserById(id: number): Promise<UsersEntity[]>;
}
@Service()
export class UsersRepository implements IUsersRepository {
  private db = knex(knexConfig).table(USERS_TABLE);
  public users: UsersEntity[];

  findUserByEmail(email: string): Promise<UsersEntity[]> {
    return this.db.clone().where({ email }).limit(1);
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
    return this.db.clone().insert({
      [UsersAttributes.Email]: email,
      [UsersAttributes.Name]: name,
      [UsersAttributes.Lastname]: lastname,
      [UsersAttributes.Password]: password,
    });
  }
  getUserById(id: number): Promise<UsersEntity[]> {
    return this.db.clone().select("*").where({ id }).limit(1);
  }
}
