import { UsersRepository } from "app/repositories";
import { BadRequestError, InternalServerError } from "routing-controllers";
import { Service } from "typedi";

@Service()
export class UsersService {
  usersRepository = new UsersRepository();

  async signUp({
    email,
    name,
    lastname,
    password,
  }: {
    name: string;
    lastname: string;
    email: string;
    password: string;
  }) {
    const users = await this.usersRepository.findUserByEmail(email);

    return users;

    // if (users.length > 0) {
    //   return new BadRequestError("User already exists");
    // }

    // const [userId] = await this.usersRepository.createUser({ email, name, lastname, password });

    // if (!userId) {
    //   return new InternalServerError("Failed to create user");
    // }

    // return userId;
  }
}
