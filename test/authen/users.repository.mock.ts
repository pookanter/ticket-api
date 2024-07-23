import { UsersEntity } from "app/entities";
import { IUsersRepository } from "app/repositories";

export class UsersRepositoryMock implements IUsersRepository {
  public users: UsersEntity[] = [];
  constructor() {
    console.log("UsersRepositoryMock is initialize");
  }

  async findUserByEmail(email: string): Promise<UsersEntity[]> {
    return this.users.filter((x) => x.email == email);
  }
  async createUser(data: {
    email: string;
    name: string;
    lastname: string;
    password: string;
  }): Promise<number[]> {
    const user: UsersEntity = {
      id: this.users.length + 1,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users.push(user);

    return [user.id];
  }
  async getUserById(id: number): Promise<UsersEntity[]> {
    return this.users.filter((x) => x.id == id);
  }
}
