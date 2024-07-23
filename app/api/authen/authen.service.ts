import { UsersRepository } from "app/repositories";
import { BadRequestError, InternalServerError, NotFoundError } from "routing-controllers";
import { Service } from "typedi";

@Service()
export class AuthenService {
  usersRepository: UsersRepository;

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

    if (users.length > 0) {
      return new NotFoundError("User already exists");
    }

    const [userId] = await this.usersRepository.createUser({ email, name, lastname, password });

    if (!userId) {
      return new InternalServerError("Failed to create user");
    }

    return userId;
  }
}
